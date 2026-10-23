import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';

// Local-only test; keep evidence outside the recipe package.
const base = process.env.CAPTURE_TEST_OUTPUT_DIR ? path.resolve(process.env.CAPTURE_TEST_OUTPUT_DIR) : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../optimizely-saas-migration-validation/qa-smoke');
await fs.mkdir(base, { recursive: true });
const dir = await fs.mkdtemp(path.join(base, 'smoke-'));
const server = http.createServer((req, res) => {
  if (req.url === '/approved/redirect') { res.writeHead(302, { Location: '/approved-escape/private' }); res.end(); return; }
  if (req.url === '/approved-escape/private') escapedRequests++;
  res.setHeader('Content-Type', 'text/html');
  res.end('<!doctype html><style>body{margin:0}header{height:80px;background:navy;color:white}main{height:1500px;background:#ddd}</style><header>Header</header><main>Hero</main>');
});
let escapedRequests = 0;
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
try {
  for (const scenario of ['valid', 'missing', 'redirect']) {
    const missing = scenario === 'missing';
    const configPath = path.join(dir, `config-${scenario}.json`);
    await fs.writeFile(configPath, JSON.stringify({ sourceUrl: `http://127.0.0.1:${server.address().port}/`, outputDir: dir, viewports: [{ name: 'desktop', width: 1440, height: 900 }, { name: 'mobile', width: 390, height: 844 }], blocks: [{ id: 'hero', selector: missing ? '.missing' : 'main' }], settleMs: 20 }));
    if (process.env.CAPTURE_BROWSER_CHANNEL) {
      const config = JSON.parse(await fs.readFile(configPath, 'utf8'));
      config.browserChannel = process.env.CAPTURE_BROWSER_CHANNEL;
      await fs.writeFile(configPath, JSON.stringify(config));
    }
    if (scenario === 'redirect') {
      const config = JSON.parse(await fs.readFile(configPath, 'utf8'));
      config.sourceUrl += 'approved/redirect';
      config.allowedPathPrefixes = ['/approved'];
      await fs.writeFile(configPath, JSON.stringify(config));
    }
    let stdout = '', stderr = '';
    const child = spawn(process.execPath, [fileURLToPath(new URL('./capture.mjs', import.meta.url)), configPath]);
    child.stdout.on('data', data => stdout += data);
    child.stderr.on('data', data => stderr += data);
    const code = await new Promise((resolve, reject) => { child.on('error', reject); child.on('close', resolve); });
    assert.equal(code, scenario === 'redirect' ? 1 : missing ? 2 : 0, stderr || stdout);
    const run = stdout.trim();
    for (const vp of ['desktop', 'mobile']) {
      const meta = JSON.parse(await fs.readFile(path.join(run, `${vp}.json`), 'utf8'));
      if (scenario === 'redirect') {
        assert.equal(meta.status, 'error');
        assert.equal(meta.blockedNavigations[0].reason, 'outside-scope');
        assert.equal(escapedRequests, 0, 'Out-of-scope redirect destination must never be requested');
        continue;
      }
      assert.equal(meta.geometryStable, true);
      assert.equal(meta.reachedBottom, true);
      assert.equal(meta.unmatchedSelectors.length, missing ? 1 : 0);
      if (!missing) { assert.equal(meta.rectangles[0].y, 80); assert.equal(meta.rectangles[0].height, 1500); }
      for (const suffix of ['raw.png', 'annotated.png']) assert.ok((await fs.stat(path.join(run, `${vp}.${suffix}`))).size > 0);
    }
  }
  console.log(`PASS: desktop/mobile capture, real DOM coordinates, preserved PNGs, missing-selector failure, and same-origin out-of-scope redirect blocked before request. Evidence: ${dir}`);
} finally { server.close(); }
