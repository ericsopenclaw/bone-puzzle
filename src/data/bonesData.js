// SVG path data for each bone (viewBox="0 0 100 100" coordinate system)
export const BONE_SVGS = {
  // ===== UPPER LIMB =====
  clavicle: {
    viewBox: '0 0 100 40',
    path: 'M10,25 Q30,10 50,18 Q70,10 90,25 Q70,30 50,22 Q30,30 10,25Z',
    color: '#f5f0e8',
    label: 'Clavicle',
  },
  scapula: {
    viewBox: '0 0 80 90',
    path: 'M40,5 L65,20 L60,55 L55,85 L40,80 L25,85 L20,55 L15,20 Z',
    color: '#f0ebe3',
    label: 'Scapula',
  },
  humerus: {
    viewBox: '0 0 40 120',
    path: 'M12,5 Q20,3 28,5 L30,50 Q32,70 28,90 L25,110 Q20,120 15,110 L12,90 Q8,70 10,50 Z',
    color: '#faf8f5',
    label: 'Humerus',
  },
  radius: {
    viewBox: '0 0 30 120',
    path: 'M8,5 Q15,3 22,5 L24,55 Q26,75 22,95 L20,110 Q15,118 10,110 L8,95 Q4,75 6,55 Z',
    color: '#f8f4ef',
    label: 'Radius',
  },
  ulna: {
    viewBox: '0 0 30 120',
    path: 'M8,5 Q15,3 22,5 L24,55 Q26,75 24,95 L22,110 Q18,120 14,110 L12,95 Q10,75 8,55 Z M14,3 L16,15 L14,18 Z',
    color: '#f6f2ed',
    label: 'Ulna',
  },
  carpal: {
    viewBox: '0 0 80 50',
    path: 'M5,20 Q10,10 20,15 L30,12 Q40,8 50,15 L60,12 Q70,10 75,20 L70,35 Q60,42 50,38 L40,42 Q30,45 20,38 L10,35 Z',
    color: '#f0ebe3',
    label: 'Carpals',
  },
  metacarpal: {
    viewBox: '0 0 20 80',
    path: 'M5,5 Q10,3 15,5 L16,30 Q17,50 15,65 L13,75 Q10,80 7,75 L5,65 Q3,50 4,30 Z',
    color: '#f8f4ef',
    label: 'Metacarpal',
  },

  // ===== LOWER LIMB =====
  ilium: {
    viewBox: '0 0 100 90',
    path: 'M50,5 Q80,5 90,30 Q95,50 85,65 L75,80 L50,85 L25,80 L15,65 Q5,50 10,30 Q20,5 50,5Z',
    color: '#f5f0e8',
    label: 'Ilium',
  },
  pubis: {
    viewBox: '0 0 100 50',
    path: 'M10,10 Q30,5 50,10 Q70,5 90,10 L88,30 Q70,40 50,35 Q30,40 12,30 Z',
    color: '#f0ebe3',
    label: 'Pubis',
  },
  ischium: {
    viewBox: '0 0 80 70',
    path: 'M15,5 Q40,2 65,5 L60,30 Q65,50 55,65 L40,68 L25,65 Q15,50 20,30 Z',
    color: '#f8f4ef',
    label: 'Ischium',
  },
  femur: {
    viewBox: '0 0 45 140',
    path: 'M15,5 Q22,2 30,5 L33,60 Q35,80 32,105 L28,125 Q22,138 15,125 L12,105 Q8,80 10,60 Z M15,5 Q22,0 30,5 Q22,8 15,5Z',
    color: '#faf8f5',
    label: 'Femur',
  },
  patella: {
    viewBox: '0 0 50 60',
    path: 'M25,5 Q40,8 42,25 Q44,40 35,52 Q25,60 15,52 Q6,40 8,25 Q10,8 25,5Z',
    color: '#f5f0e8',
    label: 'Patella',
  },
  tibia: {
    viewBox: '0 0 35 140',
    path: 'M10,5 Q17,2 25,5 L28,55 Q30,75 28,100 L25,125 Q18,138 12,125 L10,100 Q8,75 9,55 Z',
    color: '#f8f4ef',
    label: 'Tibia',
  },
  fibula: {
    viewBox: '0 0 20 140',
    path: 'M5,5 Q10,2 15,5 L16,55 Q17,75 16,100 L14,125 Q10,138 6,125 L5,100 Q4,75 4,55 Z',
    color: '#f0ebe3',
    label: 'Fibula',
  },
  talus: {
    viewBox: '0 0 60 40',
    path: 'M10,20 Q15,8 30,10 Q45,8 50,20 Q52,30 45,35 Q30,38 15,35 Q8,30 10,20Z',
    color: '#f5f0e8',
    label: 'Talus',
  },
  calcaneus: {
    viewBox: '0 0 60 70',
    path: 'M15,5 Q30,2 45,5 L48,30 Q50,50 45,62 Q30,70 15,62 Q10,50 12,30 Z',
    color: '#f0ebe3',
    label: 'Calcaneus',
  },

  // ===== THORAX =====
  sternum: {
    viewBox: '0 0 40 100',
    path: 'M12,5 Q20,3 28,5 L27,25 L25,40 L24,60 L23,80 L20,95 Q15,100 12,95 L13,80 L14,60 L15,40 L13,25 Z',
    color: '#faf8f5',
    label: 'Sternum',
  },
  rib_1_7: {
    viewBox: '0 0 120 60',
    path: 'M60,55 Q10,45 5,30 Q2,20 8,12 Q20,5 40,8 Q55,10 60,15 Q65,10 80,8 Q100,5 112,12 Q118,20 115,30 Q110,45 60,55Z M60,55 Q40,50 30,45 Q20,42 15,38 Q12,34 15,30 Q22,26 35,28 Q50,30 60,32 Q70,30 85,28 Q98,26 105,30 Q108,34 105,38 Q100,42 90,45 Q80,50 60,55Z',
    color: '#f5f0e8',
    label: 'Ribs 1-7',
  },
  rib_8_12: {
    viewBox: '0 0 120 70',
    path: 'M60,65 Q10,55 5,35 Q2,22 8,12 Q20,4 40,8 Q55,11 60,18 Q65,11 80,8 Q100,4 112,12 Q118,22 115,35 Q110,55 60,65Z M60,65 Q40,60 28,54 Q18,50 12,45 Q8,40 12,35 Q20,30 35,32 Q50,34 60,36 Q70,34 85,32 Q100,30 108,35 Q112,40 108,45 Q102,50 92,54 Q80,60 60,65Z',
    color: '#f0ebe3',
    label: 'Ribs 8-12',
  },
  thoracic_vertebrae: {
    viewBox: '0 0 60 100',
    path: 'M25,5 L35,5 L38,12 L40,18 L38,22 L40,28 L38,32 L40,38 L38,42 L40,48 L38,52 L40,58 L38,62 L40,68 L38,72 L40,78 L38,82 L40,88 L38,92 L35,98 L25,98 L22,92 L24,88 L22,82 L24,78 L22,72 L24,68 L22,62 L24,58 L22,52 L24,48 L22,42 L24,38 L22,32 L24,28 L22,22 L24,18 L22,12 Z',
    color: '#f8f4ef',
    label: 'Thoracic Vertebrae',
  },
  clavicle_thorax: {
    viewBox: '0 0 100 40',
    path: 'M10,25 Q30,10 50,18 Q70,10 90,25 Q70,30 50,22 Q30,30 10,25Z',
    color: '#f5f0e8',
    label: 'Clavicle (Medial)',
  },
  scapula_thorax: {
    viewBox: '0 0 80 90',
    path: 'M40,5 L65,20 L60,55 L55,85 L40,80 L25,85 L20,55 L15,20 Z',
    color: '#f0ebe3',
    label: 'Scapula (Posterior)',
  },
};

export const REGIONS = {
  upper_limb: {
    id: 'upper_limb',
    name: '上肢',
    nameEn: 'Upper Limb',
    description: '包含肩帶、上臂、前臂及手部骨骼',
    icon: '💪',
    color: 'blue',
  },
  lower_limb: {
    id: 'lower_limb',
    name: '下肢',
    nameEn: 'Lower Limb',
    description: '包含骨盆帶、大腿、小腿及足部骨骼',
    icon: '🦵',
    color: 'green',
  },
  thorax: {
    id: 'thorax',
    name: '胸廓',
    nameEn: 'Thorax',
    description: '包含胸骨、肋骨及胸椎骨骼',
    icon: '🫁',
    color: 'purple',
  },
};

export const BONES = {
  // ===== UPPER LIMB =====
  upper_limb: [
    {
      id: 'clavicle',
      name: '鎖骨',
      nameEn: 'Clavicle',
      region: 'upper_limb',
      category: '肩帶',
      svgKey: 'clavicle',
      description: '連接胸骨與肩胛骨的S形骨骼，是肩帶的一部分。',
      clinicalTip: {
        fractures: '最常見的骨折骨骼之一，通常發生於跌倒時伸手撐地或直接撞擊。',
        assessment: '評估時注意鎖骨上方有無變形、壓痛及異常活動。',
        emtNote: '鎖骨骨折可能合併鎖骨下動靜脈或臂神經叢損傷，需評估遠端神經血管狀態。',
      },
    },
    {
      id: 'scapula',
      name: '肩胛骨',
      nameEn: 'Scapula',
      region: 'upper_limb',
      category: '肩帶',
      svgKey: 'scapula',
      description: '位於後背上方的三角形扁平骨，與鎖骨及肱骨形成肩關節。',
      clinicalTip: {
        fractures: '肩胛骨骨折需極大外力，常合併肺挫傷、血胸、臂神經叢損傷。',
        assessment: '肩胛骨骨折是高能量創傷標誌，應高度懷疑合併傷。',
        emtNote: '肩胛骨骨折患者死亡率高，需優先評估呼吸道與呼吸狀態。',
      },
    },
    {
      id: 'humerus',
      name: '肱骨',
      nameEn: 'Humerus',
      region: 'upper_limb',
      category: '上臂',
      svgKey: 'humerus',
      description: '上臂的長骨，上端與肩胛骨形成肩關節，下端與橈尺骨形成肘關節。',
      clinicalTip: {
        fractures: '肱骨幹骨折常合併橈神經損傷（腕下垂），近端骨折常見於老年人。',
        assessment: '評估橈神經功能：拇指伸展、手腕背屈。',
        emtNote: '肱骨中段骨折橈神經損傷率達18%，應詳細記錄神經學狀態。',
      },
    },
    {
      id: 'radius',
      name: '橈骨',
      nameEn: 'Radius',
      region: 'upper_limb',
      category: '前臂',
      svgKey: 'radius',
      description: '前臂外側（拇指側）的長骨，參與腕關節及肘關節。',
      clinicalTip: {
        fractures: 'Colles骨折（遠端橈骨骨折）是最常見的骨折，常因跌倒伸手撐地引起。',
        assessment: '檢查腕部「餐叉狀」變形、壓痛、橈動脈脈搏。',
        emtNote: '前臂雙骨折可能伴有骨筋膜室症候群，注意5P症狀。',
      },
    },
    {
      id: 'ulna',
      name: '尺骨',
      nameEn: 'Ulna',
      region: 'upper_limb',
      category: '前臂',
      svgKey: 'ulna',
      description: '前臂內側（小指側）的長骨，尺骨鷹嘴突為肘關節重要結構。',
      clinicalTip: {
        fractures: '尺骨鷹嘴突骨折常因直接撞擊；Nightstick骨折為防禦性骨折。',
        assessment: '評估三頭肌功能（肘關節伸展）及尺神經感覺（無名指、小指）。',
        emtNote: '孟氏骨折（尺骨骨折合併橈骨頭脫位）容易漏診，需X光確認。',
      },
    },
    {
      id: 'carpal',
      name: '腕骨',
      nameEn: 'Carpal Bones',
      region: 'upper_limb',
      category: '手部',
      svgKey: 'carpal',
      description: '由8塊小骨組成的腕關節，排列為近端列和遠端列。',
      clinicalTip: {
        fractures: '舟狀骨是最常見的腕骨骨折，初期X光可能陰性但仍有骨折。',
        assessment: '解剖鼻咽窩壓痛高度懷疑舟狀骨骨折。',
        emtNote: '舟狀骨骨折若未治療可能造成缺血性壞死，需固定並轉診。',
      },
    },
    {
      id: 'metacarpal',
      name: '掌骨',
      nameEn: 'Metacarpals',
      region: 'upper_limb',
      category: '手部',
      svgKey: 'metacarpal',
      description: '5根連接腕骨與指骨的骨骼，形成手掌的骨架。',
      clinicalTip: {
        fractures: '拳擊手骨折（第5掌骨頸骨折）常見於拳擊傷害。',
        assessment: '注意指骨旋轉排列，握拳時各指應指向舟狀骨方向。',
        emtNote: '開放性掌骨骨折（打架咬傷）感染風險極高，需抗生素治療。',
      },
    },
  ],

  // ===== LOWER LIMB =====
  lower_limb: [
    {
      id: 'ilium',
      name: '髂骨',
      nameEn: 'Ilium',
      region: 'lower_limb',
      category: '骨盆',
      svgKey: 'ilium',
      description: '骨盆最大的骨骼，構成骨盆外上方的扇形翼狀結構。',
      clinicalTip: {
        fractures: '骨盆骨折可造成大量出血（最多3-4公升），是潛在致命傷。',
        assessment: '骨盆擠壓試驗：僅進行一次，避免加劇出血。',
        emtNote: '不穩定骨盆骨折需使用骨盆固定帶（TPOD/SAM sling）穩定骨折端。',
      },
    },
    {
      id: 'pubis',
      name: '恥骨',
      nameEn: 'Pubis',
      region: 'lower_limb',
      category: '骨盆',
      svgKey: 'pubis',
      description: '位於骨盆前下方，兩側恥骨在中線由恥骨聯合相連。',
      clinicalTip: {
        fractures: '恥骨骨折常合併泌尿道（尿道、膀胱）損傷。',
        assessment: '評估會陰部瘀血、尿道口出血、血尿，提示泌尿道損傷。',
        emtNote: '懷疑泌尿道損傷勿強行置入導尿管，應轉診泌尿科評估。',
      },
    },
    {
      id: 'ischium',
      name: '坐骨',
      nameEn: 'Ischium',
      region: 'lower_limb',
      category: '骨盆',
      svgKey: 'ischium',
      description: '位於骨盆後下方，坐骨粗隆為坐姿時的承重點。',
      clinicalTip: {
        fractures: '坐骨骨折常見於高能量創傷，常合併骨盆環破裂。',
        assessment: '注意臀部及大腿後側瘀血，可能提示坐骨神經損傷。',
        emtNote: '坐骨神經損傷可造成足下垂，院前述錄神經學基準值極重要。',
      },
    },
    {
      id: 'femur',
      name: '股骨',
      nameEn: 'Femur',
      region: 'lower_limb',
      category: '大腿',
      svgKey: 'femur',
      description: '人體最長最強壯的骨骼，連接骨盆與膝關節。',
      clinicalTip: {
        fractures: '股骨骨折可失血1-2公升，造成低血容積休克。',
        assessment: '注意大腿腫脹、縮短、外旋畸形；評估股動脈脈搏及遠端灌流。',
        emtNote: '使用牽引夾板（Hare/Sager）可減少出血、緩解疼痛，但開放骨折禁用。',
      },
    },
    {
      id: 'patella',
      name: '髕骨',
      nameEn: 'Patella',
      region: 'lower_limb',
      category: '膝部',
      svgKey: 'patella',
      description: '人體最大的種子骨，包埋於股四頭肌腱中，保護膝關節前方。',
      clinicalTip: {
        fractures: '直接撞擊（儀表板傷）或突然肌肉收縮均可造成髕骨骨折或脫位。',
        assessment: '評估膝關節積血、無法主動伸直膝關節（四頭肌功能）。',
        emtNote: '髕骨骨折合併積血時，膝關節劇烈疼痛腫脹，需固定於伸直位。',
      },
    },
    {
      id: 'tibia',
      name: '脛骨',
      nameEn: 'Tibia',
      region: 'lower_limb',
      category: '小腿',
      svgKey: 'tibia',
      description: '小腿主要承重骨，內側脛骨嵴於皮下可觸及，形成脛骨前嵴。',
      clinicalTip: {
        fractures: '脛骨是開放性骨折最常見的部位，因皮下組織薄。',
        assessment: '評估足背動脈與脛後動脈脈搏；注意骨筋膜室症候群。',
        emtNote: '脛骨IO（骨髓內）注射穿刺點位於脛骨粗隆下2-3cm內側面。',
      },
    },
    {
      id: 'fibula',
      name: '腓骨',
      nameEn: 'Fibula',
      region: 'lower_limb',
      category: '小腿',
      svgKey: 'fibula',
      description: '小腿外側細長骨，主要功能為肌肉附著，參與踝關節穩定。',
      clinicalTip: {
        fractures: '外踝（腓骨遠端）骨折是最常見的踝關節骨折。',
        assessment: '擠壓試驗陽性（膝下腓骨頭壓痛）可能提示高位腓骨骨折。',
        emtNote: '腓骨頭骨折可傷及腓總神經，造成足下垂，需評估踝關節背屈。',
      },
    },
    {
      id: 'talus',
      name: '距骨',
      nameEn: 'Talus',
      region: 'lower_limb',
      category: '足部',
      svgKey: 'talus',
      description: '足部上方骨骼，連接小腿與足部，是踝關節的主要構成骨。',
      clinicalTip: {
        fractures: '距骨骨折常見於高處墜落，缺血性壞死發生率高達75%。',
        assessment: '踝關節前方壓痛及活動受限，評估足背動脈。',
        emtNote: '距骨脫位是急症，需快速評估並轉送，避免神經血管壓迫。',
      },
    },
    {
      id: 'calcaneus',
      name: '跟骨',
      nameEn: 'Calcaneus',
      region: 'lower_limb',
      category: '足部',
      svgKey: 'calcaneus',
      description: '足部最大骨骼，形成足跟，承受行走和跑步的衝擊力。',
      clinicalTip: {
        fractures: '跟骨骨折常見於高處墜落，60%合併脊椎骨折，應評估脊椎。',
        assessment: '足跟壓痛、腫脹及「煎鍋」型變形（跟骨壓縮）。',
        emtNote: '跟骨骨折+脊椎骨折組合常見，高墜傷患者須常規評估脊椎。',
      },
    },
  ],

  // ===== THORAX =====
  thorax: [
    {
      id: 'sternum',
      name: '胸骨',
      nameEn: 'Sternum',
      region: 'thorax',
      category: '中軸',
      svgKey: 'sternum',
      description: '胸廓前方中央的扁平骨，由胸骨柄、胸骨體和劍突三部分組成。',
      clinicalTip: {
        fractures: '胸骨骨折是高能量創傷，需排除心臟挫傷（心肌挫傷）。',
        assessment: '胸骨壓痛合併心律不整、ST變化，高度懷疑心肌挫傷。',
        emtNote: '劍突是CPR胸外按壓的定位參考點，也是腹部壓迫的上界。',
      },
    },
    {
      id: 'rib_1_7',
      name: '第1-7肋骨（真肋）',
      nameEn: 'Ribs 1-7 (True)',
      region: 'thorax',
      category: '肋骨',
      svgKey: 'rib_1_7',
      description: '直接以肋軟骨連接胸骨的肋骨，稱為真肋，共7對。',
      clinicalTip: {
        fractures: '第1-2肋骨骨折代表極大外力，需排除大血管損傷及臂神經叢損傷。',
        assessment: '觸診肋骨全長，注意捻髮音、連枷胸（3根以上連續骨折）。',
        emtNote: '連枷胸（Flail Chest）造成矛盾呼吸，嚴重影響通氣，需正壓通氣支持。',
      },
    },
    {
      id: 'rib_8_12',
      name: '第8-12肋骨（假肋/浮肋）',
      nameEn: 'Ribs 8-12 (False/Floating)',
      region: 'thorax',
      category: '肋骨',
      svgKey: 'rib_8_12',
      description: '第8-10肋間接連接胸骨（假肋），第11-12肋前端游離（浮肋）。',
      clinicalTip: {
        fractures: '下肋骨折（第9-11）可合併肝脾腎損傷，尤其左側第9-11肋。',
        assessment: '下肋壓痛合併腹痛、腹肌緊張，需懷疑腹腔臟器損傷。',
        emtNote: '右下肋骨折→肝臟損傷；左下肋骨折→脾臟損傷，須高度警惕。',
      },
    },
    {
      id: 'thoracic_vertebrae',
      name: '胸椎（T1-T12）',
      nameEn: 'Thoracic Vertebrae',
      region: 'thorax',
      category: '脊椎',
      svgKey: 'thoracic_vertebrae',
      description: '12節胸椎構成胸廓後壁，每節胸椎各與一對肋骨相關節。',
      clinicalTip: {
        fractures: '胸椎骨折常發生於T4-T9（過渡區）及T12-L1（胸腰椎交界）。',
        assessment: '背部中線壓痛、叩痛、神經學缺損（下肢麻木、無力）。',
        emtNote: '胸椎骨折合併脊髓損傷可造成截癱（T1以下），需嚴格脊椎保護。',
      },
    },
    {
      id: 'clavicle_thorax',
      name: '鎖骨（胸廓端）',
      nameEn: 'Clavicle (Medial)',
      region: 'thorax',
      category: '肩帶',
      svgKey: 'clavicle_thorax',
      description: '鎖骨內側端與胸骨柄形成胸鎖關節，是上肢唯一與軀幹的直接骨性連接。',
      clinicalTip: {
        fractures: '胸鎖關節脫位（後方脫位）可壓迫氣管、食道及大血管，是急症。',
        assessment: '頸根部不對稱、吞嚥困難、呼吸窘迫，需懷疑後方胸鎖脫位。',
        emtNote: '後方胸鎖脫位是外科急症，可能需緊急復位解除氣道壓迫。',
      },
    },
    {
      id: 'scapula_thorax',
      name: '肩胛骨（胸廓面）',
      nameEn: 'Scapula (Posterior Thorax)',
      region: 'thorax',
      category: '肩帶',
      svgKey: 'scapula_thorax',
      description: '肩胛骨緊貼胸廓後外側，與胸廓之間由肌肉懸吊，形成肩胛胸廓關節。',
      clinicalTip: {
        fractures: '肩胛骨骨折需強大外力，常合併氣胸、血胸、肺挫傷。',
        assessment: '後背疼痛合併呼吸窘迫，聽診呼吸音不對稱，排除氣血胸。',
        emtNote: '肩胛骨骨折死亡率約14%，主要死因為合併傷，非骨折本身。',
      },
    },
  ],
};

// Flatten all bones for easy access
export const ALL_BONES = Object.values(BONES).flat();

export const getBoneById = (id) => ALL_BONES.find(b => b.id === id);

export const getBonesByRegion = (regionId) => BONES[regionId] || [];

export const DIFFICULTY_LEVELS = {
  easy: { name: '簡單', timeLimit: 0, hints: true, showNames: true },
  medium: { name: '中等', timeLimit: 300, hints: true, showNames: false },
  hard: { name: '困難', timeLimit: 180, hints: false, showNames: false },
};
