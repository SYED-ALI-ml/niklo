import React, { useState } from 'react';
import { Menu, X, LogOut, User, Globe, Bus } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  user: { name: string; phone: string; language: string } | null;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export default function Navbar({
  currentView,
  user,
  onNavigate,
  onLogout,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'language', label: 'Language' },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setIsOpen(false);
  };

  const getLanguageName = (code: string) => {
    const names: Record<string, string> = {
      en: 'English',
      hi: 'हिंदी',
      te: 'తెలుగు',
      kn: 'ಕನ್ನಡ',
      ta: 'தமிழ்',
      mr: 'मराठी',
      bn: 'বাংলা',
      ml: 'മലയാളം',
    };
    return names[code] || 'English';
  };

  return (
    <nav id="main-nav-bar" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo & slogan */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex flex-col items-start hover:opacity-90 transition-opacity cursor-pointer text-left"
          id="nav-logo-btn"
        >
          <span className="text-2xl font-extrabold text-blue-600 tracking-tight flex items-start leading-none">
            Niklo<span className="text-[10px] font-bold text-blue-400 select-none ml-0.5">TM</span>
          </span>
          <span className="text-[7px] font-bold text-slate-400 tracking-[0.2em] mt-1 uppercase leading-none">
            Kahi Bhi, Kabhi Bhi
          </span>
        </button>

        {/* Desktop Menu links */}
        <div id="desktop-menu" className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-semibold transition-colors duration-250 cursor-pointer ${
                currentView === item.id
                  ? 'text-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* User state buttons */}
          {user ? (
            <div className="flex items-center gap-4 pl-4 border-l border-slate-100" id="user-logged-in-nav-controls">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-150 px-3.5 py-1.5 rounded-full">
                <div className="w-5.5 h-5.5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold font-mono">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 leading-none truncate max-w-[80px]">{user.name}</span>
                  <span className="text-[9px] font-medium text-slate-400 mt-0.5">{getLanguageName(user.language)}</span>
                </div>
              </div>
              
              <button
                id="nav-logout-btn"
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4 pl-4 border-l border-slate-100" id="user-logged-out-nav-controls">
              <button
                id="nav-login-link-btn"
                onClick={() => handleNavClick('login')}
                className="text-sm font-bold text-slate-600 hover:text-blue-600 cursor-pointer transition-colors"
              >
                Log In
              </button>
              
              <button
                id="nav-signup-link-btn"
                onClick={() => handleNavClick('signup')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-5 rounded-xl cursor-pointer shadow-md shadow-blue-500/10 active:scale-[0.98] transition-all"
              >
                Get Started
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          id="mobile-menu-trigger"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div id="mobile-menu-drawer" className="md:hidden border-t border-slate-100 bg-white px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-base font-bold py-2 ${
                  currentView === item.id ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-4 mt-2">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold font-mono">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-800">{user.name}</h5>
                    <p className="text-[10px] text-slate-400 font-medium">{user.phone} • {getLanguageName(user.language)}</p>
                  </div>
                </div>
                
                <button
                  id="mobile-nav-logout"
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                  className="w-full h-11 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <button
                  id="mobile-nav-login"
                  onClick={() => handleNavClick('login')}
                  className="w-full h-11 border border-slate-200 hover:bg-slate-50 font-bold rounded-xl text-sm text-slate-700 transition-all cursor-pointer"
                >
                  Log In
                </button>
                <button
                  id="mobile-nav-signup"
                  onClick={() => handleNavClick('signup')}
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-blue-500/15 cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
