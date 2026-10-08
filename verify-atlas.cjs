const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const read = file => fs.readFileSync(path.join(__dirname, file), 'utf8');
const app = read('app.js');
const context = vm.createContext({});
vm.runInContext(app.slice(0, app.indexOf('let currentLayer')) + '\n' +
  app.slice(app.indexOf('const magnifier ='), app.indexOf('const silhouette =')) + '\n' +
  read('expanded-parts.js') + '\n' + read('anatomy-atlas.js') + '\n' + read('full-body-illustrations.js'), context);
const render = (layer, side, sex) => vm.runInContext(`atlasSVG('${layer}','${side}','${sex}')`, context);
const ids = svg => new Set([...svg.matchAll(/data-item="([^"]+)"/g)].map(m => m[1]));
for (const sex of ['male', 'female']) {
  for (const side of ['front', 'back']) {
    for (const layer of ['clothed', 'skin', 'muscle', 'bone', 'network', 'organ']) {
      const svg = render(layer, side, sex);
      assert(svg.includes(`data-sex="${sex}" data-side="${side}"`));
      assert(!/undefined|NaN/.test(svg));
      if (layer !== 'clothed') assert(ids(svg).size > 0, `${sex}/${side}/${layer}: no targets`);
      if (layer === 'organ') {
        const keys = ids(svg);
        assert(keys.has('pelvic_reproductive'), 'missing pelvic magnifier');
        assert(svg.includes('data-zoom="pelvis"'), 'pelvic magnifier is not actionable');
        assert(!svg.includes('class="pelvic-inset"'), 'pelvic enlarged diagram visible before zoom');
        for (const key of ['uterus','ovary','uterine_tube','vagina']) {
          assert.equal(keys.has(key), sex === 'female' && side === 'front', `${sex}/${side}: ${key}`);
        }
        for (const key of ['prostate','testis','ductus_deferens','penis']) {
          assert.equal(keys.has(key), sex === 'male' && side === 'front', `${sex}/${side}: ${key}`);
        }
      }
    }
  }
  const pelvis = vm.runInContext(`atlasSVG('organ','front','${sex}','pelvis')`, context);
  assert(pelvis.includes('viewBox="330 550 170 245"'));
  assert(pelvis.includes('class="pelvic-inset"'));
  assert(!pelvis.includes('class="atlas-body'), 'full-body anatomy leaked into pelvis zoom');
  assert(!pelvis.includes('M282 546L342 577'), 'body-to-inset connector leaked into pelvis zoom');
  assert(!ids(pelvis).has('pelvic_reproductive'), 'pelvic zoom nested itself');
  assert(ids(pelvis).size >= 7, 'pelvic structures missing');
  for (const key of ['uterus','ovary','uterine_tube','vagina']) assert.equal(ids(pelvis).has(key), sex === 'female');
  for (const key of ['prostate','testis','epididymis','seminal_vesicle','ductus_deferens','penis']) assert.equal(ids(pelvis).has(key), sex === 'male');
  assert([...pelvis.matchAll(/class="hotspot-dot"/g)].length >= 7, 'pelvic red markers missing');
}
for (const layer of ['muscle', 'bone']) {
  const both = new Set([...ids(render(layer,'front','male')), ...ids(render(layer,'back','male'))]);
  const existing = vm.runInContext(`expandedParts.${layer}.map(p => p[0])`, context);
  for (const key of existing) assert(both.has(key), `Missing ${key}`);
}
assert.notEqual(render('bone','front','male'), render('bone','front','female'));
console.log('PASS: 24 models; sex-specific organ isolation; hands-free pelvic zoom with red markers; retained muscle/bone targets.');
