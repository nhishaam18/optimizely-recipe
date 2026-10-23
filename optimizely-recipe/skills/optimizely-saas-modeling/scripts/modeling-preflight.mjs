#!/usr/bin/env node
// Conservative generated-manifest profile, NOT a complete CMS/API schema validator.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
export const PROFILE = 'cms-sdk-3.0.0-beta.0-manifest-subset-v4';
const bases = ['_component', '_experience', '_section', '_page', '_image', '_media', '_video', '_folder'];
const common = ['type', 'format', 'displayName', 'description', 'isRequired', 'isLocalized', 'group', 'sortOrder', 'indexingType', 'displayMode'];
const options = {
  string: ['pattern', 'minLength', 'maxLength', 'enum'], boolean: [], json: [],
  url: [], link: [], richText: ['editorSettings'], dateTime: ['minimum', 'maximum'],
  integer: ['minimum', 'maximum', 'enum'], float: ['minimum', 'maximum', 'enum'],
  array: ['items', 'minItems', 'maxItems'], component: ['contentType'],
  content: ['contentType', 'allowedTypes', 'restrictedTypes'],
  contentReference: ['contentType', 'allowedTypes', 'restrictedTypes'],
};
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
export function validateManifest(manifest, { externalTypes = [], inventory = {} } = {}) {
  const errors = [], unchecked = [], uncheckedDetails = [];
  const pending = (path, reason) => uncheckedDetails.push({ path, reason });
  const fail = (path, message) => errors.push(`${path}: ${message}`);
  if (!object(inventory) || (inventory.groups !== undefined && (!Array.isArray(inventory.groups) || inventory.groups.some(g => typeof g !== 'string' || !g.trim()))) || (inventory.formats !== undefined && (!object(inventory.formats) || Object.values(inventory.formats).some(t => typeof t !== 'string' || !t.trim())))) throw new Error('inventory requires optional groups:string[] and formats:{key:dataType}; each supplied section must be a complete verified inventory');
  const allowed = (value, keys, path) => { for (const key of Object.keys(value)) if (!keys.includes(key)) fail(`${path}.${key}`, key === 'isList' ? 'unsupported isList; use type "array" with items' : 'unsupported option in this profile; qualify explicitly, do not silently drop'); };
  const str = (value, path) => { if (typeof value !== 'string' || !value.trim()) fail(path, 'expected nonempty string'); };
  if (!object(manifest) || !Array.isArray(manifest.contentTypes)) return { profile: PROFILE, errors: ['contentTypes: expected array in a generated manifest object'], unchecked, uncheckedDetails };
  for (const key of Object.keys(manifest)) if (key !== 'contentTypes') unchecked.push(key);
  const keys = new Map();
  manifest.contentTypes.forEach((ct, i) => {
    if (!object(ct)) { fail(`contentTypes[${i}]`, 'expected object'); return; }
    str(ct.key, `contentTypes[${i}].key`);
    if (typeof ct.key === 'string' && (ct.key.length > 255 || !/^[A-Za-z][_0-9A-Za-z]+$/.test(ct.key))) fail(`contentTypes[${i}].key`, 'expected 2..255 characters starting with a letter, followed by letters, digits or underscore');
    if (keys.has(ct.key)) fail(`contentTypes[${i}].key`, `duplicate key ${ct.key}`);
    keys.set(ct.key, ct);
  });
  const reference = (value, path, kind = 'any') => {
    str(value, path);
    if (typeof value !== 'string') return;
    if (value === '_self') {
      if (!['constraint', 'containment'].includes(kind)) fail(path, '_self is supported only in allowedTypes/restrictedTypes or mayContainTypes in this profile');
      return;
    }
    if (bases.includes(value) && ['component', 'contract'].includes(kind)) {
      fail(path, `expected concrete ${kind} key, not builtin base type ${value}`);
      return;
    }
    const target = keys.get(value);
    if (!target && !bases.includes(value) && !externalTypes.includes(value)) fail(path, `unresolved content type ${value}; include its definition or explicitly qualify as external`);
    if (target && kind === 'contract' && target.isContract !== true) fail(path, 'target must be a contract');
    if (target && kind === 'component' && target.baseType !== '_component') fail(path, 'embedded component target must have baseType _component');
    if (!target && externalTypes.includes(value) && ['component','contract'].includes(kind)) pending(path, 'external type existence acknowledged; target role not validated');
  };
  const refs = (value, path, kind = 'constraint') => {
    if (!Array.isArray(value) || value.length === 0) { fail(path, 'expected nonempty type-key array'); return; }
    value.forEach((entry, i) => reference(entry, `${path}[${i}]`, kind));
    if (new Set(value).size !== value.length) fail(path, 'duplicate type keys');
  };
  const property = (p, path, nested = false) => {
    if (!object(p)) { fail(path, 'expected property object'); return; }
    if (!Object.hasOwn(options, p.type)) { fail(`${path}.type`, `unsupported property type ${String(p.type)} in this profile`); return; }
    allowed(p, [...(nested ? ['type', 'format'] : common), ...options[p.type]], path);
    if (p.type === 'component' && Object.hasOwn(p, 'isRequired')) fail(`${path}.isRequired`, 'isRequired cannot be set on component properties (including false); require supported individual fields on the component type instead. Component presence is a separate requirement.');
    if (p.type === 'component' && Object.hasOwn(p, 'isLocalized')) fail(`${path}.isLocalized`, 'isLocalized cannot be set on component properties (including false); localize supported individual fields on the component type instead.');
    for (const k of ['isRequired', 'isLocalized']) if (k in p && typeof p[k] !== 'boolean') fail(`${path}.${k}`, 'expected boolean');
    for (const k of ['format', 'displayName', 'description', 'group', 'pattern']) if (k in p && typeof p[k] !== 'string') fail(`${path}.${k}`, 'expected string');
    if (typeof p.pattern === 'string') pending(`${path}.pattern`, 'target regex engine syntax/semantics not validated; use a qualified target-compatible check');
    if (!nested && typeof p.group === 'string' && p.group) {
      if (inventory.groups === undefined) pending(`${path}.group`, 'group existence not validated; complete verified inventory not supplied');
      else if (!inventory.groups.includes(p.group)) fail(`${path}.group`, 'group absent from supplied complete inventory');
    }
    if (typeof p.format === 'string' && p.format) {
      const known = {selectOne:'string', selectMany:'string'};
      const expected = Object.hasOwn(known,p.format) ? known[p.format] : (inventory.formats && Object.hasOwn(inventory.formats,p.format) ? inventory.formats[p.format] : undefined);
      if (expected !== undefined && expected !== p.type) fail(`${path}.format`, `format ${p.format} requires type ${expected}`);
      else if (expected === undefined && inventory.formats !== undefined) fail(`${path}.format`, 'format absent from supplied complete inventory');
      else if (expected === undefined) pending(`${path}.format`, 'format existence and type compatibility not validated; complete verified inventory not supplied');
    }
    if ('sortOrder' in p && !Number.isInteger(p.sortOrder)) fail(`${path}.sortOrder`, 'expected integer');
    for (const [k, values] of [['indexingType', ['disabled', 'queryable', 'searchable']], ['displayMode', ['available', 'hidden']]]) if (k in p && !values.includes(p[k])) fail(`${path}.${k}`, `expected one of ${values.join(', ')}`);
    for (const k of ['minItems', 'maxItems', 'minLength', 'maxLength']) if (k in p && (!Number.isInteger(p[k]) || p[k] < 0)) fail(`${path}.${k}`, 'expected nonnegative integer');
    for (const k of ['minimum', 'maximum']) if (k in p) {
      if (p.type === 'dateTime') { if (typeof p[k] !== 'string' || !/^\d{4}-\d\d-\d\dT/.test(p[k]) || Number.isNaN(Date.parse(p[k]))) fail(`${path}.${k}`, 'expected date-time string'); }
      else if (typeof p[k] !== 'number' || !Number.isFinite(p[k]) || (p.type === 'integer' && !Number.isInteger(p[k]))) fail(`${path}.${k}`, 'expected finite number matching property type');
    }
    for (const [lo, hi] of [['minItems', 'maxItems'], ['minLength', 'maxLength'], ['minimum', 'maximum']]) if (lo in p && hi in p) {
      const a = p.type === 'dateTime' ? Date.parse(p[lo]) : p[lo], b = p.type === 'dateTime' ? Date.parse(p[hi]) : p[hi];
      if (a > b) fail(path, `${lo} cannot exceed ${hi}`);
    }
    if ('enum' in p) {
      if (!Array.isArray(p.enum) || !p.enum.length) fail(`${path}.enum`, 'profile supports a nonempty array of {value, displayName} only');
      else p.enum.forEach((entry, i) => {
        const ep = `${path}.enum[${i}]`;
        if (!object(entry)) { fail(ep, 'expected enum entry object'); return; }
        allowed(entry, ['value', 'displayName'], ep); str(entry.displayName, `${ep}.displayName`);
        if (typeof entry.value !== (p.type === 'string' ? 'string' : 'number') || (p.type === 'integer' && !Number.isInteger(entry.value))) fail(`${ep}.value`, 'enum value must match property type');
      });
    }
    if ('editorSettings' in p) {
      if (!object(p.editorSettings)) fail(`${path}.editorSettings`, 'expected object');
      else { allowed(p.editorSettings, ['preset'], `${path}.editorSettings`); if (!['default', 'minimal', 'expanded'].includes(p.editorSettings.preset)) fail(`${path}.editorSettings.preset`, 'unsupported richText preset'); }
    }
    if (p.type === 'array') {
      if (nested) fail(`${path}.type`, 'nested arrays unsupported by this profile');
      else property(p.items, `${path}.items`, true);
    }
    if (p.type === 'component') reference(p.contentType, `${path}.contentType`, 'component');
    if (['content', 'contentReference'].includes(p.type)) {
      const lists = ['allowedTypes', 'restrictedTypes'].filter(k => k in p);
      if ('contentType' in p && lists.length) fail(path, 'contentType conflicts with allowedTypes/restrictedTypes');
      if (!('contentType' in p) && !lists.length) fail(path, 'profile requires explicit type constraints');
      if ('contentType' in p) reference(p.contentType, `${path}.contentType`);
      lists.forEach(k => refs(p[k], `${path}.${k}`));
    }
  };
  manifest.contentTypes.forEach((ct, i) => {
    if (!object(ct)) return;
    const path = `contentTypes[${i}]`;
    allowed(ct, ['key', 'displayName', 'baseType', 'properties', 'isContract', 'contracts', 'mayContainTypes', 'compositionBehaviors'], path);
    str(ct.displayName, `${path}.displayName`);
    if (typeof ct.displayName === 'string' && ct.displayName.length > 255) fail(`${path}.displayName`, 'maximum length is 255');
    if ('isContract' in ct && typeof ct.isContract !== 'boolean') fail(`${path}.isContract`, 'expected boolean');
    if (ct.isContract === true) { if ('baseType' in ct) fail(`${path}.baseType`, 'contract must omit baseType'); }
    else if (!bases.includes(ct.baseType)) fail(`${path}.baseType`, 'unsupported baseType');
    for (const k of ['contracts', 'mayContainTypes']) if (k in ct) refs(ct[k], `${path}.${k}`, k === 'contracts' ? 'contract' : 'containment');
    if ('compositionBehaviors' in ct && (ct.baseType !== '_component' || !Array.isArray(ct.compositionBehaviors) || ct.compositionBehaviors.some(v => !['sectionEnabled', 'elementEnabled', 'formsElementEnabled'].includes(v)))) fail(`${path}.compositionBehaviors`, 'unsupported composition behavior or base type');
    if ('properties' in ct) {
      if (!object(ct.properties)) fail(`${path}.properties`, 'expected property-name map');
      else for (const [name, p] of Object.entries(ct.properties)) property(p, `${path}.properties.${name}`);
    }
  });
  return { profile: PROFILE, errors, unchecked, uncheckedDetails };
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const [file, flag, profile, ...extra] = process.argv.slice(2);
    if (!file || flag !== '--profile' || profile !== PROFILE || extra.some(v => !(v.startsWith('--external-type=') && v.slice(16)) && !(v.startsWith('--inventory=') && v.slice(12))) || extra.filter(v=>v.startsWith('--inventory=')).length > 1) throw new Error(`Usage: node modeling-preflight.mjs <generated-manifest.json> --profile ${PROFILE} [--external-type=KnownKey ...] [--inventory=verified-inventory.json]`);
    const inventoryFile = extra.find(v=>v.startsWith('--inventory='))?.slice(12);
    const result = validateManifest(JSON.parse(readFileSync(file, 'utf8').replace(/^\uFEFF/, '')), { externalTypes: extra.filter(v=>v.startsWith('--external-type=')).map(v => v.slice(16)), inventory: inventoryFile ? JSON.parse(readFileSync(inventoryFile,'utf8').replace(/^\uFEFF/,'')) : {} });
    console.log(JSON.stringify(result, null, 2));
    process.exitCode = result.errors.length ? 1 : 0;
  } catch (error) { console.error(error.message); process.exitCode = 2; }
}
