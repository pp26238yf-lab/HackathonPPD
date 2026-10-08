const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const assert = require('node:assert/strict');
const read = name => fs.readFileSync(path.join(__dirname, name), 'utf8');
const app = read('app.js');
const context = vm.createContext({});
vm.runInContext(app.slice(0, app.indexOf('let currentLayer')) + '\n' + read('detail-illustrations.js') + '\n' +
  app.slice(app.indexOf('function internalSVG('), app.indexOf('function renderBody(')), context);
const ids = svg => [...svg.matchAll(/data-item="([^"]+)"/g)].map(match => match[1]).sort();
const keys = vm.runInContext('Object.keys(items).filter(key => items[key].internal)', context);
let total = 0;
for (const key of keys) {
  const oldSVG = vm.runInContext(`internalSVG('${key}')`, context);
  const newSVG = vm.runInContext(`realisticDetailSVG('${key}')`, context);
  assert.deepEqual(ids(newSVG), ids(oldSVG), `${key}: learning targets changed`);
  const points = vm.runInContext(`detailIllustrations.${key}.parts.map(p => [p[2], p[3]])`, context);
  for (const [x,y] of points) assert(x > 0 && x < 1000 && y > 0 && y < 1000);
  assert.equal([...newSVG.matchAll(/class="hotspot-dot"/g)].length, points.length);
  assert(fs.statSync(path.join(__dirname, `assets/detail-${key}.png`)).size > 1000);
  total += points.length;
}
// Exercise the existing navigation function: first back exits zoom, second back changes layer.
const search = { value:'検索語' };
const navigation = vm.createContext({ document:{querySelector:()=>search} });
vm.runInContext(app.slice(0, app.indexOf('let currentLayer')) + '\n' +
  'let currentLayer=5, internalItem=null, atlasFocus="pelvis", renders=0; function clickSound(){} function renderBody(){renders++;}\n' +
  app.slice(app.indexOf('function moveLayer('), app.indexOf('function bindHotspots(')), navigation);
vm.runInContext('moveLayer(-1)', navigation);
assert.equal(vm.runInContext('atlasFocus', navigation), 'all');
assert.equal(vm.runInContext('currentLayer', navigation), 5);
assert.equal(search.value, '');
vm.runInContext('moveLayer(-1)', navigation);
assert.equal(vm.runInContext('currentLayer', navigation), 4);
vm.runInContext('currentLayer=5; internalItem="heart"; moveLayer(-1)', navigation);
assert.equal(vm.runInContext('internalItem', navigation), null);
assert.equal(vm.runInContext('currentLayer', navigation), 5);
assert(!read('index.html').includes('atlasFocusControls'));
console.log(`PASS: ${keys.length} detail images, ${total} retained targets/red markers, zoom-back navigation.`);
