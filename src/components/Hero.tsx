import React, { useState } from 'react';
import { Bus, MapPin, Calendar, ArrowRightLeft, ShieldAlert, Sparkles, Navigation } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onSearchDone: (searchData: { type: 'bus' | 'cab'; from: string; to: string; date: string }) => void;
}

const POPULAR_CITIES = ['Delhi', 'Mumbai', 'Bengaluru', 'Chennai', 'Pune', 'Hyderabad', 'Kolkata'];

export default function Hero({ onGetStarted, onSearchDone }: HeroProps) {
  const [travelType, setTravelType] = useState<'bus' | 'cab'>('bus');
  const [fromCity, setFromCity] = useState('Delhi');
  const [toCity, setToCity] = useState('Mumbai');
  const [travelDate, setTravelDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [routeInfo, setRouteInfo] = useState<string | null>(null);

  const swapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromCity === toCity) {
      setRouteInfo("Source and destination cannot be the same. Try travel between different cities!");
      return;
    }
    setRouteInfo(null);
    onSearchDone({
      type: travelType,
      from: fromCity,
      to: toCity,
      date: travelDate,
    });
  };

  return (
    <div id="hero-block" className="relative bg-gradient-to-b from-blue-700 via-blue-600 to-blue-500 text-white overflow-hidden py-16 md:py-24">
      {/* City outline background design element at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-44 opacity-15 pointer-events-none select-none z-0">
        <svg viewBox="0 0 1440 200" fill="none" className="w-full h-full object-cover object-bottom" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 200 V 160 H 40 V 120 H 60 V 160 H 90 V 130 H 130 V 160 H 150 V 90 H 200 V 160 H 230 V 150 H 280 V 160 H 300 V 140 H 340 V 160 H 380 V 110 H 430 V 160 H 460 V 130 H 510 V 160 H 550 V 100 H 600 V 160 H 650 V 150 H 700 V 160 H 740 V 80 H 790 V 160 H 820 V 140 H 870 V 160 H 920 V 120 H 960 V 160 H 1000 V 140 H 1040 V 160 H 1080 V 90 H 1130 V 160 H 1170 V 130 H 1220 V 160 H 1260 V 150 H 1320 V 160 H 1360 V 110 H 1440 V 200 Z" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Cloud/bubble organic decorations */}
      <div className="absolute top-10 left-10 w-48 h-12 bg-white/5 rounded-full blur-xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-64 h-16 bg-white/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left text panel */}
        <div className="lg:col-span-6 space-y-6 md:space-y-8 text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider" id="hero-badge">
            <Sparkles className="w-3.5 h-3.5 text-blue-200 animate-spin" />
            <span>Kahi Bhi, Kabhi Bhi • Anywhere, Anytime</span>
          </div>

          <h1 id="hero-title" className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight md:leading-[1.1]">
            Your Journey <br className="hidden md:inline" /> Starts Here
          </h1>

          <p id="hero-subtitle" className="text-base md:text-lg text-blue-100 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Book buses, track rides, and travel stressfree with seamless booking. AI-powered intelligent routes planning tailored perfectly for you.
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4" id="hero-cta-group">
            <button
              onClick={onGetStarted}
              id="hero-primary-cta"
              className="bg-white hover:bg-slate-50 text-blue-600 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all cursor-pointer text-sm"
            >
              Get Started Free
            </button>
            <a
              href="#features-section"
              id="hero-secondary-cta"
              className="border-2 border-white/25 hover:border-white text-white hover:bg-white/5 font-bold px-8 py-4 rounded-xl transition-all text-sm block"
            >
              Explore App Features
            </a>
          </div>

          {/* Minimalist Trust metrics */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-md mx-auto lg:mx-0" id="hero-stats">
            <div>
              <p className="text-2xl font-extrabold text-white">500+</p>
              <p className="text-xs text-blue-200 mt-1 font-semibold">Bus Routes</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white">10k+</p>
              <p className="text-xs text-blue-200 mt-1 font-semibold">Daily Bookings</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white">4.8★</p>
              <p className="text-xs text-blue-200 mt-1 font-semibold">App Store Rating</p>
            </div>
          </div>
        </div>

        {/* Right Travel Search widget card panel */}
        <div className="lg:col-span-6" id="hero-widget-panel">
          <div className="bg-white text-slate-800 rounded-3xl shadow-2xl p-6 md:p-8 border border-slate-100 relative">
            
            {/* Widget Mode Picker */}
            <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
              <button
                type="button"
                id="search-mode-bus"
                onClick={() => setTravelType('bus')}
                className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  travelType === 'bus' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <Bus className="w-4 h-4" />
                <span>Intercity Bus</span>
              </button>
              <button
                type="button"
                id="search-mode-cab"
                onClick={() => setTravelType('cab')}
                className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  travelType === 'cab' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <Navigation className="w-4 h-4" />
                <span>Local & Outstation Cab</span>
              </button>
            </div>

            {/* Travel Selector Form */}
            <form onSubmit={handleSearch} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                
                {/* Source Selection */}
                <div id="source-search-group" className="space-y-1 text-left">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">From</label>
                  <div className="relative">
                    <select
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                      className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl font-semibold text-slate-700 outline-none text-sm appearance-none cursor-pointer"
                    >
                      {POPULAR_CITIES.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    <MapPin className="w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* City Swap Button */}
                <button
                  type="button"
                  onClick={swapCities}
                  id="swap-cities-btn"
                  className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-blue-600 shadow-md cursor-pointer flex items-center justify-center z-10 md:block md:-translate-y-0 md:translate-x-0 hidden"
                  title="Swap Cities"
                >
                  <ArrowRightLeft className="w-4 h-4 mx-auto" />
                </button>

                {/* Destination Selection */}
                <div id="dest-search-group" className="space-y-1 text-left">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">To</label>
                  <div className="relative">
                    <select
                      value={toCity}
                      onChange={(e) => setToCity(e.target.value)}
                      className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl font-semibold text-slate-700 outline-none text-sm appearance-none cursor-pointer"
                    >
                      {POPULAR_CITIES.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    <MapPin className="w-4 h-4 text-red-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

              </div>

              {/* Date Input */}
              <div id="date-search-group" className="space-y-1 text-left">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Departure Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 outline-none text-sm cursor-pointer"
                  />
                  <Calendar className="w-4 h-4 text-emerald-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {routeInfo && (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium flex items-center gap-2 text-left">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{routeInfo}</span>
                </div>
              )}

              {/* Submit Widget Button */}
              <button
                type="submit"
                id="search-submit-btn"
                className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-bold h-14 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
              >
                <span>Search {travelType === 'bus' ? 'Buses' : 'Cabs'}</span>
                <span>→</span>
              </button>

            </form>

            <div className="mt-4 pt-3 text-center border-t border-slate-50">
              <span className="text-xs text-slate-400 font-medium">
                ⚡ Search over 1,200 active routes with verified operators
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
