import { useState } from 'react';

export default function DropZone({
  zone,
  isCorrect,
  isIncorrect,
  isDragOver,
  placedBone,
  mode,
  onDragOver,
  onDragLeave,
  onDrop,
  onInfoClick,
}) {
  const [showHint, setShowHint] = useState(false);

  const stateClass = isCorrect
    ? 'border-emerald-500 bg-emerald-900/25'
    : isIncorrect
      ? 'border-red-500 bg-red-900/20 shake'
      : isDragOver
        ? 'border-blue-400 bg-blue-900/30 scale-102 drop-target drag-over'
        : 'border-slate-600 bg-slate-800/40 drop-target hover:border-slate-500';

  return (
    <div
      data-zoneid={zone.id}
      onDragOver={(e) => onDragOver(e, zone.id)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, zone.id)}
      className={`
        relative rounded-xl border-2 border-dashed p-3 min-h-[72px] transition-all
        ${stateClass}
        ${isCorrect ? 'pulse-correct' : ''}
        ${isIncorrect ? 'pulse-incorrect' : ''}
      `}
    >
      {/* Zone label */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-slate-500 font-medium">{zone.position}</span>
        {mode === 'learn' && !isCorrect && (
          <button
            onClick={() => setShowHint(h => !h)}
            className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors"
          >
            {showHint ? '隱藏提示' : '提示'}
          </button>
        )}
        {isCorrect && (
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <span>✓</span> 正確！
          </span>
        )}
      </div>

      {/* Target bone name */}
      <div className="flex items-center gap-2">
        <div className={`text-sm font-bold ${isCorrect ? 'text-emerald-300' : 'text-slate-300'}`}>
          {isCorrect || mode === 'learn' ? zone.boneName : '？？？'}
        </div>
        {isCorrect && placedBone && (
          <button
            onClick={() => onInfoClick?.(placedBone)}
            className="text-xs bg-emerald-800/60 hover:bg-emerald-700/60 text-emerald-300 px-2 py-0.5 rounded-full transition-colors"
          >
            📋 臨床資訊
          </button>
        )}
      </div>

      {/* English name hint */}
      {(mode === 'learn' || isCorrect) && zone.boneNameEn && (
        <div className="text-[10px] text-slate-500 mt-0.5">{zone.boneNameEn}</div>
      )}

      {/* Hint tooltip */}
      {showHint && mode === 'learn' && !isCorrect && (
        <div className="mt-2 text-[11px] text-blue-300 bg-blue-900/30 rounded-lg px-2.5 py-2 border border-blue-800/50 fade-in">
          💡 {zone.hint}
        </div>
      )}

      {/* Placed (wrong) indicator */}
      {isIncorrect && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl pointer-events-none">
          <span className="text-red-400 text-2xl">✗</span>
        </div>
      )}

      {/* Empty drop indicator */}
      {!isCorrect && !isDragOver && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <span className="text-slate-400 text-2xl">⊕</span>
        </div>
      )}

      {/* Drag over indicator */}
      {isDragOver && !isCorrect && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl pointer-events-none">
          <span className="text-blue-300 text-2xl animate-bounce">↓</span>
        </div>
      )}
    </div>
  );
}
