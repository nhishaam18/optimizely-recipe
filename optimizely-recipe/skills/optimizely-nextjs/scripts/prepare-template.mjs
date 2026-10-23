#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const digest = data => createHash('sha256').update(data).digest('hex');
const expectedDigest = '6bea223a0801d58643e320d721b3dfeed5d25b40325b7c410747d25fb5a59711';
const marker = '.kajoo-template.json';
export async function prepareTemplate(target, bundleFile = new URL('../assets/template-bundle.json', import.meta.url)) {
  if (!target || !path.isAbsolute(target)) throw new Error('An absolute --target path is required');
  const raw = await fs.readFile(bundleFile);
  if (digest(raw) !== expectedDigest) throw new Error('Bundle integrity mismatch; no files written');
  const bundle = JSON.parse(raw);
  const seen = new Set();
  for (const file of bundle.files) {
    const segments = file.path.split('/');
    if (segments.some(s => !s || s === '.' || s === '..' || /[\\:\x00]/.test(s)) || seen.has(file.path.toLowerCase())) throw new Error('Unsafe or duplicate bundle path');
    seen.add(file.path.toLowerCase());
    if (digest(file.content) !== file.sha256) throw new Error(`File integrity mismatch: ${file.path}`);
  }
  target = path.resolve(target);
  let stat;
  try { stat = await fs.lstat(target); } catch (e) { if (e.code !== 'ENOENT') throw e; }
  if (stat) {
    if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error('Target must be a regular directory');
    let receipt;
    try { receipt = JSON.parse(await fs.readFile(path.join(target, marker), 'utf8')); } catch { throw new Error('Existing target has no matching bundle receipt; preserved without changes. Select existing-repository mode or an absent target.'); }
    if (receipt.bundleSha256 !== expectedDigest) throw new Error('Existing target belongs to another bundle; preserved without changes');
    for (const name of ['package.json', 'pnpm-lock.yaml', 'src']) await fs.access(path.join(target, name));
    return { status: 'reused', target, bundleSha256: expectedDigest, note: 'Existing files preserved; reuse is not a current build or dependency qualification.' };
  }
  await fs.mkdir(path.dirname(target), { recursive: true });
  // Exclusive target creation prevents overwriting a concurrently created repository.
  await fs.mkdir(target);
  try {
    for (const file of bundle.files) {
      const destination = path.join(target, file.path);
      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.writeFile(destination, file.content, { flag: 'wx' });
    }
    const receipt = { recipeVersion: bundle.recipeVersion, templateName: bundle.templateName, bundleSha256: expectedDigest, preparedAt: new Date().toISOString(), target, files: bundle.files.map(({ path, sha256, sourceSha256, overlay }) => ({ path, sha256, sourceSha256, overlay })) };
    await fs.writeFile(path.join(target, marker), JSON.stringify(receipt, null, 2) + '\n', { flag: 'wx' });
    return { status: 'created', target, bundleSha256: expectedDigest, files: bundle.files.length };
  } catch (e) {
    throw new Error(`Setup incomplete at ${target}; retained for inspection, no automatic deletion or overwrite. ${e.message}`);
  }
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.length !== 4 || process.argv[2] !== '--target') throw new Error('Usage: node prepare-template.mjs --target /absolute/repository/path');
    console.log(JSON.stringify(await prepareTemplate(process.argv[3]), null, 2));
  } catch (e) { console.error(e.message); process.exitCode = 1; }
}
