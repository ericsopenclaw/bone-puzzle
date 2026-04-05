import { BONE_SVGS } from '../data/bonesData';

function BoneSVG({ boneId, size = 64 }) {
  const svgData = BONE_SVGS[boneId];
  if (!svgData) {
    return (
      <div className="w-14 h-14 bg-slate-600 rounded-xl flex items-center justify-center text-2xl">
        🦴
      </div>
    );
  }
  return (
    <svg
      viewBox={svgData.viewBox}
      width={size}
      height={size}
      className="bone-svg"
      style={{ overflow: 'visible' }}
    >
      <path
        d={svgData.path}
        fill={svgData.color}
        stroke="#cbd5e1"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
        relative group rounded-2xl border px-4 py-3 text-sm select-none transition-all
        min-h-[88px] sm:min-h-[80px]
        ${disabled
          ? 'opacity-40 cursor-default border-emerald-700/50 bg-emerald-900/20'
          : isDragging
            ? 'opacity-40 border-blue-400 bg-blue-900/30 scale-95 cursor-grabbing'
            : 'cursor-grab border-slate-600 bg-slate-700/60 hover:border-blue-400 hover:bg-slate-700 hover:shadow-lg hover:shadow-blue-900/20 active:scale-[0.97] active:cursor-grabbing bone-card'
        }
      `}
    >
      <div className="flex items-center gap-3">
        {/* Bone SVG - larger for touch */}
        <div className={`shrink-0 ${disabled ? 'opacity-50' : ''}`}>
          <BoneSVG boneId={bone.svgKey} size={64} />
        </div>

        <div className="flex-1 min-w-0">
          <div className={`font-bold truncate text-base leading-tight ${disabled ? 'text-emerald-400' : 'text-white'}`}>
            {bone.name}
          </div>
          {showName && (
            <div className="text-xs text-slate-400 truncate mt-0.5">{bone.nameEn}</div>
          )}
          <div className="text-[10px] text-slate-500 mt-0.5">{bone.category}</div>
        </div>

        {disabled ? (
          <span className="text-emerald-400 text-xl shrink-0">✓</span>
        ) : (
          <div className="shrink-0 text-slate-600 text-base opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
            ⋮⋮
          </div>
        )}

        {/* Info button - 44px minimum touch target */}
        {!disabled && mode === 'learn' && (
          <button
            onPointerDown={e => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onInfoClick?.(bone);
            }}
            className="shrink-0 w-11 h-11 rounded-full bg-slate-600 hover:bg-blue-600 text-slate-300 hover:text-white text-sm flex items-center justify-center transition-colors flex items-center justify-center"
            title="查看臨床資訊"
          >
            i
          </button>
        )}
      </div>
    </div>
  );
}

export { BoneSVG };
