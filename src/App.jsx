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
      <header className="bg-slate-900/95 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-lg shadow-lg shadow-blue-900/40">
              🦴
            </div>
            <div>
              <h1 className="text-base font-bold text-white leading-tight">骨骼拼圖訓練系統</h1>
              <p className="text-[10px] text-slate-400">EMT-P 解剖學訓練 · Emergency Medical Technician-Paramedic</p>
            </div>
          </div>

          {/* Status indicators */}
          <div className="flex items-center gap-2 text-xs">
            {gameState === 'playing' && (
              <>
                <span className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2.5 py-1.5 rounded-lg text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {regionInfo?.name}
                </span>
                <span className={`px-2.5 py-1.5 rounded-lg border font-medium ${
                  mode === 'exam'
                    ? 'bg-orange-900/40 border-orange-700 text-orange-300'
                    : 'bg-emerald-900/40 border-emerald-700 text-emerald-300'
                }`}>
                  {mode === 'exam' ? '📝 考試模式' : '📚 學習模式'}
                </span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="xl:sticky xl:top-[73px] xl:self-start space-y-4">
            <GameControls
              selectedRegion={selectedRegion}
              onRegionChange={setSelectedRegion}
              mode={mode}
              onModeChange={setMode}
              onStart={handleStart}
              onReset={handleReset}
              gameState={gameState}
            />

            {/* Guide card */}
            <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 text-sm space-y-3">
              <h3 className="text-slate-300 font-semibold text-xs uppercase tracking-wider">使用說明</h3>
              <div className="space-y-2 text-slate-400 text-xs leading-relaxed">
                <div className="flex gap-2">
                  <span className="shrink-0">1.</span>
                  <span>從左側骨骼列表拖曳骨骼</span>
                </div>
                <div className="flex gap-2">
                  <span className="shrink-0">2.</span>
                  <span>放入右側對應的解剖位置</span>
                </div>
                <div className="flex gap-2">
                  <span className="shrink-0">3.</span>
                  <span>學習模式：可查看提示和臨床資訊</span>
                </div>
                <div className="flex gap-2">
                  <span className="shrink-0">4.</span>
                  <span>考試模式：限時180秒，無提示</span>
                </div>
                <div className="flex gap-2">
                  <span className="shrink-0">📱</span>
                  <span>支援觸控拖曳（平板操作）</span>
                </div>
              </div>
            </div>

            {/* Region info */}
            {regionInfo && (
              <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{regionInfo.icon}</span>
                  <div>
                    <div className="text-white font-semibold text-sm">{regionInfo.name}</div>
                    <div className="text-slate-400 text-xs">{regionInfo.nameEn}</div>
                  </div>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{regionInfo.description}</p>
              </div>
            )}
          </aside>

          {/* Game area */}
          <section>
            {/* Welcome / intro for idle state */}
            {gameState === 'idle' && (
              <div className="mb-6 bg-gradient-to-br from-blue-900/30 to-slate-800/60 border border-blue-800/40 rounded-2xl p-6 fade-in">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🏥</div>
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">EMT-P 骨骼解剖拼圖</h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-3">
                      透過互動式拼圖練習，熟悉創傷評估中重要的骨骼解剖位置與臨床意義。
                      選擇部位後開始練習，每塊骨骼都附有臨床急救要點。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['骨折評估', '神經血管評估', '創傷機制', '院前處置'].map(tag => (
                        <span key={tag} className="text-xs bg-blue-900/40 text-blue-300 border border-blue-800/60 px-2.5 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <BonePuzzle
              region={selectedRegion}
              mode={mode}
              gameState={gameState}
              onScoreChange={handleScoreChange}
              onComplete={handleComplete}
            />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-12 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-slate-600">
          骨骼拼圖訓練系統 · EMT-P 解剖學訓練工具 · 僅供教育訓練使用
        </div>
      </footer>
    </div>
  );
}
