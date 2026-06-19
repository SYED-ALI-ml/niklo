import React, { useState } from 'react';
import { MapPin, ArrowLeft, PenTool, Home, Briefcase, Plane, Train, Map, Eye, Search, AlertCircle, Sparkles, Navigation } from 'lucide-react';

interface PlanRideProps {
  user: { name: string; phone: string; language: string } | null;
  onNavigate: (view: string) => void;
  onSearchDone: (searchData: { type: 'bus' | 'cab'; from: string; to: string; date: string }) => void;
}

export default function PlanRide({
  user,
  onNavigate,
  onSearchDone,
}: PlanRideProps) {
  const [currentLocation, setCurrentLocation] = useState('Current Location (Kolkata, WB)');
  const [typedDestination, setTypedDestination] = useState('');
  const [showInteractiveMap, setShowInteractiveMap] = useState(false);
  const [successRouteSelection, setSuccessRouteSelection] = useState<string | null>(null);

  const shortcutTags = [
    { id: 'home', label: 'Home', icon: <Home className="w-3.5 h-3.5" />, destinationAddress: 'Salt Lake Sector V, Kolkata' },
    { id: 'work', label: 'Work', icon: <Briefcase className="w-3.5 h-3.5" />, destinationAddress: '375, Prince Anwar Shah Rd' },
    { id: 'airport', label: 'Airport', icon: <Plane className="w-3.5 h-3.5" />, destinationAddress: "Netaji Subhas Chandra Bose Int'l Airport" },
    { id: 'station', label: 'Station', icon: <Train className="w-3.5 h-3.5" />, destinationAddress: 'Howrah Railway Station' },
  ];

  const popularNearby = [
    {
      id: 'howrah_station',
      name: 'Howrah Railway Station',
      detail: 'Howrah, West Bengal',
      category: 'Railway Station',
      distance: '8 km',
    },
    {
      id: 'cc_airport',
      name: "Netaji Subhas Chandra Bose Int'l Airport",
      detail: 'Dum Dum, Kolkata',
      category: 'Airport',
      distance: '17 km',
    },
    {
      id: 'sc_mall',
      name: 'South City Mall',
      detail: '375, Prince Anwar Shah Rd',
      category: 'Shopping',
      distance: '5 km',
    },
    {
      id: 'cc_two',
      name: 'City Centre 2',
      detail: 'Biswa Bangla Sarani, New Town',
      category: 'Mall',
      distance: '12 km',
    },
  ];

  const handleShortcutClick = (address: string) => {
    setTypedDestination(address);
    setSuccessRouteSelection(`Pre-filled route destination: ${address}`);
  };

  const handleStartSearch = (e: React.FormEvent) => {
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
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-8 animate-fade-in text-slate-800" id="plan-ride-page">
      
      {/* Back to Home row and Screen Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-150 pb-5" id="plan-ride-header">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="p-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-full cursor-pointer text-slate-500 hover:text-slate-900 transition-colors"
            title="Navigate Home"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="text-left">
            <h1 className="text-xl md:text-2xl font-black text-slate-900">Plan your ride</h1>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Get there comfortably</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-2xl border border-blue-100 text-xs font-bold leading-none">
          <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-spin" />
          <span>Active Dispatcher Terminal</span>
        </div>
      </div>

      {/* Main Grid: Inputs on Left, Map & Shortcuts on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Location Form and landmark lists */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 text-left">
            
            <h2 className="text-base font-black text-slate-800 uppercase tracking-wider border-b border-slate-50 pb-3">Route Coordinates</h2>

            {/* Combined input panel resembling physical dots layout */}
            <div className="space-y-6 pl-4 border-l-2 border-dashed border-blue-400 relative">
              
              {/* Blue start location indicator */}
              <div className="relative">
                <span className="w-3.5 h-3.5 bg-blue-600 rounded-full border-4 border-white shadow absolute -left-[23px] top-6 z-10" />
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Your Location</label>
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200 hover:bg-slate-100/50 rounded-xl px-4 py-3">
                    <span className="text-sm font-bold text-slate-700">{currentLocation}</span>
                    <button 
                      onClick={() => {
                        const newLoc = prompt("Enter your custom current origin terminal:", currentLocation);
                        if (newLoc) setCurrentLocation(newLoc);
                      }}
                      className="p-1.5 hover:bg-white text-blue-600 rounded-lg cursor-pointer"
                      title="Edit location coordinates"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Red destination location indicator */}
              <div className="relative pt-2">
                <span className="w-3.5 h-3.5 bg-red-500 rounded-full border-4 border-white shadow absolute -left-[23px] top-9 z-10" />
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Where are you going?</label>
                  <form onSubmit={handleStartSearch} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Search hotel, airport, city, address"
                        value={typedDestination}
                        onChange={(e) => {
                          setTypedDestination(e.target.value);
                          if (successRouteSelection) setSuccessRouteSelection(null);
                        }}
                        className="w-full h-12 pl-10 pr-4 bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-600 rounded-xl text-sm font-semibold text-slate-700 outline-none"
                        required
                      />
                      <MapPin className="w-4 h-4 text-red-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowInteractiveMap(!showInteractiveMap)}
                      className="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 font-bold text-xs px-4 h-12 rounded-xl transition-all cursor-pointer flex items-center gap-1 shrink-0"
                    >
                      <Map className="w-3.5 h-3.5" />
                      <span>Open Map</span>
                    </button>
                  </form>
                </div>
              </div>

            </div>

            {/* Quick Tag Shortcuts Row from Screenshot 2 */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Favorites & Destinations</span>
              <div className="flex flex-wrap gap-2.5">
                {shortcutTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => handleShortcutClick(tag.destinationAddress)}
                    className="flex items-center gap-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 border border-slate-205 py-2 px-3.5 rounded-xl text-xs font-extrabold text-slate-600 transition-all cursor-pointer"
                  >
                    {tag.icon}
                    <span>{tag.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {successRouteSelection && (
              <div className="p-3 bg-blue-50 text-blue-700 rounded-2xl text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-blue-500 shrink-0" />
                <span>{successRouteSelection}</span>
              </div>
            )}

            {/* Dispatch CTA */}
            <button
              onClick={handleStartSearch}
              disabled={!typedDestination.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold h-13 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <span>Validate Route Dispatch</span>
              <span>→</span>
            </button>

          </div>

          {/* Popular nearby landmarks */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest block">Popular Nearby</span>
              <button 
                onClick={() => setTypedDestination('Howrah Railway Station')}
                className="text-xs text-blue-600 font-extrabold hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {popularNearby.map((landmark) => (
                <div 
                  key={landmark.id}
                  onClick={() => handleShortcutClick(landmark.name)}
                  className="flex items-center justify-between py-3.5 hover:bg-slate-50/50 rounded-2xl px-2.5 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-50 text-slate-500 rounded-xl border border-slate-200">
                      <MapPin className="w-4 h-4 text-slate-600" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-bold text-slate-800">{landmark.name}</h4>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">{landmark.detail}</p>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-3 shrink-0">
                    <span className="bg-blue-100/70 text-blue-800 text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {landmark.category}
                    </span>
                    <span className="text-xs font-bold text-slate-600">{landmark.distance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Map overview area & More configurations */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Explore destinations on Map banner widget */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 text-left">
            <div>
              <h3 className="text-sm font-black text-slate-800">Explore destinations on map</h3>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">View nearby rides and live station options</p>
            </div>

            {/* Custom high fidelity stylized Map panel */}
            <div className="relative h-56 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200" id="map-illustration-box">
              {/* Map drawing inside SVGs */}
              <svg className="w-full h-full object-cover" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Land background */}
                <rect width="400" height="220" fill="#E2E8F0" />
                {/* Roads */}
                <path d="M-20 80 L420 80" stroke="#FFFFFF" strokeWidth="12" />
                <path d="M120 -20 L120 240" stroke="#FFFFFF" strokeWidth="12" />
                <path d="M280 -20 L280 240" stroke="#FFFFFF" strokeWidth="12" />
                {/* Water body */}
                <path d="M0 160 C100 170 200 150 400 170 L400 220 L0 220 Z" fill="#93C5FD" opacity="0.6" />
                {/* Park */}
                <rect x="140" y="20" width="120" height="40" rx="6" fill="#A7F3D0" opacity="0.5" />
                
                {/* Route drawing */}
                <path d="M120 80 Q 200 120 280 80" stroke="#3B82F6" strokeWidth="4" strokeDasharray="6 4" fill="none" />
                
                {/* Map Pins */}
                <g transform="translate(120, 80)">
                  <circle cx="0" cy="0" r="12" fill="#3B82F6" opacity="0.4" />
                  <circle cx="0" cy="0" r="6" fill="#3B82F6" />
                </g>
                <g transform="translate(280, 80)">
                  <circle cx="0" cy="0" r="12" fill="#EF4444" opacity="0.4" />
                  <circle cx="0" cy="0" r="6" fill="#EF4444" />
                </g>
              </svg>
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent flex items-end p-4">
                <button
                  type="button"
                  onClick={() => setShowInteractiveMap(!showInteractiveMap)}
                  className="bg-white/95 backdrop-blur shadow-md hover:bg-white text-slate-800 font-extrabold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                  <span>Interactive Map Live view</span>
                </button>
              </div>
            </div>

            <button 
              onClick={() => setShowInteractiveMap(true)}
              className="text-xs text-blue-600 font-extrabold hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Open map</span>
              <span>→</span>
            </button>
          </div>

          {/* More Options Section */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 text-left">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest block">More Options</span>
            
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => {
                  const city = prompt("Which city would you like to plan rides in?", "Mumbai");
                  if (city) {
                    setCurrentLocation(`Current Location (${city})`);
                    setSuccessRouteSelection(`Switched departure coordinates to ${city} master terminal.`);
                  }
                }}
                className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-150 transition-all text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Navigation className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-bold text-slate-700">Search in another city</span>
                </div>
                <span className="text-slate-400 text-xs">➔</span>
              </button>

              <button
                onClick={() => setShowInteractiveMap(true)}
                className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-150 transition-all text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Map className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-bold text-slate-700">Set location on map</span>
                </div>
                <span className="text-slate-400 text-xs">➔</span>
              </button>

              <button
                onClick={() => {
                  setTypedDestination('Salt Lake Sector V, Kolkata');
                  setSuccessRouteSelection('Fetched work/saved address: Salt Lake Sector V, Kolkata');
                }}
                className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-150 transition-all text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Home className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-bold text-slate-700">Saved places</span>
                </div>
                <span className="text-slate-400 text-xs">➔</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Interactive Floating Map simulation component drawer */}
      {showInteractiveMap && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative border border-slate-100 animate-slide-in text-left">
            <div className="bg-slate-900 px-6 py-4 text-white flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-sm flex items-center gap-2">
                  <Map className="w-4 h-4 text-blue-400 animate-pulse" />
                  <span>Location Coordinate GIS Mapper</span>
                </h3>
                <p className="text-[10px] text-slate-400">Zoom and pick passenger terminal coordinates</p>
              </div>
              <button 
                onClick={() => setShowInteractiveMap(false)}
                className="text-slate-400 hover:text-white font-bold bg-slate-800 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="relative h-96 bg-blue-50 flex items-center justify-center">
              {/* Actual full screen Map Canvas */}
              <div className="absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 600 380" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="600" height="380" fill="#E2E8F0" />
                  {/* Rivers */}
                  <path d="M0 240 C150 250 300 180 600 260 L600 380 L0 380 Z" fill="#4299E1" opacity="0.4" />
                  <path d="M0 230 C150 240 300 170 600 250" stroke="#3182CE" strokeWidth="6" opacity="0.6" />
                  {/* Grid Roads */}
                  <path d="M0 100 H600" stroke="#FFFFFF" strokeWidth="18" />
                  <path d="M0 100 H600" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="8 6" />
                  
                  <path d="M150 0 V380" stroke="#FFFFFF" strokeWidth="18" />
                  <path d="M150 0 V380" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="8 6" />

                  <path d="M420 0 V380" stroke="#FFFFFF" strokeWidth="18" />
                  <path d="M420 0 V380" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="8 6" />
                  
                  {/* Selected Location routes */}
                  <path d="M150 100 Q 285 180 420 100" stroke="#3182CE" strokeWidth="5" strokeDasharray="10 5" fill="none" />
                  
                  {/* Pins on map */}
                  <g transform="translate(150, 100)">
                    <circle cx="0" cy="0" r="16" fill="#3182CE" opacity="0.3" className="animate-ping" />
                    <circle cx="0" cy="0" r="7" fill="#3182CE" />
                    <rect x="-40" y="-30" width="80" height="18" rx="4" fill="#1A202C" />
                    <text x="0" y="-18" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">ORIGIN</text>
                  </g>

                  <g transform="translate(420, 100)">
                    <circle cx="0" cy="0" r="16" fill="#E53E3E" opacity="0.3" className="animate-ping" />
                    <circle cx="0" cy="0" r="7" fill="#E53E3E" />
                    <rect x="-40" y="-30" width="80" height="18" rx="4" fill="#1A202C" />
                    <text x="0" y="-18" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">DESTINATION</text>
                  </g>
                </svg>
              </div>

              {/* Map controls panel overlays */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur shadow-xl border border-slate-205 p-3.5 rounded-2xl space-y-2.5 max-w-xs">
                <span className="text-[10px] font-black text-slate-400 block uppercase">GIS Coordinates</span>
                <p className="text-xs text-slate-700 font-bold leading-none">Lat: 22.5726° N<br /><span className="mt-1 block">Lon: 88.3639° E</span></p>
                <button
                  type="button"
                  onClick={() => {
                    setTypedDestination('375, Prince Anwar Shah Rd');
                    setShowInteractiveMap(false);
                    setSuccessRouteSelection('Coordinates synchronized to: 375, Prince Anwar Shah Rd');
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-2 rounded-xl text-[10px] uppercase transition-all"
                >
                  Confirm Coordinates
                </button>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-4 flex justify-between items-center text-xs text-slate-500 font-semibold border-t border-slate-100">
              <span>Interactive satellite telemetry enabled</span>
              <span>GPS Precision: ±3 meters</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
