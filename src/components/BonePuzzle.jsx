import { useState, useCallback, useMemo, useEffect } from 'react';
import { getBonesByRegion, REGIONS } from '../data/bonesData';
import { useDragAndDrop, useTouchDragAndDrop } from '../hooks/useDragAndDrop';
import BoneItem from './BoneItem';
import DropZone from './DropZone';
import ScoreBoard from './ScoreBoard';
import ClinicalTip from './ClinicalTip';

// Zone definitions per region — maps boneId -> zone metadata
const ZONE_CONFIGS = {
  upper_limb: [
    { id: 'zone_clavicle', boneId: 'clavicle', boneName: '鎖骨', boneNameEn: 'Clavicle', position: '肩帶 / 上方', hint: '連接胸骨與肩胛骨的S形骨骼' },
    { id: 'zone_scapula', boneId: 'scapula', boneName: '肩胛骨', boneNameEn: 'Scapula', position: '肩帶 / 後方', hint: '後背的三角形扁平骨' },
    { id: 'zone_humerus', boneId: 'humerus', boneName: '肱骨', boneNameEn: 'Humerus', position: '上臂', hint: '上臂唯一的長骨' },
    { id: 'zone_radius', boneId: 'radius', boneName: '橈骨', boneNameEn: 'Radius', position: '前臂 / 外側（拇指側）', hint: '前臂拇指側的骨骼，Colles骨折常見' },
    { id: 'zone_ulna', boneId: 'ulna', boneName: '尺骨', boneNameEn: 'Ulna', position: '前臂 / 內側（小指側）', hint: '前臂小指側的骨骼，有鷹嘴突' },
    { id: 'zone_carpal', boneId: 'carpal', boneName: '腕骨', boneNameEn: 'Carpal Bones', position: '手腕', hint: '由8塊小骨組成的腕關節群' },
    { id: 'zone_metacarpal', boneId: 'metacarpal', boneName: '掌骨', boneNameEn: 'Metacarpals', position: '手掌', hint: '連接腕骨與指骨的5根骨骼' },
  ],
  lower_limb: [
    { id: 'zone_ilium', boneId: 'ilium', boneName: '髂骨', boneNameEn: 'Ilium', position: '骨盆 / 上外方', hint: '骨盆最大的骨骼，構成骨盆翼' },
    { id: 'zone_pubis', boneId: 'pubis', boneName: '恥骨', boneNameEn: 'Pubis', position: '骨盆 / 前下方', hint: '骨盆前方，兩側由恥骨聯合連接' },
    { id: 'zone_ischium', boneId: 'ischium', boneName: '坐骨', boneNameEn: 'Ischium', position: '骨盆 / 後下方', hint: '坐姿時的承重點' },
    { id: 'zone_femur', boneId: 'femur', boneName: '股骨', boneNameEn: 'Femur', position: '大腿', hint: '人體最長最強壯的骨骼' },
    { id: 'zone_patella', boneId: 'patella', boneName: '髕骨', boneNameEn: 'Patella', position: '膝蓋', hint: '人體最大的種子骨，保護膝關節' },
    { id: 'zone_tibia', boneId: 'tibia', boneName: '脛骨', boneNameEn: 'Tibia', position: '小腿 / 內側（承重）', hint: '小腿主要承重骨，IO注射常用部位' },
    { id: 'zone_fibula', boneId: 'fibula', boneName: '腓骨', boneNameEn: 'Fibula', position: '小腿 / 外側', hint: '小腿外側細長骨，外踝骨折常見' },
    { id: 'zone_talus', boneId: 'talus', boneName: '距骨', boneNameEn: 'Talus', position: '踝關節', hint: '連接小腿與足部的踝關節主骨' },
    { id: 'zone_calcaneus', boneId: 'calcaneus', boneName: '跟骨', boneNameEn: 'Calcaneus', position: '足跟', hint: '足部最大骨骼，高墜傷常骨折' },
  ],
  thorax: [
    { id: 'zone_sternum', boneId: 'sternum', boneName: '胸骨', boneNameEn: 'Sternum', position: '胸廓 / 前中央', hint: '胸廓前方中央的扁平骨，CPR按壓位置' },
    { id: 'zone_rib_1_7', boneId: 'rib_1_7', boneName: '第1-7肋骨（真肋）', boneNameEn: 'Ribs 1-7 (True)', position: '胸廓 / 上段肋骨', hint: '直接連接胸骨的7對肋骨' },
    { id: 'zone_rib_8_12', boneId: 'rib_8_12', boneName: '第8-12肋骨（假肋/浮肋）', boneNameEn: 'Ribs 8-12 (False/Floating)', position: '胸廓 / 下段肋骨', hint: '間接連接或游離的下段肋骨' },
    { id: 'zone_thoracic_vertebrae', boneId: 'thoracic_vertebrae', boneName: '胸椎（T1-T12）', boneNameEn: 'Thoracic Vertebrae', position: '胸廓 / 後方脊椎', hint: '12節胸椎構成胸廓後壁' },
    { id: 'zone_clavicle_thorax', boneId: 'clavicle_thorax', boneName: '鎖骨（胸廓端）', boneNameEn: 'Clavicle (Medial)', position: '胸廓 / 上方兩側', hint: '鎖骨與胸骨柄形成胸鎖關節' },
    { id: 'zone_scapula_thorax', boneId: 'scapula_thorax', boneName: '肩胛骨（胸廓面）', boneNameEn: 'Scapula (Posterior)', position: '胸廓 / 後外側', hint: '緊貼胸廓後外側的三角形骨骼' },
  ],
};

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function BonePuzzle({ region, mode, gameState, onScoreChange, onComplete }) {
  const bones = useMemo(() => getBonesByRegion(region), [region]);
  const zones = useMemo(() => ZONE_CONFIGS[region] || [], [region]);
  const regionInfo = REGIONS[region];

  // Game state
  const [shuffledBones, setShuffledBones] = useState([]);
  const [correctPlacements, setCorrectPlacements] = useState({}); // zoneId -> boneId
  const [incorrectZone, setIncorrectZone] = useState(null); // flash red
  const [tipBone, setTipBone] = useState(null);
  const [attempts, setAttempts] = useState(0);

  const score = Object.keys(correctPlacements).length;
  const total = zones.length;

  // Initialize / reset when game starts
  useEffect(() => {
    if (gameState === 'playing') {
      setShuffledBones(shuffleArray(bones));
      setCorrectPlacements({});
      setIncorrectZone(null);
      setAttempts(0);
    }
  }, [gameState, bones, region]);

  // Report score changes
  useEffect(() => {
    onScoreChange?.(score, total);
  }, [score, total, onScoreChange]);

  // Check completion
  useEffect(() => {
    if (gameState === 'playing' && score === total && total > 0) {
      setTimeout(() => onComplete?.(), 400);
    }
  }, [score, total, gameState, onComplete]);

  // Clear incorrect flash
  useEffect(() => {
    if (incorrectZone) {
      const t = setTimeout(() => setIncorrectZone(null), 600);
      return () => clearTimeout(t);
    }
  }, [incorrectZone]);

  const handleDrop = useCallback((boneId, zoneId) => {
    if (gameState !== 'playing') return;
    const zone = zones.find(z => z.id === zoneId);
    if (!zone) return;
    if (correctPlacements[zoneId]) return; // already correct

    setAttempts(a => a + 1);

    if (zone.boneId === boneId) {
      setCorrectPlacements(prev => ({ ...prev, [zoneId]: boneId }));
    } else {
      setIncorrectZone(zoneId);
    }
  }, [gameState, zones, correctPlacements]);

  const { draggingId, dragOverZone, handleDragStart, handleDragEnd, handleDragOver, handleDragLeave, handleDrop: dndDrop } = useDragAndDrop(handleDrop);
  const { draggingId: touchDraggingId, dragOverZone: touchDragOverZone, handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchDragAndDrop(handleDrop);

  const effectiveDraggingId = draggingId || touchDraggingId;
  const effectiveDragOver = dragOverZone || touchDragOverZone;

  const correctBoneIds = new Set(Object.values(correctPlacements));
  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;

  if (gameState === 'idle') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">{regionInfo?.icon || '🦴'}</div>
        <h2 className="text-2xl font-bold text-white mb-2">骨骼拼圖練習</h2>
        <p className="text-slate-400 max-w-sm">
          選擇部位和遊戲模式後，點擊「開始遊戲」開始練習。
        </p>
      </div>
    );
  }

  if (gameState === 'finished') {
    const perfect = score === total;
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center fade-in">
        <div className="text-7xl mb-4">{perfect ? '🏆' : score >= total * 0.8 ? '🎉' : '💪'}</div>
        <h2 className="text-3xl font-bold text-white mb-2">
          {perfect ? '完美！' : score >= total * 0.8 ? '答得不錯！' : '繼續加油！'}
        </h2>
        <div className="text-slate-400 mb-6">
          {regionInfo?.name} — {mode === 'exam' ? '考試模式' : '學習模式'}
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4">
            <div className="text-3xl font-bold text-white">{score}/{total}</div>
            <div className="text-xs text-slate-400 mt-1">正確答案</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4">
            <div className="text-3xl font-bold text-white">{attempts}</div>
            <div className="text-xs text-slate-400 mt-1">總嘗試次數</div>
          </div>
          <div className={`bg-slate-800 border rounded-2xl p-4 ${accuracy >= 80 ? 'border-emerald-700' : accuracy >= 60 ? 'border-yellow-700' : 'border-red-700'}`}>
            <div className={`text-3xl font-bold ${accuracy >= 80 ? 'text-emerald-400' : accuracy >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
              {accuracy}%
            </div>
            <div className="text-xs text-slate-400 mt-1">答題準確率</div>
          </div>
        </div>
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl px-5 py-3 text-sm text-slate-400">
          {perfect
            ? '太厲害了！所有骨骼都放對位置了！'
            : `共答對 ${score} 題，錯誤 ${attempts - score} 次。`
          }
        </div>
      </div>
    );
  }

  return (
    <div
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="space-y-4"
    >
      {/* Score */}
      <ScoreBoard
        score={score}
        total={total}
        timeLeft={mode === 'exam' ? 180 : 0}
        mode={mode}
        isActive={gameState === 'playing'}
        onTimeUp={onComplete}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bone tray */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{regionInfo?.icon}</span>
            <h3 className="text-sm font-semibold text-slate-300">
              骨骼列表 — {regionInfo?.name}
            </h3>
            <span className="ml-auto text-xs text-slate-500">
              拖曳至右側對應位置
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {shuffledBones.map(bone => (
              <BoneItem
                key={bone.id}
                bone={bone}
                isDragging={effectiveDraggingId === bone.id}
                isPlaced={correctBoneIds.has(bone.id)}
                isCorrect={correctBoneIds.has(bone.id)}
                showName={mode === 'learn'}
                mode={mode}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onTouchStart={handleTouchStart}
                onInfoClick={setTipBone}
              />
            ))}
          </div>
        </div>

        {/* Drop zones */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🎯</span>
            <h3 className="text-sm font-semibold text-slate-300">
              解剖位置
            </h3>
            <span className="ml-auto text-xs text-slate-500">
              {score}/{total} 完成
            </span>
          </div>
          <div className="space-y-2">
            {zones.map(zone => {
              const placedBoneId = correctPlacements[zone.id];
              const placedBone = placedBoneId ? bones.find(b => b.id === placedBoneId) : null;
              return (
                <DropZone
                  key={zone.id}
                  zone={zone}
                  isCorrect={!!correctPlacements[zone.id]}
                  isIncorrect={incorrectZone === zone.id}
                  isDragOver={effectiveDragOver === zone.id && !correctPlacements[zone.id]}
                  placedBone={placedBone}
                  mode={mode}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={dndDrop}
                  onInfoClick={setTipBone}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Clinical tip modal */}
      {tipBone && (
        <ClinicalTip bone={tipBone} onClose={() => setTipBone(null)} />
      )}
    </div>
  );
}
