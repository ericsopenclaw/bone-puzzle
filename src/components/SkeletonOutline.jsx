import { BONE_SVGS } from '../data/bonesData';

// Zone positions on the SVG canvas for each region
// Each zone: { id, boneId, x, y, width, height, label, hint }
const ZONE_CONFIGS = {
  upper_limb: [
    { id: 'zone_clavicle', boneId: 'clavicle', x: 145, y: 50, w: 70, h: 25, label: '鎖骨', hint: '連接胸骨與肩胛骨' },
    { id: 'zone_scapula', boneId: 'scapula', x: 175, y: 80, w: 50, h: 60, label: '肩胛骨', hint: '後背三角形骨' },
    { id: 'zone_humerus', boneId: 'humerus', x: 235, y: 80, w: 30, h: 90, label: '肱骨', hint: '上臂長骨' },
    { id: 'zone_radius', boneId: 'radius', x: 275, y: 170, w: 22, h: 85, label: '橈骨', hint: '拇指側前臂骨' },
    { id: 'zone_ulna', boneId: 'ulna', x: 297, y: 170, w: 22, h: 85, label: '尺骨', hint: '小指側前臂骨' },
    { id: 'zone_carpal', boneId: 'carpal', x: 275, y: 255, w: 50, h: 35, label: '腕骨', hint: '8塊腕關節骨' },
    { id: 'zone_metacarpal', boneId: 'metacarpal', x: 275, y: 290, w: 50, h: 55, label: '掌骨', hint: '手掌5根骨骼' },
  ],
  lower_limb: [
    { id: 'zone_ilium', boneId: 'ilium', x: 130, y: 40, w: 100, h: 70, label: '髂骨', hint: '骨盆最大的骨' },
    { id: 'zone_pubis', boneId: 'pubis', x: 145, y: 100, w: 70, h: 35, label: '恥骨', hint: '骨盆前下方' },
    { id: 'zone_ischium', boneId: 'ischium', x: 145, y: 130, w: 70, h: 50, label: '坐骨', hint: '坐姿承重點' },
    { id: 'zone_femur', boneId: 'femur', x: 155, y: 180, w: 35, h: 110, label: '股骨', hint: '大腿，最強壯的骨' },
    { id: 'zone_patella', boneId: 'patella', x: 155, y: 290, w: 35, h: 40, label: '髕骨', hint: '膝蓋，最大種子骨' },
    { id: 'zone_tibia', boneId: 'tibia', x: 158, y: 332, w: 25, h: 100, label: '脛骨', hint: '小腿承重骨' },
    { id: 'zone_fibula', boneId: 'fibula', x: 183, y: 332, w: 15, h: 100, label: '腓骨', hint: '小腿外側細骨' },
    { id: 'zone_talus', boneId: 'talus', x: 150, y: 434, w: 40, h: 28, label: '距骨', hint: '踝關節主骨' },
    { id: 'zone_calcaneus', boneId: 'calcaneus', x: 150, y: 462, w: 40, h: 50, label: '跟骨', hint: '足跟，最大足骨' },
  ],
  thorax: [
    { id: 'zone_sternum', boneId: 'sternum', x: 160, y: 50, w: 30, h: 80, label: '胸骨', hint: '胸廓前中央' },
    { id: 'zone_rib_1_7', boneId: 'rib_1_7', x: 90, y: 55, w: 65, h: 50, label: '第1-7肋骨', hint: '直接連接胸骨' },
    { id: 'zone_rib_8_12', boneId: 'rib_8_12', x: 85, y: 108, w: 70, h: 58, label: '第8-12肋骨', hint: '假肋/浮肋' },
    { id: 'zone_thoracic_vertebrae', boneId: 'thoracic_vertebrae', x: 195, y: 50, w: 45, h: 115, label: '胸椎', hint: '胸廓後壁' },
    { id: 'zone_clavicle_thorax', boneId: 'clavicle_thorax', x: 105, y: 30, w: 50, h: 22, label: '鎖骨（胸廓端）', hint: '胸鎖關節' },
    { id: 'zone_scapula_thorax', boneId: 'scapula_thorax', x: 195, y: 30, w: 45, h: 55, label: '肩胛骨', hint: '胸廓後外側' },
  ],
};

// SVG skeleton outline paths for each region (semi-transparent gray silhouettes)
const SKELETON_PATHS = {
  upper_limb: `
    <!-- Clavicle silhouette -->
    <path d="M145,55 Q175,35 215,50 Q245,35 265,55" stroke="#64748b" stroke-width="4" fill="none" stroke-linecap="round"/>
    <!-- Shoulder arch -->
    <ellipse cx="230" cy="80" rx="35" ry="20" stroke="#475569" stroke-width="2" fill="none" stroke-dasharray="4 3"/>
    <!-- Scapula silhouette -->
    <path d="M185,90 L220,100 L215,145 L205,170 L185,165 L180,140 L175,110 Z" stroke="#475569" stroke-width="2" fill="rgba(71,85,105,0.2)" stroke-dasharray="4 3"/>
    <!-- Humerus silhouette -->
    <path d="M220,95 L225,180" stroke="#475569" stroke-width="22" fill="none" stroke-linecap="round" opacity="0.3"/>
    <!-- Forearm silhouette -->
    <path d="M220,180 L220,255" stroke="#475569" stroke-width="18" fill="none" stroke-linecap="round" opacity="0.3"/>
    <!-- Hand silhouette -->
    <ellipse cx="220" cy="320" rx="30" ry="50" stroke="#475569" stroke-width="2" fill="rgba(71,85,105,0.15)" stroke-dasharray="4 3"/>
    <!-- Upper limb label -->
    <text x="320" y="200" font-size="11" fill="#64748b" font-family="sans-serif">上肢骨骼輪廓</text>
    <text x="320" y="215" font-size="10" fill="#475569" font-family="sans-serif">Upper Limb</text>
  `,
  lower_limb: `
    <!-- Pelvis ring silhouette -->
    <path d="M130,45 Q180,30 230,45 Q235,70 230,100 Q180,115 130,100 Q125,70 130,45Z" stroke="#475569" stroke-width="2" fill="rgba(71,85,105,0.15)" stroke-dasharray="5 3"/>
    <!-- Hip socket -->
    <circle cx="180" cy="115" r="22" stroke="#475569" stroke-width="2" fill="rgba(71,85,105,0.1)" stroke-dasharray="4 3"/>
    <!-- Sacrum -->
    <path d="M172,110 L172,165 Q180,170 188,165 L188,110" stroke="#475569" stroke-width="2" fill="rgba(71,85,105,0.1)" stroke-dasharray="3 2"/>
    <!-- Femur silhouette -->
    <path d="M165,135 L160,290" stroke="#475569" stroke-width="28" fill="none" stroke-linecap="round" opacity="0.3"/>
    <!-- Knee area -->
    <ellipse cx="163" cy="295" rx="20" ry="25" stroke="#475569" stroke-width="2" fill="rgba(71,85,105,0.1)" stroke-dasharray="4 3"/>
    <!-- Lower leg silhouette -->
    <path d="M158,320 L155,430" stroke="#475569" stroke-width="20" fill="none" stroke-linecap="round" opacity="0.3"/>
    <!-- Foot silhouette -->
    <path d="M140,435 Q150,425 170,428 Q190,430 200,440 Q200,465 180,475 Q160,480 140,465 Q130,450 140,435Z" stroke="#475569" stroke-width="2" fill="rgba(71,85,105,0.15)" stroke-dasharray="4 3"/>
    <!-- Lower limb label -->
    <text x="260" y="280" font-size="11" fill="#64748b" font-family="sans-serif">下肢骨骼輪廓</text>
    <text x="260" y="295" font-size="10" fill="#475569" font-family="sans-serif">Lower Limb</text>
  `,
  thorax: `
    <!-- Sternum silhouette -->
    <path d="M165,55 L168,130" stroke="#475569" stroke-width="18" fill="none" stroke-linecap="round" opacity="0.3"/>
    <!-- Rib cage outline -->
    <path d="M100,60 Q180,40 240,55" stroke="#475569" stroke-width="2" fill="none" stroke-dasharray="5 3"/>
    <path d="M95,80 Q180,60 245,75" stroke="#475569" stroke-width="2" fill="none" stroke-dasharray="5 3"/>
    <path d="M92,100 Q180,80 248,95" stroke="#475569" stroke-width="2" fill="none" stroke-dasharray="5 3"/>
    <path d="M90,120 Q180,100 250,115" stroke="#475569" stroke-width="2" fill="none" stroke-dasharray="5 3"/>
    <path d="M88,140 Q180,120 252,135" stroke="#475569" stroke-width="2" fill="none" stroke-dasharray="5 3"/>
    <path d="M88,160 Q180,140 255,155" stroke="#475569" stroke-width="2" fill="none" stroke-dasharray="5 3"/>
    <!-- Spine silhouette -->
    <path d="M200,55 L200,165" stroke="#475569" stroke-width="25" fill="none" stroke-linecap="round" opacity="0.3"/>
    <!-- Thoracic label -->
    <text x="260" y="110" font-size="11" fill="#64748b" font-family="sans-serif">胸廓骨骼輪廓</text>
    <text x="260" y="125" font-size="10" fill="#475569" font-family="sans-serif">Thorax</text>
  `,
};

export { ZONE_CONFIGS };

export default function SkeletonOutline({
  region,
  correctPlacements,
  incorrectZone,
  dragOverZone,
  onDrop,
  onDragOver,
  onDragLeave,
  mode,
  bones,
  onInfoClick,
}) {
  const zones = ZONE_CONFIGS[region] || [];
  const paths = SKELETON_PATHS[region] || '';

  const handleDrop = (e, zoneId) => {
    e.preventDefault();
    onDrop(e, zoneId);
  };

  return (
    <div className="relative w-full">
      {/* SVG Skeleton */}
      <svg
        viewBox="0 0 360 520"
        className="w-full max-w-md mx-auto"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}
      >
        {/* Background */}
        <rect width="360" height="520" fill="#1e293b" rx="16" />

        {/* Skeleton outline */}
        <g dangerouslySetInnerHTML={{ __html: paths }} />

        {/* Drop zones */}
        {zones.map(zone => {
          const isCorrect = !!correctPlacements[zone.id];
          const isIncorrect = incorrectZone === zone.id;
          const isDragOver = dragOverZone === zone.id;
          const placedBoneId = correctPlacements[zone.id];
          const svgData = BONE_SVGS[zone.boneId];

          // Zone fill color
          let fill = 'rgba(51,65,85,0.5)';
          let stroke = '#475569';
          let strokeWidth = 2;
          let dashArray = '5 4';
          let animClass = '';

          if (isCorrect) {
            fill = 'rgba(22,101,52,0.6)';
            stroke = '#22c55e';
            strokeWidth = 2.5;
            dashArray = 'none';
          } else if (isIncorrect) {
            fill = 'rgba(127,29,29,0.5)';
            stroke = '#ef4444';
            strokeWidth = 2.5;
            dashArray = 'none';
          } else if (isDragOver) {
            fill = 'rgba(30,58,138,0.6)';
            stroke = '#3b82f6';
            strokeWidth = 2.5;
            dashArray = 'none';
          }

          return (
            <g
              key={zone.id}
              data-zoneid={zone.id}
              onDragOver={isCorrect ? undefined : (e) => onDragOver(e, zone.id)}
              onDragLeave={isCorrect ? undefined : onDragLeave}
              onDrop={isCorrect ? undefined : (e) => handleDrop(e, zone.id)}
              style={{ cursor: isCorrect ? 'default' : 'pointer' }}
            >
              {/* Drop zone rectangle */}
              <rect
                x={zone.x}
                y={zone.y}
                width={zone.w}
                height={zone.h}
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeDasharray={dashArray}
                rx="8"
                className={`
                  transition-all duration-200
                  ${isDragOver && !isCorrect ? 'scale-105' : ''}
                  ${isIncorrect ? 'animate-pulse-red' : ''}
                  ${isCorrect ? 'animate-pulse-green' : ''}
                `}
              />

              {/* Placed bone SVG (snapped in) */}
              {isCorrect && svgData && (
                <g transform={`translate(${zone.x + zone.w/2 - 25}, ${zone.y + zone.h/2 - 25}) scale(0.5)`}>
                  <svg
                    viewBox={svgData.viewBox}
                    width="100"
                    height="100"
                  >
                    <path
                      d={svgData.path}
                      fill="#faf8f5"
                      stroke="#e2e8f0"
                      strokeWidth="3"
                    />
                  </svg>
                </g>
              )}

              {/* Drag-over indicator */}
              {isDragOver && !isCorrect && (
                <g>
                  <circle
                    cx={zone.x + zone.w / 2}
                    cy={zone.y + zone.h / 2}
                    r="12"
                    fill="#3b82f6"
                    opacity="0.8"
                  />
                  <text
                    x={zone.x + zone.w / 2}
                    y={zone.y + zone.h / 2 + 5}
                    textAnchor="middle"
                    fontSize="14"
                    fill="white"
                    fontWeight="bold"
                  >
                    ↓
                  </text>
                </g>
              )}

              {/* Incorrect flash X */}
              {isIncorrect && (
                <g>
                  <text
                    x={zone.x + zone.w / 2}
                    y={zone.y + zone.h / 2 + 6}
                    textAnchor="middle"
                    fontSize="20"
                    fill="#ef4444"
                    fontWeight="bold"
                  >
                    ✗
                  </text>
                </g>
              )}

              {/* Zone label - only in learn mode or when correct */}
              {(mode === 'learn' || isCorrect) && (
                <text
                  x={zone.x + zone.w / 2}
                  y={zone.y + zone.h + 14}
                  textAnchor="middle"
                  fontSize="9"
                  fill={isCorrect ? '#22c55e' : '#94a3b8'}
                  fontFamily="sans-serif"
                >
                  {isCorrect ? `✓ ${zone.label}` : zone.label}
                </text>
              )}

              {/* Hidden target label (shown on hover in exam mode) */}
              {mode === 'exam' && !isCorrect && (
                <text
                  x={zone.x + zone.w / 2}
                  y={zone.y + zone.h / 2 + 4}
                  textAnchor="middle"
                  fontSize="16"
                  fill="#64748b"
                  fontFamily="sans-serif"
                  fontWeight="bold"
                >
                  ?
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Progress bar */}
      <div className="mt-3 flex items-center gap-2">
        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-400"
            style={{
              width: `${Object.keys(correctPlacements).length / zones.length * 100}%`,
            }}
          />
        </div>
        <span className="text-xs text-slate-400 shrink-0">
          {Object.keys(correctPlacements).length}/{zones.length}
        </span>
      </div>
    </div>
  );
}
