import React, { useState } from 'react';
import { 
  Home, Search, ShieldCheck, User, PlusCircle, Calendar, 
  Settings, CheckCircle2, AlertTriangle, Clock, FileText, 
  DollarSign, MapPin, Phone, Mail, Lock, LogOut, ChevronRight,
  Eye, Check, X, RefreshCw, AlertCircle, Building, Bed, Bath,
  Maximize2, Video, HelpCircle, ArrowRight, Filter, Share2
} from 'lucide-react';

// --- DEMONSTRATION DATA (Kampala & Wakiso) ---
const INITIAL_PROPERTIES = [
  {
    id: "EKF-KLA-00001",
    title: "Modern 2-Bedroom Self-Contained Apartment",
    category: "Apartment",
    district: "Kampala",
    municipality: "Kampala Central",
    neighbourhood: "Bukoto",
    zone: "Near Quality Supermarket",
    monthlyRent: 1200000,
    advanceMonths: 3,
    deposit: 1200000,
    otherCharges: 50000, // Garbage & Security
    totalInitialCost: 4850000,
    bedrooms: 2,
    bathrooms: 2,
    kitchen: "Open plan with cabinets",
    parking: "Available (Dedicated slot)",
    condition: "Newly Built / Excellent",
    availableDate: "Immediate",
    status: "approved", // pending verification, approved, available, reserved, occupied, rejected, suspended
    verification: {
      identity: true,
      ownership: true,
      inspection: true,
      media: true,
      terms: true,
      availability: true,
      inspectionDate: "2026-05-10",
      lastConfirmed: "2026-06-01",
      notes: "Verified boundary walls, water meter, and clean land title with owner Kakooza James."
    },
    subscription: {
      status: "active",
      fee: 50000,
      expiryDate: "2026-07-01",
      ref: "SUB-KLA-9921"
    },
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
    ],
    videoPlaceholder: "https://www.youtube.com/embed/sample_walkthrough",
    amenities: ["Water (NWSC)", "Prepaid Umeme", "Security Guard 24/7", "Perimeter Wall", "Wi-Fi Ready"],
    rules: {
      family: "Allowed",
      visitors: "Allowed with prior notice to security",
      pets: "Not allowed",
      noticePeriod: "2 Months",
      depositRefund: "Refunded within 14 days after inspection",
      rentIncrease: "Maximum 10% annual review after 12 months"
    },
    ownerName: "Kakooza James",
    ownerPhone: "+256 700 123456",
    isSample: true
  },
  {
    id: "EKF-WKS-00002",
    title: "Spacious 3-Bedroom Family Bungalow",
    category: "Bungalow",
    district: "Wakiso",
    municipality: "Kira Municipality",
    neighbourhood: "Namugongo",
    zone: "Jjeza Road",
    monthlyRent: 1800000,
    advanceMonths: 6,
    deposit: 1800000,
    otherCharges: 80000,
    totalInitialCost: 12680000,
    bedrooms: 3,
    bathrooms: 2,
    kitchen: "Spacious Kitchen with Pantry",
    parking: "Large compound (4 cars)",
    condition: "Good / Well Maintained",
    availableDate: "2026-06-15",
    status: "available",
    verification: {
      identity: true,
      ownership: true,
      inspection: true,
      media: true,
      terms: true,
      availability: true,
      inspectionDate: "2026-05-12",
      lastConfirmed: "2026-06-02",
      notes: "Caretaker authorization confirmed via signed LCI introduction letter."
    },
    subscription: {
      status: "active",
      fee: 50000,
      expiryDate: "2026-07-15",
      ref: "SUB-WKS-1044"
    },
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    ],
    videoPlaceholder: "https://www.youtube.com/embed/sample_walkthrough_2",
    amenities: ["Private Compound", "Water Tank", "Security Alarm", "Balcony"],
    rules: {
      family: "Strictly Family",
      visitors: "Allowed",
      pets: "Dogs allowed in outdoor kennel",
      noticePeriod: "60 Days",
      depositRefund: "Within 30 days",
      rentIncrease: "Reviewed every 2 years"
    },
    ownerName: "Namubiru Sarah (Caretaker: John)",
    ownerPhone: "+256 772 987654",
    isSample: true
  },
  {
    id: "EKF-KLA-00003",
    title: "Affordable Single Self-Contained Studio",
    category: "Single self-contained",
    district: "Kampala",
    municipality: "Nakawa Division",
    neighbourhood: "Ntinda",
    zone: "Minister's Village",
    monthlyRent: 450000,
    advanceMonths: 3,
    deposit: 450000,
    otherCharges: 20000,
    totalInitialCost: 1820000,
    bedrooms: 1,
    bathrooms: 1,
    kitchen: "Kitchenette",
    parking: "Shared parking space",
    condition: "Good",
    availableDate: "Immediate",
    status: "pending verification",
    verification: {
      identity: false,
      ownership: false,
      inspection: false,
      media: false,
      terms: false,
      availability: false,
      inspectionDate: "Pending",
      lastConfirmed: "2026-06-05",
      notes: "Awaiting physical administrator inspection scheduled for tomorrow."
    },
    subscription: {
      status: "pending payment",
      fee: 50000,
      expiryDate: "N/A",
      ref: "PENDING"
    },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
    ],
    videoPlaceholder: "",
    amenities: ["Water Included in rent", "Prepaid Electricity", "Gate Security"],
    rules: {
      family: "Single or couple",
      visitors: "No overnight visitors without notice",
      pets: "Not allowed",
      noticePeriod: "1 Month",
      depositRefund: "Immediate after utility clearance",
      rentIncrease: "Annual review"
    },
    ownerName: "Mwesigwa Paul",
    ownerPhone: "+256 752 333444",
    isSample: true
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // home, browse, details, auth, submit, viewing, admin, owner
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchDistrict, setSearchDistrict] = useState('All');
  const [searchCategory, setSearchCategory] = useState('All');
  const [searchMaxBudget, setSearchMaxBudget] = useState('3000000');
  
  // Dashboard & Application states
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);
  const [viewingRequests, setViewingRequests] = useState([
    {
      id: "REQ-001",
      propertyId: "EKF-KLA-00001",
      propertyTitle: "Modern 2-Bedroom Self-Contained Apartment",
      tenantName: "Babirye Grace",
      phone: "+256 782 555666",
      date: "2026-06-10",
      time: "10:00 AM",
      attendees: 2,
      message: "I would like to view this property with my spouse.",
      status: "New Request", // New Request, Contacting Owner, Awaiting Owner Confirmation, Viewing Confirmed, Rescheduled, Completed, Cancelled, Unsuccessful
      history: [{ timestamp: "2026-06-05 09:30", note: "Viewing request submitted by tenant." }]
    }
  ]);

  const [subscriptions, setSubscriptions] = useState([
    {
      propertyId: "EKF-KLA-00001",
      title: "Modern 2-Bedroom Self-Contained Apartment",
      owner: "Kakooza James",
      fee: 50000,
      paymentRef: "MM-UG-2026-881",
      paymentDate: "2026-06-01",
      status: "active" // pending payment, active, expired, suspended
    },
    {
      propertyId: "EKF-WKS-00002",
      title: "Spacious 3-Bedroom Family Bungalow",
      owner: "Namubiru Sarah",
      fee: 50000,
      paymentRef: "MM-UG-2026-902",
      paymentDate: "2026-06-01",
      status: "active"
    },
    {
      propertyId: "EKF-KLA-00003",
      title: "Affordable Single Self-Contained Studio",
      owner: "Mwesigwa Paul",
      fee: 50000,
      paymentRef: "",
      paymentDate: "",
      status: "pending payment"
    }
  ]);

  const [complaints, setComplaints] = useState([
    {
      id: "CMP-01",
      propertyId: "EKF-KLA-00001",
      tenant: "Tumusiime Ronald",
      issue: "Discrepancy in water bill arrangement mentioned during viewing.",
      status: "Under Investigation",
      date: "2026-06-04"
    }
  ]);

  const [currentUserRole, setCurrentUserRole] = useState('guest'); // guest, owner, admin

  // Helper currency formatter
  const formatUGX = (amount) => {
    return "UGX " + Number(amount).toLocaleString();
  };

  const navigateTo = (page, property = null) => {
    if (property) setSelectedProperty(property);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- NAVIGATION BAR ---
  const renderNavbar = () => (
    <header className="bg-forest text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigateTo('home')}>
          <div className="bg-white text-forest p-2 rounded-xl font-bold text-xl flex items-center justify-center shadow">
            🏠
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">EkifoLink</h1>
            <p className="text-xs text-forest-muted tracking-wide font-medium">Kampala & Wakiso Verified Rentals</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <button onClick={() => navigateTo('home')} className={`hover:text-forest-muted transition ${currentPage === 'home' ? 'border-b-2 border-white pb-1' : ''}`}>
            Home
          </button>
          <button onClick={() => navigateTo('browse')} className={`hover:text-forest-muted transition ${currentPage === 'browse' ? 'border-b-2 border-white pb-1' : ''}`}>
            Browse Properties
          </button>
          <button onClick={() => navigateTo('submit')} className={`hover:text-forest-muted transition ${currentPage === 'submit' ? 'border-b-2 border-white pb-1' : ''}`}>
            List Property
          </button>
          <button onClick={() => navigateTo('viewing')} className={`hover:text-forest-muted transition ${currentPage === 'viewing' ? 'border-b-2 border-white pb-1' : ''}`}>
            Request Viewing
          </button>
        </nav>

        <div className="flex items-center space-x-3">
          {currentUserRole === 'guest' && (
            <button 
              onClick={() => navigateTo('auth')}
              className="bg-white text-forest px-4 py-2 rounded-lg font-bold text-sm hover:bg-forest-muted transition shadow-sm flex items-center space-x-2"
            >
              <User size={16} />
              <span>Owner / Admin Login</span>
            </button>
          )}

          {currentUserRole === 'owner' && (
            <div className="flex items-center space-x-2">
              <button onClick={() => navigateTo('owner')} className="bg-forest-light px-3 py-2 rounded-lg text-sm font-semibold border border-forest-light hover:bg-forest-dark transition">
                Owner Dashboard
              </button>
              <button onClick={() => { setCurrentUserRole('guest'); navigateTo('home'); }} className="text-xs bg-charcoal-light px-2 py-2 rounded text-white hover:bg-red-700 transition">
                Logout
              </button>
            </div>
          )}

          {currentUserRole === 'admin' && (
            <div className="flex items-center space-x-2">
              <button onClick={() => navigateTo('admin')} className="bg-amber-600 text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-amber-700 transition shadow">
                Admin Workspace
              </button>
              <button onClick={() => { setCurrentUserRole('guest'); navigateTo('home'); }} className="text-xs bg-charcoal-light px-2 py-2 rounded text-white hover:bg-red-700 transition">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );

  // --- FOOTER ---
  const renderFooter = () => (
    <footer className="bg-charcoal text-white pt-12 pb-8 border-t border-charcoal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-2xl">🏠</span>
            <span className="text-xl font-bold">EkifoLink</span>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Kampala and Wakiso's premier verified property rental marketplace. Direct connections through managed viewings and physical inspection.
          </p>
          <div className="text-xs bg-forest-dark text-forest-muted p-2 rounded border border-forest">
            🔒 Prototype Demo Version. All sample data is clearly labelled. No real payments or automated verification are active yet.
          </div>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-forest-muted">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><button onClick={() => navigateTo('home')} className="hover:text-white">Home</button></li>
            <li><button onClick={() => navigateTo('browse')} className="hover:text-white">Browse All Properties</button></li>
            <li><button onClick={() => navigateTo('submit')} className="hover:text-white">List Your Property</button></li>
            <li><button onClick={() => navigateTo('viewing')} className="hover:text-white">Book a Viewing</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-forest-muted">Districts Covered</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Kampala Central, Nakawa, Kawempe</li>
            <li>Makindye, Rubaga</li>
            <li>Wakiso (Kira, Najjera, Namugongo)</li>
            <li>Entebbe Municipality, Wakiso Town</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-forest-muted">Trust & Safety</h4>
          <p className="text-xs text-gray-400 mb-3">
            Our administrators personally inspect every listed home and coordinate viewings directly. Avoid rental fraud.
          </p>
          <button onClick={() => navigateTo('auth')} className="text-xs bg-forest text-white px-3 py-2 rounded font-semibold hover:bg-forest-light transition w-full">
            Owner & Administrator Portal
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-charcoal-light text-center text-xs text-gray-500">
        © 2026 EkifoLink Property Rental Marketplace. All rights reserved. Built for Kampala & Wakiso, Uganda.
      </div>
    </footer>
  );

  // ==========================================
  // 1. HOMEPAGE
  // ==========================================
  const renderHomePage = () => (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-forest to-forest-dark text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="bg-forest-light text-forest-muted text-xs uppercase px-3 py-1 rounded-full font-bold tracking-wider inline-block mb-4 border border-forest-muted">
            Kampala & Wakiso Verified Rentals
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
            Find Verified Rental Homes Without Fraud or Stress
          </h1>
          <p className="text-lg text-forest-muted mb-8 max-w-2xl mx-auto">
            Direct connections with verified property owners and authorised caretakers through our managed viewing-request process.
          </p>

          {/* Prominent Property Search Widget */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-2xl text-charcoal max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
            <div className="text-left">
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">District / Location</label>
              <select 
                value={searchDistrict}
                onChange={(e) => setSearchDistrict(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm font-medium focus:ring-2 focus:ring-forest"
              >
                <option value="All">Kampala & Wakiso (All)</option>
                <option value="Kampala">Kampala District</option>
                <option value="Wakiso">Wakiso District</option>
              </select>
            </div>

            <div className="text-left">
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Property Type</label>
              <select 
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm font-medium focus:ring-2 focus:ring-forest"
              >
                <option value="All">All Property Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Bungalow">Bungalow</option>
                <option value="Single self-contained">Single Self-Contained</option>
                <option value="Family house">Family House</option>
                <option value="Studio">Studio</option>
              </select>
            </div>

            <div className="text-left">
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Max Budget (UGX)</label>
              <select 
                value={searchMaxBudget}
                onChange={(e) => setSearchMaxBudget(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm font-medium focus:ring-2 focus:ring-forest"
              >
                <option value="500000">Up to UGX 500k</option>
                <option value="1000000">Up to UGX 1M</option>
                <option value="2000000">Up to UGX 2M</option>
                <option value="5000000">Up to UGX 5M+</option>
              </select>
            </div>

            <div className="flex items-end">
              <button 
                onClick={() => navigateTo('browse')}
                className="w-full bg-forest text-white py-3 rounded-lg font-bold hover:bg-forest-light transition flex items-center justify-center space-x-2 shadow-lg"
              >
                <Search size={18} />
                <span>Search Homes</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Standard Highlights */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-charcoal">The EkifoLink Trust Standard</h2>
            <p className="text-sm text-gray-600 mt-1">Why tenants and landlords in Kampala & Wakiso trust our platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-forest-muted/40 p-6 rounded-xl border border-forest/20">
              <div className="bg-forest text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold mb-4 text-lg">🛡️</div>
              <h3 className="font-bold text-lg mb-2 text-forest-dark">1. Physical Verification</h3>
              <p className="text-sm text-gray-600">
                Administrators personally inspect properties, review land ownership documents or caretaker authorization, and confirm physical boundaries.
              </p>
            </div>

            <div className="bg-forest-muted/40 p-6 rounded-xl border border-forest/20">
              <div className="bg-forest text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold mb-4 text-lg">💰</div>
              <h3 className="font-bold text-lg mb-2 text-forest-dark">2. Transparent Cost Breakdowns</h3>
              <p className="text-sm text-gray-600">
                No hidden fees. We automatically calculate monthly rent, advance payments, security deposits, and total move-in costs upfront.
              </p>
            </div>

            <div className="bg-forest-muted/40 p-6 rounded-xl border border-forest/20">
              <div className="bg-forest text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold mb-4 text-lg">🤝</div>
              <h3 className="font-bold text-lg mb-2 text-forest-dark">3. Centrally Coordinated Viewings</h3>
              <p className="text-sm text-gray-600">
                Safe and organized viewing appointments scheduled and coordinated directly through our administrator team without exposing private numbers prematurely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded font-bold uppercase tracking-wide">
              Demonstration Data
            </span>
            <h2 className="text-2xl font-black text-charcoal mt-2">Featured Properties in Kampala & Wakiso</h2>
          </div>
          <button 
            onClick={() => navigateTo('browse')}
            className="text-forest font-bold text-sm hover:underline flex items-center space-x-1"
          >
            <span>View All Properties</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((prop) => (
            <div key={prop.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition flex flex-col justify-between">
              <div>
                <div className="relative h-48 bg-gray-200">
                  <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-forest text-white text-xs font-bold px-2.5 py-1 rounded shadow">
                    {prop.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-charcoal text-xs font-bold px-2 py-1 rounded">
                    {prop.id}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center text-xs text-gray-500 mb-1 space-x-1">
                    <MapPin size={14} className="text-forest" />
                    <span>{prop.neighbourhood}, {prop.municipality}, {prop.district}</span>
                  </div>

                  <h3 className="font-bold text-lg text-charcoal mb-2 line-clamp-1">{prop.title}</h3>

                  <div className="flex items-center space-x-4 text-xs text-gray-600 mb-4">
                    <span className="flex items-center space-x-1"><Bed size={14} /><span>{prop.bedrooms} Bed</span></span>
                    <span className="flex items-center space-x-1"><Bath size={14} /><span>{prop.bathrooms} Bath</span></span>
                    <span className="flex items-center space-x-1"><Maximize2 size={14} /><span>{prop.parking}</span></span>
                  </div>

                  <div className="border-t pt-3 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Monthly Rent</p>
                      <p className="text-lg font-black text-forest">{formatUGX(prop.monthlyRent)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Initial Cost</p>
                      <p className="text-xs font-bold text-charcoal">{formatUGX(prop.totalInitialCost)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button 
                  onClick={() => navigateTo('details', prop)}
                  className="w-full bg-forest text-white py-2.5 rounded-lg font-bold text-sm hover:bg-forest-light transition flex items-center justify-center space-x-2"
                >
                  <Eye size={16} />
                  <span>View Truth Card & Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  // ==========================================
  // 2. BROWSE PROPERTIES PAGE
  // ==========================================
  const renderBrowsePage = () => {
    const filteredProperties = properties.filter(p => {
      if (searchDistrict !== 'All' && p.district !== searchDistrict) return false;
      if (searchCategory !== 'All' && p.category !== searchCategory) return false;
      if (p.monthlyRent > Number(searchMaxBudget)) return false;
      return true;
    });

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-charcoal">Browse Verified Rentals</h1>
          <p className="text-sm text-gray-600">Showing available homes in Kampala and Wakiso districts with transparent cost breakdowns.</p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border mb-8 grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">District</label>
            <select 
              value={searchDistrict} 
              onChange={(e) => setSearchDistrict(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm"
            >
              <option value="All">Kampala & Wakiso (All)</option>
              <option value="Kampala">Kampala</option>
              <option value="Wakiso">Wakiso</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Property Category</label>
            <select 
              value={searchCategory} 
              onChange={(e) => setSearchCategory(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm"
            >
              <option value="All">All Categories</option>
              <option value="Apartment">Apartment</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Single self-contained">Single Self-Contained</option>
              <option value="Family house">Family House</option>
              <option value="Studio">Studio</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Max Budget (UGX)</label>
            <select 
              value={searchMaxBudget} 
              onChange={(e) => setSearchMaxBudget(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm"
            >
              <option value="500000">Up to UGX 500,000</option>
              <option value="1000000">Up to UGX 1,000,000</option>
              <option value="2000000">Up to UGX 2,000,000</option>
              <option value="5000000">Up to UGX 5,000,000+</option>
            </select>
          </div>

          <div className="flex items-end">
            <button 
              onClick={() => { setSearchDistrict('All'); setSearchCategory('All'); setSearchMaxBudget('3000000'); }}
              className="w-full bg-gray-100 hover:bg-gray-200 text-charcoal font-bold text-sm py-2.5 rounded-lg transition"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Results Count & Grid */}
        <div className="mb-4 text-sm font-semibold text-gray-600">
          Found {filteredProperties.length} properties matching your criteria
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProperties.map(prop => (
            <div key={prop.id} className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition flex flex-col justify-between">
              <div>
                <div className="relative h-48 bg-gray-200">
                  <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-forest text-white text-xs font-bold px-2.5 py-1 rounded shadow">
                    {prop.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-charcoal text-xs font-bold px-2 py-1 rounded">
                    {prop.id}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center text-xs text-gray-500 mb-1 space-x-1">
                    <MapPin size={14} className="text-forest" />
                    <span>{prop.neighbourhood}, {prop.municipality}, {prop.district}</span>
                  </div>

                  <h3 className="font-bold text-lg text-charcoal mb-2 line-clamp-1">{prop.title}</h3>

                  <div className="flex items-center space-x-4 text-xs text-gray-600 mb-4">
                    <span className="flex items-center space-x-1"><Bed size={14} /><span>{prop.bedrooms} Bed</span></span>
                    <span className="flex items-center space-x-1"><Bath size={14} /><span>{prop.bathrooms} Bath</span></span>
                    <span className="flex items-center space-x-1"><Maximize2 size={14} /><span>{prop.parking}</span></span>
                  </div>

                  <div className="border-t pt-3 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Monthly Rent</p>
                      <p className="text-lg font-black text-forest">{formatUGX(prop.monthlyRent)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Initial Cost</p>
                      <p className="text-xs font-bold text-charcoal">{formatUGX(prop.totalInitialCost)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button 
                  onClick={() => navigateTo('details', prop)}
                  className="w-full bg-forest text-white py-2.5 rounded-lg font-bold text-sm hover:bg-forest-light transition flex items-center justify-center space-x-2"
                >
                  <Eye size={16} />
                  <span>View Truth Card & Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ==========================================
  // 3. INDIVIDUAL PROPERTY DETAILS & TRUTH CARD
  // ==========================================
  const renderDetailsPage = () => {
    if (!selectedProperty) return navigateTo('browse');
    const p = selectedProperty;

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigateTo('browse')} className="text-xs text-forest font-bold mb-4 flex items-center space-x-1 hover:underline">
          <span>← Back to Properties</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Photos, Truth Card, Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-forest text-white text-xs font-bold px-3 py-1 rounded">{p.id}</span>
                <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-1 rounded">Demonstration Listing</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-charcoal mb-2">{p.title}</h1>
              <p className="text-sm text-gray-600 mb-4 flex items-center space-x-1">
                <MapPin size={16} className="text-forest" />
                <span>{p.neighbourhood}, {p.municipality}, {p.district} ({p.zone})</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {p.images.map((img, idx) => (
                  <img key={idx} src={img} alt="Property view" className="w-full h-64 object-cover rounded-lg border shadow-sm" />
                ))}
              </div>

              {/* Walkthrough Video Placeholder */}
              <div className="bg-charcoal text-white p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Video size={24} className="text-forest-muted" />
                  <div>
                    <h4 className="font-bold text-sm">Walkthrough Video Available</h4>
                    <p className="text-xs text-gray-400">Recorded during physical inspection by EkifoLink Admin</p>
                  </div>
                </div>
                <button className="bg-forest text-white text-xs font-bold px-4 py-2 rounded hover:bg-forest-light transition">
                  Play Video
                </button>
              </div>
            </div>

            {/* EKIFOLINK TRUST STANDARD TRUTH CARD */}
            <div className="bg-white rounded-xl shadow-md border-2 border-forest p-6">
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <ShieldCheck size={28} className="text-forest" />
                  <div>
                    <h3 className="font-black text-lg text-forest-dark">EkifoLink Trust Standard Truth Card</h3>
                    <p className="text-xs text-gray-500">Physical verification & transparent cost audit</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                    {p.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                <div className="bg-gray-50 p-3 rounded-lg border">
                  <p className="text-xs text-gray-500 font-bold uppercase">Inspection Date</p>
                  <p className="font-bold text-charcoal">{p.verification.inspectionDate}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border">
                  <p className="text-xs text-gray-500 font-bold uppercase">Last Availability Confirmation</p>
                  <p className="font-bold text-charcoal">{p.verification.lastConfirmed}</p>
                </div>
              </div>

              <h4 className="font-bold text-sm mb-3 uppercase text-gray-700">Verification Checks Completed:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6 text-xs font-medium">
                <div className={`p-2 rounded flex items-center space-x-2 ${p.verification.identity ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-gray-100 text-gray-500'}`}>
                  <span>{p.verification.identity ? '✅' : '⏳'}</span><span>Owner Identity</span>
                </div>
                <div className={`p-2 rounded flex items-center space-x-2 ${p.verification.ownership ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-gray-100 text-gray-500'}`}>
                  <span>{p.verification.ownership ? '✅' : '⏳'}</span><span>Ownership / Authority</span>
                </div>
                <div className={`p-2 rounded flex items-center space-x-2 ${p.verification.inspection ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-gray-100 text-gray-500'}`}>
                  <span>{p.verification.inspection ? '✅' : '⏳'}</span><span>Physical Inspection</span>
                </div>
                <div className={`p-2 rounded flex items-center space-x-2 ${p.verification.media ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-gray-100 text-gray-500'}`}>
                  <span>{p.verification.media ? '✅' : '⏳'}</span><span>Photos & Video</span>
                </div>
                <div className={`p-2 rounded flex items-center space-x-2 ${p.verification.terms ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-gray-100 text-gray-500'}`}>
                  <span>{p.verification.terms ? '✅' : '⏳'}</span><span>Rental Terms</span>
                </div>
                <div className={`p-2 rounded flex items-center space-x-2 ${p.verification.availability ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-gray-100 text-gray-500'}`}>
                  <span>{p.verification.availability ? '✅' : '⏳'}</span><span>Availability Active</span>
                </div>
              </div>

              <div className="bg-forest-muted p-4 rounded-lg text-xs text-forest-dark font-medium border border-forest/20">
                <strong>Inspector Notes:</strong> {p.verification.notes}
              </div>
            </div>

            {/* Property Details & Costs */}
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
              <h3 className="font-bold text-lg text-charcoal border-b pb-3">Financial Cost Breakdown</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div className="bg-gray-50 p-3 rounded border">
                  <p className="text-xs text-gray-500">Monthly Rent</p>
                  <p className="font-black text-forest">{formatUGX(p.monthlyRent)}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded border">
                  <p className="text-xs text-gray-500">Advance Required</p>
                  <p className="font-bold text-charcoal">{p.advanceMonths} Months</p>
                </div>
                <div className="bg-gray-50 p-3 rounded border">
                  <p className="text-xs text-gray-500">Security Deposit</p>
                  <p className="font-bold text-charcoal">{formatUGX(p.deposit)}</p>
                </div>
                <div className="bg-forest text-white p-3 rounded shadow">
                  <p className="text-xs text-forest-muted uppercase font-bold">Total Initial Cost</p>
                  <p className="font-black text-lg">{formatUGX(p.totalInitialCost)}</p>
                </div>
              </div>

              <h3 className="font-bold text-lg text-charcoal border-b pb-3 pt-4">Amenities & Utilities</h3>
              <div className="flex flex-wrap gap-2">
                {p.amenities.map((am, i) => (
                  <span key={i} className="bg-forest-muted text-forest-dark text-xs font-semibold px-3 py-1.5 rounded-lg border border-forest/20">
                    {am}
                  </span>
                ))}
              </div>

              <h3 className="font-bold text-lg text-charcoal border-b pb-3 pt-4">Owner Rental Rules & Policies</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-gray-50 rounded border"><strong>Tenant Type:</strong> {p.rules.family}</div>
                <div className="p-3 bg-gray-50 rounded border"><strong>Visitors Policy:</strong> {p.rules.visitors}</div>
                <div className="p-3 bg-gray-50 rounded border"><strong>Pets:</strong> {p.rules.pets}</div>
                <div className="p-3 bg-gray-50 rounded border"><strong>Notice Period:</strong> {p.rules.noticePeriod}</div>
                <div className="p-3 bg-gray-50 rounded border"><strong>Deposit Refund:</strong> {p.rules.depositRefund}</div>
                <div className="p-3 bg-gray-50 rounded border"><strong>Rent Increase Policy:</strong> {p.rules.rentIncrease}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Viewing Request CTA Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border-2 border-forest p-6 sticky top-28">
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded uppercase">
                Managed Viewing
              </span>
              <h3 className="text-xl font-black text-charcoal mt-2 mb-1">Request a Property Viewing</h3>
              <p className="text-xs text-gray-600 mb-6">
                Our administrator will coordinate with the verified owner or caretaker and schedule your safe appointment. No direct numbers are shared prematurely.
              </p>

              <button 
                onClick={() => navigateTo('viewing')}
                className="w-full bg-forest text-white py-3 rounded-xl font-bold hover:bg-forest-light transition shadow-lg flex items-center justify-center space-x-2 mb-4"
              >
                <Calendar size={18} />
                <span>Book Viewing for {p.id}</span>
              </button>

              <div className="border-t pt-4 space-y-2 text-xs text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={14} className="text-forest" />
                  <span>100% Free search & viewing requests</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={14} className="text-forest" />
                  <span>Inspected property guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // 4. OWNER / CARETAKER REGISTRATION & LOGIN
  // ==========================================
  const renderAuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (role) => {
      setCurrentUserRole(role);
      if (role === 'admin') navigateTo('admin');
      else navigateTo('owner');
    };

    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl border p-8">
          <div className="text-center mb-6">
            <div className="bg-forest text-white w-12 h-12 rounded-xl mx-auto flex items-center justify-center font-bold text-2xl mb-2">
              🔐
            </div>
            <h2 className="text-2xl font-black text-charcoal">Owner & Admin Portal</h2>
            <p className="text-xs text-gray-500 mt-1">Select demo role access for this prototype</p>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@ekifolink.ug" 
                className="w-full border rounded-lg p-3 text-sm" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full border rounded-lg p-3 text-sm" 
              />
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => handleLogin('owner')}
              className="w-full bg-forest text-white py-3 rounded-lg font-bold text-sm hover:bg-forest-light transition shadow"
            >
              Login as Property Owner
            </button>
            <button 
              onClick={() => handleLogin('admin')}
              className="w-full bg-amber-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-amber-700 transition shadow"
            >
              Login as Platform Administrator
            </button>
          </div>

          <div className="mt-6 pt-6 border-t text-center text-xs text-gray-500">
            Note: Authentication is simulated in this frontend prototype. No real database check is performed.
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // 5. PROPERTY SUBMISSION FORM (Multi-Section)
  // ==========================================
  const renderSubmitPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      title: "",
      category: "Apartment",
      condition: "Newly Built",
      bedrooms: 2,
      bathrooms: 2,
      kitchen: "Standard",
      parking: "Dedicated space",
      availableDate: "Immediate",
      monthlyRent: 1000000,
      advanceMonths: 3,
      deposit: 1000000,
      otherCharges: 40000,
      district: "Kampala",
      municipality: "Nakawa",
      neighbourhood: "Ntinda",
      zone: "Stage 2",
      landmark: "Near Total Station",
      ownerName: "",
      ownerPhone: "",
      role: "Owner",
      declaration: false
    });

    const [submittedSuccess, setSubmittedSuccess] = useState(false);

    const calculatedTotal = (Number(formData.monthlyRent) * Number(formData.advanceMonths)) + Number(formData.deposit) + Number(formData.otherCharges);

    const handleSubmitListing = (e) => {
      e.preventDefault();
      const newProp = {
        id: `EKF-${formData.district === 'Kampala' ? 'KLA' : 'WKS'}-0000${properties.length + 1}`,
        ...formData,
        totalInitialCost: calculatedTotal,
        status: "pending verification",
        verification: {
          identity: false,
          ownership: false,
          inspection: false,
          media: false,
          terms: false,
          availability: false,
          inspectionDate: "Pending",
          lastConfirmed: "2026-06-05",
          notes: "Newly submitted property. Awaiting administrator verification."
        },
        subscription: {
          status: "pending payment",
          fee: 50000,
          expiryDate: "N/A",
          ref: "PENDING"
        },
        images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"],
        videoPlaceholder: "",
        amenities: ["Water", "Electricity", "Security"],
        rules: {
          family: "All families welcome",
          visitors: "Allowed",
          pets: "Check with owner",
          noticePeriod: "1 Month",
          depositRefund: "14 days",
          rentIncrease: "Standard annual"
        },
        isSample: false
      };

      setProperties([newProp, ...properties]);
      setSubmittedSuccess(true);
    };

    if (submittedSuccess) {
      return (
        <div className="max-w-xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl shadow-xl border p-8">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl mb-4 font-bold">
              ✓
            </div>
            <h2 className="text-2xl font-black text-charcoal mb-2">Property Submitted Successfully!</h2>
            <p className="text-sm text-gray-600 mb-6">
              Your listing has been recorded and marked as <span className="font-bold text-amber-600">Pending Verification</span>. It will not appear publicly until our administrator inspects the property and verifies your documents.
            </p>
            <div className="flex space-x-4">
              <button onClick={() => { setSubmittedSuccess(false); setStep(1); }} className="flex-1 bg-gray-100 text-charcoal font-bold py-3 rounded-lg text-sm">
                Submit Another
              </button>
              <button onClick={() => navigateTo('home')} className="flex-1 bg-forest text-white font-bold py-3 rounded-lg text-sm">
                Return Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <span className="bg-forest-muted text-forest text-xs font-bold px-2.5 py-1 rounded">EkifoLink Listing Wizard</span>
          <h1 className="text-3xl font-black text-charcoal mt-2">Submit Property for Verification</h1>
          <p className="text-sm text-gray-600">Complete all sections accurately. Properties are verified before public publication.</p>
        </div>

        <form onSubmit={handleSubmitListing} className="bg-white rounded-2xl shadow-lg border p-6 sm:p-8 space-y-8">
          
          {/* SECTION 1: PROPERTY IDENTITY */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-forest-dark border-b pb-2 flex items-center space-x-2">
              <span>1. Property Identity & Details</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Listing Title</label>
              <input 
                type="text" 
                required
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g., Modern 2-Bedroom Self-Contained Apartment in Bukoto" 
                className="w-full border rounded-lg p-3 text-sm" 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Property Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full border rounded-lg p-3 text-sm"
                >
                  <option value="Single room">Single Room</option>
                  <option value="Single self-contained">Single Self-Contained</option>
                  <option value="Double self-contained">Double Self-Contained</option>
                  <option value="Studio">Studio</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Bungalow">Bungalow</option>
                  <option value="Family house">Family House</option>
                  <option value="Shop">Shop</option>
                  <option value="Office">Office</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Condition</label>
                <select 
                  value={formData.condition}
                  onChange={(e) => setFormData({...formData, condition: e.target.value})}
                  className="w-full border rounded-lg p-3 text-sm"
                >
                  <option value="Newly Built">Newly Built</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Requires Minor Paint">Requires Minor Paint</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Bedrooms</label>
                <input type="number" min="0" value={formData.bedrooms} onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Bathrooms</label>
                <input type="number" min="1" value={formData.bathrooms} onChange={(e) => setFormData({...formData, bathrooms: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Kitchen</label>
                <input type="text" value={formData.kitchen} onChange={(e) => setFormData({...formData, kitchen: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Parking</label>
                <input type="text" value={formData.parking} onChange={(e) => setFormData({...formData, parking: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm" />
              </div>
            </div>
          </div>

          {/* SECTION 2: FINANCIAL DETAILS */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-bold text-lg text-forest-dark border-b pb-2">
              2. Financial Details & Automatic Move-In Calculation
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Monthly Rent (UGX)</label>
                <input type="number" value={formData.monthlyRent} onChange={(e) => setFormData({...formData, monthlyRent: e.target.value})} className="w-full border rounded-lg p-3 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Advance Months Required</label>
                <input type="number" min="1" max="12" value={formData.advanceMonths} onChange={(e) => setFormData({...formData, advanceMonths: e.target.value})} className="w-full border rounded-lg p-3 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Security Deposit (UGX)</label>
                <input type="number" value={formData.deposit} onChange={(e) => setFormData({...formData, deposit: e.target.value})} className="w-full border rounded-lg p-3 text-sm" />
              </div>
            </div>

            <div className="bg-forest-muted p-4 rounded-xl border border-forest/20 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-600 font-bold uppercase">Calculated Total Move-In Cost</p>
                <p className="text-xs text-gray-500">(Monthly Rent × Advance) + Deposit + Other Charges</p>
              </div>
              <div className="text-xl font-black text-forest">
                {formatUGX(calculatedTotal)}
              </div>
            </div>
          </div>

          {/* SECTION 3: LOCATION */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-bold text-lg text-forest-dark border-b pb-2">3. Location Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">District</label>
                <select value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})} className="w-full border rounded-lg p-3 text-sm">
                  <option value="Kampala">Kampala</option>
                  <option value="Wakiso">Wakiso</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Municipality / Division</label>
                <input type="text" value={formData.municipality} onChange={(e) => setFormData({...formData, municipality: e.target.value})} className="w-full border rounded-lg p-3 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Neighbourhood</label>
                <input type="text" value={formData.neighbourhood} onChange={(e) => setFormData({...formData, neighbourhood: e.target.value})} className="w-full border rounded-lg p-3 text-sm" />
              </div>
            </div>
          </div>

          {/* SECTION 4: PHOTOS & VIDEO */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-bold text-lg text-forest-dark border-b pb-2">4. Photos & Walkthrough Video</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50">
              <p className="text-sm font-bold text-charcoal mb-1">Upload Property Photos & Walkthrough Video</p>
              <p className="text-xs text-gray-500 mb-4">Minimum 4 photographs required (Living room, bedroom, kitchen, bathroom). Video placeholder below.</p>
              <input type="file" multiple className="text-xs" />
            </div>
          </div>

          {/* SECTION 5: OWNER / CARETAKER INFO */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-bold text-lg text-forest-dark border-b pb-2">5. Owner or Authorised Caretaker Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Full Name</label>
                <input type="text" required value={formData.ownerName} onChange={(e) => setFormData({...formData, ownerName: e.target.value})} placeholder="Kakooza James" className="w-full border rounded-lg p-3 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Telephone Number</label>
                <input type="tel" required value={formData.ownerPhone} onChange={(e) => setFormData({...formData, ownerPhone: e.target.value})} placeholder="+256 700 000000" className="w-full border rounded-lg p-3 text-sm" />
              </div>
            </div>
            <div className="bg-amber-50 text-amber-900 text-xs p-3 rounded border border-amber-200">
              🔒 <strong>Privacy Assurance:</strong> Identity verification documents and ownership proof are strictly private and never displayed publicly.
            </div>
          </div>

          {/* SECTION 6: DECLARATION */}
          <div className="space-y-4 pt-4 border-t">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" required checked={formData.declaration} onChange={(e) => setFormData({...formData, declaration: e.target.checked})} className="mt-1" />
              <span className="text-xs text-gray-700">
                <strong>Declaration:</strong> I confirm that the information provided is accurate and truthful, and that I have legal authority or authorised caretaker status to list this property on EkifoLink.
              </span>
            </label>

            <button 
              type="submit"
              className="w-full bg-forest text-white py-4 rounded-xl font-bold hover:bg-forest-light transition shadow-lg text-base"
            >
              Submit Property for Verification
            </button>
          </div>

        </form>
      </div>
    );
  };

  // ==========================================
  // 6. TENANT VIEWING REQUEST FORM
  // ==========================================
  const renderViewingPage = () => {
    const [viewingForm, setViewingForm] = useState({
      propertyId: properties[0]?.id || "EKF-KLA-00001",
      name: "",
      phone: "",
      date: "",
      time: "10:00 AM",
      attendees: 1,
      message: ""
    });
    const [success, setSuccess] = useState(false);

    const handleSubmitViewing = (e) => {
      e.preventDefault();
      const newReq = {
        id: `REQ-00${viewingRequests.length + 1}`,
        propertyId: viewingForm.propertyId,
        propertyTitle: properties.find(p => p.id === viewingForm.propertyId)?.title || "Selected Property",
        tenantName: viewingForm.name,
        phone: viewingForm.phone,
        date: viewingForm.date,
        time: viewingForm.time,
        attendees: viewingForm.attendees,
        message: viewingForm.message,
        status: "New Request",
        history: [{ timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '), note: "Viewing request submitted by tenant." }]
      };
      setViewingRequests([newReq, ...viewingRequests]);
      setSuccess(true);
    };

    if (success) {
      return (
        <div className="max-w-xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl shadow-xl border p-8">
            <div className="w-16 h-16 bg-forest text-white rounded-full flex items-center justify-center mx-auto text-3xl mb-4 font-bold">
              ✓
            </div>
            <h2 className="text-2xl font-black text-charcoal mb-2">Viewing Request Received!</h2>
            <p className="text-sm text-gray-600 mb-6">
              Our administrator will contact you shortly to coordinate your appointment with the property owner or caretaker. Viewings are 100% free of charge.
            </p>
            <button onClick={() => navigateTo('home')} className="bg-forest text-white font-bold py-3 px-6 rounded-lg text-sm">
              Return Home
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg border p-6 sm:p-8">
          <span className="bg-forest-muted text-forest text-xs font-bold px-2.5 py-1 rounded">Centrally Coordinated</span>
          <h2 className="text-2xl font-black text-charcoal mt-2 mb-1">Request a Property Viewing</h2>
          <p className="text-xs text-gray-600 mb-6">Fill in your preferred date and time. Our team will manage the appointment safely.</p>

          <form onSubmit={handleSubmitViewing} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Select Property</label>
              <select 
                value={viewingForm.propertyId} 
                onChange={(e) => setViewingForm({...viewingForm, propertyId: e.target.value})}
                className="w-full border rounded-lg p-3 text-sm"
              >
                {properties.map(p => (
                  <option key={p.id} value={p.id}>{p.id} - {p.title} ({formatUGX(p.monthlyRent)}/mo)</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Your Full Name</label>
              <input type="text" required value={viewingForm.name} onChange={(e) => setViewingForm({...viewingForm, name: e.target.value})} placeholder="Nakato Brenda" className="w-full border rounded-lg p-3 text-sm" />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Telephone Number</label>
              <input type="tel" required value={viewingForm.phone} onChange={(e) => setViewingForm({...viewingForm, phone: e.target.value})} placeholder="+256 700 000000" className="w-full border rounded-lg p-3 text-sm" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Preferred Date</label>
                <input type="date" required value={viewingForm.date} onChange={(e) => setViewingForm({...viewingForm, date: e.target.value})} className="w-full border rounded-lg p-3 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Number of Attendees</label>
                <input type="number" min="1" max="5" value={viewingForm.attendees} onChange={(e) => setViewingForm({...viewingForm, attendees: e.target.value})} className="w-full border rounded-lg p-3 text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Optional Message</label>
              <textarea value={viewingForm.message} onChange={(e) => setViewingForm({...viewingForm, message: e.target.value})} placeholder="Any specific questions about the rental?" rows="3" className="w-full border rounded-lg p-3 text-sm"></textarea>
            </div>

            <button type="submit" className="w-full bg-forest text-white py-3 rounded-xl font-bold hover:bg-forest-light transition shadow-lg">
              Submit Viewing Request
            </button>
          </form>
        </div>
      </div>
    );
  };

  // ==========================================
  // 7. ADMINISTRATOR DASHBOARD
  // ==========================================
  const renderAdminDashboard = () => {
    const [adminTab, setAdminTab] = useState('verifications'); // verifications, subscriptions, viewings, complaints

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded">Administrator Workspace</span>
            <h1 className="text-3xl font-black text-charcoal mt-2">EkifoLink Management Console</h1>
            <p className="text-sm text-gray-600">Secure role-based access for property verification, subscriptions, and viewing coordination.</p>
          </div>
          <div className="bg-white p-3 rounded-lg border shadow-sm flex space-x-6 text-center text-xs">
            <div>
              <p className="text-gray-500 font-bold uppercase">Registered Owners</p>
              <p className="text-lg font-black text-forest">14</p>
            </div>
            <div className="border-l pl-4">
              <p className="text-gray-500 font-bold uppercase">Active Listings</p>
              <p className="text-lg font-black text-forest">{properties.length}</p>
            </div>
            <div className="border-l pl-4">
              <p className="text-gray-500 font-bold uppercase">Monthly Revenue</p>
              <p className="text-lg font-black text-amber-600">UGX 150,000</p>
            </div>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex space-x-2 border-b mb-6 overflow-x-auto pb-2">
          <button onClick={() => setAdminTab('verifications')} className={`px-4 py-2 font-bold text-sm rounded-t-lg transition whitespace-nowrap ${adminTab === 'verifications' ? 'bg-forest text-white' : 'bg-gray-100 text-charcoal hover:bg-gray-200'}`}>
            Property Verifications ({properties.length})
          </button>
          <button onClick={() => setAdminTab('subscriptions')} className={`px-4 py-2 font-bold text-sm rounded-t-lg transition whitespace-nowrap ${adminTab === 'subscriptions' ? 'bg-forest text-white' : 'bg-gray-100 text-charcoal hover:bg-gray-200'}`}>
            Property Subscriptions ({subscriptions.length})
          </button>
          <button onClick={() => setAdminTab('viewings')} className={`px-4 py-2 font-bold text-sm rounded-t-lg transition whitespace-nowrap ${adminTab === 'viewings' ? 'bg-forest text-white' : 'bg-gray-100 text-charcoal hover:bg-gray-200'}`}>
            Viewing Requests ({viewingRequests.length})
          </button>
          <button onClick={() => setAdminTab('complaints')} className={`px-4 py-2 font-bold text-sm rounded-t-lg transition whitespace-nowrap ${adminTab === 'complaints' ? 'bg-forest text-white' : 'bg-gray-100 text-charcoal hover:bg-gray-200'}`}>
            Complaint Management ({complaints.length})
          </button>
        </div>

        {/* TAB 1: VERIFICATIONS */}
        {adminTab === 'verifications' && (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-4 border-b bg-gray-50 font-bold text-sm">Property Verification & Trust Standard Workspace</div>
            <div className="divide-y">
              {properties.map(p => (
                <div key={p.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="bg-forest text-white text-xs font-bold px-2 py-0.5 rounded">{p.id}</span>
                      <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded uppercase">{p.status}</span>
                    </div>
                    <h3 className="font-bold text-lg text-charcoal">{p.title}</h3>
                    <p className="text-xs text-gray-500 mb-3">{p.neighbourhood}, {p.district} • Owner: {p.ownerName} ({p.ownerPhone})</p>
                    
                    <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded border">
                      <strong>Verification Checklist:</strong> Identity ({p.verification.identity ? '✅' : '❌'}), Ownership ({p.verification.ownership ? '✅' : '❌'}), Inspection ({p.verification.inspection ? '✅' : '❌'}), Media ({p.verification.media ? '✅' : '❌'})
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        const updated = properties.map(item => item.id === p.id ? {...item, status: 'approved'} : item);
                        setProperties(updated);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-bold text-xs transition"
                    >
                      Approve & Verify
                    </button>
                    <button 
                      onClick={() => {
                        const updated = properties.map(item => item.id === p.id ? {...item, status: 'rejected'} : item);
                        setProperties(updated);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold text-xs transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SUBSCRIPTIONS */}
        {adminTab === 'subscriptions' && (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-4 border-b bg-gray-50 font-bold text-sm">Monthly Property Subscriptions (UGX 50,000 per property)</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                  <tr>
                    <th className="p-3">Property ID</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Owner</th>
                    <th className="p-3">Fee</th>
                    <th className="p-3">Payment Ref</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {subscriptions.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="p-3 font-bold text-forest">{sub.propertyId}</td>
                      <td className="p-3 font-semibold">{sub.title}</td>
                      <td className="p-3 text-gray-600">{sub.owner}</td>
                      <td className="p-3 font-bold">{formatUGX(sub.fee)}</td>
                      <td className="p-3 text-gray-500 font-mono text-xs">{sub.paymentRef || 'None yet'}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${sub.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <button 
                          onClick={() => {
                            const updated = subscriptions.map((s, i) => i === idx ? {...s, status: 'active', paymentRef: 'MM-UG-CONFIRMED'} : s);
                            setSubscriptions(updated);
                          }}
                          className="bg-forest text-white px-3 py-1 rounded text-xs font-bold hover:bg-forest-light transition"
                        >
                          Confirm & Activate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: VIEWINGS */}
        {adminTab === 'viewings' && (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-4 border-b bg-gray-50 font-bold text-sm">Centralized Viewing Coordination Workspace</div>
            <div className="divide-y">
              {viewingRequests.map(req => (
                <div key={req.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="bg-forest text-white text-xs font-bold px-2 py-0.5 rounded">{req.id}</span>
                      <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">{req.status}</span>
                    </div>
                    <h3 className="font-bold text-base text-charcoal">{req.propertyTitle}</h3>
                    <p className="text-xs text-gray-600 mb-2">
                      <strong>Tenant:</strong> {req.tenantName} ({req.phone}) • <strong>Requested Date:</strong> {req.date} at {req.time} ({req.attendees} attendees)
                    </p>
                    <p className="text-xs text-gray-500 italic">"{req.message || 'No additional message'}"</p>
                  </div>

                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        const updated = viewingRequests.map(r => r.id === req.id ? {...r, status: 'Viewing Confirmed'} : r);
                        setViewingRequests(updated);
                      }}
                      className="bg-forest text-white px-3 py-2 rounded text-xs font-bold hover:bg-forest-light transition"
                    >
                      Confirm Appointment
                    </button>
                    <button 
                      onClick={() => {
                        const updated = viewingRequests.map(r => r.id === req.id ? {...r, status: 'Completed'} : r);
                        setViewingRequests(updated);
                      }}
                      className="bg-gray-100 text-charcoal px-3 py-2 rounded text-xs font-bold hover:bg-gray-200 transition"
                    >
                      Mark Completed
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: COMPLAINTS */}
        {adminTab === 'complaints' && (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden p-6">
            <h3 className="font-bold text-lg mb-4">Tenant Complaint Investigations</h3>
            <div className="space-y-4">
              {complaints.map(c => (
                <div key={c.id} className="p-4 bg-gray-50 rounded-lg border flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">{c.status}</span>
                    <h4 className="font-bold text-sm mt-1">{c.issue}</h4>
                    <p className="text-xs text-gray-500">Property: {c.propertyId} • Tenant: {c.tenant} • Date: {c.date}</p>
                  </div>
                  <button className="bg-forest text-white px-3 py-2 rounded text-xs font-bold">Resolve Issue</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ==========================================
  // 8. OWNER DASHBOARD
  // ==========================================
  const renderOwnerDashboard = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <span className="bg-forest text-white text-xs font-bold px-3 py-1 rounded">Owner Portal</span>
          <h1 className="text-3xl font-black text-charcoal mt-2">Welcome, Property Owner</h1>
          <p className="text-sm text-gray-600">Manage your listed properties, verification progress, and monthly subscriptions.</p>
        </div>
        <button onClick={() => navigateTo('submit')} className="bg-forest text-white px-4 py-2.5 rounded-lg font-bold text-sm hover:bg-forest-light transition flex items-center space-x-2">
          <PlusCircle size={16} />
          <span>List New Property</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map(p => (
          <div key={p.id} className="bg-white rounded-xl shadow-sm border p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="bg-forest text-white text-xs font-bold px-2.5 py-1 rounded">{p.id}</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-100 text-amber-800 uppercase">{p.status}</span>
              </div>
              <h3 className="font-bold text-lg text-charcoal mb-1">{p.title}</h3>
              <p className="text-xs text-gray-500 mb-4">{p.neighbourhood}, {p.district} • Monthly: {formatUGX(p.monthlyRent)}</p>

              <div className="bg-gray-50 p-3 rounded-lg border text-xs space-y-1 mb-4">
                <p><strong>Verification Status:</strong> {p.verification.inspection ? 'Inspected & Verified' : 'Pending Administrator Inspection'}</p>
                <p><strong>Subscription Status:</strong> <span className="text-emerald-700 font-bold uppercase">{p.subscription.status}</span></p>
                <p><strong>Expiry Date:</strong> {p.subscription.expiryDate}</p>
              </div>
            </div>

            <div className="flex space-x-2 pt-4 border-t">
              <button onClick={() => navigateTo('details', p)} className="flex-1 bg-gray-100 text-charcoal font-bold text-xs py-2 rounded-lg hover:bg-gray-200 transition">
                View Truth Card
              </button>
              <button onClick={() => alert("Renewal request submitted to Administrator.")} className="flex-1 bg-forest text-white font-bold text-xs py-2 rounded-lg hover:bg-forest-light transition">
                Renew Subscription
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- RENDER MAIN ROUTER ---
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {renderNavbar()}

      <main className="flex-grow">
        {currentPage === 'home' && renderHomePage()}
        {currentPage === 'browse' && renderBrowsePage()}
        {currentPage === 'details' && renderDetailsPage()}
        {currentPage === 'auth' && renderAuthPage()}
        {currentPage === 'submit' && renderSubmitPage()}
        {currentPage === 'viewing' && renderViewingPage()}
        {currentPage === 'admin' && renderAdminDashboard()}
        {currentPage === 'owner' && renderOwnerDashboard()}
      </main>

      {renderFooter()}
    </div>
  );
}