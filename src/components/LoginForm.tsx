import React, { useState } from 'react';
import { Phone, ArrowLeft } from 'lucide-react';

interface LoginFormProps {
  phoneNumber: string;
  onPhoneChange: (val: string) => void;
  onSendOtp: (phoneWithCode: string) => void;
  onSwitchToSignup: () => void;
  onBack?: () => void;
}

export default function LoginForm({
  phoneNumber,
  onPhoneChange,
  onSendOtp,
  onSwitchToSignup,
  onBack,
}: LoginFormProps) {
  const [countryCode, setCountryCode] = useState('+91');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState('');

  const countries = [
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+1', flag: '🇺🇸', name: 'USA/Canada' },
    { code: '+44', flag: '🇬🇧', name: 'UK' },
    { code: '+971', flag: '🇦🇪', name: 'UAE' },
    { code: '+61', flag: '🇦🇺', name: 'Australia' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.trim().length < 8) {
      setError('Please enter a valid phone number (at least 8 digits)');
      return;
    }
    setError('');
    onSendOtp(`${countryCode} ${phoneNumber.trim()}`);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <div id="login-card" className="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
        
        {/* Back and Logo */}
        <div className="flex items-center justify-between mb-8">
          {onBack ? (
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              id="login-back-btn"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-5" />
          )}
          
          <div className="flex flex-col items-center">
            <span id="login-brand" className="text-3xl font-extrabold text-blue-600 tracking-tight flex items-start leading-none">
              Niklo<span className="text-[10px] font-bold text-blue-400 select-none ml-0.5">TM</span>
            </span>
            <span className="text-[8px] font-bold text-slate-400 tracking-[0.2em] mt-1 uppercase leading-none">
              Kahi Bhi, Kabhi Bhi
            </span>
          </div>
          <div className="w-5" />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h2 id="login-heading" className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome Back
          </h2>
          <p id="login-subheading" className="text-sm text-slate-500 mt-1">
            Continue exploring smarter travel.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div id="phone-input-container" className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Phone Number
            </label>
            <div className="flex gap-2 relative">
              {/* Country Code Dropdown Select */}
              <div className="relative">
                <button
                  type="button"
                  id="country-code-btn"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="h-14 px-3 flex items-center gap-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-2xl transition-colors cursor-pointer text-sm"
                >
                  <span>{countries.find((c) => c.code === countryCode)?.flag}</span>
                  <span>{countryCode}</span>
                  <span className="text-[10px] text-slate-400">▼</span>
                </button>

                {isDropdownOpen && (
                  <div
                    id="country-dropdown-list"
                    className="absolute z-10 top-full left-0 mt-2 bg-white border border-slate-150 rounded-xl shadow-xl w-40 overflow-hidden divide-y divide-slate-50"
                  >
                    {countries.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setCountryCode(c.code);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm font-medium text-slate-700"
                      >
                        <span>{c.flag}</span>
                        <span>{c.code}</span>
                        <span className="text-xs text-slate-400 ml-auto">{c.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Number Input */}
              <div className="relative flex-1">
                <input
                  type="tel"
                  id="phone-number-field"
                  placeholder="1234567890"
                  value={phoneNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    onPhoneChange(val);
                    if (val) setError('');
                  }}
                  className="w-full h-14 pl-11 pr-4 bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-2xl outline-none text-slate-800 font-semibold tracking-wide transition-all text-sm"
                  maxLength={15}
                  required
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            {error && (
              <p id="phone-validation-error" className="text-xs font-medium text-red-500 mt-1">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            id="login-submit-btn"
            className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold h-14 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm"
          >
            <span>Send OTP</span>
            <span>→</span>
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center border-t border-slate-50 pt-6">
          <p className="text-sm text-slate-500" id="login-footer-text">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-blue-600 hover:text-blue-700 font-bold hover:underline cursor-pointer"
              id="goto-signup-btn"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
