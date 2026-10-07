// Stable IDs are shared by the diagram, part index and future card content.
// Coordinates refer to the prototype's 360 × 720 viewBox, not an anatomical atlas.
const expandedParts = {
  muscle: [
    ["temporalis", "側頭筋", "front", 211, 79, "頭・首"],
    ["masseter", "咬筋", "front", 204, 109, "頭・首"],
    ["orbicularis_oculi", "眼輪筋", "front", 162, 87, "頭・首"],
    ["orbicularis_oris", "口輪筋", "front", 180, 114, "頭・首"],
    ["sternocleidomastoid", "胸鎖乳突筋", "front", 165, 150, "頭・首", "M157 133l20 32", false],
    ["serratus_anterior", "前鋸筋", "front", 222, 235, "体幹", "M216 220l12 8m-13 3l13 8m-14 3l13 8"],
    ["external_oblique", "外腹斜筋", "front", 220, 280, "体幹", "M222 260l-15 41"],
    ["brachialis", "上腕筋", "front", 117, 241, "腕・手", "M120 225l-10 25"],
    ["brachioradialis", "腕橈骨筋", "front", 93, 252, "腕・手", "M106 233l-20 35"],
    ["flexor_carpi_radialis", "橈側手根屈筋", "front", 267, 258, "腕・手", "M251 240l22 31"],
    ["flexor_carpi_ulnaris", "尺側手根屈筋", "front", 279, 276, "腕・手"],
    ["iliopsoas", "腸腰筋", "front", 180, 330, "脚・足", "M168 302l-12 35m36-35l12 35", true],
    ["sartorius", "縫工筋", "front", 154, 410, "脚・足", "M136 330l31 103"],
    ["rectus_femoris", "大腿直筋", "front", 208, 364, "脚・足", "M204 342l9 75"],
    ["vastus_lateralis", "外側広筋", "front", 225, 402, "脚・足", "M218 359l8 65"],
    ["vastus_medialis", "内側広筋", "front", 202, 428, "脚・足"],
    ["adductor_longus", "長内転筋", "front", 168, 355, "脚・足", "M170 337l-6 48"],
    ["gracilis", "薄筋", "front", 164, 385, "脚・足", "M173 349l-17 77"],
    ["fibularis_longus", "長腓骨筋", "front", 240, 512, "脚・足", "M232 476l9 83"],
    ["extensor_digitorum_longus", "長趾伸筋", "front", 234, 575, "脚・足", "M223 508l13 93"],
    ["infraspinatus", "棘下筋", "back", 148, 211, "体幹", "M136 204l33 13"],
    ["teres_major", "大円筋", "back", 138, 236, "体幹", "M129 229l28 11"],
    ["rhomboid_major", "大菱形筋", "back", 168, 217, "体幹", "M177 192l-18 43", true],
    ["erector_spinae", "脊柱起立筋", "back", 169, 275, "体幹", "M170 235v69m20-69v69", true],
    ["extensor_digitorum", "総指伸筋", "back", 266, 257, "腕・手", "M254 237l24 39"],
    ["gluteus_medius", "中臀筋", "back", 222, 316, "体幹"],
    ["biceps_femoris", "大腿二頭筋", "back", 224, 388, "脚・足", "M216 364l10 61"],
    ["semitendinosus", "半腱様筋", "back", 199, 396, "脚・足", "M192 368l13 67"],
    ["semimembranosus", "半膜様筋", "back", 162, 427, "脚・足", "M166 388l-7 46", true],
    ["soleus", "ヒラメ筋", "back", 238, 557, "脚・足", "M224 517l15 69", true]
  ],
  bone: [
    ["frontal_bone", "前頭骨", "front", 173, 58, "頭・首"],
    ["temporal_bone", "側頭骨", "front", 212, 87, "頭・首"],
    ["zygomatic_bone", "頬骨", "front", 204, 102, "頭・首"],
    ["nasal_bone", "鼻骨", "front", 179, 88, "頭・首"],
    ["maxilla", "上顎骨", "front", 170, 108, "頭・首"],
    ["mandible", "下顎骨", "front", 180, 129, "頭・首", "M163 114l7 21h20l7-21"],
    ["radius", "橈骨", "front", 87, 260, "腕・手", "M100 241l-17 30"],
    ["ulna", "尺骨", "front", 103, 263, "腕・手", "M112 239l-15 33"],
    ["carpals", "手根骨", "front", 82, 279, "腕・手"],
    ["metacarpals", "中手骨", "front", 277, 274, "腕・手"],
    ["hand_phalanges", "指骨（手）", "front", 286, 288, "腕・手"],
    ["ilium", "腸骨", "front", 150, 310, "体幹"],
    ["ischium", "坐骨", "front", 201, 340, "体幹"],
    ["pubis", "恥骨", "front", 178, 342, "体幹"],
    ["tibia", "脛骨", "front", 137, 521, "脚・足", "M146 480l-11 115"],
    ["fibula", "腓骨", "front", 119, 552, "脚・足", "M129 482l-11 110"],
    ["talus", "距骨", "front", 126, 615, "脚・足"],
    ["metatarsals", "中足骨", "front", 236, 632, "脚・足"],
    ["foot_phalanges", "趾骨（足）", "front", 126, 645, "脚・足"],
    ["parietal_bone", "頭頂骨", "back", 198, 62, "頭・首"],
    ["occipital_bone", "後頭骨", "back", 177, 101, "頭・首"],
    ["cervical_vertebrae", "頸椎", "back", 180, 150, "体幹", "M180 132v34"],
    ["thoracic_vertebrae", "胸椎", "back", 180, 197, "体幹", "M180 176v28"],
    ["lumbar_vertebrae", "腰椎", "back", 180, 283, "体幹", "M180 261v36"],
    ["coccyx", "尾骨", "back", 180, 348, "体幹"],
    ["calcaneus", "踵骨", "back", 129, 626, "脚・足"]
  ],
  organ: [
    ["larynx", "喉頭", "front", 192, 141, "頭・首"],
    ["parotid_gland", "耳下腺", "front", 214, 106, "頭・首"],
    ["submandibular_gland", "顎下腺", "front", 161, 129, "頭・首"],
    ["duodenum", "十二指腸", "front", 169, 337, "消化器", "M170 326q-19 13 0 22"],
    ["jejunum", "空腸", "front", 193, 360, "消化器"],
    ["ileum", "回腸", "front", 167, 395, "消化器"],
    ["cecum", "盲腸", "front", 148, 409, "消化器"],
    ["ascending_colon", "上行結腸", "front", 138, 386, "消化器"],
    ["transverse_colon", "横行結腸", "front", 180, 345, "消化器", "M150 345q30-5 61 0"],
    ["descending_colon", "下行結腸", "front", 219, 374, "消化器"],
    ["sigmoid_colon", "S状結腸", "front", 205, 420, "消化器"],
    // Reproductive organs use separate enlarged insets, not positions on the legs.
    ["uterus", "子宮", "front", 117, 559, "生殖器"],
    ["ovary", "卵巣", "front", 80, 548, "生殖器"],
    ["uterine_tube", "卵管", "front", 140, 536, "生殖器"],
    ["vagina", "腟", "front", 117, 594, "生殖器"],
    ["prostate", "前立腺", "front", 247, 558, "生殖器"],
    ["testis", "精巣", "front", 224, 604, "生殖器"],
    ["epididymis", "精巣上体", "front", 270, 588, "生殖器"],
    ["seminal_vesicle", "精嚢", "front", 270, 536, "生殖器"],
    ["ductus_deferens", "精管", "front", 217, 571, "生殖器"],
    ["urethra", "尿道", "front", 249, 584, "泌尿器"]
  ]
};

function expandedPartMarkup(layer, side) {
  const color = {muscle:"#e38b77", bone:"#f3ead1", organ:"#d99a7d"}[layer];
  return (expandedParts[layer] || []).filter(part => part[2] === side).map(([key, label, , x, y, region, path, deep]) => `
    <g class="hotspot extra-hotspot" tabindex="0" data-item="${key}" data-label="${label}" data-type="${layer.toUpperCase()}" data-color="${color}" data-region="${region}" data-deep="${Boolean(deep)}">
      ${path ? `<path d="${path}" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round" ${deep ? 'stroke-dasharray="3 3"' : ''}/>` : ""}
      <circle cx="${x}" cy="${y}" r="7" fill="transparent"/>
      <circle class="hotspot-dot" cx="${x}" cy="${y}" r="4"/>
    </g>`).join("");
}

function reproductiveInsets() {
  return `<g class="reproductive-insets" aria-hidden="true">
    <rect x="53" y="490" width="122" height="143" rx="12" fill="#fbfaf5" stroke="#b6cbc3"/>
    <rect x="185" y="490" width="122" height="143" rx="12" fill="#fbfaf5" stroke="#b6cbc3"/>
    <g fill="#466365" font-size="10" text-anchor="middle"><text x="114" y="510">女性生殖器（別図）</text><text x="246" y="510">男性生殖器（別図）</text></g>
    <path d="M116 550q-12-28-33-8m34 8q12-28 34-8" fill="none" stroke="#d8919b" stroke-width="6"/>
    <ellipse cx="80" cy="548" rx="10" ry="6" fill="#e8bd54"/><ellipse cx="153" cy="548" rx="10" ry="6" fill="#e8bd54"/>
    <path d="M102 549h29q4 17-14 29-18-12-15-29zM112 578h10v29h-10z" fill="#d8919b"/>
    <ellipse cx="246" cy="540" rx="16" ry="10" fill="#e8bd54" opacity=".45"/>
    <ellipse cx="247" cy="558" rx="15" ry="9" fill="#79b7b2"/>
    <path d="M249 567v36M224 599q-22-49 7-63M269 599q23-49-7-63" fill="none" stroke="#b48976" stroke-width="4"/>
    <ellipse cx="224" cy="604" rx="11" ry="15" fill="#e8bd54"/><ellipse cx="269" cy="604" rx="11" ry="15" fill="#e8bd54"/>
    <path d="M276 589q9 14 0 25" fill="none" stroke="#79b7b2" stroke-width="5"/>
    <ellipse cx="270" cy="536" rx="6" ry="9" fill="#b68ea9"/>
  </g>`;
}
