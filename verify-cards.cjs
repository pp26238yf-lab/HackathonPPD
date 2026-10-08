const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const nodes=new Map(),data=new Map();let failing=false;
function node(id){if(!nodes.has(id)){const classes=new Set();nodes.set(id,{hidden:false,value:'',textContent:'',attributes:{},classList:{add:x=>classes.add(x),remove:x=>classes.delete(x),contains:x=>classes.has(x),toggle(x,on){on?classes.add(x):classes.delete(x);}},setAttribute(k,v){this.attributes[k]=v;},removeAttribute(k){delete this[k];},focus(){this.focused=true;},addEventListener(k,f){this[k]=f;},showModal(){this.open=true;}});}return nodes.get(id);}
const storage={getItem:k=>data.get(k)||null,setItem(k,v){if(failing)throw Error('quota');data.set(k,v);}};
const ctx=vm.createContext({window:{localStorage:storage},document:{querySelector:node},console});
for(const f of ['card-images.js','card-notes.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,f),'utf8'),ctx);
const run=s=>vm.runInContext(s,ctx),manifest=run('cardImages');
for(const [id,e]of Object.entries(manifest)){assert(fs.existsSync(path.join(__dirname,e.src)),e.src);run(`showStudyCard(${JSON.stringify(id)},${JSON.stringify(e.name)})`);assert.equal(node('#studyCardImage').src,e.src);assert.equal(node('#studyMissing').hidden,true);assert.equal(node('#studyBack').inert,true);}
run("showStudyCard('biceps_brachii','上腕二頭筋')");node('#imageNoteButton').onclick();assert(node('#studyFlipper').classList.contains('is-flipped'));assert.equal(node('#studyFront').inert,true);assert.equal(node('#studyBack').inert,false);
const note='日本語メモ\n<script>no execution</script> 📝';node('#cardNoteText').input({target:{value:note}});
run("showStudyCard('triceps_brachii','上腕三頭筋')");assert.equal(node('#cardNoteText').value,'');node('#cardNoteText').input({target:{value:'別のメモ'}});
run("showStudyCard('biceps_brachii','上腕二頭筋')");assert.equal(node('#cardNoteText').value,note);
assert.equal(run("createCardNoteStore(()=>window.localStorage).read('biceps_brachii')"),note);
node('#noteReturn').onclick();assert.equal(node('#studyBack').inert,true);
node('#cardNoteText').input({target:{value:''}});assert.equal(run("createCardNoteStore(()=>window.localStorage).read('biceps_brachii')"),'');
run("showStudyCard('aorta','大動脈')");node('#cardNoteText').input({target:{value:'大動脈共通'}});run("showStudyCard('aorta_main','大動脈')");assert.equal(node('#cardNoteText').value,'大動脈共通');
failing=true;node('#cardNoteText').input({target:{value:'保存失敗テスト'}});assert(node('#noteSaveStatus').classList.contains('save-failed'));run("showStudyCard('aorta','大動脈')");assert.equal(node('#cardNoteText').value,'保存失敗テスト');assert(node('#noteSaveStatus').classList.contains('save-failed'));
assert.equal(run("createCardNoteStore(()=>{throw Error('disabled')}).read('test')"),'');
run("showStudyCard('skin','皮膚')");assert.equal(node('#studyImageWrap').hidden,true);assert.equal(node('#studyMissing').hidden,false);node('#missingNoteButton').onclick();assert.equal(node('#studyBack').inert,false);
console.log('PASS: 205 card mappings/assets; independent notes, reload, empty/unicode values, aliases, flip/inert state, missing cards, storage failure warning. DOM mock test; not browser visual QA.');
