import { useState, useCallback } from 'react';
import BonePuzzle from './components/BonePuzzle';
import GameControls from './components/GameControls';
import { REGIONS } from './data/bonesData';

export default function App() {
  const [selectedRegion, setSelectedRegion] = useState('upper_limb');
  const [mode, setMode] = useState('learn');
  const [gameState, setGameState] = useState('idle'); // idle | playing | finished
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const handleStart = useCallback(() => {
    setScore(0);
    setTotal(0);
    setGameState('playing');
  }, []);

  const handleReset = useCallback(() => {
    setScore(0);
    setTotal(0);
    setGameState('idle');
  }, []);

  const handleScoreChange = useCallback((s, t) => {
    setScore(s);
    setTotal(t);
  }, []);

  const handleComplete = useCallback(() => {
    setGameState('finished');
  }, []);

  const regionInfo = REGIONS[selectedRegion];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-900/95 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-sm safe-area-top">
        <div className="max-w-6xl mx-auto px-3 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-base shadow-lg shadow-blue-900/40 shrink-0">
              🦴
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">骨骼拼圖訓練系統</h1>
              <p className="text-[9px] text-slate-400 hidden sm:block">EMT-P 解剖學訓練工具</p>
            </div>
          </div>

          {/* Status indicators */}
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs">
            {gameState === 'playing' && (
              <>
                <span className="flex items-center gap-1 bg-slate-800 border border-slate-700 px-2 py-1 rounded-lg text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="hidden sm:inline">{regionInfo?.name}</span>
                  <span className="sm:hidden">{regionInfo?.icon}</span>
                </span>
                <span className={`px-2 py-1 rounded-lg border font-medium hidden sm:block ${
                  mode === 'exam'
                    ? 'bg-orange-900/40 border-orange-700 text-orange-300'
                    : 'bg-emerald-900/40 border-emerald-700 text-emerald-300'
                }`}>
                  {mode === 'exam' ? '📝 考試模式' : '📚 學習模式'}
                </span>
                <span className={`sm:hidden px-2 py-1 rounded-lg border font-medium ${
                  mode === 'exam' ? 'bg-orange-900/40 border-orange-700 text-orange-300' : 'bg-emerald-900/40 border-emerald-700 text-emerald-300'
                }`}>
                  {mode === 'exam' ? '📝' : '📚'}
                </span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-3 py-4">
        {/* Idle: show sidebar + intro */}
        {gameState === 'idle' && (
          <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-4">
            {/* Sidebar */}
            <aside className="space-y-3">
              <GameControls
                selectedRegion={selectedRegion}
                onRegionChange={setSelectedRegion}
                mode={mode}
                onModeChange={setMode}
                onStart={handleStart}
                onReset={handleReset}
                gameState={gameState}
              />

              {/* Region info */}
              {regionInfo && (
                <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xl">{regionInfo.icon}</span>
                    <div>
                      <div className="text-white font-semibold text-sm">{regionInfo.name}</div>
                      <div className="text-slate-400 text-[10px]">{regionInfo.nameEn}</div>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">{regionInfo.description}</p>
                </div>
              )}

              {/* Guide card - hidden on mobile */}
              <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-3 text-sm space-y-2 hidden sm:block">
                <h3 className="text-slate-300 font-semibold text-[10px] uppercase tracking-wider">使用說明</h3>
                <div className="space-y-1.5 text-slate-400 text-[10px] leading-relaxed">
                  <div className="flex gap-2"><span className="shrink-0">1.</span><span>從上方骨骼列表拖曳骨頭</span></div>
                  <div className="flex gap-2"><span className="shrink-0">2.</span><span>放入下方對應的解剖位置</span></div>
                  <div className="flex gap-2"><span className="shrink-0">3.</span><span>學習模式：可查看提示</span></div>
                  <div className="flex gap-2"><span className="shrink-0">4.</span><span>考試模式：限時180秒</span></div>
                  <div className="flex gap-2"><span>📱</span><span>支援觸控拖曳</span></div>
                </div>
              </div>
            </aside>

            {/* Intro */}
            <section>
              <div className="mb-4 bg-gradient-to-br from-blue-900/30 to-slate-800/60 border border-blue-800/40 rounded-2xl p-5 fade-in">
                <div className="flex items-start gap-3">
                  <div className="text-3xl shrink-0">🏥</div>
                  <div>
                    <h2 className="text-base font-bold text-white mb-1">EMT-P 骨骼解剖拼圖</h2>
                    <p className="text-slate-400 text-xs leading-relaxed mb-3">
                      透過互動式拼圖練習，熟悉創傷評估中重要的骨骼解剖位置與臨床意義。
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {['骨折評估', '神經血管評估', '創傷機制', '院前處置'].map(tag => (
                        <span key={tag} className="text-[10px] bg-blue-900/40 text-blue-300 border border-blue-800/60 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Idle skeleton preview */}
              <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-4 text-center py-12">
                <div className="text-5xl mb-3">{regionInfo?.icon || '🦴'}</div>
                <h3 className="text-lg font-bold text-white mb-1">骨骼拼圖練習</h3>
                <p className="text-slate-400 text-xs max-w-xs mx-auto">
                  選擇部位和遊戲模式後，點擊「開始遊戲」開始練習。
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {Object.values(REGIONS).map(r => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRegion(r.id)}
                      className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                        selectedRegion === r.id
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {r.icon} {r.name}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Playing / Finished: mobile-first layout */}
        {gameState !== 'idle' && (
          <BonePuzzle
            region={selectedRegion}
            mode={mode}
            gameState={gameState}
            onScoreChange={handleScoreChange}
            onComplete={handleComplete}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-8 py-4">
        <div className="max-w-6xl mx-auto px-4 text-center text-[10px] text-slate-600">
          骨骼拼圖訓練系統 · EMT-P 解剖學訓練工具 · 僅供教育訓練使用
        </div>
      </footer>
    </div>
  );
}
