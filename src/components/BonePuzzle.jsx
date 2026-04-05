import { useState, useCallback, useMemo, useEffect } from 'react';
import { getBonesByRegion, REGIONS } from '../data/bonesData';
import { useDragAndDrop, useTouchDragAndDrop } from '../hooks/useDragAndDrop';
import BoneItem from './BoneItem';
import SkeletonOutline from './SkeletonOutline';
import ScoreBoard from './ScoreBoard';
import ClinicalTip from './ClinicalTip';

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
  const regionInfo = REGIONS[region];

  // Game state
  const [shuffledBones, setShuffledBones] = useState([]);
  const [correctPlacements, setCorrectPlacements] = useState({}); // zoneId -> boneId
  const [incorrectZone, setIncorrectZone] = useState(null);
  const [tipBone, setTipBone] = useState(null);
  const [attempts, setAttempts] = useState(0);

  const score = Object.keys(correctPlacements).length;
  const total = bones.length;

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

  // Zone id pattern: zone_<boneId>
  const getZoneId = (boneId) => `zone_${boneId}`;

  const handleDrop = useCallback((boneId, zoneId) => {
    if (gameState !== 'playing') return;
    if (correctPlacements[zoneId]) return; // already correct

    setAttempts(a => a + 1);

    // Check if bone matches zone
    if (getZoneId(boneId) === zoneId) {
      setCorrectPlacements(prev => ({ ...prev, [zoneId]: boneId }));
    } else {
      setIncorrectZone(zoneId);
    }
  }, [gameState, correctPlacements]);

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

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5">
        {/* LEFT: Draggable bone tray */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{regionInfo?.icon}</span>
            <h3 className="text-sm font-semibold text-slate-300">
              骨骼列表 — {regionInfo?.name}
            </h3>
            <span className="ml-auto text-xs text-slate-500">
              拖放到右側
            </span>
          </div>

          {/* Instruction for image mode */}
          <div className="mb-3 flex items-center gap-2 bg-blue-900/30 border border-blue-800/50 rounded-xl px-3 py-2">
            <span className="text-blue-300 text-sm">💡</span>
            <p className="text-xs text-blue-300 leading-relaxed">
              拖曳骨頭圖片，放到右側骨骼輪廓的正確位置
            </p>
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

        {/* RIGHT: Skeleton outline */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🎯</span>
            <h3 className="text-sm font-semibold text-slate-300">
              骨骼輪廓 — {regionInfo?.name}
            </h3>
            <span className="ml-auto text-xs text-slate-500">
              {score}/{total} 完成
            </span>
          </div>

          {/* Skeleton SVG with drop zones */}
          <SkeletonOutline
            region={region}
            correctPlacements={correctPlacements}
            incorrectZone={incorrectZone}
            dragOverZone={effectiveDragOver}
            onDrop={dndDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            mode={mode}
            bones={bones}
            onInfoClick={setTipBone}
          />
        </div>
      </div>

      {/* Clinical tip modal */}
      {tipBone && (
        <ClinicalTip bone={tipBone} onClose={() => setTipBone(null)} />
      )}
    </div>
  );
}
