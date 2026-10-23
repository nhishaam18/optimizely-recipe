import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { validateManifest } from './modeling-preflight.mjs';
const manifest = property => ({ contentTypes: [{ key: 'Card', displayName: 'Card', baseType: '_component', properties: { value: property } }] });
const errors = property => validateManifest(manifest(property)).errors;

test('array item metadata is distinct from full property metadata', () => {
  for (const [key, value] of Object.entries({isRequired:true,isLocalized:false,displayName:'Item',description:'Help',group:'Content',sortOrder:1,indexingType:'searchable',displayMode:'hidden'})) {
    assert.ok(errors({type:'array',items:{type:'string',[key]:value}}).some(e=>e.startsWith(`contentTypes[0].properties.value.items.${key}:`)));
    assert.deepEqual(errors({type:'string',[key]:value}),[]);
  }
});
test('enforces documented content type identity limits', () => {
  for (const key of ['A','1-invalid','A'.repeat(256)]) {
    const data=manifest({type:'string'}); data.contentTypes[0].key=key;
    assert.ok(validateManifest(data).errors.some(e=>e.startsWith('contentTypes[0].key:')));
  }
  const data=manifest({type:'string'}); data.contentTypes[0].displayName='A'.repeat(256);
  assert.ok(validateManifest(data).errors.some(e=>e.startsWith('contentTypes[0].displayName:')));
});
test('checks known formats and reports unverified formats without guessing', () => {
  assert.ok(errors({type:'integer',format:'selectOne'}).length);
  assert.deepEqual(errors({type:'string',format:'selectOne'}),[]);
  const result=validateManifest(manifest({type:'string',format:'unknown'}));
  assert.deepEqual(result.errors,[]);
  assert.ok(result.uncheckedDetails.some(e=>e.path.endsWith('.format')));
});
test('complete supplied inventories govern group and format references', () => {
  const data=manifest({type:'string',format:'shortString',group:'Content'});
  const inventory={groups:['Content'],formats:{shortString:'string'}};
  assert.deepEqual(validateManifest(data,{inventory}).errors,[]);
  assert.ok(validateManifest(data,{inventory:{groups:[],formats:{}}}).errors.length===2);
  assert.ok(validateManifest(data,{inventory:{groups:['Content'],formats:{shortString:'integer'}}}).errors.length===1);
  assert.ok(validateManifest(data).uncheckedDetails.length===2);
});
test('regex is explicitly unchecked rather than checked with the wrong engine', () => {
  for(const pattern of ['[','(?<name>a)']) {
    const result=validateManifest(manifest({type:'string',pattern}));
    assert.deepEqual(result.errors,[]);
    assert.ok(result.uncheckedDetails.some(e=>e.path.endsWith('.pattern') && e.reason.includes('regex')));
  }
});
test('CLI inventory is consumed and malformed inventory fails as usage error', () => {
  const directory=mkdtempSync(join(tmpdir(),'preflight-inventory-'));
  try {
    const file=join(directory,'manifest.json'), inventoryFile=join(directory,'inventory.json');
    writeFileSync(file,JSON.stringify(manifest({type:'string',group:'Editorial'})));
    const args=[fileURLToPath(new URL('./modeling-preflight.mjs',import.meta.url)),file,'--profile','cms-sdk-3.0.0-beta.0-manifest-subset-v4',`--inventory=${inventoryFile}`];
    writeFileSync(inventoryFile,JSON.stringify({groups:['Editorial']}));
    assert.equal(spawnSync(process.execPath,args,{encoding:'utf8'}).status,0);
    writeFileSync(inventoryFile,JSON.stringify({groups:[]}));
    assert.equal(spawnSync(process.execPath,args,{encoding:'utf8'}).status,1);
    writeFileSync(inventoryFile,JSON.stringify({groups:'Editorial'}));
    assert.equal(spawnSync(process.execPath,args,{encoding:'utf8'}).status,2);
  } finally { rmSync(directory,{recursive:true}); }
});

test('rejects component isRequired presence for true and false with exact path', () => {
  for (const isRequired of [true, false]) {
    const result = errors({ type: 'component', contentType: 'Card', isRequired });
    assert.ok(result.some(e => e.startsWith('contentTypes[0].properties.value.isRequired:') && e.includes('individual fields')));
  }
});

test('rejects isRequired on component array items while preserving array requirements', () => {
  const value = { type: 'array', isRequired: true, minItems: 1, items: { type: 'component', contentType: 'Card', isRequired: true } };
  assert.ok(errors(value).some(e => e.startsWith('contentTypes[0].properties.value.items.isRequired:')));
  delete value.items.isRequired;
  assert.deepEqual(errors(value), []);
});

test('accepts required scalar fields within a component without changing source manifest', () => {
  const data = manifest({ type: 'component', contentType: 'CTA' });
  data.contentTypes.push({ key: 'CTA', displayName: 'CTA', baseType: '_component', properties: { label: { type: 'string', isRequired: true } } });
  const original = structuredClone(data);
  assert.deepEqual(validateManifest(data).errors, []);
  assert.deepEqual(data, original);
});
test('accepts actual pinned CLI generated sample manifest', () => {
  const data = JSON.parse(readFileSync(new URL('./generated-manifest.fixture.json', import.meta.url), 'utf8').replace(/^\uFEFF/, ''));
  assert.deepEqual(validateManifest(data).errors, []);
});
test('CLI requires explicit profile and returns covered success for fixture', () => {
  const script = fileURLToPath(new URL('./modeling-preflight.mjs', import.meta.url));
  const fixture = fileURLToPath(new URL('./generated-manifest.fixture.json', import.meta.url));
  assert.equal(spawnSync(process.execPath, [script, fixture], { encoding: 'utf8' }).status, 2);
  const result = spawnSync(process.execPath, [script, fixture, '--profile', 'cms-sdk-3.0.0-beta.0-manifest-subset-v4'], { encoding: 'utf8' });
  assert.equal(result.status, 0); assert.deepEqual(JSON.parse(result.stdout).unchecked, ['displayTemplates', 'propertyGroups']);
});
test('CLI distinguishes validation failure from malformed input', () => {
  const directory = mkdtempSync(join(tmpdir(), 'modeling-preflight-'));
  try {
    const script = fileURLToPath(new URL('./modeling-preflight.mjs', import.meta.url));
    const file = join(directory, 'input.json');
    const args = [script, file, '--profile', 'cms-sdk-3.0.0-beta.0-manifest-subset-v4'];
    writeFileSync(file, JSON.stringify(manifest({ type: 'string', isList: true })));
    const invalid = spawnSync(process.execPath, args, { encoding: 'utf8' });
    assert.equal(invalid.status, 1); assert.match(JSON.parse(invalid.stdout).errors.join('\n'), /isList/);
    writeFileSync(file, '{');
    assert.equal(spawnSync(process.execPath, args, { encoding: 'utf8' }).status, 2);
  } finally { rmSync(directory, { recursive: true }); }
});
test('rejects builtin and self sentinels in concrete component or contract targets', () => {
  for (const target of ['_page', '_image', '_component', '_self']) {
    const component = manifest({ type: 'component', contentType: target });
    assert.ok(validateManifest(component, { externalTypes: [target] }).errors.length);
    const contract = manifest({ type: 'string' }); contract.contentTypes[0].contracts = [target];
    assert.ok(validateManifest(contract, { externalTypes: [target] }).errors.length);
  }
  assert.ok(errors({ type: 'content', contentType: '_self' }).length);
  assert.deepEqual(errors({ type: 'content', allowedTypes: ['_self'] }), []);
  const contained = manifest({ type: 'string' }); contained.contentTypes[0].mayContainTypes = ['_self'];
  assert.deepEqual(validateManifest(contained).errors, []);
});
test('accepts a supported array and typed enum', () => {
  assert.deepEqual(errors({ type: 'array', minItems: 1, maxItems: 4, items: { type: 'string', enum: [{ value: 'a', displayName: 'A' }] } }), []);
});
test('rejects unsupported options recursively with exact paths', () => {
  assert.match(errors({ type: 'array', items: { type: 'string', isList: true } }).join('\n'), /contentTypes\[0\]\.properties\.value\.items\.isList/);
});
test('rejects misplaced constraints and aliases', () => {
  for (const value of [{ type: 'string', minItems: 1 }, { type: 'boolean', minimum: 0 }, { type: 'string', required: true }, { type: 'string', default: 'a' }]) assert.ok(errors(value).length);
});
test('rejects malformed and nested arrays', () => {
  for (const value of [{ type: 'array' }, { type: 'array', items: { type: 'array', items: { type: 'string' } } }, { type: 'array', minItems: 3, maxItems: 1, items: { type: 'string' } }]) assert.ok(errors(value).length);
});
test('checks boolean, integer, range and enum values', () => {
  for (const value of [{ type: 'string', isRequired: 'yes' }, { type: 'integer', minimum: 1.5 }, { type: 'float', minimum: 4, maximum: 2 }, { type: 'integer', enum: [{ value: 'one', displayName: 'One' }] }]) assert.ok(errors(value).length);
});
test('checks references, permits explicit external keys and rejects unknown builtins', () => {
  const data = manifest({ type: 'contentReference', allowedTypes: ['External'] });
  assert.ok(validateManifest(data).errors.length);
  assert.deepEqual(validateManifest(data, { externalTypes: ['External'] }).errors, []);
  assert.deepEqual(errors({ type: 'contentReference', allowedTypes: ['_image'] }), []);
  assert.ok(errors({ type: 'contentReference', allowedTypes: ['_imaginary'] }).length);
  assert.ok(errors({ type: 'content', contentType: 'Card', allowedTypes: ['Card'] }).length);
});
test('checks duplicate types, contract targets and missing component targets', () => {
  const data = manifest({ type: 'string' }); data.contentTypes.push(structuredClone(data.contentTypes[0]));
  assert.match(validateManifest(data).errors.join('\n'), /duplicate/);
  assert.ok(errors({ type: 'component' }).length);
  const contract = manifest({ type: 'string' }); contract.contentTypes[0].contracts = ['Card'];
  assert.match(validateManifest(contract).errors.join('\n'), /contract/);
});
test('unsupported constructs fail closed, other manifest areas explicitly reported', () => {
  assert.ok(errors({ type: 'binary' }).length);
  const data = manifest({ type: 'string' }); data.displayTemplates = [];
  assert.ok(validateManifest(data).unchecked.includes('displayTemplates'));
  data.contentTypes[0].mystery = true;
  assert.ok(validateManifest(data).errors.length);
});

test('rejects component localization flags at property and array-item paths', () => {
 for (const isLocalized of [true, false]) {
  assert.ok(errors({type:'component',contentType:'Card',isLocalized}).some(e=>e.startsWith('contentTypes[0].properties.value.isLocalized:')));
  assert.ok(errors({type:'array',items:{type:'component',contentType:'Card',isLocalized}}).some(e=>e.startsWith('contentTypes[0].properties.value.items.isLocalized:')));
 }
});
test('preserves localization on supported child fields and valid array containers', () => {
 const data=manifest({type:'component',contentType:'Child'});
 data.contentTypes.push({key:'Child',displayName:'Child',baseType:'_component',properties:{heading:{type:'string',isLocalized:true},body:{type:'richText',isLocalized:false}}});
 const before=structuredClone(data);
 assert.deepEqual(validateManifest(data).errors,[]);
 assert.deepEqual(data,before);
 assert.deepEqual(errors({type:'array',isLocalized:true,items:{type:'component',contentType:'Child'}}).filter(e=>!e.includes('unresolved content type')),[]);
});
