import { useEffect, useState, useRef } from 'react';

export default function ScoreBoard({ score, total, timeLeft, mode, isActive, onTimeUp }) {
  const intervalRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(timeLeft);

  useEffect(() => {
    setCurrentTime(timeLeft);
  }, [timeLeft]);

  useEffect(() => {
    if (mode !== 'exam' || !isActive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    if (currentTime <= 0) {
      onTimeUp?.();
      return;
    }
    intervalRef.current = setInterval(() => {
      setCurrentTime(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [mode, isActive, onTimeUp]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const timeWarning = currentTime <= 30 && currentTime > 0;
  const timeCritical = currentTime <= 10 && currentTime > 0;

  return (
    <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 flex items-center gap-6 flex-wrap">
      {/* Score */}
      <div className="flex items-center gap-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            {score}<span className="text-slate-400 text-lg">/{total}</span>
          </div>
          <div className="text-xs text-slate-400 mt-0.5">正確答案</div>
        </div>

        {/* Progress ring */}
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="18" fill="none" stroke="#334155" strokeWidth="4" />
            <circle
              cx="22" cy="22" r="18" fill="none"
              stroke={pct >= 80 ? '#22c55e' : pct >= 60 ? '#eab308' : '#ef4444'}
              strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 18}`}
              strokeDashoffset={`${2 * Math.PI * 18 * (1 - pct / 100)}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.4s ease' }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
            {pct}%
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-12 bg-slate-700 hidden sm:block" />

      {/* Timer - only in exam mode */}
      {mode === 'exam' && (
        <div className="flex items-center gap-2">
          <span className={`text-2xl ${timeCritical ? 'animate-pulse' : ''}`}>
            {timeCritical ? '⏰' : timeWarning ? '⌛' : '🕐'}
          </span>
          <div>
            <div className={`text-2xl font-mono font-bold tabular-nums ${
              timeCritical ? 'text-red-400' : timeWarning ? 'text-yellow-400' : 'text-white'
            }`}>
              {formatTime(currentTime)}
            </div>
            <div className="text-xs text-slate-400">剩餘時間</div>
          </div>
        </div>
      )}

      {/* Remaining */}
      <div className="ml-auto">
        <div className="text-sm text-slate-400 text-right">
          剩餘 <span className="text-white font-semibold">{total - score}</span> 題
        </div>
        {mode === 'exam' && (
          <div className="text-xs text-slate-500 text-right mt-0.5">考試模式</div>
        )}
        {mode === 'learn' && (
          <div className="text-xs text-emerald-400 text-right mt-0.5">學習模式</div>
        )}
      </div>
    </div>
  );
}
