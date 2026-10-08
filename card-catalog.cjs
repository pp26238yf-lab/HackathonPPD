// Print every current card target directly from the active SVG renderers.
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const read = file => fs.readFileSync(path.join(__dirname, file), 'utf8');
const app = read('app.js');
const context = vm.createContext({});
vm.runInContext(app.slice(0, app.indexOf('let currentLayer')) + '\n' +
  app.slice(app.indexOf('const magnifier ='), app.indexOf('const silhouette =')) + '\n' +
  read('expanded-parts.js') + '\n' + read('anatomy-atlas.js') + '\n' +
  app.slice(app.indexOf('function internalSVG'), app.indexOf('function renderBody')), context);
const targets = svg => {
  const found = new Map();
  for (const match of svg.matchAll(/data-item="([^"]+)"[^>]*data-label="([^"]+)"/g)) found.set(match[1], match[2]);
  return found;
};
for (const layer of ['clothed','skin','muscle','bone','network','organ']) {
  const all = new Map();
  for (const sex of ['male','female']) for (const side of ['front','back']) {
    for (const [id,label] of targets(vm.runInContext(`atlasSVG('${layer}','${side}','${sex}')`, context))) all.set(id,label);
  }
  console.log(`${layer} (${all.size}): ${[...all.values()].join('、')}`);
}
for (const key of ['skin','brain','eye','ear','heart','lungs','kidney']) {
  const all = targets(vm.runInContext(`internalSVG('${key}')`, context));
  console.log(`${key} detail (${all.size}): ${[...all.values()].join('、')}`);
}
