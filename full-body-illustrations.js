// Coordinates calibrated to the two-view atlas plates, in one 500 × 1000 panel.
const realisticOrganPositions = {
  brain:[265,35],eye:[247,64],ear:[306,77],pituitary:[261,57],pineal_gland:[277,53],salivary_glands:[240,105],tongue:[268,99],parotid_gland:[300,100],submandibular_gland:[248,116],pharynx:[271,124],larynx:[269,143],thyroid:[258,155],parathyroid:[281,154],trachea_outer:[269,180],esophagus:[278,197],lungs:[217,239],thymus:[269,216],heart:[283,250],mammary_gland:[334,234],diaphragm:[296,282],liver:[225,309],gallbladder:[230,335],stomach:[301,317],spleen:[329,329],pancreas:[279,348],adrenal_glands:[215,309],kidney:[305,355],duodenum:[252,350],ureters_outer:[279,437],large_intestine:[210,405],small_intestine:[275,404],jejunum:[286,386],ileum:[254,432],cecum:[213,435],ascending_colon:[201,391],transverse_colon:[265,365],descending_colon:[324,407],sigmoid_colon:[290,453],appendix:[216,453],rectum:[271,456],urinary_bladder:[266,486],pelvic_reproductive:[302,510],uterus:[266,504],ovary:[236,501],uterine_tube:[290,492],vagina:[268,525],prostate:[266,510],testis:[259,549],ductus_deferens:[284,519],penis:[274,537]
};
function realisticLayerSVG(layer,side,sex,parts) {
  const back=side==='back', female=sex==='female';
  const list=parts.map(p=>({...p,opt:{...p.opt}}));
  if(layer==='organ'&&!back) for(const key of female?['uterus','ovary','uterine_tube','vagina']:['prostate','testis','ductus_deferens','penis']) list.push({key,opt:{}});
  const skinPositions={hair:[272,45],scalp_hair:[253,63],lips:[265,124],skin:[288,339],back_skin:[268,330],breast:[310,285],palm:[69,536],fingernails:back?[56,555]:[459,564],toenails:[163,945],sole:[340,936],heel:[163,931],elbow_skin:[125,355],penis:[265,516],scrotum:[277,546],vulva:[265,529]};
  const seen=new Set();
  const markers=list.filter(p=>!seen.has(p.key)&&seen.add(p.key)).map(p=>{
    let x,y;
    if(layer==='organ') {
      [x,y]=realisticOrganPositions[p.key]||[p.x,p.y];
      if(back) [x,y]=({brain:[230,36],lungs:[184,238],kidney:[185,348],adrenal_glands:[191,307],spleen:[167,325],ureters_outer:[266,427],urinary_bladder:[230,485],pelvic_reproductive:[272,514]})[p.key]||[x,y];
      if(female&&!back) {x+=18;if(y>180&&y<460)y+=15;}
      if(female&&back&&y>280)y+=17;
    } else if(layer==='skin') {
      [x,y]=skinPositions[p.key]||[p.x,p.y];
      if(back&&p.key==='scalp_hair')x=235;
      if(female) {
        const adjustments={toenails:[195,947],sole:[316,939],heel:[172,934],breast:[306,267],fingernails:back?[54,556]:[452,555]};
        if(adjustments[p.key])[x,y]=adjustments[p.key];
      }
    }
    else {x=250+(p.x-250)*1.28; y=p.y<200?p.y*.84:p.y*1.08-38;}
    const label=atlasNames[p.key]||items[p.key]?.title||p.key;
    return `<g class="hotspot atlas-hotspot" tabindex="0" data-item="${p.key}" data-label="${label}" data-type="${layer.toUpperCase()}" data-color="${p.opt.color||'#c87970'}"${p.opt.system?` data-system="${p.opt.system}"`:''}${p.opt.zoom?` data-zoom="${p.opt.zoom}"`:''}><title>${label}（位置の目安）</title><ellipse class="full-body-region" cx="${x}" cy="${y}" rx="17" ry="23"/><circle cx="${x}" cy="${y}" r="12" fill="transparent"/>${items[p.key]?.internal||p.opt.zoom?magnifier(x,y):`<circle class="hotspot-dot" cx="${x}" cy="${y}" r="4.8"/>`}</g>`;
  }).join('');
  return `<svg class="anatomy-atlas realistic-full-body" viewBox="0 0 500 1045" role="img" aria-label="${female?'女性':'男性'}・${back?'背面':'正面'}・${layer}" data-sex="${sex}" data-side="${side}"><svg width="500" height="1000" viewBox="${back?500:0} 0 500 1000" overflow="hidden"><image href="assets/full-${layer}-${sex}.png" width="1000" height="1000"/></svg>${markers}<text x="250" y="1013" text-anchor="middle" class="atlas-caption">AI生成の学習用イラスト · 赤丸は位置の目安</text><text x="250" y="1033" text-anchor="middle" class="atlas-caption">隠れた構造の詳細はカード・拡大図で確認</text></svg>`;
}
const realisticBonePositions = {
  front: {skull:[250,45],frontal_bone:[239,58],temporal_bone:[286,83],zygomatic_bone:[273,94],nasal_bone:[250,88],maxilla:[242,108],mandible:[254,123],clavicle:[205,178],ribs:[312,258],sternum:[250,227],humerus:[145,268],radius:[96,410],ulna:[116,397],carpals:[65,469],metacarpals:[440,493],hand_phalanges:[457,537],pelvis:[310,426],ilium:[193,408],ischium:[291,476],pubis:[250,485],femur:[207,579],patella:[196,668],tibia:[306,779],fibula:[176,790],talus:[195,899],metatarsals:[305,935],foot_phalanges:[170,948]},
  back: {parietal_bone:[270,40],occipital_bone:[246,81],scapula:[176,217],vertebral_column:[250,295],cervical_vertebrae:[250,141],thoracic_vertebrae:[250,222],lumbar_vertebrae:[250,365],pelvis:[303,418],sacrum:[250,433],coccyx:[250,469],femur:[206,581],tibia:[303,778],fibula:[175,790],calcaneus:[195,932]}
};
function realisticBoneSVG(side, sex) {
  const offset = sex === 'male' ? (side === 'front' ? 17 : -20) : 0;
  const markers = atlasBonePoints[side].map(([key]) => {
    const [px,y] = realisticBonePositions[side][key];
    const x=px+offset, label=atlasNames[key] || key;
    return `<g class="hotspot atlas-hotspot" tabindex="0" data-item="${key}" data-label="${label}" data-type="BONE" data-color="#c5ad87"><ellipse class="full-body-region" cx="${x}" cy="${y}" rx="15" ry="22"/><circle cx="${x}" cy="${y}" r="12" fill="transparent"/><circle class="hotspot-dot" cx="${x}" cy="${y}" r="4.8"/></g>`;
  }).join('');
  return `<svg class="anatomy-atlas realistic-full-body" viewBox="0 0 500 1020" role="img" aria-label="${sex==='female'?'女性':'男性'}・${side==='back'?'背面':'正面'}・骨格" data-sex="${sex}" data-side="${side}"><svg width="500" height="1000" viewBox="${side==='back'?500:0} 0 500 1000" overflow="hidden"><image href="assets/full-bone-${sex}.png" width="1000" height="1000"/></svg>${markers}<text x="250" y="1010" text-anchor="middle" class="atlas-caption">骨格 · AI生成の学習用イラスト</text></svg>`;
}
