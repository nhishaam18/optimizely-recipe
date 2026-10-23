import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

const safeName = value => typeof value === 'string' && /^[a-zA-Z0-9_-]+$/.test(value);
const assert = (ok, message) => { if (!ok) throw new Error(message); };
const properties = [
  'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'lineHeight', 'letterSpacing', 'textAlign',
  'color', 'backgroundColor', 'backgroundImage', 'display', 'position', 'width', 'height',
  'minWidth', 'maxWidth', 'minHeight', 'maxHeight', 'boxSizing', 'overflow',
  'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'rowGap', 'columnGap',
  'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
  'borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle',
  'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
  'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius',
  'boxShadow', 'alignItems', 'justifyContent', 'flexDirection', 'flexWrap', 'flexGrow', 'flexShrink',
  'flexBasis', 'gridTemplateColumns', 'gridTemplateRows', 'objectFit', 'objectPosition', 'transform'
];

export function styleOptions(config) {
  const input = config.styleCapture;
  if (input === undefined) return null;
  assert(input && typeof input === 'object' && !Array.isArray(input), 'styleCapture must be an object');
  assert(typeof input.enabled === 'boolean', 'styleCapture.enabled must be boolean');
  if (!input.enabled) return null;
  const result = { maxOccurrences: 20, maxSamples: 128, maxDomNodes: 16, imageWaitMs: 3000, pseudoElements: false, crops: true, ...input };
  for (const [key, max] of [['maxOccurrences', 100], ['maxSamples', 512], ['maxDomNodes', 64]]) {
    assert(Number.isInteger(result[key]) && result[key] >= 1 && result[key] <= max, `${key} must be 1..${max}`);
  }
  for (const key of ['pseudoElements', 'crops']) assert(typeof result[key] === 'boolean', `${key} must be boolean`);
  assert(Number.isInteger(result.imageWaitMs) && result.imageWaitMs >= 0 && result.imageWaitMs <= 10000, 'imageWaitMs must be 0..10000');
  assert(config.blocks.length <= 100, 'Style extraction supports at most 100 configured blocks per run');
  const occurrenceIds = new Set();
  for (const block of config.blocks) {
    assert(block.occurrenceIds === undefined || (Array.isArray(block.occurrenceIds) && block.occurrenceIds.length <= 100 && block.occurrenceIds.every(safeName)), 'occurrenceIds must be safe identifiers (at most 100)');
    for (const id of block.occurrenceIds || []) {
      assert(!occurrenceIds.has(id), `Duplicate occurrenceId: ${id}`); occurrenceIds.add(id);
    }
    const parts = block.parts ?? [];
    assert(Array.isArray(parts) && parts.length <= 12, 'parts must be an array of at most 12 named selectors');
    const ids = new Set(['root']);
    for (const part of parts) {
      assert(safeName(part.id) && !ids.has(part.id), 'Part IDs must be unique safe names; root is reserved'); ids.add(part.id);
      assert(typeof part.selector === 'string' && part.selector.trim(), 'Part selector is required');
    }
  }
  return result;
}

export async function selectedImageReadiness(page, blocks, options) {
  return page.evaluate(async ({ blocks, options }) => {
    const images = new Set(); let truncated = false;
    for (const block of blocks) {
      let roots;
      try { roots = document.querySelectorAll(block.selector); } catch { continue; }
      for (let i = 0; i < Math.min(roots.length, options.maxOccurrences); i++) {
        const root = roots[i], nodes = root.tagName === 'IMG' ? [root] : root.querySelectorAll('img');
        for (const image of nodes) {
          if (images.has(image)) continue;
          if (images.size >= 64) { truncated = true; break; }
          images.add(image);
        }
      }
    }
    const decodeStatus = new Map([...images].map(image => [image, 'pending']));
    let timer;
    try {
      await Promise.race([
        Promise.all([...images].map(image => image.decode().then(() => decodeStatus.set(image, 'decoded'), () => decodeStatus.set(image, 'failed')))),
        new Promise(resolve => { timer = setTimeout(resolve, options.imageWaitMs); })
      ]);
    } finally { clearTimeout(timer); }
    return { checked: images.size, truncated, waitBudgetMs: options.imageWaitMs,
      failures: [...images].map((image, index) => ({ index, complete: image.complete, naturalWidth: image.naturalWidth, decode: decodeStatus.get(image) }))
        .filter(image => !image.complete || !image.naturalWidth || image.decode !== 'decoded'),
      scope: 'selected block img elements only; CSS backgrounds/video/canvas require separate evidence' };
  }, { blocks, options });
}

// One browser evaluation per viewport pass, not one round trip per selected node.
export async function collectStyles(page, blocks, options) {
  return page.evaluate(({ blocks, options, properties }) => {
    const samples = [], issues = [];
    let truncated = false, occurrenceCount = 0;
    const forbidden = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE']);
    const visible = node => {
      const r = node.getBoundingClientRect(), s = getComputedStyle(node);
      return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.visibility !== 'collapse';
    };
    const boundedMatches = (scope, selector, limit) => {
      // Native scoped CSS selector semantics, bounded output; no HTML serialization.
      const nodes = scope.querySelectorAll(selector), found = [];
      for (let i = 0; i < Math.min(nodes.length, limit); i++) found.push(nodes[i]);
      return { found, overflow: nodes.length > limit };
    };
    const structure = root => {
      const nodes = [];
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
        acceptNode: node => forbidden.has(node.tagName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
      });
      let node = root;
      while (node && nodes.length < options.maxDomNodes) {
        if (!forbidden.has(node.tagName)) nodes.push({
          tag: node.tagName.toLowerCase(), classes: (node.getAttribute('class') || '').slice(0, 256),
          role: (node.getAttribute('role') || '').slice(0, 64), depth: (() => {
            let depth = 0, p = node; while (p !== root && p.parentElement) { depth++; p = p.parentElement; } return depth;
          })()
        });
        node = walker.nextNode();
      }
      return { nodes, truncated: Boolean(node), policy: 'tag/class/role/depth only; no text, form values, event handlers or source HTML' };
    };
    const picked = (node, pseudo) => {
      const s = getComputedStyle(node, pseudo), values = {};
      for (const prop of properties) {
        const value = s[prop];
        if (value.length > 2048) { truncated = true; issues.push({ reason: 'style-value-truncated', property: prop }); }
        values[prop] = value.slice(0, 2048);
      }
      return values;
    };
    const take = (node, identity) => {
      if (samples.length >= options.maxSamples) { truncated = true; return false; }
      if (forbidden.has(node.tagName) || !visible(node)) { issues.push({ ...identity, reason: 'not-visible-or-excluded' }); return true; }
      const r = node.getBoundingClientRect();
      const sample = { ...identity, rect: { x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height }, styles: picked(node),
        pseudo: options.pseudoElements ? { before: picked(node, '::before'), after: picked(node, '::after') } : null,
        structure: structure(node), crop: null };
      if (sample.structure.truncated) {
        truncated = true;
        issues.push({ ...identity, reason: 'structure-truncated' });
      }
      samples.push(sample); return true;
    };
    for (const block of blocks) {
      let matches;
      try { matches = boundedMatches(document, block.selector, options.maxOccurrences); }
      catch { issues.push({ blockId: block.id, reason: 'invalid-selector' }); continue; }
      if (!matches.found.length) issues.push({ blockId: block.id, reason: 'no-match' });
      if (matches.overflow) truncated = true;
      if (block.occurrenceIds && (block.occurrenceIds.length !== matches.found.length || matches.overflow)) {
        issues.push({ blockId: block.id, reason: 'occurrence-count-mismatch', expected: block.occurrenceIds.length, foundAtLeast: matches.found.length + Number(matches.overflow) });
      }
      for (const [index, root] of matches.found.entries()) {
        if (occurrenceCount++ >= options.maxOccurrences) { truncated = true; break; }
        const identity = { blockId: block.id, occurrenceId: block.occurrenceIds?.[index] ?? null, index };
        if (!take(root, { ...identity, partId: 'root', partIndex: 0 })) break;
        for (const part of block.parts || []) {
          let children;
          try { children = boundedMatches(root, part.selector, options.maxSamples - samples.length); }
          catch { issues.push({ ...identity, partId: part.id, reason: 'invalid-part-selector' }); continue; }
          if (children.overflow) truncated = true;
          if (!children.found.length) issues.push({ ...identity, partId: part.id, reason: 'part-no-match' });
          for (const [partIndex, node] of children.found.entries()) take(node, { ...identity, partId: part.id, partIndex });
        }
      }
    }
    if (truncated) issues.push({ reason: 'extraction-limit-reached', limits: options });
    return { schemaVersion: 1, samples, issues, truncated, coordinateSystem: 'document CSS pixels; PNG scale 1', state: 'initial after configured readiness and consent adjustment', limits: options };
  }, { blocks, options, properties });
}

export async function saveStyleEvidence({ evidence, runDir, viewport, rawPath, sharp, stable }) {
  const bytes = await fs.readFile(rawPath), rawSha256 = createHash('sha256').update(bytes).digest('hex');
  const { width, height } = await sharp(bytes).metadata();
  evidence.raw = { file: path.basename(rawPath), sha256: rawSha256 };
  evidence.viewport = viewport;
  evidence.stable = stable;
  if (evidence.limits.crops) {
    for (const sample of evidence.samples.filter(s => s.partId === 'root')) {
      const r = sample.rect, left = Math.max(0, Math.floor(r.x)), top = Math.max(0, Math.floor(r.y));
      const right = Math.min(width, Math.ceil(r.x + r.width)), bottom = Math.min(height, Math.ceil(r.y + r.height));
      if (right <= left || bottom <= top) { evidence.issues.push({ blockId: sample.blockId, index: sample.index, reason: 'crop-outside-screenshot' }); continue; }
      const file = `${viewport.name}.${sample.blockId}.${sample.index}.crop.png`;
      const cropBytes = await sharp(bytes).extract({ left, top, width: right - left, height: bottom - top }).png().toBuffer();
      await fs.writeFile(path.join(runDir, file), cropBytes);
      sample.crop = { file, sha256: createHash('sha256').update(cropBytes).digest('hex'), sourceSha256: rawSha256,
        rectangle: { left, top, width: right - left, height: bottom - top }, clipped: r.x < 0 || r.y < 0 || r.x + r.width > width || r.y + r.height > height,
        geometryStable: stable, method: 'derived from same raw PNG; no extra browser screenshot' };
    }
  }
  const file = `${viewport.name}.styles.json`;
  await fs.writeFile(path.join(runDir, file), JSON.stringify(evidence, null, 2));
  return { file, stable, truncated: evidence.truncated, issues: evidence.issues.length, samples: evidence.samples.length };
}

export function tokenCandidates(evidences) {
  const groups = new Map();
  const selected = /^(color|backgroundColor|border.*Color|fontFamily|fontSize|fontWeight|lineHeight|letterSpacing|padding.*|margin.*|rowGap|columnGap|border.*Radius)$/;
  for (const evidence of evidences) for (const sample of evidence.samples) {
    for (const [property, value] of Object.entries(sample.styles)) {
      if (!selected.test(property) || !value) continue;
      const key = `${property}\0${value}`;
      if (!groups.has(key)) groups.set(key, { property, value, consumers: [] });
      groups.get(key).consumers.push({ viewport: evidence.viewport.name, blockId: sample.blockId, occurrenceId: sample.occurrenceId,
        index: sample.index, partId: sample.partId, partIndex: sample.partIndex });
    }
  }
  return { status: 'proposed', policy: 'Exact resolved property/value groups only; no approximate merging or semantic token names. Review consumers, responsive context and existing tokens.',
    coverage: evidences.map(e => ({ viewport: e.viewport.name, stable: e.stable, truncated: e.truncated, issues: e.issues.length, images: e.images ?? null })), groups: [...groups.values()] };
}
