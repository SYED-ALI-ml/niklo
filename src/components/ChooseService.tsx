import React from 'react';
import { ArrowLeft, MapPin, Bus, Car, Hotel, Compass, Sparkles, Navigation } from 'lucide-react';

interface ChooseServiceProps {
  user: { name: string; phone: string; language: string } | null;
  onNavigate: (view: string) => void;
  onSelectService: (service: 'bus' | 'cab' | 'hotel' | 'adventure') => void;
}

export default function ChooseService({
  user,
  onNavigate,
  onSelectService,
}: ChooseServiceProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-8 animate-fade-in text-slate-800" id="choose-service-page">
      
      {/* 1. Back button & Title Header matching Screenshot 3 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-150 pb-5" id="choose-service-header">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="p-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-full cursor-pointer text-slate-500 hover:text-slate-900 transition-colors"
            title="Navigate Home"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="text-left">
            <h1 className="text-xl md:text-2xl font-black text-slate-900">Choose a service</h1>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
              Book buses, cabs, hotels & adventures
            </p>
          </div>
        </div>

        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 leading-none">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
          <span>Fares Guaranteed Lowest</span>
        </div>
      </div>

      {/* 2. Coordinates Summary Bar matching Screenshot 3 */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-6" id="location-summary-card">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 border-r-0 md:border-r border-slate-100 pr-4">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full shrink-0" />
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Your Location</span>
              <strong className="text-sm font-extrabold text-slate-800 truncate block">Current Location</strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full shrink-0" />
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Where are you going?</span>
              <strong className="text-sm font-extrabold text-slate-800 truncate block">375, Prince Anwar Shah Rd</strong>
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate('plan-ride')}
          className="bg-slate-50 hover:bg-slate-100 text-blue-600 border border-slate-200 px-4 py-2.5 h-11 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer w-full md:w-auto shrink-0"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Open Map</span>
        </button>
      </div>

      {/* 3. "What are you looking for?" Bento Grid matching Screenshot 3 boxes */}
      <div className="space-y-5" id="looking-for-block">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 text-left">What are you looking for?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Box 1: Bus Booking */}
          <div 
            onClick={() => onSelectService('bus')}
            className="bg-white hover:bg-blue-50/10 border border-slate-100 hover:border-blue-200 shadow-sm rounded-3xl p-6 flex flex-col justify-between min-h-[190px] text-left hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-600">Bus Booking</h4>
                <p className="text-xs text-slate-500 font-semibold">Intercity & local buses</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <Bus className="w-6 h-6" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <span className="text-xs text-blue-600 font-extrabold group-hover:underline">Find routes ➔</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Starting at ₹99</span>
            </div>
          </div>

          {/* Box 2: Car Rides */}
          <div 
            onClick={() => onSelectService('cab')}
            className="bg-white hover:bg-amber-50/10 border border-slate-100 hover:border-amber-200 shadow-sm rounded-3xl p-6 flex flex-col justify-between min-h-[190px] text-left hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h4 className="text-lg font-black text-slate-900 group-hover:text-amber-600">Car Rides</h4>
                <p className="text-xs text-slate-500 font-semibold">Cabs & outstation trips</p>
              </div>
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                <Car className="w-6 h-6" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <span className="text-xs text-amber-600 font-extrabold group-hover:underline">Book ride ➔</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Fastest dispatcher</span>
            </div>
          </div>

          {/* Box 3: Hotels */}
          <div 
            onClick={() => onSelectService('hotel')}
            className="bg-white hover:bg-emerald-50/10 border border-slate-100 hover:border-emerald-200 shadow-sm rounded-3xl p-6 flex flex-col justify-between min-h-[190px] text-left hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h4 className="text-lg font-black text-slate-900 group-hover:text-emerald-600">Hotels</h4>
                <p className="text-xs text-slate-500 font-semibold">Find comfortable stays</p>
              </div>
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                <Hotel className="w-6 h-6" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <span className="text-xs text-emerald-600 font-extrabold group-hover:underline">Explore hotels ➔</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Top-rated amenities</span>
            </div>
          </div>

          {/* Box 4: Adventure */}
          <div 
            onClick={() => onSelectService('adventure')}
            className="bg-white hover:bg-indigo-50/10 border border-slate-100 hover:border-indigo-200 shadow-sm rounded-3xl p-6 flex flex-col justify-between min-h-[190px] text-left hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h4 className="text-lg font-black text-slate-900 group-hover:text-indigo-600">Adventure</h4>
                <p className="text-xs text-slate-500 font-semibold">Water sports, safari & more</p>
              </div>
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <span className="text-xs text-indigo-600 font-extrabold group-hover:underline">Discover more ➔</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Expert guides</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. AI Trip Planner bottom banner, matching Screenshot 3 colors and elements */}
      <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-800 text-white p-8 md:p-10 shadow-xl relative flex flex-col md:flex-row items-center justify-between gap-6" id="ai-trip-detail-banner">
        
        {/* Floating 3D assets abstract mockups (using beautiful SVG) */}
        <div className="absolute top-0 bottom-0 right-0 w-1/2 opacity-15 pointer-events-none hidden md:block">
          <svg className="w-full h-full" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="100" r="80" stroke="#FFFFFF" strokeWidth="6" />
            <path d="M150 150 Q220 50 280 150" stroke="#FFFFFF" strokeWidth="4" />
          </svg>
        </div>

        <div className="space-y-3 max-w-xl text-left relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-200 animate-spin" />
            <span>AI Dispatch Optimization</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight">
            AI Trip Planner Banner
          </h3>
          <p className="text-sm text-blue-100 font-medium leading-relaxed">
            Tell us your destination and get a complete itinerary instantly. Configure stays, local transit, meals, and tickets with one smart prompt.
          </p>
          <button
            onClick={() => onSelectService('bus')}
            className="bg-white hover:bg-slate-50 text-indigo-700 font-extrabold text-xs px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer"
          >
            Plan My Trip ➔
          </button>
        </div>

        {/* 3D travel assets rendering representation (suitcases, globe, passport) */}
        <div className="shrink-0 relative w-32 h-32 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-inner z-10">
          <svg viewBox="0 0 100 100" className="w-24 h-24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Suitcase */}
            <rect x="25" y="35" width="50" height="42" rx="8" fill="#F59E0B" />
            <rect x="38" y="25" width="24" height="10" rx="3" fill="none" stroke="#F59E0B" strokeWidth="4" />
            {/* Straps */}
            <rect x="36" y="35" width="6" height="42" fill="#D97706" />
            <rect x="58" y="35" width="6" height="42" fill="#D97706" />
            {/* Globe wire */}
            <circle cx="50" cy="56" r="16" fill="#3B82F6" opacity="0.3" />
            <path d="M40 56 Q50 46 60 56" stroke="#93C5FD" strokeWidth="2" fill="none" />
            <path d="M40 56 Q50 66 60 56" stroke="#93C5FD" strokeWidth="2" fill="none" />
            {/* Passport badge sticker */}
            <circle cx="45" cy="45" r="5" fill="#EF4444" />
          </svg>
        </div>
      </div>

    </div>
  );
}
