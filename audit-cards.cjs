const fs=require('fs'),vm=require('vm'),path=require('path');
const read=f=>fs.readFileSync(path.join(__dirname,f),'utf8');
const app=read('app.js'),ctx=vm.createContext({});
vm.runInContext(app.slice(0,app.indexOf('let currentLayer'))+'\n'+app.slice(app.indexOf('const magnifier ='),app.indexOf('const silhouette ='))+'\n'+read('expanded-parts.js')+'\n'+read('anatomy-atlas.js')+'\n'+read('full-body-illustrations.js')+'\n'+read('detail-illustrations.js'),ctx);
const targets={};
function add(svg,group){for(const m of svg.matchAll(/data-item="([^"]+)"[^>]*data-label="([^"]+)"/g)){targets[m[1]]??={name:m[2],groups:[]};if(!targets[m[1]].groups.includes(group))targets[m[1]].groups.push(group);}}
for(const layer of ['skin','muscle','bone','network','organ'])for(const sex of ['male','female'])for(const side of ['front','back'])add(vm.runInContext(`atlasSVG('${layer}','${side}','${sex}')`,ctx),layer);
for(const sex of ['male','female'])add(vm.runInContext(`atlasSVG('organ','front','${sex}','pelvis')`,ctx),'pelvis');
for(const key of ['skin','brain','eye','ear','heart','lungs','kidney'])add(vm.runInContext(`realisticDetailSVG('${key}')`,ctx),key+' detail');
const folder='C:/Users/tktmr/Documents/Codex/2026-10-02/new-chat/outputs/anatomy-cards-final/anatomy-cards-complete-158/cards';
const files=fs.readdirSync(folder).filter(f=>f.endsWith('.png'));
const data=JSON.parse(fs.readFileSync('C:/Users/tktmr/AppData/Local/Temp/card-data.json','utf8'));
// These hotspots are navigation entries. They open an internal/enlarged view and never open a card.
const expansionEntries=new Set(['skin','brain','heart','eye','ear','lungs','kidney','pelvic_reproductive']);
for(const id of expansionEntries)delete targets[id];
const manifest={},missing=[];
for(const [id,t] of Object.entries(targets)){
 const muscle=data.find(row=>row[0].replace(/^\d+-/,'').replaceAll('-','_')===id);
 const file=files.find(f=>f.replace(/^\d+-/,'').replace(/\.png$/,'')===t.name);
 const source=muscle?'C:/Users/tktmr/AppData/Local/Temp/'+muscle[0]+'.png':file?folder+'/'+file:null;
 if(source&&fs.existsSync(source))manifest[id]={name:t.name,src:'assets/cards/'+id+'.png',source};else missing.push({id,...t});
}
console.log(JSON.stringify({targets: Object.keys(targets).length,manifest,missing,sourceCount:files.length+data.length}));
