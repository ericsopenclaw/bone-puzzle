import { useState } from 'react';

export default function ClinicalTip({ bone, onClose }) {
  const [tab, setTab] = useState('fractures');

  if (!bone) return null;

  const tabs = [
    { id: 'fractures', label: '骨折類型', icon: '🦴' },
    { id: 'assessment', label: '評估要點', icon: '🔍' },
    { id: 'emtNote', label: 'EMT-P 要點', icon: '🚑' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-slate-800 border border-slate-600 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto fade-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-4 border-b border-slate-700 sticky top-0 bg-slate-800 rounded-t-2xl z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🦴</span>
              <h3 className="text-base font-bold text-white">
                {bone.name}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">{bone.nameEn}</span>
              <span className="text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded-full">
                {bone.category}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl leading-none ml-2 transition-colors w-10 h-10 flex items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600"
          >
            ×
          </button>
        </div>

        {/* Description */}
        <p className="px-4 pt-3 text-xs text-slate-300 leading-relaxed">
          {bone.description}
        </p>

        {/* Tabs - larger touch targets */}
        <div className="flex gap-1.5 px-4 pt-3">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2.5 px-1 text-[11px] rounded-xl font-medium transition-all min-h-[52px] ${
                tab === t.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-slate-200'
              }`}
            >
              <span className="block text-base mb-0.5">{t.icon}</span>
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-4 pt-3">
          {tab === 'fractures' && (
            <div className="bg-orange-950/40 border border-orange-800/50 rounded-xl p-3">
              <p className="text-xs text-orange-200 leading-relaxed">
                {bone.clinicalTip.fractures}
              </p>
            </div>
          )}
          {tab === 'assessment' && (
            <div className="bg-blue-950/40 border border-blue-800/50 rounded-xl p-3">
              <p className="text-xs text-blue-200 leading-relaxed">
                {bone.clinicalTip.assessment}
              </p>
            </div>
          )}
          {tab === 'emtNote' && (
            <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 text-base shrink-0">🚑</span>
                <p className="text-xs text-emerald-200 leading-relaxed">
                  {bone.clinicalTip.emtNote}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="px-4 pb-4">
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl text-sm font-medium transition-colors min-h-[48px]"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
}
