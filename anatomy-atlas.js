// Original interactive vector drawings. Shared 500 × 960 anatomical coordinates.
// Reference images inform proportions/color grouping, not copied image pixels.
const atlasNames = {
  facial_muscles:"表情筋", deltoid:"三角筋", pectoralis_major:"大胸筋", biceps_brachii:"上腕二頭筋",
  rectus_abdominis:"腹直筋", quadriceps:"大腿四頭筋", tibialis_anterior:"前脛骨筋",
  trapezius:"僧帽筋", latissimus_dorsi:"広背筋", triceps_brachii:"上腕三頭筋",
  gluteus_maximus:"大臀筋", hamstrings:"ハムストリングス", gastrocnemius:"腓腹筋", achilles_tendon:"アキレス腱",
  skull:"頭蓋骨", clavicle:"鎖骨", ribs:"肋骨", sternum:"胸骨", humerus:"上腕骨", pelvis:"骨盤",
  femur:"大腿骨", patella:"膝蓋骨", scapula:"肩甲骨", vertebral_column:"脊柱", sacrum:"仙骨",
  hair:"毛髪", scalp_hair:"頭皮・毛髪", lips:"口唇", palm:"手掌", fingernails:"手の爪", sole:"足底",
  toenails:"足の爪", back_skin:"背部の皮膚", elbow_skin:"肘の皮膚", heel:"かかと",
  mammary_gland:"乳腺", breast:"乳房", penis:"陰茎", scrotum:"陰嚢", vulva:"外陰部", cervix:"子宮頸部",
  pituitary:"下垂体", pineal_gland:"松果体", salivary_glands:"唾液腺", tongue:"舌", pharynx:"咽頭",
  thyroid:"甲状腺", parathyroid:"副甲状腺", thymus:"胸腺", gallbladder:"胆のう", pancreas:"膵臓",
  adrenal_glands:"副腎", large_intestine:"大腸", small_intestine:"小腸", appendix:"虫垂", urinary_bladder:"膀胱",
  trachea_outer:"気管", esophagus:"食道", diaphragm:"横隔膜", spleen:"脾臓", ureters_outer:"尿管", rectum:"直腸",
  spinal_cord:"脊髄", brachial_plexus:"腕神経叢", femoral_nerve:"大腿神経", sciatic_nerve:"坐骨神経",
  tibial_nerve:"脛骨神経", aorta_main:"大動脈", carotid_artery:"頸動脈", femoral_artery:"大腿動脈",
  jugular_vein:"頸静脈", vena_cava:"大静脈", great_saphenous_vein:"大伏在静脈",
  cervical_lymph_nodes:"頸部リンパ節", axillary_lymph_nodes:"腋窩リンパ節", inguinal_lymph_nodes:"鼠径リンパ節",
  popliteal_lymph_nodes:"膝窩リンパ節", thoracic_duct:"胸管", median_nerve:"正中神経", radial_nerve:"橈骨神経",
  dorsal_ramus:"脊髄神経後枝", occipital_artery:"後頭動脈", scapular_artery:"肩甲部の動脈", popliteal_artery:"膝窩動脈",
  posterior_tibial_artery:"後脛骨動脈", vertebral_vein:"椎骨静脈", popliteal_vein:"膝窩静脈", small_saphenous_vein:"小伏在静脈", posterior_cervical_nodes:"後頸部リンパ節"
};
Object.values(expandedParts).flat().forEach(([id, name]) => { atlasNames[id] = name; });

const atlasMusclePoints = {
  front: [
    ["facial_muscles",250,65], ["temporalis",282,89], ["masseter",276,121], ["orbicularis_oculi",232,99], ["orbicularis_oris",250,132],
    ["sternocleidomastoid",232,169], ["deltoid",164,231], ["pectoralis_major",217,254], ["biceps_brachii",153,299],
    ["brachialis",159,334], ["brachioradialis",129,373], ["flexor_carpi_radialis",366,402], ["flexor_carpi_ulnaris",389,426],
    ["serratus_anterior",303,297], ["rectus_abdominis",267,338], ["external_oblique",299,374], ["iliopsoas",244,419],
    ["quadriceps",210,505], ["rectus_femoris",283,538], ["vastus_lateralis",307,564], ["vastus_medialis",267,620],
    ["adductor_longus",237,503], ["gracilis",235,554], ["sartorius",218,589],
    ["tibialis_anterior",215,727], ["fibularis_longus",307,725], ["extensor_digitorum_longus",298,795]
  ],
  back: [
    ["trapezius",266,221], ["infraspinatus",206,264], ["teres_major",188,293], ["rhomboid_major",232,277],
    ["latissimus_dorsi",298,336], ["erector_spinae",240,366], ["triceps_brachii",151,295], ["extensor_digitorum",373,396],
    ["gluteus_medius",306,427], ["gluteus_maximus",279,470], ["hamstrings",211,550], ["biceps_femoris",307,554],
    ["semitendinosus",271,575], ["semimembranosus",236,608], ["gastrocnemius",207,717], ["soleus",299,775], ["achilles_tendon",211,836]
  ]
};
const atlasBonePoints = {
  front: [
    ["skull",270,55], ["frontal_bone",239,71], ["temporal_bone",284,108], ["zygomatic_bone",273,121],
    ["nasal_bone",250,113], ["maxilla",242,134], ["mandible",254,150], ["clavicle",216,212], ["ribs",299,279],
    ["sternum",250,261], ["humerus",153,295], ["radius",126,389], ["ulna",151,372],
    ["carpals",109,446], ["metacarpals",390,467], ["hand_phalanges",406,496],
    ["pelvis",312,448], ["ilium",202,427], ["ischium",290,484], ["pubis",250,485], ["femur",219,566],
    ["patella",217,663], ["tibia",281,754], ["fibula",199,774], ["talus",211,851], ["metatarsals",294,878], ["foot_phalanges",188,892]
  ],
  back: [
    ["parietal_bone",275,67], ["occipital_bone",246,122], ["scapula",202,265], ["vertebral_column",250,304],
    ["cervical_vertebrae",250,171], ["thoracic_vertebrae",250,247], ["lumbar_vertebrae",250,390],
    ["pelvis",302,438], ["sacrum",250,451], ["coccyx",250,482], ["femur",218,566], ["tibia",282,751], ["fibula",199,774], ["calcaneus",211,868]
  ]
};
const atlasOrganPoints = [
  ["brain",258,75], ["eye",229,110], ["ear",293,115], ["pituitary",246,96], ["pineal_gland",268,96],
  ["salivary_glands",215,143], ["tongue",250,142], ["parotid_gland",284,141], ["submandibular_gland",232,153],
  ["pharynx",246,166], ["larynx",251,190], ["thyroid",235,206], ["parathyroid",267,209],
  ["trachea_outer",245,237], ["esophagus",261,253], ["lungs",194,272], ["thymus",251,267], ["heart",270,312],
  ["mammary_gland",326,279], ["diaphragm",286,344], ["liver",212,361], ["gallbladder",213,382],
  ["stomach",280,375], ["spleen",318,370], ["pancreas",263,400], ["adrenal_glands",204,393], ["kidney",304,423],
  ["duodenum",228,410], ["ureters_outer",271,465], ["large_intestine",192,473], ["small_intestine",259,453],
  ["jejunum",274,436], ["ileum",239,476], ["cecum",193,504], ["ascending_colon",190,446],
  ["transverse_colon",250,427], ["descending_colon",309,466], ["sigmoid_colon",283,498], ["appendix",202,526],
  ["rectum",252,502], ["urinary_bladder",244,521]
];

function atlasBodyOutline(sex) {
  const female = sex === "female";
  // The torso and pelvis vary independently; this is not a stretched copy.
  const s = female ? 177 : 158, waist = female ? 205 : 190, hip = female ? 174 : 184;
  return `M231 149L230 177Q212 188 ${s} 201Q${s-15} 204 ${s-24} 235L127 335 103 438
    Q94 449 90 460L77 478Q75 486 81 484L96 471 86 493Q84 501 91 498L104 480 96 503Q95 511 102 506L113 485 108 506Q109 513 115 507L127 479Q131 468 119 454
    L149 353 ${s+21} 253Q${waist-3} 285 ${waist} 329Q${waist+6} 368 ${hip} 415Q${hip-9} 452 ${hip+6} 491
    L201 650Q190 696 199 754L202 843Q201 862 181 875Q169 890 184 894L222 891Q234 887 229 868L227 843 235 740Q243 696 233 651L245 514Q250 503 255 514
    L267 651Q257 696 265 740L273 843 271 868Q266 887 278 891L316 894Q331 890 319 875Q299 862 298 843L301 754Q310 696 299 650L${500-hip-6} 491Q${500-hip+9} 452 ${500-hip} 415Q${500-waist-6} 368 ${500-waist} 329Q${500-waist+3} 285 ${500-s-21} 253
    L351 353 381 454Q369 468 373 479L385 507Q391 513 392 506L387 485 398 506Q405 511 404 503L396 480 409 498Q416 501 414 493L404 471 419 484Q425 486 423 478L410 460Q406 449 397 438L373 335 ${500-s+24} 235Q${500-s+15} 204 ${500-s} 201Q288 188 270 177L269 149Z`;
}

function atlasSVG(layerId, side, sex, focus="all") {
  if (layerId === "bone") return realisticBoneSVG(side, sex);
  const female = sex === "female", back = side === "back";
  const parts = [];
  const name = key => atlasNames[key] || items[key]?.title || key;
  const attr = (key, opt={}) => `class="hotspot atlas-hotspot" tabindex="0" data-item="${key}" data-label="${name(key)}" data-type="${layerId.toUpperCase()}" data-color="${opt.color || '#c87970'}"${opt.system ? ` data-system="${opt.system}"` : ''}${opt.zoom ? ` data-zoom="${opt.zoom}"` : ''}${opt.deep || expandedParts.muscle.some(p => p[0] === key && p[7]) ? ' data-deep="true"' : ''}`;
  const add = (key, x, y, shape="", opt={}) => { parts.push({key,x,y,opt}); return shape ? `<g ${attr(key,opt)}>${shape}</g>` : ""; };
  const path = (d, fill, stroke="#75675e", width=1.5, extra="") => `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
  const ellipse = (x,y,rx,ry,fill,stroke="#75675e") => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
  const mirror = shape => `${shape}<g transform="translate(500 0) scale(-1 1)">${shape}</g>`;
  const limb = (d, color, width=9) => path(d,"none",color,width);
  const body = atlasBodyOutline(sex);
  const outerLayer = layerId === "skin" || layerId === "clothed";
  const skin = outerLayer ? "#f3c9ae" : "none";
  const guide = outerLayer ? "#b29786" : "#799d94";
  let drawing = `<g class="atlas-body${outerLayer ? "" : " atlas-body--guide"}">${path(body,skin,guide,outerLayer?1.7:2.2,outerLayer?"":'stroke-dasharray="5 6"')}
    ${ellipse(250,96,40,57,skin,guide)}${outerLayer ? ellipse(208,109,5,12,skin,guide)+ellipse(292,109,5,12,skin,guide) : ""}</g>`;
  const face = back ? "" : `<g fill="#806b61">${ellipse(235,105,2,2,"#806b61")}${ellipse(265,105,2,2,"#806b61")}${path("M250 108l-3 14h6M240 134q10 5 20 0","none","#a47c6b",1.5)}</g>`;

  if (layerId === "clothed" || layerId === "skin") {
    const hair = female ? (back ? "M209 99Q198 35 250 35Q302 36 291 101L302 180Q285 194 277 171Q248 181 222 168Q207 192 196 179Z" : "M208 104Q197 35 250 35Q304 37 292 105L301 178Q284 188 279 169L278 75Q243 90 218 74L219 166Q207 184 197 175Z") : (back ? "M210 99Q201 40 250 36Q299 42 290 101L279 125Q249 140 221 125Z" : "M210 99Q202 39 250 36Q299 41 290 98L277 71Q246 84 220 70Z");
    drawing += (layerId === "clothed" ? path(hair,female?"#57473e":"#51473d", "#443a34") : add(back ? "scalp_hair":"hair",278,64,path(hair,female?"#57473e":"#51473d", "#443a34"))) + face;
    if (!back) drawing += female ? path("M230 103q5-4 11 0m18 0q5-4 11 0M238 132q12 7 24 0","none","#a77a74",1.3) : path("M228 94q7-4 15-1m14 0q8-3 15 1M238 134q12 5 24 0","none","#806b61",1.3);
    drawing += path(back ? "M250 181v192M205 277q18 20 34 0M261 277q18 20 34 0M205 477q20 14 45-5 25 19 45 5" : "M232 178l18 17 18-17M250 375v3M210 454q40 24 80 0", "none", "#c79881",1.4);
    if (layerId === "clothed") {
      const shirt = female ? "#8baab4" : "#6f94a0", seam = female ? "#557b85" : "#486977";
      drawing += path(`M230 180q20 18 40 0l${female?52:69} 22 17 73-29 9-18-36 4 155H185l4-155-18 36-29-9 17-73z`,shirt,seam,2);
      drawing += path("M185 402h130l-9 93-24 343h-27l-5-305-5 305h-27l-24-343z",female?"#354e68":"#364f63","#293b4b",2);
      drawing += mirror(path("M202 845h28l2 37q-20 12-51 9-12-3 1-15z",female?"#e9dac7":"#f0e8de","#8a9792",2));
      drawing += path("M220 180l30 32 30-32-13 43-17 10-17-10z",female?"#e9e4db":"#dae9e4",seam,1.3);
      drawing += path("M250 226v166M193 404h114M214 404l-7 24m79-24 7 24M192 493l-3 72m119-72 3 72M220 595l-5 170m65-170 5 170","none",seam,1.5);
      drawing += mirror(path("M211 307q12 11 22 0M193 258l8 24M207 460l22 6M201 511q14 7 24 1","none","#d5e0df",1.2));
      if (female) drawing += path("M199 240q12 35 31 18M301 240q-12 35-31 18M190 353q26 17 60 15 34 2 60-15M186 386q64 12 128 0","none","#c8d7d5",1.4);
      else drawing += path("M203 249h31v43h-31zM266 249h31v43h-31zM226 320l24 8 24-8M185 392q65 11 130 0","none","#b6cbd0",1.3);
      parts.length = 0;
    } else {
      if (female && !back) drawing += add("breast",292,273,mirror(path("M194 260q23-34 43 1 6 34-18 35-26-1-25-36z","#efbda3","#ba8e7c")));
      if (!back && !female) drawing += mirror(path("M199 260q18 10 33 0","none","#c79881",1.5));
      drawing += add(back?"back_skin":"skin",back?270:285,355);
      if (!back) drawing += add("lips",252,136)+add("palm",104,466)+add("fingernails",404,494)+add("toenails",194,884)+add("sole",296,875);
      else drawing += add("elbow_skin",132,339)+add("heel",211,863)+add("fingernails",98,494);
      if (!back) drawing += female ? add("vulva",250,495,path("M246 480q-6 13 4 25 10-12 4-25M250 486v13","none","#bd8e7c",1.5)) : add("penis",250,492,path("M245 478v23q5 5 10 0v-23z","#ecc0a8","#ba8e7c"))+add("scrotum",259,517,ellipse(250,515,12,9,"#ecc0a8","#ba8e7c"));
    }
  }

  if (layerId === "muscle") {
    const colors = {chest:"#d97c78", shoulder:"#d9b958", arm:"#a6bb82", abdomen:"#ba9bc3", side:"#84b8b9", thigh:"#a5aad1", calf:"#be6f91", back:"#78a7c0", glute:"#dfa568"};
    const s = female ? 177 : 158;
    const shapes = {};
    shapes.deltoid = mirror(path(`M${s} 207q20-14 30 9l-10 47q-31 8-36-13z`,colors.shoulder));
    shapes.biceps_brachii = mirror(path(`M${s+7} 263q-5 43-29 69-8-31 10-65z`,colors.arm));
    shapes.brachialis = mirror(path("M151 315q13-14 14 0l-15 31-9-6z","#8eac6c"));
    shapes.brachioradialis = mirror(path("M135 346q15 0 10 19l-30 76-12-1z",colors.side));
    shapes.flexor_carpi_radialis = mirror(path("M147 352l4 17-31 78-7 0z","#db98ac"));
    shapes.flexor_carpi_ulnaris = mirror(path("M153 354l5 4-30 85-7 3z","#c781aa"));
    shapes.pectoralis_major = mirror(path(`M193 213q26-15 52 8v51q-40 20-63-11z`,colors.chest));
    shapes.rectus_abdominis = Array.from({length:5},(_,i)=>mirror(path(`M230 ${286+i*21}h16v17h-19z`,colors.abdomen))).join("");
    shapes.external_oblique = mirror(path(`M190 307l28 18-2 66 25 20-31-9q-21-45-20-95z`,colors.side));
    shapes.serratus_anterior = mirror(Array.from({length:4},(_,i)=>path(`M190 ${274+i*10}l29 8-12 10-21-10z`,"#aac499")).join(""));
    shapes.sternocleidomastoid = mirror(path("M220 144l17 53 12 13-11-42z","#8ac2ba"));
    shapes.iliopsoas = mirror(path("M240 381q-30 14-28 71l16 20 12-35z","#dca9bb","#8e7889",1.5,'stroke-dasharray="4 3" opacity=".7"'));
    shapes.rectus_femoris = mirror(path("M204 468q18-10 27 8l-8 156q-28-3-21-57z",colors.thigh));
    shapes.vastus_lateralis = mirror(path("M196 475q-21 83 0 152l13 15-8-109 1-54z","#c1b1d9"));
    shapes.vastus_medialis = mirror(path("M226 547q-7 30-5 89 21 6 18-19z","#8c9eca"));
    shapes.adductor_longus = mirror(path("M230 458l14 34-14 63-9-60z","#b9cb92"));
    shapes.gracilis = mirror(path("M242 499l-7 119-6 14 4-127z","#8cad77"));
    shapes.sartorius = mirror(path("M190 452q32 44 49 185l-7 1q-12-111-46-179z","#e2c49e"));
    shapes.tibialis_anterior = mirror(path("M218 683q22 32 3 146l-10 10 1-112z","#94b28e"));
    shapes.fibularis_longus = mirror(path("M201 684q-15 59 4 107l2-54z",colors.calf));
    shapes.extensor_digitorum_longus = mirror(path("M208 724l5 105-10 33-3-8z","#dfa0b9"));
    shapes.trapezius = mirror(path("M235 152l12 3v130l-55-50-18-20 40-25z","#b99bc4"));
    shapes.infraspinatus = mirror(path("M186 235l46 43-29 28-29-45z","#e3bf65"));
    shapes.teres_major = mirror(path("M180 284l39 24-10 16-39-22z","#d39078"));
    shapes.rhomboid_major = mirror(path("M238 245l8 6v53l-23-21z","#ab80b0","#847187",1.5,'stroke-dasharray="4 3"'));
    shapes.latissimus_dorsi = mirror(path("M178 306l45 9 16 82-28 22q-27-66-33-113z",colors.back));
    shapes.erector_spinae = mirror(path("M243 301v110l-15 16 5-107z","#aec1a7"));
    shapes.triceps_brachii = mirror(path(`M${s+8} 260q-5 37-27 76l-5-20 13-49z`,colors.chest));
    shapes.extensor_digitorum = mirror(path("M137 350l16 6-33 94-13-3z",colors.side));
    shapes.gluteus_medius = mirror(path(`M${female?181:191} 411q26-8 47 7l-12 32-44-6z`,"#e7c88d"));
    shapes.gluteus_maximus = mirror(path(`M${female?181:189} 435q30-16 57 4v55q-33 30-61-1z`,colors.glute));
    shapes.biceps_femoris = mirror(path("M191 506q21-7 22 13l-1 105-12 21q-12-74-9-139z","#91b9a4"));
    shapes.semitendinosus = mirror(path("M220 506l15 10-3 99-15 30z","#b4c891"));
    shapes.semimembranosus = mirror(path("M237 518l5 10-4 80-8 30-2-22z","#b6abd1"));
    shapes.gastrocnemius = mirror(path("M204 680q-16 29-6 70l17 35q28-32 17-75-12-42-28-30z",colors.calf));
    shapes.soleus = mirror(path("M200 754l15 27 14-21-8 62-12 12z","#dda0ac"));
    shapes.achilles_tendon = mirror(path("M210 803l10 2-3 62h-9z","#f0e2ca"));
    drawing += face;
    if (!back) drawing += mirror(path("M216 77q12-12 16 3l-10 35-10-9z","#ddb67e")+path("M219 117l16 4-6 21-10-9z","#d99688")+ellipse(233,104,12,8,"none","#bf8ba2"))+ellipse(250,135,13,5,"none","#bf8ba2");
    const order = back ? ["trapezius","infraspinatus","teres_major","rhomboid_major","latissimus_dorsi","erector_spinae","triceps_brachii","extensor_digitorum","gluteus_medius","gluteus_maximus","biceps_femoris","semitendinosus","semimembranosus","gastrocnemius","soleus","achilles_tendon"] : ["sternocleidomastoid","pectoralis_major","serratus_anterior","external_oblique","rectus_abdominis","deltoid","biceps_brachii","brachialis","brachioradialis","flexor_carpi_radialis","flexor_carpi_ulnaris","iliopsoas","rectus_femoris","vastus_lateralis","vastus_medialis","adductor_longus","gracilis","sartorius","tibialis_anterior","fibularis_longus","extensor_digitorum_longus"];
    // Draw colored anatomy first, then a separate topmost set of markers.
    order.forEach(key=>{ drawing += `<g ${attr(key)}>${shapes[key]}</g>`; });
    drawing += `<g fill="none" stroke="#fff5ea" stroke-width="1" opacity=".55">${mirror(path(back?"M215 450l19 16M211 463l24 11M197 704l13 38M205 700l12 39":"M193 227l43 13M190 239l46 12M200 493l9 99M208 490l8 103","none","#fff5ea",1))}</g>`;
    atlasMusclePoints[side].forEach(([key,x,y])=>add(key,x,y,"",{deep:expandedParts.muscle.find(p=>p[0]===key)?.[7] === true}));
  }

  if (layerId === "bone") {
    const ivory="#fff8e5", edge="#847d6d";
    const boneLine=d=>path(d,"none",edge,10)+path(d,"none",ivory,7);
    drawing += path("M213 98q-2-55 37-55t37 55l-10 30h-54z",ivory,edge,2);
    if (!back) drawing += ellipse(232,104,10,9,"#bdafa0",edge)+ellipse(268,104,10,9,"#bdafa0",edge)+path("M250 111l-6 14h12z","#bdafa0",edge)+path("M226 129l3 18q21 17 42 0l3-18-13 6h-22z",ivory,edge,2)+Array.from({length:7},(_,i)=>path(`M${234+i*5} 135v10`,"none",edge,1)).join("");
    else drawing += path("M250 43v47l-18 20-17-3M250 90l19 20 17-4","none",edge,1.3);
    drawing += Array.from({length:24},(_,i)=>{const y=155+i*10.5,w=i<7?13:i<19?17:21;return `<rect x="${250-w/2}" y="${y}" width="${w}" height="8" rx="3" fill="${ivory}" stroke="${edge}" stroke-width="1.2"/>`;}).join("");
    if (!back) drawing += path("M244 223h12l5 71-11 21-11-21z",ivory,edge,1.6);
    drawing += mirror(boneLine(`M245 211q-34-20-${female?57:73} 4`));
    drawing += mirror(Array.from({length:12},(_,i)=>{const y=222+i*10,spread=38+Math.sin(i/11*Math.PI)*32;return path(`M246 ${y}Q${250-spread} ${y-18} ${250-spread-4} ${y+3}Q${250-spread} ${y+15} ${i>9?231:243} ${y+20}`,"none",edge,4.8)+path(`M246 ${y}Q${250-spread} ${y-18} ${250-spread-4} ${y+3}Q${250-spread} ${y+15} ${i>9?231:243} ${y+20}`,"none",ivory,3);}).join(""));
    if (back) drawing += mirror(path("M179 223q19-6 52 16l-9 71-18-4-35-53z",ivory,edge,2));
    drawing += mirror(boneLine(`M${female?183:170} 230L139 337`)+boneLine("M137 349L108 443")+boneLine("M149 349L119 442"));
    const hp=female?176:187;
    drawing += mirror(path(`M243 411q-35-23-${250-hp} 9l8 41 26 30 27-11-5-34zM220 455q-18-2-17 12 4 17 23 6z`,ivory,edge,2,'fill-rule="evenodd"'));
    drawing += path(`M239 414h22l${female?6:0} 35-17 24-17-24z`,ivory,edge,2)+boneLine("M250 472v13");
    drawing += mirror(boneLine("M220 481L216 650")+ellipse(216,650,10,9,ivory,edge)+boneLine("M219 680L212 845")+path("M202 681L201 842","none",edge,5)+path("M202 681L201 842","none",ivory,3));
    if (!back) drawing += mirror(ellipse(217,664,10,13,ivory,edge));
    for (const hand of [false,true]) {
      let bones="";
      for(let i=0;i<6;i++) bones+=ellipse(106+i%3*5,449+Math.floor(i/3)*5,3,3,ivory,edge);
      for(let f=0;f<5;f++) {const x=100+f*5,tip=79+f*9,y=488+(f===2?18:f===0?0:12); bones+=path(`M${x} 458L${tip+7} 477L${tip+3} ${y-8}L${tip} ${y}`,"none",edge,4)+path(`M${x} 458L${tip+7} 477L${tip+3} ${y-8}L${tip} ${y}`,"none",ivory,2.4);}
      drawing += hand?`<g transform="translate(500 0) scale(-1 1)">${bones}</g>`:bones;
    }
    drawing += mirror(ellipse(210,852,8,8,ivory,edge)+ellipse(215,864,8,9,ivory,edge)+Array.from({length:5},(_,i)=>boneLine(`M${207+i*3} 866L${185+i*8} 883l-2 9`)).join(""));
    atlasBonePoints[side].forEach(([key,x,y])=>add(key,x,y,"",{color:ivory}));
  }

  if (layerId === "organ") {
    const organ=(key,shape)=>`<g ${attr(key)}>${shape}</g>`;
    const kidneys=mirror(path("M204 398c-22-8-27 40-11 50 14 8 26-1 22-13-14-6-11-16 1-21 1-8-5-14-12-16z","#ab6558","#774b49"));
    const brain=path("M216 88q-14-27 10-31 3-20 23-11 18-11 27 7 23 3 13 28 7 21-15 22-11 14-27 2-22 6-31-17z","#d8a2b9","#8c627a",1.8)+path("M233 57q-10 15 4 17-16 10-8 18M253 52q-9 10 1 23-10 11 0 25M271 60q-9 10 5 19-8 13-17 8","none","#a16f8c",2);
    drawing += organ("brain",brain);
    if(!back) drawing += organ("eye",ellipse(229,110,8,5,"#faf9ef","#638c93"))+organ("ear",path("M293 102q15 0 3 28","none","#c79b81",5));
    drawing += organ("trachea_outer",limb("M248 188v73","#9bbcc0",11))+organ("esophagus",limb("M262 184v167","#d3a68a",6));
    drawing += organ("thyroid",path("M234 195q14 9 28 0l7 20q-14 8-20-3-8 11-22 3z","#d9b677"));
    drawing += organ("lungs",mirror(path("M238 247q-25-26-44 6-24 41-17 78 24 25 61 0z","#e5a9a7","#a77675",1.8)));
    drawing += path("M248 252l-29 21-17 26m46-47l29 21 17 26M200 307l29-25m-10-9-27 1M300 307l-29-25m10-9 27 1","none","#be7d7c",2);
    if(!back) drawing += organ("heart",path("M254 276q14-16 25 4 17 17 6 38l-17 17q-27-17-23-38z","#c55759","#90484f",1.8));
    drawing += organ("diaphragm",path("M176 342q73-33 148 0","none","#bd8dbe",6));
    drawing += '<g transform="translate(0 105) scale(1 .7)">';
    if(back) {
      drawing += organ("kidney",kidneys)+organ("adrenal_glands",mirror(path("M190 390l14-9 10 13z","#ddb768")));
      drawing += organ("spleen",ellipse(183,371,12,23,"#ac7e9e","#825572"));
      drawing += organ("ureters_outer",mirror(limb("M213 438q15 23 24 76","#d8b979",4)));
    } else {
      drawing += organ("kidney",kidneys);
      drawing += organ("liver",path("M175 350q43-16 98 7-13 30-49 36l-41-3q-16-10-8-40z","#a96650","#88513f",2));
      drawing += organ("gallbladder",ellipse(213,382,6,12,"#8fa967","#677e51"));
      drawing += organ("stomach",path("M268 348q-2 25 10 19 24-9 24 15 0 31-41 23-11-8-6-17 12-4 4-26z","#e6b394","#b7896f",2));
      drawing += organ("spleen",ellipse(318,370,10,21,"#ac7e9e","#825572"));
      drawing += organ("pancreas",path("M232 397q40-13 71 1-17 11-65 10z","#e0ba6d","#af9056",1.5));
      drawing += organ("adrenal_glands",mirror(path("M196 393l8-8 9 8z","#daba75")));
      drawing += organ("ureters_outer",mirror(limb("M213 438q15 23 24 76","#d8b979",3)));
      drawing += organ("small_intestine",path("M218 439q62-12 67 2 4 10-54 10-14 9 7 12l40 1q17 11-2 17l-46-3q-12 10 20 11t25 8", "none","#dda797",12));
      drawing += organ("large_intestine",path("M195 503q-12-38 0-75 20-16 40-3 27 11 68-3l5 66q-2 17-24 14l-31 5", "none","#c88478",15));
      drawing += path("M187 442h16m-18 17h16m-15 17h15m-13 15h15M301 440h14m-13 17h15m-14 17h15M216 422v9m17-7v11m20-8v11m20-10v9m17-12v9","none","#efd0b8",2);
      drawing += organ("duodenum",path("M235 404q-26 1-13 16l17-1","none","#d9ab8c",7));
      drawing += organ("appendix",path("M195 509q-4 20 10 16","none","#bb7a71",5));
      drawing += organ("rectum",path("M252 500v39","none","#bb7a71",9));
    }
    drawing += organ("urinary_bladder",path("M229 514q19-15 39 0l-6 23q-14 12-27 0z","#e3c586","#b7a06c",1.7));
    // These small pelvic diagrams depict the selected model only.
    drawing += '<g data-highlight-group="pelvic_reproductive">';
    if (!back) drawing += female ? organ("uterus",path("M237 532q13-8 26 0l-13 26z","#c98d9a"))+organ("ovary",ellipse(218,535,7,4,"#dcb66f")+ellipse(282,535,7,4,"#dcb66f"))+organ("uterine_tube",path("M239 534q-10-18-19-2m41 2q10-18 19-2","none","#c98d9a",3))+organ("vagina",path("M246 554h8v21h-8z","#ce96a4")) : organ("prostate",ellipse(250,541,12,8,"#a792b5"))+organ("testis",ellipse(239,575,7,10,"#dcb66f")+ellipse(261,575,7,10,"#dcb66f"))+organ("ductus_deferens",mirror(path("M238 565q-30-47 0-42","none","#b29b80",3)))+organ("penis",path("M246 550h8v33h-8z","#d1a790"));
    drawing += '</g>';
    const organPoints = back ? [["brain",254,76],["lungs",192,276],["kidney",203,424],["adrenal_glands",204,389],["spleen",183,371],["ureters_outer",271,473],["urinary_bladder",244,521]] : atlasOrganPoints;
    drawing += '</g>';
    organPoints.forEach(([key,x,y])=>add(key,x,y>=348 ? 105+y*.7 : y));
    if (!back) {
      const breastColor=female?"#cfa0b3":"#d6c0bd";
      drawing += organ("mammary_gland",ellipse(329,280,female?13:6,female?18:8,breastColor,"#a78a96"));
    }
    // Keep the inset markup separate from the full body so its zoom never contains hands.
    const bodyDrawing = drawing;
    const bodyPartCount = parts.length;
    drawing += `<g class="pelvic-inset"><path d="M282 546L342 577" fill="none" stroke="#8a9e98" stroke-dasharray="3 4"/><rect x="338" y="559" width="155" height="224" rx="14" fill="#fffdf6" stroke="#baccc2"/>
      <text x="350" y="580" class="atlas-inset-title">${female?"女性":"男性"}の骨盤内・生殖器</text><text x="350" y="597" class="atlas-small">正面の拡大模式図 · タップして確認</text></g>`;
    if (female) {
      drawing += add("uterine_tube",449,630,path("M408 648q-19-45-43-8m54 8q19-45 43-8","none","#bd8799",6));
      drawing += add("ovary",367,649,ellipse(367,649,10,7,"#dfb86d")+ellipse(462,649,10,7,"#dfb86d"));
      drawing += add("uterus",414,664,path("M399 645q15-8 30 0 8 22-15 39-23-17-15-39z","#d39ca8"));
      drawing += add("cervix",414,693,path("M409 682h10v19h-10z","#b77d8c"));
      drawing += add("vagina",415,719,path("M407 701h15v39h-15z","#e0b5bd"));
      drawing += add("urethra",387,708,path("M385 690v24","none","#d9b973",5));
      drawing += add("vulva",414,750,ellipse(414,750,12,7,"#e8c3b9"));
      drawing += `<text x="346" y="770" class="atlas-small">子宮・卵巣・卵管・腟など</text>`;
    } else {
      drawing += ellipse(414,627,21,15,"#ead394","#b7a16d");
      drawing += add("seminal_vesicle",450,637,ellipse(450,637,7,12,"#b7a2c0"));
      drawing += add("prostate",414,658,ellipse(414,658,17,10,"#b69dbd"));
      drawing += add("ductus_deferens",376,681,path("M390 726q-35-68 7-91M443 726q32-61-1-81","none","#b69b82",4));
      drawing += add("penis",415,706,path("M403 675h23v62q-10 11-23 0z","#e1b59e","#a98777"));
      drawing += add("urethra",414,733,path("M414 645v94","none","#ccaa62",3));
      drawing += add("testis",389,745,ellipse(389,745,12,16,"#e1bd76")+ellipse(447,745,12,16,"#e1bd76"));
      drawing += add("epididymis",459,728,path("M454 726q13 4 7 29","none","#a5b4a1",5));
      drawing += `<text x="347" y="777" class="atlas-small">前立腺・精巣・精管など</text>`;
    }
    if (focus === "pelvis") {
      drawing = drawing.slice(bodyDrawing.length).replace('<path d="M282 546L342 577" fill="none" stroke="#8a9e98" stroke-dasharray="3 4"/>', "");
      parts.splice(0, bodyPartCount);
    } else {
      drawing = bodyDrawing;
      parts.splice(bodyPartCount);
      add("pelvic_reproductive",280,510,"",{zoom:"pelvis",color:"#c98d9a"});
    }
  }

  if (layerId === "network") {
    const nerve="#b291c9", artery="#d8786b", vein="#6fabc8", lymph="#83ad70";
    if (back) {
      // Posterior landmarks and routes are drawn separately from the anterior map.
      drawing += path("M182 228q20-8 49 14l-11 65-42-28zM318 228q-20-8-49 14l11 65 42-28zM199 424q23-23 50-5 26-18 52 5M214 652q19 17 36 0 17 17 36 0","none","#c2d0c8",2);
      drawing += `<g data-system="central">${path("M217 79q-6-39 33-38 42 0 32 42-6 22-32 19-29 6-33-23z","#d5bedf","#a68db3",1.6)}${limb("M250 143v340",nerve,7)}${Array.from({length:19},(_,i)=>path(`M241 ${195+i*14}h18`,"none","#987aaf",1.4)).join("")}</g>`;
      drawing += `<g data-system="peripheral">${mirror(limb("M248 207L193 241 154 329 129 414 110 476M246 426L212 472 202 558 213 654 209 802 209 854",nerve,3))}${mirror(limb("M244 258L211 284 166 300M209 479l-20 58m23 125-16 75m-46-400-18 35",nerve,2))}${Array.from({length:11},(_,i)=>mirror(path(`M250 ${238+i*16}q-24 2-43 18`,"none",nerve,1.3))).join("")}</g>`;
      drawing += `<g data-system="artery">${limb("M244 255v191",artery,4)}${mirror(limb("M247 207L188 245 160 330 133 412 112 476M245 440L218 482 216 570 213 650 208 749 206 857",artery,3))}${mirror(limb("M238 260l-39 25-20-9M216 652l-12 28M207 856l-18 25",artery,1.8))}</g>`;
      drawing += `<g data-system="vein">${limb("M257 167v278",vein,3.6)}${mirror(limb("M255 218L200 250 169 331 140 413 120 470M259 442L230 482 228 574 227 655 221 765 217 857",vein,3))}${mirror(limb("M226 658q-24 67-9 151M200 252l-24 41",vein,1.8))}</g>`;
      const backNodes=[[224,177],[189,277],[213,465],[216,664]];
      drawing += `<g data-system="lymph">${limb("M261 197q-18 93-10 250",lymph,2.8)}${mirror(limb("M259 217L190 275 151 364 117 465M251 447L216 470 211 664 208 839",lymph,1.8))}${backNodes.map(([x,y])=>mirror([[-4,-5],[3,1],[-3,7]].map(([dx,dy])=>ellipse(x+dx,y+dy,3,5,"#9bbe80","#709d62")).join(""))).join("")}</g>`;
      [["brain",250,79,"central"],["spinal_cord",250,292,"central"],["dorsal_ramus",216,303,"peripheral"],["radial_nerve",145,362,"peripheral"],["sciatic_nerve",211,545,"peripheral"],["tibial_nerve",209,755,"peripheral"],["aorta_main",245,371,"artery"],["occipital_artery",236,126,"artery"],["scapular_artery",186,281,"artery"],["popliteal_artery",213,652,"artery"],["posterior_tibial_artery",207,789,"artery"],["vertebral_vein",259,184,"vein"],["vena_cava",257,393,"vein"],["popliteal_vein",228,655,"vein"],["small_saphenous_vein",219,783,"vein"],["posterior_cervical_nodes",224,177,"lymph"],["axillary_lymph_nodes",189,277,"lymph"],["popliteal_lymph_nodes",214,664,"lymph"],["thoracic_duct",251,412,"lymph"]].forEach(([key,x,y,system])=>add(key,x,y,"",{system,color:{central:nerve,peripheral:nerve,artery,vein,lymph}[system]}));
    } else {
    add("brain",266,80,"",{system:"central",color:nerve});
    add("heart",276,294,"",{system:"artery",color:artery});
    drawing += `<g data-system="artery">${path("M254 276q14-16 25 4 17 17 6 38l-17 17q-27-17-23-38z","#c97973","#995755",1.5)}</g>`;
    drawing += `<g data-system="central">${path("M218 82q-7-38 31-35 44-4 34 43-10 20-33 7-29 11-32-15z","#d2bcdf","#9983ae",1.7)}${limb("M250 138v270",nerve,6)}</g>`;
    drawing += `<g data-system="peripheral">${mirror(limb("M250 198L180 224 145 344 111 449M248 411L219 491 216 652 209 851",nerve,3))}${Array.from({length:12},(_,i)=>mirror(path(`M250 ${212+i*14}q-25 0-${37+Math.min(i,7)*3} 13`,"none",nerve,1.4))).join("")}${mirror(limb("M218 528l-18 61m16 103l-17 34M137 383l-14 8M111 449l-21 36m21-36-2 51",nerve,1.5))}</g>`;
    drawing += `<g data-system="artery">${limb("M263 289q-6-34-24-21-6 10 7 30v144",artery,5)}${mirror(limb("M245 216L183 228 148 344 115 448M246 421L221 486 219 649 214 851M239 271V154 115",artery,3.3))}${mirror(limb("M242 386l-41 18M243 417l-29 10M216 851l-29 32M115 447l-19 46",artery,2))}</g>`;
    drawing += `<g data-system="vein">${limb("M258 171v272",vein,4)}${mirror(limb("M258 222L188 238 155 348 121 449M258 425L229 488 228 650 225 847M258 170l9-54",vein,2.8))}${mirror(limb("M257 391l43 14M228 651l-21 143M121 449l-14 46",vein,1.7))}</g>`;
    const clusters=[[233,174],[179,271],[219,465],[216,672]];
    drawing += `<g data-system="lymph">${limb("M261 203q-17 83-8 219",lymph,2.8)}${mirror(limb("M261 212L179 270 142 363 106 447M252 417L218 465 212 674 209 841",lymph,1.8))}${clusters.map(([x,y])=>mirror([[-4,-5],[3,1],[-3,7]].map(([dx,dy])=>ellipse(x+dx,y+dy,3,5,"#9bbe80","#709d62")).join(""))).join("")}</g>`;
    [["spinal_cord",250,173,"central"],["brachial_plexus",184,226,"peripheral"],[back?"sciatic_nerve":"femoral_nerve",218,542,"peripheral"],["tibial_nerve",209,760,"peripheral"],["median_nerve",142,362,"peripheral"],["aorta_main",245,329,"artery"],["carotid_artery",237,151,"artery"],["femoral_artery",219,605,"artery"],["jugular_vein",267,145,"vein"],["vena_cava",258,376,"vein"],["great_saphenous_vein",276,783,"vein"],["cervical_lymph_nodes",224,184,"lymph"],["axillary_lymph_nodes",179,275,"lymph"],[back?"popliteal_lymph_nodes":"inguinal_lymph_nodes",216,back?674:465,"lymph"],["thoracic_duct",253,413,"lymph"]].forEach(([key,x,y,system])=>add(key,x,y,"",{system,color:{central:nerve,peripheral:nerve,artery,vein,lymph}[system]}));
    }
  }

  if (layerId === "skin" || (layerId === "organ" && focus !== "pelvis")) return realisticLayerSVG(layerId, side, sex, parts);
  const markers=parts.map(({key,x,y,opt})=>`<g ${attr(key,opt)}><circle cx="${x}" cy="${y}" r="11" fill="transparent"/>${items[key]?.internal || opt.zoom ? magnifier(x,y) : `<circle class="hotspot-dot" cx="${x}" cy="${y}" r="4.8"/>`}</g>`).join("");
  const label=`${female?"女性":"男性"}・${back?"背面":"正面"}・${layers.find(l=>l.id===layerId).title}`;
  return `<svg class="anatomy-atlas" viewBox="${focus === "pelvis" && layerId === "organ" ? "330 550 170 245" : "0 0 500 960"}" role="img" aria-label="${label}${focus === "pelvis" ? "・骨盤内拡大" : ""}" data-sex="${sex}" data-side="${side}">
    <text x="250" y="22" text-anchor="middle" class="atlas-heading">${female?"FEMALE":"MALE"} / ${back?"POSTERIOR":"ANTERIOR"}</text>
    ${drawing}${markers}
    <text x="250" y="929" text-anchor="middle" class="atlas-caption">${female?"女性":"男性"}モデル · ${back?"背面":"正面"} · 学習用模式図</text>
  </svg>`;
}
