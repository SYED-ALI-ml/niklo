import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import LanguageSelector from './components/LanguageSelector';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import OtpForm from './components/OtpForm';
import BookingDashboard from './components/BookingDashboard';
import ExploreHome from './components/ExploreHome';
import PlanRide from './components/PlanRide';
import ChooseService from './components/ChooseService';
import Footer from './components/Footer';
import { Sparkles, Route, Info, CheckCircle2, ChevronRight, UserCheck } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home'); // home, language, login, signup, otp, dashboard
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  
  // Authentication states
  const [user, setUser] = useState<{ name: string; phone: string; language: string } | null>(null);
  
  // Temporary step caches
  const [tempPhoneWithCode, setTempPhoneWithCode] = useState<string>('');
  const [tempName, setTempName] = useState<string>('');
  const [prevViewOfOtp, setPrevViewOfOtp] = useState<string>('login');
  const [searchCache, setSearchCache] = useState<{ type: 'bus' | 'cab'; from: string; to: string; date: string } | null>(null);

  // Success toast feedback notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleSelectLanguage = (langId: string) => {
    setSelectedLanguage(langId);
    showToast(`Language preference switched to ${langId.toUpperCase()}!`);
  };

  const handleLanguageProceed = () => {
    if (user) {
      setUser({ ...user, language: selectedLanguage });
      setCurrentView('dashboard');
      showToast('Language preference updated inside your active profile.');
    } else {
      setCurrentView('signup');
    }
  };

  const handleSendOtp = (phoneWithCode: string) => {
    setTempPhoneWithCode(phoneWithCode);
    setPrevViewOfOtp('login');
    // Set placeholder name if logging in
    setTempName('Niklo Commuter');
    setCurrentView('otp');
    showToast(`Verification code sent to ${phoneWithCode}. Try code '123456'!`);
  };

  const handleSignup = (name: string, phoneWithCode: string) => {
    setTempName(name);
    setTempPhoneWithCode(phoneWithCode);
    setPrevViewOfOtp('signup');
    setCurrentView('otp');
    showToast(`Verification code generated for ${name}. Try code '123456'!`);
  };

  const handleVerifyOtp = (code: string) => {
    // Authenticate user successfully
    const loggedInUser = {
      name: tempName || 'Niklo Commuter',
      phone: tempPhoneWithCode,
      language: selectedLanguage,
    };
    setUser(loggedInUser);
    setCurrentView('dashboard');
    showToast(`Welcome to Niklo, ${loggedInUser.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    setFullName('');
    setPhoneNumber('');
    setTempName('');
    setTempPhoneWithCode('');
    setSearchCache(null);
    setCurrentView('home');
    showToast('Logged out of Niklo successfully.');
  };

  const handleWidgetSearch = (searchData: { type: 'bus' | 'cab'; from: string; to: string; date: string }) => {
    setSearchCache(searchData);
    if (user) {
      setCurrentView('dashboard');
    } else {
      showToast('Almost there! Please verify your identity first to fetch dynamic operator fleets.');
      setCurrentView('login');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Dynamic top status ribbon for AI Studio demo context */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-6 flex justify-between items-center z-50 border-b border-slate-800" id="top-demo-ribbon">
        <span className="flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          <span>You are experiencing <strong>Niklo</strong> in interactive high-fidelity preview mode.</span>
        </span>
        <div className="hidden sm:flex items-center gap-4">
          <span className="font-semibold text-slate-400">⚡ Client persistence: Local State</span>
          <span className="h-3 w-[1px] bg-slate-800" />
          <span className="text-blue-400 font-bold hover:underline">Vite React Build Ready</span>
        </div>
      </div>

      {/* Main Navigation */}
      <Navbar
        currentView={currentView}
        user={user}
        onNavigate={(view) => {
          if (view === 'home' || view === 'plan-ride' || view === 'services' || view === 'language' || user) {
            setCurrentView(view);
          } else {
            setCurrentView('login');
          }
        }}
        onLogout={handleLogout}
      />

      {/* Floating dynamic confirmation toast alerts */}
      {toastMessage && (
        <div
          id="toast-alert"
          className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white font-semibold text-xs md:text-sm px-5 py-4 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3 animate-slide-in max-w-sm"
        >
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping shrink-0" />
          <p className="leading-tight">{toastMessage}</p>
        </div>
      )}

      {/* Primary Dynamic App Core Switcher */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div className="space-y-0" id="home-view-group">
            <ExploreHome
              user={user}
              onNavigate={setCurrentView}
              onSearchDone={handleWidgetSearch}
              onSelectService={(service) => {
                if (user) {
                  setCurrentView('dashboard');
                } else {
                  showToast(`Accessing ${service.toUpperCase()} module. Standard credentials verification required.`);
                  setCurrentView('login');
                }
              }}
            />
          </div>
        )}

        {currentView === 'plan-ride' && (
          <PlanRide
            user={user}
            onNavigate={setCurrentView}
            onSearchDone={handleWidgetSearch}
          />
        )}

        {currentView === 'services' && (
          <ChooseService
            user={user}
            onNavigate={setCurrentView}
            onSelectService={(service) => {
              if (user) {
                setCurrentView('dashboard');
              } else {
                showToast(`Checking regional operator slots for ${service}. Please verify identity first.`);
                setCurrentView('login');
              }
            }}
          />
        )}

        {currentView === 'language' && (
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onSelect={handleSelectLanguage}
            onProceed={handleLanguageProceed}
            onBack={() => setCurrentView(user ? 'dashboard' : 'home')}
          />
        )}

        {currentView === 'login' && (
          <LoginForm
            phoneNumber={phoneNumber}
            onPhoneChange={setPhoneNumber}
            onSendOtp={handleSendOtp}
            onSwitchToSignup={() => setCurrentView('signup')}
            onBack={() => setCurrentView('home')}
          />
        )}

        {currentView === 'signup' && (
          <SignupForm
            fullName={fullName}
            phoneNumber={phoneNumber}
            onFullNameChange={setFullName}
            onPhoneChange={setPhoneNumber}
            onSignup={handleSignup}
            onSwitchToLogin={() => setCurrentView('login')}
            onBack={() => setCurrentView('home')}
          />
        )}

        {currentView === 'otp' && (
          <OtpForm
            phoneNumber={tempPhoneWithCode}
            onVerifyOtp={handleVerifyOtp}
            onEditPhone={() => setCurrentView(prevViewOfOtp)}
            onBack={() => setCurrentView(prevViewOfOtp)}
          />
        )}

        {currentView === 'dashboard' && user && (
          <BookingDashboard
            user={user}
            initialSearch={searchCache}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Main Website Footer */}
      <Footer onNavigate={(view) => {
        if (view === 'home' || view === 'language' || user) {
          setCurrentView(view);
        } else {
          setCurrentView('login');
        }
      }} />
    </div>
  );
}
