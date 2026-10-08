const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const read=f=>fs.readFileSync(path.join(__dirname,f),'utf8');
const app=read('app.js'),ctx=vm.createContext({});
vm.runInContext(app.slice(0,app.indexOf('let currentLayer'))+'\n'+app.slice(app.indexOf('const magnifier ='),app.indexOf('const silhouette ='))+'\n'+read('expanded-parts.js')+'\n'+read('anatomy-atlas.js')+'\n'+read('full-body-illustrations.js'),ctx);
for(const sex of ['male','female'])for(const side of ['front','back'])for(const layer of ['skin','bone','organ']){
 const svg=vm.runInContext(`atlasSVG('${layer}','${side}','${sex}')`,ctx);
 assert(svg.includes(`viewBox="${side==='front'?0:500} 0 500 1000"`));
 assert(!/undefined|NaN/.test(svg));
 const asset=[...svg.matchAll(/href="([^"]+)"/g)][0][1];
 const png=fs.readFileSync(path.join(__dirname,asset));
 assert.equal(png.readUInt32BE(16),png.readUInt32BE(20),'Plate must be square');
 for(const m of svg.matchAll(/class="full-body-region" cx="([\d.]+)" cy="([\d.]+)"/g)){
   assert(+m[1]>0&&+m[1]<500&&+m[2]>0&&+m[2]<1000,`Out of bounds: ${layer}/${sex}/${side}`);
 }
}
for(const sex of ['male','female'])for(const side of ['front','back']){
 const svg=vm.runInContext(`atlasSVG('network','${side}','${sex}')`,ctx);
 assert(!svg.includes('<image'),'Keep independently filterable network vectors');
 for(const system of ['central','peripheral','artery','vein','lymph'])assert(svg.includes(`data-system="${system}"`));
}
assert(read('index.html').includes('src="full-body-illustrations.js"'));
console.log('PASS: 12 realistic views; 6 square PNG assets; bounded markers; 4 filterable network views.');
