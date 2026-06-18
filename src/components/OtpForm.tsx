import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, RefreshCw, KeyRound } from 'lucide-react';

interface OtpFormProps {
  phoneNumber: string;
  onVerifyOtp: (code: string) => void;
  onEditPhone: () => void;
  onBack?: () => void;
}

export default function OtpForm({
  phoneNumber,
  onVerifyOtp,
  onEditPhone,
  onBack,
}: OtpFormProps) {
  const [otpCodes, setOtpCodes] = useState<string[]>(Array(6).fill(''));
  const [secondsLeft, setSecondsLeft] = useState(54);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer loop
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  // Handle value change for indices
  const handleChange = (value: string, index: number) => {
    // Keep only numbers
    const cleanVal = value.replace(/\D/g, '');
    if (!cleanVal) {
      const newOtp = [...otpCodes];
      newOtp[index] = '';
      setOtpCodes(newOtp);
      return;
    }

    const valToUse = cleanVal[cleanVal.length - 1]; // take last input digit
    const newOtp = [...otpCodes];
    newOtp[index] = valToUse;
    setOtpCodes(newOtp);
    setError('');

    // Advance focus
    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Keyboard Navigation: Backspace goes back
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!otpCodes[index] && index > 0 && inputRefs.current[index - 1]) {
        const newOtp = [...otpCodes];
        newOtp[index - 1] = '';
        setOtpCodes(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otpCodes];
        newOtp[index] = '';
        setOtpCodes(newOtp);
      }
    }
  };

  // Paste handler
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasteData) return;

    const newOtp = Array(6).fill('');
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }
    setOtpCodes(newOtp);
    setError('');

    // Focus last active or next empty
    const focusIndex = Math.min(pasteData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    setSecondsLeft(59);
    setOtpCodes(Array(6).fill(''));
    setError('');
    // Clear code and trigger focus to first field
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const joinedCode = otpCodes.join('');
    if (joinedCode.length < 6) {
      setError('Please enter the full 6-digit verification code.');
      return;
    }
    setError('');
    onVerifyOtp(joinedCode);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <div id="otp-card" className="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
        
        {/* Navigation back and Brand */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack || onEditPhone}
            className="p-2 rounded-full hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            id="otp-back-btn"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col items-center">
            <span id="otp-brand" className="text-3xl font-extrabold text-blue-600 tracking-tight flex items-start leading-none">
              Niklo<span className="text-[10px] font-bold text-blue-400 select-none ml-0.5">TM</span>
            </span>
            <span className="text-[8px] font-bold text-slate-400 tracking-[0.2em] mt-1 uppercase leading-none">
              Kahi Bhi, Kabhi Bhi
            </span>
          </div>
          <div className="w-5" />
        </div>

        {/* Header Text */}
        <div className="text-center mb-8">
          <h2 id="otp-heading" className="text-2xl font-bold text-slate-900 tracking-tight">
            Enter OTP
          </h2>
          <p id="otp-subheading" className="text-sm text-slate-500 mt-2 leading-relaxed">
            We've sent a 6-digit verification code to <br />
            <strong className="text-slate-800 font-semibold">{phoneNumber}</strong>{' '}
            <button
              type="button"
              onClick={onEditPhone}
              className="text-blue-600 hover:text-blue-700 hover:underline font-bold text-xs ml-1"
              id="otp-edit-phone-btn"
            >
              (Edit)
            </button>
          </p>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2 md:gap-3" id="otp-inputs-row">
            {otpCodes.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => { inputRefs.current[idx] = el; }}
                type="text"
                maxLength={1}
                value={digit}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onChange={(e) => handleChange(e.target.value, idx)}
                onPaste={idx === 0 ? handlePaste : undefined}
                className="w-12 h-14 md:w-14 text-center bg-slate-50 border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl outline-none text-xl font-bold text-slate-800 transition-all focus:bg-white"
                autoComplete="one-time-code"
                id={`otp-input-box-${idx}`}
              />
            ))}
          </div>

          {error && (
            <p id="otp-validation-error" className="text-xs font-semibold text-red-500 text-center">
              {error}
            </p>
          )}

          {/* Resend Code Section */}
          <div className="text-center text-sm" id="otp-resend-container">
            <span className="text-slate-500">Didn't receive the code? </span>
            {secondsLeft > 0 ? (
              <span className="text-slate-400 font-medium">
                Resend Code in <b className="text-slate-700 font-bold">{formatTime(secondsLeft)}</b>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-blue-600 hover:text-blue-700 font-bold hover:underline cursor-pointer inline-flex items-center gap-1"
                id="otp-resend-btn"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Resend Code</span>
              </button>
            )}
          </div>

          <button
            type="submit"
            id="otp-verify-btn"
            className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold h-14 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm"
          >
            <KeyRound className="w-4 h-4" />
            <span>Verify OTP</span>
          </button>
        </form>

        {/* Agreement Text terms and Conditions */}
        <p className="text-[10px] text-slate-400 text-center leading-relaxed mt-8 max-w-xs mx-auto" id="otp-terms">
          By logging in, you agree to Niklo's{' '}
          <a href="#terms" className="text-blue-500 hover:underline">
            Terms & Conditions
          </a>{' '}
          and{' '}
          <a href="#privacy" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
          .
        </p>

      </div>
    </div>
  );
}
