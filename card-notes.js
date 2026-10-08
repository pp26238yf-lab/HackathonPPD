// Card IDs, not titles or display order, identify independently saved notes.
function createCardNoteStore(storage) {
  const cache=new Map(),failed=new Set(),prefix='karada.card-note.v1.';
  return {
    read(id){if(cache.has(id))return cache.get(id);try{const value=storage().getItem(prefix+id)||'';cache.set(id,value);return value;}catch{return ''; }},
    failed(id){return failed.has(id);},
    save(id,value){cache.set(id,value);try{storage().setItem(prefix+id,value);failed.delete(id);return true;}catch{failed.add(id);return false;}}
  };
}
const cardNoteStore=createCardNoteStore(()=>window.localStorage);
let activeStudyCard=null;
function initStudyCards(){
  const dialog=document.querySelector('#infoCard');
  dialog.classList.add('study-card');
  dialog.innerHTML=`<h2 id="cardTitle" class="sr-only">学習カード</h2>
    <button class="card-close" id="cardClose" aria-label="カードを閉じる">×</button>
    <div class="study-flipper" id="studyFlipper">
      <section class="study-face study-front" id="studyFront" aria-label="カード表面">
        <div class="study-image-wrap" id="studyImageWrap"><img id="studyCardImage" alt=""/><button class="image-note-button" id="imageNoteButton">メモに移動 ↗</button></div>
        <div id="studyMissing" class="study-missing" hidden><p>からだの図鑑</p><h3 id="missingCardName"></h3><p>この部位の全体カード画像は未提供です。<br>メモは記入・保存できます。</p><button id="missingNoteButton">メモに移動 ↗</button></div>
        <p id="cardImageError" hidden>画像を読み込めませんでした。再度カードを開いてください。</p>
      </section>
      <section class="study-face study-back" id="studyBack" aria-label="カード裏面のメモ" inert aria-hidden="true">
        <header><span class="note-kicker">MY ANATOMY NOTES</span><h3 id="noteCardName"></h3><p>気づき、覚え方、あとで調べたいこと。</p></header>
        <label for="cardNoteText">このカードのメモ</label>
        <textarea id="cardNoteText" placeholder="ここに自由に記入してください…" spellcheck="false"></textarea>
        <div class="note-footer"><span id="noteSaveStatus" role="status" aria-live="polite"></span><button id="noteDownload">メモを書き出す</button><button id="noteReturn">↶ カードに戻る</button></div>
        <small>このブラウザーに自動保存。閲覧データの削除・別端末への変更では引き継がれません。</small>
        <small>図版の出典・利用条件：<a href="CARD-SOURCES-158.csv" download>158種の出典一覧</a> ／ <a href="CARD-SOURCES-MUSCLE.txt" target="_blank" rel="noopener">筋肉カード</a> ／ <a href="CARD-SOURCE-README.txt" target="_blank" rel="noopener">利用条件</a></small>
      </section>
    </div>`;
  const flip=back=>{
    document.querySelector('#studyFlipper').classList.toggle('is-flipped',back);
    for(const [selector,hidden] of [['#studyFront',back],['#studyBack',!back]]){const el=document.querySelector(selector);el.inert=hidden;el.setAttribute('aria-hidden',String(hidden));}
    (back?document.querySelector('#cardNoteText'):document.querySelector(document.querySelector('#studyImageWrap').hidden?'#missingNoteButton':'#imageNoteButton')).focus({preventScroll:true});
  };
  document.querySelector('#imageNoteButton').onclick=()=>flip(true);
  document.querySelector('#missingNoteButton').onclick=()=>flip(true);
  document.querySelector('#noteReturn').onclick=()=>flip(false);
  document.querySelector('#cardNoteText').addEventListener('input',e=>{
    if(!activeStudyCard)return;
    const saved=cardNoteStore.save(activeStudyCard.id,e.target.value);
    const status=document.querySelector('#noteSaveStatus');
    status.textContent=saved?'保存済み':'保存できません。この画面を閉じる前に「メモを書き出す」で保存してください。';
    status.classList.toggle('save-failed',!saved);
  });
  document.querySelector('#noteDownload').onclick=()=>{
    const blob=new Blob([activeStudyCard.name+'\n\n'+document.querySelector('#cardNoteText').value],{type:'text/plain;charset=utf-8'});
    const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=activeStudyCard.id+'-memo.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  document.querySelector('#studyCardImage').onerror=()=>{document.querySelector('#cardImageError').hidden=false;};
}
function showStudyCard(id,name){
  const entry=cardImages[id],dialog=document.querySelector('#infoCard');
  activeStudyCard={id:entry?.noteId||id,name};
  document.querySelector('#cardTitle').textContent=name+'の学習カード';
  document.querySelector('#noteCardName').textContent=name;
  document.querySelector('#missingCardName').textContent=name;
  document.querySelector('#studyImageWrap').hidden=!entry;
  document.querySelector('#studyMissing').hidden=!!entry;
  document.querySelector('#cardImageError').hidden=true;
  const image=document.querySelector('#studyCardImage');
  if(entry){image.src=entry.src;image.alt=entry.name+'の解説カード';}else image.removeAttribute('src');
  document.querySelector('#cardNoteText').value=cardNoteStore.read(activeStudyCard.id);
  const failed=cardNoteStore.failed(activeStudyCard.id);
  document.querySelector('#noteSaveStatus').textContent=failed?'未保存のメモです。「メモを書き出す」で保存してください。':'入力すると自動保存します';
  document.querySelector('#noteSaveStatus').classList.toggle('save-failed',failed);
  document.querySelector('#studyFlipper').classList.remove('is-flipped');
  document.querySelector('#studyFront').inert=false;document.querySelector('#studyFront').setAttribute('aria-hidden','false');
  document.querySelector('#studyBack').inert=true;document.querySelector('#studyBack').setAttribute('aria-hidden','true');
  if(!dialog.open)dialog.showModal();
}
initStudyCards();
