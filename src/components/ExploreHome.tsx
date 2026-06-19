import React, { useState } from 'react';
import { Bus, Car, Hotel, Compass, MapPin, Bell, Search, Sparkles, Navigation, QrCode, CheckCircle2, Ticket } from 'lucide-react';

interface ExploreHomeProps {
  user: { name: string; phone: string; language: string } | null;
  onNavigate: (view: string) => void;
  onSearchDone: (searchData: { type: 'bus' | 'cab'; from: string; to: string; date: string }) => void;
  onSelectService: (service: 'bus' | 'cab' | 'hotel' | 'adventure') => void;
}

export default function ExploreHome({
  user,
  onNavigate,
  onSearchDone,
  onSelectService,
}: ExploreHomeProps) {
  const [typedDestination, setTypedDestination] = useState('');
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showActiveTicketModal, setShowActiveTicketModal] = useState(false);

  const recommendedPackages = [
    {
      id: 'rishikesh',
      title: 'Rishikesh',
      tagline: 'Adventure & Yoga',
      price: '₹4,200',
      image: 'https://images.unsplash.com/photo-1545638190-2824e2b5167e?auto=format&fit=crop&q=80&w=400',
      rating: '4.8★'
    },
    {
      id: 'agra',
      title: 'Agra',
      tagline: 'Historical Splendor',
      price: '₹2,800',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=400',
      rating: '4.7★'
    },
    {
      id: 'gangtok',
      title: 'Gangtok',
      tagline: 'Scenic Himalayan Bliss',
      price: '₹5,500',
      image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=400',
      rating: '4.9★'
    }
  ];

  const handleQuickDestinationSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedDestination.trim()) return;
    onSearchDone({
      type: 'bus',
      from: 'Kolkata',
      to: typedDestination.trim(),
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0]
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-8 animate-fade-in text-slate-800" id="explore-home-page">
      {/* 1. Header greeting & notification tracker */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm" id="greeting-panel">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-700 font-extrabold rounded-full flex items-center justify-center text-lg shadow-sm border border-blue-200">
            {user ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-slate-500">Good Morning,</span>
              <span className="text-sm font-extrabold text-blue-600">{user?.name || 'Arjun'}</span>
              <span className="text-sm">👋</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 mt-0.5">
              Where are you traveling today?
            </h1>
          </div>
        </div>

        <div className="relative">
          <button 
            onClick={() => setShowNotificationPopup(!showNotificationPopup)}
            className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full cursor-pointer relative transition-all"
            title="Read Alerts"
          >
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          </button>

          {showNotificationPopup && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-150 rounded-2xl shadow-xl z-50 p-4 divide-y divide-slate-100">
              <div className="pb-2 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900">Notifications</span>
                <span className="text-[10px] text-blue-600 font-bold">Mark all as read</span>
              </div>
              <div className="py-3 space-y-2">
                <div className="flex items-start gap-2.5">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                  <p className="text-xs text-slate-600 leading-snug">
                    Your bus booking <strong>BBTC-89021 (Kolkata to Digha)</strong> has completed. Live GPS link is now active.
                  </p>
                </div>
                <div className="flex items-start gap-2.5 pt-2 border-t border-slate-50">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                  <p className="text-xs text-slate-600 leading-snug">
                    Referral success! <strong>Amit Roy</strong> signed up using your code. ₹100 added to wallet.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Banner card element matching screenshot layout perfectly */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white shadow-xl min-h-[340px] flex flex-col justify-between p-8 md:p-12" id="landing-main-banner">
        {/* Modern decorative cloud shapes and vectors */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full object-cover" viewBox="0 0 1000 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 400 L400 200 L1000 400 Z" fill="#FFFFFF" />
            <circle cx="800" cy="100" r="150" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Floating bus graphic sticker layer */}
        <div className="absolute bottom-6 right-8 hidden lg:block w-[400px] h-[200px] pointer-events-none animate-pulse">
          <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="50" y="80" width="300" height="90" rx="16" fill="#FFFFFF" />
            <rect x="40" y="110" width="320" height="50" rx="8" fill="#FFFFFF" />
            {/* Windows */}
            <rect x="70" y="94" width="45" height="24" rx="4" fill="#3B82F6" />
            <rect x="125" y="94" width="45" height="24" rx="4" fill="#3B82F6" />
            <rect x="180" y="94" width="45" height="24" rx="4" fill="#3B82F6" />
            <rect x="235" y="94" width="45" height="24" rx="4" fill="#3B82F6" />
            <rect x="290" y="94" width="45" height="24" rx="4" fill="#1E293B" />
            {/* Wheels */}
            <circle cx="110" cy="170" r="18" fill="#1E293B" />
            <circle cx="110" cy="170" r="6" fill="#E2E8F0" />
            <circle cx="290" cy="170" r="18" fill="#1E293B" />
            <circle cx="290" cy="170" r="6" fill="#E2E8F0" />
            <path d="M50 150 Q120 135 200 150 T350 150" stroke="#3B82F6" strokeWidth="4" />
          </svg>
        </div>

        <div className="max-w-xl space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-blue-200 animate-spin" />
            <span>Kahi Bhi, Kabhi Bhi</span>
          </span>
          <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
            Plan your journey,<br />we'll take care<br />of the rest.
          </h2>
        </div>

        {/* Search destination input inside actual banner */}
        <div className="w-full max-w-2xl bg-white text-slate-800 rounded-2xl md:rounded-full p-2 shadow-2xl mt-8 flex flex-col md:flex-row items-center gap-2 relative z-10 border border-slate-100">
          <form onSubmit={handleQuickDestinationSearch} className="w-full flex flex-col md:flex-row items-center gap-2">
            <div className="flex items-center gap-3 px-4 py-2.5 flex-1 w-full">
              <Search className="w-5 h-5 text-blue-500 shrink-0" />
              <input
                type="text"
                placeholder="Where are you going?"
                value={typedDestination}
                onChange={(e) => setTypedDestination(e.target.value)}
                className="bg-transparent text-sm font-semibold outline-none w-full text-slate-700 placeholder-slate-400"
              />
              <button 
                type="button"
                onClick={() => onNavigate('plan-ride')}
                className="p-1.5 hover:bg-slate-50 text-blue-600 rounded-full cursor-pointer"
                title="Locate terminal stations nearby"
              >
                <Navigation className="w-4 h-4" />
              </button>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs md:text-sm px-8 py-3.5 rounded-xl md:rounded-full cursor-pointer transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span>Search</span>
            </button>
          </form>
        </div>
      </div>

      {/* 3. Circular Action Grid Row */}
      <div className="space-y-4" id="services-row-block">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Available Segments</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => onSelectService('bus')}
            className="bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 p-5 rounded-3xl flex flex-col items-center text-center group transition-all cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bus className="w-8 h-8" />
            </div>
            <span className="text-sm font-bold text-slate-800 mt-3 group-hover:text-blue-600">Bus Booking</span>
            <span className="text-[10px] text-slate-400 font-medium">Intercity coaches</span>
          </button>

          <button
            onClick={() => onSelectService('cab')}
            className="bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 p-5 rounded-3xl flex flex-col items-center text-center group transition-all cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Car className="w-8 h-8" />
            </div>
            <span className="text-sm font-bold text-slate-800 mt-3 group-hover:text-amber-600">Car Rides</span>
            <span className="text-[10px] text-slate-400 font-medium">Cabs & airport taxis</span>
          </button>

          <button
            onClick={() => onSelectService('hotel')}
            className="bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 p-5 rounded-3xl flex flex-col items-center text-center group transition-all cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Hotel className="w-8 h-8" />
            </div>
            <span className="text-sm font-bold text-slate-800 mt-3 group-hover:text-emerald-600">Hotels</span>
            <span className="text-[10px] text-slate-400 font-medium">Stays & vacation</span>
          </button>

          <button
            onClick={() => onSelectService('adventure')}
            className="bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 p-5 rounded-3xl flex flex-col items-center text-center group transition-all cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Compass className="w-8 h-8" />
            </div>
            <span className="text-sm font-bold text-slate-800 mt-3 group-hover:text-indigo-600">Adventure</span>
            <span className="text-[10px] text-slate-400 font-medium">Activities & safaris</span>
          </button>
        </div>
      </div>

      {/* 4. AI Journey Planner Blue Card Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 md:p-8 rounded-3xl border border-blue-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6" id="ai-planner-badge-card">
        <div className="space-y-3 max-w-xl text-left">
          <div className="inline-flex items-center gap-1 bg-blue-600 text-white font-bold text-[9px] uppercase px-2.5 py-0.5 rounded-full tracking-wider">
            <span>AI Journey Planner</span>
            <span className="bg-red-500 rounded-full px-1 text-[8px]">NEW</span>
          </div>
          <h3 className="text-lg md:text-xl font-extrabold text-slate-900 leading-snug">
            Plan your perfect trip with AI in seconds.
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Let the Niklo artificial intelligence organize multi-leg transfers, schedule reminders, and optimal routes seamlessly suited for your budget.
          </p>
          <button
            onClick={() => onSelectService('bus')}
            className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-extrabold hover:underline pt-1 cursor-pointer"
          >
            <span>Plan My Journey</span>
            <span>→</span>
          </button>
        </div>

        {/* AI Mascot Illustration container representing the robot */}
        <div className="shrink-0 relative w-24 h-24 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white">
          <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
            AI
          </div>
          {/* Custom SVG Robot matching the screenshot avatar */}
          <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="30" width="50" height="40" rx="12" fill="#3B82F6" />
            <rect x="20" y="42" width="60" height="16" rx="8" fill="#1E293B" />
            {/* Robot Eyes */}
            <circle cx="38" cy="50" r="4" fill="#60A5FA" className="animate-ping" />
            <circle cx="38" cy="50" r="3" fill="#60A5FA" />
            <circle cx="62" cy="50" r="4" fill="#60A5FA" className="animate-ping" />
            <circle cx="62" cy="50" r="3" fill="#60A5FA" />
            {/* Robot Ears/Pins */}
            <rect x="18" y="45" width="8" height="10" rx="2" fill="#94A3B8" />
            <rect x="74" y="45" width="8" height="10" rx="2" fill="#94A3B8" />
            {/* Antenna */}
            <line x1="50" y1="30" x2="50" y2="15" stroke="#3B82F6" strokeWidth="4" />
            <circle cx="50" cy="15" r="4" fill="#EF4444" />
          </svg>
        </div>
      </div>

      {/* 5. Your Trips Tracked Section */}
      <div className="space-y-4" id="your-trips-panel">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Your Trips</h3>
          <button 
            onClick={() => onNavigate('dashboard')} 
            className="text-xs text-blue-600 font-extrabold hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        {/* Kolkata to Siliguri Ticket matching Screenshot 3 */}
        <div 
          onClick={() => setShowActiveTicketModal(true)}
          className="bg-white border border-slate-100 hover:border-blue-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md cursor-pointer transition-all relative overflow-hidden"
        >
          <div className="absolute top-0 bottom-0 left-0 w-2 bg-blue-600" />
          
          <div className="flex items-center gap-4 pl-2">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <Bus className="w-6 h-6" />
            </div>
            <div className="text-left space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-slate-800">Kolkata</span>
                <span className="text-xs text-slate-400">➔</span>
                <span className="text-base font-black text-slate-800">Siliguri</span>
              </div>
              <p className="text-xs text-slate-500 font-semibold">
                22 May 2024 • 08:00 PM
              </p>
              <p className="text-[10px] text-slate-400 font-bold">
                SBSTC Volvo AC • Seat 3A, 3B • WB 11 2345
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 border-l border-slate-100 pl-6 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-bold">Confirmed</span>
            </div>

            <div className="flex items-center gap-3">
              {/* QR representation thumbnail */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <QrCode className="w-6 h-6 text-slate-700" />
              </div>
              <span className="bg-blue-100 text-blue-800 font-bold text-[9px] uppercase px-3 py-1 rounded-full">
                Upcoming
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Recommended Scenic Packages Grid */}
      <div className="space-y-4" id="recommended-packages-row">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Recommended Packages</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedPackages.map((pkg) => (
            <div 
              key={pkg.id}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:border-blue-200 hover:shadow-md transition-all cursor-pointer"
              onClick={() => onSelectService('adventure')}
            >
              <div className="relative h-48 bg-slate-150 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-slate-800 font-bold text-[10px] px-2.5 py-1 rounded-full shadow-md">
                  {pkg.rating}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between text-left">
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{pkg.tagline}</h4>
                  <h3 className="text-lg font-black text-slate-900 mt-1">{pkg.title}</h3>
                </div>
                <div className="flex justify-between items-center mt-6 pt-3 border-t border-slate-50">
                  <span className="text-sm font-black text-blue-600">
                    {pkg.price} <span className="text-[10px] text-slate-400 font-normal">/ person</span>
                  </span>
                  <span className="text-xs font-extrabold text-indigo-600 group-hover:underline">Explore →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Active Ticket Modal */}
      {showActiveTicketModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative border border-slate-100 animate-slide-in">
            {/* Ticket Header Graphic */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white text-center relative">
              <button 
                onClick={() => setShowActiveTicketModal(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white font-extrabold text-sm bg-black/10 rounded-full w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
              <Ticket className="w-8 h-8 mx-auto mb-2 opacity-90" />
              <h3 className="text-md font-bold">Niklo Digital Boarding Pass</h3>
              <p className="text-[10px] text-white/70 font-semibold tracking-wider">SBSTC EXPRESS CO.</p>
            </div>

            {/* Ticket Info Card */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-bold">BOARDING STATUS</span>
                <span className="bg-emerald-100 text-emerald-800 font-black text-[9px] uppercase px-2.5 py-0.5 rounded-full">CONFIRMED</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-b border-dashed border-slate-150 pb-4">
                <div>
                  <label className="text-[9px] text-slate-400 font-black tracking-wider block uppercase">From</label>
                  <strong className="text-sm font-extrabold text-slate-800 block">Kolkata (Babughat)</strong>
                  <span className="text-[10px] text-slate-500">Departure: 08:00 PM</span>
                </div>
                <div>
                  <label className="text-[9px] text-slate-400 font-black tracking-wider block uppercase">To</label>
                  <strong className="text-sm font-extrabold text-slate-800 block">Siliguri Terminal</strong>
                  <span className="text-[10px] text-slate-500">Arrival: 05:30 AM</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-4">
                <div>
                  <label className="text-[9px] text-slate-400 font-black tracking-wider block uppercase">Seats</label>
                  <strong className="text-xs font-bold text-slate-800">3A, 3B (AC Sleeper)</strong>
                </div>
                <div>
                  <label className="text-[9px] text-slate-400 font-black tracking-wider block uppercase">Gate PIN</label>
                  <strong className="text-xs font-bold text-slate-800 font-mono">1892</strong>
                </div>
              </div>

              {/* Verified QR Boarding Section */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 text-center space-y-3">
                <QrCode className="w-24 h-24 text-slate-800 mx-auto" />
                <div>
                  <p className="text-[10px] text-slate-500 font-semibold leading-normal">
                    Presenter has a valid digital PDF ticket. Scan this barcode upon passenger boarding.
                  </p>
                  <p className="text-xs text-blue-600 font-black mt-1 font-mono">BBTC-89021</p>
                </div>
              </div>
            </div>
            
            {/* Ticket Footer Tear Block */}
            <div className="bg-slate-100 px-6 py-4 text-center text-slate-400 text-[10px] uppercase font-bold tracking-widest border-t border-dashed border-slate-200">
              ⚡ StaySafe Mobile Transit network • Niklo
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
