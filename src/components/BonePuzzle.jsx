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
  const [correctPlacements, setCorrectPlacements] = useState({});
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
    if (correctPlacements[zoneId]) return;

    setAttempts(a => a + 1);

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

  if (gameState === 'finished') {
    const perfect = score === total;
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center fade-in">
        <div className="text-6xl mb-3">{perfect ? '🏆' : score >= total * 0.8 ? '🎉' : '💪'}</div>
        <h2 className="text-2xl font-bold text-white mb-1">
          {perfect ? '完美！' : score >= total * 0.8 ? '答得不錯！' : '繼續加油！'}
        </h2>
        <div className="text-slate-400 text-xs mb-5">
          {regionInfo?.name} — {mode === 'exam' ? '考試模式' : '學習模式'}
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6 w-full max-w-sm">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-3">
            <div className="text-2xl font-bold text-white">{score}/{total}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">正確答案</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-3">
            <div className="text-2xl font-bold text-white">{attempts}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">嘗試次數</div>
          </div>
          <div className={`bg-slate-800 border rounded-2xl p-3 ${accuracy >= 80 ? 'border-emerald-700' : accuracy >= 60 ? 'border-yellow-700' : 'border-red-700'}`}>
            <div className={`text-2xl font-bold ${accuracy >= 80 ? 'text-emerald-400' : accuracy >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
              {accuracy}%
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">準確率</div>
          </div>
        </div>
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-400 mb-5">
          {perfect ? '太厲害了！所有骨骼都放對位置了！' : `共答對 ${score} 題，錯誤 ${attempts - score} 次。`}
        </div>
        {/* Back button */}
        <button
          onClick={() => {}}
          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
        >
          返回遊戲選單
        </button>
      </div>
    );
  }

  return (
    <div
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="space-y-3"
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

      {/* Mobile: bones list on TOP, skeleton below */}
      {/* Desktop: skeleton left, bones right */}
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Skeleton outline - TOP on mobile, LEFT on desktop */}
        <div className="w-full lg:w-[45%] order-2 lg:order-1 bg-slate-800/40 border border-slate-700 rounded-2xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">🎯</span>
            <h3 className="text-sm font-semibold text-slate-300">
              骨骼輪廓
            </h3>
            <span className="ml-auto text-xs text-slate-500">
              {score}/{total} 完成
            </span>
          </div>
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

        {/* Bone tray - BOTTOM on mobile, RIGHT on desktop */}
        <div className="w-full lg:w-[55%] order-1 lg:order-2 bg-slate-800/40 border border-slate-700 rounded-2xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">{regionInfo?.icon}</span>
            <h3 className="text-sm font-semibold text-slate-300">
              骨骼列表
            </h3>
            <span className="ml-auto text-xs text-slate-500">
              拖放到上方
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
      </div>

      {/* Clinical tip modal */}
      {tipBone && (
        <ClinicalTip bone={tipBone} onClose={() => setTipBone(null)} />
      )}
    </div>
  );
}
