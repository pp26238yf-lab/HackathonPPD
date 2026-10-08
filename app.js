const layers = [
  { id: "clothed", en: "CLOTHED", title: "服を着ている層", description: "まずは外見からスタート。ボタンを押して、からだの内側へ進んでみよう。" },
  { id: "skin", en: "SKIN", title: "皮膚の層", description: "全身を包む、からだ最大の器官。外からの刺激や乾燥から内部を守ります。" },
  { id: "muscle", en: "MUSCLES", title: "筋肉の層", description: "からだを動かし、姿勢を支え、熱を生み出す組織のつながりを見てみよう。" },
  { id: "bone", en: "SKELETON", title: "骨の層", description: "約200個の骨がからだを支え、臓器を守り、動きの土台になります。" },
  { id: "network", en: "NETWORKS", title: "神経・血管・リンパの層", description: "信号・血液・リンパ液を全身へ運ぶ3つのネットワークを、重ねたり絞り込んだりして観察できます。" },
  { id: "organ", en: "ORGANS", title: "臓器の層", description: "光る臓器をタップして学習。虫眼鏡がある臓器は、専用の内部構造ビューへ移動します。" }
];

const layerNavMeta = {
  clothed: { icon:"👕", label:"服" },
  skin: { icon:"🧍", label:"皮膚" },
  muscle: { icon:"💪", label:"筋肉" },
  bone: { icon:"🦴", label:"骨" },
  network: { icon:"🧠", label:"ネットワーク" },
  organ: { icon:"🫀", label:"臓器" }
};

const organChipTargets = [
  { key:"brain", label:"脳", icon:"🧠" },
  { key:"lungs", label:"肺", icon:"🫁" },
  { key:"heart", label:"心臓", icon:"🫀" },
  { key:"liver", label:"肝臓", icon:"●" },
  { key:"stomach", label:"胃", icon:"◒" },
  { key:"kidney", label:"腎臓", icon:"◐" },
  { key:"pancreas", label:"膵臓", icon:"◆" },
  { key:"spleen", label:"脾臓", icon:"●" },
  { key:"small_intestine", label:"小腸", icon:"◎" },
  { key:"large_intestine", label:"大腸", icon:"□" }
];

const items = {
  skin: { title:"皮膚", type:"ORGAN / INTERNAL LAYER", color:"#eaa889", internal:true },
  brain: { title:"脳", type:"ORGAN / INTERNAL LAYER", color:"#eba6a3", internal:true },
  eye: { title:"目", type:"ORGAN / INTERNAL LAYER", color:"#79b7b2", internal:true },
  ear: { title:"耳", type:"ORGAN / INTERNAL LAYER", color:"#e9a386", internal:true },
  heart: { title:"心臓", type:"ORGAN / INTERNAL LAYER", color:"#d94e4f", internal:true },
  lungs: { title:"肺", type:"ORGAN / INTERNAL LAYER", color:"#e6a5a5", internal:true },
  liver: { title:"肝臓", type:"ORGAN", color:"#97483b", text:"肝臓についての詳しい画像・説明を、ここに追加できるカードです。" },
  stomach: { title:"胃", type:"ORGAN", color:"#e9a989", text:"胃についての詳しい画像・説明を、ここに追加できるカードです。" },
  kidney: { title:"腎臓", type:"ORGAN / INTERNAL LAYER", color:"#9b453b", internal:true },
  pelvic_reproductive: { title:"骨盤内生殖器", type:"ORGAN / ENLARGED VIEW", color:"#c98d9a", zoom:"pelvis" },
  intestine: { title:"腸", type:"ORGAN", color:"#d99a7d", text:"腸についての詳しい画像・説明を、ここに追加できるカードです。" }
};

let currentLayer = 0;
let internalItem = null;
let viewSide = "front";
let bodySex = "male";
let atlasFocus = "all";
let networkFilter = "all";
let selectedPartKey = null;
let soundOn = true;
let renderTimer;
const bodyVisual = document.querySelector("#bodyVisual");
const infoCard = document.querySelector("#infoCard");
const screens = {
  home: document.querySelector("#homeScreen"),
  model: document.querySelector("#modelScreen"),
  explorer: document.querySelector("#explorerScreen")
};

function showScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => { screen.hidden = key !== name; });
  document.querySelector("#menuButton").classList.toggle("is-active", name !== "explorer");
  window.scrollTo(0, 0);
  const heading = screens[name].querySelector("h1");
  heading.setAttribute("tabindex", "-1");
  heading.focus({ preventScroll:true });
}

function startExplorer(sex) {
  bodySex = sex;
  currentLayer = 0;
  internalItem = null;
  viewSide = "front";
  atlasFocus = "all";
  networkFilter = "all";
  document.querySelector("#partSearch").value = "";
  clickSound();
  renderBody();
  showScreen("explorer");
}

const magnifier = (x, y) => `<g class="magnifier-marker" transform="translate(${x} ${y})"><circle class="badge" r="10"/><circle class="lens" cx="-2" cy="-2" r="4"/><path class="lens" d="M1 1l5 5" stroke-linecap="round"/></g>`;

const silhouette = (fill, inner="") => `
  <svg viewBox="0 0 360 720" role="img" aria-label="${layers[currentLayer].title}の人体イラスト">
    <defs>
      <linearGradient id="bodyShade" x1="0" x2="1"><stop stop-color="${fill}"/><stop offset=".5" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="${fill}"/></linearGradient>
      <clipPath id="bodyClip"><path d="M180 29c-31 0-50 23-50 55 0 24 10 43 26 52l-4 24-45 20-45 89c-6 14 12 24 20 11l47-73 9 112-16 126-13 188c-1 17 25 22 30 4l37-171h8l37 171c5 18 31 13 30-4l-13-188-16-126 9-112 47 73c8 13 26 3 20-11l-45-89-45-20-4-24c16-9 26-28 26-52 0-32-19-55-50-55z"/></clipPath>
    </defs>
    <path d="M180 29c-31 0-50 23-50 55 0 24 10 43 26 52l-4 24-45 20-45 89c-6 14 12 24 20 11l47-73 9 112-16 126-13 188c-1 17 25 22 30 4l37-171h8l37 171c5 18 31 13 30-4l-13-188-16-126 9-112 47 73c8 13 26 3 20-11l-45-89-45-20-4-24c16-9 26-28 26-52 0-32-19-55-50-55z" fill="url(#bodyShade)" stroke="#305c5c" stroke-opacity=".3" stroke-width="2"/>
    <g clip-path="url(#bodyClip)">${inner}</g>
  </svg>`;

function skinSVG() {
  return silhouette("#e8a17f", `
    <path d="M110 230c40 18 100 18 140 0M119 309c37 12 85 12 122 0M126 443c30 9 78 9 108 0" fill="none" stroke="#c57c63" stroke-width="1.5" opacity=".7"/>
    <circle cx="180" cy="89" r="2" fill="#8a4b3f"/><path d="M169 111q11 7 22 0" fill="none" stroke="#9a5345" stroke-width="2" stroke-linecap="round"/>
    <g class="hotspot" tabindex="0" role="button" aria-label="皮膚の内部構造を見る" data-item="skin"><circle cx="180" cy="264" r="58" fill="transparent"/><circle class="hotspot-ring" cx="180" cy="264" r="52"/></g>${magnifier(224,232)}
    <g class="hotspot" tabindex="0" data-item="hair" data-label="毛髪" data-type="SKIN APPENDAGE"><path d="M143 69q37-58 74 0-8-34-37-34t-37 34z" fill="#5f4337"/><circle class="hotspot-dot" cx="211" cy="58" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="lips" data-label="口唇" data-type="SURFACE TISSUE"><ellipse cx="180" cy="111" rx="15" ry="8" fill="transparent"/><circle class="hotspot-dot" cx="193" cy="109" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="palm" data-label="手掌" data-type="SURFACE TISSUE"><circle cx="82" cy="269" r="12" fill="transparent"/><circle class="hotspot-dot" cx="85" cy="264" r="4"/></g><g class="hotspot" tabindex="0" data-item="palm" data-label="手掌" data-type="SURFACE TISSUE"><circle cx="278" cy="269" r="12" fill="transparent"/></g>
    <g class="hotspot" tabindex="0" data-item="fingernails" data-label="手の爪" data-type="SKIN APPENDAGE"><circle cx="73" cy="285" r="7" fill="transparent"/><circle class="hotspot-dot" cx="73" cy="285" r="4"/></g><g class="hotspot" tabindex="0" data-item="fingernails" data-label="手の爪" data-type="SKIN APPENDAGE"><circle cx="287" cy="285" r="7" fill="transparent"/></g>
    <g class="hotspot" tabindex="0" data-item="sole" data-label="足底" data-type="SURFACE TISSUE"><ellipse cx="127" cy="626" rx="16" ry="10" fill="transparent"/></g><g class="hotspot" tabindex="0" data-item="sole" data-label="足底" data-type="SURFACE TISSUE"><ellipse cx="233" cy="626" rx="16" ry="10" fill="transparent"/><circle class="hotspot-dot" cx="236" cy="626" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="toenails" data-label="足の爪" data-type="SKIN APPENDAGE"><ellipse cx="126" cy="642" rx="9" ry="6" fill="transparent"/><circle class="hotspot-dot" cx="126" cy="642" r="4"/></g><g class="hotspot" tabindex="0" data-item="toenails" data-label="足の爪" data-type="SKIN APPENDAGE"><ellipse cx="234" cy="642" rx="9" ry="6" fill="transparent"/></g>`);
}

function muscleSVG() {
  return silhouette("#b9453f", `
    <g fill="#d56458" stroke="#8f302f" stroke-width="1.4">
      <ellipse cx="164" cy="84" rx="16" ry="38"/><ellipse cx="196" cy="84" rx="16" ry="38"/>
      <path d="M146 166q34-12 68 0l21 59q-27-12-55 0-28-12-55 0z"/><path d="M144 228q18-12 36 0v76q-20 8-39-4z"/><path d="M216 228q-18-12-36 0v76q20 8 39-4z"/>
      <path d="M102 188q18-22 38-12l-17 93-30-12z"/><path d="M258 188q-18-22-38-12l17 93 30-12z"/>
      <path d="M143 313q18-12 34 2l-8 126-40-2z"/><path d="M217 313q-18-12-34 2l8 126 40-2z"/>
      <path d="M128 449q22-8 40 4l-29 176-24-1z"/><path d="M232 449q-22-8-40 4l29 176 24-1z"/>
    </g>
    <g stroke="#f2a08d" stroke-width="2" opacity=".6"><path d="M180 170v132M150 236h60M146 260h68M141 284h78"/></g>
    <g class="hotspot" tabindex="0" data-item="facial_muscles" data-label="表情筋" data-type="MUSCLE"><ellipse cx="180" cy="86" rx="30" ry="42" fill="transparent"/><circle class="hotspot-dot" cx="202" cy="68" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="deltoid" data-label="三角筋" data-type="MUSCLE"><ellipse cx="129" cy="188" rx="23" ry="29" fill="transparent"/><ellipse cx="231" cy="188" rx="23" ry="29" fill="transparent"/><circle class="hotspot-dot" cx="128" cy="178" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="pectoralis_major" data-label="大胸筋" data-type="MUSCLE"><ellipse cx="180" cy="196" rx="45" ry="30" fill="transparent"/><circle class="hotspot-dot" cx="207" cy="186" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="biceps_brachii" data-label="上腕二頭筋" data-type="MUSCLE"><ellipse cx="104" cy="230" rx="18" ry="43" fill="transparent"/><ellipse cx="256" cy="230" rx="18" ry="43" fill="transparent"/><circle class="hotspot-dot" cx="103" cy="213" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="rectus_abdominis" data-label="腹直筋" data-type="MUSCLE"><rect x="145" y="225" width="70" height="82" rx="24" fill="transparent"/><circle class="hotspot-dot" cx="204" cy="246" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="quadriceps" data-label="大腿四頭筋" data-type="MUSCLE"><ellipse cx="152" cy="382" rx="25" ry="68" fill="transparent"/><ellipse cx="208" cy="382" rx="25" ry="68" fill="transparent"/><circle class="hotspot-dot" cx="151" cy="363" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="tibialis_anterior" data-label="前脛骨筋" data-type="MUSCLE"><ellipse cx="130" cy="535" rx="18" ry="82" fill="transparent"/><ellipse cx="230" cy="535" rx="18" ry="82" fill="transparent"/><circle class="hotspot-dot" cx="130" cy="505" r="4"/></g>`);
}

function boneSVG() {
  return silhouette("#cce2dc", `
    <g fill="#f3ead1" stroke="#9a947f" stroke-width="2">
      <circle cx="180" cy="82" r="37"/><path d="M164 116h32l-5 30h-22z"/>
      <path d="M180 143v170M139 174l41 14 41-14M142 190q38 18 76 0M139 211q41 18 82 0M137 232q43 18 86 0M141 253q39 16 78 0" fill="none" stroke-width="5"/>
      <path d="M160 305q20-16 40 0l18 28q-38 19-76 0z"/>
      <path d="M142 181L91 276M218 181l51 95M91 276l-15 9M269 276l15 9" fill="none" stroke-width="8" stroke-linecap="round"/>
      <path d="M162 329l-23 127-12 181M198 329l23 127 12 181" fill="none" stroke-width="11" stroke-linecap="round"/>
      <path d="M127 456l24 3M233 456l-24 3" stroke-width="5"/>
    </g>
    <g class="hotspot" tabindex="0" data-item="skull" data-label="頭蓋骨" data-type="BONE"><circle cx="180" cy="82" r="39" fill="transparent"/><circle class="hotspot-dot" cx="205" cy="59" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="clavicle" data-label="鎖骨" data-type="BONE"><ellipse cx="180" cy="171" rx="48" ry="16" fill="transparent"/><circle class="hotspot-dot" cx="207" cy="168" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="ribs" data-label="肋骨" data-type="BONE"><ellipse cx="180" cy="220" rx="47" ry="57" fill="transparent"/><circle class="hotspot-dot" cx="215" cy="205" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="sternum" data-label="胸骨" data-type="BONE"><rect x="171" y="177" width="18" height="88" rx="9" fill="transparent"/><circle class="hotspot-dot" cx="180" cy="191" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="humerus" data-label="上腕骨" data-type="BONE"><ellipse cx="113" cy="222" rx="17" ry="55" fill="transparent"/><ellipse cx="247" cy="222" rx="17" ry="55" fill="transparent"/><circle class="hotspot-dot" cx="112" cy="199" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="radius_ulna" data-label="橈骨・尺骨" data-type="BONE"><ellipse cx="82" cy="278" rx="17" ry="42" fill="transparent"/><ellipse cx="278" cy="278" rx="17" ry="42" fill="transparent"/><circle class="hotspot-dot" cx="82" cy="263" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="pelvis" data-label="骨盤" data-type="BONE"><ellipse cx="180" cy="325" rx="45" ry="31" fill="transparent"/><circle class="hotspot-dot" cx="211" cy="317" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="femur" data-label="大腿骨" data-type="BONE"><ellipse cx="151" cy="395" rx="18" ry="72" fill="transparent"/><ellipse cx="209" cy="395" rx="18" ry="72" fill="transparent"/><circle class="hotspot-dot" cx="151" cy="370" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="patella" data-label="膝蓋骨" data-type="BONE"><circle cx="139" cy="459" r="16" fill="transparent"/><circle cx="221" cy="459" r="16" fill="transparent"/><circle class="hotspot-dot" cx="139" cy="459" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="tibia_fibula" data-label="脛骨・腓骨" data-type="BONE"><ellipse cx="127" cy="548" rx="17" ry="87" fill="transparent"/><ellipse cx="233" cy="548" rx="17" ry="87" fill="transparent"/><circle class="hotspot-dot" cx="127" cy="515" r="4"/></g>`);
}

function nerveSVG() {
  return silhouette("#e6ead8", `
    <g fill="none" stroke="#e0a93d" stroke-linecap="round" stroke-linejoin="round">
      <path d="M180 117v224" stroke-width="8"/>
      <path d="M180 169l-52 30-45 76M180 169l52 30 45 76" stroke-width="5"/>
      <path d="M148 188l-32 77M212 188l32 77" stroke-width="3"/>
      <path d="M180 324l-30 87-20 218M180 324l30 87 20 218" stroke-width="6"/>
      <path d="M151 404l-17 102M209 404l17 102" stroke-width="3"/>
    </g>
    <g fill="#f0c86c" stroke="#8d682b" stroke-width="1.5"><path d="M151 76c-2-17 9-29 24-27 11-9 29-2 30 11 12 7 9 25 0 32-4 13-22 17-31 8-14 5-27-10-23-24z"/></g>
    <g class="hotspot" tabindex="0" data-item="brain"><circle cx="180" cy="77" r="33" fill="transparent"/></g>${magnifier(210,58)}
    <g class="hotspot" tabindex="0" data-item="spinal_cord" data-label="脊髄" data-type="CENTRAL NERVOUS SYSTEM" data-color="#e0a93d"><circle cx="180" cy="155" r="9" fill="transparent"/><circle class="hotspot-dot" cx="180" cy="155" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="cervical_nerves" data-label="頸神経" data-type="PERIPHERAL NERVE" data-color="#e0a93d"><circle cx="191" cy="143" r="8" fill="transparent"/><circle class="hotspot-dot" cx="191" cy="143" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="brachial_plexus" data-label="腕神経叢" data-type="NERVE PLEXUS" data-color="#e0a93d"><circle cx="139" cy="187" r="9" fill="transparent"/><circle class="hotspot-dot" cx="139" cy="187" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="median_nerve" data-label="正中神経" data-type="PERIPHERAL NERVE" data-color="#e0a93d"><circle cx="103" cy="235" r="8" fill="transparent"/><circle class="hotspot-dot" cx="103" cy="235" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="ulnar_nerve" data-label="尺骨神経" data-type="PERIPHERAL NERVE" data-color="#e0a93d"><circle cx="83" cy="271" r="8" fill="transparent"/><circle class="hotspot-dot" cx="83" cy="271" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="radial_nerve" data-label="橈骨神経" data-type="PERIPHERAL NERVE" data-color="#e0a93d"><circle cx="257" cy="232" r="8" fill="transparent"/><circle class="hotspot-dot" cx="257" cy="232" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="femoral_nerve" data-label="大腿神経" data-type="PERIPHERAL NERVE" data-color="#e0a93d"><circle cx="151" cy="373" r="9" fill="transparent"/><circle class="hotspot-dot" cx="151" cy="373" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="sciatic_nerve" data-label="坐骨神経" data-type="PERIPHERAL NERVE" data-color="#e0a93d"><circle cx="211" cy="405" r="9" fill="transparent"/><circle class="hotspot-dot" cx="211" cy="405" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="tibial_nerve" data-label="脛骨神経" data-type="PERIPHERAL NERVE" data-color="#e0a93d"><circle cx="226" cy="524" r="8" fill="transparent"/><circle class="hotspot-dot" cx="226" cy="524" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="common_fibular_nerve" data-label="総腓骨神経" data-type="PERIPHERAL NERVE" data-color="#e0a93d"><circle cx="131" cy="493" r="8" fill="transparent"/><circle class="hotspot-dot" cx="131" cy="493" r="4"/></g>`);
}

function vesselSVG() {
  return silhouette("#dce9e6", `
    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M179 215V147M179 173l-39-20M179 173l42-20M180 231v115M180 315l-34 98-18 217M180 315l34 98 18 217M168 211l-58 11-33 60M192 211l58 11 33 60" stroke="#d94e4f" stroke-width="6"/>
      <path d="M188 214V148M188 177l-35-22M188 177l39-22M190 234v112M190 318l-27 100-14 212M190 318l39 99 17 213M174 218l-55 13-29 56M197 218l53 17 25 52" stroke="#4e8aa8" stroke-width="5"/>
    </g>
    <path d="M181 211c-14-24-39-5-28 16 8 15 28 30 28 30s22-16 29-33c8-22-18-35-29-13z" fill="#d94e4f" stroke="#733d43" stroke-width="2"/>
    <g class="hotspot" tabindex="0" data-item="heart"><circle cx="181" cy="229" r="27" fill="transparent"/></g>${magnifier(207,236)}
    <g class="hotspot" tabindex="0" data-item="aorta_main" data-label="大動脈" data-type="ARTERY" data-color="#d94e4f"><circle cx="179" cy="174" r="8" fill="transparent"/><circle class="hotspot-dot" cx="179" cy="174" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="carotid_artery" data-label="頸動脈" data-type="ARTERY" data-color="#d94e4f"><circle cx="174" cy="148" r="8" fill="transparent"/><circle class="hotspot-dot" cx="174" cy="148" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="jugular_vein" data-label="頸静脈" data-type="VEIN" data-color="#4e8aa8"><circle cx="190" cy="149" r="8" fill="transparent"/><circle class="hotspot-dot" cx="190" cy="149" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="subclavian_vessels" data-label="鎖骨下動静脈" data-type="ARTERY / VEIN" data-color="#9d6174"><circle cx="216" cy="169" r="8" fill="transparent"/><circle class="hotspot-dot" cx="216" cy="169" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="brachial_artery" data-label="上腕動脈" data-type="ARTERY" data-color="#d94e4f"><circle cx="111" cy="222" r="8" fill="transparent"/><circle class="hotspot-dot" cx="111" cy="222" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="radial_ulnar_arteries" data-label="橈骨・尺骨動脈" data-type="ARTERY" data-color="#d94e4f"><circle cx="80" cy="278" r="8" fill="transparent"/><circle class="hotspot-dot" cx="80" cy="278" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="vena_cava" data-label="大静脈" data-type="VEIN" data-color="#4e8aa8"><circle cx="190" cy="276" r="8" fill="transparent"/><circle class="hotspot-dot" cx="190" cy="276" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="pulmonary_vessels" data-label="肺動脈・肺静脈" data-type="PULMONARY VESSELS" data-color="#8a718c"><circle cx="211" cy="220" r="8" fill="transparent"/><circle class="hotspot-dot" cx="211" cy="220" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="renal_vessels" data-label="腎動静脈" data-type="ARTERY / VEIN" data-color="#9d6174"><circle cx="159" cy="320" r="8" fill="transparent"/><circle class="hotspot-dot" cx="159" cy="320" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="iliac_vessels" data-label="腸骨動静脈" data-type="ARTERY / VEIN" data-color="#9d6174"><circle cx="211" cy="349" r="8" fill="transparent"/><circle class="hotspot-dot" cx="211" cy="349" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="femoral_vessels" data-label="大腿動静脈" data-type="ARTERY / VEIN" data-color="#9d6174"><circle cx="146" cy="414" r="8" fill="transparent"/><circle class="hotspot-dot" cx="146" cy="414" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="great_saphenous_vein" data-label="大伏在静脈" data-type="VEIN" data-color="#4e8aa8"><circle cx="246" cy="515" r="8" fill="transparent"/><circle class="hotspot-dot" cx="246" cy="515" r="4"/></g>`);
}

function lymphSVG() {
  return silhouette("#e2ece3", `
    <g fill="none" stroke="#5b9a73" stroke-width="3" stroke-linecap="round">
      <path d="M180 137v288M180 204l-54-21M180 204l54-21M180 335l-33 88-14 175M180 335l33 88 14 175"/>
      <path d="M125 184l-35 86M235 184l35 86M150 412l-15 74M210 412l15 74"/>
    </g>
    <g fill="#78b88f" stroke="#2f7051" stroke-width="1"><circle cx="165" cy="136" r="5"/><circle cx="195" cy="136" r="5"/><circle cx="129" cy="183" r="6"/><circle cx="231" cy="183" r="6"/><circle cx="153" cy="339" r="6"/><circle cx="207" cy="339" r="6"/><circle cx="147" cy="421" r="7"/><circle cx="213" cy="421" r="7"/><circle cx="135" cy="486" r="5"/><circle cx="225" cy="486" r="5"/></g>
    <g class="hotspot" tabindex="0" data-item="tonsils" data-label="扁桃" data-type="LYMPHATIC TISSUE" data-color="#78b88f"><circle cx="180" cy="119" r="8" fill="transparent"/><circle class="hotspot-dot" cx="180" cy="119" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="cervical_lymph_nodes" data-label="頸部リンパ節" data-type="LYMPH NODE" data-color="#78b88f"><circle cx="165" cy="136" r="9" fill="transparent"/><circle class="hotspot-dot" cx="165" cy="136" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="axillary_lymph_nodes" data-label="腋窩リンパ節" data-type="LYMPH NODE" data-color="#78b88f"><circle cx="129" cy="183" r="9" fill="transparent"/><circle class="hotspot-dot" cx="129" cy="183" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="thymus_lymph" data-label="胸腺" data-type="LYMPHATIC ORGAN" data-color="#e6b267"><path d="M172 192q8-14 16 0v31q-8 9-16 0z" fill="#e6b267"/><circle class="hotspot-dot" cx="180" cy="194" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="spleen_lymph" data-label="脾臓" data-type="LYMPHATIC ORGAN" data-color="#9e5067"><ellipse cx="220" cy="306" rx="10" ry="18" fill="#9e5067"/><circle class="hotspot-dot" cx="220" cy="306" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="thoracic_duct" data-label="胸管" data-type="LYMPHATIC VESSEL" data-color="#5b9a73"><circle cx="180" cy="270" r="8" fill="transparent"/><circle class="hotspot-dot" cx="180" cy="270" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="cisterna_chyli" data-label="乳び槽" data-type="LYMPHATIC VESSEL" data-color="#5b9a73"><ellipse cx="180" cy="329" rx="9" ry="13" fill="#78b88f"/><circle class="hotspot-dot" cx="180" cy="329" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="intestinal_lymph_nodes" data-label="腸間膜リンパ節" data-type="LYMPH NODE" data-color="#78b88f"><circle cx="207" cy="339" r="9" fill="transparent"/><circle class="hotspot-dot" cx="207" cy="339" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="inguinal_lymph_nodes" data-label="鼠径リンパ節" data-type="LYMPH NODE" data-color="#78b88f"><circle cx="147" cy="421" r="10" fill="transparent"/><circle class="hotspot-dot" cx="147" cy="421" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="popliteal_lymph_nodes" data-label="膝窩リンパ節" data-type="LYMPH NODE" data-color="#78b88f"><circle cx="135" cy="486" r="9" fill="transparent"/><circle class="hotspot-dot" cx="135" cy="486" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="lymphatic_vessels" data-label="リンパ管" data-type="LYMPHATIC VESSEL" data-color="#5b9a73"><circle cx="224" cy="520" r="8" fill="transparent"/><circle class="hotspot-dot" cx="224" cy="520" r="4"/></g>`);
}

function clothedBackSVG() {
  return silhouette("#e5a080", `
    <path d="M142 61q38-47 76 0v61q-38 22-76 0z" fill="#5f4337"/>
    <path d="M137 158q43-20 86 0l14 112q-57 23-114 0z" fill="#17676b" stroke="#0e4f53" stroke-width="2"/>
    <path d="M137 270h86l9 73-45 5-7-42-7 42-45-5z" fill="#17676b" stroke="#0e4f53" stroke-width="2"/>
    <path d="M147 173q33 16 66 0M180 159v111" fill="none" stroke="#398589" stroke-width="2" opacity=".65"/>`);
}

function skinBackSVG() {
  return silhouette("#e8a17f", `
    <path d="M143 66q37-48 74 0v59q-37 20-74 0z" fill="#5f4337"/>
    <path d="M125 196q55 25 110 0M132 302q48 18 96 0M133 440q47 14 94 0" fill="none" stroke="#c57c63" stroke-width="1.5" opacity=".75"/>
    <g class="hotspot" tabindex="0" data-item="skin"><ellipse cx="180" cy="248" rx="58" ry="74" fill="transparent"/><circle class="hotspot-ring" cx="180" cy="248" r="52"/></g>${magnifier(226,218)}
    <g class="hotspot" tabindex="0" data-item="scalp_hair" data-label="頭皮・毛髪" data-type="SKIN APPENDAGE"><ellipse cx="180" cy="79" rx="36" ry="42" fill="transparent"/><circle class="hotspot-dot" cx="207" cy="61" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="back_skin" data-label="背部の皮膚" data-type="SURFACE TISSUE"><ellipse cx="180" cy="250" rx="43" ry="65" fill="transparent"/><circle class="hotspot-dot" cx="205" cy="236" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="elbow_skin" data-label="肘の皮膚" data-type="SURFACE TISSUE"><circle cx="101" cy="247" r="11" fill="transparent"/><circle class="hotspot-dot" cx="101" cy="247" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="heel" data-label="かかと" data-type="SURFACE TISSUE"><ellipse cx="127" cy="625" rx="13" ry="10" fill="transparent"/><circle class="hotspot-dot" cx="127" cy="625" r="4"/></g>`);
}

function muscleBackSVG() {
  return silhouette("#b9453f", `
    <g fill="#d56458" stroke="#8f302f" stroke-width="1.4">
      <path d="M150 151q30-15 60 0l24 65q-54 31-108 0z"/>
      <path d="M137 205q43 36 86 0l7 100q-50 28-100 0z"/>
      <path d="M101 183q25-18 39-5l-16 93-31-11zM259 183q-25-18-39-5l16 93 31-11z"/>
      <path d="M140 315q40-22 80 0l-3 54q-37 23-74 0z"/>
      <path d="M143 367q18-15 34 0l-9 78-39-2zM217 367q-18-15-34 0l9 78 39-2z"/>
      <path d="M128 451q21-10 40 5l-29 174-24-1zM232 451q-21-10-40 5l29 174 24-1z"/>
    </g>
    <g class="hotspot" tabindex="0" data-item="trapezius" data-label="僧帽筋" data-type="MUSCLE"><ellipse cx="180" cy="178" rx="48" ry="42" fill="transparent"/><circle class="hotspot-dot" cx="206" cy="165" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="latissimus_dorsi" data-label="広背筋" data-type="MUSCLE"><ellipse cx="180" cy="255" rx="48" ry="57" fill="transparent"/><circle class="hotspot-dot" cx="211" cy="251" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="triceps_brachii" data-label="上腕三頭筋" data-type="MUSCLE"><ellipse cx="104" cy="221" rx="17" ry="42" fill="transparent"/><circle class="hotspot-dot" cx="104" cy="221" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="gluteus_maximus" data-label="大臀筋" data-type="MUSCLE"><ellipse cx="180" cy="340" rx="44" ry="36" fill="transparent"/><circle class="hotspot-dot" cx="205" cy="335" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="hamstrings" data-label="ハムストリングス" data-type="MUSCLE"><ellipse cx="151" cy="404" rx="22" ry="54" fill="transparent"/><circle class="hotspot-dot" cx="151" cy="390" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="gastrocnemius" data-label="腓腹筋" data-type="MUSCLE"><ellipse cx="129" cy="520" rx="18" ry="64" fill="transparent"/><circle class="hotspot-dot" cx="129" cy="501" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="achilles_tendon" data-label="アキレス腱" data-type="TENDON"><ellipse cx="128" cy="603" rx="10" ry="36" fill="transparent"/><circle class="hotspot-dot" cx="128" cy="594" r="4"/></g>`);
}

function boneBackSVG() {
  return silhouette("#cce2dc", `
    <g fill="#f3ead1" stroke="#9a947f" stroke-width="2">
      <circle cx="180" cy="82" r="37"/><path d="M174 119h12v195h-12z"/>
      <path d="M143 174q37 38 74 0l-12 82q-25-29-50 0z"/>
      <path d="M160 305q20-16 40 0l18 28q-38 19-76 0z"/>
      <path d="M142 181L91 276M218 181l51 95" fill="none" stroke-width="8" stroke-linecap="round"/>
      <path d="M162 329l-23 127-12 181M198 329l23 127 12 181" fill="none" stroke-width="11" stroke-linecap="round"/>
    </g>
    <g class="hotspot" tabindex="0" data-item="scapula" data-label="肩甲骨" data-type="BONE"><ellipse cx="151" cy="206" rx="23" ry="36" fill="transparent"/><circle class="hotspot-dot" cx="151" cy="192" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="vertebral_column" data-label="脊柱" data-type="BONE"><rect x="168" y="129" width="24" height="180" rx="10" fill="transparent"/><circle class="hotspot-dot" cx="180" cy="219" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="sacrum" data-label="仙骨" data-type="BONE"><ellipse cx="180" cy="323" rx="22" ry="25" fill="transparent"/><circle class="hotspot-dot" cx="180" cy="323" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="pelvis_back" data-label="骨盤（背面）" data-type="BONE"><ellipse cx="180" cy="329" rx="45" ry="31" fill="transparent"/><circle class="hotspot-dot" cx="212" cy="319" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="femur_back" data-label="大腿骨（背面）" data-type="BONE"><ellipse cx="151" cy="395" rx="17" ry="70" fill="transparent"/><circle class="hotspot-dot" cx="151" cy="375" r="4"/></g>
    <g class="hotspot" tabindex="0" data-item="tibia_fibula_back" data-label="脛骨・腓骨（背面）" data-type="BONE"><ellipse cx="128" cy="548" rx="16" ry="85" fill="transparent"/><circle class="hotspot-dot" cx="128" cy="520" r="4"/></g>`);
}

function networkSVG(side) {
  const back = side === "back";
  return silhouette("#e3ece5", `
    <g data-system="central" fill="none" stroke="#e0a93d" stroke-linecap="round"><path d="M180 116v225" stroke-width="8"/><path d="M151 76c-2-17 9-29 24-27 11-9 29-2 30 11 12 7 9 25 0 32-4 13-22 17-31 8-14 5-27-10-23-24z" fill="#f0c86c" stroke="#8d682b" stroke-width="1.5"/><g class="hotspot" tabindex="0" data-item="spinal_cord" data-label="脊髄" data-type="CENTRAL NERVOUS SYSTEM" data-color="#e0a93d"><circle cx="180" cy="155" r="9" fill="transparent"/><circle class="hotspot-dot" cx="180" cy="155" r="4"/></g></g>
    <g data-system="peripheral" fill="none" stroke="#e0a93d" stroke-linecap="round"><path d="M180 169l-52 30-45 76M180 169l52 30 45 76M180 324l-30 87-20 218M180 324l30 87 20 218" stroke-width="5"/><g class="hotspot" tabindex="0" data-item="brachial_plexus" data-label="腕神経叢" data-type="NERVE PLEXUS" data-color="#e0a93d"><circle cx="139" cy="187" r="9" fill="transparent"/><circle class="hotspot-dot" cx="139" cy="187" r="4"/></g><g class="hotspot" tabindex="0" data-item="${back ? "sciatic_nerve" : "femoral_nerve"}" data-label="${back ? "坐骨神経" : "大腿神経"}" data-type="PERIPHERAL NERVE" data-color="#e0a93d"><circle cx="${back ? 210 : 151}" cy="405" r="9" fill="transparent"/><circle class="hotspot-dot" cx="${back ? 210 : 151}" cy="405" r="4"/></g><g class="hotspot" tabindex="0" data-item="tibial_nerve" data-label="脛骨神経" data-type="PERIPHERAL NERVE" data-color="#e0a93d"><circle cx="226" cy="524" r="8" fill="transparent"/><circle class="hotspot-dot" cx="226" cy="524" r="4"/></g></g>
    <g data-system="artery" fill="none" stroke="#d94e4f" stroke-linecap="round"><path d="M179 215V147M179 173l-39-20M179 173l42-20M180 231v115M180 315l-34 98-18 217M180 315l34 98 18 217M168 211l-58 11-33 60M192 211l58 11 33 60" stroke-width="5"/><g class="hotspot" tabindex="0" data-item="aorta_main" data-label="大動脈" data-type="ARTERY" data-color="#d94e4f"><circle cx="179" cy="174" r="8" fill="transparent"/><circle class="hotspot-dot" cx="179" cy="174" r="4"/></g><g class="hotspot" tabindex="0" data-item="carotid_artery" data-label="頸動脈" data-type="ARTERY" data-color="#d94e4f"><circle cx="174" cy="148" r="8" fill="transparent"/><circle class="hotspot-dot" cx="174" cy="148" r="4"/></g><g class="hotspot" tabindex="0" data-item="femoral_artery" data-label="大腿動脈" data-type="ARTERY" data-color="#d94e4f"><circle cx="146" cy="414" r="8" fill="transparent"/><circle class="hotspot-dot" cx="146" cy="414" r="4"/></g></g>
    <g data-system="vein" fill="none" stroke="#4e8aa8" stroke-linecap="round"><path d="M188 214V148M188 177l-35-22M188 177l39-22M190 234v112M190 318l-27 100-14 212M190 318l39 99 17 213M174 218l-55 13-29 56M197 218l53 17 25 52" stroke-width="4"/><g class="hotspot" tabindex="0" data-item="jugular_vein" data-label="頸静脈" data-type="VEIN" data-color="#4e8aa8"><circle cx="190" cy="149" r="8" fill="transparent"/><circle class="hotspot-dot" cx="190" cy="149" r="4"/></g><g class="hotspot" tabindex="0" data-item="vena_cava" data-label="大静脈" data-type="VEIN" data-color="#4e8aa8"><circle cx="190" cy="276" r="8" fill="transparent"/><circle class="hotspot-dot" cx="190" cy="276" r="4"/></g><g class="hotspot" tabindex="0" data-item="great_saphenous_vein" data-label="大伏在静脈" data-type="VEIN" data-color="#4e8aa8"><circle cx="246" cy="515" r="8" fill="transparent"/><circle class="hotspot-dot" cx="246" cy="515" r="4"/></g></g>
    <g data-system="lymph" fill="none" stroke="#5b9a73" stroke-linecap="round"><path d="M180 137v288M180 204l-54-21M180 204l54-21M180 335l-33 88-14 175M180 335l33 88 14 175" stroke-width="3"/><g fill="#78b88f" stroke="#2f7051" stroke-width="1"><circle cx="165" cy="136" r="5"/><circle cx="129" cy="183" r="6"/><circle cx="147" cy="421" r="7"/><circle cx="135" cy="486" r="5"/></g><g class="hotspot" tabindex="0" data-item="cervical_lymph_nodes" data-label="頸部リンパ節" data-type="LYMPH NODE" data-color="#78b88f"><circle cx="165" cy="136" r="9" fill="transparent"/><circle class="hotspot-dot" cx="165" cy="136" r="4"/></g><g class="hotspot" tabindex="0" data-item="axillary_lymph_nodes" data-label="腋窩リンパ節" data-type="LYMPH NODE" data-color="#78b88f"><circle cx="129" cy="183" r="9" fill="transparent"/><circle class="hotspot-dot" cx="129" cy="183" r="4"/></g><g class="hotspot" tabindex="0" data-item="${back ? "popliteal_lymph_nodes" : "inguinal_lymph_nodes"}" data-label="${back ? "膝窩リンパ節" : "鼠径リンパ節"}" data-type="LYMPH NODE" data-color="#78b88f"><circle cx="${back ? 135 : 147}" cy="${back ? 486 : 421}" r="9" fill="transparent"/><circle class="hotspot-dot" cx="${back ? 135 : 147}" cy="${back ? 486 : 421}" r="4"/></g></g>`);
}

function organBackSVG() {
  return silhouette("#d7e9e3", `
    <g stroke="#683d3b" stroke-width="1.4">
      <g class="hotspot" tabindex="0" data-item="brain"><path d="M151 76c-2-17 9-29 24-27 11-9 29-2 30 11 12 7 9 25 0 32-4 13-22 17-31 8-14 5-27-10-23-24z" fill="#eba6a3"/></g>${magnifier(210,58)}
      <path d="M176 172c-30-17-49 13-44 68 4 35 25 42 44 22zM184 172c30-17 49 13 44 68-4 35-25 42-44 22z" fill="#e6a5a5"/>
      <g class="hotspot" tabindex="0" data-item="lungs"><circle cx="147" cy="193" r="19" fill="transparent"/></g>${magnifier(139,185)}
      <g class="hotspot" tabindex="0" data-item="kidney"><path d="M148 278c-19 4-22 38-4 47 17 7 26-12 23-30-3-11-9-19-19-17zM212 278c19 4 22 38 4 47-17 7-26-12-23-30 3-11 9-19 19-17z" fill="#9b453b"/></g>${magnifier(139,303)}
      <g class="hotspot" tabindex="0" data-item="adrenal_glands" data-label="副腎" data-type="ENDOCRINE ORGAN" data-color="#f0c86c"><path d="M140 279l8-11 8 11zM204 279l8-11 8 11z" fill="#f0c86c"/><circle class="hotspot-dot" cx="148" cy="273" r="3.5"/></g>
      <g class="hotspot" tabindex="0" data-item="spleen" data-label="脾臓" data-type="LYMPHATIC ORGAN" data-color="#9e5067"><ellipse cx="140" cy="255" rx="9" ry="18" fill="#9e5067"/><circle class="hotspot-dot" cx="140" cy="255" r="4"/></g>
    </g>`);
}

function organSVG() {
  return silhouette("#d7e9e3", `
    <g stroke="#683d3b" stroke-width="1.4">
      <g class="hotspot" tabindex="0" data-item="brain"><path d="M151 76c-2-17 9-29 24-27 11-9 29-2 30 11 12 7 9 25 0 32-4 13-22 17-31 8-14 5-27-10-23-24z" fill="#eba6a3"/></g>${magnifier(211,57)}
      <g class="hotspot" tabindex="0" data-item="eye"><circle cx="165" cy="91" r="10" fill="transparent"/><circle cx="165" cy="91" r="4.5" fill="#79b7b2"/></g>${magnifier(162,105)}
      <g class="hotspot" tabindex="0" data-item="ear"><ellipse cx="137" cy="91" rx="9" ry="14" fill="transparent"/><ellipse cx="137" cy="91" rx="5" ry="11" fill="#e9a386"/></g>${magnifier(147,91)}
      <g class="hotspot" tabindex="0" data-item="pituitary" data-label="下垂体" data-type="ENDOCRINE ORGAN" data-color="#e8bd54"><circle cx="179" cy="99" r="8" fill="transparent"/><circle class="hotspot-dot" cx="179" cy="99" r="4"/></g>
      <g class="hotspot" tabindex="0" data-item="pineal_gland" data-label="松果体" data-type="ENDOCRINE ORGAN" data-color="#c76d9b"><circle cx="194" cy="81" r="8" fill="transparent"/><circle class="hotspot-dot" cx="194" cy="81" r="4"/></g>
      <circle cx="151" cy="116" r="6" fill="#e8bd54"/><circle cx="209" cy="116" r="6" fill="#e8bd54"/><g class="hotspot" tabindex="0" data-item="salivary_glands" data-label="唾液腺" data-type="DIGESTIVE ORGAN" data-color="#e8bd54"><circle cx="151" cy="116" r="8" fill="transparent"/><circle class="hotspot-dot" cx="151" cy="116" r="4"/></g>
      <g class="hotspot" tabindex="0" data-item="tongue" data-label="舌" data-type="DIGESTIVE ORGAN / SENSE ORGAN" data-color="#df7474"><ellipse cx="180" cy="119" rx="13" ry="8" fill="#df7474"/><circle class="hotspot-dot" cx="189" cy="119" r="3.5"/></g>
      <g class="hotspot" tabindex="0" data-item="pharynx" data-label="咽頭" data-type="RESPIRATORY / DIGESTIVE ORGAN" data-color="#b67675"><rect x="174" y="129" width="12" height="21" rx="6" fill="#b67675"/><circle class="hotspot-dot" cx="180" cy="136" r="3.5"/></g>
      <g class="hotspot" tabindex="0" data-item="thyroid" data-label="甲状腺" data-type="ENDOCRINE ORGAN" data-color="#e8bd54"><path d="M166 151q14-13 28 0l-4 15q-10-8-20 0z" fill="#e8bd54"/><circle class="hotspot-dot" cx="180" cy="153" r="3.5"/></g>
      <g class="hotspot" tabindex="0" data-item="parathyroid" data-label="副甲状腺" data-type="ENDOCRINE ORGAN" data-color="#ef9b69"><circle cx="173" cy="157" r="6" fill="transparent"/><circle class="hotspot-dot" cx="173" cy="157" r="3"/></g>
      <path d="M176 164v47" stroke="#79b7b2" stroke-width="8" stroke-linecap="round"/>
      <path d="M186 164v104" stroke="#d59078" stroke-width="7" stroke-linecap="round"/>
      <path d="M176 172c-30-17-49 13-44 68 4 35 25 42 44 22zM184 172c30-17 49 13 44 68-4 35-25 42-44 22z" fill="#e6a5a5"/>
      <g class="hotspot" tabindex="0" data-item="lungs"><circle cx="147" cy="193" r="18" fill="transparent"/></g>
      <g class="hotspot" tabindex="0" data-item="lungs"><circle cx="213" cy="193" r="18" fill="transparent"/></g>${magnifier(139,186)}
      <g class="hotspot" tabindex="0" data-item="thymus" data-label="胸腺" data-type="LYMPHATIC / ENDOCRINE ORGAN" data-color="#e6b267"><path d="M172 192q8-14 16 0v31q-8 9-16 0z" fill="#e6b267"/><circle class="hotspot-dot" cx="180" cy="194" r="3.5"/></g>
      <g class="hotspot" tabindex="0" data-item="heart"><path d="M181 212c-14-24-39-5-28 16 8 15 28 30 28 30s22-16 29-33c8-22-18-35-29-13z" fill="#d94e4f"/></g>${magnifier(203,239)}
      <path d="M129 257q51-26 102 0" fill="none" stroke="#c76d9b" stroke-width="9" stroke-linecap="round"/>
      <g class="hotspot" tabindex="0" data-item="liver"><path d="M135 267q50-18 91 4l-10 32q-45 10-86-5z" fill="#97483b"/><circle class="hotspot-dot" cx="146" cy="280" r="4"/></g>
      <g class="hotspot" tabindex="0" data-item="gallbladder" data-label="胆のう" data-type="DIGESTIVE ORGAN" data-color="#7d9f57"><ellipse cx="214" cy="286" rx="7" ry="12" fill="#7d9f57"/><circle class="hotspot-dot" cx="214" cy="286" r="3.5"/></g>
      <g class="hotspot" tabindex="0" data-item="stomach"><path d="M196 280q26 4 17 32-8 25-36 17 20-13 8-37z" fill="#e9a989"/><circle class="hotspot-dot" cx="203" cy="305" r="4"/></g>
      <g class="hotspot" tabindex="0" data-item="pancreas" data-label="膵臓" data-type="DIGESTIVE / ENDOCRINE ORGAN" data-color="#e8bd54"><path d="M157 316q32-12 66 1-30 13-66 5z" fill="#e8bd54"/><circle class="hotspot-dot" cx="188" cy="318" r="3.5"/></g>
      <path d="M142 306l8-10 8 10zM202 306l8-10 8 10z" fill="#f0c86c"/><g class="hotspot" tabindex="0" data-item="adrenal_glands" data-label="副腎" data-type="ENDOCRINE ORGAN" data-color="#f0c86c"><circle cx="150" cy="301" r="7" fill="transparent"/><circle class="hotspot-dot" cx="150" cy="301" r="3.5"/></g>
      <g class="hotspot" tabindex="0" data-item="kidney"><path d="M148 306c-17 4-20 31-4 38 15 6 23-10 20-25-2-9-7-15-16-13zM212 306c17 4 20 31 4 38-15 6-23-10-20-25 2-9 7-15 16-13z" fill="#9b453b"/></g>${magnifier(142,330)}
      <path d="M157 337l14 72M203 337l-14 72" fill="none" stroke="#e8bd54" stroke-width="4"/>
      <path d="M145 339q-15 48 4 83h63q18-36 3-83" fill="none" stroke="#bd795f" stroke-width="14" stroke-linecap="round"/><g class="hotspot" tabindex="0" data-item="large_intestine" data-label="大腸" data-type="DIGESTIVE ORGAN" data-color="#bd795f"><circle cx="138" cy="360" r="8" fill="transparent"/><circle class="hotspot-dot" cx="138" cy="360" r="4"/></g>
      <path d="M157 351q48-13 45 7t-39 6q-14 18 14 19t23 17-40 5q-10-6 0-15 14-8 36-2" fill="none" stroke="#d99a7d" stroke-width="10" stroke-linecap="round"/><g class="hotspot" tabindex="0" data-item="small_intestine" data-label="小腸" data-type="DIGESTIVE ORGAN" data-color="#d99a7d"><circle cx="199" cy="386" r="8" fill="transparent"/><circle class="hotspot-dot" cx="199" cy="386" r="4"/></g>
      <path d="M146 413q-8 10-2 20" fill="none" stroke="#d46f65" stroke-width="5" stroke-linecap="round"/><g class="hotspot" tabindex="0" data-item="appendix" data-label="虫垂" data-type="DIGESTIVE ORGAN" data-color="#d46f65"><circle cx="138" cy="430" r="7" fill="transparent"/><circle class="hotspot-dot" cx="138" cy="430" r="3.5"/></g>
      <path d="M180 411v34" stroke="#bd795f" stroke-width="8" stroke-linecap="round"/>
      <g class="hotspot" tabindex="0" data-item="urinary_bladder" data-label="膀胱" data-type="URINARY ORGAN" data-color="#e8bd54"><path d="M165 421q15-18 30 0l-4 25h-22z" fill="#e8bd54"/><circle class="hotspot-dot" cx="180" cy="428" r="3.5"/></g>
      <g class="hotspot" tabindex="0" data-item="trachea_outer" data-label="気管" data-type="RESPIRATORY ORGAN" data-color="#79b7b2"><circle cx="168" cy="174" r="7" fill="transparent"/><circle class="hotspot-dot" cx="168" cy="174" r="3.5"/></g>
      <g class="hotspot" tabindex="0" data-item="esophagus" data-label="食道" data-type="DIGESTIVE ORGAN" data-color="#d59078"><circle cx="192" cy="174" r="7" fill="transparent"/><circle class="hotspot-dot" cx="192" cy="174" r="3.5"/></g>
      <g class="hotspot" tabindex="0" data-item="diaphragm" data-label="横隔膜" data-type="RESPIRATORY MUSCLE" data-color="#c76d9b"><circle cx="218" cy="258" r="7" fill="transparent"/><circle class="hotspot-dot" cx="218" cy="258" r="3.5"/></g>
      <g class="hotspot" tabindex="0" data-item="spleen" data-label="脾臓" data-type="LYMPHATIC ORGAN" data-color="#9e5067"><ellipse cx="223" cy="292" rx="8" ry="16" fill="#9e5067"/><circle class="hotspot-dot" cx="224" cy="293" r="4"/></g>
      <g class="hotspot" tabindex="0" data-item="ureters_outer" data-label="尿管" data-type="URINARY ORGAN" data-color="#e8bd54"><circle cx="162" cy="347" r="7" fill="transparent"/><circle class="hotspot-dot" cx="162" cy="347" r="3.5"/></g>
      <g class="hotspot" tabindex="0" data-item="rectum" data-label="直腸" data-type="DIGESTIVE ORGAN" data-color="#bd795f"><circle cx="163" cy="416" r="7" fill="transparent"/><circle class="hotspot-dot" cx="163" cy="416" r="3.5"/></g>
    </g>`);
}

function internalSVG(key) {
  const item = items[key];
  const shapes = {
    skin: `
      <g class="hotspot" tabindex="0" data-item="epidermis" data-label="表皮" data-type="SKIN STRUCTURE" data-color="#ed9c80"><rect x="66" y="172" width="228" height="54" rx="12" fill="#ed9c80"/><text class="part-label" x="78" y="202">表皮</text></g>
      <g class="hotspot" tabindex="0" data-item="dermis" data-label="真皮" data-type="SKIN STRUCTURE" data-color="#d97965"><rect x="66" y="226" width="228" height="96" fill="#d97965"/><text class="part-label" x="78" y="253">真皮</text></g>
      <g class="hotspot" tabindex="0" data-item="subcutaneous_tissue" data-label="皮下組織" data-type="SKIN STRUCTURE" data-color="#e9bd5d"><path d="M66 322h228v64H66z" fill="#e9bd5d"/><path d="M70 337q18-20 36 0t36 0 36 0 36 0 36 0 36 0" fill="none" stroke="#fff1b4" stroke-width="13"/><text class="part-label" x="78" y="372">皮下組織</text></g>
      <g class="hotspot" tabindex="0" data-item="hair_follicle" data-label="毛包" data-type="SKIN STRUCTURE" data-color="#704a3e"><path d="M151 139q9 76 23 180" fill="none" stroke="#704a3e" stroke-width="7"/><ellipse cx="176" cy="316" rx="13" ry="23" fill="#704a3e"/><circle class="hotspot-dot" cx="164" cy="246" r="5"/></g>
      <g class="hotspot" tabindex="0" data-item="sebaceous_gland" data-label="皮脂腺" data-type="SKIN STRUCTURE" data-color="#f0c86c"><path d="M177 244q27-24 38 1-10 25-37 13z" fill="#f0c86c"/><circle class="hotspot-dot" cx="207" cy="247" r="4"/></g>
      <g class="hotspot" tabindex="0" data-item="sweat_gland" data-label="汗腺" data-type="SKIN STRUCTURE" data-color="#79b7b2"><path d="M240 194v94q-25 0-25 27c0 29 48 28 48 0 0-24-37-25-37 2 0 20 26 14 21-2" fill="none" stroke="#79b7b2" stroke-width="7" stroke-linecap="round"/><circle class="hotspot-dot" cx="241" cy="290" r="5"/></g>
      <g class="hotspot" tabindex="0" data-item="sensory_nerve" data-label="知覚神経" data-type="SKIN STRUCTURE" data-color="#e8bd54"><path d="M116 365v-82m0 8-15-18m15 11 15-20" fill="none" stroke="#e8bd54" stroke-width="4" stroke-linecap="round"/><circle class="hotspot-dot" cx="116" cy="286" r="4"/></g>
      <g class="hotspot" tabindex="0" data-item="skin_blood_vessels" data-label="皮膚の血管" data-type="SKIN STRUCTURE" data-color="#d94e4f"><path d="M83 350q48-20 97 0t97 0M130 349v-34M216 350v-42" fill="none" stroke="#d94e4f" stroke-width="5"/><circle class="hotspot-dot" cx="215" cy="350" r="4"/></g>`,
    brain: `
      <g class="hotspot" tabindex="0" data-item="frontal_lobe" data-label="前頭葉" data-type="BRAIN STRUCTURE" data-color="#e47b7e"><path d="M86 270c-18-65 26-110 93-98v99z" fill="#e47b7e"/><text class="part-label" x="105" y="222">前頭葉</text></g>
      <g class="hotspot" tabindex="0" data-item="parietal_lobe" data-label="頭頂葉" data-type="BRAIN STRUCTURE" data-color="#eeb05d"><path d="M179 172c67-14 109 30 98 94l-98 5z" fill="#eeb05d"/><text class="part-label" x="211" y="216">頭頂葉</text></g>
      <g class="hotspot" tabindex="0" data-item="temporal_lobe" data-label="側頭葉" data-type="BRAIN STRUCTURE" data-color="#c76d9b"><path d="M87 270h113v81c-62 19-109-16-113-81z" fill="#c76d9b"/><text class="part-label" x="112" y="317">側頭葉</text></g>
      <g class="hotspot" tabindex="0" data-item="cerebellum" data-label="小脳" data-type="BRAIN STRUCTURE" data-color="#79b7b2"><path d="M200 278q82-16 78 48-7 45-78 25z" fill="#79b7b2"/><path d="M213 298q24-10 49 5M211 321q25-9 49 4" fill="none" stroke="#d8f0e8" stroke-width="5"/><text class="part-label" x="220" y="345">小脳</text></g>
      <g class="hotspot" tabindex="0" data-item="brainstem" data-label="脳幹" data-type="BRAIN STRUCTURE" data-color="#9b674f"><path d="M184 323q33-7 39 10l-6 76h-35z" fill="#9b674f"/><text class="part-label" x="224" y="390">脳幹</text></g>`,
    eye: `
      <path d="M70 270q105-97 215 0-110 97-215 0z" fill="#f8f5ea" stroke="#8d4d55" stroke-width="7"/>
      <g class="hotspot" tabindex="0" data-item="cornea" data-label="角膜" data-type="EYE STRUCTURE" data-color="#9bd3d4"><path d="M70 270q22-39 51-50-21 50 0 100-30-12-51-50z" fill="#9bd3d4" opacity=".9"/><text class="part-label" x="67" y="342">角膜</text></g>
      <g class="hotspot" tabindex="0" data-item="iris" data-label="虹彩" data-type="EYE STRUCTURE" data-color="#438d91"><circle cx="135" cy="270" r="38" fill="#438d91"/><circle cx="135" cy="270" r="15" fill="#173a3c"/><text class="part-label" x="117" y="327">虹彩</text></g>
      <g class="hotspot" tabindex="0" data-item="lens" data-label="水晶体" data-type="EYE STRUCTURE" data-color="#e8bd54"><ellipse cx="177" cy="270" rx="23" ry="48" fill="#f2d779"/><text class="part-label" x="155" y="338">水晶体</text></g>
      <g class="hotspot" tabindex="0" data-item="retina" data-label="網膜" data-type="EYE STRUCTURE" data-color="#ef705c"><path d="M205 211q73 26 80 59-9 40-80 62" fill="none" stroke="#ef705c" stroke-width="13"/><text class="part-label" x="230" y="350">網膜</text></g>
      <g class="hotspot" tabindex="0" data-item="optic_nerve" data-label="視神経" data-type="EYE STRUCTURE" data-color="#e8bd54"><path d="M280 270h58" fill="none" stroke="#e8bd54" stroke-width="17" stroke-linecap="round"/><text class="part-label" x="286" y="303">視神経</text></g>`,
    ear: `
      <g class="hotspot" tabindex="0" data-item="pinna" data-label="耳介" data-type="EAR STRUCTURE" data-color="#e9a386"><path d="M107 172c-58 27-50 144 9 154 45 8 67-57 32-81-23-16-43 20-19 33" fill="none" stroke="#e9a386" stroke-width="22" stroke-linecap="round"/><text class="part-label" x="73" y="350">耳介</text></g>
      <g class="hotspot" tabindex="0" data-item="ear_canal" data-label="外耳道" data-type="EAR STRUCTURE" data-color="#c4755d"><path d="M139 269h70" fill="none" stroke="#c4755d" stroke-width="17" stroke-linecap="round"/><text class="part-label" x="155" y="247">外耳道</text></g>
      <g class="hotspot" tabindex="0" data-item="eardrum" data-label="鼓膜" data-type="EAR STRUCTURE" data-color="#79b7b2"><ellipse cx="215" cy="269" rx="9" ry="31" fill="#79b7b2"/><text class="part-label" x="204" y="321">鼓膜</text></g>
      <g class="hotspot" tabindex="0" data-item="ossicles" data-label="耳小骨" data-type="EAR STRUCTURE" data-color="#e8bd54"><circle cx="239" cy="254" r="10" fill="#e8bd54"/><circle cx="256" cy="265" r="9" fill="#e8bd54"/><circle cx="270" cy="251" r="8" fill="#e8bd54"/><text class="part-label" x="236" y="226">耳小骨</text></g>
      <g class="hotspot" tabindex="0" data-item="cochlea" data-label="蝸牛" data-type="EAR STRUCTURE" data-color="#c76d9b"><path d="M302 270c35-35 57 30 17 39-35 8-45-39-9-49 26-8 35 25 12 31" fill="none" stroke="#c76d9b" stroke-width="12" stroke-linecap="round"/><text class="part-label" x="290" y="338">蝸牛</text></g>`,
    heart: `
      <path d="M180 382s-112-65-112-151c0-72 84-93 112-34 28-59 112-38 112 34 0 86-112 151-112 151z" fill="#d94e4f"/>
      <g class="hotspot" tabindex="0" data-item="right_atrium" data-label="右心房" data-type="HEART STRUCTURE" data-color="#6faab9"><path d="M92 219q40-52 84-9v61H91q-12-25 1-52z" fill="#6faab9"/><text class="part-label" x="111" y="242">右心房</text></g>
      <g class="hotspot" tabindex="0" data-item="left_atrium" data-label="左心房" data-type="HEART STRUCTURE" data-color="#e8897c"><path d="M184 210q45-43 84 9 13 27 0 52h-84z" fill="#e8897c"/><text class="part-label" x="217" y="242">左心房</text></g>
      <g class="hotspot" tabindex="0" data-item="right_ventricle" data-label="右心室" data-type="HEART STRUCTURE" data-color="#79b7b2"><path d="M91 278h85v83q-52-30-85-83z" fill="#79b7b2"/><text class="part-label" x="110" y="315">右心室</text></g>
      <g class="hotspot" tabindex="0" data-item="left_ventricle" data-label="左心室" data-type="HEART STRUCTURE" data-color="#ef705c"><path d="M184 278h85q-34 53-85 83z" fill="#ef705c"/><text class="part-label" x="210" y="315">左心室</text></g>
      <g class="hotspot" tabindex="0" data-item="aorta" data-label="大動脈" data-type="HEART STRUCTURE" data-color="#a24d58"><path d="M196 207q-11-85 24-93 42-10 48 31" fill="none" stroke="#a24d58" stroke-width="20" stroke-linecap="round"/><text class="part-label" x="235" y="109">大動脈</text></g>`,
    kidney: `
      <g class="hotspot" tabindex="0" data-item="renal_cortex" data-label="腎皮質" data-type="KIDNEY STRUCTURE" data-color="#9b453b"><path d="M104 160c-65 18-78 141-12 188 52 38 95-10 83-86-9-63-34-112-71-102zM256 160c65 18 78 141 12 188-52 38-95-10-83-86 9-63 34-112 71-102z" fill="#9b453b"/><text class="part-label" x="70" y="377">腎皮質</text></g>
      <g class="hotspot" tabindex="0" data-item="renal_medulla" data-label="腎髄質" data-type="KIDNEY STRUCTURE" data-color="#e99a78"><path d="M112 201l36 56-47 49zM248 201l-36 56 47 49z" fill="#e99a78"/><text class="part-label" x="142" y="210">腎髄質</text></g>
      <g class="hotspot" tabindex="0" data-item="renal_pelvis" data-label="腎盂" data-type="KIDNEY STRUCTURE" data-color="#f0c86c"><path d="M149 248q38 24 20 65M211 248q-38 24-20 65" fill="none" stroke="#f0c86c" stroke-width="15" stroke-linecap="round"/><text class="part-label" x="166" y="337">腎盂</text></g>
      <g class="hotspot" tabindex="0" data-item="ureter" data-label="尿管" data-type="KIDNEY STRUCTURE" data-color="#e8bd54"><path d="M169 305l8 100M191 305l-8 100" fill="none" stroke="#e8bd54" stroke-width="8" stroke-linecap="round"/><text class="part-label" x="196" y="400">尿管</text></g>`,
    lungs: `
      <g class="hotspot" tabindex="0" data-item="trachea" data-label="気管" data-type="LUNG STRUCTURE" data-color="#79b7b2"><path d="M180 118v91" fill="none" stroke="#79b7b2" stroke-width="24" stroke-linecap="round"/><path d="M168 142h24M168 164h24M168 186h24" stroke="#d8f0e8" stroke-width="4"/><text class="part-label" x="198" y="145">気管</text></g>
      <g class="hotspot" tabindex="0" data-item="right_lung" data-label="右肺" data-type="LUNG STRUCTURE" data-color="#df8f91"><path d="M170 208q-70-51-91 41-18 85 58 126 35 19 35-30z" fill="#df8f91"/><path d="M93 281h77M104 323h66" stroke="#f6c0c0" stroke-width="4"/><text class="part-label" x="107" y="357">右肺</text></g>
      <g class="hotspot" tabindex="0" data-item="left_lung" data-label="左肺" data-type="LUNG STRUCTURE" data-color="#e9a7a5"><path d="M190 208q70-51 91 41 18 85-58 126-35 19-35-30z" fill="#e9a7a5"/><path d="M190 295h76" stroke="#f8d1cb" stroke-width="4"/><text class="part-label" x="223" y="357">左肺</text></g>
      <g class="hotspot" tabindex="0" data-item="bronchus" data-label="気管支" data-type="LUNG STRUCTURE" data-color="#6b9da2"><path d="M180 197q-28 27-61 43M180 197q28 27 61 43M137 231l-25 34M223 231l25 34" fill="none" stroke="#6b9da2" stroke-width="11" stroke-linecap="round"/><circle class="hotspot-dot" cx="180" cy="207" r="5"/></g>
      <g class="hotspot" tabindex="0" data-item="alveoli" data-label="肺胞" data-type="LUNG STRUCTURE" data-color="#e8bd54"><circle cx="283" cy="323" r="13" fill="#f4cf7b"/><circle cx="305" cy="313" r="12" fill="#f4cf7b"/><circle cx="306" cy="337" r="13" fill="#f4cf7b"/><circle cx="329" cy="326" r="12" fill="#f4cf7b"/><text class="part-label" x="285" y="369">肺胞</text></g>`
  };
  return `<svg viewBox="0 0 360 720" role="img" aria-label="${item.title}の内部構造">
    <circle cx="180" cy="272" r="150" fill="#f8f5ea" opacity=".76"/>
    <g stroke="#713e42" stroke-width="3" stroke-linejoin="round">${shapes[key]}</g>
    <text x="180" y="465" text-anchor="middle" fill="#173a3c" font-size="18" font-weight="700">${item.title}の内部構造</text>
    <text x="180" y="495" text-anchor="middle" fill="#6b8080" font-size="10" letter-spacing="2">TAP A PART TO LEARN</text>
  </svg>`;
}

function renderBody() {
  selectedPartKey = null;
  const layer = internalItem ? { id:"internal", en:"INTERNAL", title:`${items[internalItem].title}の内部構造`, description:"断面や各部位を詳しく見る専用ビューです。左のボタンで元の層に戻れます。" } : layers[currentLayer];
  bodyVisual.classList.add("is-changing");
  clearTimeout(renderTimer);
  renderTimer = setTimeout(() => {
    if (layer.id === "internal") bodyVisual.innerHTML = realisticDetailSVG(internalItem);
    else if (layer.id === "clothed") {
      const imagePath = `assets/clothed-jp-${bodySex}-${viewSide}.png`;
      bodyVisual.innerHTML = `<img class="clothed-person" src="${imagePath}" alt="${bodySex === "female" ? "女性" : "男性"}モデルの${viewSide === "front" ? "正面" : "背面"}・服を着た全身像">`;
    } else bodyVisual.innerHTML = atlasSVG(layer.id, viewSide, bodySex, layer.id === "organ" ? atlasFocus : "all");
    bodyVisual.classList.remove("is-changing");
    bindHotspots();
    applyNetworkFilter();
    updatePartIndex();
  }, 160);

  document.querySelector("#layerNumber").textContent = internalItem ? String(layers.length + 1).padStart(2, "0") : String(currentLayer + 1).padStart(2, "0");
  document.querySelector("#layerTitle").textContent = layer.title;
  document.querySelector("#layerDescription").textContent = layer.description;
  document.querySelector("#stageLabel").textContent = `${layer.en}${internalItem ? "" : ` · ${bodySex.toUpperCase()} · ${viewSide.toUpperCase()}`}`;
  document.querySelector("#atlasNote").textContent = internalItem ? `${bodySex === "female" ? "女性" : "男性"}モデルから表示中` : `${bodySex === "female" ? "女性" : "男性"}モデル · ${viewSide === "front" ? "正面" : "背面"}${layer.id === "organ" ? (atlasFocus === "pelvis" ? " · 骨盤内の正面模式図を拡大中" : " · 骨盤部の虫眼鏡で生殖器を拡大できます") : ""}`;
  const isPelvicZoom = layer.id === "organ" && atlasFocus === "pelvis";
  const isDetail = Boolean(internalItem) || isPelvicZoom;
  document.querySelector("#outsideButton").setAttribute("aria-label", isDetail ? "全身に戻る" : "外側の層へ");
  document.querySelector("#outsideButton small").textContent = isDetail ? "全身に戻る" : "OUTSIDE";
  document.querySelectorAll("[data-body-sex]").forEach(button => {
    const active = button.dataset.bodySex === bodySex;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelector("#progressBar").style.width = `${internalItem ? 100 : currentLayer / (layers.length - 1) * 100}%`;
  document.querySelector("#outsideButton").disabled = !internalItem && currentLayer === 0;
  document.querySelector("#insideButton").disabled = Boolean(internalItem) || currentLayer === layers.length - 1;
  document.querySelector("#tapHint").classList.toggle("is-hidden", currentLayer === 0 || Boolean(internalItem));
  document.querySelector("#markerLegend").classList.toggle("is-hidden", currentLayer === 0 || Boolean(internalItem));
  document.querySelector(".view-toggle").classList.toggle("is-hidden", isDetail);
  document.querySelector("#networkFilters").classList.toggle("is-hidden", layer.id !== "network");
  document.querySelectorAll("[data-view-side]").forEach(button => { button.classList.toggle("is-active", button.dataset.viewSide === viewSide); button.setAttribute("aria-pressed", String(button.dataset.viewSide === viewSide)); });
  document.querySelectorAll("[data-network-filter]").forEach(button => button.classList.toggle("is-active", button.dataset.networkFilter === networkFilter));
  document.querySelectorAll(".layer-dot").forEach((dot, index) => {
    dot.classList.toggle("is-active", index === currentLayer);
    dot.setAttribute("aria-selected", String(index === currentLayer));
  });
}

function appendExpandedParts(layerId) {
  if (!expandedParts[layerId]) return;
  const svg = bodyVisual.querySelector("svg");
  // Replace combined bones/organs with individually addressable card targets.
  const replaced = ["radius_ulna", "tibia_fibula", "tibia_fibula_back", "uterus_ovaries", "prostate_testes"];
  svg.querySelectorAll(".hotspot").forEach(node => {
    if (replaced.includes(node.dataset.item)) node.remove();
  });
  // Same anatomical structure, same card ID in both directions.
  const aliases = {pelvis_back:"pelvis", femur_back:"femur"};
  svg.querySelectorAll(".hotspot").forEach(node => {
    if (aliases[node.dataset.item]) {
      node.dataset.item = aliases[node.dataset.item];
      node.dataset.label = node.dataset.label.replace("（背面）", "");
    }
  });
  // Sacrum must sit above the larger pelvis hit area.
  if (layerId === "bone" && viewSide === "back") {
    const sacrum = svg.querySelector('[data-item="sacrum"]');
    if (sacrum) sacrum.parentElement.append(sacrum);
  }
  if (layerId === "organ" && viewSide === "front") svg.insertAdjacentHTML("beforeend", reproductiveInsets());
  svg.insertAdjacentHTML("beforeend", expandedPartMarkup(layerId, viewSide));
  if (layerId === "bone" && viewSide === "back") {
    const legParts = expandedParts.bone.filter(part => ["tibia", "fibula"].includes(part[0]));
    legParts.forEach(([key, label, , x, y]) => svg.insertAdjacentHTML("beforeend", `<g class="hotspot" tabindex="0" data-item="${key}" data-label="${label}" data-type="BONE"><circle cx="${x}" cy="${y}" r="8" fill="transparent"/><circle class="hotspot-dot" cx="${x}" cy="${y}" r="4"/></g>`));
  }
}

function updatePartIndex() {
  const index = document.querySelector("#partIndex");
  index.hidden = !internalItem && layers[currentLayer].id === "clothed";
  if (index.hidden) return;
  document.querySelector("#partIndexTitle").textContent = internalItem ? `${items[internalItem].title}の内部構造` : "部位を探す";
  const query = document.querySelector("#partSearch").value.trim().toLocaleLowerCase();
  const unique = new Map();
  bodyVisual.querySelectorAll(".hotspot").forEach(node => {
    if (node.dataset.system && networkFilter !== "all" && node.dataset.system !== networkFilter) return;
    if (!unique.has(node.dataset.item)) unique.set(node.dataset.item, node);
  });
  const list = document.querySelector("#partList");
  list.replaceChildren();
  let shown = 0;
  unique.forEach(node => {
    const label = node.dataset.label || items[node.dataset.item]?.title;
    if (!label || !label.toLocaleLowerCase().includes(query)) return;
    shown++;
    const button = document.createElement("button");
    button.className = "part-button";
    button.dataset.item = node.dataset.item;
    button.title = label;
    button.textContent = label;
    if (items[node.dataset.item]?.internal || node.dataset.zoom || node.dataset.deep === "true") {
      const hint = document.createElement("small");
      hint.textContent = items[node.dataset.item]?.internal ? "内部構造へ" : node.dataset.zoom ? "拡大図へ" : "深部の筋";
      button.append(hint);
    }
    const entry = document.createElement("div");
    entry.className = "part-entry";
    button.setAttribute("aria-pressed", String(selectedPartKey === node.dataset.item));
    button.addEventListener("click", () => {
      selectedPartKey = node.dataset.item;
      bodyVisual.querySelectorAll(".is-index-selected").forEach(target => target.classList.remove("is-index-selected"));
      bodyVisual.querySelectorAll(".hotspot, [data-highlight-group]").forEach(target => {
        if ((target.dataset.highlightGroup || target.dataset.item) === selectedPartKey) target.classList.add("is-index-selected");
      });
      list.querySelectorAll(".part-entry").forEach(row => row.classList.toggle("is-selected", row.dataset.item === selectedPartKey));
      list.querySelectorAll(".part-button").forEach(item => item.setAttribute("aria-pressed", String(item === button)));
      entry.scrollIntoView({block:"nearest", inline:"nearest"});
      clickSound();
    });
    entry.dataset.item = node.dataset.item;
    entry.append(button);
    const open = document.createElement("button");
    open.className = "part-open";
    const canZoom = !internalItem && (items[node.dataset.item]?.internal || node.dataset.zoom);
    open.textContent = canZoom ? "拡大する" : "カードを開く";
    open.setAttribute("aria-label", `${label}を${canZoom ? "拡大する" : "カードで開く"}`);
    open.addEventListener("click", () => {
      if (node.dataset.zoom === "pelvis") {
        atlasFocus = "pelvis";
        document.querySelector("#partSearch").value = "";
        clickSound();
        renderBody();
      } else if (!internalItem && items[node.dataset.item]?.internal) {
        document.querySelector("#partSearch").value = "";
        openInternal(node.dataset.item);
      } else openCard(node);
    });
    entry.append(open);
    list.append(entry);
  });
  document.querySelector("#partCount").textContent = `${internalItem ? items[internalItem].title : `${bodySex === "female" ? "女性" : "男性"}・${viewSide === "front" ? "正面" : "背面"}`} ${shown} / ${unique.size}部位`;
  if (!shown) {
    const empty = document.createElement("p");
    empty.className = "part-empty";
    empty.textContent = "該当する部位がありません。検索語や正面・背面を切り替えてください。";
    list.append(empty);
  }
}

function applyNetworkFilter() {
  if (layers[currentLayer]?.id !== "network" || internalItem) return;
  bodyVisual.querySelectorAll("[data-system]").forEach(group => {
    group.style.display = networkFilter === "all" || group.dataset.system === networkFilter ? "" : "none";
  });
}

function updateOrganChips() {
  // The unified part index contains every available organ and structure.
}

function moveLayer(delta) {
  if (internalItem && delta < 0) {
    internalItem = null;
    document.querySelector("#partSearch").value = "";
    clickSound();
    renderBody();
    return;
  }
  if (delta < 0 && layers[currentLayer].id === "organ" && atlasFocus === "pelvis") {
    atlasFocus = "all";
    document.querySelector("#partSearch").value = "";
    clickSound();
    renderBody();
    return;
  }
  const next = Math.max(0, Math.min(layers.length - 1, currentLayer + delta));
  if (next === currentLayer) return;
  currentLayer = next;
  document.querySelector("#partSearch").value = "";
  clickSound();
  renderBody();
}

function bindHotspots() {
  bodyVisual.querySelectorAll(".hotspot").forEach(node => {
    if (internalItem && !node.querySelector(".hotspot-dot")) {
      const shape = node.querySelector("path, rect, ellipse, circle");
      if (shape) {
        const box = shape.getBBox();
        const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("class", "hotspot-dot");
        dot.setAttribute("cx", String(box.x + box.width / 2));
        dot.setAttribute("cy", String(box.y + box.height / 2));
        dot.setAttribute("r", "5");
        node.append(dot);
      }
    }
    const dot = node.querySelector(".hotspot-dot");
    if (dot && !node.querySelector(".locate-halo")) {
      const halo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      halo.setAttribute("class", "locate-halo");
      halo.setAttribute("cx", dot.getAttribute("cx"));
      halo.setAttribute("cy", dot.getAttribute("cy"));
      halo.setAttribute("r", String(Math.max(18, Number(dot.getAttribute("r")) * 3.6)));
      dot.before(halo);
    }
    const outerItem = items[node.dataset.item];
    const label = node.dataset.label || outerItem?.title || "部位";
    if (!node.querySelector("title")) {
      const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
      title.textContent = label;
      node.prepend(title);
    }
    node.setAttribute("role", "button");
    node.setAttribute("aria-label", node.dataset.zoom === "pelvis" ? `${label}を拡大する` : outerItem?.internal && !internalItem ? `${label}の内部構造を見る` : `${label}のカードを見る`);
    node.addEventListener("click", () => activateHotspot(node));
    node.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activateHotspot(node);
      }
    });
  });
}

function activateHotspot(node) {
  const key = node.dataset.item;
  if (node.dataset.zoom === "pelvis") {
    atlasFocus = "pelvis";
    clickSound();
    renderBody();
    return;
  }
  if (!internalItem && items[key]?.internal) {
    openInternal(key);
    return;
  }
  openCard(node);
}

function miniIllustration(item) {
  return `<svg viewBox="0 0 180 180" aria-hidden="true"><circle cx="90" cy="90" r="76" fill="#f8f5ea"/><path d="M90 40c-24 0-40 18-38 41 1 15 10 24 19 34 7 8 10 16 12 26h14c2-10 5-18 12-26 9-10 18-19 19-34 2-23-14-41-38-41z" fill="${item.color}" stroke="#173a3c" stroke-opacity=".3" stroke-width="3"/><circle cx="77" cy="78" r="4" fill="#173a3c"/><circle cx="103" cy="78" r="4" fill="#173a3c"/><path d="M77 98q13 12 26 0" fill="none" stroke="#173a3c" stroke-width="3" stroke-linecap="round"/></svg>`;
}

function openCard(source) {
  const key = source.dataset.item;
  const registered = items[key];
  const item = registered || {
    title: source.dataset.label || "名称未登録の部位",
    type: source.dataset.type || (internalItem ? "INTERNAL STRUCTURE" : "ANATOMICAL PART"),
    color: source.dataset.color || "#ef705c",
    text: `${source.dataset.label || "この部位"}の画像と説明を追加するためのカード枠です。`
  };
  clickSound();
  showStudyCard(key, source.dataset.label || item.title);
}

function openInternal(key) {
  internalItem = key;
  if (infoCard.open) infoCard.close();
  clickSound();
  renderBody();
}

function clickSound() {
  if (!soundOn) return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  const ctx = new AudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine"; osc.frequency.setValueAtTime(430, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(620, ctx.currentTime + .07);
  gain.gain.setValueAtTime(.045, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .1);
  osc.connect(gain).connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + .1);
}

layers.forEach((layer, index) => {
  const meta = layerNavMeta[layer.id];
  const dot = document.createElement("button");
  dot.className = "layer-dot";
  dot.setAttribute("role", "tab");
  dot.setAttribute("aria-label", layer.title);
  dot.title = layer.title;
  dot.innerHTML = `<span aria-hidden="true">${meta.icon}</span><small>${meta.label}</small>`;
  dot.addEventListener("click", () => { internalItem = null; currentLayer = index; document.querySelector("#partSearch").value = ""; clickSound(); renderBody(); });
  document.querySelector("#layerDots").append(dot);
});

document.querySelector("#outsideButton").addEventListener("click", () => moveLayer(-1));
document.querySelector("#insideButton").addEventListener("click", () => moveLayer(1));
document.querySelector("#cardClose").addEventListener("click", () => infoCard.close());
document.querySelectorAll("[data-view-side]").forEach(button => button.addEventListener("click", () => {
  if (viewSide === button.dataset.viewSide) return;
  viewSide = button.dataset.viewSide;
  clickSound();
  renderBody();
}));
document.querySelectorAll("[data-body-sex]").forEach(button => button.addEventListener("click", () => {
  if (bodySex === button.dataset.bodySex) return;
  bodySex = button.dataset.bodySex;
  if (infoCard.open) infoCard.close();
  document.querySelector("#partSearch").value = "";
  clickSound();
  renderBody();
}));
document.querySelectorAll("[data-network-filter]").forEach(button => button.addEventListener("click", () => {
  networkFilter = button.dataset.networkFilter;
  clickSound();
  document.querySelectorAll("[data-network-filter]").forEach(item => item.classList.toggle("is-active", item === button));
  applyNetworkFilter();
  updatePartIndex();
}));
document.querySelector("#aboutButton").addEventListener("click", () => document.querySelector("#aboutDialog").showModal());
document.querySelector("#aboutClose").addEventListener("click", () => document.querySelector("#aboutDialog").close());
document.querySelector("#soundButton").addEventListener("click", e => { soundOn = !soundOn; e.currentTarget.setAttribute("aria-pressed", String(soundOn)); });
document.querySelector("#partSearch").addEventListener("input", updatePartIndex);
document.querySelector("#openViewerButton").addEventListener("click", () => { clickSound(); showScreen("model"); });
document.querySelector("#backToMenuButton").addEventListener("click", () => showScreen("home"));
document.querySelector("#changeModelButton").addEventListener("click", () => showScreen("model"));
document.querySelector("#menuButton").addEventListener("click", () => showScreen("home"));
document.querySelector(".brand").addEventListener("click", e => { e.preventDefault(); showScreen("home"); });
document.querySelectorAll("[data-start-sex]").forEach(button => button.addEventListener("click", () => startExplorer(button.dataset.startSex)));
document.addEventListener("keydown", e => { if (screens.explorer.hidden || e.target.matches("input, textarea, select") || e.target.isContentEditable) return; if (!infoCard.open && !document.querySelector("#aboutDialog").open) { if (e.key === "ArrowLeft") moveLayer(-1); if (e.key === "ArrowRight") moveLayer(1); } });
[infoCard, document.querySelector("#aboutDialog")].forEach(dialog => dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); }));

renderBody();
