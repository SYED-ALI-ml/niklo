import React, { useState } from 'react';
import { User, Phone, ArrowLeft } from 'lucide-react';

interface SignupFormProps {
  fullName: string;
  phoneNumber: string;
  onFullNameChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
  onSignup: (name: string, phoneWithCode: string) => void;
  onSwitchToLogin: () => void;
  onBack?: () => void;
}

export default function SignupForm({
  fullName,
  phoneNumber,
  onFullNameChange,
  onPhoneChange,
  onSignup,
  onSwitchToLogin,
  onBack,
}: SignupFormProps) {
  const [countryCode, setCountryCode] = useState('+91');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const countries = [
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+1', flag: '🇺🇸', name: 'USA/Canada' },
    { code: '+44', flag: '🇬🇧', name: 'UK' },
    { code: '+971', flag: '🇦🇪', name: 'UAE' },
    { code: '+61', flag: '🇦🇺', name: 'Australia' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; phone?: string } = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.name = 'Please enter your full name (at least 2 characters)';
    }

    if (!phoneNumber || phoneNumber.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone number (at least 8 digits)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSignup(fullName.trim(), `${countryCode} ${phoneNumber.trim()}`);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <div id="signup-card" className="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
        
        {/* Header navigation & Brand */}
        <div className="flex items-center justify-between mb-8">
          {onBack ? (
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              id="signup-back-btn"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-5" />
          )}

          <div className="flex flex-col items-center">
            <span id="signup-brand" className="text-3xl font-extrabold text-blue-600 tracking-tight flex items-start leading-none">
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
          <h2 id="signup-heading" className="text-2xl font-bold text-slate-900 tracking-tight">
            Create Your Account
          </h2>
          <p id="signup-subheading" className="text-sm text-slate-500 mt-1">
            Start your journey with smarter travel.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name field */}
          <div id="name-input-container" className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="full-name-field"
                placeholder="Enter full name"
                value={fullName}
                onChange={(e) => {
                  onFullNameChange(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                className="w-full h-14 pl-11 pr-4 bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-2xl outline-none text-slate-800 font-semibold tracking-wide transition-all text-sm"
                required
              />
              <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
            {errors.name && (
              <p id="name-validation-error" className="text-xs font-medium text-red-500 mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone Number Field */}
          <div id="signup-phone-container" className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Phone Number
            </label>
            <div className="flex gap-2 relative">
              {/* Country Code dropdown */}
              <div className="relative">
                <button
                  type="button"
                  id="signup-country-code-btn"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="h-14 px-3 flex items-center gap-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-2xl transition-colors cursor-pointer text-sm"
                >
                  <span>{countries.find((c) => c.code === countryCode)?.flag}</span>
                  <span>{countryCode}</span>
                  <span className="text-[10px] text-slate-400">▼</span>
                </button>

                {isDropdownOpen && (
                  <div
                    id="signup-country-dropdown"
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
                  id="signup-phone-field"
                  placeholder="1234567890"
                  value={phoneNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    onPhoneChange(val);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  className="w-full h-14 pl-11 pr-4 bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-2xl outline-none text-slate-800 font-semibold tracking-wide transition-all text-sm"
                  maxLength={15}
                  required
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            {errors.phone && (
              <p id="signup-phone-error" className="text-xs font-medium text-red-500 mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          <button
            type="submit"
            id="signup-submit-btn"
            className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold h-14 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm"
          >
            <span>Get Started</span>
            <span>→</span>
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center border-t border-slate-50 pt-6">
          <p className="text-sm text-slate-500" id="signup-footer-text">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-700 font-bold hover:underline cursor-pointer"
              id="goto-login-btn"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
