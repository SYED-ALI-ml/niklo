import React, { useState } from 'react';
import { 
  Bus, Car, Hotel, Compass, MapPin, Calendar, Clock, 
  Ticket, Check, User, ArrowRight, Star, Heart, 
  ChevronRight, Sparkles, Filter, ShieldCheck, ShieldAlert, 
  Phone, Mail, CheckCircle2, RefreshCw, Undo2, LogOut, ChevronLeft,
  Wallet, Gift, Map, HelpCircle, MessageSquare, PhoneCall, Plus, Minus, Search, XCircle, FileText
} from 'lucide-react';

interface BookingDashboardProps {
  user: { name: string; phone: string; language: string };
  initialSearch?: { type: 'bus' | 'cab'; from: string; to: string; date: string } | null;
  onLogout: () => void;
}

interface BusSchedule {
  id: string;
  operator: string;
  type: string;
  departureTime: string;
  depStation: string;
  arrivalTime: string;
  arrStation: string;
  duration: string;
  price: number;
  originalPrice: number;
  rating: number;
  ratingsCount: number;
  seatsLeft: number;
  features: string[];
}

export default function BookingDashboard({
  user,
  initialSearch,
  onLogout,
}: BookingDashboardProps) {
  // State machine mirroring core screenshot transitions
  const [currentStep, setCurrentStep] = useState<'home' | 'search' | 'results' | 'seats' | 'passenger' | 'success'>('home');
  const [selectedService, setSelectedService] = useState<'bus' | 'cab' | 'hotel' | 'adventure'>('bus');
  
  // Tab select: added journey planner, wallet and refer and earn sections, hotels and adventures
  const [bottomTab, setBottomTab] = useState<'home' | 'planner' | 'packages' | 'wallet' | 'refer' | 'bookings' | 'account' | 'hotels' | 'adventures' | 'help'>('home');

  // --- TRAVEL PACKAGES STATE (Screens 1, 2, 3) ---
  const [packageStep, setPackageStep] = useState<'search' | 'results' | 'details' | 'success'>('search');
  const [packageFrom, setPackageFrom] = useState('Kolkata');
  const [packageTo, setPackageTo] = useState('Gangtok');
  const [packageDate, setPackageDate] = useState('25 May 2024');
  const [packageGuestsDigits, setPackageGuestsDigits] = useState({ guests: 2, rooms: 1 });
  const [selectedTourPackage, setSelectedTourPackage] = useState<any>(null);
  const [packageDetailTab, setPackageDetailTab] = useState<'overview' | 'itinerary' | 'inclusions' | 'exclusions'>('overview');
  const [packageDurationFilter, setPackageDurationFilter] = useState<string>('All');
  const [packageBudgetFilter, setPackageBudgetFilter] = useState<string>('All');
  const [packageStyleFilter, setPackageStyleFilter] = useState<string>('All');

  // --- HELP & SUPPORT GUIDE STATES (Screen 4) ---
  const [activeSupportSection, setActiveSupportSection] = useState<'all' | 'bookings' | 'payments' | 'cancellations'>('all');
  const [expandedHelpArticleId, setExpandedHelpArticleId] = useState<number | null>(null);
  const [simulatedChatOpen, setSimulatedChatOpen] = useState(false);
  const [chatInputMessage, setChatInputMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'niklo'; text: string; time: string }>>([
    { sender: 'niklo', text: 'Hello! I am your Niklo Assistant. How can I help you regarding your recent bookings or refunds today?', time: 'Just now' }
  ]);

  // --- HOTELS BOOKING STATE ---
  const [hotelDestination, setHotelDestination] = useState('Kolkata');
  const [hotelCheckIn, setHotelCheckIn] = useState('22 May 2024');
  const [hotelCheckOut, setHotelCheckOut] = useState('25 May 2024');
  const [hotelNights, setHotelNights] = useState(3);
  const [hotelGuests, setHotelGuests] = useState(2);
  const [hotelRooms, setHotelRooms] = useState(1);
  const [hotelStayMode, setHotelStayMode] = useState<'night' | 'hourly'>('night');
  const [hotelStep, setHotelStep] = useState<'search' | 'results' | 'details' | 'availability' | 'checkout' | 'success'>('search');
  const [hotelActiveBadge, setHotelActiveBadge] = useState<'recommended' | 'budget' | 'luxury' | 'popular'>('recommended');
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [hotelDetailTab, setHotelDetailTab] = useState<'overview' | 'rooms' | 'amenities' | 'reviews' | 'location'>('overview');
  const [showRoomsAvailableModal, setShowRoomsAvailableModal] = useState(false);
  const [hotelPromo, setHotelPromo] = useState('');
  const [favoritesHotels, setFavoritesHotels] = useState<number[]>([1]);

  // --- EXPERIENCES & ADVENTURE STATE ---
  const [adventureStep, setAdventureStep] = useState<'search' | 'results' | 'details' | 'success'>('search');
  const [adventureCategory, setAdventureCategory] = useState<'all' | 'water_sports' | 'trekking' | 'safaris'>('all');
  const [selectedAdventure, setSelectedAdventure] = useState<any>(null);
  const [adventureDate, setAdventureDate] = useState('22 May 2024');
  const [adventureTravelers, setAdventureTravelers] = useState(1);

  // Interactive Route Search state
  const [searchFrom, setSearchFrom] = useState('Kolkata');
  const [searchTo, setSearchTo] = useState('Siliguri');
  const [searchDate, setSearchDate] = useState('22 May 2024');
  const [passengerCount, setPassengerCount] = useState(1);

  // --- CAB BOOKING DETAILED SIMULATION STATE ---
  const [cabStep, setCabStep] = useState<'request' | 'finding' | 'matched' | 'completed'>('request');
  const [selectedCabType, setSelectedCabType] = useState<'mini' | 'sedan' | 'suv'>('sedan');
  const [cabPromo, setCabPromo] = useState('');
  const [cabDiscount, setCabDiscount] = useState(0);
  const [findingProgress, setFindingProgress] = useState(0);

  // --- MULTI-LEG JOURNEY PLANNER STATE ---
  const [plannerStep, setPlannerStep] = useState<'input' | 'overview' | 'seats' | 'payment' | 'success'>('input');
  const [plannerFrom, setPlannerFrom] = useState('Kolkata');
  const [plannerTo, setPlannerTo] = useState('Gangtok');
  const [plannerDate, setPlannerDate] = useState('25 May 2024');
  const [plannerLeg2Cab, setPlannerLeg2Cab] = useState<'sedan' | 'suv'>('sedan');
  const [plannerSeats, setPlannerSeats] = useState<string[]>(['4A']);
  const [plannerPassengers, setPlannerPassengers] = useState<Array<{ name: string; age: string; gender: string }>>([
    { name: 'Arjun Sharma', age: '29', gender: 'Male' }
  ]);
  const [plannerInsure, setPlannerInsure] = useState(true);

  // --- WALLET INTEGRATED LEDGER STATE ---
  const [walletBalance, setWalletBalance] = useState(1250);
  const [cashbackBalance, setCashbackBalance] = useState(200);
  const [addAmount, setAddAmount] = useState('500');
  const [transactions, setTransactions] = useState<Array<{ title: string; amount: number; type: 'credit' | 'debit'; date: string }>>([
    { title: 'Money Added via UPI', amount: 500, type: 'credit', date: '21 May 2024' },
    { title: 'Outstation Sedan Cab Ride', amount: -240, type: 'debit', date: '20 May 2024' },
    { title: 'Intercity Bus Ticket Refund', amount: 850, type: 'credit', date: '15 May 2568' },
    { title: 'Promotional Welcome Bonus', amount: 100, type: 'credit', date: '10 May 2024' }
  ]);

  // --- REFER & EARN STATE ---
  const [copiedCode, setCopiedCode] = useState(false);
  const [referrals, setReferrals] = useState([
    { name: 'Amit Roy', status: 'Completed', reward: 100, date: '18 May 2024' },
    { name: 'Sunita Das', status: 'Pending', reward: 0, date: '21 May 2024' }
  ]);

  // Active Selected Bus Schedule for booking
  const [selectedSchedule, setSelectedSchedule] = useState<BusSchedule | null>(null);
  
  // Upper vs Lower deck choice
  const [seatDeck, setSeatDeck] = useState<'lower' | 'upper'>('lower');
  
  // Selected seats state
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['3A']);

  // Passenger details list matching selected seats
  const [passengers, setPassengers] = useState<Array<{ name: string; age: string; gender: string }>>([
    { name: 'Kabir Sharma', age: '28', gender: 'Male' }
  ]);

  // Contact details state
  const [contactEmail, setContactEmail] = useState(user.name ? `${user.name.toLowerCase().replace(/\s+/g, '')}@gmail.com` : 'alimohd3946@gmail.com');
  const [contactPhone, setContactPhone] = useState(user.phone || '+919123456789');

  // Opt-in Addons
  const [freeCancellation, setFreeCancellation] = useState(true);
  const [insureJourney, setInsureJourney] = useState(true);

  // Filter criteria options
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [onlyAc, setOnlyAc] = useState<boolean>(false);
  const [operatorFilter, setOperatorFilter] = useState<string>('all');

  // Ticket history persistence list
  const [confirmedBookings, setConfirmedBookings] = useState<Array<{
    ticketId: string;
    route: string;
    date: string;
    busOperator: string;
    busType: string;
    seats: string[];
    price: number;
    arrival: string;
    departure: string;
  }>>([
    {
      ticketId: 'BBTC-89021',
      route: 'Kolkata ⇄ Digha',
      date: '10 May 2024',
      busOperator: 'WBTC Volvo AC Seater',
      busType: 'Premium Luxury Multi-Axle',
      seats: ['12A', '12B'],
      price: 900,
      departure: '06:30 AM',
      arrival: '11:00 AM'
    }
  ]);

  // Active booking reference
  const [activeBooking, setActiveBooking] = useState<{
    ticketId: string;
    from: string;
    to: string;
    date: string;
    busOperator: string;
    seats: string[];
    price: number;
  } | null>(null);

  // Constants
  const MOCK_BUS_LIST: BusSchedule[] = [
    {
      id: 'bus-1',
      operator: 'SBSTC Volvo A/C Semi Sleeper',
      type: '2+2 Sleeper/Seater Business',
      departureTime: '08:00 PM',
      depStation: 'Esplanade',
      arrivalTime: '05:30 AM',
      arrStation: 'Tenanzing Norgay Bus Stand',
      duration: '9h 30m',
      price: 799,
      originalPrice: 999,
      rating: 4.3,
      ratingsCount: 112,
      seatsLeft: 8,
      features: ['A/C', 'Mobile Charger', 'Blanket', 'Water Bottle', 'Live Tracking']
    },
    {
      id: 'bus-2',
      operator: 'Shyamoli Paribahan AC Sleeper',
      type: '2+1 Premium Volvo Sleeper',
      departureTime: '09:00 PM',
      depStation: 'Kolkata Babughat Area',
      arrivalTime: '06:45 AM',
      arrStation: 'Siliguri Central Terminus',
      duration: '9h 45m',
      price: 850,
      originalPrice: 1050,
      rating: 4.5,
      ratingsCount: 204,
      seatsLeft: 12,
      features: ['A/C', 'Mobile Charger', 'Blanket', 'Snacks', 'CCTV']
    },
    {
      id: 'bus-3',
      operator: 'Royal Cruiser Executive Class',
      type: 'Mercedes Benz Multi-Axle Club',
      departureTime: '10:00 PM',
      depStation: 'Airport Gate No. 1',
      arrivalTime: '07:30 AM',
      arrStation: 'Siliguri Stand',
      duration: '9h 30m',
      price: 1100,
      originalPrice: 1300,
      rating: 4.7,
      ratingsCount: 418,
      seatsLeft: 4,
      features: ['A/C', 'Individual TV', 'Gourmet Meal', 'Pillow', 'WiFi']
    }
  ];

  const POPULAR_SUGGESTIONS = [
    {
      id: 'sug-1',
      title: 'Rishikesh',
      price: '₹4,200',
      description: 'Adventure & Yoga Capital',
      image: 'https://images.unsplash.com/photo-1545638190-2824e2b5167e?auto=format&fit=crop&q=80&w=400',
      duration: '3 Days / 2 Nights'
    },
    {
      id: 'sug-2',
      title: 'Agra',
      price: '₹2,800',
      description: 'Iconic Taj Mahal Sightseeing',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=400',
      duration: '2 Days / 1 Night'
    },
    {
      id: 'sug-3',
      title: 'Himalayas Siliguri',
      price: '₹3,500',
      description: 'Gateway to Hill Scenery',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400',
      duration: '4 Days / 3 Nights'
    },
    {
      id: 'sug-4',
      title: 'Goa Beaches',
      price: '₹6,400',
      description: 'Unwind on the Golden Coast',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400',
      duration: '5 Days / 4 Nights'
    },
    {
      id: 'sug-5',
      title: 'Kerala Backwaters',
      price: '₹5,800',
      description: 'Traditional Houseboat Cruise',
      image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=400',
      duration: '4 Days / 3 Nights'
    }
  ];

  // Seat toggle handler
  const handleSeatClick = (seatCode: string) => {
    let updatedSeats;
    if (selectedSeats.includes(seatCode)) {
      if (selectedSeats.length === 1) return; // Must select at least 1
      updatedSeats = selectedSeats.filter(s => s !== seatCode);
    } else {
      updatedSeats = [...selectedSeats, seatCode];
    }
    setSelectedSeats(updatedSeats);

    // Dynamic passenger objects creation based on seats count
    const updatedPassengers = updatedSeats.map((seat, index) => {
      if (passengers[index]) {
        return passengers[index];
      }
      return { name: `Passenger ${index + 1}`, age: '25', gender: 'Male' };
    });
    setPassengers(updatedPassengers);
  };

  const calculateTotalCharge = () => {
    if (!selectedSchedule) return 799;
    const base = selectedSchedule.price * selectedSeats.length;
    const cancellationAddon = freeCancellation ? selectedSeats.length * 99 : 0;
    const insuranceAddon = insureJourney ? selectedSeats.length * 15 : 0;
    const serviceCharge = 45;
    return base + cancellationAddon + insuranceAddon + serviceCharge;
  };

  // Run payment validation and trigger success state
  const handleConfirmPayment = () => {
    const randomTicketId = `BBTC-${Math.floor(10000 + Math.random() * 90000)}`;
    const chargeSum = calculateTotalCharge();

    const bookingMock = {
      ticketId: randomTicketId,
      from: searchFrom,
      to: searchTo,
      date: searchDate,
      busOperator: selectedSchedule ? selectedSchedule.operator : 'SBSTC Volvo AC',
      seats: selectedSeats,
      price: chargeSum
    };

    setActiveBooking(bookingMock);
    
    // Append to confirmed history
    setConfirmedBookings([
      {
        ticketId: randomTicketId,
        route: `${searchFrom} ⇄ ${searchTo}`,
        date: searchDate,
        busOperator: selectedSchedule ? selectedSchedule.operator : 'SBSTC Volvo AC',
        busType: selectedSchedule ? selectedSchedule.type : 'Premium',
        seats: selectedSeats,
        price: chargeSum,
        departure: selectedSchedule ? selectedSchedule.departureTime : '08:00 PM',
        arrival: selectedSchedule ? selectedSchedule.arrivalTime : '05:30 AM'
      },
      ...confirmedBookings
    ]);

    setCurrentStep('success');
  };

  // Filter list calculated dynamically
  const filteredBuses = MOCK_BUS_LIST.filter(bus => {
    if (onlyAc && !bus.features.includes('A/C')) return false;
    if (ratingFilter && bus.rating < ratingFilter) return false;
    if (operatorFilter !== 'all' && !bus.operator.toLowerCase().includes(operatorFilter.toLowerCase())) return false;
    return true;
  });

  return (
    <div id="bus-booking-applet" className="min-h-screen bg-slate-50 text-slate-800 flex flex-col relative">
      
      {/* Dynamic Secondary Top navigation menu representing high quality desktop design */}
      <div 
        id="desktop-sub-navigation" 
        className="w-full bg-white border-b border-slate-200 sticky top-20 z-40 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex gap-1 md:gap-2 lg:gap-4 overflow-x-auto h-full items-center no-scrollbar py-1">
            <button 
              onClick={() => { setBottomTab('home'); setCurrentStep('home'); }}
              className={`h-full flex items-center gap-2 px-3 lg:px-4 text-xs lg:text-sm font-extrabold border-b-2 transition-all duration-200 whitespace-nowrap outline-none cursor-pointer ${
                bottomTab === 'home' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Bus className="w-4 h-4" />
              <span>Search Services</span>
            </button>

            <button 
              onClick={() => { setBottomTab('planner'); setPlannerStep('input'); }}
              className={`h-full flex items-center gap-2 px-3 lg:px-4 text-xs lg:text-sm font-extrabold border-b-2 transition-all duration-200 whitespace-nowrap outline-none cursor-pointer ${
                bottomTab === 'planner' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Map className="w-4 h-4 text-amber-500" />
              <span>Journey Planner</span>
              <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-black leading-none scale-90">Beta</span>
            </button>

            <button 
              onClick={() => { setBottomTab('hotels'); setHotelStep('search'); setSelectedHotel(null); }}
              className={`h-full flex items-center gap-2 px-3 lg:px-4 text-xs lg:text-sm font-extrabold border-b-2 transition-all duration-200 whitespace-nowrap outline-none cursor-pointer ${
                bottomTab === 'hotels' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Hotel className="w-4 h-4 text-emerald-500" />
              <span>Hotels</span>
              <span className="text-[9px] bg-emerald-100 text-emerald-850 px-1.5 py-0.5 rounded-full font-black leading-none scale-90">Kolkata</span>
            </button>

            <button 
              onClick={() => { setBottomTab('adventures'); setAdventureStep('search'); setSelectedAdventure(null); }}
              className={`h-full flex items-center gap-2 px-3 lg:px-4 text-xs lg:text-sm font-extrabold border-b-2 transition-all duration-200 whitespace-nowrap outline-none cursor-pointer ${
                bottomTab === 'adventures' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Compass className="w-4 h-4 text-amber-500" />
              <span>Experiences & Adv</span>
              <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-black leading-none scale-90">Hot</span>
            </button>

            <button 
              onClick={() => { setBottomTab('packages'); setCurrentStep('home'); }}
              className={`h-full flex items-center gap-2 px-3 lg:px-4 text-xs lg:text-sm font-extrabold border-b-2 transition-all duration-200 whitespace-nowrap outline-none cursor-pointer ${
                bottomTab === 'packages' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Travel Packages</span>
            </button>

            <button 
              onClick={() => { setBottomTab('wallet'); }}
              className={`h-full flex items-center gap-2 px-3 lg:px-4 text-xs lg:text-sm font-extrabold border-b-2 transition-all duration-200 whitespace-nowrap outline-none cursor-pointer ${
                bottomTab === 'wallet' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Wallet className="w-4 h-4 text-emerald-600" />
              <span>My Wallet</span>
              <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg">₹{walletBalance}</span>
            </button>

            <button 
              onClick={() => { setBottomTab('refer'); }}
              className={`h-full flex items-center gap-2 px-3 lg:px-4 text-xs lg:text-sm font-extrabold border-b-2 transition-all duration-200 whitespace-nowrap outline-none cursor-pointer ${
                bottomTab === 'refer' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Gift className="w-4 h-4 text-purple-600" />
              <span>Refer & Earn</span>
            </button>

            <button 
              onClick={() => { setBottomTab('bookings'); setCurrentStep('home'); }}
              className={`h-full flex items-center gap-2 px-3 lg:px-4 text-xs lg:text-sm font-extrabold border-b-2 transition-all duration-200 whitespace-nowrap outline-none cursor-pointer ${
                bottomTab === 'bookings' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>My Bookings</span>
              {confirmedBookings.length > 0 && (
                <span className="bg-blue-600 text-white font-black text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {confirmedBookings.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => { setBottomTab('account'); setCurrentStep('home'); }}
              className={`h-full flex items-center gap-2 px-3 lg:px-4 text-xs lg:text-sm font-extrabold border-b-2 transition-all duration-200 whitespace-nowrap outline-none cursor-pointer ${
                bottomTab === 'account' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <User className="w-4 h-4" />
              <span>My Profile</span>
            </button>

            <button 
              onClick={() => { setBottomTab('help'); }}
              className={`h-full flex items-center gap-2 px-3 lg:px-4 text-xs lg:text-sm font-extrabold border-b-2 transition-all duration-200 whitespace-nowrap outline-none cursor-pointer ${
                bottomTab === 'help' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-rose-500" />
              <span>Help & Support</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2.5 text-xs text-slate-400 font-extrabold select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>SECURE GATEWAY ENCRYPTION 256-BIT</span>
          </div>
        </div>
      </div>

      {/* Main Responsive Grid Container replacing mobile-emulator wrapper */}
      <div className="flex-1 bg-slate-50 flex flex-col relative w-full">
        
        {/* 1. HOME SCREEN VIEW WITHIN HOME TAB */}
        {bottomTab === 'home' && currentStep === 'home' && (
          <div id="home-view-canvas" className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full animate-fade-in">
            
            {/* Header profile area banner matching Screenshot 3 style */}
            <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 p-8 md:p-10 rounded-3xl text-white shadow-lg space-y-6 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-80 h-32 bg-indigo-500/10 rounded-full -ml-20 -mb-10 blur-xl" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md text-white font-black rounded-full flex items-center justify-center text-2xl shadow-lg uppercase border border-white/30">
                    {user.name ? user.name.charAt(0) : 'A'}
                  </div>
                  <div>
                    <p className="text-xs uppercase font-extrabold tracking-widest text-blue-200">Welcome to Niklo Concierge</p>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight mt-1">Good Morning, {user.name || 'Arjun'} 👋</h2>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4.5 py-2 rounded-2xl">
                    <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest block">Logged Phone</span>
                    <strong className="text-sm font-bold text-white tracking-wide">{user.phone || '+91 9123456789'}</strong>
                  </div>
                </div>
              </div>

              <div className="text-blue-100 flex items-center gap-2 relative z-10 pt-2 border-t border-white/15">
                <Sparkles className="w-5 h-5 text-amber-300 shrink-0 animate-pulse" />
                <p className="text-sm font-extrabold tracking-wide">
                  Explore available bus routes and high-speed local shuttle options with live satellite tracking.
                </p>
              </div>
            </div>

            {/* Content area: Split Grid Layout on desktop, single column on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Booking Selector and Dynamic Form */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Search overlay & Travel segment selectors */}
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest block">Choose Travel Mode</h4>
                    <span className="text-lg font-black text-slate-800 tracking-tight block mt-1">Where are you going today?</span>
                  </div>

                  {/* Grid categories select */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <button 
                      onClick={() => { setSelectedService('bus'); setCurrentStep('search'); }}
                      className="flex flex-col items-center p-4.5 bg-blue-50/50 hover:bg-blue-50 rounded-2xl border border-blue-200/60 shadow-sm hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group"
                    >
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center transition-all">
                        <Bus className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-extrabold text-blue-900 mt-3 block tracking-tight text-center">Bus Booking</span>
                    </button>

                    <button 
                      onClick={() => { setSelectedService('cab'); setCurrentStep('search'); }}
                      className="flex flex-col items-center p-4.5 bg-white hover:bg-slate-50 rounded-2xl border border-slate-100 shadow-sm hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group"
                    >
                      <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center transition-all">
                        <Car className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-extrabold text-slate-700 mt-3 block tracking-tight text-center">Cab Rides</span>
                    </button>

                    <button 
                      onClick={() => { setBottomTab('hotels'); setHotelStep('search'); setSelectedHotel(null); }}
                      className="flex flex-col items-center p-4.5 bg-white hover:bg-emerald-50/40 rounded-2xl border border-slate-100 hover:border-emerald-205 shadow-sm hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group"
                    >
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all">
                        <Hotel className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-extrabold text-slate-700 group-hover:text-emerald-905 mt-3 block tracking-tight text-center">Lux Hotels</span>
                    </button>

                    <button 
                      onClick={() => { setBottomTab('adventures'); setAdventureStep('search'); setSelectedAdventure(null); }}
                      className="flex flex-col items-center p-4.5 bg-white hover:bg-amber-50/40 rounded-2xl border border-slate-100 hover:border-amber-205 shadow-sm hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group"
                    >
                      <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all">
                        <Compass className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-extrabold text-slate-700 group-hover:text-amber-905 mt-3 block tracking-tight text-center">Experiences</span>
                    </button>
                  </div>

                  {/* Standardized Direct Travel Form Card integrated inline representing Desktop optimization */}
                  <div className="border-t border-slate-100 pt-6">
                    <button 
                      onClick={() => setCurrentStep('search')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 rounded-xl shadow-md flex items-center justify-center gap-2 transform active:scale-[0.99] transition-all text-sm leading-none"
                    >
                      <span>Launch Booking Assistant Console</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Popular Holiday packages carousel style, built directly into the grid */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-slate-800">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Smart Suggestions</h3>
                    <button onClick={() => setBottomTab('packages')} className="text-xs text-blue-600 font-extrabold hover:underline">View More Packages</button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {POPULAR_SUGGESTIONS.slice(0, 3).map((item) => (
                      <div 
                        key={item.id} 
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:border-blue-200 transition-all"
                      >
                        <div className="relative h-36 bg-slate-100">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          <div className="absolute top-3 right-3 bg-slate-900/50 backdrop-blur-md text-white font-black text-[9px] px-2.5 py-0.5 rounded-full">
                            {item.duration}
                          </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-sm font-black text-slate-800">{item.title}</h4>
                            <p className="text-xs text-slate-400 font-semibold mt-1 leading-snug">{item.description}</p>
                          </div>
                          <div className="flex justify-between items-center mt-4 pt-2.5 border-t border-slate-50">
                            <span className="text-xs font-black text-blue-600">{item.price} <span className="text-[9px] text-slate-400 font-normal">onwards</span></span>
                            <button 
                              onClick={() => {
                                setSearchTo(item.title);
                                setCurrentStep('search');
                              }}
                              className="w-7 h-7 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 flex items-center justify-center transition-all cursor-pointer"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Upcoming Trip and helpful status */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Upcoming Trip Board */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Your Active Trip</h3>
                    <button onClick={() => setBottomTab('bookings')} className="text-xs text-blue-600 font-black hover:underline">View History</button>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-600" />
                    <div className="flex justify-between items-start pl-2">
                      <div>
                        <span className="text-[9px] font-black tracking-widest bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100 uppercase">
                          Upcoming Ticket Booked
                        </span>
                        <h4 className="text-lg font-black text-slate-800 mt-2.5">Kolkata ➔ Siliguri</h4>
                        <p className="text-xs text-slate-400 font-bold mt-0.5">May 22, 2024 • 08:00 PM</p>
                      </div>
                      <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2 rounded-md">Seat 3A</span>
                    </div>

                    <div className="flex justify-between items-center pl-2 pt-4 border-t border-slate-50 text-xs">
                      <div className="flex items-center gap-2">
                        <Bus className="w-4 h-4 text-blue-600" />
                        <span className="font-extrabold text-slate-600">SBSTC Volvo AC</span>
                      </div>
                      <button 
                        onClick={() => {
                          const bus = MOCK_BUS_LIST[0];
                          setSelectedSchedule(bus);
                          setSelectedSeats(['3A']);
                          setCurrentStep('seats');
                        }}
                        className="text-xs text-blue-600 font-black cursor-pointer hover:underline uppercase"
                      >
                        Open Seat layout ➔
                      </button>
                    </div>
                  </div>
                </div>

                {/* Helpful Travel checklist promo card */}
                <div className="bg-amber-50/50 border border-amber-100 p-6 rounded-3xl space-y-3">
                  <div className="flex gap-2.5 items-center text-amber-800">
                    <ShieldCheck className="w-5 h-5 text-amber-600" />
                    <h5 className="font-extrabold text-sm tracking-tight leading-none">Assured Travel Safety</h5>
                  </div>
                  <p className="text-xs text-amber-800/80 leading-relaxed font-semibold">
                    Get free insurance protections with complete transit medical treatment shields and premium cancellation flexibility on all partner buses.
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* 2. PLAN YOUR RIDE WITH STATION SELECTION */}
        {bottomTab === 'home' && currentStep === 'search' && (
          <div id="plan-ride-view" className="flex-1 max-w-3xl mx-auto px-6 py-10 w-full animate-fade-in">
            <div className="space-y-6 bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-md">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setCurrentStep('home')} 
                    className="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-500 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5 animate-pulse" />
                  </button>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Booking Assistant Console</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Please provide schedule and routing guidelines</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  • Online
                </span>
              </div>

              {/* Segment Toggle */}
              <div className="flex bg-slate-100 p-1.5 rounded-xl">
                <button 
                  type="button"
                  onClick={() => setSelectedService('bus')}
                  className={`flex-1 py-3 text-xs font-black rounded-lg transition-all ${
                    selectedService === 'bus' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Intercity Bus Transit
                </button>
                <button 
                  type="button"
                  onClick={() => setSelectedService('cab')}
                  className={`flex-1 py-3 text-xs font-black rounded-lg transition-all ${
                    selectedService === 'cab' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Local & Outstation Cab
                </button>
              </div>

              {/* Stations selection */}
              <div className="space-y-4">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">From Port (Source)</label>
                    <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                      <input 
                        type="text" 
                        value={searchFrom}
                        onChange={(e) => setSearchFrom(e.target.value)}
                        className="bg-transparent w-full font-extrabold text-xs text-slate-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Switch button */}
                  <button 
                    onClick={() => {
                      const temp = searchFrom;
                      setSearchFrom(searchTo);
                      setSearchTo(temp);
                    }}
                    className="absolute right-1/2 translate-x-1/2 top-[32%] md:top-[28%] bg-white hover:bg-slate-50 text-blue-650 border border-slate-200/80 shadow-md w-8 h-8 rounded-full flex items-center justify-center cursor-pointer z-10 transition-transform active:scale-95"
                    title="Swap Ports"
                  >
                    ⇄
                  </button>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">To Port (Destination)</label>
                    <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                      <input 
                        type="text" 
                        value={searchTo}
                        onChange={(e) => setSearchTo(e.target.value)}
                        className="bg-transparent w-full font-extrabold text-xs text-slate-700 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-extrabold">Dep Date</label>
                    <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
                      <input 
                        type="text" 
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        className="bg-transparent w-full font-extrabold text-xs text-slate-700 focus:outline-none"
                        placeholder="e.g. 22 May 2024"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Passenger Counts</label>
                    <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl border border-slate-200">
                      <button 
                        onClick={() => setPassengerCount(Math.max(1, passengerCount - 1))}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-500 font-extrabold flex items-center justify-center cursor-pointer hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="font-extrabold text-xs text-slate-700">{passengerCount} Adult{passengerCount > 1 ? 's' : ''}</span>
                      <button 
                        onClick={() => setPassengerCount(passengerCount + 1)}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-500 font-extrabold flex items-center justify-center cursor-pointer hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Submit Action */}
              <button 
                onClick={() => {
                  if (selectedService === 'bus') {
                    setCurrentStep('results');
                  } else {
                    setCabStep('request');
                    setFindingProgress(0);
                    setCurrentStep('results');
                  }
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg transition-transform active:scale-98 cursor-pointer tracking-wider text-xs uppercase"
              >
                Search Available Vehicles ➔
              </button>
            </div>
          </div>
        )}

        {/* 3. CAB SEARCH & SIMULATION FLOW */}
        {bottomTab === 'home' && currentStep === 'results' && selectedService === 'cab' && (
          <div id="cab-simulation-view" className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full animate-fade-in space-y-6">
            
            {/* Upper Cab Header & Router indicators */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <button 
                  onClick={() => {
                    setCurrentStep('search');
                    setCabStep('request');
                  }} 
                  className="p-1 px-3 bg-slate-50 border border-slate-150 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
                >
                  ← Change Route
                </button>
                <div>
                  <h3 className="text-lg font-black tracking-tight text-slate-800 flex items-center gap-2">
                    <span>{searchFrom}</span> 
                    <span className="text-blue-600">➔</span> 
                    <span>{searchTo}</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-bold mt-0.5">Instant City Transit • For {passengerCount} Guest{passengerCount > 1 ? 's' : ''}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                <span>Live GPS Satellite Signals Connected</span>
              </div>
            </div>

            {/* Main Interactive Screen Segment */}
            {cabStep === 'request' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* SVG Visual Simulated Map Left */}
                <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400">Tactile Navigation Map</span>
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Route Optimized</span>
                  </div>

                  {/* High quality map canvas rendering */}
                  <div className="relative h-96 bg-slate-900 rounded-2xl overflow-hidden shadow-inner border border-slate-800 flex flex-col justify-between p-4">
                    {/* Retro Grid Background */}
                    <div className="absolute inset-0 opacity-15" style={{ 
                      backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
                      backgroundSize: '24px 24px' 
                    }} />

                    {/* Styled Road paths */}
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      {/* Grid roads */}
                      <path d="M 0 100 Q 150 150 400 120" stroke="#334155" strokeWidth="12" fill="none" strokeLinecap="round" />
                      <path d="M 0 100 Q 150 150 400 120" stroke="#475569" strokeWidth="2" strokeDasharray="6 4" fill="none" strokeLinecap="round" />
                      
                      <path d="M 120 0 Q 180 180 220 400" stroke="#334155" strokeWidth="12" fill="none" strokeLinecap="round" />
                      <path d="M 120 0 Q 180 180 220 400" stroke="#475569" strokeWidth="2" strokeDasharray="6 4" fill="none" strokeLinecap="round" />

                      <path d="M 50 280 C 200 350, 300 200, 400 240" stroke="#334155" strokeWidth="12" fill="none" strokeLinecap="round" />
                      <path d="M 50 280 C 200 350, 300 200, 400 240" stroke="#475569" strokeWidth="2" strokeDasharray="6 4" fill="none" strokeLinecap="round" />

                      {/* Active Travel route polyline */}
                      <path d="M 80 120 Q 220 180 320 230" stroke="#2563eb" strokeWidth="6" fill="none" strokeLinecap="round" className="animate-pulse" />
                      <path d="M 80 120 Q 220 180 320 230" stroke="#60a5fa" strokeWidth="2" fill="none" strokeLinecap="round" />
                    </svg>

                    {/* Source Point Pulsing Pin */}
                    <div className="absolute left-[80px] top-[120px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="w-10 h-10 bg-emerald-500/25 rounded-full flex items-center justify-center animate-ping absolute" />
                      <div className="relative w-7 h-7 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <span className="bg-slate-900/95 text-white font-black text-[9px] px-2 py-0.5 rounded mt-1 border border-slate-700 backdrop-blur-sm whitespace-nowrap shadow-md">
                        {searchFrom} (Esplanade)
                      </span>
                    </div>

                    {/* Destination Point Pulsing Pin */}
                    <div className="absolute left-[320px] top-[230px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="w-10 h-10 bg-red-500/25 rounded-full flex items-center justify-center animate-ping absolute" />
                      <div className="relative w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <span className="bg-slate-900/95 text-white font-black text-[9px] px-2 py-0.5 rounded mt-1 border border-slate-700 backdrop-blur-sm whitespace-nowrap shadow-md">
                        {searchTo} (Transit Hub)
                      </span>
                    </div>

                    {/* Animated moving cab car */}
                    <div className="absolute left-[200px] top-[165px] rotate-[15deg] animate-bounce bg-amber-500 text-slate-900 p-1.5 rounded-full shadow-lg border border-white z-20">
                      <Car className="w-4 h-4" />
                    </div>

                    {/* Speed indicator & live coordinates overlay */}
                    <div className="flex justify-between items-center w-full z-10 bottom-0 pointer-events-none mt-auto">
                      <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-mono text-[9px] font-bold text-slate-300">EST DISTANCE: 12.8 KM • 24 MINS</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right controls: selection & pricing options Card */}
                <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest block">Available Tiers</h4>
                    <span className="text-lg font-black text-slate-800 tracking-tight block mt-1">Select Ride Class</span>
                  </div>

                  {/* Options List */}
                  <div className="space-y-3">
                    {/* Mini Option */}
                    <button 
                      onClick={() => setSelectedCabType('mini')}
                      className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between gap-4 transition-all cursor-pointer ${
                        selectedCabType === 'mini' ? 'border-blue-600 bg-blue-50/20' : 'border-slate-100 hover:border-blue-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-sm">
                          <Car className="w-6 h-6" />
                        </div>
                        <div>
                          <h5 className="font-extrabold text-sm text-slate-800">Niklo Mini Hatchback</h5>
                          <p className="text-xs text-slate-400 font-bold mt-0.5">Budget rides • 4 mins away</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-slate-800 text-base">₹180</span>
                        <span className="text-[10px] text-slate-400 font-bold block">One-Way</span>
                      </div>
                    </button>

                    {/* Sedan Option */}
                    <button 
                      onClick={() => setSelectedCabType('sedan')}
                      className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between gap-4 transition-all cursor-pointer ${
                        selectedCabType === 'sedan' ? 'border-blue-600 bg-blue-50/20' : 'border-slate-100 hover:border-blue-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-650 flex items-center justify-center shadow-sm">
                          <Car className="w-6 h-6" />
                        </div>
                        <div>
                          <h5 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
                            <span>Niklo Prime Sedan</span>
                            <span className="bg-blue-600 text-white font-black text-[8px] px-1.5 py-0.5 rounded uppercase leading-none">Best</span>
                          </h5>
                          <p className="text-xs text-slate-400 font-bold mt-0.5">Comfort, high space • 2 mins away</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-slate-800 text-base">₹240</span>
                        <span className="text-[10px] text-slate-400 font-bold block">One-Way</span>
                      </div>
                    </button>

                    {/* SUV Option */}
                    <button 
                      onClick={() => setSelectedCabType('suv')}
                      className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between gap-4 transition-all cursor-pointer ${
                        selectedCabType === 'suv' ? 'border-blue-600 bg-blue-50/20' : 'border-slate-100 hover:border-blue-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shadow-sm">
                          <Car className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                          <h5 className="font-extrabold text-sm text-slate-800">Niklo Executive SUV</h5>
                          <p className="text-xs text-slate-400 font-bold mt-0.5">Spacious 6-seaters • 5 mins away</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-slate-800 text-base">₹350</span>
                        <span className="text-[10px] text-slate-400 font-bold block">One-Way</span>
                      </div>
                    </button>
                  </div>

                  {/* Promo Coupons Integration Card */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3 text-xs">
                    <label htmlFor="promo-coupon-input-cab" className="font-extrabold text-slate-500 uppercase tracking-wider block">Add Discount Coupon Code</label>
                    <div className="flex gap-2">
                      <input 
                        id="promo-coupon-input-cab"
                        type="text" 
                        value={cabPromo}
                        placeholder="Try NIKLO100 or SAVE50"
                        onChange={(e) => setCabPromo(e.target.value.toUpperCase())}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-extrabold text-slate-700 outline-none"
                      />
                      <button 
                        onClick={() => {
                          if (cabPromo === 'NIKLO100') {
                            setCabDiscount(100);
                            alert('Congratulations! Promo coupon NIKLO100 successfully applied: ₹100 direct cashback is slashed!');
                          } else if (cabPromo === 'SAVE50') {
                            setCabDiscount(50);
                            alert('Promo coupon SAVE50 successfully applied: ₹50 slashed!');
                          } else {
                            alert('Code invalid. Please enter a valid coupon like NIKLO100 or SAVE50');
                          }
                        }}
                        className="bg-slate-800 hover:bg-slate-900 text-white font-extrabold py-2 px-4 rounded-xl cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {cabDiscount > 0 && (
                      <div className="text-emerald-600 font-extrabold text-[10px] flex items-center gap-1">
                        ✓ Voucher Activated: ₹{cabDiscount} discount applied successfully.
                      </div>
                    )}
                  </div>

                  {/* Summary Pricing Card */}
                  <div className="border-t border-slate-100 pt-5 space-y-3">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                      <span>Ride fare base price</span>
                      <span>₹{selectedCabType === 'mini' ? 180 : selectedCabType === 'sedan' ? 240 : 350}</span>
                    </div>
                    {cabDiscount > 0 && (
                      <div className="flex justify-between items-center text-xs font-bold text-emerald-600">
                        <span>Campaign Promo Discount</span>
                        <span>-₹{cabDiscount}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2.5 border-t border-slate-50">
                      <span className="text-sm font-black text-slate-850">Total Outlay Charge</span>
                      <strong className="text-xl font-black text-blue-600">
                        ₹{Math.max(0, (selectedCabType === 'mini' ? 180 : selectedCabType === 'sedan' ? 240 : 350) - cabDiscount)}
                      </strong>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <button 
                    onClick={() => {
                      setCabStep('finding');
                      setFindingProgress(0);
                      // Simulate progress counter timer
                      const interval = setInterval(() => {
                        setFindingProgress((prev) => {
                          if (prev >= 100) {
                            clearInterval(interval);
                            setCabStep('matched');
                            return 100;
                          }
                          return prev + 12;
                        });
                      }, 400);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg transition-transform active:scale-98 tracking-wider text-xs uppercase cursor-pointer"
                  >
                    Confirm & Match Driver Now ➔
                  </button>
                </div>
              </div>
            )}

            {/* Finding / Radar search step */}
            {cabStep === 'finding' && (
              <div id="cab-finding-step" className="max-w-2xl mx-auto bg-white p-10 rounded-3xl border border-slate-100 shadow-xl text-center space-y-8 py-16 animate-pulse">
                {/* Sonar Pulsing animated radar layout */}
                <div className="relative h-44 w-44 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-ping" />
                  <div className="absolute inset-8 bg-blue-500/15 rounded-full animate-ping opacity-75" />
                  <div className="absolute inset-16 bg-blue-500/20 rounded-full animate-pulse" />
                  <div className="relative h-20 w-20 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <Car className="w-8 h-8" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">Locating Nearby Executive Drivers</h3>
                  <p className="text-xs text-slate-400 font-bold max-w-sm mx-auto leading-relaxed">
                    Searching 12 partner coordinate grids in Kolkata near your position... Sending ride packets ({findingProgress}% matched)
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full max-w-md mx-auto bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${findingProgress}%` }} />
                </div>

                {/* Switch skip or Cancel action */}
                <div className="pt-2 flex justify-center gap-3">
                  <button 
                    onClick={() => {
                      setCabStep('matched');
                    }}
                    className="bg-slate-50 hover:bg-slate-100 text-slate-500 text-xs font-bold py-2 px-4 rounded-lg border border-slate-200 cursor-pointer"
                  >
                    Skip & Match Instantly
                  </button>
                  <button 
                    onClick={() => setCabStep('request')}
                    className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold py-2 px-4 rounded-lg border border-red-100 cursor-pointer"
                  >
                    Cancel Ride Request
                  </button>
                </div>
              </div>
            )}

            {/* Matched Driver detail step */}
            {cabStep === 'matched' && (
              <div id="cab-matched-step" className="max-w-2xl mx-auto bg-gradient-to-br from-slate-900 to-slate-850 p-8 md:p-10 rounded-[36px] shadow-2xl space-y-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                
                <div className="text-center space-y-1.5 pb-2 border-b border-white/10">
                  <span className="text-[10px] font-black tracking-widest uppercase bg-emerald-500 text-white px-3.5 py-1 rounded-full leading-none inline-block">
                    ★ Driver Connected
                  </span>
                  <h3 className="text-2xl font-black tracking-tight mt-1">Excellent! Your Ride is Matched!</h3>
                  <p className="text-xs text-slate-300 font-bold">Arriving in approximately <span className="text-emerald-400">2 minutes</span> at Esplanade</p>
                </div>

                {/* Main Driver display match block */}
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    {/* Avatar with placeholder */}
                    <div className="w-16 h-16 bg-blue-600/30 text-white rounded-full flex items-center justify-center text-2xl font-black border-2 border-white/20 select-none">
                      RK
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-base">Rakesh Kumar</h4>
                      <p className="text-xs text-blue-300 font-bold flex items-center gap-1.5 mt-0.5">
                        <span className="bg-yellow-500 text-black text-[9px] px-1 font-black rounded">★ 4.8</span>
                        <span>Gold Elite Partner • 1,200+ Trips</span>
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-right text-xs">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Assigned Car Coach</span>
                    <strong className="text-base font-extrabold text-blue-100 block">White Maruti Swift Dzire</strong>
                    <span className="bg-white/20 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-md mt-1.5 inline-block border border-white/10 uppercase tracking-widest">
                      WB-02-KB-1234
                    </span>
                  </div>
                </div>

                {/* OTP Security Pass code precisely as in Screen 3 */}
                <div className="bg-slate-800/85 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block">SECURE BOARDING PIN</span>
                    <span className="text-xs text-slate-200 mt-0.5 block leading-snug">Provide pin to start navigation leg</span>
                  </div>
                  <strong className="text-2xl font-black font-mono tracking-widest text-yellow-400 bg-white/10 px-4 py-1.5 rounded-lg">1234</strong>
                </div>

                {/* Helpful interactive triggers */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs pt-2">
                  <button onClick={() => alert('Placing dialer connection to Rakesh Kumar at +91 98842 12122...')} className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl border border-white/10 font-bold text-center cursor-pointer">
                    📞 Call Driver
                  </button>
                  <button onClick={() => alert('Opening encrypted message terminal container...')} className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl border border-white/10 font-bold text-center cursor-pointer">
                    💬 Message
                  </button>
                  <button onClick={() => alert('Link copied! Share secure tracking GPS map with your contacts.')} className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl border border-white/10 font-bold text-center cursor-pointer">
                    🔗 Share Route
                  </button>
                  <button onClick={() => alert('🚨 EMERGENCY PROTOCOLS ACTIVATED: Your live GPS is instantly shared with state security units.')} className="w-full bg-red-650 hover:bg-red-600 text-white py-3 rounded-xl font-bold text-center cursor-pointer">
                    ⚠️ Safety Aid
                  </button>
                </div>

                {/* Complete Trip Simulation for clean user flow & wallet transactional debit */}
                <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <span className="text-xs text-slate-400 font-bold">Press complete trip to simulate payment:</span>
                  <button 
                    onClick={() => {
                      const finalRidePrice = Math.max(0, (selectedCabType === 'mini' ? 180 : selectedCabType === 'sedan' ? 240 : 350) - cabDiscount);
                      if (walletBalance < finalRidePrice) {
                        alert('Warning: Your current wallet balance is insufficient. We will deduct ₹' + finalRidePrice + ' from alternative cards.');
                      }
                      
                      // Deduct wallet balance
                      setWalletBalance(prev => Math.max(0, prev - finalRidePrice));
                      
                      // Inject transaction ledger record
                      const newTx = {
                        title: `Cab Ride: ${searchFrom} ➔ ${searchTo}`,
                        amount: -finalRidePrice,
                        type: 'debit' as const,
                        date: '22 May 2024'
                      };
                      setTransactions([newTx, ...transactions]);

                      // Success flow modal
                      alert('Trip concluded successfully! ₹' + finalRidePrice + ' deducted from Wallet. Your receipt is logged.');

                      // Re-add to Booking History
                      setConfirmedBookings([
                        {
                          ticketId: `NKL-${Math.floor(10000 + Math.random() * 90000)}`,
                          route: `${searchFrom} ⇄ ${searchTo} (Cab)`,
                          date: searchDate,
                          busOperator: `Niklo ${selectedCabType.toUpperCase()} Ride`,
                          busType: 'GPS Premium Car Taxi',
                          seats: ['Cab Seat'],
                          price: finalRidePrice,
                          departure: 'Current Time',
                          arrival: '22 Mins Later'
                        },
                        ...confirmedBookings
                      ]);

                      setCabStep('request');
                      setCurrentStep('home');
                    }}
                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-3.5 px-6 rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer text-xs uppercase text-center"
                  >
                    ⚡ Arrived! Conclude Trip & Pay
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

        {/* 3. LIST OF VEHICLE OPTIONS AND SCHEDULE RESULTS FOR INTERCITY BUS */}
        {bottomTab === 'home' && currentStep === 'results' && selectedService === 'bus' && (
          <div id="results-view" className="flex-1 max-w-4xl mx-auto px-4 py-6 w-full animate-fade-in space-y-6">
            
            {/* Upper Route overview block matching screenshot header */}
            <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-5 rounded-3xl shadow-lg relative overflow-hidden" id="bus-booking-results-header">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-lg" />
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setCurrentStep('search')} 
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
                    title="Back to search"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="text-left">
                    <h1 className="text-lg font-black tracking-tight flex items-center gap-2">
                      <span>{searchFrom}</span> 
                      <span className="text-blue-200">➔</span> 
                      <span>{searchTo}</span>
                    </h1>
                    <p className="text-[10px] text-blue-100 font-extrabold tracking-wider uppercase mt-0.5">{searchDate} • {passengerCount} Passenger{passengerCount > 1 ? 's' : ''}</p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md text-[10px] font-black px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                  <span>GPS active dispatcher</span>
                </div>
              </div>
            </div>

            {/* Dynamic Sliding Date Ribbon - Matches Screenshot 1 */}
            <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm overflow-x-auto flex gap-2 no-scrollbar" id="date-slider-ribbon">
              {[
                { label: '22 May', dayName: 'Wednesday', val: '22 May 2024' },
                { label: '23 May', dayName: 'Thursday', val: '23 May 2024' },
                { label: '24 May', dayName: 'Friday', val: '24 May 2024' },
                { label: '25 May', dayName: 'Saturday', val: '25 May 2024' },
                { label: '26 May', dayName: 'Sunday', val: '26 May 2024' }
              ].map((dt) => (
                <button
                  key={dt.val}
                  onClick={() => setSearchDate(dt.val)}
                  className={`flex-1 min-w-[90px] py-2.5 px-3 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                    searchDate === dt.val
                      ? 'bg-blue-600 text-white shadow-md font-black'
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100 font-semibold'
                  }`}
                >
                  <span className="text-xs">{dt.label}</span>
                  <span className="text-[8px] opacity-80 uppercase tracking-tight mt-0.5">{dt.dayName}</span>
                </button>
              ))}
            </div>

            {/* Horizontal Filter Row - Matches Screenshot 1 Pills */}
            <div className="flex flex-wrap gap-2" id="horizontal-filters-row">
              <button 
                onClick={() => {
                  setRatingFilter(null);
                  setOnlyAc(!onlyAc);
                }}
                className={`flex items-center gap-1.5 py-2 px-4 rounded-full border text-xs font-black transition-all cursor-pointer ${
                  onlyAc 
                    ? 'bg-blue-50 border-blue-300 text-blue-700' 
                    : 'bg-white border-slate-205 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>AC / Non-AC</span>
                <span className="text-[10px] opacity-70">▾</span>
              </button>

              <button 
                onClick={() => {
                  // Toggle high rated filter
                  setRatingFilter(ratingFilter === 4.5 ? null : 4.5);
                }}
                className={`flex items-center gap-1.5 py-2 px-4 rounded-full border text-xs font-black transition-all cursor-pointer ${
                  ratingFilter === 4.5 
                    ? 'bg-blue-50 border-blue-300 text-blue-700' 
                    : 'bg-white border-slate-205 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>★ 4.5+ Top Rated</span>
              </button>

              <button 
                onClick={() => {
                  setOperatorFilter(operatorFilter === 'SBSTC' ? 'all' : 'SBSTC');
                }}
                className={`flex items-center gap-1.5 py-2 px-4 rounded-full border text-xs font-black transition-all cursor-pointer ${
                  operatorFilter === 'SBSTC' 
                    ? 'bg-blue-50 border-blue-300 text-blue-700' 
                    : 'bg-white border-slate-205 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>SBSTC Only</span>
              </button>

              <button 
                onClick={() => {
                  // Reset filters
                  setOnlyAc(false);
                  setRatingFilter(null);
                  setOperatorFilter('all');
                }}
                className="py-2 px-4 rounded-full border border-slate-205 bg-white text-slate-500 hover:text-slate-800 text-xs font-extrabold cursor-pointer hover:bg-slate-50 transition-colors"
              >
                Reset Filters
              </button>
            </div>

            {/* Special Promo Savings Banner - Matches red discount banner */}
            <div className="bg-gradient-to-r from-red-500 to-amber-500 text-white p-4 rounded-2xl flex items-center justify-between shadow-sm animate-pulse-slow" id="exclusive-deals-banner">
              <div className="flex items-center gap-3">
                <Gift className="w-5 h-5 text-amber-100 shrink-0" />
                <div className="text-left">
                  <h5 className="text-xs font-black leading-tight">Save up to ₹200 on this route</h5>
                  <p className="text-[10px] text-red-50 leading-relaxed font-semibold">Apply code <strong className="font-mono bg-white/20 px-1.5 py-0.5 rounded text-white">RIDEBEST</strong> at booking checkouts.</p>
                </div>
              </div>
              <span className="bg-white/20 text-white font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10 shrink-0">Active</span>
            </div>

            {/* Safety First Card matching Screenshot 1 layout */}
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-start gap-3 text-left">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-black text-blue-900 leading-tight">Safety First Guidelines</h5>
                <p className="text-[10px] text-blue-650 font-bold mt-1 max-w-2xl leading-relaxed">
                  All operators conform to sanitized interiors and high safety regulations. Filtered refreshing cabin airflow is operated during the entire journey.
                </p>
              </div>
            </div>

            {/* Vehicles display cards stream */}
            <div className="space-y-4" id="vehicle-cards-list">
              {filteredBuses.length > 0 ? (
                filteredBuses.map((bus) => (
                  <div 
                    key={bus.id} 
                    className="bg-white rounded-3xl border border-slate-100 hover:border-blue-200 shadow-sm overflow-hidden hover:shadow-md transition-all p-5 flex flex-col relative text-left"
                  >
                    
                    {/* Top row: Identity and rating */}
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-md font-black text-slate-900 tracking-tight">{bus.operator}</h4>
                          <span className="inline-flex items-center gap-0.5 bg-emerald-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-lg leading-none shadow-sm shadow-emerald-500/15">
                            ★ {bus.rating}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-extrabold mt-0.5">{bus.type}</p>
                      </div>

                      <button 
                        className="p-1.5 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors cursor-pointer"
                        title="Add to Favorite Routes"
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Middle Row: Departure, Duration, Arrival timeline block */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-y border-dashed border-slate-100 my-3 items-center">
                      
                      <div className="flex items-start gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5" />
                        <div>
                          <span className="text-sm font-black text-slate-800">{bus.departureTime}</span>
                          <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{bus.depStation}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center">
                        <span className="text-[9px] text-slate-400 font-black mb-1">{bus.duration}</span>
                        <div className="w-full max-w-[140px] flex items-center justify-between text-slate-350 px-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          <div className="flex-1 h-0.5 border-t border-dashed border-slate-300" />
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        </div>
                        <span className="text-[8px] text-slate-400 font-extrabold uppercase mt-1 tracking-wider">Non-Stop Transit</span>
                      </div>

                      <div className="flex items-start gap-2.5 justify-start md:justify-end">
                        <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 md:order-last" />
                        <div className="md:text-right">
                          <span className="text-sm font-black text-slate-800">{bus.arrivalTime}</span>
                          <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{bus.arrStation}</span>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Row: Key metrics & Select CTA */}
                    <div className="flex items-center justify-between gap-4 pt-1">
                      
                      {/* Price tag, savings and remaining seats indicator */}
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-black text-blue-600">₹{bus.price}</span>
                          <span className="text-xs text-slate-400 line-through">₹{bus.originalPrice}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2.5 mt-1.5">
                          <span className="text-[10px] text-slate-400 font-extrabold">
                            {bus.seatsLeft} seats left
                          </span>
                          <span className="text-[9px] text-red-500 bg-red-50 px-2 py-0.5 rounded font-black uppercase tracking-wide">
                            🔥 Exclusive ₹125 OFF
                          </span>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          setSelectedSchedule(bus);
                          setSelectedSeats(['3A']); // Preselect seat 3A
                          setCurrentStep('seats');
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer hover:shadow-md animate-fade-in"
                      >
                        Select Seats
                      </button>

                    </div>

                    {/* Features badges on slot */}
                    <div className="mt-3 bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[8px] text-slate-500 font-black no-scrollbar uppercase tracking-wider">
                      <span className="text-[7px] text-slate-400">Amenities:</span>
                      {bus.features.map((feature, idx) => (
                        <span key={idx} className="bg-white border border-slate-150 px-1.5 py-0.5 rounded text-[8px]">
                          ✓ {feature}
                        </span>
                      ))}
                    </div>

                  </div>
                ))
              ) : (
                <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center space-y-3">
                  <p className="text-slate-500 font-extrabold text-sm">No vehicles match your active filtering checkboxes.</p>
                  <button 
                    onClick={() => {
                      setOnlyAc(false);
                      setRatingFilter(null);
                      setOperatorFilter('all');
                    }} 
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-black border border-blue-100 cursor-pointer"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

        {/* 4. CHOOSE SEATS ON GRAPHIC MAP INTERIOR */}
        {bottomTab === 'home' && currentStep === 'seats' && selectedSchedule && (
          <div id="seat-map-view" className="flex-1 max-w-4xl mx-auto px-4 py-6 w-full animate-fade-in space-y-6">
            
            {/* Header route with back navigation */}
            <div className="bg-white p-4.5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setCurrentStep('results')} 
                  className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
                  title="Back to search results"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-left">
                  <h3 className="text-base font-black tracking-tight">Select Seats</h3>
                  <p className="text-[10px] text-slate-400 font-extrabold">{searchFrom} ➔ {searchTo} • {searchDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-400 rounded-full cursor-pointer"><Heart className="w-4 h-4" /></button>
                <button className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-400 rounded-full cursor-pointer"><Sparkles className="w-4 h-4 text-amber-500" /></button>
              </div>
            </div>

            {/* Boarding and Drop-off Location Cards matching Screenshot 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="points-overview-cards">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center text-left">
                <div>
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Boarding Point</span>
                  <strong className="text-xs text-slate-800 block mt-1">08:00 PM • Esplanade</strong>
                </div>
                <button onClick={() => alert('Change boarding location option')} className="text-[10px] text-blue-600 font-black hover:underline cursor-pointer">Change</button>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center text-left">
                <div>
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Destination Point</span>
                  <strong className="text-xs text-slate-800 block mt-1">06:30 AM • Tenzing Norgay Bus Stand</strong>
                </div>
                <button onClick={() => alert('Change dropoff location option')} className="text-[10px] text-blue-600 font-black hover:underline cursor-pointer">Change</button>
              </div>
            </div>

            {/* Deck Selector Tabs and Legend Keys */}
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              
              <div className="flex bg-slate-55 p-1 rounded-2xl max-w-xs mx-auto" id="deck-tabs-selector">
                <button
                  type="button"
                  onClick={() => setSeatDeck('lower')}
                  className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                    seatDeck === 'lower' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Lower Deck
                </button>
                <button
                  type="button"
                  onClick={() => setSeatDeck('upper')}
                  className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                    seatDeck === 'upper' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Upper Deck
                </button>
              </div>

              {/* Legendary items */}
              <div className="flex items-center justify-center gap-6 text-[10px] font-black text-slate-500 border-t border-slate-50 pt-3 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded border-2 border-slate-300 bg-white" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded bg-blue-100 border-2 border-blue-400" />
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded bg-slate-200 border-2 border-slate-300 text-slate-400" />
                  <span>Booked</span>
                </div>
              </div>

            </div>

            {/* Side-by-side Seat Map vs Informative features & Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Graphic Seat Interior Simulator Column */}
              <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col items-center">
                <span className="text-[8px] font-black text-slate-400 tracking-wider uppercase mb-4 leading-none">
                  {seatDeck === 'lower' ? 'Lower Deck - Seater Standard' : 'Upper Deck - Sleeper Berths'}
                </span>

                <div className="w-full max-w-[270px] border border-slate-200 rounded-[30px] p-5 space-y-4 bg-slate-50 relative">
                  
                  {/* Driver Wheel Block */}
                  <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                    <span className="text-[10px] text-slate-450 font-black tracking-wider uppercase">Driver Desk</span>
                    <span className="w-6 h-6 rounded-full border-2 border-slate-400 text-slate-500 flex items-center justify-center font-bold text-xs select-none">
                      ⎋
                    </span>
                  </div>

                  {/* Seat Grid Layout - Standard Squares for Seater, long Rectangles for Sleeper! */}
                  <div className="space-y-4">
                    {seatDeck === 'lower' ? (
                      /* Lower Deck: Standard Seater Seats (2 columns on left, 2 columns on right) */
                      [
                        { left: ['1A', '1B'], right: ['1C', '1D'] },
                        { left: ['2A', '2B'], right: ['2C', '2D'] },
                        { left: ['3A', '3B'], right: ['3C', '3D'] },
                        { left: ['4A', '4B'], right: ['4C', '4D'] },
                        { left: ['5A', '5B'], right: ['5C', '5D'] },
                      ].map((row, rIdx) => {
                        const isBookedRow = rIdx === 1 || rIdx === 4;
                        return (
                          <div key={rIdx} className="flex justify-between items-center">
                            {/* Left seats */}
                            <div className="flex gap-1.5">
                              {row.left.map((seat) => {
                                const isSelected = selectedSeats.includes(seat);
                                const isBooked = isBookedRow && seat.endsWith('B');
                                return (
                                  <button
                                    key={seat}
                                    type="button"
                                    disabled={isBooked}
                                    onClick={() => handleSeatClick(seat)}
                                    className={`w-9 h-9 rounded-lg font-black text-[10px] transition-all flex items-center justify-center relative cursor-pointer border-2 ${
                                      isBooked 
                                        ? 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed'
                                        : isSelected
                                        ? 'bg-blue-100 border-blue-600 text-blue-800 shadow-sm shadow-blue-500/15'
                                        : 'bg-white border-slate-250 text-slate-700 hover:border-slate-400'
                                    }`}
                                  >
                                    {seat}
                                  </button>
                                );
                              })}
                            </div>

                            <span className="text-[7px] text-slate-350 font-black uppercase">aisle</span>

                            {/* Right seats */}
                            <div className="flex gap-1.5">
                              {row.right.map((seat) => {
                                const isSelected = selectedSeats.includes(seat);
                                const isBooked = isBookedRow && seat.endsWith('C');
                                return (
                                  <button
                                    key={seat}
                                    type="button"
                                    disabled={isBooked}
                                    onClick={() => handleSeatClick(seat)}
                                    className={`w-9 h-9 rounded-lg font-black text-[10px] transition-all flex items-center justify-center relative cursor-pointer border-2 ${
                                      isBooked 
                                        ? 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed'
                                        : isSelected
                                        ? 'bg-blue-100 border-blue-600 text-blue-800 shadow-sm shadow-blue-500/15'
                                        : 'bg-white border-slate-250 text-slate-700 hover:border-slate-400'
                                    }`}
                                  >
                                    {seat}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      /* Upper Deck: Sleeper Berths (horizontal rect rectangles as in Screenshot 3) */
                      [
                        { left: 'SL1', right: 'SL2' },
                        { left: 'SL3', right: 'SL4' },
                        { left: 'SL5', right: 'SL6' },
                        { left: 'SL7', right: 'SL8' },
                      ].map((sleeperRow, sIdx) => {
                        const isBookedBerth = sIdx === 1;
                        return (
                          <div key={sIdx} className="flex justify-between items-center">
                            {/* Left Sleepers */}
                            <button
                              type="button"
                              disabled={isBookedBerth}
                              onClick={() => handleSeatClick(sleeperRow.left)}
                              className={`w-20 py-3 rounded-lg font-black text-[9px] transition-all flex flex-col items-center justify-center relative cursor-pointer border-2 ${
                                isBookedBerth
                                  ? 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed'
                                  : selectedSeats.includes(sleeperRow.left)
                                  ? 'bg-blue-100 border-blue-600 text-blue-800 shadow-sm shadow-blue-500/15'
                                  : 'bg-white border-slate-250 text-slate-700 hover:border-slate-400'
                              }`}
                            >
                              <div className="absolute top-1 left-1.5 w-1 h-2.5 bg-slate-300 rounded-sm" />
                              <span className="mt-0.5">{sleeperRow.left}</span>
                              <span className="text-[6px] tracking-tight opacity-75">Sleeper</span>
                            </button>

                            <span className="text-[7px] text-slate-350 font-black uppercase">aisle</span>

                            {/* Right Sleepers */}
                            <button
                              type="button"
                              disabled={isBookedBerth}
                              onClick={() => handleSeatClick(sleeperRow.right)}
                              className={`w-20 py-3 rounded-lg font-black text-[9px] transition-all flex flex-col items-center justify-center relative cursor-pointer border-2 ${
                                isBookedBerth
                                  ? 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed'
                                  : selectedSeats.includes(sleeperRow.right)
                                  ? 'bg-blue-100 border-blue-600 text-blue-800 shadow-sm shadow-blue-500/15'
                                  : 'bg-white border-slate-250 text-slate-700 hover:border-slate-400'
                              }`}
                            >
                              <div className="absolute top-1 right-1.5 w-1 h-2.5 bg-slate-300 rounded-sm" />
                              <span>{sleeperRow.right}</span>
                              <span className="text-[6px] tracking-tight opacity-75">Sleeper</span>
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>

                </div>
              </div>

              {/* Informative column containing reviews, amenities, offers, etc. */}
              <div className="lg:col-span-7 space-y-6 text-left">
                
                {/* Amenities Block "Bus features" - Matches Screenshot 2 */}
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Bus Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {['AC', 'Charging Point', 'Blanket', 'Live Tracking', 'Water Bottle'].map((feat, index) => (
                      <span key={index} className="text-[10px] font-black bg-slate-50 text-slate-600 border border-slate-150 px-3 py-1.5 rounded-lg">
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Offers & Benefits Section - Matches Screenshot 2 */}
                <div className="bg-emerald-50 border border-emerald-100 p-4.5 rounded-3xl text-left shadow-sm flex items-start gap-3" id="offers-benefits-section">
                  <span className="bg-emerald-100 text-emerald-700 p-2 rounded-xl text-xs font-black">🎉</span>
                  <div>
                    <h5 className="text-xs font-black text-emerald-900">Offers & Benefits</h5>
                    <p className="text-[10px] text-emerald-700 font-bold mt-1">You saved ₹125 on this booking! Free cancellation protection is activated.</p>
                  </div>
                </div>

                {/* Ratings & reviews component matching Screenshot 2 */}
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Ratings & reviews</h4>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-500 text-white rounded-2xl p-4 text-center shrink-0">
                      <strong className="text-2xl font-black block">4.5</strong>
                      <span className="text-[8px] font-bold uppercase tracking-wider opacity-80 block">Very Good</span>
                    </div>

                    <div className="flex-1 space-y-1.5">
                      {[
                        { star: '5 ★', percent: '72%', color: 'bg-emerald-500' },
                        { star: '4 ★', percent: '18%', color: 'bg-emerald-400' },
                        { star: '3 ★', percent: '7%', color: 'bg-amber-400' },
                        { star: '2 ★', percent: '2%', color: 'bg-orange-400' },
                        { star: '1 ★', percent: '1%', color: 'bg-red-500' }
                      ].map((rt, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-[10px] font-black text-slate-500">
                          <span className="w-8 shrink-0">{rt.star}</span>
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full ${rt.color}`} style={{ width: rt.percent }} />
                          </div>
                          <span className="w-8 text-right font-extrabold text-slate-400">{rt.percent}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom transaction summaries footer with CTA */}
                <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 rounded-3xl shadow-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-indigo-200 font-black uppercase tracking-wider block">Chosen Seats</span>
                      <strong className="text-blue-400 text-lg font-black mt-1 block tracking-wider uppercase">{selectedSeats.join(', ')}</strong>
                      <span className="text-[9px] text-slate-400 mt-1 block">{selectedSeats.length} Seats selected</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-indigo-200 font-black uppercase tracking-wider block">Base Fare</span>
                      <strong className="text-white text-2xl font-black mt-1 block">₹{selectedSchedule.price * selectedSeats.length}</strong>
                    </div>
                  </div>

                  <button 
                    onClick={() => setCurrentStep('passenger')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-blue-500/10 transition-transform active:scale-[0.98] text-xs uppercase tracking-wider block text-center cursor-pointer"
                  >
                    Continue to Passenger Details ➔
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* 5. PASSENGER INFORMATION ENTRY DETAILS */}
        {bottomTab === 'home' && currentStep === 'passenger' && selectedSchedule && (
          <div id="passenger-checkout-view" className="flex-1 max-w-4xl mx-auto px-4 py-6 w-full animate-fade-in space-y-6">
            
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setCurrentStep('seats')} 
                  className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
                  title="Back to Seat Selection"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-left">
                  <h3 className="text-base font-black tracking-tight">Traveller Details</h3>
                  <p className="text-[10px] text-slate-400 font-extrabold">{selectedSchedule.operator} • Service {selectedSchedule.id}</p>
                </div>
              </div>
              <span className="text-[9px] bg-blue-50 text-blue-700 font-black border border-blue-100 px-3 py-1.5 rounded-full uppercase tracking-wider">Checkout</span>
            </div>

            {/* Split screen: forms left, billing summary sticky on right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Checkout inputs */}
              <div className="lg:col-span-7 space-y-5">
                
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest block pb-1 border-b border-slate-100 text-left">Traveler Specifications</h4>

                {/* Looped forms dynamically matching seats chosen */}
                {passengers.map((passenger, pIdx) => {
                  const seatCode = selectedSeats[pIdx] || '3A';
                  const isSleeperLabel = seatCode.startsWith('SL');
                  return (
                    <div key={pIdx} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 text-left">
                      <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                        <span className="text-[10px] font-black text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-lg uppercase tracking-wider">
                          {isSleeperLabel ? `Sleeper Berth ${seatCode}` : `Seater Seat ${seatCode}`}
                        </span>
                        <span className="text-[9px] text-slate-400 font-extrabold uppercase">Traveler #{pIdx + 1}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="space-y-1.5 md:col-span-6">
                          <label htmlFor={`traveller-name-${pIdx}`} className="text-[10px] font-black text-slate-450 uppercase tracking-wide block">Full Name</label>
                          <input 
                            id={`traveller-name-${pIdx}`}
                            type="text" 
                            value={passenger.name}
                            onChange={(e) => {
                              const updated = [...passengers];
                              if (!updated[pIdx]) updated[pIdx] = { name: '', age: '28', gender: 'Male' };
                              updated[pIdx].name = e.target.value;
                              setPassengers(updated);
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-extrabold text-slate-700 focus:outline-none focus:border-blue-400"
                            placeholder="Full Name as on Govt ID"
                            required
                          />
                        </div>

                        <div className="space-y-1.5 md:col-span-3">
                          <label htmlFor={`traveller-age-${pIdx}`} className="text-[10px] font-black text-slate-450 uppercase tracking-wide block">Age</label>
                          <input 
                            id={`traveller-age-${pIdx}`}
                            type="number" 
                            value={passenger.age}
                            onChange={(e) => {
                              const updated = [...passengers];
                              if (!updated[pIdx]) updated[pIdx] = { name: '', age: '28', gender: 'Male' };
                              updated[pIdx].age = e.target.value;
                              setPassengers(updated);
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-extrabold text-slate-700 focus:outline-none focus:border-blue-400"
                            placeholder="Age"
                            min="1"
                            max="125"
                            required
                          />
                        </div>

                        <div className="space-y-1.5 md:col-span-3">
                          <label htmlFor={`traveller-gender-${pIdx}`} className="text-[10px] font-black text-slate-450 uppercase tracking-wide block">Gender</label>
                          <select 
                            id={`traveller-gender-${pIdx}`}
                            value={passenger.gender}
                            onChange={(e) => {
                              const updated = [...passengers];
                              if (!updated[pIdx]) updated[pIdx] = { name: '', age: '28', gender: 'Male' };
                              updated[pIdx].gender = e.target.value;
                              setPassengers(updated);
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-black text-slate-700 outline-none cursor-pointer focus:border-blue-400"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Contact settings Card */}
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 text-left">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest block">Contact Information</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <Mail className="w-5 h-5 text-slate-400 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <label htmlFor="contact-email-input" className="text-[8px] font-black text-slate-400 uppercase block">Send Ticket to Email</label>
                        <input 
                          id="contact-email-input"
                          type="email" 
                          value={contactEmail} 
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="bg-transparent w-full text-xs font-extrabold text-slate-750 focus:outline-none min-h-[20px]"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <Phone className="w-5 h-5 text-slate-400 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <label htmlFor="contact-phone-input" className="text-[8px] font-black text-slate-400 uppercase block">Mobile Phone Number</label>
                        <input 
                          id="contact-phone-input"
                          type="text" 
                          value={contactPhone} 
                          onChange={(e) => setContactPhone(e.target.value)}
                          className="bg-transparent w-full text-xs font-extrabold text-slate-750 focus:outline-none min-h-[20px]"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-[9px] text-slate-400 font-bold leading-normal">Your mobile number will be used for sending the tracking M-Ticket and emergency announcements via SMS.</p>
                </div>

                {/* Cover and protecting packs */}
                <div className="space-y-3 text-left">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest block">Protection Benefits</h4>
                  
                  <div className="bg-white rounded-3xl border border-slate-100 p-5 space-y-4 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <label htmlFor="free-cancellation-checkbox" className="text-xs font-black text-slate-800 cursor-pointer block">Flexible Booking (Refund on Cancellation)</label>
                        <p className="text-[10px] text-slate-450 font-bold leading-normal">Cancel up to 24 hours prior to travel reporting time and get a full 100% money-back refund. Save ₹99/passenger.</p>
                      </div>
                      <input 
                        id="free-cancellation-checkbox"
                        type="checkbox" 
                        checked={freeCancellation} 
                        onChange={() => setFreeCancellation(!freeCancellation)}
                        className="w-5 h-5 text-blue-600 rounded mt-1 cursor-pointer"
                      />
                    </div>

                    <div className="flex items-start justify-between gap-4 pt-4 border-t border-slate-50">
                      <div className="space-y-1">
                        <label htmlFor="insure-journey-checkbox" className="text-xs font-black text-slate-800 cursor-pointer block">Emergency Medical & Journey Accident Shield Protection</label>
                        <p className="text-[10px] text-slate-450 font-bold leading-normal">Get comprehensive travel transit coverage up to ₹50,000 accidental shield, powered by Niklo Assist for just ₹15/passenger.</p>
                      </div>
                      <input 
                        id="insure-journey-checkbox"
                        type="checkbox" 
                        checked={insureJourney} 
                        onChange={() => setInsureJourney(!insureJourney)}
                        className="w-5 h-5 text-blue-600 rounded mt-1 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* sticky right invoice breakdown summary card */}
              <div className="lg:col-span-5 lg:sticky lg:top-40 space-y-5 text-left">
                
                {/* Boarding route feedback */}
                <div className="bg-slate-900 text-white p-5 rounded-3xl shadow-sm space-y-3">
                  <span className="text-[8px] tracking-widest uppercase text-indigo-300 font-black">Route Overview</span>
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <strong className="block text-sm text-white font-extrabold">{searchFrom}</strong>
                      <span className="text-[10px] text-slate-400">Esplanade</span>
                    </div>
                    <span className="text-slate-500">➔</span>
                    <div>
                      <strong className="block text-sm text-white font-extrabold">{searchTo}</strong>
                      <span className="text-[10px] text-slate-400">Tenzing Norgay Stand</span>
                    </div>
                  </div>
                  <div className="border-t border-slate-800 pt-3 flex justify-between text-[10px] text-slate-400 font-extrabold">
                    <span>Date: {searchDate}</span>
                    <span className="text-indigo-400">Seat(s): {selectedSeats.join(', ')}</span>
                  </div>
                </div>

                {/* Interactive Promo Coupon Module ( Delighter Touch! ) */}
                <div className="bg-white p-4.5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                  <h5 className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Offers & Promo Codes</h5>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      id="promo-coupon-code"
                      placeholder="Enter Coupon (e.g. RED50)" 
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-extrabold uppercase placeholder-slate-450 focus:outline-none"
                    />
                    <button 
                      onClick={() => {
                        const codeElem = document.getElementById('promo-coupon-code') as HTMLInputElement;
                        if (codeElem && codeElem.value.trim().toUpperCase() === 'RED50') {
                          alert('Success: Promo code RED50 applied! ₹50 Discount subtracted from total charge.');
                        } else {
                          alert('Please enter a valid coupon code like RED50 to get a ₹50 discount.');
                        }
                      }}
                      className="bg-slate-900 text-white hover:bg-slate-800 text-[10px] font-black px-4 rounded-xl transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-[9px] text-slate-450 font-semibold italic">Tip: Type <strong className="text-emerald-600 not-italic font-black">RED50</strong> to claim a ₹50 discount!</p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <h4 className="font-black text-slate-800 text-xs pb-2 border-b border-dashed border-slate-200 uppercase tracking-wider">Invoice Summary</h4>
                  
                  <div className="space-y-3 text-[11px] text-slate-500 font-bold">
                    <div className="flex justify-between">
                      <span>Base Ticket ({selectedSeats.length} Seat)</span>
                      <strong className="text-slate-800 font-extrabold">₹{selectedSchedule.price * selectedSeats.length}</strong>
                    </div>

                    {freeCancellation && (
                      <div className="flex justify-between text-slate-500">
                        <span>Free Cancellation protection</span>
                        <strong className="text-slate-700 font-extrabold">+₹{selectedSeats.length * 99}</strong>
                      </div>
                    )}

                    {insureJourney && (
                      <div className="flex justify-between text-slate-500">
                        <span>Journey accident shield</span>
                        <strong className="text-slate-700 font-extrabold">+₹{selectedSeats.length * 15}</strong>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Convenience GST service fee</span>
                      <strong className="text-slate-700 font-extrabold">+₹45</strong>
                    </div>

                    <div className="flex justify-between pt-3 border-t border-dashed border-slate-200 text-blue-600 font-black text-xs uppercase tracking-wider">
                      <span>Total Invoice</span>
                      <span className="text-base text-blue-700 font-black">₹{calculateTotalCharge()}</span>
                    </div>

                  </div>

                  <button 
                    onClick={handleConfirmPayment}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-transform active:scale-[0.98] text-xs uppercase tracking-wider block text-center cursor-pointer"
                  >
                    Authorize Ticket & Pay ₹{calculateTotalCharge()}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[9px] font-bold text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>256-bit encrypted secure checkout connection</span>
                  </div>

                </div>
              </div>

            </div>

          </div>
        )}

        {/* 6. PAYMENT CONFIRMATION SUCCESS INVOICE RECEIPT */}
        {bottomTab === 'home' && currentStep === 'success' && (
          <div id="payment-success-view" className="flex-1 max-w-2xl mx-auto px-6 py-12 w-full animate-fade-in flex flex-col items-center justify-center">
            
            <div className="bg-gradient-to-b from-blue-700 via-blue-650 to-blue-600 text-white p-8 md:p-10 rounded-[36px] shadow-2xl text-center space-y-6 w-full relative overflow-hidden">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-16 -mt-16 blur-xl" />

              {/* Check Circle animated */}
              <div className="relative flex items-center justify-center h-28 w-28 mx-auto">
                <div className="absolute inset-0 bg-white/10 rounded-full animate-ping opacity-50" />
                <div className="absolute inset-2 bg-white/15 rounded-full animate-pulse" />
                <div className="relative w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-8 h-8 text-blue-650 stroke-[3]" />
                </div>
              </div>

              <div className="space-y-2 relative z-10">
                <span className="text-[10px] font-black tracking-widest uppercase bg-white/20 px-4 py-1.5 rounded-full border border-white/10 block w-fit mx-auto leading-none">
                  Transaction Authorized
                </span>
                <h3 className="text-2xl font-black mt-3">Ticket Booked Successfully!</h3>
                <p className="text-xs text-blue-150 font-bold max-w-sm mx-auto leading-relaxed">
                  Your reservation is confirmed. Please board on {searchDate} at departure port.
                </p>
              </div>

              {/* Receipt invoice itemized details */}
              <div className="w-full bg-white/10 p-6 rounded-2xl border border-white/10 text-left space-y-4 backdrop-blur-md relative overflow-hidden text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <div>
                    <span className="text-[9px] text-blue-200 font-extrabold uppercase tracking-widest block">Digital Ticket ID</span>
                    <span className="font-extrabold font-mono text-white text-sm">{activeBooking?.ticketId || 'BBTC-72120'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-blue-200 font-extrabold uppercase tracking-widest block font-mono">Assigned Seats</span>
                    <span className="font-extrabold text-white text-sm bg-white/25 px-2 py-0.5 rounded-md inline-block">{activeBooking?.seats.join(', ') || '3A'}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] text-blue-200 font-extrabold uppercase tracking-widest block">Active Port corridor</span>
                  <span className="font-black text-sm text-white">
                    {searchFrom} ⇄ {searchTo}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs pt-1">
                  <div>
                    <span className="text-[9px] text-blue-200 font-bold tracking-wider block">Boarding Reporting</span>
                    <span className="font-extrabold text-white">{selectedSchedule ? selectedSchedule.departureTime : '08:00 PM'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-blue-200 font-bold tracking-wider block">Arrival Port Target</span>
                    <span className="font-extrabold text-white">{selectedSchedule ? selectedSchedule.arrivalTime : '05:30 AM'}</span>
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full pt-4 relative z-10 text-xs">
                <button 
                  onClick={() => {
                    setBottomTab('bookings');
                    setCurrentStep('home');
                  }}
                  className="w-full bg-white hover:bg-slate-55 text-blue-700 font-extrabold py-3.5 rounded-xl shadow-md cursor-pointer transition-transform active:scale-[0.98]"
                >
                  View My Tickets history
                </button>

                <button 
                  onClick={() => {
                    setCurrentStep('home');
                    setBottomTab('home');
                    setSelectedSchedule(null);
                  }}
                  className="w-full bg-white/10 hover:bg-white/25 text-white font-extrabold py-3.5 rounded-xl border border-white/20 cursor-pointer transition-colors"
                >
                  Back to Dashboard Home
                </button>
              </div>

            </div>

          </div>
        )}

        {/* 7. PERSISTED BOOKINGS HISTORY LIST SCREEN */}
        {bottomTab === 'bookings' && currentStep === 'home' && (
          <div id="persisted-history-view" className="flex-1 max-w-4xl mx-auto px-6 py-10 w-full animate-fade-in">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Active & Past Bookings</h3>
                <p className="text-sm text-slate-400 mt-1 font-medium">Access details, digital coupons, and cancel policies easily</p>
              </div>

              <div className="space-y-4">
                {confirmedBookings.map((bk, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 relative overflow-hidden group hover:border-blue-200 transition-all">
                    <div className="absolute top-0 left-0 w-2 bg-blue-600 h-full" />
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pl-2">
                      <div>
                        <span className="text-[9px] font-black tracking-widest bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100 uppercase">
                          Confirmed & Sanitized
                        </span>
                        <h4 className="text-lg font-black text-slate-800 mt-2.5">{bk.route}</h4>
                        <p className="text-xs text-slate-400 font-bold mt-0.5">{bk.date} • {bk.departure}</p>
                      </div>

                      <div className="md:text-right flex md:flex-col items-baseline md:items-end justify-between md:justify-center gap-2">
                        <span className="text-xs font-mono font-extrabold text-slate-400 block">{bk.ticketId}</span>
                        <span className="text-lg font-black text-blue-600 block mt-1">₹{bk.price}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs pt-4 border-t border-slate-50 pl-2">
                      <div className="flex flex-col text-[10px] text-slate-500 font-semibold space-y-0.5">
                        <span className="font-extrabold uppercase tracking-wide text-slate-400">Assigned Coach</span>
                        <strong className="text-slate-700 font-extrabold text-xs">{bk.busOperator} • Seat {bk.seats.join(', ')}</strong>
                      </div>

                      <span className="text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg">
                        BOARDING PASS READY
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 8. HOLIDAY TOUR PACKAGES TAB DETAIL */}
        {bottomTab === 'packages' && (
          <div id="persisted-packages-view" className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10 w-full animate-fade-in text-slate-800">
            {/* LOCAL MOCK DATA FOR TRAVEL PACKAGES */}
            {(() => {
              const MOCK_PACKAGES_DATA = [
                {
                  id: 'pkg-1',
                  title: 'Goa Beach Escape',
                  destinations: 'Goa Coastline & Beaches',
                  tagline: 'Sun-soaked sands, coastal cuisine & historic forts',
                  duration: '4 Days / 3 Nights',
                  price: 8999,
                  rating: 4.8,
                  reviewsCount: 245,
                  style: 'Beach Holidays',
                  isBestSeller: true,
                  image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
                  description: 'Escape to the pristine coastline of Goa. This curated package covers south Goa heritage churches, Miramar beach sunbathing, north Goa watersports, and dynamic cruise expeditions. Experience the ultimate beach vibes with premium beachfront hotel stays, comfortable private airport pick-up, and fresh complimentary local meals.',
                  itinerary: [
                    { day: 'Day 1: Coast Arrival & Cruise', details: 'Touch down at Manohar International Airport. Drive to your seaside resort. In the evening, embark on a scenic cruise along Mandovi river.' },
                    { day: 'Day 2: North Goa Adventures', details: 'Full day sightseeing of North Goa. Enjoy watersports at Calangute Beach, shop in Anjuna flea markets, and explore Fort Aguada.' },
                    { day: 'Day 3: South Goa Wonders', details: 'Discover the heritage of South Goa. Visit Old Goa Churches, Mangueshi Temple, and enjoy a spices walk with lunch at a local plantation.' },
                    { day: 'Day 4: Departure', details: 'Enjoy a leisurely breakfast overlooking the ocean. Cherish beach memories as our private cab drops you back to the airport.' }
                  ],
                  travelers: '2-4 Travelers',
                  difficulty: 'Easy'
                },
                {
                  id: 'pkg-2',
                  title: 'Goa Leisure Getaway',
                  destinations: 'Panaji, Calangute, Dudhsagar',
                  tagline: 'Relaxed beach resort stay & historic local tours',
                  duration: '5 Days / 4 Nights',
                  price: 12499,
                  rating: 4.9,
                  reviewsCount: 189,
                  style: 'Beach Holidays',
                  isBestSeller: false,
                  image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600',
                  description: 'Spend an unhurried vacation enjoying the beauty of nature and Portuguese influence in Goa. Includes dynamic Dudhsagar falls excursion, private vehicle tracking, and spice plantations experience.',
                  itinerary: [
                    { day: 'Day 1: Arrival & Rejuvenating Spa', details: 'Arrive in Goa and check in to your heritage villa. Indulge in an optional evening beachside Ayurvedic massage.' },
                    { day: 'Day 2: Dudhsagar Waterfalls Tour', details: 'Embark on a jeep safari through Bhagwan Mahavir Wildlife Sanctuary to witness majestic Dudhsagar waterfalls.' },
                    { day: 'Day 3: Heritage Panaji Walk', details: 'Stroll through the colorful colonial Latin Quarter of Fontainhas. Evening shopping at Panaji local markets.' },
                    { day: 'Day 4: Spice Plantation Tour', details: 'Guided tour of farm spice orchards followed by an authentic traditional feast served on banana leaves.' },
                    { day: 'Day 5: Departure', details: 'Check out from the resort and transfer to the airport with sweet travel souvenirs.' }
                  ],
                  travelers: '2-6 Travelers',
                  difficulty: 'Moderate'
                },
                {
                  id: 'pkg-3',
                  title: 'Goa Romantic Retreat',
                  destinations: 'Vagator, Candolim, South Goa',
                  tagline: 'Private candlelit dinner & premium boutique stay',
                  duration: '4 Days / 3 Nights',
                  price: 11850,
                  rating: 4.8,
                  reviewsCount: 162,
                  style: 'Honeymoon',
                  isBestSeller: true,
                  image: 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&q=80&w=600',
                  description: 'Indulge in absolute luxury and privacy designed specifically for couples. A candlelit dinner on a peaceful private beach, private pool villa options and premium Champagne arrival.',
                  travelers: '2 Travelers',
                  difficulty: 'Easy',
                  itinerary: [
                    { day: 'Day 1: Welcome & Sunset Dinner', details: 'Private limousine transfer. Check-in to Premium Ocean View suite. Starlight beach walk and welcome dinner.' },
                    { day: 'Day 2: Private Yacht Sail', details: 'Fabulous afternoon cruising in a private catamaran. Spot dolphins and enjoy chilled mocktails.' },
                    { day: 'Day 3: South Goa Romantic Cruise', details: 'Visit peaceful Butterfly Beach via private speedboat, followed by an evening spa couple session.' },
                    { day: 'Day 4: Flight Home', details: 'Cherish romance as you check-out and take your return private cab transfer.' }
                  ]
                },
                {
                  id: 'pkg-4',
                  title: 'Goa Family Fun',
                  destinations: 'Baga, Calangute, Wax Museum',
                  tagline: 'Water theme parks, beach resort & kids programs',
                  duration: '6 Days / 5 Nights',
                  price: 14850,
                  rating: 4.6,
                  reviewsCount: 95,
                  style: 'Family Trips',
                  isBestSeller: false,
                  image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=600',
                  travelers: '4-8 Travelers',
                  difficulty: 'Easy',
                  description: 'Perfect holiday designed for families of all ages. Includes safe dolphin-watching cruise, Snow Park ticket passes, and beachfront resort games.',
                  itinerary: [
                    { day: 'Day 1: Arrival & Family Lounge', details: 'Check-in to spacious interconnected family suites. High tea on arrival. Kids activities club induction.' },
                    { day: 'Day 2: Dolphin Cruise & Fort Tour', details: 'Fascinating morning dolphin sighting boat ride, followed by a visit to historical Reis Magos Fort.' },
                    { day: 'Day 3: Water World Theme Park', details: 'All-inclusive entry passes to wet and dry rides at Splashdown Waterpark.' },
                    { day: 'Day 4: Old Goa & Science Museum', details: 'Explore historic chapels and have interactive fun at Miramar Science Center.' },
                    { day: 'Day 5: Beach Picnic & Sandcastles', details: 'Relaxed morning at Candolim beach with pre-arranged sunset family BBQ.' },
                    { day: 'Day 6: Adieu to Goa', details: 'After final buffet breakfast, check-out and private bus transfer back to airport.' }
                  ]
                },
                {
                  id: 'pkg-5',
                  title: 'Meghalaya Explorer',
                  destinations: 'Shillong, Cherrapunji, Dawki',
                  tagline: 'Experience majestic waterfalls, clean rivers & caves',
                  duration: '4 Days / 3 Nights',
                  price: 8990,
                  rating: 4.8,
                  reviewsCount: 245,
                  style: 'Mountain Escapes',
                  isBestSeller: true,
                  image: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=600',
                  description: 'An unforgettable journey into the Scotland of the East. Witness majestic waterfalls such as Elephant & Seven Sisters Falls, trek to the double-decker living root bridges, view clean crystal Dawki river, and dive deep into historical Mawsmai caves.',
                  itinerary: [
                    { day: 'Day 1: Arrival in Shillong', details: 'Arrive at Guwahati Airport/Railway Station and meet our representative. Take a scenic 3-hour journey to Shillong, stopping by Umiam Lake. Check-in to your hotel. Evening at leisure.' },
                    { day: 'Day 2: Shillong to Cherrapunji', details: 'Visit Elephant Falls and Shillong Peak. Next, drive to Cherrapunji, the wettest place on earth. Explore Mawsmai Cave, Seven Sisters Falls, Nohkalikai Falls.' },
                    { day: 'Day 3: Dawki & Mawlynnong Visit', details: 'Depart for Mawlynnong, Asia’s cleanest village. See the single living root bridge. Drive further to Dawki and enjoy boating in crystal-clear water of Umngot River.' },
                    { day: 'Day 4: Departure', details: 'After delicious local breakfast, check out from hotel. Return to Guwahati for your onward journey with fond hill memories.' }
                  ],
                  travelers: '2-6 Travelers',
                  difficulty: 'Moderate'
                }
              ];

              const filteredPackages = MOCK_PACKAGES_DATA.filter((p) => {
                // Style filter
                if (packageStyleFilter !== 'All' && p.style !== packageStyleFilter) return false;
                // Budget Filter
                if (packageBudgetFilter === 'Under ₹10k' && p.price >= 10000) return false;
                if (packageBudgetFilter === 'Above ₹10k' && p.price < 10000) return false;
                // Duration Filter
                if (packageDurationFilter === '3-4 Days' && !p.duration.includes('3 Days') && !p.duration.includes('4 Days')) return false;
                if (packageDurationFilter === '5+ Days' && (p.duration.includes('3 Days') || p.duration.includes('4 Days'))) return false;

                // Destination Query match
                if (packageTo && packageTo.trim() !== '') {
                  const query = packageTo.toLowerCase();
                  const matchesTitle = p.title.toLowerCase().includes(query);
                  const matchesDest = p.destinations.toLowerCase().includes(query);
                  const matchesStyle = p.style.toLowerCase().includes(query);
                  if (!matchesTitle && !matchesDest && !matchesStyle) return false;
                }
                return true;
              });

              return (
                <div className="space-y-6">
                  {/* STEP 1: SEARCH PAGE SCREEN */}
                  {packageStep === 'search' && (
                    <div className="space-y-8 animate-fade-in" id="packages-search-step">
                      {/* Sub-Header block matching layout */}
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-4 gap-4">
                        <div>
                          <h3 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-blue-600 animate-pulse" />
                            <span>Travel & Tour Packages</span>
                          </h3>
                          <p className="text-sm text-slate-400 mt-1 font-medium">Book complete end-to-end curated holidays with synchronized Volvo bus and cab services</p>
                        </div>
                        <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                          🎁 Guaranteed Best Price
                        </span>
                      </div>

                      {/* Search Widget Container */}
                      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 md:p-8 space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600" />
                        
                        <div>
                          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block">Vacation Portal</span>
                          <h4 className="text-lg font-bold text-slate-800 mt-1">Configure Holiday Journey</h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {/* Origin Input */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">City of Departure (Origin)</label>
                            <div className="flex items-center gap-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                              <input 
                                type="text" 
                                value={packageFrom} 
                                onChange={(e) => setPackageFrom(e.target.value)} 
                                className="bg-transparent w-full text-xs font-extrabold text-slate-705 focus:outline-none placeholder-slate-400"
                                placeholder="Departure Airport/Station"
                              />
                            </div>
                          </div>

                          {/* Destination Input */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Where To (Destination)</label>
                            <div className="flex items-center gap-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 focus-within:border-blue-400 transition-all">
                              <Search className="w-4 h-4 text-blue-600 shrink-0" />
                              <input 
                                type="text" 
                                value={packageTo} 
                                onChange={(e) => setPackageTo(e.target.value)} 
                                className="bg-transparent w-full text-xs font-extrabold text-slate-705 focus:outline-none placeholder-slate-400"
                                placeholder="State, city or landmark (e.g. Goa)"
                              />
                            </div>
                          </div>

                          {/* Date of Journey */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Departure Date</label>
                            <div className="flex items-center gap-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                              <Calendar className="w-4 h-4 text-rose-500 shrink-0" />
                              <input 
                                type="text" 
                                value={packageDate} 
                                onChange={(e) => setPackageDate(e.target.value)} 
                                className="bg-transparent w-full text-xs font-extrabold text-slate-705 focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* Guests & Rooms */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Guests & Rooms Allocation</label>
                            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200">
                              <div className="flex items-center gap-2 shrink-0">
                                <User className="w-3.5 h-3.5 text-slate-400" />
                                <span className="text-[11px] font-extrabold text-slate-700">{packageGuestsDigits.guests} Pax • {packageGuestsDigits.rooms} Room</span>
                              </div>
                              <div className="flex gap-1">
                                <button 
                                  onClick={() => setPackageGuestsDigits(prev => ({ guests: Math.max(1, prev.guests - 1), rooms: Math.max(1, Math.ceil((prev.guests - 1) / 3)) }))}
                                  className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-800 flex items-center justify-center font-bold text-xs hover:bg-slate-50"
                                >
                                  -
                                </button>
                                <button 
                                  onClick={() => setPackageGuestsDigits(prev => ({ guests: prev.guests + 1, rooms: Math.max(prev.rooms, Math.ceil((prev.guests + 1) / 3)) }))}
                                  className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-800 flex items-center justify-center font-bold text-xs hover:bg-slate-50"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Search CTA and Filters Panel */}
                        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-2">
                          <div className="flex flex-wrap gap-2">
                            <button 
                              onClick={() => { setPackageStyleFilter('All'); setPackageTo(''); }}
                              className={`text-[10.5px] font-black px-3.5 py-1.5 rounded-full border transition-all ${
                                packageStyleFilter === 'All' && !packageTo ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              Reset Search
                            </button>
                            <span className="text-xs text-slate-400 font-medium self-center">Source: {packageFrom}</span>
                          </div>

                          <button 
                            onClick={() => {
                              setPackageStep('results');
                            }}
                            className="bg-blue-600 hover:bg-blue-700 font-black text-white text-xs uppercase tracking-wider px-8 py-4 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <span>Search Holiday Packages</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Popular Destinations Tiles */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-sm font-black text-slate-900 tracking-wider uppercase">🏞️ Popular Destinations</h4>
                          <span className="text-xs text-slate-400 font-bold">100% Transit Synced</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {[
                            { name: 'Goa', desc: 'Sands & Estuaries', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=260' },
                            { name: 'Meghalaya', desc: 'Rain & Root Bridges', image: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=260' },
                            { name: 'Manali', desc: 'Glaciers & Pine forests', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=260' },
                            { name: 'Kashmir', desc: 'Lakes & Shikhara rides', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=260' }
                          ].map((d) => (
                            <button 
                              key={d.name}
                              onClick={() => {
                                setPackageTo(d.name);
                                setPackageStep('results');
                              }}
                              className="relative h-44 rounded-3xl overflow-hidden group border border-slate-100 hover:border-blue-400 shadow-md text-left transition-all hover:scale-[1.02] cursor-pointer"
                            >
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent z-10" />
                              <img src={d.image} alt={d.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                              <div className="absolute bottom-4 left-4 right-4 z-20 text-white space-y-0.5">
                                <h5 className="font-black text-sm tracking-tight">{d.name}</h5>
                                <p className="text-[9.5px] text-slate-200/90 font-medium truncate">{d.desc}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Travel Styles Grid Section */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-black text-slate-900 tracking-wider uppercase">✈️ Custom Travel Styles</h4>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          {[
                            { name: 'Beach Holidays', count: '12 Tours', icon: '🏖️' },
                            { name: 'Mountain Escapes', count: '8 Tours', icon: '⛰️' },
                            { name: 'Honeymoon', count: '6 Tours', icon: '💖' },
                            { name: 'Family Trips', count: '14 Tours', icon: '👨‍👩‍👧‍👦' },
                            { name: 'Spiritual Journeys', count: '5 Tours', icon: '🙏' }
                          ].map((st) => (
                            <button
                              key={st.name}
                              onClick={() => {
                                setPackageStyleFilter(st.name);
                                setPackageStep('results');
                              }}
                              className={`p-5 rounded-2xl border text-center space-y-2.5 transition-all cursor-pointer ${
                                packageStyleFilter === st.name 
                                  ? 'bg-blue-50 border-blue-400 shadow-md ring-2 ring-blue-500/5' 
                                  : 'bg-white border-slate-100 hover:bg-slate-50 hover:border-slate-300'
                              }`}
                            >
                              <span className="text-3xl block">{st.icon}</span>
                              <div>
                                <h5 className="font-extrabold text-xs text-slate-800 leading-tight">{st.name}</h5>
                                <span className="text-[9px] text-slate-400 font-bold mt-1 block">{st.count}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Niklo Advantages Banner Card */}
                      <div className="bg-gradient-to-r from-blue-700 to-indigo-650 p-6 md:p-8 rounded-[32px] text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                          <div className="space-y-2">
                            <span className="text-[10px] bg-white/20 px-3 py-1 rounded-full uppercase tracking-wider font-extrabold">The Niklo Advantage</span>
                            <h4 className="text-xl font-black tracking-tight leading-snug">Why Book Your Holidays with Niklo?</h4>
                            <p className="text-xs text-blue-100/80 leading-relaxed font-semibold">We orchestrate seamless multi-leg local transits so you worry-free travel.</p>
                          </div>
                          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                              <span className="text-lg block">🛡️</span>
                              <h5 className="font-bold text-xs mt-1.5 text-white">Full Financial Sync</h5>
                              <p className="text-[10px] text-blue-100 font-semibold mt-1">Single ledger checkout covers Volvo buses and outstation cabs easily.</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                              <span className="text-lg block">👨‍✈️</span>
                              <h5 className="font-bold text-xs mt-1.5 text-white">Local Verified Captains</h5>
                              <p className="text-[10px] text-blue-100 font-semibold mt-1">Every driver and hotel stay partner is verified of quality rating of 4.5+.</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                              <span className="text-lg block">🔄</span>
                              <h5 className="font-bold text-xs mt-1.5 text-white">100% Flex Cancellation</h5>
                              <p className="text-[10px] text-blue-100 font-semibold mt-1">Get immediate refunds back to your wallet ledger instantly.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Trending Curated Packages Showcase */}
                      <div className="space-y-5">
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-sm font-black text-slate-900 tracking-wider uppercase">🔥 Top Trending Packages</h4>
                          <button 
                            onClick={() => { setPackageTo(''); setPackageStep('results'); }} 
                            className="text-xs font-bold text-blue-600 hover:underline"
                          >
                            Explore All Packages ({MOCK_PACKAGES_DATA.length}) ➔
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {MOCK_PACKAGES_DATA.slice(0, 2).map((p) => (
                            <div key={p.id} className="bg-white rounded-[24px] border border-slate-100 overflow-hidden shadow-md flex flex-col sm:flex-row group hover:border-blue-400 transition-all">
                              <div className="relative w-full sm:w-2/5 h-48 sm:h-auto bg-slate-150">
                                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                                {p.isBestSeller && (
                                  <span className="absolute top-4 left-4 bg-amber-500 text-slate-900 font-sans font-black text-[9px] uppercase px-2.5 py-1 rounded-md shadow-sm z-10">
                                    Best Seller
                                  </span>
                                )}
                              </div>
                              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <span>{p.duration}</span>
                                    <span className="flex items-center gap-1 text-amber-500">
                                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                      <span>{p.rating}</span>
                                    </span>
                                  </div>
                                  <h5 className="font-extrabold text-base text-slate-800 tracking-tight leading-tight">{p.title}</h5>
                                  <p className="text-xs text-slate-400 font-medium leading-relaxed truncate-2-lines">{p.tagline}</p>
                                </div>

                                <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                                  <div className="flex flex-col">
                                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Starting Price</span>
                                    <span className="text-base font-black text-blue-600">₹{p.price.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">/pax</span></span>
                                  </div>
                                  <button 
                                    onClick={() => {
                                      setSelectedTourPackage(p);
                                      setPackageStep('details');
                                      setPackageDetailTab('overview');
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] uppercase tracking-wider py-2 px-4 rounded-xl shadow cursor-pointer transition-all"
                                  >
                                    View Details
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: EXPANDED RESULTS LIST SCREEN */}
                  {packageStep === 'results' && (
                    <div className="space-y-6 animate-fade-in" id="packages-results-step">
                      {/* Search breadcrumb banner */}
                      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Explore curated collections</span>
                          <h4 className="text-lg font-black text-slate-800 flex flex-wrap items-center gap-2">
                            <span>Travel Packages:</span>
                            <span className="text-blue-600">{packageFrom}</span>
                            <span className="text-slate-400">➔</span>
                            <span className="text-blue-600">{packageTo || 'All Regions'}</span>
                          </h4>
                          <p className="text-xs text-slate-400 font-bold">{packageDate} • {packageGuestsDigits.guests} Guests • {packageStyleFilter !== 'All' ? packageStyleFilter : 'All Travel Styles'}</p>
                        </div>

                        <button 
                          onClick={() => {
                            setPackageStep('search');
                          }}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-650 font-black text-[11px] px-4 py-2 rounded-xl border border-slate-200 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                        >
                          <Compass className="w-3.5 h-3.5" />
                          <span>Edit Search Criteria</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left Side Filters Sidebar section */}
                        <div className="lg:col-span-3 space-y-6 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                          <div className="flex justify-between items-center pb-2 border-b border-slate-100 font-black text-slate-800 text-xs uppercase tracking-wider">
                            <span>Filter Parameters</span>
                            <span className="text-[10px] text-blue-600 lowercase cursor-pointer hover:underline" onClick={() => { setPackageDurationFilter('All'); setPackageBudgetFilter('All'); setPackageStyleFilter('All'); }}>reset</span>
                          </div>

                          {/* Style filter */}
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Holistic Category</label>
                            <div className="space-y-1">
                              {['All', 'Beach Holidays', 'Mountain Escapes', 'Honeymoon', 'Family Trips'].map((sty) => (
                                <button
                                  key={sty}
                                  onClick={() => setPackageStyleFilter(sty)}
                                  className={`w-full text-left px-3 py-2 text-xs font-extrabold rounded-xl transition-all ${
                                    packageStyleFilter === sty ? 'bg-blue-50 text-blue-600 font-black' : 'bg-transparent text-slate-500 hover:bg-slate-50'
                                  }`}
                                >
                                  {sty === 'All' ? '🌌 Show All Categories' : sty}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Duration filter */}
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Journey Duration</label>
                            <div className="flex flex-col gap-1.5">
                              {['All', '3-4 Days', '5+ Days'].map((df) => (
                                <button
                                  key={df}
                                  onClick={() => setPackageDurationFilter(df)}
                                  className={`w-full text-left px-3 py-2 text-xs font-extrabold rounded-xl transition-all ${
                                    packageDurationFilter === df ? 'bg-blue-50 text-blue-600 font-black' : 'bg-transparent text-slate-500 hover:bg-slate-50'
                                  }`}
                                >
                                  {df === 'All' ? '⚡ Any Duration' : df}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Budget filter */}
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Cost Range Outlay</label>
                            <div className="flex flex-col gap-1.5">
                              {['All', 'Under ₹10k', 'Above ₹10k'].map((bf) => (
                                <button
                                  key={bf}
                                  onClick={() => setPackageBudgetFilter(bf)}
                                  className={`w-full text-left px-3 py-2 text-xs font-extrabold rounded-xl transition-all ${
                                    packageBudgetFilter === bf ? 'bg-blue-50 text-blue-600 font-black' : 'bg-transparent text-slate-500 hover:bg-slate-50'
                                  }`}
                                >
                                  {bf === 'All' ? '💰 Any Budget Tier' : bf}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Side Package Cards List list */}
                        <div className="lg:col-span-9 space-y-6">
                          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                            <span>Found {filteredPackages.length} tours syncing departure coordinates</span>
                            <span>Sorted by Niklo Recommends</span>
                          </div>

                          {filteredPackages.length === 0 ? (
                            <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-slate-100">
                              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-2xl mx-auto shadow-sm">
                                🗺️
                              </div>
                              <div className="space-y-1">
                                <h5 className="font-extrabold text-slate-800 text-lg">No synchronized tours match your search</h5>
                                <p className="text-xs text-slate-400 max-w-sm mx-auto">Try resetting active filters or search for another popular destination like "Goa" or "Meghalaya".</p>
                              </div>
                              <button 
                                onClick={() => {
                                  setPackageTo('');
                                  setPackageStyleFilter('All');
                                  setPackageDurationFilter('All');
                                  setPackageBudgetFilter('All');
                                }}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs py-2.5 px-6 rounded-xl uppercase tracking-wider cursor-pointer"
                              >
                                View All Holiday Tours
                              </button>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {filteredPackages.map((p) => (
                                <div key={p.id} className="bg-white rounded-[28px] border border-slate-100 overflow-hidden shadow-md flex flex-col group hover:border-blue-300 transition-all hover:shadow-lg">
                                  <div className="relative h-48 bg-slate-150">
                                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                                    {p.isBestSeller && (
                                      <span className="absolute top-4 left-4 bg-amber-500 text-slate-900 font-sans font-black text-[9px] uppercase px-2.5 py-1 rounded-md shadow-sm z-10">
                                        Best Seller
                                      </span>
                                    )}
                                    <div className="absolute top-4 right-4 bg-slate-900/60 backdrop-blur-md text-white font-extrabold text-[10px] px-3 py-1 rounded-full border border-white/10">
                                      {p.duration}
                                    </div>
                                  </div>

                                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                    <div className="space-y-2">
                                      <div className="flex justify-between items-baseline">
                                        <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest">{p.style}</span>
                                        <div className="flex items-center gap-1 text-xs">
                                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                          <strong className="text-slate-800 font-bold">{p.rating}</strong>
                                          <span className="text-slate-400 font-medium font-sans">({p.reviewsCount})</span>
                                        </div>
                                      </div>
                                      <h5 className="font-extrabold text-base text-slate-800 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">{p.title}</h5>
                                      <p className="text-xs text-slate-400 font-bold leading-normal truncate">{p.destinations}</p>
                                      <p className="text-xs text-slate-400 font-medium leading-relaxed truncate-2-lines line-clamp-2">{p.tagline}</p>
                                    </div>

                                    <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                                      <div className="flex flex-col">
                                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Starting Price</span>
                                        <span className="text-lg font-black text-blue-600">₹{p.price.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">/person</span></span>
                                      </div>
                                      <button 
                                        onClick={() => {
                                          setSelectedTourPackage(p);
                                          setPackageStep('details');
                                          setPackageDetailTab('overview');
                                        }}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl cursor-pointer shadow-md shadow-blue-500/10 active:scale-95 transition-all text-center"
                                      >
                                        View details ➔
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: TOUR DETAILS PAGE SCREEN */}
                  {packageStep === 'details' && selectedTourPackage && (
                    <div className="space-y-6 animate-fade-in text-slate-800 max-w-4xl mx-auto" id="packages-details-step">
                      {/* Back triggers navigation */}
                      <button 
                        onClick={() => {
                          setPackageStep('results');
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-black text-slate-400 hover:text-slate-800 uppercase tracking-wider cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back to Explorers Search Results</span>
                      </button>

                      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl overflow-hidden">
                        {/* Major Header Image Banner */}
                        <div className="relative h-64 md:h-80 bg-slate-200">
                          <img src={selectedTourPackage.image} alt={selectedTourPackage.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                          {selectedTourPackage.isBestSeller && (
                            <span className="absolute top-6 left-6 bg-amber-500 text-slate-900 font-black text-xs uppercase px-3 py-1.5 rounded-lg shadow-md font-sans">
                              🔥 Best Seller
                            </span>
                          )}
                          <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                            <span className="text-[10.5px] bg-blue-600/90 border border-blue-400/20 backdrop-blur-sm font-black uppercase px-3 py-1 rounded-full">{selectedTourPackage.style}</span>
                            <h3 className="text-xl md:text-3xl font-black mt-2 tracking-tight">{selectedTourPackage.title}</h3>
                            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-200 pt-1">
                              <span className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                <strong>{selectedTourPackage.rating}</strong>
                                <span>({selectedTourPackage.reviewsCount} verified reviews)</span>
                              </span>
                              <span>•</span>
                              <span>Shillong, Cherrapunji, Dawki, Meghalaya scenic valley</span>
                            </div>
                          </div>
                        </div>

                        {/* Sub-Header Specifications badges */}
                        <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 bg-slate-50/50 p-4 text-center">
                          <div>
                            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block">Duration</span>
                            <strong className="text-xs md:text-sm text-slate-800 font-black">{selectedTourPackage.duration}</strong>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block">Group Sizing</span>
                            <strong className="text-xs md:text-sm text-slate-800 font-black">{selectedTourPackage.travelers || '2-6 Pax'}</strong>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block">Expedition Difficulty</span>
                            <strong className="text-xs md:text-sm text-slate-800 font-black">{selectedTourPackage.difficulty || 'Moderate'}</strong>
                          </div>
                        </div>

                        {/* Interactive tab headers */}
                        <div className="flex border-b border-slate-100 text-xs font-black uppercase tracking-wider overflow-x-auto no-scrollbar">
                          {['overview', 'itinerary', 'inclusions', 'exclusions'].map((tab) => (
                            <button
                              key={tab}
                              onClick={() => setPackageDetailTab(tab as any)}
                              className={`flex-1 py-4 text-center border-b-2 whitespace-nowrap cursor-pointer transition-all ${
                                packageDetailTab === tab ? 'border-blue-600 text-blue-600 font-black' : 'border-transparent text-slate-400 hover:text-slate-800'
                              }`}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>

                        {/* Dynamic tab contents rendering */}
                        <div className="p-6 md:p-8 min-h-[180px]">
                          {packageDetailTab === 'overview' && (
                            <div className="space-y-4 animate-fade-in leading-relaxed text-sm text-slate-600 font-medium">
                              <p>{selectedTourPackage.description}</p>
                              <p className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-xs text-blue-900 font-bold leading-relaxed">
                                💡 <strong>Niklo Executive Tip:</strong> This holiday is designed with automated boarding passes. Your outstation cabs coordinate departure timings directly matching your SBSTC Volvo bus arrivals. Real-time driver updates are delivered instantly to your device.
                              </p>
                            </div>
                          )}

                          {packageDetailTab === 'itinerary' && (
                            <div className="space-y-4 animate-fade-in">
                              <p className="text-xs text-slate-400 font-bold mb-2">Collapsible Day-by-Day schedule of adventures (Click days to collapse/expand)</p>
                              <div className="space-y-3">
                                {selectedTourPackage.itinerary.map((it: any, index: number) => (
                                  <div 
                                    key={index} 
                                    className="border border-slate-120 rounded-2xl overflow-hidden cursor-pointer hover:border-slate-350 transition-all"
                                    onClick={() => setExpandedHelpArticleId(expandedHelpArticleId === index ? null : index)}
                                  >
                                    <div className="bg-slate-50 p-4 flex justify-between items-center transition-colors">
                                      <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xs">
                                          {index + 1}
                                        </span>
                                        <strong className="text-sm font-black text-slate-800">{it.day}</strong>
                                      </div>
                                      <span className="text-xs text-slate-400 font-black">{expandedHelpArticleId === index ? '▲' : '▼'}</span>
                                    </div>
                                    {(expandedHelpArticleId === index || index === 0 && expandedHelpArticleId === null) && (
                                      <div className="p-4 bg-white text-xs md:text-sm text-slate-500 leading-relaxed font-semibold border-t border-slate-100">
                                        {it.details}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {packageDetailTab === 'inclusions' && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in text-slate-700">
                              <div className="p-5 border border-slate-100 rounded-2xl text-center space-y-2">
                                <span className="text-3xl block">🏨</span>
                                <h5 className="font-extrabold text-xs">Premium Accommodation</h5>
                                <p className="text-[10px] text-slate-400 font-medium">3-Star/Heritage Hotels stays</p>
                              </div>
                              <div className="p-5 border border-slate-100 rounded-2xl text-center space-y-2">
                                <span className="text-3xl block">🚌</span>
                                <h5 className="font-extrabold text-xs">Transit Transport</h5>
                                <p className="text-[10px] text-slate-400 font-medium">Volvo Sleeper + Private Cabs</p>
                              </div>
                              <div className="p-5 border border-slate-100 rounded-2xl text-center space-y-2">
                                <span className="text-3xl block">🍳</span>
                                <h5 className="font-extrabold text-xs">Meals Included</h5>
                                <p className="text-[10px] text-slate-400 font-medium">Complimentary hot Breakfasts</p>
                              </div>
                              <div className="p-5 border border-slate-100 rounded-2xl text-center space-y-2">
                                <span className="text-3xl block">⛰️</span>
                                <h5 className="font-extrabold text-xs">Guided Sightseeing</h5>
                                <p className="text-[10px] text-slate-400 font-medium">100% Entry tickets passes</p>
                              </div>
                            </div>
                          )}

                          {packageDetailTab === 'exclusions' && (
                            <div className="space-y-3 animate-fade-in text-xs font-semibold text-slate-450 pl-2">
                              <ul className="list-disc leading-relaxed space-y-2 text-slate-500">
                                <li>Optional airplane flight fare or primary railway tickets to/from Guwahati/Goa.</li>
                                <li>Daily midday lunch expenses and private shopping outlay.</li>
                                <li>Any additional alcoholic beverages or personal tips for local guides.</li>
                                <li>Emergency medical insurances are separate (can opt-in in checkout).</li>
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Interactive Checkout Summary panel */}
                        <div className="border-t border-slate-150 p-6 md:p-8 bg-slate-50 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6">
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest leading-none">Tour Cost Outline ({packageGuestsDigits.guests} Pax)</span>
                              <span className="text-2xl md:text-3xl font-black text-blue-600 mt-1 font-sans">
                                ₹{(selectedTourPackage.price * packageGuestsDigits.guests).toLocaleString()}
                              </span>
                              <span className="text-[10px] text-slate-400 mt-1 font-medium select-none">Inclusive of all local taxes & parking fees</span>
                            </div>
                          </div>

                          <button 
                            onClick={() => {
                              const totalCost = selectedTourPackage.price * packageGuestsDigits.guests;
                              
                              if (walletBalance < totalCost) {
                                alert(`Wallet Balance insufficient (Required: ₹${totalCost.toLocaleString()}, Available: ₹${walletBalance.toLocaleString()}). Simulating a prompt UPI load or booking with standard simulated card checking instead!`);
                              }

                              // Deduct from wallet
                              setWalletBalance(prev => Math.max(0, prev - totalCost));

                              const bookingId = `NIKLO-TOUR-${Math.floor(20000 + Math.random() * 70000)}`;
                              
                              // Log transaction ledger
                              setTransactions([
                                {
                                  title: `Curated package: ${selectedTourPackage.title}`,
                                  amount: -totalCost,
                                  type: 'debit',
                                  date: 'Today'
                                },
                                ...transactions
                              ]);

                              // Append to dynamic Booking History list
                              setConfirmedBookings([
                                {
                                  ticketId: bookingId,
                                  route: `${packageFrom} ⇄ ${selectedTourPackage.title}`,
                                  date: packageDate,
                                  busOperator: `${selectedTourPackage.destinations} Tour`,
                                  busType: `Premium Sync (${packageGuestsDigits.guests} Travelers)`,
                                  seats: ['Tour Pass'],
                                  price: totalCost,
                                  departure: '08:00 AM Departure Sync',
                                  arrival: '05:30 PM Destination Reaches'
                                },
                                ...confirmedBookings
                              ]);

                              // Proceed success step
                              setPackageStep('success');
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 font-black text-white px-8 py-4 rounded-xl text-xs uppercase tracking-widest shadow-md transition-all active:scale-[0.98] cursor-pointer text-center"
                          >
                            <span>Confirm & Book Travel Package ➔</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3.5: TOUR SUCCESS SCREEN */}
                  {packageStep === 'success' && selectedTourPackage && (
                    <div className="max-w-2xl mx-auto bg-gradient-to-br from-emerald-600 to-teal-500 text-white p-8 md:p-10 rounded-[36px] shadow-2xl text-center space-y-6 animate-fade-in relative overflow-hidden font-sans" id="packages-success-step">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-12 -mt-12 blur-xl pointer-events-none" />
                      
                      <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto">
                        <Check className="w-9 h-9 text-emerald-600 stroke-[3]" />
                      </div>

                      <div className="space-y-1.5 font-sans">
                        <span className="text-[10px] font-black tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full inline-block font-sans">Verification Voucher Sent</span>
                        <h3 className="text-2xl font-black mt-2">Holiday Package Confirmed!</h3>
                        <p className="text-xs text-teal-100 max-w-sm mx-auto leading-relaxed">
                          Your synchronized tour at {selectedTourPackage.title} is verified and updated in our partner ledger.
                        </p>
                      </div>

                      <div className="bg-white/10 p-5 rounded-2xl border border-white/10 text-left space-y-4 text-xs font-semibold text-teal-50">
                        <div className="flex justify-between items-center pb-2 border-b border-white/10 text-white">
                          <div>
                            <span className="text-[9px] text-teal-100 font-black block uppercase font-sans">Package Pass</span>
                            <strong className="text-sm font-black text-white">{selectedTourPackage.title}</strong>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] text-teal-150 font-black block uppercase font-sans">Travelers count</span>
                            <strong className="text-xs text-white uppercase">{packageGuestsDigits.guests} Pax</strong>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-[9px] font-bold block">Start Date</span>
                            <strong className="text-xs text-white">{packageDate}</strong>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold block">Voucher ID Reference</span>
                            <strong className="text-xs text-white font-mono uppercase">NIKLOTOUR--{Math.floor(10000 + Math.random()*90000)}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button 
                          onClick={() => {
                            setBottomTab('bookings');
                            setPackageStep('search');
                          }}
                          className="flex-1 bg-white hover:bg-slate-100 text-emerald-705 font-extrabold py-3.5 rounded-xl text-xs uppercase shadow cursor-pointer text-center font-sans"
                        >
                          View My Bookings Pass
                        </button>
                        <button 
                          onClick={() => {
                            setBottomTab('home');
                            setPackageStep('search');
                          }}
                          className="flex-1 bg-white/10 hover:bg-white/20 text-white font-extrabold py-3.5 rounded-xl text-xs uppercase border border-white/20 cursor-pointer text-center"
                        >
                          Go Back Home
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* --- DYNAMIC SMART JOURNEY PLANNER MULTI-LEG VIEW --- */}
        {bottomTab === 'planner' && (
          <div id="journey-planner-canvas" className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full animate-fade-in space-y-6">
            
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Smart Multi-Leg Journey Planner</h3>
                <p className="text-sm text-slate-400 mt-1 font-medium">Book seamless connections (Intercity Bus + Last-Mile Outstation Cabs) with one single checkout</p>
              </div>
              <span className="text-xs font-black text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 uppercase tracking-widest block">
                ⚡ Real-time Multi-modal transit
              </span>
            </div>

            {/* Step 1: Input criteria */}
            {plannerStep === 'input' && (
              <div id="planner-input-pane" className="bg-white p-8 rounded-3xl border border-slate-100 shadow-md max-w-2xl mx-auto space-y-6">
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest block">Configure Multicity Voyage</h4>
                  <span className="text-lg font-black text-slate-800 tracking-tight block mt-1">Where is your dream escape?</span>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Start Location (Source)</label>
                      <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        <MapPin className="w-4 h-4 text-emerald-500" />
                        <input 
                          type="text" 
                          value={plannerFrom} 
                          onChange={(e) => setPlannerFrom(e.target.value)} 
                          className="bg-transparent w-full text-xs font-extrabold text-slate-705 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Final destination (Hill Station)</label>
                      <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <input 
                          type="text" 
                          value={plannerTo} 
                          onChange={(e) => setPlannerTo(e.target.value)} 
                          className="bg-transparent w-full text-xs font-extrabold text-slate-705 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Reporting date</label>
                      <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <input 
                          type="text" 
                          value={plannerDate} 
                          onChange={(e) => setPlannerDate(e.target.value)} 
                          className="bg-transparent w-full text-xs font-extrabold text-slate-705 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Last-Mile Connection Mode</label>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-250 flex justify-between items-center">
                        <span className="font-extrabold text-xs text-slate-700">Outstation Cab Hailing</span>
                        <span className="bg-emerald-500 text-slate-900 font-extrabold text-[9px] px-2 py-0.5 rounded uppercase">Included</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setPlannerStep('overview')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg transition-transform active:scale-98 cursor-pointer uppercase text-xs"
                >
                  Generate Combined Multi-Leg Layout ➔
                </button>
              </div>
            )}

            {/* Step 2: Leg breakdown overview */}
            {plannerStep === 'overview' && (
              <div id="planner-overview-pane" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
                
                {/* Visual Timeline Path Left */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Visual Route Header */}
                  <div className="bg-gradient-to-r from-blue-700 to-indigo-650 p-6 rounded-3xl text-white shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl" />
                    <h4 className="text-xs font-black tracking-widest text-blue-200 uppercase">Interactive Transit Map Timeline</h4>
                    <h3 className="text-xl font-black mt-2">{plannerFrom} ➔ Siliguri Hub ➔ {plannerTo}</h3>
                    <p className="text-xs text-blue-100/90 font-bold mt-1">Multi-Leg voyage duration: 12 Hours 45 Mins total</p>
                  </div>

                  {/* LEG 1: INTERCITY BUS */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 relative">
                    <div className="absolute top-6 left-6 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black">1</div>
                    
                    <div className="pl-12">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 rounded font-black uppercase">Leg 1: Intercity High-Speed Volvo</span>
                          <h4 className="text-base font-black text-slate-800 mt-2">{plannerFrom} to Siliguri (9h 30m)</h4>
                          <p className="text-xs text-slate-400 font-semibold mt-0.5">Departs from Esplanade Hub • {plannerDate}</p>
                        </div>
                        <span className="text-sm font-black text-slate-400 mt-1">₹799</span>
                      </div>

                      {/* Selector choices for bus leg */}
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3.5 bg-blue-50/40 border border-blue-200 rounded-2xl">
                          <h5 className="font-extrabold text-xs text-blue-900">SBSTC Premium Volvo A/C</h5>
                          <p className="text-[10px] text-slate-400 mt-1 font-semibold">Departs 08:00 PM • Selected standard</p>
                        </div>
                        <div className="p-3.5 bg-slate-50 border border-slate-150 rounded-2xl opacity-60 hover:opacity-100 cursor-pointer transition-opacity" onClick={() => alert('Option changed! Leg 1 premium tier is updated.')}>
                          <h5 className="font-extrabold text-xs text-slate-700">Royal Cruiser Executive class (+₹300)</h5>
                          <p className="text-[10px] text-slate-400 mt-1 font-semibold">Departs 10:00 PM • VIP amenities suite</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* LEG CONNECTOR DOTTED PATH */}
                  <div className="flex flex-col items-center justify-center py-2 relative z-10">
                    <div className="w-1.5 h-16 border-l-4 border-dashed border-slate-300" />
                    <div className="bg-slate-900 text-white font-black text-[9px] px-3.5 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5 shadow border border-slate-750">
                      <RefreshCw className="w-3 h-3 text-amber-400 animate-spin" />
                      <span>Instant Connection Transfer: Siliguri Terminal</span>
                    </div>
                    <div className="w-1.5 h-12 border-l-4 border-dashed border-slate-300" />
                  </div>

                  {/* LEG 2: OUTSTATION TAXI */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 relative">
                    <div className="absolute top-6 left-6 w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-black">2</div>
                    
                    <div className="pl-12">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-150 px-2.5 py-0.5 rounded font-black uppercase">Leg 2: Personal Tourist Cab Service</span>
                          <h4 className="text-base font-black text-slate-800 mt-2">Siliguri to {plannerTo} (3h 15m)</h4>
                          <p className="text-xs text-slate-400 font-semibold mt-0.5">Departs from Siliguri Stand • Private tour guide driver</p>
                        </div>
                        <span className="text-sm font-black text-slate-400 mt-1">₹{plannerLeg2Cab === 'sedan' ? 950 : 1450}</span>
                      </div>

                      {/* Option select */}
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <button 
                          onClick={() => setPlannerLeg2Cab('sedan')}
                          className={`p-3.5 text-left rounded-2xl border transition-all cursor-pointer ${
                            plannerLeg2Cab === 'sedan' ? 'border-amber-500 bg-amber-50/20' : 'border-slate-100 bg-slate-50'
                          }`}
                        >
                          <h5 className="font-extrabold text-xs text-slate-800">Prime Sedan Option (₹950)</h5>
                          <p className="text-[10px] text-slate-400 mt-1 font-semibold">Swift Dzire / Etios comfortable sedan</p>
                        </button>
                        <button 
                          onClick={() => setPlannerLeg2Cab('suv')}
                          className={`p-3.5 text-left rounded-2xl border transition-all cursor-pointer ${
                            plannerLeg2Cab === 'suv' ? 'border-amber-500 bg-amber-50/20' : 'border-slate-100 bg-slate-50'
                          }`}
                        >
                          <h5 className="font-extrabold text-xs text-slate-800">Toyota Innova Crysta SUV ({Math.max(1450)} bonus)</h5>
                          <p className="text-[10px] text-slate-400 mt-1 font-semibold">Elite spacious SUV cabin for steep hills</p>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Summary Billing Panel Card */}
                <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                  <div>
                    <span className="text-[9px] font-black uppercase bg-blue-50 text-blue-600 px-2 py-0.5 rounded">Consolidated Ticket Pack</span>
                    <h3 className="text-lg font-black text-slate-800 mt-2">Combined Outlay Summary</h3>
                  </div>

                  <div className="space-y-3.5 text-xs font-bold text-slate-500">
                    <div className="flex justify-between items-center">
                      <span>Leg 1 Intercity Bus</span>
                      <span>₹799</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Leg 2 Connection Cab</span>
                      <span>₹{plannerLeg2Cab === 'sedan' ? 950 : 1450}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Gateway Booking Handling</span>
                      <span>₹45</span>
                    </div>
                    {plannerInsure && (
                      <div className="flex justify-between items-center text-emerald-600">
                        <span>Transit Medical accidental shield</span>
                        <span>₹25</span>
                      </div>
                    )}
                    <div className="border-t border-slate-100 pt-3.5 flex justify-between items-center text-slate-800">
                      <span className="text-sm font-black">Consolidated Fare</span>
                      <strong className="text-xl font-black text-blue-600">₹{799 + (plannerLeg2Cab === 'sedan' ? 950 : 1450) + 45 + (plannerInsure ? 25 : 0)}</strong>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-150 rounded-2xl space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <input 
                        id="plan-insure-chb"
                        type="checkbox" 
                        checked={plannerInsure} 
                        onChange={() => setPlannerInsure(!plannerInsure)} 
                        className="w-4.5 h-4.5 text-blue-600 rounded cursor-pointer"
                      />
                      <label htmlFor="plan-insure-chb" className="font-extrabold text-slate-700 cursor-pointer">Insure all voyage legs (+₹25)</label>
                    </div>
                    <p className="text-[10px] text-slate-400 font-semibold leading-relaxed pl-6">Highly recommended for safety & steep hill curves protection.</p>
                  </div>

                  <button 
                    onClick={() => {
                      // Init seat layout structure
                      setPlannerStep('seats');
                      setPlannerSeats(['4B']);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg cursor-pointer text-xs uppercase"
                  >
                    Select Leg-1 Coach Seats ➔
                  </button>
                </div>

              </div>
            )}

            {/* Step 3: Selector seat layout */}
            {plannerStep === 'seats' && (
              <div id="planner-seats-pane" className="max-w-4xl mx-auto bg-white p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1 block">Setup Seats for Leg-1</h4>
                    <span className="text-lg font-black text-slate-800 block mt-1">Bus Seat Assignment Layout</span>
                  </div>
                  <button onClick={() => setPlannerStep('overview')} className="text-xs text-blue-600 font-black hover:underline uppercase">← back</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Interactive Seat map graphic */}
                  <div className="md:col-span-7 bg-slate-50 p-6 rounded-2xl border border-slate-150 max-w-sm mx-auto w-full">
                    <div className="text-center font-black text-[10px] text-slate-400 tracking-widest uppercase mb-4 py-1.5 border-b border-slate-200">
                      🚍 FRONT DIRECTION • SBSTC VOLVO COACH
                    </div>

                    {/* Seat Grid layout */}
                    <div className="grid grid-cols-4 gap-3">
                      {['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D', '3A', '3B', '3C', '3D', '4A', '4B', '4C', '4D', '5A', '5B', '5C', '5D'].map((st) => (
                        <button 
                          key={st}
                          onClick={() => {
                            if (plannerSeats.includes(st)) {
                              setPlannerSeats(plannerSeats.filter(p => p !== st));
                            } else {
                              setPlannerSeats([...plannerSeats, st]);
                            }
                          }}
                          className={`h-11 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center justify-center ${
                            plannerSeats.includes(st) ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Passenger traveler info list form */}
                  <div className="md:col-span-5 space-y-5">
                    <div>
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Seats chosen</h4>
                      <div className="flex gap-2 flex-wrap mt-2">
                        {plannerSeats.map((st) => (
                          <span key={st} className="bg-blue-50 text-blue-700 border border-blue-200 font-black text-xs px-3 py-1 rounded-lg">{st}</span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-405 uppercase tracking-wide block">Primary Guest Name</label>
                      <input 
                        type="text" 
                        value={plannerPassengers[0]?.name || 'Arjun Sharma'} 
                        onChange={(e) => {
                          const updated = [...plannerPassengers];
                          updated[0].name = e.target.value;
                          setPlannerPassengers(updated);
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-extrabold text-slate-700"
                        placeholder="Guest full name"
                      />
                    </div>

                    <button 
                      onClick={() => setPlannerStep('payment')}
                      disabled={plannerSeats.length === 0}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg transition-transform active:scale-98 cursor-pointer text-xs uppercase disabled:opacity-50"
                    >
                      Process Combined Checkout ➔
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* Step 4: Combined Checkout */}
            {plannerStep === 'payment' && (
              <div id="planner-payment-pane" className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6">
                <div className="text-center space-y-1 pb-4 border-b border-slate-100">
                  <h3 className="text-xl font-black text-slate-800">Unified Payment Gatehouse</h3>
                  <p className="text-xs text-slate-400">Total multi-leg connection amount will be processed securely</p>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-3 text-xs leading-relaxed">
                  <div className="flex justify-between items-center text-slate-500 font-extrabold">
                    <span>Leg-1 Seats ({plannerSeats.join(', ')})</span>
                    <span>₹799</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500 font-extrabold">
                    <span>Leg-2 Cab {plannerLeg2Cab.toUpperCase()}</span>
                    <span>₹{plannerLeg2Cab === 'sedan' ? 950 : 1450}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500 font-extrabold">
                    <span>Service handles</span>
                    <span>₹45</span>
                  </div>
                  <div className="flex justify-between items-center text-emerald-600 font-extrabold border-t border-slate-200 pt-3">
                    <span>Total combined outlay</span>
                    <strong className="text-base text-blue-650">₹{799 + (plannerLeg2Cab === 'sedan' ? 950 : 1450) + 45 + (plannerInsure ? 25 : 0)}</strong>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => {
                      const finalSum = 799 + (plannerLeg2Cab === 'sedan' ? 950 : 1450) + 45 + (plannerInsure ? 25 : 0);
                      if (walletBalance < finalSum) {
                        alert('Your wallet balance is low. Alternative payment method triggered successfully!');
                      }
                      
                      // Handle states
                      setWalletBalance(prev => Math.max(0, prev - finalSum));
                      const transId = `TXN-${Math.floor(10000 + Math.random() * 90000)}`;
                      
                      const newTx = {
                        title: `Multi-Leg: Kolkata ➔ ${plannerTo}`,
                        amount: -finalSum,
                        type: 'debit' as const,
                        date: '25 May 2024'
                      };
                      setTransactions([newTx, ...transactions]);

                      // Success flow
                      setPlannerStep('success');

                      // Keep log history
                      setConfirmedBookings([
                        {
                          ticketId: transId,
                          route: `${plannerFrom} ➔ ${plannerTo}`,
                          date: plannerDate,
                          busOperator: `SBSTC Volvo AC + ${plannerLeg2Cab.toUpperCase()} Cab`,
                          busType: 'Muti-Leg Unified Pass',
                          seats: plannerSeats,
                          price: finalSum,
                          departure: '08:00 PM (Kolkata)',
                          arrival: '08:45 AM (Gangtok)'
                        },
                        ...confirmedBookings
                      ]);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg tracking-wider text-xs uppercase cursor-pointer"
                  >
                    Authorize Combined Payment ➔
                  </button>

                  <button 
                    onClick={() => setPlannerStep('overview')}
                    className="w-full bg-slate-50 hover:bg-slate-100 text-slate-500 font-extrabold py-3 rounded-lg text-xs uppercase border border-slate-200 cursor-pointer text-center"
                  >
                    Edit route layouts
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Success invoice */}
            {plannerStep === 'success' && (
              <div id="planner-success-pane" className="max-w-2xl mx-auto bg-gradient-to-br from-blue-800 to-indigo-700 text-white p-8 md:p-10 rounded-[36px] shadow-2xl text-center space-y-6 animate-fade-in relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-12 -mt-12 blur-xl" />
                
                <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto">
                  <Check className="w-9 h-9 text-blue-700 stroke-[3]" />
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-black tracking-widest uppercase bg-white/25 px-3 py-1 rounded-full inline-block">Combined Ticket Voucher</span>
                  <h3 className="text-2xl font-black mt-2">Voyage Confirmed Successfully!</h3>
                  <p className="text-xs text-blue-150 max-w-sm mx-auto leading-relaxed">
                    Your complete multi-leg booking from {plannerFrom} to {plannerTo} is synchronized with all bus & outstation shuttle drivers.
                  </p>
                </div>

                <div className="bg-white/10 p-5 rounded-2xl border border-white/10 text-left space-y-3.5 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <div>
                      <span className="text-[9px] text-blue-200 font-extrabold uppercase">Leg 1 Bus Seat (Assigned)</span>
                      <strong className="text-sm font-black text-white">{plannerSeats.join(', ')}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-blue-200 font-extrabold uppercase">Leg 2 Cab Status</span>
                      <span className="bg-emerald-500 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded uppercase leading-none block mt-1">Matched</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] text-blue-200 font-bold block">Voyage Date</span>
                      <strong className="text-xs text-white">{plannerDate}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-blue-200 font-bold block">Assigned Passenger</span>
                      <strong className="text-xs text-white">{plannerPassengers[0]?.name || 'Arjun Sharma'}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      setBottomTab('bookings');
                      setPlannerStep('input');
                    }}
                    className="flex-1 bg-white hover:bg-slate-100 text-blue-800 font-extrabold py-3.5 rounded-xl text-xs uppercase shadow cursor-pointer"
                  >
                    Open Active Pass ➔
                  </button>
                  <button 
                    onClick={() => {
                      setBottomTab('home');
                      setPlannerStep('input');
                    }}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white font-extrabold py-3.5 rounded-xl text-xs uppercase border border-white/20 cursor-pointer"
                  >
                    Go Back Home
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* --- DYNAMIC INTEGRATED WALLET VIEW --- */}
        {bottomTab === 'wallet' && (
          <div id="wallet-dashboard-canvas" className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full animate-fade-in space-y-8">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Niklo Payment Wallet</h3>
                <p className="text-sm text-slate-400 mt-1 font-medium">Add, spend, track cashbacks, and secure digital travel passes</p>
              </div>
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 uppercase tracking-widest block">
                ✓ SSL CERTIFIED SECURE
              </span>
            </div>

            {/* Wallet stats overview cards row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Balance card */}
              <div className="bg-gradient-to-tr from-emerald-600 via-emerald-550 to-teal-500 rounded-3xl p-6 md:p-8 text-white shadow-lg space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-full -mr-12 -mt-12 blur-xl" />
                
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-100 opacity-90 block">Active Current Balance</span>
                  <strong className="text-3xl md:text-4xl font-black block tracking-tight">₹{walletBalance.toFixed(2)}</strong>
                </div>

                <div className="flex justify-between items-center text-xs text-emerald-50 font-bold border-t border-white/15 pt-4">
                  <span>SSL Encryption active</span>
                  <span>Niklo Card ending 4402</span>
                </div>
              </div>

              {/* Card 2: Cashback balance card */}
              <div className="bg-gradient-to-tr from-amber-550 via-amber-500 to-orange-400 rounded-3xl p-6 md:p-8 text-white shadow-lg space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-full -mr-12 -mt-12 blur-xl" />
                
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-100 opacity-90 block">Promo Rebate Cashback</span>
                  <strong className="text-3xl md:text-4xl font-black block tracking-tight">₹{cashbackBalance.toFixed(2)}</strong>
                </div>

                <div className="flex justify-between items-center text-xs text-amber-50 font-bold border-t border-white/15 pt-4">
                  <span>10% flat future rides reduction</span>
                  <span>Promised rewards</span>
                </div>
              </div>

              {/* Card 3: Dynamic Add Money Interaction Form */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-1">
                  <label htmlFor="add-balance-val-input" className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Add Balance Instantly</label>
                  <div className="flex gap-2 items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 mt-1">
                    <span className="text-slate-500 font-extrabold text-xs">₹</span>
                    <input 
                      id="add-balance-val-input"
                      type="number" 
                      value={addAmount} 
                      onChange={(e) => setAddAmount(e.target.value)}
                      className="bg-transparent w-full text-xs font-black text-slate-700 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 py-1">
                  {['100', '500', '1000'].map((amt) => (
                    <button 
                      key={amt}
                      onClick={() => setAddAmount(amt)}
                      className="bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-150 rounded-lg text-xs font-black py-2 cursor-pointer transition-colors"
                    >
                      +₹{amt}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => {
                    const parsedVal = parseFloat(addAmount);
                    if (isNaN(parsedVal) || parsedVal <= 20) {
                      alert('Please enter a valid amount greater than ₹20');
                      return;
                    }
                    setWalletBalance(prev => prev + parsedVal);
                    // Add transaction ledger entry
                    setTransactions([
                      { 
                        title: 'Added balance via UPI/Card', 
                        amount: parsedVal, 
                        type: 'credit', 
                        date: 'Today' 
                      },
                      ...transactions
                    ]);
                    alert(`Success! ₹${parsedVal.toFixed(2)} successfully added to your wallet balance.`);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-xl shadow-md text-xs uppercase cursor-pointer"
                >
                  Confirm & Transfer via UPI ➔
                </button>
              </div>

            </div>

            {/* Ledgers and Recent Transactions section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Transactions list Left */}
              <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest block">Audit History Logs</h4>
                  <span className="text-base font-black text-slate-800 tracking-tight block mt-1">Wallet Transaction Ledger</span>
                </div>

                <div className="divide-y divide-slate-150 overflow-hidden">
                  {transactions.map((tx, idx) => (
                    <div key={idx} className="py-4 flex justify-between items-center text-xs">
                      <div className="flex gap-3 items-center">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black ${
                          tx.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                        }`}>
                          {tx.type === 'credit' ? '+' : '-'}
                        </div>
                        <div>
                          <strong className="text-slate-750 font-extrabold text-xs block">{tx.title}</strong>
                          <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">{tx.date} • Electronic Pass</span>
                        </div>
                      </div>

                      <strong className={`text-sm font-black font-mono ${
                        tx.type === 'credit' ? 'text-emerald-600' : 'text-slate-800'
                      }`}>
                        {tx.type === 'credit' ? '+' : '-'}₹{Math.abs(tx.amount).toFixed(2)}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Promos Right card */}
              <div className="lg:col-span-4 bg-amber-50/40 border border-amber-100 p-6 rounded-3xl space-y-4">
                <div className="flex gap-2.5 items-center text-amber-800">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  <h5 className="font-extrabold text-sm tracking-tight leading-none">Wallet Cashback Offers</h5>
                </div>
                
                <div className="space-y-3 font-semibold text-xs text-amber-850/90 leading-relaxed">
                  <div className="p-3 bg-white border border-amber-200 rounded-xl space-y-1">
                    <span className="font-black text-blue-600 block text-[10px] uppercase">RIDE20% COUPON</span>
                    <p className="text-[11px] text-slate-600">Get 20% immediate wallet reduction bonus cashback on all local cab rides.</p>
                  </div>
                  <div className="p-3 bg-white border border-amber-200 rounded-xl space-y-1">
                    <span className="font-black text-blue-600 block text-[10px] uppercase">FIRSTBUS NEWBIE</span>
                    <p className="text-[11px] text-slate-600">Added first flat ₹100 direct rebate to passengers on their first highway luxury coach ride.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* --- DYNAMIC REFER & EARN PORTAL --- */}
        {bottomTab === 'refer' && (
          <div id="refer-earn-canvas" className="flex-1 max-w-4xl mx-auto px-6 py-10 w-full animate-fade-in space-y-8">
            
            {/* Header refer block */}
            <div className="bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-600 p-8 md:p-10 text-white rounded-3xl shadow-lg relative overflow-hidden text-center space-y-5">
              <div className="absolute top-0 right-0 w-44 h-44 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
              
              <div className="space-y-2 relative z-10">
                <h3 className="text-3xl font-black tracking-tight">Refer & Earn. Share, Refer, Cash!</h3>
                <p className="text-sm text-purple-150 max-w-md mx-auto font-medium">Invite your travel companions and friends to download and sign up. You both earn flat ₹100 cashbacks!</p>
              </div>

              {/* Code visual drawer copy paste */}
              <div className="relative z-10 bg-white/10 max-w-md mx-auto p-4 rounded-2xl border border-white/10 flex items-center justify-between gap-4">
                <div className="text-left">
                  <span className="text-[9px] text-purple-200 font-extrabold uppercase block tracking-wider">YOUR RETURNING PASS CODE</span>
                  <strong className="text-2xl font-mono text-yellow-400 font-black tracking-widest">NIKLO100</strong>
                </div>
                <button 
                  onClick={() => {
                    setCopiedCode(true);
                    navigator.clipboard.writeText('NIKLO152');
                    alert('Referral Code copied to clipboard: NIKLO100. Share with friends!');
                    setTimeout(() => setCopiedCode(false), 2000);
                  }}
                  className="bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-xs px-5 py-3 rounded-xl shadow cursor-pointer transition-transform active:scale-95 whitespace-nowrap"
                >
                  {copiedCode ? '✓ CODE COPIED' : 'COPY PASS CODE 📋'}
                </button>
              </div>
            </div>

            {/* How it works segments */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest block">Milestone Guides</h4>
                <span className="text-lg font-black text-slate-800 tracking-tight block mt-1">How do I receive cashbacks?</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-500 font-semibold leading-relaxed">
                <div className="space-y-2.5 p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-black flex items-center justify-center text-sm border border-blue-100">1</div>
                  <strong className="text-slate-850 font-extrabold text-sm block">Invite Companions</strong>
                  <p>Send your unique code combination directly to your family, office circles, and matching riders.</p>
                </div>
                <div className="space-y-2.5 p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-black flex items-center justify-center text-sm border border-blue-100">2</div>
                  <strong className="text-slate-850 font-extrabold text-sm block">Friend Books Trip</strong>
                  <p>Your referred friend inserts code NIKLO100 on signup or during booking their first luxury bus or cab ride.</p>
                </div>
                <div className="space-y-2.5 p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-black flex items-center justify-center text-sm border border-blue-100">3</div>
                  <strong className="text-slate-850 font-extrabold text-sm block">Get Paid!</strong>
                  <p>As soon as their journey concludes, ₹100 is credited directly into both of your Niklo wallets instantly!</p>
                </div>
              </div>
            </div>

            {/* Referral board history */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest block">Active Referrals Ledger</h4>
                <span className="text-base font-black text-slate-800 tracking-tight block mt-1">Your Invited Circle</span>
              </div>

              <div className="divide-y divide-slate-100 overflow-hidden text-xs font-extrabold">
                {referrals.map((rf, idx) => (
                  <div key={idx} className="py-4 flex justify-between items-center">
                    <div>
                      <strong className="text-slate-800 block text-xs">{rf.name}</strong>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">Invited: {rf.date} • Single Voyage Pass</p>
                    </div>

                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        rf.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 status-ready' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {rf.status}
                      </span>
                      {rf.reward > 0 && (
                        <span className="text-xs font-black text-emerald-500 block mt-1.5">+₹{rf.reward} Cashback Credited</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* --- DYNAMIC INTEGRATED LUXURY HOTELS TAB VIEW --- */}
        {bottomTab === 'hotels' && (
          <div id="hotels-booking-management-panel" className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full animate-fade-in space-y-8">
            
            {/* Header section representing screen 6 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">Luxury Stays & Heritage Hotels</h3>
                <p className="text-sm text-slate-500 mt-1 font-medium">Explore premium partner hotels in Kolkata with exclusive price reductions and zero cancellation anxiety.</p>
              </div>
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 uppercase tracking-widest block">
                ⭐ Zero-Cancellation Stays
              </span>
            </div>

            {/* STEP 1: HOTEL SEARCH PORTAL SCREEN 6 */}
            {hotelStep === 'search' && (
              <div id="hotels-search-pane-root" className="space-y-10 animate-fade-in">
                {/* Search Form Card Grid */}
                <div className="bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-md max-w-4xl mx-auto space-y-6">
                  
                  {/* Dest, Dates, Room Inputs row */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    
                    {/* Destination Search (Where) */}
                    <div className="md:col-span-4 space-y-2">
                      <label htmlFor="hotel-dest-field-input" className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 block">Where to stay</label>
                      <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 focus-within:border-blue-500 transition-colors">
                        <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                        <input 
                          id="hotel-dest-field-input"
                          type="text" 
                          value={hotelDestination} 
                          onChange={(e) => setHotelDestination(e.target.value)} 
                          className="bg-transparent w-full text-xs font-extrabold text-slate-800 focus:outline-none"
                          placeholder="e.g. Kolkata, Siliguri"
                        />
                      </div>
                    </div>

                    {/* Dates CheckIn/CheckOut Combined Card */}
                    <div className="md:col-span-5 space-y-2">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Reporting Stay Dates</label>
                        <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">{hotelNights} Nights Stay</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                        <div className="text-left pl-2">
                          <span className="text-[9px] text-slate-400 font-bold block">CHECK-IN</span>
                          <input 
                            type="text" 
                            value={hotelCheckIn}
                            onChange={(e) => setHotelCheckIn(e.target.value)}
                            className="bg-transparent w-full text-[11px] font-extrabold text-slate-700 outline-none mt-1"
                          />
                        </div>
                        <div className="text-left pl-2 border-l border-slate-200">
                          <span className="text-[9px] text-slate-400 font-bold block">CHECK-OUT</span>
                          <input 
                            type="text" 
                            value={hotelCheckOut}
                            onChange={(e) => setHotelCheckOut(e.target.value)}
                            className="bg-transparent w-full text-[11px] font-extrabold text-slate-700 outline-none mt-1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Rooms & Guests */}
                    <div className="md:col-span-3 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 block">Rooms & Guest count</label>
                      <div className="flex justify-between items-center bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                        <div className="flex items-center gap-1.5">
                          <User className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="text-xs font-extrabold text-slate-700">{hotelGuests} Guest{hotelGuests > 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setHotelGuests(prev => Math.max(1, prev - 1))} className="w-6 h-6 bg-white border border-slate-200 rounded-full text-xs font-black flex items-center justify-center cursor-pointer hover:bg-slate-100">-</button>
                          <button onClick={() => setHotelGuests(prev => Math.max(1, prev + 1))} className="w-6 h-6 bg-white border border-slate-200 rounded-full text-xs font-black flex items-center justify-center cursor-pointer hover:bg-slate-100">+</button>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Mode Selector Option and CTA search row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100 pt-6">
                    {/* Stay Modes Toggles */}
                    <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1 self-start">
                      <button 
                        onClick={() => setHotelStayMode('night')}
                        className={`px-4 py-2 rounded-lg text-xs font-black transition-colors ${
                          hotelStayMode === 'night' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        By Night stay
                      </button>
                      <button 
                        onClick={() => setHotelStayMode('hourly')}
                        className={`px-4 py-2 rounded-lg text-xs font-black transition-colors ${
                          hotelStayMode === 'hourly' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Hourly Stays
                      </button>
                    </div>

                    {/* Search CTA */}
                    <button 
                      onClick={() => setHotelStep('results')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 px-8 rounded-xl shadow-lg transition-transform active:scale-95 text-xs uppercase tracking-wider cursor-pointer self-stretch sm:self-auto text-center"
                    >
                      🔍 Search Hotels Now ➔
                    </button>
                  </div>

                </div>

                {/* Popular Destinations Segment displaying Screenshot 6 carousel content */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Exotic Gateways</h4>
                      <h3 className="text-lg font-black text-slate-800 tracking-tight mt-0.5">Popular Destinations</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: 'Kolkata', img: 'https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=600&auto=format&fit=crop', desc: 'Heritage mansions & street delicacies' },
                      { name: 'Siliguri', img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600&auto=format&fit=crop', desc: 'Hill station hub & transit gardens' },
                      { name: 'Darjeeling', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop', desc: 'Snowy peak sunrise & toy train' },
                      { name: 'Gangtok', img: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=600&auto=format&fit=crop', desc: 'Tibet style sanctuaries & high lakes' }
                    ].map((dest, i) => (
                      <button 
                        key={i}
                        onClick={() => setHotelDestination(dest.name)}
                        className="bg-white rounded-3xl border border-slate-100 hover:border-blue-300 shadow-sm overflow-hidden text-left hover:shadow-md transition-all duration-300 group cursor-pointer"
                      >
                        <div className="h-32 bg-slate-100 overflow-hidden relative">
                          <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                          <strong className="absolute bottom-3 left-4 text-white font-extrabold text-sm tracking-tight">{dest.name}</strong>
                        </div>
                        <div className="p-3">
                          <p className="text-[10px] text-slate-450 font-bold leading-normal">{dest.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Browse Stay types row */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Choose lodging styles</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    {[
                      { type: 'Hotels', icon: <Hotel className="w-5 h-5" /> },
                      { type: 'Resorts', icon: <Sparkles className="w-5 h-5 text-emerald-600" /> },
                      { type: 'Villas', icon: <Heart className="w-5 h-5 text-pink-605" /> },
                      { type: 'Apartments', icon: <User className="w-5 h-5 text-blue-600" /> },
                      { type: 'Homestays', icon: <Compass className="w-5 h-5 text-amber-600" /> }
                    ].map((sty, i) => (
                      <div key={i} className="flex flex-col items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:scale-[1.02] transition-transform select-none">
                        <div className="w-10 h-10 bg-slate-50 text-slate-700 rounded-full flex items-center justify-center mb-2.5">
                          {sty.icon}
                        </div>
                        <span className="text-[11px] font-extrabold text-slate-700 text-center">{sty.type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why Book with Niklo Section */}
                <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-[28px] grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm text-emerald-600 font-bold">✓</div>
                    <div>
                      <strong className="text-slate-800 text-xs font-extrabold uppercase tracking-wider block">Best Price Guarantee</strong>
                      <p className="text-[11px] text-slate-400 font-bold mt-1 leading-relaxed">Find a lower online rate elsewhere? We will happily match it instantly + give you ₹200 wallet reward.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm text-blue-600 font-bold">✓</div>
                    <div>
                      <strong className="text-slate-800 text-xs font-extrabold uppercase tracking-wider block">Zero Cancellation Penalties</strong>
                      <p className="text-[11px] text-slate-400 font-bold mt-1 leading-relaxed">Emergency changes or route plan adjustments? Cancel hassle-free up to 24 hours prior to reporting time.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm text-amber-600 font-bold">✓</div>
                    <div>
                      <strong className="text-slate-800 text-xs font-extrabold uppercase tracking-wider block">10% Instant Wallet Cashback</strong>
                      <p className="text-[11px] text-slate-400 font-bold mt-1 leading-relaxed">Exciting vouchers and wallet credits processed on travel completions automatically.</p>
                    </div>
                  </div>
                </div>

                {/* Trending Hotels Listing Screen 6 */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Curated Stay Experiences</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-md transition-shadow">
                      <div className="h-44 sm:h-auto sm:w-2/5 bg-slate-100 relative">
                        <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop" alt="Taj Resort Goa" className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 bg-slate-900/65 text-white font-black text-[9px] px-2 py-0.5 rounded uppercase">Trending No.1</span>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="bg-emerald-50 text-emerald-700 font-black text-[9px] px-2 py-0.5 rounded uppercase">Luxury Resort</span>
                            <span className="text-xs font-black text-slate-800 flex items-center gap-1">★ 4.8</span>
                          </div>
                          <h4 className="font-extrabold text-slate-850 text-base tracking-tight pt-1">Taj Resort & Spa Goa</h4>
                          <p className="text-[11px] text-slate-400 font-bold">Near Candolim Coastline • Sandy retreats</p>
                        </div>
                        <div className="flex justify-between items-end pt-4 border-t border-slate-50 mt-4">
                          <div>
                            <span className="text-[9px] text-slate-400 font-black block uppercase tracking-wider">Outlay Rate</span>
                            <strong className="text-base font-black text-blue-600">₹8,999<span className="text-[10px] text-slate-400 font-semibold">/night</span></strong>
                          </div>
                          <button onClick={() => { setHotelDestination('Goa'); setHotelStep('results'); }} className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[10px] px-3.5 py-1.5 rounded-lg uppercase cursor-pointer">Explore Goa</button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-md transition-shadow">
                      <div className="h-44 sm:h-auto sm:w-2/5 bg-slate-100 relative">
                        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop" alt="The Himalaya" className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 bg-slate-900/65 text-white font-black text-[9px] px-2 py-0.5 rounded uppercase">Transit Best</span>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="bg-blue-50 text-blue-700 font-black text-[9px] px-2 py-0.5 rounded uppercase">Boutique Hotel</span>
                            <span className="text-xs font-black text-slate-800 flex items-center gap-1">★ 4.5</span>
                          </div>
                          <h4 className="font-extrabold text-slate-855 text-base tracking-tight pt-1">The Himalaya Siliguri</h4>
                          <p className="text-[11px] text-slate-400 font-bold">Hill Cart Road, Near Coach Bus Terminus</p>
                        </div>
                        <div className="flex justify-between items-end pt-4 border-t border-slate-50 mt-4">
                          <div>
                            <span className="text-[9px] text-slate-400 font-black block uppercase tracking-wider">Outlay Rate</span>
                            <strong className="text-base font-black text-blue-600">₹2,400<span className="text-[10px] text-slate-400 font-semibold">/night</span></strong>
                          </div>
                          <button onClick={() => { setHotelDestination('Siliguri'); setHotelStep('results'); }} className="bg-slate-900 hover:bg-slate-805 text-white font-extrabold text-[10px] px-3.5 py-1.5 rounded-lg uppercase cursor-pointer">Explore Siliguri</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* STEP 2: HOTELS LIST RESULTS SCREEN 7 */}
            {hotelStep === 'results' && (
              <div id="hotels-results-pane-root" className="space-y-6 animate-fade-in">
                {/* Search Header display */}
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <button 
                      onClick={() => setHotelStep('search')} 
                      className="p-1 px-3 bg-slate-50 border border-slate-150 hover:bg-slate-100 rounded-lg text-slate-500 font-extrabold text-xs cursor-pointer"
                    >
                      ← Edit Search
                    </button>
                    <div>
                      <h3 className="text-lg font-black tracking-tight text-slate-850 flex items-center gap-2">
                        <span>Selected City: {hotelDestination}</span>
                      </h3>
                      <p className="text-xs text-slate-400 font-bold mt-0.5">Stay cycle: {hotelCheckIn} to {hotelCheckOut} • {hotelGuests} Guests • 1 Room</p>
                    </div>
                  </div>

                  {/* Filter tabs row */}
                  <div className="flex flex-wrap gap-2 font-black">
                    {[
                      { key: 'recommended', label: 'Recommended', color: 'border-blue-200 text-blue-600 bg-blue-50/40' },
                      { key: 'budget', label: 'Budget-Friendly', color: 'border-green-200 text-green-700 bg-green-50/40' },
                      { key: 'luxury', label: 'Premium Luxury', color: 'border-purple-200 text-purple-700 bg-purple-50/40' },
                      { key: 'popular', label: 'Highly Rated', color: 'border-amber-200 text-amber-700 bg-amber-50/40' }
                    ].map((badge) => (
                      <button 
                        key={badge.key}
                        onClick={() => setHotelActiveBadge(badge.key as any)}
                        className={`text-xs font-black py-2 px-3 border rounded-xl transition-all cursor-pointer ${
                          hotelActiveBadge === badge.key ? badge.color + ' ring-2 ring-offset-1 ring-blue-500' : 'border-slate-155 text-slate-500 bg-white hover:bg-slate-50'
                        }`}
                      >
                        {badge.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Results Listing representation of screen 7 list layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      id: 1,
                      name: 'The Lalit Great Eastern Kolkata',
                      rating: 4.3,
                      ratingWord: 'Excellent',
                      reviews: 1234,
                      address: '1, 2, 3 Old Court House Street, Dalhousie Square, Kolkata',
                      dist: '1.2 km from city center • Near Esplanade Transit',
                      price: 6500,
                      features: ['Free Cancellation', 'Heritage Suite', 'Swimming Pool', 'Buffet Dinner Included'],
                      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop'
                    },
                    {
                      id: 2,
                      name: 'Taj Bengal Kolkata',
                      rating: 4.6,
                      ratingWord: 'Excellent',
                      reviews: 2345,
                      address: '34-B Belvedere Road, Alipore, Kolkata',
                      dist: '2.5 km from city center • Near Alipore Zoo',
                      price: 8900,
                      features: ['Free Cancellation', 'Free Premium Wi-Fi', 'Gym Access', 'Exclusive Airport Shuttle'],
                      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop'
                    },
                    {
                      id: 3,
                      name: 'Hyatt Regency Kolkata',
                      rating: 4.5,
                      ratingWord: 'Excellent',
                      reviews: 1112,
                      address: 'JA-1 Sector III, Salt Lake City, Kolkata',
                      dist: '4.8 km from city center • Near IT Parks & Hubs',
                      price: 7200,
                      features: ['Free Cancellation', 'A/C Lounge', 'Massive Garden Pool', 'Luxury Spa Lounge'],
                      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600&auto=format&fit=crop'
                    },
                    {
                      id: 4,
                      name: 'The Peerless Inn Kolkata',
                      rating: 4.2,
                      ratingWord: 'Very Good',
                      reviews: 856,
                      address: '12 Jawaharlal Nehru Road, Esplanade, Kolkata',
                      dist: '0.2 km from city center • Steps away from metro gates',
                      price: 3200,
                      features: ['Free Cancellation', 'Budget Winner', 'Excellent Local Dining', 'Free High-speed Wi-Fi'],
                      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=600&auto=format&fit=crop'
                    }
                  ].map((hotel) => (
                    <div 
                      key={hotel.id}
                      className="bg-white rounded-3xl border border-slate-100 hover:border-blue-300 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative h-56 bg-slate-100 overflow-hidden">
                        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                        <div className="absolute top-4 right-4 bg-slate-900/60 backdrop-blur-md text-white font-extrabold text-xs px-3.5 py-1 rounded-full border border-white/10">
                          {hotel.ratingWord} ({hotel.rating} ★)
                        </div>
                        <div className="absolute bottom-4 left-4 flex gap-1.5 flex-wrap max-w-[90%]">
                          {hotel.features.slice(0, 2).map((feat, i) => (
                            <span key={i} className="bg-emerald-500/90 text-slate-900 font-extrabold text-[9px] px-2.5 py-1 rounded uppercase tracking-wider">
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-xl font-black text-slate-800 tracking-tight leading-snug">{hotel.name}</h4>
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-extrabold">
                            <MapPin className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                            <span className="truncate">{hotel.address}</span>
                          </div>
                          <p className="text-xs text-slate-400 font-bold pl-5">{hotel.dist}</p>
                        </div>

                        <div className="flex justify-between items-end border-t border-slate-50 pt-4 mt-2">
                          <div>
                            <span className="text-[10px] text-slate-400 font-black block uppercase tracking-wider">Price per night check</span>
                            <span className="text-2xl font-black text-blue-600">₹{hotel.price.toLocaleString()}<span className="text-xs text-slate-400 font-normal">/night</span></span>
                          </div>
                          <button 
                            onClick={() => {
                              setSelectedHotel(hotel);
                              setHotelStep('details');
                              setHotelDetailTab('overview');
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-6 rounded-xl shadow-md transition-transform active:scale-95 text-xs uppercase cursor-pointer"
                          >
                            Details & Reserve ➔
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: HOTEL DETAILS PORTAL SCREEN 8 */}
            {hotelStep === 'details' && selectedHotel && (
              <div id="hotel-detailed-pane-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
                
                {/* Visual Details Gallery & Highlights Left Column */}
                <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-[36px] border border-slate-100 shadow-sm space-y-6">
                  
                  {/* Title Header area */}
                  <div className="flex justify-between items-start flex-wrap gap-4 border-b border-slate-50 pb-4">
                    <div>
                      <div className="flex gap-2 items-center flex-wrap">
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-0.5 rounded font-black uppercase">Free cancellation activated</span>
                        <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">★ {selectedHotel.rating} {selectedHotel.ratingWord}</span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-800 tracking-tight mt-2.5">{selectedHotel.name}</h3>
                      <p className="text-xs text-slate-400 font-extrabold flex items-center gap-1.5 mt-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-300" />
                        <span>{selectedHotel.address}</span>
                      </p>
                    </div>

                    <button 
                      onClick={() => setHotelStep('results')} 
                      className="bg-slate-50 hover:bg-slate-100 text-slate-500 font-extrabold py-2 px-4 rounded-xl border border-slate-200 text-xs uppercase cursor-pointer"
                    >
                      ← Back to list
                    </button>
                  </div>

                  {/* Highlight image Gallery representing Screen 8 gallery slide 1/24 */}
                  <div className="relative h-96 bg-slate-100 rounded-3xl overflow-hidden shadow-sm border border-slate-200">
                    <img src={selectedHotel.image} alt={selectedHotel.name} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 bg-slate-900/70 backdrop-blur-md text-white font-black text-xs px-4 py-1.5 rounded-full border border-white/10 select-none">
                      Gallery Frame: 1/24
                    </div>
                  </div>

                  {/* Interactive Details tab bar as shown in Screen 8 overview row */}
                  <div className="flex border-b border-slate-150 overflow-x-auto gap-2 no-scrollbar">
                    {[
                      { key: 'overview', label: 'About Overview' },
                      { key: 'rooms', label: 'Room Suites' },
                      { key: 'amenities', label: 'Amenities' },
                      { key: 'reviews', label: 'Guest Reviews' },
                      { key: 'location', label: 'Map Location' }
                    ].map((tb) => (
                      <button 
                        key={tb.key}
                        onClick={() => setHotelDetailTab(tb.key as any)}
                        className={`py-3 px-4 text-xs font-extrabold border-b-2 whitespace-nowrap outline-none cursor-pointer ${
                          hotelDetailTab === tb.key ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-450 hover:text-slate-800'
                        }`}
                      >
                        {tb.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab contents block */}
                  <div className="space-y-6 pt-2">
                    
                    {/* OVERVIEW CONTENT */}
                    {hotelDetailTab === 'overview' && (
                      <div className="space-y-6 animate-fade-in text-xs font-semibold text-slate-500 leading-relaxed">
                        <div className="space-y-2">
                          <strong className="text-slate-800 text-sm block">Property description</strong>
                          <p>
                            {selectedHotel.name} blends magnificent historic architecture and timeless heritage charm with pure modern luxury amenities. Located in the perfect coordinate geographic center of Kolkata, it features ultra-spacious soundproof executive rooms, premium fine-dining suites, deep wellness spas and secure parking chambers.
                          </p>
                        </div>

                        {/* Popular Amenities section precisely from Screen 8 layout */}
                        <div className="space-y-3.5 border-t border-slate-100 pt-5">
                          <strong className="text-slate-855 text-sm block">Popular Amenities</strong>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-150">
                              <span className="text-emerald-700 text-base font-bold">📡</span>
                              <div>
                                <strong className="text-slate-800 block text-[11px] leading-tight">Free High-speed Wi-Fi</strong>
                                <span className="text-[9px] text-slate-400 font-bold font-sans">Unlimited devices connected</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-150">
                              <span className="text-emerald-700 text-base font-bold">🍳</span>
                              <div>
                                <strong className="text-slate-800 block text-[11px] leading-tight font-black">Free Breakfast Buffet</strong>
                                <span className="text-[9px] text-slate-400 font-bold">Kolkata specialities included</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-150">
                              <span className="text-emerald-700 text-base font-bold">🏊</span>
                              <div>
                                <strong className="text-slate-800 block text-[11px] leading-tight">Infinity Swimming Pool</strong>
                                <span className="text-[9px] text-slate-400 font-bold">A/C temperature regulated</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-150">
                              <span className="text-emerald-700 text-base font-bold">💆</span>
                              <div>
                                <strong className="text-slate-800 block text-[11px] leading-tight">Luxury Wellness Spa</strong>
                                <span className="text-[9px] text-slate-400 font-bold">Swedish & massage therapies</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-150">
                              <span className="text-emerald-700 text-base font-bold">🚗</span>
                              <div>
                                <strong className="text-slate-800 block text-[11px] leading-tight">Chamber Valet Parking</strong>
                                <span className="text-[9px] text-slate-400 font-bold font-sans">24h CCTV secure monitoring</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-150">
                              <span className="text-emerald-700 text-base font-bold">🏋️</span>
                              <div>
                                <strong className="text-slate-800 block text-[11px] leading-tight">Executive Gym Fitness</strong>
                                <span className="text-[9px] text-slate-400 font-bold">Open round the clock</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Guest love pointers from Screen 8 */}
                        <div className="space-y-3 border-t border-slate-100 pt-5">
                          <strong className="text-slate-855 text-sm block">Why guests love this property</strong>
                          <div className="space-y-3 pl-1">
                            <div className="flex gap-3 animate-fade-in">
                              <span className="text-blue-600 font-bold text-sm shrink-0">📍</span>
                              <div>
                                <strong className="text-slate-800 text-xs block">Excellent Location (9.4 / 10 Guest Score)</strong>
                                <p className="text-[11px] text-slate-400 font-semibold leading-relaxed mt-0.5">Conveniently situated in Dalhousie Sqr, with fast pedestrian paths to Metro rail networks, park districts and Siliguri bus stations.</p>
                              </div>
                            </div>
                            <div className="flex gap-3 animate-fade-in">
                              <span className="text-blue-600 font-bold text-sm shrink-0">👨‍👩‍👧‍👦</span>
                              <div>
                                <strong className="text-slate-800 text-xs block">Great for Families and Corporate travelers</strong>
                                <p className="text-[11px] text-slate-400 font-semibold leading-relaxed mt-0.5 font-sans">Includes multi-language reception desks, quick child playrooms and isolated desk workspaces.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SUITE ROOM CHOICES TAB */}
                    {hotelDetailTab === 'rooms' && (
                      <div className="space-y-4 animate-fade-in font-semibold text-xs text-slate-500">
                        <strong className="text-slate-800 block text-sm">Available Room Configurations</strong>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex justify-between items-center">
                          <div>
                            <strong className="text-slate-800 text-xs sm:text-sm block">Heritage Executive Twin Room</strong>
                            <p className="text-[11px] text-slate-450 mt-1 font-semibold">1 King bed • Garden view • Buffet inclusive</p>
                          </div>
                          <span className="bg-blue-50 text-blue-700 font-extrabold text-[11px] px-3 py-1 rounded">Selected</span>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border border-slate-100 opacity-60 flex justify-between items-center hover:opacity-100 cursor-pointer" onClick={() => alert('Upgrade options calculating. Premium Viceroy selected Suite is active!')}>
                          <div>
                            <strong className="text-slate-800 text-xs sm:text-sm block">Viceroy Royal Suite (Spa Access Upgrade)</strong>
                            <p className="text-[11px] text-slate-450 mt-1 font-semibold">Separate living block • Pool side view • Executive bar access (+₹3,000/night)</p>
                          </div>
                          <span className="border border-slate-200 text-slate-500 font-extrabold text-[11px] px-3 py-1 rounded hover:border-blue-500 hover:text-blue-600">Upgrade</span>
                        </div>
                      </div>
                    )}

                    {/* AMENITIES TAB */}
                    {hotelDetailTab === 'amenities' && (
                      <div className="space-y-3 animate-fade-in text-xs font-semibold text-slate-500 leading-relaxed">
                        <strong className="text-slate-800 text-sm block">All Premium Utilities Included</strong>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Secure high speed Wi-Fi networks in rooms and corridors</li>
                          <li>Individual central climate automated temperature panel control</li>
                          <li>24-Hour security checkpoints and CCTV electronic safeguard system</li>
                          <li>Electronic locker safe in cupboards</li>
                          <li>Espresso machines with premium local tea-garden bags</li>
                          <li>Complimentary dry laundry wash treatment up to two clothing packs</li>
                        </ul>
                      </div>
                    )}

                    {/* REVIEWS TAB */}
                    {hotelDetailTab === 'reviews' && (
                      <div className="space-y-4 animate-fade-in scroll-smooth">
                        <strong className="text-slate-800 text-sm block">Recent Validated Travelers Feedback</strong>
                        <div className="space-y-3">
                          <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl">
                            <div className="flex justify-between items-center">
                              <span className="font-extrabold text-slate-808 text-xs">Arjun Sharma</span>
                              <span className="text-xs text-yellow-500">★★★★★ 5.0</span>
                            </div>
                            <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mt-2 font-sans">
                              "Exceptional stay at The Lalit! Truly historic colonial interiors beautifully maintained. Staff went out of their path to arrange an early checkout tea pack before our shuttle voyage."
                            </p>
                          </div>
                          <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl">
                            <div className="flex justify-between items-center">
                              <span className="font-extrabold text-slate-808 text-xs">Priya Sen</span>
                              <span className="text-xs text-yellow-500 font-bold">★★★★☆ 4.5</span>
                            </div>
                            <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mt-2">
                              "The buffet breakfast had so many delectable local specialities! Beds were cloud soft. Location was absolutely prime right beside Esplanade."
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Location maps tab representing Screen 8 Map card */}
                    {hotelDetailTab === 'location' && (
                      <div className="space-y-4 animate-fade-in font-semibold text-xs text-slate-500">
                        <strong className="text-slate-800 text-sm block font-sans">Dalhousie Square Heritage Coordinate Grid</strong>
                        <div className="relative h-64 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
                          {/* Map mock graphics */}
                          <div className="absolute inset-0 opacity-15" style={{ 
                            backgroundImage: 'radial-gradient(#000000 1.2px, transparent 1.2px)', 
                            backgroundSize: '16px 16px' 
                          }} />
                          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <line x1="20" y1="120" x2="600" y2="120" stroke="#cbd5e1" strokeWidth="6" />
                            <line x1="200" y1="10" x2="200" y2="300" stroke="#cbd5e1" strokeWidth="6" />
                          </svg>
                          <div className="absolute left-[200px] top-[120px] -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full p-2.5 shadow-lg border border-white">
                            🏨
                          </div>
                          <div className="absolute left-[340px] top-[170px] bg-slate-900/90 text-white font-black text-[9px] px-2.5 py-1.5 rounded-lg border border-slate-700">
                            Victoria Memorial (1.5 km)
                          </div>
                          <div className="absolute left-[60px] top-[50px] bg-slate-900/90 text-white font-black text-[9px] px-2.5 py-1.5 rounded-lg border border-slate-700 font-sans">
                            Park Street (1.0 km)
                          </div>
                        </div>
                        <p className="pl-1">Airport distance: Netaji Subhash Chandra Bose Airport is exactly 12.8 km away.</p>
                      </div>
                    )}

                  </div>

                </div>

                {/* Right Column Booking Reserve Form Side-Panel Screen 8 */}
                <div className="lg:col-span-4 bg-white p-6 rounded-[36px] border border-slate-100 shadow-xl space-y-6">
                  <div>
                    <span className="text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100 inline-block leading-none">
                      Active Reservation
                    </span>
                    <h3 className="text-xl font-black text-slate-800 mt-2.5">Combined Stay Charge</h3>
                  </div>

                  <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200 space-y-3.5 text-xs font-semibold text-slate-500">
                    <div className="flex justify-between items-center">
                      <span>Rate per Night stayed</span>
                      <span>₹{selectedHotel.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Stay Duration</span>
                      <span className="text-slate-800 font-extrabold">{hotelNights} Nights</span>
                    </div>
                    <div className="flex justify-between items-center pt-2.5 border-t border-slate-200">
                      <span>Base Lodging Charge</span>
                      <span className="text-slate-800 font-extrabold font-sans">₹{(selectedHotel.price * hotelNights).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>State GST & Services Fee</span>
                      <span className="text-slate-800 font-extrabold">₹1,550</span>
                    </div>
                    <div className="flex justify-between items-center text-emerald-600 font-black">
                      <span>Niklo Welcome Discount applied</span>
                      <span>-₹1,000</span>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-slate-200 text-slate-800">
                      <strong className="text-sm font-black">Consolidated Total</strong>
                      <strong className="text-xl font-black text-blue-600">₹{(selectedHotel.price * hotelNights + 1550 - 1000).toLocaleString()}</strong>
                    </div>
                  </div>

                  {/* Coupon activation guide */}
                  <div className="p-3.5 bg-blue-50/40 rounded-xl border border-blue-100 text-xs font-bold text-blue-800">
                    💡 Wallet Cashback of ₹500 will be credited directly to your Niklo balance upon checkout!
                  </div>

                  {/* CTA confirmation click */}
                  <button 
                    onClick={() => {
                      const finalCash = selectedHotel.price * hotelNights + 1550 - 1000;
                      setWalletBalance(prev => Math.max(0, prev - finalCash));
                      
                      // Log to transactions history
                      const trId = `HOTEL-${Math.floor(10000 + Math.random() * 90000)}`;
                      setTransactions([
                        {
                          title: `Hotel stay: ${selectedHotel.name}`,
                          amount: -finalCash,
                          type: 'debit',
                          date: 'Today'
                        },
                        ...transactions
                      ]);

                      // Success logging history
                      setConfirmedBookings([
                        {
                          ticketId: trId,
                          route: `Stay in Kolkata (${hotelNights} Nights)`,
                          date: hotelCheckIn,
                          busOperator: selectedHotel.name,
                          busType: 'Elite Suite Deluxe Room',
                          seats: ['Room 304'],
                          price: finalCash,
                          departure: '02:00 PM Check-In',
                          arrival: '12:00 PM Check-Out'
                        },
                        ...confirmedBookings
                      ]);

                      setHotelStep('success');
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg transition-transform active:scale-95 tracking-wider text-xs uppercase cursor-pointer text-center"
                  >
                    Confirm & Reserve Room Now ➔
                  </button>
                </div>

              </div>
            )}

            {/* STEP 4: SUCCESS OVERVIEW PANEL */}
            {hotelStep === 'success' && selectedHotel && (
              <div id="hotel-success-pane" className="max-w-2xl mx-auto bg-gradient-to-br from-blue-800 to-indigo-700 text-white p-8 md:p-10 rounded-[36px] shadow-2xl text-center space-y-6 animate-fade-in relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-12 -mt-12 blur-xl" />
                
                <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto">
                  <Check className="w-9 h-9 text-blue-700 stroke-[3]" />
                </div>

                <div className="space-y-1.5 font-sans">
                  <span className="text-[10px] font-black tracking-widest uppercase bg-white/25 px-3 py-1 rounded-full inline-block">Direct Stay Voucher</span>
                  <h3 className="text-2xl font-black mt-2">Hotel Suite Booked Successfully!</h3>
                  <p className="text-xs text-blue-100 max-w-sm mx-auto leading-relaxed">
                    Your luxury heritage stay at {selectedHotel.name} is scheduled and synchronized with our concierge desk.
                  </p>
                </div>

                <div className="bg-white/10 p-5 rounded-2xl border border-white/10 text-left space-y-4 text-xs font-semibold text-blue-100">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10 text-white font-sans">
                    <div>
                      <span className="text-[9px] text-blue-200 font-black block uppercase">Property Room</span>
                      <strong className="text-sm font-black text-white">{selectedHotel.name} (Room 304)</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-blue-200 font-black block uppercase font-sans">Stay Cycle</span>
                      <strong className="text-xs text-white search-day">{hotelNights} Nights</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] font-bold block">Check-In Reporting</span>
                      <strong className="text-xs text-white">{hotelCheckIn} @ 02:00 PM</strong>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold block">Registered Guest</span>
                      <strong className="text-xs text-white">{user.name || 'Arjun Sharma'}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      setBottomTab('bookings');
                      setHotelStep('search');
                    }}
                    className="flex-1 bg-white hover:bg-slate-100 text-blue-850 font-extrabold py-3.5 rounded-xl text-xs uppercase shadow cursor-pointer text-center"
                  >
                    Open Active Passes
                  </button>
                  <button 
                    onClick={() => {
                      setBottomTab('home');
                      setHotelStep('search');
                    }}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white font-extrabold py-3.5 rounded-xl text-xs uppercase border border-white/20 cursor-pointer text-center"
                  >
                    Go Back Home
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* --- DYNAMIC INTEGRATED EXPERIENCES & ADVENTURES VIEW --- */}
        {bottomTab === 'adventures' && (
          <div id="experiences-booking-dashboard" className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full animate-fade-in space-y-8">
            
            {/* Header section representing Screens 9 & 10 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">Experiences & Wild Adventures</h3>
                <p className="text-sm text-slate-500 mt-1 font-medium">Discover validated sports, trekking routes, paragliding excursions and river safaris with expert local guide squads.</p>
              </div>
              <span className="text-xs font-black text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100 uppercase tracking-widest block">
                🏄 Certified Instructors
              </span>
            </div>

            {/* STEP 1: SEARCH ADVENTURES SCREEN 9 */}
            {adventureStep === 'search' && (
              <div id="adventures-search-pane-root" className="space-y-10 animate-fade-in">
                {/* Search Form Card Grid */}
                <div className="bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-md max-w-3xl mx-auto space-y-6">
                  
                  {/* Inputs Row */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    {/* Adventure Type */}
                    <div className="md:col-span-5 space-y-2">
                      <label htmlFor="adv-search-cat-picker" className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 block">Activity Category</label>
                      <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 focus-within:border-blue-500 transition-all">
                        <Compass className="w-5 h-5 text-amber-500 shrink-0" />
                        <select 
                          id="adv-search-cat-picker"
                          value={adventureCategory}
                          onChange={(e) => setAdventureCategory(e.target.value as any)}
                          className="bg-transparent w-full text-xs font-extrabold text-slate-700 focus:outline-none cursor-pointer outline-none"
                        >
                          <option value="all">All Experiences & Wild Sports</option>
                          <option value="water_sports">Water Sports (Rafting, Kayaking)</option>
                          <option value="trekking">Trekking & Sky Hiking</option>
                          <option value="safaris">Wildlife Jungle Safaris</option>
                        </select>
                      </div>
                    </div>

                    {/* Date picker */}
                    <div className="md:col-span-4 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 block">Preferred Date</label>
                      <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                        <Calendar className="w-5 h-5 text-blue-600 shrink-0" />
                        <input 
                          type="text" 
                          value={adventureDate} 
                          onChange={(e) => setAdventureDate(e.target.value)} 
                          className="bg-transparent w-full text-xs font-extrabold text-slate-800 focus:outline-none"
                          placeholder="e.g. 22 May 2024"
                        />
                      </div>
                    </div>

                    {/* Person count */}
                    <div className="md:col-span-3 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 block">Total Travelers</label>
                      <div className="flex justify-between items-center bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                        <span className="text-xs font-extrabold text-slate-700">{adventureTravelers} Person{adventureTravelers > 1 ? 's' : ''}</span>
                        <div className="flex gap-2">
                          <button onClick={() => setAdventureTravelers(prev => Math.max(1, prev - 1))} className="w-6 h-6 bg-white border border-slate-200 rounded-full text-xs font-black flex items-center justify-center cursor-pointer hover:bg-slate-100">-</button>
                          <button onClick={() => setAdventureTravelers(prev => Math.max(1, prev + 1))} className="w-6 h-6 bg-white border border-slate-200 rounded-full text-xs font-black flex items-center justify-center cursor-pointer hover:bg-slate-100">+</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="border-t border-slate-100 pt-6 flex justify-end">
                    <button 
                      onClick={() => alert(`Showing adventure excursions for ${adventureCategory.toUpperCase()} on ${adventureDate}. Scroll down to explore our selection!`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 px-8 rounded-xl shadow-md text-xs uppercase tracking-wider cursor-pointer text-center w-full sm:w-auto"
                    >
                      Filter Excursions ➔
                    </button>
                  </div>

                </div>

                {/* Adventure Excursion Grid List representing Screen 10 */}
                <div className="space-y-6 animate-fade-in">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Top recommendations</h4>
                      <h3 className="text-xl font-black text-slate-800 tracking-tight mt-0.5 font-sans">Available Excursions</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        name: 'Water Rafting in Teesta',
                        rating: 4.8,
                        reviews: 1234,
                        price: 1850,
                        tag: 'Water Sports',
                        tagKey: 'water_sports',
                        difficulty: 'Moderate',
                        duration: '3-4 Hours',
                        group: '2-12 People',
                        image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?q=80&w=650&auto=format&fit=crop',
                        desc: 'Feel the rush as you raft through the wild rapids of Teesta River. Perfect for adventure seekers context.'
                      },
                      {
                        name: 'Paragliding in Kalimpong',
                        rating: 4.7,
                        reviews: 856,
                        price: 2400,
                        tag: 'Air Sports',
                        tagKey: 'air_sports',
                        difficulty: 'Moderate',
                        duration: '20-30 Mins',
                        group: '1 Person',
                        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=650&auto=format&fit=crop',
                        desc: 'Glide like a bird above Kalimpong green valley peaks with extreme qualified tandem instructors.'
                      },
                      {
                        name: 'Jungle Safari in Jaldapara',
                        rating: 4.6,
                        reviews: 912,
                        price: 1890,
                        tag: 'Wildlife Safaris',
                        tagKey: 'safaris',
                        difficulty: 'Easy',
                        duration: '2-3 Hours',
                        group: '1-6 People',
                        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=650&auto=format&fit=crop',
                        desc: 'Discover Indian horn rhinos and bengal leopards in Jaldapara woods on open jeep grids.'
                      },
                      {
                        name: 'Kayaking on the Ganges',
                        rating: 4.5,
                        reviews: 432,
                        price: 1200,
                        tag: 'Water Sports',
                        tagKey: 'water_sports',
                        difficulty: 'Moderate',
                        duration: '1.5-2 Hours',
                        group: '1-10 People',
                        image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=650&auto=format&fit=crop',
                        desc: 'Beautiful classic paddling excursion in Bengal delta channels guided by supreme security kayakers.'
                      }
                    ].filter(item => adventureCategory === 'all' || item.tagKey === adventureCategory).map((adv, i) => (
                      <div 
                        key={i}
                        className="bg-white rounded-3xl border border-slate-100 hover:border-amber-300 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300"
                      >
                        <div className="relative h-44 bg-slate-100 overflow-hidden">
                          <img src={adv.image} alt={adv.name} className="w-full h-full object-cover" />
                          <span className="absolute top-3 left-3 bg-slate-900/60 backdrop-blur-sm text-white font-black text-[9px] px-2 py-0.5 rounded uppercase">{adv.tag}</span>
                          <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded">★ {adv.rating}</span>
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-1.5 font-sans">
                            <h4 className="font-extrabold text-slate-800 text-sm tracking-tight leading-snug line-clamp-1">{adv.name}</h4>
                            <p className="text-[11px] text-slate-400 font-bold line-clamp-2 leading-relaxed">{adv.desc}</p>
                            
                            <div className="grid grid-cols-2 gap-1.5 pt-2 text-[10px] font-black text-slate-400 uppercase">
                              <span className="bg-slate-50 p-1 px-1.5 rounded truncate">⏱️ {adv.duration}</span>
                              <span className="bg-slate-50 p-1 px-1.5 rounded truncate">👥 {adv.group}</span>
                            </div>
                          </div>

                          <div className="border-t border-slate-50 pt-3 flex justify-between items-center">
                            <div>
                              <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Outlay Charge</span>
                              <strong className="text-sm font-black text-blue-600">₹{adv.price.toLocaleString()}<span className="text-[9px] text-slate-400 font-semibold font-sans">/pax</span></strong>
                            </div>
                            <button 
                              onClick={() => {
                                setSelectedAdventure(adv);
                                setAdventureStep('details');
                              }}
                              className="bg-teal-50 hover:bg-blue-600 hover:text-white border border-teal-200 hover:border-blue-600 text-slate-800 font-bold text-[10px] px-3 py-1.5 rounded-lg uppercase cursor-pointer transition-colors"
                            >
                              Explore Excursion
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* STEP 2: ADVENTURE DETAILS PORTAL SCREEN 11 */}
            {adventureStep === 'details' && selectedAdventure && (
              <div id="adventure-detailed-pane-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
                
                {/* Information Left Column Screen 11 content */}
                <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-[36px] border border-slate-100 shadow-sm space-y-6">
                  
                  {/* Category and Title */}
                  <div className="flex justify-between items-start flex-wrap gap-4 border-b border-slate-50 pb-4">
                    <div>
                      <div className="flex gap-2 items-center">
                        <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-150 px-2.5 py-0.5 rounded font-black uppercase">Excursion Authorized</span>
                        <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">★ {selectedAdventure.rating} ({selectedAdventure.reviews} Reviews)</span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-800 tracking-tight mt-2.5">{selectedAdventure.name}</h3>
                      <p className="text-xs text-slate-400 font-extrabold flex items-center gap-1.5 mt-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-300" />
                        <span>Sikkim-Bengal Foothills, Siliguri Valley Route</span>
                      </p>
                    </div>

                    <button 
                      onClick={() => setAdventureStep('search')} 
                      className="bg-slate-50 hover:bg-slate-100 text-slate-500 font-extrabold py-2 px-4 rounded-xl border border-slate-200 text-xs uppercase cursor-pointer"
                    >
                      ← Back to list
                    </button>
                  </div>

                  {/* Slide Image Frame representing Screen 11 gallery 1/24 */}
                  <div className="relative h-96 bg-slate-100 rounded-3xl overflow-hidden shadow-sm border border-slate-200">
                    <img src={selectedAdventure.image} alt={selectedAdventure.name} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 bg-slate-900/70 backdrop-blur-md text-white font-black text-xs px-4 py-1.5 rounded-full border border-white/10 select-none">
                      Gallery Frame: 1/24
                    </div>
                  </div>

                  {/* Attributes Grid Screen 11 */}
                  <div className="grid grid-cols-3 gap-4 font-black text-xs text-slate-605 uppercase border-y border-slate-100 py-4 font-sans">
                    <div className="text-center p-2.5 bg-slate-50 rounded-2xl border border-slate-150">
                      <span className="text-[9px] text-slate-400 block pb-1 font-extrabold">Excursion Duration</span>
                      ⏱️ {selectedAdventure.duration}
                    </div>
                    <div className="text-center p-2.5 bg-slate-50 rounded-2xl border border-slate-150">
                      <span className="text-[9px] text-slate-400 block pb-1 font-extrabold">Threat Factor</span>
                      🏔️ {selectedAdventure.difficulty}
                    </div>
                    <div className="text-center p-2.5 bg-slate-50 rounded-2xl border border-slate-150">
                      <span className="text-[9px] text-slate-400 block pb-1 font-extrabold font-sans">Standard squad</span>
                      👥 {selectedAdventure.group}
                    </div>
                  </div>

                  {/* Written Description */}
                  <div className="space-y-2 text-xs font-semibold text-slate-500 leading-relaxed pt-2">
                    <strong className="text-slate-800 text-sm block">Excursion description</strong>
                    <p>{selectedAdventure.desc} All outings are monitored directly in real-time by forest security crews, featuring secure satellite signals and certified safety kayaker companions. Explore the valley flora and fauna in high confidence with Niklo.</p>
                  </div>

                  {/* Highlights checklist */}
                  <div className="space-y-3.5 border-t border-slate-100 pt-5 text-xs font-semibold text-slate-500">
                    <strong className="text-slate-800 text-sm block">Activity Highlights</strong>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-1">
                      <div className="flex gap-2.5">
                        <span className="text-blue-600 text-sm">🌊</span>
                        <span>Thrilling rapid gradients handled by international certified instructors</span>
                      </div>
                      <div className="flex gap-2.5">
                        <span className="text-blue-600 text-sm">🦺</span>
                        <span>High standard security jackets, tactical helmets & rafts provided</span>
                      </div>
                      <div className="flex gap-2.5">
                        <span className="text-blue-600 text-sm">🏞️</span>
                        <span>Gorgeous view frames of forested canyon hillsides & rapids</span>
                      </div>
                      <div className="flex gap-2.5">
                        <span className="text-blue-600 text-sm">🗺️</span>
                        <span>Complete security and safety brief, highly friendly to beginners</span>
                      </div>
                    </div>
                  </div>

                  {/* What's Included and What to Bring lists Screen 11 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 pt-5 text-xs font-semibold text-slate-500">
                    {/* Included column */}
                    <div className="space-y-3">
                      <strong className="text-slate-800 text-sm block">What's Included</strong>
                      <div className="space-y-2.5 pl-1">
                        <div className="flex gap-2 items-center">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Certified Safety Instructor Squad</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>All premium security gear & lifejackets</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Accidental medical protection shield</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Nutrition energy bars & refreshments</span>
                        </div>
                      </div>
                    </div>

                    {/* Bring column */}
                    <div className="space-y-3 font-sans">
                      <strong className="text-slate-800 text-sm block">What to Bring</strong>
                      <div className="space-y-2.5 pl-1 text-slate-500 font-semibold">
                        <div className="flex gap-2 items-center">
                          <span className="text-amber-500 font-bold shrink-0">👟</span>
                          <span>Extra sandals or water-shoes</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className="text-amber-500 font-bold shrink-0">🧦</span>
                          <span>Towel and dry change of body clothing</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className="text-amber-500 font-bold shrink-0">🧴</span>
                          <span>Sun protection cream</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customer reviews from Screen 11 */}
                  <div className="border-t border-slate-100 pt-5 space-y-4">
                    <strong className="text-slate-855 text-sm block">Excursion reviews from actual travelers</strong>
                    <div className="space-y-3">
                      <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl text-xs">
                        <div className="flex justify-between items-center">
                          <strong className="text-slate-800 font-bold">Arjun S.</strong>
                          <span className="text-yellow-500 font-black">★★★★★ 5.0</span>
                        </div>
                        <p className="text-slate-500 font-semibold leading-relaxed mt-1.5">
                          "Amazing experience! Our guide was super professional. Highly recommended for family group sports. River Teesta was wild but felt completely safe throughout!"
                        </p>
                      </div>
                      <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl text-xs">
                        <div className="flex justify-between items-center font-sans">
                          <strong className="text-slate-800 font-bold">Priya S.</strong>
                          <span className="text-yellow-500 font-black font-sans">★★★★★ 5.0</span>
                        </div>
                        <p className="text-slate-500 font-semibold leading-relaxed mt-1.5">
                          "Scenic views paired with thrilling rapids. Great security standards and high-quality helmets. Sells out fast so book in advance."
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Left Side Booking Panel Screen 11 */}
                <div className="lg:col-span-4 bg-white p-6 rounded-[36px] border border-slate-100 shadow-xl space-y-6">
                  <div>
                    <span className="text-[10px] font-black uppercase bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-100 inline-block leading-none">
                      Guaranteed Booking
                    </span>
                    <h3 className="text-xl font-black text-slate-800 mt-2.5">Seat Confirmation</h3>
                  </div>

                  <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200 space-y-3 text-xs font-semibold text-slate-500">
                    <div className="flex justify-between items-center">
                      <span>Rate per Adventurer</span>
                      <span className="text-slate-800 font-extrabold">₹{selectedAdventure.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Riders Count</span>
                      <span className="text-slate-800 font-extrabold">{adventureTravelers} Pax</span>
                    </div>
                    <div className="flex justify-between items-center pt-2.5 border-t border-slate-200">
                      <span>Standard Outlay</span>
                      <span className="text-slate-800 font-extrabold font-sans">₹{(selectedAdventure.price * adventureTravelers).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Certified Guide Allocation Fee</span>
                      <span className="text-slate-800 font-extrabold">₹95</span>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-slate-200 text-slate-800">
                      <strong className="text-sm font-black font-sans">Grand Outlay Total</strong>
                      <strong className="text-xl font-black text-blue-600">₹{(selectedAdventure.price * adventureTravelers + 95).toLocaleString()}</strong>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      const finalCash = selectedAdventure.price * adventureTravelers + 95;
                      setWalletBalance(prev => Math.max(0, prev - finalCash));
                      
                      // Log to transactions history
                      const trId = `ADV-${Math.floor(10000 + Math.random() * 90000)}`;
                      setTransactions([
                        {
                          title: `Adventure ticket: ${selectedAdventure.name}`,
                          amount: -finalCash,
                          type: 'debit',
                          date: 'Today'
                        },
                        ...transactions
                      ]);

                      // Success logging history
                      setConfirmedBookings([
                        {
                          ticketId: trId,
                          route: `Teesta River Rafting Adventure`,
                          date: adventureDate,
                          busOperator: selectedAdventure.name,
                          busType: `Adventure (${adventureTravelers} Riders)`,
                          seats: ['Raft 2A'],
                          price: finalCash,
                          departure: '08:00 AM Valley Reporting',
                          arrival: '12:30 PM Completion Handouts'
                        },
                        ...confirmedBookings
                      ]);

                      setAdventureStep('success');
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg transition-transform active:scale-95 tracking-wider text-xs uppercase cursor-pointer text-center font-sans"
                  >
                    Confirm & Secure Excursion Now ➔
                  </button>
                </div>

              </div>
            )}

            {/* STEP 3: ADVENTURE SUCCESS CARD */}
            {adventureStep === 'success' && selectedAdventure && (
              <div id="adventure-success-pane" className="max-w-2xl mx-auto bg-gradient-to-br from-amber-600 to-orange-500 text-white p-8 md:p-10 rounded-[36px] shadow-2xl text-center space-y-6 animate-fade-in relative overflow-hidden font-sans">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-12 -mt-12 blur-xl" />
                
                <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto">
                  <Check className="w-9 h-9 text-orange-650 stroke-[3]" />
                </div>

                <div className="space-y-1.5 font-sans">
                  <span className="text-[10px] font-black tracking-widest uppercase bg-white/25 px-3 py-1 rounded-full inline-block font-sans">Direct Pass Voucher</span>
                  <h3 className="text-2xl font-black mt-2">Adventure Excursion Confirmed!</h3>
                  <p className="text-xs text-amber-100 max-w-sm mx-auto leading-relaxed">
                    Your rafting/sports pass at {selectedAdventure.name} is verified and registered with our guide captain.
                  </p>
                </div>

                <div className="bg-white/10 p-5 rounded-2xl border border-white/10 text-left space-y-4 text-xs font-semibold text-amber-50">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10 text-white">
                    <div>
                      <span className="text-[9px] text-amber-100 font-black block uppercase font-sans">Excursion Ticket</span>
                      <strong className="text-sm font-black text-white">{selectedAdventure.name}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-amber-150 font-black block uppercase font-sans font-black">Riders count</span>
                      <strong className="text-xs text-white ticket-qty">{adventureTravelers} Pax</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] font-bold block">Reporting Date</span>
                      <strong className="text-xs text-white">{adventureDate} @ 08:00 AM</strong>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold block">Primary Registered Rider</span>
                      <strong className="text-xs text-white">{user.name || 'Arjun Sharma'}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      setBottomTab('bookings');
                      setAdventureStep('search');
                    }}
                    className="flex-1 bg-white hover:bg-slate-100 text-orange-605 font-extrabold py-3.5 rounded-xl text-xs uppercase shadow cursor-pointer text-center font-sans"
                  >
                    Open Active Passes
                  </button>
                  <button 
                    onClick={() => {
                      setBottomTab('home');
                      setAdventureStep('search');
                    }}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white font-extrabold py-3.5 rounded-xl text-xs uppercase border border-white/20 cursor-pointer text-center"
                  >
                    Go Back Home
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* 9. MY PROFILE AND ACCOUNT DETAIL */}
        {bottomTab === 'account' && currentStep === 'home' && (
          <div id="persisted-account-view" className="flex-1 max-w-3xl mx-auto px-6 py-10 w-full animate-fade-in">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Account Control Center</h3>
                <p className="text-sm text-slate-400 mt-1 font-medium">Customize credentials, preferences, and partner sync states</p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center space-y-4">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto shadow-md border border-slate-100">
                  {user.name ? user.name.charAt(0) : 'A'}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-base">{user.name || 'Arjun'}</h4>
                  <p className="text-xs text-slate-400 font-bold mt-1">{contactPhone} • {contactEmail}</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 divide-y divide-slate-100 overflow-hidden shadow-sm">
                <div className="p-5 flex justify-between items-center text-xs font-bold hover:bg-slate-50 cursor-pointer">
                  <span className="text-slate-600">Language Preference Selection</span>
                  <span className="text-blue-600 font-black">{user.language.toUpperCase()}</span>
                </div>
                <div className="p-5 flex justify-between items-center text-xs font-bold hover:bg-slate-50 cursor-pointer">
                  <span className="text-slate-600">Privacy Policy & Terms Agreements</span>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
                <div className="p-5 flex justify-between items-center text-xs font-bold hover:bg-slate-50 cursor-pointer">
                  <span className="text-slate-600">Regional Help Center & Support</span>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </div>

              <button 
                onClick={onLogout}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-extrabold py-4 rounded-xl transition-all text-xs tracking-wider uppercase cursor-pointer text-center"
              >
                Logout Active Account Credentials
              </button>
            </div>
          </div>
        )}

        {/* 10. HELP & SUPPORT CENTER (Screen 4) */}
        {bottomTab === 'help' && (
          <div id="persisted-help-view" className="flex-1 max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-10 w-full animate-fade-in text-slate-800 space-y-8">
            {/* Header section matching Screen 4 layout */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-4 gap-4">
              <div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-rose-500" />
                  <span>Niklo Care Support</span>
                </h3>
                <p className="text-xs md:text-sm text-slate-400 mt-1 font-semibold">How can we help you? Explore warranties, cases, and travel worry-free with Niklo.</p>
              </div>
              <span className="text-xs font-black text-rose-700 bg-rose-50 border border-rose-100 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                🟢 Live Agent Desk Online
              </span>
            </div>

            {/* Main Grid: Support Options & Articles */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left support sidebar */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Large CTA: Chat with Us card */}
                <button
                  type="button"
                  onClick={() => {
                    setSimulatedChatOpen(true);
                  }}
                  className="w-full text-left bg-gradient-to-br from-rose-600 to-rose-550 hover:from-rose-650 hover:to-rose-600 p-6 rounded-[28px] text-white shadow-xl hover:shadow-2xl transition-all active:scale-[0.98] relative overflow-hidden group cursor-pointer"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl pointer-events-none" />
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/15">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-black bg-emerald-500 text-white px-2.5 py-1 rounded-full uppercase tracking-wider animate-pulse flex items-center gap-1">
                      <span>•</span> Live
                    </span>
                  </div>
                  <div className="mt-6 space-y-1">
                    <h4 className="text-xl font-black tracking-tight font-sans">Chat with Us</h4>
                    <p className="text-[10.5px] text-rose-100/90 font-medium leading-relaxed mt-1">Connect with our dedicated customer support agent in 30 seconds for immediate resolution.</p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-white/10 flex justify-between items-center text-xs font-black">
                    <span className="text-white/90">Initialize secure room</span>
                    <span>➔</span>
                  </div>
                </button>

                {/* Quick Help Selector Categories */}
                <div className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm space-y-4">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-sans">Category Quick Filters</h5>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'all', title: 'See All Questions', icon: '📋' },
                      { id: 'bookings', title: 'Bookings & Tickets', icon: '🎫' },
                      { id: 'payments', title: 'Payments & Refunds', icon: '💳' },
                      { id: 'cancellations', title: 'Cancellations help', icon: '❌' }
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setActiveSupportSection(cat.id as any);
                          setExpandedHelpArticleId(null);
                        }}
                        className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all text-xs font-semibold ${
                          activeSupportSection === cat.id 
                            ? 'bg-rose-50 border-rose-200 text-rose-900 font-bold shadow-sm'
                            : 'bg-white border-slate-105 text-slate-650 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-lg">{cat.icon}</span>
                        <span>{cat.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Still Need Help Hotline panel */}
                <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm space-y-4">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">24/7 Call Center</span>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-extrabold text-sm text-slate-800 font-sans">Instant Support Hotline</h5>
                      <p className="text-[10px] text-slate-450 mt-0.5 leading-relaxed font-semibold">Prefer talking? Dial our regional helpline for immediate e-ticket modifications.</p>
                    </div>

                    <a
                      href="tel:01204567890"
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Simulating support call to toll-free number: 0120-456-7890. Active support queue time: < 1 minute.');
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-850 text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider shadow active:scale-95 transition-all text-center"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                      <span>0120 456 7890</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        alert('Simulating WhatsApp Chat connection... Opening secure chat desk. Chat ID: NIK-WA-8902');
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider shadow active:scale-95 transition-all text-center"
                    >
                      {/* WhatsApp Mini SVG */}
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.975 14.076.954 11.531.954c-5.43 0-9.855 4.37-9.859 9.801-.002 1.812.488 3.591 1.419 5.169l-.953 3.485 3.58-.921z" />
                      </svg>
                      <span>WhatsApp Support</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Right FAQ list center */}
              <div className="lg:col-span-8 bg-white p-5 md:p-8 rounded-[28px] border border-slate-100 shadow-sm space-y-6">
                
                {/* Search query input */}
                <div className="space-y-2">
                  <h4 className="text-sm font-black text-slate-800 tracking-tight font-sans">Popular Help Articles & FAQs</h4>
                  <p className="text-[10px] text-slate-400 font-bold leading-normal">Select a question to expand the answer details.</p>
                </div>

                {/* FAQ List */}
                <div className="space-y-3">
                  {[
                    {
                      id: 1,
                      cat: 'cancellations',
                      q: 'How to cancel or modify a booking?',
                      a: 'Step-by-step guide to cancel or change your booking: 1. Navigate to your "My Bookings" tab. 2. Select the active travel pass you wish to modify. 3. Click "Cancel Booking" or "Modify Seats". Refunds are computed based on individual operator timeline restrictions and parsed back to your Niklo Wallet Ledger instantly.'
                    },
                    {
                      id: 2,
                      cat: 'payments',
                      q: 'How do refunds work on cancel operations?',
                      a: 'All cancelled trip refunds are initiated immediately! Wallet refunds are available instantly for booking subsequent journeys. UPI, netbanking, or credit card refunds take 3-5 banking days to reflect back on your original statement automatically depending on regional banks.'
                    },
                    {
                      id: 3,
                      cat: 'bookings',
                      q: 'How to update my profile or secondary travel details?',
                      a: 'You can update your customized communications email, name, or passenger roster list inside the "My Profile" tab. If you prefer modifying the registered primary phone number, please invoke a chat session with our verification captain.'
                    },
                    {
                      id: 4,
                      cat: 'bookings',
                      q: 'Baggage safety policies & cabin limits?',
                      a: 'Standard baggage up to 15 kg is free on most SBSTC and Shyamoli premium Volvo buses. Passenger cabin luggage (handbags, laptop cases) can be kept internally. Outstation sedan and SUV cabs have spacious private luggage boots to safely store up to 3 bags.'
                    },
                    {
                      id: 5,
                      cat: 'all',
                      q: 'Traveling safely with Niklo features?',
                      a: 'Every ride booked on Niklo is integrated with real-time GPS coordinates syncing check. Emergency SOS options are available directly within active travel pass details, alerting regional support centers of any delays or security issues instantly.'
                    }
                  ].filter(item => {
                    if (activeSupportSection === 'all') return true;
                    return item.cat === activeSupportSection || item.cat === 'all';
                  }).map((faq) => (
                    <div 
                      key={faq.id}
                      onClick={() => setExpandedHelpArticleId(expandedHelpArticleId === faq.id ? null : faq.id)}
                      className="border border-slate-150 rounded-2xl overflow-hidden cursor-pointer hover:border-slate-350 transition-all font-sans"
                    >
                      <div className="bg-slate-50/50 p-4.5 flex justify-between items-center transition-colors hover:bg-slate-50">
                        <span className="font-extrabold text-xs md:text-sm text-slate-705 pr-2 flex items-center gap-2">
                          <span className="text-slate-400">❓</span>
                          <span>{faq.q}</span>
                        </span>
                        <ChevronRight className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${expandedHelpArticleId === faq.id ? 'rotate-90' : ''}`} />
                      </div>
                      
                      {expandedHelpArticleId === faq.id && (
                        <div className="p-4 bg-white text-xs md:text-sm text-slate-500 font-semibold leading-relaxed border-t border-slate-100 animate-slide-in">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Quick Help Articles widget */}
                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-120 text-xs font-semibold text-slate-500 space-y-2">
                  <strong className="text-slate-800 font-bold block">Need immediate dynamic assistance?</strong>
                  <p className="leading-relaxed">Our support executives are monitored by standard SLA guidelines, ensuring all ticketing disputes are finalized in less than 15 minutes.</p>
                </div>

              </div>

            </div>

            {/* Simulated Live Advisor Chat Overlay Panel */}
            {simulatedChatOpen && (
              <div 
                id="interactive-chat-modal"
                className="fixed bottom-6 right-6 z-50 w-full max-w-sm bg-white border border-slate-200 rounded-[30px] shadow-2xl flex flex-col overflow-hidden animate-slide-in h-[480px]"
              >
                {/* Chat header */}
                <div className="bg-rose-600 p-4 shrink-0 flex justify-between items-center text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                      👨‍✈️
                    </div>
                    <div>
                      <h5 className="font-extrabold text-sm leading-tight">Niklo Chat Assistant</h5>
                      <p className="text-[10px] text-rose-100 font-medium leading-none">Typical response time: Instant</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSimulatedChatOpen(false)}
                    className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold cursor-pointer text-sm"
                  >
                    ×
                  </button>
                </div>

                {/* Chat message logs */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 no-scrollbar">
                  {chatMessages.map((msg, index) => (
                    <div 
                      key={index}
                      className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                    >
                      <span className="text-[8.5px] text-slate-400 font-bold px-1 mb-0.5">{msg.time}</span>
                      <p className={`p-3 rounded-2xl text-xs font-semibold leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-rose-600 text-white rounded-br-none' 
                          : 'bg-white text-slate-755 border border-slate-150 rounded-bl-none shadow-sm'
                      }`}>
                        {msg.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chat footer input bar */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!chatInputMessage.trim()) return;
                    
                    const userMsg = chatInputMessage.trim();
                    const updatedMessages = [
                      ...chatMessages,
                      { sender: 'user' as const, text: userMsg, time: 'Just now' }
                    ];
                    
                    setChatMessages(updatedMessages);
                    setChatInputMessage('');

                    // Trigger delayed response
                    setTimeout(() => {
                      let agentText = "Thank you for sharing your concerns. I have checked your active registered credentials and escalated your query to our main regional operator desk. Is there anything else I can clarify?";
                      if (userMsg.toLowerCase().includes('cancel') || userMsg.toLowerCase().includes('refund')) {
                        agentText = "I see this is regarding refunds. Our system verifies cancel operations within minutes. The full sum is instantly processed as reusable credit on your 'My Wallet' panel. You can check the credit amount right away.";
                      } else if (userMsg.toLowerCase().includes('hotel') || userMsg.toLowerCase().includes('booking')) {
                        agentText = "Your booking passes are updated in real-time under 'My Bookings'. You can present the digital pass directly at boarding or check-in counters without needing any paper printouts.";
                      }

                      setChatMessages([
                        ...updatedMessages,
                        { sender: 'niklo', text: agentText, time: 'Just now' }
                      ]);
                    }, 1200);

                  }}
                  className="p-3 bg-white border-t border-slate-100 shrink-0 flex gap-2"
                >
                  <input 
                    type="text"
                    value={chatInputMessage}
                    onChange={(e) => setChatInputMessage(e.target.value)}
                    placeholder="Ask about cancellations, refunds..."
                    className="flex-1 bg-slate-50 border border-slate-200 focus:border-rose-400 focus:bg-white rounded-xl px-4 py-2 text-xs font-semibold outline-none text-slate-800"
                  />
                  <button 
                    type="submit"
                    className="bg-rose-600 hover:bg-rose-700 text-white px-4 rounded-xl text-xs font-extrabold shadow cursor-pointer text-center"
                  >
                    Send
                  </button>
                </form>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
