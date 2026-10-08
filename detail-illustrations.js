// Coordinates are registered to the reviewed square illustrations (0–1000).
const detailIllustrations = {
  skin: { title:"皮膚の内部構造", view:"皮膚の断面", parts:[
    ["epidermis","表皮",601,258,180,34,"#ed9c80"],
    ["dermis","真皮",575,400,90,65,"#d97965"],
    ["subcutaneous_tissue","皮下組織",552,816,200,65,"#e9bd5d"],
    ["hair_follicle","毛包",274,507,36,125,"#704a3e"],
    ["sebaceous_gland","皮脂腺",425,411,58,67,"#f0c86c"],
    ["sweat_gland","汗腺",723,596,60,80,"#d9ad91"],
    ["sensory_nerve","知覚神経",602,443,25,80,"#e8bd54"],
    ["skin_blood_vessels","皮膚の血管",421,751,70,25,"#d94e4f"]
  ]},
  brain: { title:"脳の内部構造", view:"左側面から見た主な部位", parts:[
    ["frontal_lobe","前頭葉",265,375,155,180,"#e47b7e"],
    ["parietal_lobe","頭頂葉",650,300,150,140,"#b4a1bb"],
    ["temporal_lobe","側頭葉",530,557,190,93,"#d9a469"],
    ["cerebellum","小脳",754,720,115,85,"#bb8a70"],
    ["brainstem","脳幹",563,822,40,92,"#ba967c"]
  ]},
  eye: { title:"目の内部構造", view:"眼球の断面", parts:[
    ["cornea","角膜",86,466,47,165,"#9bd3d4"],
    ["iris","虹彩",177,358,16,55,"#438d91"],
    ["lens","水晶体",280,463,58,133,"#e8d6b3"],
    ["retina","網膜",720,690,45,63,"#ef705c"],
    ["optic_nerve","視神経",904,552,75,48,"#e8bd54"]
  ]},
  ear: { title:"耳の内部構造", view:"外耳・中耳・内耳の断面", parts:[
    ["pinna","耳介",122,343,90,210,"#e9a386"],
    ["ear_canal","外耳道",404,480,100,47,"#c4755d"],
    ["eardrum","鼓膜",557,511,45,65,"#c3aba0"],
    ["ossicles","耳小骨",624,431,60,64,"#e8d7b1"],
    ["cochlea","蝸牛",830,536,65,66,"#c7b5aa"]
  ]},
  heart: { title:"心臓の内部構造", view:"前面から見た断面（体の右側は図の左）", parts:[
    ["right_atrium","右心房",345,445,78,100,"#6faab9"],
    ["left_atrium","左心房",682,397,78,65,"#e8897c"],
    ["right_ventricle","右心室",372,665,82,102,"#b97067"],
    ["left_ventricle","左心室",656,723,80,130,"#ef705c"],
    ["aorta","大動脈",521,160,100,68,"#a24d58"]
  ]},
  kidney: { title:"腎臓の内部構造", view:"腎臓の断面", parts:[
    ["renal_cortex","腎皮質",225,315,22,48,"#9b453b"],
    ["renal_medulla","腎髄質",370,448,65,65,"#e99a78"],
    ["renal_pelvis","腎盂",614,496,75,45,"#f0c86c"],
    ["ureter","尿管",726,858,18,100,"#e8bd54"]
  ]},
  lungs: { title:"肺の内部構造", view:"前面から見た肺・気管支と肺胞の拡大図", parts:[
    ["trachea","気管",449,194,29,125,"#b89d8d"],
    ["right_lung","右肺",165,638,100,160,"#df8f91"],
    ["left_lung","左肺",690,410,75,130,"#e9a7a5"],
    ["bronchus","気管支",516,395,65,45,"#b89d8d"],
    ["alveoli","肺胞",823,811,105,112,"#e0a198"]
  ]}
};

function realisticDetailSVG(key) {
  const detail = detailIllustrations[key];
  const targets = detail.parts.map(([id,label,x,y,rx,ry,color]) => `
    <g class="hotspot detail-hotspot" tabindex="0" role="button" data-item="${id}" data-label="${label}" data-type="${key.toUpperCase()} STRUCTURE" data-color="${color}">
      <ellipse class="detail-region" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/>
      <circle cx="${x}" cy="${y}" r="36" fill="transparent"/>
      <circle class="hotspot-dot" cx="${x}" cy="${y}" r="13"/>
    </g>`).join("");
  return `<svg class="detail-atlas" viewBox="0 0 1000 1120" role="img" aria-label="${detail.title}・${detail.view}">
    <image href="assets/detail-${key}.png" x="0" y="0" width="1000" height="1000" preserveAspectRatio="xMidYMid meet"/>
    ${targets}
    <text x="500" y="1050" text-anchor="middle" class="detail-title">${detail.title}</text>
    <text x="500" y="1090" text-anchor="middle" class="detail-caption">${detail.view}</text>
  </svg>`;
}
