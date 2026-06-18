import React from 'react';
import { Globe, Check } from 'lucide-react';

interface Language {
  id: string;
  name: string;
  nativeName: string;
}

const LANGUAGES: Language[] = [
  { id: 'en', name: 'English', nativeName: 'English' },
  { id: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { id: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { id: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { id: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { id: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { id: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { id: 'ml', name: 'Malayalam', nativeName: 'മലയാളம்' },
];

interface LanguageSelectorProps {
  selectedLanguage: string;
  onSelect: (langId: string) => void;
  onProceed: () => void;
  onBack?: () => void;
}

export default function LanguageSelector({
  selectedLanguage,
  onSelect,
  onProceed,
  onBack,
}: LanguageSelectorProps) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <div id="language-selection-card" className="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
        {onBack && (
          <button
            onClick={onBack}
            className="group mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors"
            id="lang-back-btn"
          >
            <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
            <span className="text-sm font-medium">Back</span>
          </button>
        )}

        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-6 h-6 animate-pulse" />
          </div>
          <h2 id="select-lang-heading" className="text-2xl font-bold text-slate-900 tracking-tight">
            Select Language
          </h2>
          <p id="select-lang-subheading" className="text-sm text-slate-500 mt-1">
            Select one from below to customize your travel experience.
          </p>
        </div>

        <div id="languages-grid" className="grid grid-cols-2 gap-4 mb-8">
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLanguage === lang.id;
            return (
              <button
                key={lang.id}
                id={`lang-opt-${lang.id}`}
                onClick={() => onSelect(lang.id)}
                className={`relative flex flex-col justify-between items-start p-4 rounded-xl border-2 text-left h-24 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                    : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
                }`}
              >
                <span className="text-sm font-semibold text-slate-900">{lang.name}</span>
                <span className="text-xs text-slate-400 font-medium self-end">{lang.nativeName}</span>
                {isSelected && (
                  <span
                    id={`lang-checked-badge-${lang.id}`}
                    className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-0.5"
                  >
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          id="lang-proceed-btn"
          onClick={onProceed}
          className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all text-center flex items-center justify-center gap-2"
        >
          <span>Proceed</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
