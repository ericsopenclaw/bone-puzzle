export default function BoneItem({
  bone,
  isDragging,
  isPlaced,
  isCorrect,
  showName,
  mode,
  onDragStart,
  onDragEnd,
  onTouchStart,
  onInfoClick,
}) {
  const disabled = isPlaced && isCorrect;

  return (
    <div
      draggable={!disabled}
      onDragStart={disabled ? undefined : (e) => onDragStart(e, bone.id)}
      onDragEnd={disabled ? undefined : onDragEnd}
      onTouchStart={disabled ? undefined : (e) => onTouchStart?.(e, bone.id)}
      className={`
        relative group rounded-xl border px-3 py-2.5 text-sm select-none transition-all
        ${disabled
          ? 'opacity-40 cursor-default border-emerald-700/50 bg-emerald-900/20'
          : isDragging
            ? 'opacity-40 border-blue-400 bg-blue-900/30 scale-95 cursor-grabbing'
            : 'cursor-grab border-slate-600 bg-slate-700/60 hover:border-blue-400 hover:bg-slate-700 hover:shadow-lg hover:shadow-blue-900/20 active:scale-95 active:cursor-grabbing bone-card'
        }
      `}
    >
      <div className="flex items-center gap-2">
        <span className="text-base">🦴</span>
        <div className="flex-1 min-w-0">
          <div className={`font-semibold truncate ${disabled ? 'text-emerald-400' : 'text-white'}`}>
            {bone.name}
          </div>
          {showName && (
            <div className="text-[10px] text-slate-400 truncate">{bone.nameEn}</div>
          )}
        </div>

        {disabled && (
          <span className="text-emerald-400 text-base shrink-0">✓</span>
        )}

        {!disabled && mode === 'learn' && (
          <button
            onPointerDown={e => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onInfoClick?.(bone);
            }}
            className="shrink-0 w-5 h-5 rounded-full bg-slate-600 hover:bg-blue-600 text-slate-300 hover:text-white text-xs flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
            title="查看臨床資訊"
          >
            i
          </button>
        )}
      </div>

      {/* Category badge */}
      <div className="mt-1 text-[10px] text-slate-500">{bone.category}</div>
    </div>
  );
}
