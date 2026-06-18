import React from 'react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer id="website-footer" className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Information column */}
        <div className="space-y-4 md:col-span-2">
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold text-white tracking-tight flex items-start leading-none">
              Niklo<span className="text-[9px] font-bold text-blue-400 select-none ml-0.5">TM</span>
            </span>
            <span className="text-[7px] font-bold text-blue-500 tracking-[0.2em] mt-1 uppercase leading-none">
              Kahi Bhi, Kabhi Bhi
            </span>
          </div>
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
            Niklo is India's leading AI-powered travel network platform that orchestrates seamless multi-leg bus bookings, cab rides, and smarter transit itineraries.
          </p>
          <p className="text-xs text-slate-500">
            © 2026 Niklo Inc. All rights reserved. Registered trademark.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Quick Travel</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-blue-400 font-medium transition-colors cursor-pointer text-left">
                Home / Solutions
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('login')} className="hover:text-blue-400 font-medium transition-colors cursor-pointer text-left">
                Book a Cab / Bus
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('signup')} className="hover:text-blue-400 font-medium transition-colors cursor-pointer text-left">
                Create Account
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('language')} className="hover:text-blue-400 font-medium transition-colors cursor-pointer text-left">
                Select Language
              </button>
            </li>
          </ul>
        </div>

        {/* Support and Legal Column */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Trust & Safety</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#about" className="hover:text-blue-400 transition-colors">About Partners</a>
            </li>
            <li>
              <a href="#help" className="hover:text-blue-400 transition-colors">24/7 Helpline Support</a>
            </li>
            <li>
              <a href="#terms" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            </li>
            <li>
              <a href="#privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  );
}
