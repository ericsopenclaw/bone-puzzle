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
      description: '位於骨盆後下方，坐骨粗隆為坐姿時的承重點。',
      clinicalTip: {
        fractures: '坐骨骨折常見於高能量創傷，常合併骨盆環破裂。',
        assessment: '注意臀部及大腿後側瘀血，可能提示坐骨神經損傷。',
        emtNote: '坐骨神經損傷可造成足下垂，院前記錄神經學基準值極重要。',
      },
    },
    {
      id: 'femur',
      name: '股骨',
      nameEn: 'Femur',
      region: 'lower_limb',
      category: '大腿',
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
