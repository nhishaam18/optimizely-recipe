#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { styleOptions, selectedImageReadiness, collectStyles, saveStyleEvidence, tokenCandidates } from './style-evidence.mjs';

const assert = (ok, message) => { if (!ok) throw new Error(message); };
const safeName = value => typeof value === 'string' && /^[a-zA-Z0-9_-]+$/.test(value);
const escapeXml = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]));
const requireHere = createRequire(import.meta.url);
const requireCwd = createRequire(path.join(process.cwd(), 'capture-dependencies.cjs'));
function dependency(name) {
  try { return requireHere(name); } catch {
    try { return requireCwd(name); } catch { throw new Error(`Missing ${name}; use an existing environment with this dependency. No installation attempted.`); }
  }
}

async function measure(page, blocks) {
  return page.evaluate(items => {
    const rectangles = [], unmatchedSelectors = [];
    for (const block of items) {
      let nodes;
      try { nodes = [...document.querySelectorAll(block.selector)]; }
      catch { unmatchedSelectors.push({ ...block, reason: 'invalid-selector' }); continue; }
      if (!nodes.length) unmatchedSelectors.push({ ...block, reason: 'no-match' });
      nodes.forEach((node, index) => {
        const r = node.getBoundingClientRect();
        if (!r.width || !r.height || getComputedStyle(node).visibility === 'hidden') {
          unmatchedSelectors.push({ ...block, index, reason: 'not-visible-or-zero-size' }); return;
        }
        rectangles.push({ ...block, index, x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height });
      });
    }
    return { rectangles, unmatchedSelectors };
  }, blocks);
}

async function main() {
  assert(process.argv.length === 3, 'Usage: node capture.mjs <config.json>');
  const config = JSON.parse(await fs.readFile(process.argv[2], 'utf8'));
  assert(typeof config.sourceUrl === 'string', 'Explicit sourceUrl is required');
  const url = new URL(config.sourceUrl);
  assert(['http:', 'https:'].includes(url.protocol), 'sourceUrl must use HTTP(S)');
  const prefixes = config.allowedPathPrefixes;
  assert(prefixes === undefined || (Array.isArray(prefixes) && prefixes.length && prefixes.every(p => typeof p === 'string' && p.startsWith('/') && !/[?#%\\]/.test(p) && new URL(p, url.origin).origin === url.origin && new URL(p, url.origin).pathname === p)), 'allowedPathPrefixes must contain normalized absolute path prefixes without query, fragment, or encoded separators');
  const inScope = candidate => {
    const target = new URL(candidate);
    return target.origin === url.origin && (prefixes === undefined ? target.pathname === url.pathname : prefixes.some(p => {
      const prefix = p === '/' ? '/' : p.replace(/\/$/, '');
      return prefix === '/' || target.pathname === prefix || target.pathname.startsWith(`${prefix}/`);
    }));
  };
  assert(inScope(config.sourceUrl), 'sourceUrl is outside allowedPathPrefixes');
  assert(typeof config.outputDir === 'string' && config.outputDir.trim(), 'outputDir is required');
  assert(Array.isArray(config.viewports) && config.viewports.length, 'viewports is required');
  assert(Array.isArray(config.blocks) && config.blocks.length, 'blocks with actual selectors are required');
  const names = new Set(), ids = new Set();
  for (const vp of config.viewports) {
    assert(safeName(vp.name) && !names.has(vp.name), 'Viewport names must be unique safe identifiers');
    names.add(vp.name);
    assert([vp.width, vp.height].every(n => Number.isInteger(n) && n > 0 && n <= 10000), 'Invalid viewport dimensions');
  }
  for (const block of config.blocks) {
    assert(safeName(block.id) && !ids.has(block.id), 'Block IDs must be unique safe identifiers');
    ids.add(block.id);
    assert(typeof block.selector === 'string' && block.selector.trim(), `Missing selector for ${block.id}`);
  }
  const styles = styleOptions(config);
  const settleMs = config.settleMs ?? 500, maxScrollSteps = config.maxScrollSteps ?? 40;
  assert(Number.isInteger(settleMs) && settleMs >= 0 && settleMs <= 10000, 'settleMs must be 0..10000');
  assert(Number.isInteger(maxScrollSteps) && maxScrollSteps > 0 && maxScrollSteps <= 200, 'maxScrollSteps must be 1..200');
  const { chromium } = dependency('playwright'), sharp = dependency('sharp');
  await fs.mkdir(path.resolve(config.outputDir), { recursive: true });
  const runDir = await fs.mkdtemp(path.join(path.resolve(config.outputDir), 'capture-'));
  assert(config.browserChannel === undefined || ['chrome', 'msedge'].includes(config.browserChannel), 'browserChannel must be chrome or msedge when supplied');
  let configSha256 = null;
  if (styles) {
    const configBytes = await fs.readFile(process.argv[2]);
    await fs.writeFile(path.join(runDir, 'capture.config.json'), configBytes);
    configSha256 = createHash('sha256').update(configBytes).digest('hex');
  }
  const browser = await chromium.launch({ headless: true, ...(config.browserChannel ? { channel: config.browserChannel } : {}) });
  let failed = false;
  const styleRuns = [];
  try {
    for (const vp of config.viewports) {
      const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1, serviceWorkers: 'block' });
      const meta = { requestedUrl: config.sourceUrl, viewport: vp, browserChannel: config.browserChannel ?? 'bundled-chromium', browserVersion: browser.version(), timestamp: new Date().toISOString(), coordinateSystem: 'document CSS pixels; PNG scale 1', cookieDismissSelector: config.cookieDismissSelector ?? null, adjustments: ['CSS animations/transitions disabled', 'caret hidden', 'bounded lazy-load scroll', 'capture at scroll zero'] };
      try {
        meta.navigationScope = { origin: url.origin, allowedPathPrefixes: prefixes ?? null, exactPath: prefixes === undefined ? url.pathname : null };
        meta.blockedNavigations = [];
        const page = await context.newPage();
        page.setDefaultTimeout(15000);
        // Inspect redirect responses without following them: routing is not guaranteed
        // to intercept each hop of a browser-managed redirect chain.
        await page.route('**/*', async route => {
          const req = route.request();
          if (!req.isNavigationRequest() || req.frame() !== page.mainFrame()) { await route.continue(); return; }
          if (!inScope(req.url())) {
            meta.blockedNavigations.push({ url: req.url(), reason: 'outside-scope' });
            await route.abort(); return;
          }
          try {
            const response = await route.fetch({ maxRedirects: 0, timeout: 15000 });
            const location = response.headers().location;
            if (response.status() >= 300 && response.status() < 400 && location) {
              const destination = new URL(location, req.url()).href;
              meta.blockedNavigations.push({ url: destination, reason: inScope(destination) ? 'redirect-requires-direct-capture' : 'outside-scope' });
              await route.abort(); return;
            }
            await route.fulfill({ response });
          } catch (error) {
            meta.blockedNavigations.push({ url: req.url(), reason: 'navigation-fetch-failed', error: error.message });
            await route.abort();
          }
        });
        await page.goto(config.sourceUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
        if (config.readySelector) await page.locator(config.readySelector).first().waitFor({ state: 'visible' });
        if (config.cookieDismissSelector) await page.locator(config.cookieDismissSelector).click();
        await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}' });
        await page.evaluate(() => Promise.race([document.fonts.ready, new Promise((_, reject) => setTimeout(() => reject(new Error('Font readiness timed out')), 10000))]));
        let reachedBottom = false, scrollSteps = 0;
        for (; scrollSteps < maxScrollSteps; scrollSteps++) {
          await page.evaluate(() => scrollBy(0, innerHeight * 0.8));
          await page.waitForTimeout(settleMs);
          reachedBottom = await page.evaluate(() => scrollY + innerHeight >= document.documentElement.scrollHeight - 2);
          if (reachedBottom) { scrollSteps++; break; }
        }
        await page.evaluate(() => scrollTo(0, 0));
        await page.waitForTimeout(settleMs);
        assert(inScope(page.url()) && !meta.blockedNavigations.length, 'Navigation left scope or was blocked; inspect blockedNavigations');
        if (styles) meta.images = await selectedImageReadiness(page, config.blocks, styles);
        Object.assign(meta, { url: page.url(), reachedBottom, scrollSteps }, await measure(page, config.blocks));
        const styleBefore = styles ? await collectStyles(page, config.blocks, styles) : null;
        const rawPath = path.join(runDir, `${vp.name}.raw.png`);
        await page.screenshot({ path: rawPath, fullPage: true, scale: 'css', animations: 'disabled', timeout: 30000 });
        const after = await measure(page, config.blocks);
        if (styles) {
          const styleAfter = await collectStyles(page, config.blocks, styles);
          const stable = JSON.stringify(styleBefore) === JSON.stringify(styleAfter);
          styleBefore.images = meta.images;
          styleBefore.provenance = { requestedUrl: config.sourceUrl, resolvedUrl: page.url(), timestamp: meta.timestamp, configFile: 'capture.config.json', configSha256 };
          meta.styles = await saveStyleEvidence({ evidence: styleBefore, runDir, viewport: vp, rawPath, sharp, stable });
          styleRuns.push(styleBefore);
        }
        meta.geometryStable = JSON.stringify(after) === JSON.stringify({ rectangles: meta.rectangles, unmatchedSelectors: meta.unmatchedSelectors });
        if (!meta.geometryStable) meta.geometryAfterCapture = after;
        const { width, height } = await sharp(rawPath).metadata();
        meta.image = { width, height, raw: `${vp.name}.raw.png`, annotated: `${vp.name}.annotated.png` };
        const markup = meta.rectangles.map(r => `<rect x="${r.x}" y="${r.y}" width="${r.width}" height="${r.height}" fill="none" stroke="#ff0066" stroke-width="3"/><text x="${Math.max(2, r.x + 4)}" y="${Math.max(18, r.y + 18)}" font-family="sans-serif" font-size="16" fill="#ff0066" stroke="white" stroke-width="3" paint-order="stroke">${escapeXml(r.id)}[${r.index}]</text>`).join('');
        await sharp(rawPath).composite([{ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${markup}</svg>`), top: 0, left: 0 }]).png().toFile(path.join(runDir, meta.image.annotated));
        meta.status = meta.unmatchedSelectors.length || !meta.geometryStable || !reachedBottom ||
          (meta.images && (meta.images.truncated || meta.images.failures.length)) ||
          (meta.styles && (!meta.styles.stable || meta.styles.truncated || meta.styles.issues)) ? 'incomplete' : 'captured';
        if (meta.status !== 'captured') failed = true;
      } catch (error) {
        meta.status = 'error'; meta.error = error.message; failed = true;
        process.exitCode = 1;
      } finally {
        await fs.writeFile(path.join(runDir, `${vp.name}.json`), JSON.stringify(meta, null, 2));
        await context.close();
      }
    }
  } finally { await browser.close(); }
  if (styles) await fs.writeFile(path.join(runDir, 'token-candidates.json'), JSON.stringify({ ...tokenCandidates(styleRuns), requestedViewports: config.viewports.map(v => v.name), unavailableViewports: config.viewports.filter(v => !styleRuns.some(e => e.viewport.name === v.name)).map(v => v.name) }, null, 2));
  console.log(runDir);
  if (failed && !process.exitCode) process.exitCode = 2;
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
