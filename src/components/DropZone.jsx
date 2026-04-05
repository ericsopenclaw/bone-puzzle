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
      ? 'border-red-500 bg-red-900/20'
      : isDragOver
        ? 'border-blue-400 bg-blue-900/30'
        : 'border-slate-600 bg-slate-800/40 drop-target hover:border-slate-500';

  return (
    <div
      data-zoneid={zone.id}
      onDragOver={(e) => onDragOver(e, zone.id)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, zone.id)}
      className={`
        relative rounded-xl border-2 border-dashed p-3 min-h-[80px] transition-all select-none
        ${stateClass}
        ${isCorrect ? 'pulse-correct' : ''}
        ${isIncorrect ? 'pulse-incorrect shake' : ''}
        ${isDragOver && !isCorrect ? 'drag-over scale-[1.02]' : ''}
      `}
    >
      {/* Zone label */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-slate-500 font-medium">{zone.position}</span>
        {mode === 'learn' && !isCorrect && (
          <button
            onClick={() => setShowHint(h => !h)}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors min-w-[44px] min-h-[28px] flex items-center justify-center rounded-lg hover:bg-slate-700/50"
          >
            {showHint ? '隱藏' : '💡 提示'}
          </button>
        )}
        {isCorrect && (
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <span>✓</span> 正確！
          </span>
        )}
      </div>

      {/* Target bone name */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className={`text-sm font-bold ${isCorrect ? 'text-emerald-300' : 'text-slate-300'}`}>
          {isCorrect || mode === 'learn' ? zone.boneName : '？？？'}
        </div>
        {isCorrect && placedBone && (
          <button
            onClick={() => onInfoClick?.(placedBone)}
            className="text-xs bg-emerald-800/60 hover:bg-emerald-700/60 text-emerald-300 px-2.5 py-1 rounded-full transition-colors min-h-[36px] flex items-center"
          >
            📋 臨床
          </button>
        )}
      </div>

      {/* English name hint */}
      {(mode === 'learn' || isCorrect) && zone.boneNameEn && (
        <div className="text-[10px] text-slate-500 mt-0.5">{zone.boneNameEn}</div>
      )}

      {/* Hint tooltip */}
      {showHint && mode === 'learn' && !isCorrect && (
        <div className="mt-2 text-[11px] text-blue-300 bg-blue-900/30 rounded-lg px-3 py-2 border border-blue-800/50 fade-in">
          💡 {zone.hint}
        </div>
      )}

      {/* Incorrect flash indicator */}
      {isIncorrect && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl pointer-events-none">
          <span className="text-red-400 text-3xl">✗</span>
        </div>
      )}

      {/* Empty drop indicator */}
      {!isCorrect && !isDragOver && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
          <span className="text-slate-400 text-2xl">⊕</span>
        </div>
      )}

      {/* Drag over indicator */}
      {isDragOver && !isCorrect && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl pointer-events-none">
          <span className="text-blue-300 text-3xl animate-bounce">↓</span>
        </div>
      )}
    </div>
  );
}
