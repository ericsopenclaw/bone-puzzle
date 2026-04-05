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
        className="relative bg-slate-800 border border-slate-600 rounded-2xl shadow-2xl w-full max-w-lg fade-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-slate-700">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">🦴</span>
              <h3 className="text-xl font-bold text-white">
                {bone.name}
              </h3>
              <span className="text-sm text-slate-400">({bone.nameEn})</span>
            </div>
            <span className="inline-block text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
              {bone.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl leading-none ml-2 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Description */}
        <p className="px-5 pt-4 text-sm text-slate-300 leading-relaxed">
          {bone.description}
        </p>

        {/* Tabs */}
        <div className="flex gap-1 px-5 pt-4">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2 px-2 text-xs rounded-lg font-medium transition-all ${
                tab === t.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-slate-200'
              }`}
            >
              <span className="block text-base mb-0.5">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-5 pt-3">
          {tab === 'fractures' && (
            <div className="bg-orange-950/40 border border-orange-800/50 rounded-xl p-4">
              <p className="text-sm text-orange-200 leading-relaxed">
                {bone.clinicalTip.fractures}
              </p>
            </div>
          )}
          {tab === 'assessment' && (
            <div className="bg-blue-950/40 border border-blue-800/50 rounded-xl p-4">
              <p className="text-sm text-blue-200 leading-relaxed">
                {bone.clinicalTip.assessment}
              </p>
            </div>
          )}
          {tab === 'emtNote' && (
            <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 text-lg shrink-0">🚑</span>
                <p className="text-sm text-emerald-200 leading-relaxed">
                  {bone.clinicalTip.emtNote}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="px-5 pb-5">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl text-sm font-medium transition-colors"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
}
