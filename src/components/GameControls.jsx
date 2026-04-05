import { REGIONS } from '../data/bonesData';

export default function GameControls({ selectedRegion, onRegionChange, mode, onModeChange, onStart, onReset, gameState }) {
  const regions = Object.values(REGIONS);
  const isPlaying = gameState === 'playing';
  const isFinished = gameState === 'finished';

  const modeConfig = {
    learn: {
      label: '學習模式',
      icon: '📚',
      desc: '顯示提示、無時間限制',
      color: 'emerald',
    },
    exam: {
      label: '考試模式',
      icon: '📝',
      desc: '計時、不顯示提示',
      color: 'orange',
    },
  };

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 space-y-5">
      {/* Region selection */}
      <div>
        <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-3 block">
          選擇部位
        </label>
        <div className="grid grid-cols-3 gap-2">
          {regions.map(region => (
            <button
              key={region.id}
              onClick={() => !isPlaying && onRegionChange(region.id)}
              disabled={isPlaying}
              className={`p-3 rounded-xl border text-center transition-all ${
                isPlaying ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
              } ${
                selectedRegion === region.id
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/30'
                  : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500'
              }`}
            >
              <div className="text-2xl mb-1">{region.icon}</div>
              <div className="text-xs font-semibold">{region.name}</div>
              <div className="text-[10px] text-slate-400 mt-0.5 hidden sm:block">{region.nameEn}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Mode selection */}
      <div>
        <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-3 block">
          遊戲模式
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(modeConfig).map(([modeKey, cfg]) => (
            <button
              key={modeKey}
              onClick={() => !isPlaying && onModeChange(modeKey)}
              disabled={isPlaying}
              className={`p-3 rounded-xl border text-left transition-all ${
                isPlaying ? 'opacity-50 cursor-not-allowed' : 'hover:scale-102 active:scale-98'
              } ${
                mode === modeKey
                  ? modeKey === 'learn'
                    ? 'bg-emerald-700/40 border-emerald-600 text-emerald-200'
                    : 'bg-orange-700/40 border-orange-600 text-orange-200'
                  : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{cfg.icon}</span>
                <div>
                  <div className="text-sm font-semibold">{cfg.label}</div>
                  <div className="text-[10px] opacity-70 mt-0.5">{cfg.desc}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="space-y-2">
        {!isPlaying && !isFinished && (
          <button
            onClick={onStart}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-all hover:shadow-lg hover:shadow-blue-900/30 active:scale-98"
          >
            🎮 開始遊戲
          </button>
        )}
        {isPlaying && (
          <button
            onClick={onReset}
            className="w-full py-3 bg-slate-600 hover:bg-slate-500 text-slate-200 rounded-xl font-semibold text-sm transition-all"
          >
            🔄 重新開始
          </button>
        )}
        {isFinished && (
          <div className="space-y-2">
            <button
              onClick={onStart}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-all"
            >
              🔄 再玩一次
            </button>
            <button
              onClick={onReset}
              className="w-full py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl text-sm transition-all"
            >
              📋 返回選單
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
