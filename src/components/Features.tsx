import React, { useState } from 'react';
import { Bus, Map, Shield, Navigation, Compass, Calendar, ChevronRight } from 'lucide-react';

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  color: string;
  icon: React.ReactNode;
  illustration: React.ReactNode;
}

export default function Features() {
  const [activeSlide, setActiveSlide] = useState(0);

  const featuresList: FeatureItem[] = [
    {
      id: 'all-in-one',
      badge: 'Integrated Platform',
      title: 'All-in-One Travel Platform',
      description: 'Bus bookings, cab rides and long journey planning – everything in one seamless app. Forget juggling multiple tickets.',
      color: 'blue',
      icon: <Bus className="w-6 h-6 text-blue-600" />,
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="24" fill="#EFF6FF" />
          {/* Clouds */}
          <path d="M50 100 C 60 85, 90 85, 100 100 C 110 90, 130 90, 140 100 L 50 100" fill="#FFFFFF" opacity="0.9" />
          <path d="M280 80 C 290 65, 320 65, 330 80 C 340 70, 360 70, 370 80 L 280 80" fill="#FFFFFF" opacity="0.7" />
          {/* Road */}
          <rect x="0" y="200" width="400" height="100" fill="#E2E8F0" />
          <line x1="0" y1="230" x2="400" y2="230" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="16 12" />
          
          {/* Web Dashboard Window Frame */}
          <rect x="110" y="45" width="180" height="140" rx="12" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />
          <rect x="110" y="45" width="180" height="24" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
          {/* Browser Window Control Dots */}
          <circle cx="122" cy="57" r="3.5" fill="#EF4444" />
          <circle cx="130" cy="57" r="3.5" fill="#F59E0B" />
          <circle cx="138" cy="57" r="3.5" fill="#10B981" />
          {/* Address Bar */}
          <rect x="150" y="51" width="125" height="12" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          
          {/* Maps marker and route on web dashboard screen */}
          <path d="M130 140 Q 200 85 250 110" stroke="#3B82F6" strokeWidth="3" fill="none" strokeDasharray="4 2" />
          <circle cx="130" cy="140" r="5" fill="#10B981" />
          <circle cx="250" cy="110" r="5" fill="#EF4444" />
          
          {/* Vector Bus */}
          <g transform="translate(40, 145)">
            <rect x="0" y="10" width="90" height="42" rx="8" fill="#3B82F6" />
            <rect x="10" y="15" width="22" height="12" rx="2" fill="#E0F2FE" />
            <rect x="38" y="15" width="22" height="12" rx="2" fill="#E0F2FE" />
            <rect x="66" y="15" width="18" height="12" rx="2" fill="#1E293B" />
            <rect x="0" y="38" width="85" height="4" fill="#1E293B" />
            <circle cx="20" cy="52" r="8" fill="#1E293B" />
            <circle cx="20" cy="52" r="4" fill="#94A3B8" />
            <circle cx="70" cy="52" r="8" fill="#1E293B" />
            <circle cx="70" cy="52" r="4" fill="#94A3B8" />
          </g>
          
          {/* Vector Cab */}
          <g transform="translate(260, 165)">
            <rect x="10" y="12" width="70" height="24" rx="6" fill="#FBBF24" />
            <path d="M20 12 L 30 2 L 60 2 L 70 12 Z" fill="#1E293B" />
            <rect x="40" y="0" width="12" height="4" fill="#FBBF24" />
            <circle cx="25" cy="36" r="6" fill="#1E293B" />
            <circle cx="65" cy="36" r="6" fill="#1E293B" />
            <rect x="15" y="20" width="15" height="6" fill="#FFFFFF" opacity="0.8" />
          </g>
        </svg>
      ),
    },
    {
      id: 'plan-smarter',
      badge: 'AI Engine',
      title: 'Plan Smarter, Travel Better',
      description: 'Our AI-powered journey planner creates the best multi-leg itineraries for your perfect trip. Save fuel, time, and stress.',
      color: 'emerald',
      icon: <Compass className="w-6 h-6 text-emerald-600" />,
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="24" fill="#ECFDF5" />
          
          {/* Trace route map connectors */}
          <path d="M80 200 C 120 120, 180 250, 240 140 C 280 80, 320 120, 340 70" stroke="#10B981" strokeWidth="4" strokeLinecap="round" fill="none" strokeDasharray="8 8" />
          
          {/* Point markers with pulses */}
          <g transform="translate(80, 200)">
            <circle cx="0" cy="0" r="14" fill="#A7F3D0" opacity="0.6" className="animate-ping" />
            <circle cx="0" cy="0" r="8" fill="#10B981" />
          </g>
          
          <g transform="translate(240, 140)">
            <circle cx="0" cy="0" r="14" fill="#A7F3D0" opacity="0.6" />
            <circle cx="0" cy="0" r="8" fill="#10B981" />
          </g>
          
          <g transform="translate(340, 70)">
            <circle cx="0" cy="0" r="14" fill="#FCA5A5" opacity="0.6 animate-pulse" />
            <circle cx="0" cy="0" r="8" fill="#EF4444" />
          </g>

          {/* Traveler suitcase cartoon sticker */}
          <g transform="translate(140, 60)">
            <rect x="0" y="10" width="50" height="36" rx="6" fill="#059669" />
            <rect x="15" y="2" width="20" height="8" rx="2" fill="none" stroke="#059669" strokeWidth="4" />
            <rect x="8" y="16" width="34" height="2" fill="#34D399" />
            {/* Travel Stickers */}
            <rect x="12" y="24" width="10" height="10" rx="2" fill="#F59E0B" />
            <circle cx="34" cy="28" r="5" fill="#3B82F6" />
          </g>

          {/* Connected dashboard widget card with route list */}
          <g transform="translate(250, 160)">
            <rect x="0" y="0" width="90" height="90" rx="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" className="shadow-lg" />
            <rect x="10" y="10" width="70" height="6" rx="3" fill="#10B981" />
            <rect x="10" y="24" width="50" height="5" rx="2" fill="#E2E8F0" />
            <rect x="10" y="34" width="40" height="5" rx="2" fill="#E2E8F0" />
            <circle cx="75" cy="26" r="4" fill="#3B82F6" />
            <circle cx="75" cy="36" r="4" fill="#10B981" />
            <rect x="10" y="55" width="70" height="24" rx="6" fill="#F0FDF4" />
            <rect x="18" y="61" width="30" height="4" rx="2" fill="#10B981" />
            <rect x="18" y="70" width="40" height="3" rx="1.5" fill="#A7F3D0" />
          </g>
        </svg>
      ),
    },
    {
      id: 'reliable',
      badge: 'Trust & Safety',
      title: 'Safe, Secure & Reliable',
      description: 'Verified partners, live tracking, 24/7 support and secure payments for a worry-free journey. Your protection is our duty.',
      color: 'indigo',
      icon: <Shield className="w-6 h-6 text-indigo-600" />,
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="24" fill="#EEF2FF" />
          
          {/* Shield Art */}
          <g transform="translate(200, 140)">
            <path d="M-40 -60 C -10 -70, 10 -70, 40 -60 C 40 0, 35 40, 0 70 C -35 40, -40 0, -40 -60 Z" fill="#6366F1" />
            <path d="M-32 -52 C -8 -60, 8 -60, 32 -52 C 32 0, 28 32, 0 58 C -28 32, -32 0, -32 -52 Z" fill="#4F46E5" />
            {/* Big check icon inside shield */}
            <path d="M-14 2 L -4 12 L 18 -10" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
          
          {/* Security lock icon */}
          <g transform="translate(90, 80)">
            <rect x="0" y="15" width="36" height="26" rx="6" fill="#3B82F6" />
            <path d="M6 15 V 9 C 6 4, 12 1, 18 1 C 24 1, 30 4, 30 15 V 15" stroke="#3B82F6" strokeWidth="4" fill="none" />
            <circle cx="18" cy="28" r="4" fill="#FFFFFF" />
          </g>

          {/* Secure chip validation cards */}
          <g transform="translate(280, 70)">
            <rect x="0" y="0" width="80" height="50" rx="6" fill="#1E293B" transform="rotate(10)" />
            <rect x="8" y="10" width="16" height="12" rx="2" fill="#F59E0B" transform="rotate(10)" />
            <rect x="40" y="30" width="30" height="5" rx="1" fill="#FFFFFF" opacity="0.3" transform="rotate(10)" />
          </g>
          
          {/* Verified badges details */}
          <g transform="translate(90, 180)" className="shadow">
            <rect x="0" y="0" width="100" height="36" rx="18" fill="#FFFFFF" />
            <circle cx="18" cy="18" r="10" fill="#10B981" />
            <path d="M14 18 L 17 21 L 22 15" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
            <rect x="36" y="12" width="50" height="5" rx="2" fill="#E2E8F0" />
            <rect x="36" y="21" width="35" height="4" rx="2" fill="#F1F5F9" />
          </g>
        </svg>
      ),
    },
    {
      id: 'live-tracking',
      badge: 'Realtime Alerts',
      title: 'Live Tracking & Safety',
      description: 'Always stay updated with precise live tracking of your buses and cabs, so you arrive peacefully and stress-free.',
      color: 'blue',
      icon: <Navigation className="w-6 h-6 text-sky-600" />,
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="24" fill="#F0F9FF" />
          
          {/* Curved road */}
          <path d="M0 220 Q 150 160 200 120 T 400 50" stroke="#D1D5DB" strokeWidth="24" fill="none" />
          <path d="M0 220 Q 150 160 200 120 T 400 50" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="4 6" fill="none" />

          {/* Active travel pin tracking */}
          <g transform="translate(195, 110)">
            <circle cx="0" cy="0" r="12" fill="#0284C7" opacity="0.4" className="animate-ping" />
            <circle cx="0" cy="0" r="6" fill="#0284C7" />
          </g>

          {/* Floating alert card: Arriving Soon */}
          <g transform="translate(230, 140)">
            <rect x="0" y="0" width="130" height="64" rx="14" fill="#FFFFFF" className="shadow-xl" stroke="#E0F2FE" strokeWidth="1" />
            <rect x="12" y="12" width="12" height="12" rx="6" fill="#10B981" />
            <text x="30" y="22" fill="#1E293B" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Arriving Soon</text>
            <text x="12" y="44" fill="#0284C7" fontSize="16" fontWeight="extrabold" fontFamily="sans-serif">03:45 mins</text>
          </g>

          {/* Floating alert card: Live tracking status */}
          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="140" height="50" rx="14" fill="#0284C7" className="shadow-lg" />
            <circle cx="24" cy="25" r="10" fill="#E0F2FE" />
            <path d="M22 21 L 22 25 L 26 25" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" fill="none" />
            <text x="44" y="24" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Live Tracking</text>
            <text x="44" y="37" fill="#E0F2FE" fontSize="8" fontFamily="sans-serif">Synced with GPS</text>
          </g>
        </svg>
      ),
    },
  ];

  return (
    <section id="features-section" className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-4 py-1.5 rounded-full inline-block mb-3">
            Why Niklo
          </span>
          <h2 id="features-heading" className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Designed for Seamless Travel
          </h2>
          <p className="text-lg text-slate-500 mt-4 leading-relaxed">
            Rebuilt from the ground up for travelers, commuters, and daily routes. Discover our primary platform pillars.
          </p>
        </div>

        {/* Desktop View: Interactive Feature Hub */}
        <div className="hidden lg:grid grid-cols-12 gap-10 items-center">
          
          {/* Left panel: List navigation selectors */}
          <div className="col-span-5 space-y-4" id="features-selector-list">
            {featuresList.map((f, idx) => (
              <button
                key={f.id}
                id={`feature-tab-${f.id}`}
                onClick={() => setActiveSlide(idx)}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-4 ${
                  activeSlide === idx
                    ? 'bg-white border-blue-100 shadow-xl ring-1 ring-blue-500/10'
                    : 'bg-transparent border-transparent hover:bg-white/50 hover:border-slate-100'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  activeSlide === idx ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'
                }`}>
                  {f.icon}
                </div>
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                    activeSlide === idx ? 'text-blue-500' : 'text-slate-400'
                  }`}>
                    {f.badge}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{f.title}</h3>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Right panel: Active Illustration visual display container */}
          <div className="col-span-7 bg-white p-8 rounded-3xl border border-slate-100 shadow-xl flex flex-col justify-center items-center h-[420px] relative overflow-hidden" id="features-display-panel">
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-50/20 pointer-events-none" />
            <div className="w-full transform hover:scale-[1.02] transition-transform duration-500">
              {featuresList[activeSlide].illustration}
            </div>
            
            {/* Interactive indicator progress */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center bg-slate-50/80 backdrop-blur-sm p-4 rounded-xl border border-slate-100">
              <span className="text-xs font-bold text-slate-400">
                PILLARS OF TRUST {activeSlide + 1} / {featuresList.length}
              </span>
              <div className="flex gap-1.5">
                {featuresList.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeSlide === i ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Mobile/Tablet View: Responsive Slideshow layout */}
        <div id="features-mobile-carousel" className="lg:hidden space-y-8">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-lg p-6 flex flex-col items-center">
            
            <div className="w-full mb-6 max-w-sm mx-auto">
              {featuresList[activeSlide].illustration}
            </div>

            <div className="w-full text-center space-y-3">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                {featuresList[activeSlide].badge}
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                {featuresList[activeSlide].title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
                {featuresList[activeSlide].description}
              </p>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {featuresList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeSlide === i ? 'w-8 bg-blue-600' : 'w-2.5 bg-slate-200'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex justify-between w-full mt-6 border-t border-slate-100 pt-5">
              <button
                disabled={activeSlide === 0}
                onClick={() => setActiveSlide((prev) => prev - 1)}
                className={`text-sm font-semibold cursor-pointer ${
                  activeSlide === 0 ? 'text-slate-300 pointer-events-none' : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => {
                  if (activeSlide < featuresList.length - 1) {
                    setActiveSlide((prev) => prev + 1);
                  } else {
                    setActiveSlide(0); // wrap around
                  }
                }}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>{activeSlide === featuresList.length - 1 ? 'Start Over' : 'Next'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
