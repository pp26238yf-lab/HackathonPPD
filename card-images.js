// Supplied card assets; aliases of the same card share notes.
const cardImages={
  "hair": {
    "name": "毛髪",
    "src": "assets/cards/hair.png",
    "noteId": "hair"
  },
  "lips": {
    "name": "口唇",
    "src": "assets/cards/lips.png",
    "noteId": "lips"
  },
  "palm": {
    "name": "手掌",
    "src": "assets/cards/palm.png",
    "noteId": "palm"
  },
  "fingernails": {
    "name": "手の爪",
    "src": "assets/cards/fingernails.png",
    "noteId": "fingernails"
  },
  "toenails": {
    "name": "足の爪",
    "src": "assets/cards/toenails.png",
    "noteId": "toenails"
  },
  "sole": {
    "name": "足底",
    "src": "assets/cards/sole.png",
    "noteId": "sole"
  },
  "penis": {
    "name": "陰茎",
    "src": "assets/cards/penis.png",
    "noteId": "penis"
  },
  "scrotum": {
    "name": "陰嚢",
    "src": "assets/cards/scrotum.png",
    "noteId": "scrotum"
  },
  "scalp_hair": {
    "name": "頭皮・毛髪",
    "src": "assets/cards/scalp_hair.png",
    "noteId": "scalp_hair"
  },
  "back_skin": {
    "name": "背部の皮膚",
    "src": "assets/cards/back_skin.png",
    "noteId": "back_skin"
  },
  "elbow_skin": {
    "name": "肘の皮膚",
    "src": "assets/cards/elbow_skin.png",
    "noteId": "elbow_skin"
  },
  "heel": {
    "name": "かかと",
    "src": "assets/cards/heel.png",
    "noteId": "heel"
  },
  "breast": {
    "name": "乳房",
    "src": "assets/cards/breast.png",
    "noteId": "breast"
  },
  "vulva": {
    "name": "外陰部",
    "src": "assets/cards/vulva.png",
    "noteId": "vulva"
  },
  "sternocleidomastoid": {
    "name": "胸鎖乳突筋",
    "src": "assets/cards/sternocleidomastoid.png",
    "noteId": "sternocleidomastoid"
  },
  "pectoralis_major": {
    "name": "大胸筋",
    "src": "assets/cards/pectoralis_major.png",
    "noteId": "pectoralis_major"
  },
  "serratus_anterior": {
    "name": "前鋸筋",
    "src": "assets/cards/serratus_anterior.png",
    "noteId": "serratus_anterior"
  },
  "external_oblique": {
    "name": "外腹斜筋",
    "src": "assets/cards/external_oblique.png",
    "noteId": "external_oblique"
  },
  "rectus_abdominis": {
    "name": "腹直筋",
    "src": "assets/cards/rectus_abdominis.png",
    "noteId": "rectus_abdominis"
  },
  "deltoid": {
    "name": "三角筋",
    "src": "assets/cards/deltoid.png",
    "noteId": "deltoid"
  },
  "biceps_brachii": {
    "name": "上腕二頭筋",
    "src": "assets/cards/biceps_brachii.png",
    "noteId": "biceps_brachii"
  },
  "brachialis": {
    "name": "上腕筋",
    "src": "assets/cards/brachialis.png",
    "noteId": "brachialis"
  },
  "brachioradialis": {
    "name": "腕橈骨筋",
    "src": "assets/cards/brachioradialis.png",
    "noteId": "brachioradialis"
  },
  "flexor_carpi_radialis": {
    "name": "橈側手根屈筋",
    "src": "assets/cards/flexor_carpi_radialis.png",
    "noteId": "flexor_carpi_radialis"
  },
  "flexor_carpi_ulnaris": {
    "name": "尺側手根屈筋",
    "src": "assets/cards/flexor_carpi_ulnaris.png",
    "noteId": "flexor_carpi_ulnaris"
  },
  "iliopsoas": {
    "name": "腸腰筋",
    "src": "assets/cards/iliopsoas.png",
    "noteId": "iliopsoas"
  },
  "rectus_femoris": {
    "name": "大腿直筋",
    "src": "assets/cards/rectus_femoris.png",
    "noteId": "rectus_femoris"
  },
  "vastus_lateralis": {
    "name": "外側広筋",
    "src": "assets/cards/vastus_lateralis.png",
    "noteId": "vastus_lateralis"
  },
  "vastus_medialis": {
    "name": "内側広筋",
    "src": "assets/cards/vastus_medialis.png",
    "noteId": "vastus_medialis"
  },
  "adductor_longus": {
    "name": "長内転筋",
    "src": "assets/cards/adductor_longus.png",
    "noteId": "adductor_longus"
  },
  "gracilis": {
    "name": "薄筋",
    "src": "assets/cards/gracilis.png",
    "noteId": "gracilis"
  },
  "sartorius": {
    "name": "縫工筋",
    "src": "assets/cards/sartorius.png",
    "noteId": "sartorius"
  },
  "tibialis_anterior": {
    "name": "前脛骨筋",
    "src": "assets/cards/tibialis_anterior.png",
    "noteId": "tibialis_anterior"
  },
  "fibularis_longus": {
    "name": "長腓骨筋",
    "src": "assets/cards/fibularis_longus.png",
    "noteId": "fibularis_longus"
  },
  "extensor_digitorum_longus": {
    "name": "長趾伸筋",
    "src": "assets/cards/extensor_digitorum_longus.png",
    "noteId": "extensor_digitorum_longus"
  },
  "facial_muscles": {
    "name": "表情筋",
    "src": "assets/cards/facial_muscles.png",
    "noteId": "facial_muscles"
  },
  "temporalis": {
    "name": "側頭筋",
    "src": "assets/cards/temporalis.png",
    "noteId": "temporalis"
  },
  "masseter": {
    "name": "咬筋",
    "src": "assets/cards/masseter.png",
    "noteId": "masseter"
  },
  "orbicularis_oculi": {
    "name": "眼輪筋",
    "src": "assets/cards/orbicularis_oculi.png",
    "noteId": "orbicularis_oculi"
  },
  "orbicularis_oris": {
    "name": "口輪筋",
    "src": "assets/cards/orbicularis_oris.png",
    "noteId": "orbicularis_oris"
  },
  "quadriceps": {
    "name": "大腿四頭筋",
    "src": "assets/cards/quadriceps.png",
    "noteId": "quadriceps"
  },
  "trapezius": {
    "name": "僧帽筋",
    "src": "assets/cards/trapezius.png",
    "noteId": "trapezius"
  },
  "infraspinatus": {
    "name": "棘下筋",
    "src": "assets/cards/infraspinatus.png",
    "noteId": "infraspinatus"
  },
  "teres_major": {
    "name": "大円筋",
    "src": "assets/cards/teres_major.png",
    "noteId": "teres_major"
  },
  "rhomboid_major": {
    "name": "大菱形筋",
    "src": "assets/cards/rhomboid_major.png",
    "noteId": "rhomboid_major"
  },
  "latissimus_dorsi": {
    "name": "広背筋",
    "src": "assets/cards/latissimus_dorsi.png",
    "noteId": "latissimus_dorsi"
  },
  "erector_spinae": {
    "name": "脊柱起立筋",
    "src": "assets/cards/erector_spinae.png",
    "noteId": "erector_spinae"
  },
  "triceps_brachii": {
    "name": "上腕三頭筋",
    "src": "assets/cards/triceps_brachii.png",
    "noteId": "triceps_brachii"
  },
  "extensor_digitorum": {
    "name": "総指伸筋",
    "src": "assets/cards/extensor_digitorum.png",
    "noteId": "extensor_digitorum"
  },
  "gluteus_medius": {
    "name": "中臀筋",
    "src": "assets/cards/gluteus_medius.png",
    "noteId": "gluteus_medius"
  },
  "gluteus_maximus": {
    "name": "大臀筋",
    "src": "assets/cards/gluteus_maximus.png",
    "noteId": "gluteus_maximus"
  },
  "biceps_femoris": {
    "name": "大腿二頭筋",
    "src": "assets/cards/biceps_femoris.png",
    "noteId": "biceps_femoris"
  },
  "semitendinosus": {
    "name": "半腱様筋",
    "src": "assets/cards/semitendinosus.png",
    "noteId": "semitendinosus"
  },
  "semimembranosus": {
    "name": "半膜様筋",
    "src": "assets/cards/semimembranosus.png",
    "noteId": "semimembranosus"
  },
  "gastrocnemius": {
    "name": "腓腹筋",
    "src": "assets/cards/gastrocnemius.png",
    "noteId": "gastrocnemius"
  },
  "soleus": {
    "name": "ヒラメ筋",
    "src": "assets/cards/soleus.png",
    "noteId": "soleus"
  },
  "achilles_tendon": {
    "name": "アキレス腱",
    "src": "assets/cards/achilles_tendon.png",
    "noteId": "achilles_tendon"
  },
  "hamstrings": {
    "name": "ハムストリングス",
    "src": "assets/cards/hamstrings.png",
    "noteId": "hamstrings"
  },
  "skull": {
    "name": "頭蓋骨",
    "src": "assets/cards/skull.png",
    "noteId": "skull"
  },
  "frontal_bone": {
    "name": "前頭骨",
    "src": "assets/cards/frontal_bone.png",
    "noteId": "frontal_bone"
  },
  "temporal_bone": {
    "name": "側頭骨",
    "src": "assets/cards/temporal_bone.png",
    "noteId": "temporal_bone"
  },
  "zygomatic_bone": {
    "name": "頬骨",
    "src": "assets/cards/zygomatic_bone.png",
    "noteId": "zygomatic_bone"
  },
  "nasal_bone": {
    "name": "鼻骨",
    "src": "assets/cards/nasal_bone.png",
    "noteId": "nasal_bone"
  },
  "maxilla": {
    "name": "上顎骨",
    "src": "assets/cards/maxilla.png",
    "noteId": "maxilla"
  },
  "mandible": {
    "name": "下顎骨",
    "src": "assets/cards/mandible.png",
    "noteId": "mandible"
  },
  "clavicle": {
    "name": "鎖骨",
    "src": "assets/cards/clavicle.png",
    "noteId": "clavicle"
  },
  "ribs": {
    "name": "肋骨",
    "src": "assets/cards/ribs.png",
    "noteId": "ribs"
  },
  "sternum": {
    "name": "胸骨",
    "src": "assets/cards/sternum.png",
    "noteId": "sternum"
  },
  "humerus": {
    "name": "上腕骨",
    "src": "assets/cards/humerus.png",
    "noteId": "humerus"
  },
  "radius": {
    "name": "橈骨",
    "src": "assets/cards/radius.png",
    "noteId": "radius"
  },
  "ulna": {
    "name": "尺骨",
    "src": "assets/cards/ulna.png",
    "noteId": "ulna"
  },
  "carpals": {
    "name": "手根骨",
    "src": "assets/cards/carpals.png",
    "noteId": "carpals"
  },
  "metacarpals": {
    "name": "中手骨",
    "src": "assets/cards/metacarpals.png",
    "noteId": "metacarpals"
  },
  "hand_phalanges": {
    "name": "指骨（手）",
    "src": "assets/cards/hand_phalanges.png",
    "noteId": "hand_phalanges"
  },
  "pelvis": {
    "name": "骨盤",
    "src": "assets/cards/pelvis.png",
    "noteId": "pelvis"
  },
  "ilium": {
    "name": "腸骨",
    "src": "assets/cards/ilium.png",
    "noteId": "ilium"
  },
  "ischium": {
    "name": "坐骨",
    "src": "assets/cards/ischium.png",
    "noteId": "ischium"
  },
  "pubis": {
    "name": "恥骨",
    "src": "assets/cards/pubis.png",
    "noteId": "pubis"
  },
  "femur": {
    "name": "大腿骨",
    "src": "assets/cards/femur.png",
    "noteId": "femur"
  },
  "patella": {
    "name": "膝蓋骨",
    "src": "assets/cards/patella.png",
    "noteId": "patella"
  },
  "tibia": {
    "name": "脛骨",
    "src": "assets/cards/tibia.png",
    "noteId": "tibia"
  },
  "fibula": {
    "name": "腓骨",
    "src": "assets/cards/fibula.png",
    "noteId": "fibula"
  },
  "talus": {
    "name": "距骨",
    "src": "assets/cards/talus.png",
    "noteId": "talus"
  },
  "metatarsals": {
    "name": "中足骨",
    "src": "assets/cards/metatarsals.png",
    "noteId": "metatarsals"
  },
  "foot_phalanges": {
    "name": "趾骨（足）",
    "src": "assets/cards/foot_phalanges.png",
    "noteId": "foot_phalanges"
  },
  "parietal_bone": {
    "name": "頭頂骨",
    "src": "assets/cards/parietal_bone.png",
    "noteId": "parietal_bone"
  },
  "occipital_bone": {
    "name": "後頭骨",
    "src": "assets/cards/occipital_bone.png",
    "noteId": "occipital_bone"
  },
  "scapula": {
    "name": "肩甲骨",
    "src": "assets/cards/scapula.png",
    "noteId": "scapula"
  },
  "vertebral_column": {
    "name": "脊柱",
    "src": "assets/cards/vertebral_column.png",
    "noteId": "vertebral_column"
  },
  "cervical_vertebrae": {
    "name": "頸椎",
    "src": "assets/cards/cervical_vertebrae.png",
    "noteId": "cervical_vertebrae"
  },
  "thoracic_vertebrae": {
    "name": "胸椎",
    "src": "assets/cards/thoracic_vertebrae.png",
    "noteId": "thoracic_vertebrae"
  },
  "lumbar_vertebrae": {
    "name": "腰椎",
    "src": "assets/cards/lumbar_vertebrae.png",
    "noteId": "lumbar_vertebrae"
  },
  "sacrum": {
    "name": "仙骨",
    "src": "assets/cards/sacrum.png",
    "noteId": "sacrum"
  },
  "coccyx": {
    "name": "尾骨",
    "src": "assets/cards/coccyx.png",
    "noteId": "coccyx"
  },
  "calcaneus": {
    "name": "踵骨",
    "src": "assets/cards/calcaneus.png",
    "noteId": "calcaneus"
  },
  "spinal_cord": {
    "name": "脊髄",
    "src": "assets/cards/spinal_cord.png",
    "noteId": "spinal_cord"
  },
  "brachial_plexus": {
    "name": "腕神経叢",
    "src": "assets/cards/brachial_plexus.png",
    "noteId": "brachial_plexus"
  },
  "femoral_nerve": {
    "name": "大腿神経",
    "src": "assets/cards/femoral_nerve.png",
    "noteId": "femoral_nerve"
  },
  "tibial_nerve": {
    "name": "脛骨神経",
    "src": "assets/cards/tibial_nerve.png",
    "noteId": "tibial_nerve"
  },
  "median_nerve": {
    "name": "正中神経",
    "src": "assets/cards/median_nerve.png",
    "noteId": "median_nerve"
  },
  "aorta_main": {
    "name": "大動脈",
    "src": "assets/cards/aorta_main.png",
    "noteId": "aorta_main"
  },
  "carotid_artery": {
    "name": "頸動脈",
    "src": "assets/cards/carotid_artery.png",
    "noteId": "carotid_artery"
  },
  "femoral_artery": {
    "name": "大腿動脈",
    "src": "assets/cards/femoral_artery.png",
    "noteId": "femoral_artery"
  },
  "jugular_vein": {
    "name": "頸静脈",
    "src": "assets/cards/jugular_vein.png",
    "noteId": "jugular_vein"
  },
  "vena_cava": {
    "name": "大静脈",
    "src": "assets/cards/vena_cava.png",
    "noteId": "vena_cava"
  },
  "great_saphenous_vein": {
    "name": "大伏在静脈",
    "src": "assets/cards/great_saphenous_vein.png",
    "noteId": "great_saphenous_vein"
  },
  "cervical_lymph_nodes": {
    "name": "頸部リンパ節",
    "src": "assets/cards/cervical_lymph_nodes.png",
    "noteId": "cervical_lymph_nodes"
  },
  "axillary_lymph_nodes": {
    "name": "腋窩リンパ節",
    "src": "assets/cards/axillary_lymph_nodes.png",
    "noteId": "axillary_lymph_nodes"
  },
  "inguinal_lymph_nodes": {
    "name": "鼠径リンパ節",
    "src": "assets/cards/inguinal_lymph_nodes.png",
    "noteId": "inguinal_lymph_nodes"
  },
  "thoracic_duct": {
    "name": "胸管",
    "src": "assets/cards/thoracic_duct.png",
    "noteId": "thoracic_duct"
  },
  "dorsal_ramus": {
    "name": "脊髄神経後枝",
    "src": "assets/cards/dorsal_ramus.png",
    "noteId": "dorsal_ramus"
  },
  "radial_nerve": {
    "name": "橈骨神経",
    "src": "assets/cards/radial_nerve.png",
    "noteId": "radial_nerve"
  },
  "sciatic_nerve": {
    "name": "坐骨神経",
    "src": "assets/cards/sciatic_nerve.png",
    "noteId": "sciatic_nerve"
  },
  "occipital_artery": {
    "name": "後頭動脈",
    "src": "assets/cards/occipital_artery.png",
    "noteId": "occipital_artery"
  },
  "scapular_artery": {
    "name": "肩甲部の動脈",
    "src": "assets/cards/scapular_artery.png",
    "noteId": "scapular_artery"
  },
  "popliteal_artery": {
    "name": "膝窩動脈",
    "src": "assets/cards/popliteal_artery.png",
    "noteId": "popliteal_artery"
  },
  "posterior_tibial_artery": {
    "name": "後脛骨動脈",
    "src": "assets/cards/posterior_tibial_artery.png",
    "noteId": "posterior_tibial_artery"
  },
  "vertebral_vein": {
    "name": "椎骨静脈",
    "src": "assets/cards/vertebral_vein.png",
    "noteId": "vertebral_vein"
  },
  "popliteal_vein": {
    "name": "膝窩静脈",
    "src": "assets/cards/popliteal_vein.png",
    "noteId": "popliteal_vein"
  },
  "small_saphenous_vein": {
    "name": "小伏在静脈",
    "src": "assets/cards/small_saphenous_vein.png",
    "noteId": "small_saphenous_vein"
  },
  "posterior_cervical_nodes": {
    "name": "後頸部リンパ節",
    "src": "assets/cards/posterior_cervical_nodes.png",
    "noteId": "posterior_cervical_nodes"
  },
  "popliteal_lymph_nodes": {
    "name": "膝窩リンパ節",
    "src": "assets/cards/popliteal_lymph_nodes.png",
    "noteId": "popliteal_lymph_nodes"
  },
  "pituitary": {
    "name": "下垂体",
    "src": "assets/cards/pituitary.png",
    "noteId": "pituitary"
  },
  "pineal_gland": {
    "name": "松果体",
    "src": "assets/cards/pineal_gland.png",
    "noteId": "pineal_gland"
  },
  "salivary_glands": {
    "name": "唾液腺",
    "src": "assets/cards/salivary_glands.png",
    "noteId": "salivary_glands"
  },
  "tongue": {
    "name": "舌",
    "src": "assets/cards/tongue.png",
    "noteId": "tongue"
  },
  "parotid_gland": {
    "name": "耳下腺",
    "src": "assets/cards/parotid_gland.png",
    "noteId": "parotid_gland"
  },
  "submandibular_gland": {
    "name": "顎下腺",
    "src": "assets/cards/submandibular_gland.png",
    "noteId": "submandibular_gland"
  },
  "pharynx": {
    "name": "咽頭",
    "src": "assets/cards/pharynx.png",
    "noteId": "pharynx"
  },
  "larynx": {
    "name": "喉頭",
    "src": "assets/cards/larynx.png",
    "noteId": "larynx"
  },
  "thyroid": {
    "name": "甲状腺",
    "src": "assets/cards/thyroid.png",
    "noteId": "thyroid"
  },
  "parathyroid": {
    "name": "副甲状腺",
    "src": "assets/cards/parathyroid.png",
    "noteId": "parathyroid"
  },
  "trachea_outer": {
    "name": "気管",
    "src": "assets/cards/trachea_outer.png",
    "noteId": "trachea_outer"
  },
  "esophagus": {
    "name": "食道",
    "src": "assets/cards/esophagus.png",
    "noteId": "esophagus"
  },
  "thymus": {
    "name": "胸腺",
    "src": "assets/cards/thymus.png",
    "noteId": "thymus"
  },
  "mammary_gland": {
    "name": "乳腺",
    "src": "assets/cards/mammary_gland.png",
    "noteId": "mammary_gland"
  },
  "diaphragm": {
    "name": "横隔膜",
    "src": "assets/cards/diaphragm.png",
    "noteId": "diaphragm"
  },
  "liver": {
    "name": "肝臓",
    "src": "assets/cards/liver.png",
    "noteId": "liver"
  },
  "gallbladder": {
    "name": "胆のう",
    "src": "assets/cards/gallbladder.png",
    "noteId": "gallbladder"
  },
  "stomach": {
    "name": "胃",
    "src": "assets/cards/stomach.png",
    "noteId": "stomach"
  },
  "spleen": {
    "name": "脾臓",
    "src": "assets/cards/spleen.png",
    "noteId": "spleen"
  },
  "pancreas": {
    "name": "膵臓",
    "src": "assets/cards/pancreas.png",
    "noteId": "pancreas"
  },
  "adrenal_glands": {
    "name": "副腎",
    "src": "assets/cards/adrenal_glands.png",
    "noteId": "adrenal_glands"
  },
  "duodenum": {
    "name": "十二指腸",
    "src": "assets/cards/duodenum.png",
    "noteId": "duodenum"
  },
  "ureters_outer": {
    "name": "尿管",
    "src": "assets/cards/ureters_outer.png",
    "noteId": "ureters_outer"
  },
  "large_intestine": {
    "name": "大腸",
    "src": "assets/cards/large_intestine.png",
    "noteId": "large_intestine"
  },
  "small_intestine": {
    "name": "小腸",
    "src": "assets/cards/small_intestine.png",
    "noteId": "small_intestine"
  },
  "jejunum": {
    "name": "空腸",
    "src": "assets/cards/jejunum.png",
    "noteId": "jejunum"
  },
  "ileum": {
    "name": "回腸",
    "src": "assets/cards/ileum.png",
    "noteId": "ileum"
  },
  "cecum": {
    "name": "盲腸",
    "src": "assets/cards/cecum.png",
    "noteId": "cecum"
  },
  "ascending_colon": {
    "name": "上行結腸",
    "src": "assets/cards/ascending_colon.png",
    "noteId": "ascending_colon"
  },
  "transverse_colon": {
    "name": "横行結腸",
    "src": "assets/cards/transverse_colon.png",
    "noteId": "transverse_colon"
  },
  "descending_colon": {
    "name": "下行結腸",
    "src": "assets/cards/descending_colon.png",
    "noteId": "descending_colon"
  },
  "sigmoid_colon": {
    "name": "S状結腸",
    "src": "assets/cards/sigmoid_colon.png",
    "noteId": "sigmoid_colon"
  },
  "appendix": {
    "name": "虫垂",
    "src": "assets/cards/appendix.png",
    "noteId": "appendix"
  },
  "rectum": {
    "name": "直腸",
    "src": "assets/cards/rectum.png",
    "noteId": "rectum"
  },
  "urinary_bladder": {
    "name": "膀胱",
    "src": "assets/cards/urinary_bladder.png",
    "noteId": "urinary_bladder"
  },
  "prostate": {
    "name": "前立腺",
    "src": "assets/cards/prostate.png",
    "noteId": "prostate"
  },
  "testis": {
    "name": "精巣",
    "src": "assets/cards/testis.png",
    "noteId": "testis"
  },
  "ductus_deferens": {
    "name": "精管",
    "src": "assets/cards/ductus_deferens.png",
    "noteId": "ductus_deferens"
  },
  "uterus": {
    "name": "子宮",
    "src": "assets/cards/uterus.png",
    "noteId": "uterus"
  },
  "ovary": {
    "name": "卵巣",
    "src": "assets/cards/ovary.png",
    "noteId": "ovary"
  },
  "uterine_tube": {
    "name": "卵管",
    "src": "assets/cards/uterine_tube.png",
    "noteId": "uterine_tube"
  },
  "vagina": {
    "name": "腟",
    "src": "assets/cards/vagina.png",
    "noteId": "vagina"
  },
  "seminal_vesicle": {
    "name": "精嚢",
    "src": "assets/cards/seminal_vesicle.png",
    "noteId": "seminal_vesicle"
  },
  "urethra": {
    "name": "尿道",
    "src": "assets/cards/urethra.png",
    "noteId": "urethra"
  },
  "epididymis": {
    "name": "精巣上体",
    "src": "assets/cards/epididymis.png",
    "noteId": "epididymis"
  },
  "cervix": {
    "name": "子宮頸部",
    "src": "assets/cards/cervix.png",
    "noteId": "cervix"
  },
  "epidermis": {
    "name": "表皮",
    "src": "assets/cards/epidermis.png",
    "noteId": "epidermis"
  },
  "dermis": {
    "name": "真皮",
    "src": "assets/cards/dermis.png",
    "noteId": "dermis"
  },
  "subcutaneous_tissue": {
    "name": "皮下組織",
    "src": "assets/cards/subcutaneous_tissue.png",
    "noteId": "subcutaneous_tissue"
  },
  "hair_follicle": {
    "name": "毛包",
    "src": "assets/cards/hair_follicle.png",
    "noteId": "hair_follicle"
  },
  "sebaceous_gland": {
    "name": "皮脂腺",
    "src": "assets/cards/sebaceous_gland.png",
    "noteId": "sebaceous_gland"
  },
  "sweat_gland": {
    "name": "汗腺",
    "src": "assets/cards/sweat_gland.png",
    "noteId": "sweat_gland"
  },
  "sensory_nerve": {
    "name": "知覚神経",
    "src": "assets/cards/sensory_nerve.png",
    "noteId": "sensory_nerve"
  },
  "skin_blood_vessels": {
    "name": "皮膚の血管",
    "src": "assets/cards/skin_blood_vessels.png",
    "noteId": "skin_blood_vessels"
  },
  "frontal_lobe": {
    "name": "前頭葉",
    "src": "assets/cards/frontal_lobe.png",
    "noteId": "frontal_lobe"
  },
  "parietal_lobe": {
    "name": "頭頂葉",
    "src": "assets/cards/parietal_lobe.png",
    "noteId": "parietal_lobe"
  },
  "temporal_lobe": {
    "name": "側頭葉",
    "src": "assets/cards/temporal_lobe.png",
    "noteId": "temporal_lobe"
  },
  "cerebellum": {
    "name": "小脳",
    "src": "assets/cards/cerebellum.png",
    "noteId": "cerebellum"
  },
  "brainstem": {
    "name": "脳幹",
    "src": "assets/cards/brainstem.png",
    "noteId": "brainstem"
  },
  "cornea": {
    "name": "角膜",
    "src": "assets/cards/cornea.png",
    "noteId": "cornea"
  },
  "iris": {
    "name": "虹彩",
    "src": "assets/cards/iris.png",
    "noteId": "iris"
  },
  "lens": {
    "name": "水晶体",
    "src": "assets/cards/lens.png",
    "noteId": "lens"
  },
  "retina": {
    "name": "網膜",
    "src": "assets/cards/retina.png",
    "noteId": "retina"
  },
  "optic_nerve": {
    "name": "視神経",
    "src": "assets/cards/optic_nerve.png",
    "noteId": "optic_nerve"
  },
  "pinna": {
    "name": "耳介",
    "src": "assets/cards/pinna.png",
    "noteId": "pinna"
  },
  "ear_canal": {
    "name": "外耳道",
    "src": "assets/cards/ear_canal.png",
    "noteId": "ear_canal"
  },
  "eardrum": {
    "name": "鼓膜",
    "src": "assets/cards/eardrum.png",
    "noteId": "eardrum"
  },
  "ossicles": {
    "name": "耳小骨",
    "src": "assets/cards/ossicles.png",
    "noteId": "ossicles"
  },
  "cochlea": {
    "name": "蝸牛",
    "src": "assets/cards/cochlea.png",
    "noteId": "cochlea"
  },
  "right_atrium": {
    "name": "右心房",
    "src": "assets/cards/right_atrium.png",
    "noteId": "right_atrium"
  },
  "left_atrium": {
    "name": "左心房",
    "src": "assets/cards/left_atrium.png",
    "noteId": "left_atrium"
  },
  "right_ventricle": {
    "name": "右心室",
    "src": "assets/cards/right_ventricle.png",
    "noteId": "right_ventricle"
  },
  "left_ventricle": {
    "name": "左心室",
    "src": "assets/cards/left_ventricle.png",
    "noteId": "left_ventricle"
  },
  "aorta": {
    "name": "大動脈",
    "src": "assets/cards/aorta.png",
    "noteId": "aorta_main"
  },
  "trachea": {
    "name": "気管",
    "src": "assets/cards/trachea.png",
    "noteId": "trachea_outer"
  },
  "right_lung": {
    "name": "右肺",
    "src": "assets/cards/right_lung.png",
    "noteId": "right_lung"
  },
  "left_lung": {
    "name": "左肺",
    "src": "assets/cards/left_lung.png",
    "noteId": "left_lung"
  },
  "bronchus": {
    "name": "気管支",
    "src": "assets/cards/bronchus.png",
    "noteId": "bronchus"
  },
  "alveoli": {
    "name": "肺胞",
    "src": "assets/cards/alveoli.png",
    "noteId": "alveoli"
  },
  "renal_cortex": {
    "name": "腎皮質",
    "src": "assets/cards/renal_cortex.png",
    "noteId": "renal_cortex"
  },
  "renal_medulla": {
    "name": "腎髄質",
    "src": "assets/cards/renal_medulla.png",
    "noteId": "renal_medulla"
  },
  "renal_pelvis": {
    "name": "腎盂",
    "src": "assets/cards/renal_pelvis.png",
    "noteId": "renal_pelvis"
  },
  "ureter": {
    "name": "尿管",
    "src": "assets/cards/ureter.png",
    "noteId": "ureters_outer"
  }
};
