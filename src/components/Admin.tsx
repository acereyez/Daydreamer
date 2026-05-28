import React, { useState, useMemo, useEffect } from "react";
import { 
  KeyRound, ShieldCheck, DollarSign, Calendar, Sliders, Users, 
  Plus, Check, Trash2, Tag, BookOpen, Sparkles, TrendingUp, RefreshCw, Layers,
  Wrench, Settings, ChevronRight, History, Bell
} from "lucide-react";
import { Booking, PortfolioItem, BlogPost, Promotion, BookingStatus, Service, ContactDetails, TeamMember } from "../types";

interface AdminProps {
  bookings: Booking[];
  portfolio: PortfolioItem[];
  blogs: BlogPost[];
  promotions: Promotion[];
  services: Service[];
  contactDetails: ContactDetails;
  team: TeamMember[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  setPortfolio: React.Dispatch<React.SetStateAction<PortfolioItem[]>>;
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  setPromotions: React.Dispatch<React.SetStateAction<Promotion[]>>;
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  setContactDetails: React.Dispatch<React.SetStateAction<ContactDetails>>;
  setTeam: React.Dispatch<React.SetStateAction<TeamMember[]>>;
  availableSeats: number;
  setAvailableSeats: (seats: number) => void;
}

export default function Admin({
  bookings,
  portfolio,
  blogs,
  promotions,
  services,
  contactDetails,
  team,
  setBookings,
  setPortfolio,
  setBlogs,
  setPromotions,
  setServices,
  setContactDetails,
  setTeam,
  availableSeats,
  setAvailableSeats
}: AdminProps) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [passphrase, setPassphrase] = useState("daydreamer2026");
  const [authError, setAuthError] = useState("");

  // Tabs
  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "portfolio" | "blogs" | "promos" | "settings" | "team">("overview");

  // Local contact edit state
  const [localContact, setLocalContact] = useState<ContactDetails>(contactDetails);

  useEffect(() => {
    setLocalContact(contactDetails);
  }, [contactDetails]);

  // Handle local contact setting submit
  const handleUpdateContactDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setContactDetails(localContact);
    alert("Hub contact Coordinates dynamic databases updated successfully! Confirmed in live view footers.");
  };

  const handlePriceChange = (serviceId: string, value: number) => {
    setServices(prev => prev.map(s => {
      if (s.id === serviceId) {
        if (s.price === value) return s;
        const change = {
          oldPrice: s.price,
          newPrice: value,
          date: new Date().toLocaleDateString("en-ZA", { month: "short", day: "numeric" }) + ", " + new Date().toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" })
        };
        const history = s.priceHistory || [];
        return {
          ...s,
          price: value,
          priceHistory: [change, ...history].slice(0, 3)
        };
      }
      return s;
    }));
  };

  const adjustAllPricesByPercent = (percent: number) => {
    setServices(prev => prev.map(s => {
      const newPrice = Math.max(1, Math.round(s.price * (1 + percent / 100)));
      if (newPrice === s.price) return s;
      const change = {
        oldPrice: s.price,
        newPrice: newPrice,
        date: new Date().toLocaleDateString("en-ZA", { month: "short", day: "numeric" }) + ", " + new Date().toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" })
      };
      const history = s.priceHistory || [];
      return {
        ...s,
        price: newPrice,
        priceHistory: [change, ...history].slice(0, 3)
      };
    }));
  };

  const adjustAllPricesByFlatAmount = (amount: number) => {
    setServices(prev => prev.map(s => {
      const newPrice = Math.max(1, s.price + amount);
      if (newPrice === s.price) return s;
      const change = {
        oldPrice: s.price,
        newPrice: newPrice,
        date: new Date().toLocaleDateString("en-ZA", { month: "short", day: "numeric" }) + ", " + new Date().toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" })
      };
      const history = s.priceHistory || [];
      return {
        ...s,
        price: newPrice,
        priceHistory: [change, ...history].slice(0, 3)
      };
    }));
  };

  // Input Forms States
  const [newPortfolio, setNewPortfolio] = useState({
    title: "",
    category: "Logos",
    desc: "",
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=400&auto=format&fit=crop",
    tools: "Photoshop, Illustrator"
  });

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    category: "Design (Adobe)",
    price: 150,
    priceType: "fixed" as "fixed" | "starting" | "per_hour" | "per_page",
    duration: "1 hour"
  });

  const [newBlog, setNewBlog] = useState({
    title: "",
    summary: "",
    content: "### New Design Guide\n\nWrite some rich contents here.",
    category: "Design Tips",
    author: "Zola Dube (Studio Admin)"
  });

  const [newPromo, setNewPromo] = useState({
    name: "",
    code: "",
    discount: 15
  });

  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    role: "",
    desc: "",
    avatar: ""
  });

  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamMember.name || !newTeamMember.role) return;
    const generatedAvatar = newTeamMember.avatar || newTeamMember.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    const newMember: TeamMember = {
      id: `team-${Date.now()}`,
      name: newTeamMember.name,
      role: newTeamMember.role,
      desc: newTeamMember.desc || "Collaborative specialist keeping creative services running smoothly.",
      avatar: generatedAvatar
    };
    setTeam(prev => [...prev, newMember]);
    setNewTeamMember({ name: "", role: "", desc: "", avatar: "" });
  };

  const handleUpdateTeamMember = (id: string, updatedFields: Partial<TeamMember>) => {
    setTeam(prev => prev.map(m => m.id === id ? { ...m, ...updatedFields } : m));
  };

  const handleDeleteTeamMember = (id: string) => {
    setTeam(prev => prev.filter(m => m.id !== id));
  };

  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passphrase === "daydreamer2026") {
      setIsAdminAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid master code. Hint: daydreamer2026");
    }
  };

  // Calculations for dashboard metrics
  const bookingsSummary = useMemo(() => {
    const today = "2026-05-28";
    const todayBookings = bookings.filter(b => b.date === today && b.status !== "Cancelled");
    const active = bookings.filter(b => b.status === "Confirmed").length;
    const totalsRevenue = bookings
      .filter(b => b.status !== "Cancelled")
      .reduce((sum, b) => sum + b.totalDue, 0);

    return {
      todayCount: todayBookings.length,
      todayRevenue: todayBookings.reduce((sum, b) => sum + b.totalDue, 0),
      activeCount: active,
      allRevenue: totalsRevenue
    };
  }, [bookings]);

  // Handle booking status switch
  const handleUpdateBookingStatus = (id: string, newStatus: BookingStatus) => {
    setBookings((prev) => 
      prev.map((b) => b.id === id ? { ...b, status: newStatus } : b)
    );
  };

  // Handle manual removal of booking
  const handleDeleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  // Send simulated reminder to client
  const handleSendReminder = (b: Booking) => {
    alert(`📅 BOOKING REMINDER DISPATCHED SUCCESSFULLY!\n\nEmail Dispatch: Sent to ${b.email}\nWhatsApp Alert: Dispatched to ${b.phone}\n\nClient Notice Sample:\n"Hi ${b.firstName}, friendly reminder that you have an upcoming booking for '${b.serviceName}' on ${b.date} at ${b.timeSlot}. Reference ID: ${b.id}. See you soon!"`);
  };

  // Post dynamic new service registration
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.name.trim()) return;

    const newItem: Service = {
      id: `srv-${Date.now()}`,
      name: newService.name,
      description: newService.description || "Premium studio workstation access / creative design service.",
      category: newService.category as any,
      price: Number(newService.price) || 0,
      priceType: newService.priceType,
      duration: newService.duration || "1 hour",
      icon: "Sparkles",
      popular: false
    };

    setServices(prev => [...prev, newItem]);
    setNewService({
      name: "",
      description: "",
      category: "Design (Adobe)",
      price: 150,
      priceType: "fixed",
      duration: "1 hour"
    });
    alert(`Dynamic digital service "${newItem.name}" published successfully! Accessible instantly on transparent pricing sheets and online booking schedulers.`);
  };

  // Post dynamic portfolio addition
  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortfolio.title.trim()) return;

    const newItem: PortfolioItem = {
      id: `port-${Date.now()}`,
      title: newPortfolio.title,
      description: newPortfolio.desc || "Completed workspace sample.",
      category: newPortfolio.category,
      imageUrl: newPortfolio.imageUrl,
      toolsUsed: newPortfolio.tools.split(",").map(t => t.trim()),
      isFeatured: true
    };

    setPortfolio(prev => [newItem, ...prev]);
    setNewPortfolio({
      title: "",
      category: "Logos",
      desc: "",
      imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=400&auto=format&fit=crop",
      tools: "Photoshop, Illustrator"
    });
    alert("Portfolio piece added live successfully! View it in Portfolio Gallery.");
  };

  // Post dynamic blog post
  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title.trim()) return;

    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      title: newBlog.title,
      summary: newBlog.summary || "Summary of creative blog post.",
      content: newBlog.content,
      category: newBlog.category,
      readTime: "3 min read",
      publishDate: "May 28, 2026",
      author: newBlog.author,
      authorInitials: "ZD",
      isFeatured: false,
      imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=400&auto=format&fit=crop"
    };

    setBlogs(prev => [newPost, ...prev]);
    setNewBlog({
      title: "",
      summary: "",
      content: "### New Design Guide\n\nWrite some rich contents here.",
      category: "Design Tips",
      author: "Zola Dube (Studio Admin)"
    });
    alert("Blog story published successfully! View it in Insights Blog.");
  };

  // Create promo
  const handleAddPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromo.code.trim()) return;

    const newItem: Promotion = {
      id: `promo-${Date.now()}`,
      name: newPromo.name || `${newPromo.code} Discount`,
      description: newPromo.name || "Owner custom discount bonus.",
      promoCode: newPromo.code.toUpperCase(),
      discountPercent: newPromo.discount,
      isHomepageTicker: true,
      expiryDate: "2026-12-31"
    };

    setPromotions(prev => [...prev, newItem]);
    setNewPromo({
      name: "",
      code: "",
      discount: 15
    });
    alert(`Coupon code ${newItem.promoCode} live! Confirm on Booking flow.`);
  };

  // Dynamically compute last 7 days from today (2026-05-28) and other analytics from raw bookings
  const analytics = useMemo(() => {
    const today = new Date("2026-05-28");
    const trend = [];
    
    // 1. Calculate 7-day billings dynamic trend
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split("T")[0]; // YYYY-MM-DD
      
      const dayRevenue = bookings
        .filter(b => b.date === dateStr && b.status !== "Cancelled")
        .reduce((sum, b) => sum + b.totalDue, 0);

      const formatter = new Intl.DateTimeFormat("en-US", { weekday: "short" });
      let dayName = formatter.format(d);
      if (i === 0) dayName += " (Today)";

      trend.push({
        day: dayName,
        amount: dayRevenue
      });
    }

    // 2. Estimate most booked services count
    const serviceCounts: Record<string, { count: number, revenue: number }> = {};
    bookings.forEach(b => {
      if (b.status !== "Cancelled") {
        if (!serviceCounts[b.serviceName]) {
          serviceCounts[b.serviceName] = { count: 0, revenue: 0 };
        }
        serviceCounts[b.serviceName].count += 1;
        serviceCounts[b.serviceName].revenue += b.totalDue;
      }
    });

    const topServices = Object.entries(serviceCounts)
      .map(([name, stat]) => ({ name, count: stat.count, revenue: stat.revenue }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);

    // 3. Compute revenue breakdown by categories
    const categoryRevenue: Record<string, number> = {};
    bookings.forEach(b => {
      if (b.status !== "Cancelled") {
        // Find category group from parent services list
        const parentService = services.find(s => s.id === b.serviceId);
        const category = parentService ? parentService.category : "Direct Walk-in/Other";
        categoryRevenue[category] = (categoryRevenue[category] || 0) + b.totalDue;
      }
    });

    const categoryShares = Object.entries(categoryRevenue)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);

    // 4. Calculate core averages
    const validBookings = bookings.filter(b => b.status !== "Cancelled");
    const avgOrderValue = validBookings.length > 0 
      ? validBookings.reduce((sum, b) => sum + b.totalDue, 0) / validBookings.length 
      : 0;

    const rateOfCompletion = bookings.length > 0
      ? (bookings.filter(b => b.status === "Completed" || b.status === "Confirmed").length / bookings.length) * 100
      : 100;

    return {
      incomeTrend: trend,
      topServices,
      categoryShares,
      avgOrderValue,
      rateOfCompletion
    };
  }, [bookings, services]);

  const incomeTrend = analytics.incomeTrend;
  const maxWeeklyAmount = Math.max(...incomeTrend.map(v => v.amount)) || 100;

  // Render authentic login form if unauthenticated
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-ink-navy text-warm-cream transition-colors duration-300 light:bg-surface-light light:text-studio-navy py-20 px-4">
        <div className="bg-[#1C1F32] p-8 rounded-3xl border border-white/10 text-center max-w-md mx-auto space-y-6 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-accent-gold/15 text-accent-gold flex items-center justify-center mx-auto">
            <KeyRound className="w-6 h-6 animate-pulse" />
          </div>

          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-white">Owner Portal Authentic Access</h2>
            <p className="text-xs text-warm-cream/65">Protected administrative interface. Verify your administrative passphrase below.</p>
          </div>

          <form onSubmit={handleAdminAuthSubmit} className="space-y-4 text-xs text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-warm-cream/60">Enter Passphrase</label>
              <input 
                type="password"
                required
                placeholder="default is: daydreamer2026"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2.5 px-3 text-xs font-mono text-warm-cream outline-none focus:border-accent-gold transition-colors"
              />
              {authError && <span className="text-[10px] text-coral-pop font-mono block">{authError}</span>}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-accent-gold text-studio-navy font-bold text-xs uppercase tracking-wider hover:bg-[#e0b430]"
              >
                Authenticate Token Credentials
              </button>
            </div>
          </form>

          <p className="text-[10px] text-warm-cream/40 pt-2 border-t border-white/5">
            Admin credentials are pre-configured locally with fallback master rules.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-navy text-warm-cream transition-colors duration-300 light:bg-surface-light light:text-studio-navy py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Upper admin panel details */}
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 border-b border-white/5 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono tracking-widest text-[#B3A1C1] uppercase flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-accent-gold animate-bounce" /> Administrative Operations Workspace
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">Owner Admin Dashboard</h1>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => setIsAdminAuthenticated(false)}
              className="text-xs font-mono px-4 py-2 border border-white/10 hover:border-coral-pop hover:text-coral-pop rounded-xl transition-colors"
            >
              Secure Lock Portal
            </button>
          </div>
        </div>

        {/* Dash statistics Overview pills */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#1C1F32] p-5 rounded-2xl border border-white/5 text-left space-y-1 relative overflow-hidden">
            <DollarSign className="w-8 h-8 absolute top-4 right-4 text-accent-gold/15" />
            <span className="text-[10.5px] font-mono text-warm-cream/50 uppercase block">Today&#39;s Billings</span>
            <p className="text-2xl font-serif font-bold text-accent-gold">R{bookingsSummary.todayRevenue.toFixed(2)}</p>
            <p className="text-[9px] font-mono text-success-green">From {bookingsSummary.todayCount} completed sessions</p>
          </div>

          <div className="bg-[#1C1F32] p-5 rounded-2xl border border-white/5 text-left space-y-1 relative overflow-hidden">
            <Calendar className="w-8 h-8 absolute top-4 right-4 text-accent-gold/15" />
            <span className="text-[10.5px] font-mono text-warm-cream/50 uppercase block">Active Stations Holds</span>
            <p className="text-2xl font-serif font-bold text-white">{bookingsSummary.activeCount} Slots</p>
            <p className="text-[9px] font-mono text-warm-cream/40">Requires reception verification</p>
          </div>

          <div className="bg-[#1C1F32] p-5 rounded-2xl border border-white/5 text-left space-y-1 relative overflow-hidden">
            <Users className="w-8 h-8 absolute top-4 right-4 text-accent-gold/15" />
            <span className="text-[10.5px] font-mono text-warm-cream/50 uppercase block">Cumulative Income (ZAR)</span>
            <p className="text-2xl font-serif font-bold text-[#C3B1E1]">R{bookingsSummary.allRevenue.toFixed(2)}</p>
            <p className="text-[9px] font-mono text-success-green">All online database logs</p>
          </div>

          {/* Interactive Workstation seats allocator bar */}
          <div className="bg-[#1C1F32] p-5 rounded-2xl border border-white/5 text-left space-y-3 relative overflow-hidden">
            <Sliders className="w-8 h-8 absolute top-4 right-4 text-accent-gold/15" />
            <span className="text-[10.5px] font-mono text-warm-cream/50 uppercase block">Workstation Live Capacity</span>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setAvailableSeats(Math.max(0, availableSeats - 1))}
                className="w-7 h-7 bg-white/5 hover:bg-white/10 rounded border border-white/10 font-bold flex items-center justify-center text-xs"
              >
                -
              </button>
              <span className="text-xl font-bold text-success-green font-mono">{availableSeats} Seats</span>
              <button 
                onClick={() => setAvailableSeats(Math.min(16, availableSeats + 1))}
                className="w-7 h-7 bg-white/5 hover:bg-white/10 rounded border border-white/10 font-bold flex items-center justify-center text-xs"
              >
                +
              </button>
            </div>
            <p className="text-[9px] font-mono text-accent-gold leading-none">Sets seats capacity globally</p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2 border-b border-white/5 pb-2 overflow-x-auto scrollbar-thin">
          {[
            { id: "overview", label: "Overview & Charts" },
            { id: "bookings", label: "Appointments Manager" },
            { id: "portfolio", label: "Portfolio Publisher" },
            { id: "blogs", label: "Blogs Tip Publisher" },
            { id: "promos", label: "Promotions Engine" },
            { id: "team", label: "Our Team 👥" },
            { id: "settings", label: "Pricing & Contact Settings ⚙️" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-1.5 px-4 rounded-t text-xs font-mono font-medium border-b-2 transition-all shrink-0 ${
                activeTab === tab.id
                  ? "border-accent-gold text-accent-gold font-bold"
                  : "border-transparent text-warm-cream/50 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================= TAB 1: OVERVIEW & REAL-TIME ANALYTICS DASHBOARD ================= */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* 7-day income dynamic chart block */}
              <div className="lg:col-span-8 bg-[#1C1F32] p-6 rounded-2xl border border-white/5 space-y-6 text-left">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-accent-gold uppercase tracking-wider block">STUDIO FINANCIAL REPORT</span>
                  <h3 className="font-serif text-lg font-bold text-white">7-Day Billings Performance</h3>
                  <p className="text-xs text-warm-cream/60">Dynamic tracking computed directly from your live reservation calendar.</p>
                </div>

                {/* Graphic container */}
                <div className="h-64 flex items-end justify-between gap-3 pt-6 border-b border-white/5 pb-2">
                  {incomeTrend.map((v, key) => {
                    const pct = (v.amount / maxWeeklyAmount) * 100;
                    return (
                      <div key={key} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
                        <span className="text-[10px] font-mono text-accent-gold font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">R{v.amount}</span>
                        <div 
                          className="w-full bg-accent-gold/25 group-hover:bg-accent-gold/85 border border-accent-gold/30 rounded-t transition-all duration-500 shadow-md"
                          style={{ height: `${Math.max(4, pct)}%` }}
                        ></div>
                        <span className="text-[9px] font-mono text-warm-cream/55 leading-none shrink-0">{v.day}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between text-[10px] font-mono text-warm-cream/40">
                  <span>Currency unit: South African Rand (ZAR)</span>
                  <span>Refresh status: Live Analytics Active</span>
                </div>
              </div>

              {/* Quick action walk-in logs & general performance */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                
                {/* Walk-in generator card */}
                <div className="bg-[#1C1F32] p-6 rounded-2xl border border-white/5 space-y-4 text-left">
                  <h3 className="font-serif text-md font-bold text-white">Manual Walk-in Generator</h3>
                  <p className="text-[11px] text-warm-cream/65">Quickly secure a standard PC workstation seat for walk-in clients with instant logging.</p>
                  
                  <button 
                    onClick={() => {
                      const guestData: Booking = {
                        id: `WALK-${Date.now().toString().slice(-4)}`,
                        serviceId: "srv-pc-hourly",
                        serviceName: "Hourly PC Access",
                        duration: "1 hour",
                        date: "2026-05-28",
                        timeSlot: "Now",
                        firstName: "Offline",
                        lastName: "Guest Walkin",
                        email: "walkin@daydreamer.co.za",
                        phone: "+27 00 000 0000",
                        whatsAppNotify: false,
                        status: "Confirmed",
                        totalDue: 15,
                        paymentMethod: "Cash on arrival",
                        createdAt: new Date().toISOString()
                      };
                      setBookings(prev => [guestData, ...prev]);
                      alert("Walk-in station session registered live! Seats capacity adjusted.");
                    }}
                    className="w-full py-2.5 rounded-xl bg-accent-gold hover:bg-[#e0b430] text-studio-navy font-bold text-xs uppercase cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> <span>Add Walk-in PC Hold</span>
                  </button>

                  <div className="pt-2 border-t border-white/5">
                    <ul className="text-[10px] space-y-1 font-mono text-warm-cream/50">
                      <li className="flex justify-between"><span>POPIA Security</span><span className="text-success-green">SECURE</span></li>
                      <li className="flex justify-between"><span>Database Syncs</span><span className="text-success-green">ONLINE</span></li>
                    </ul>
                  </div>
                </div>

                {/* Efficiency metrics */}
                <div className="bg-[#1C1F32] p-6 rounded-2xl border border-white/5 space-y-3 text-left">
                  <h3 className="font-serif text-xs uppercase text-accent-gold font-bold">Workspace Conversions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] font-mono text-warm-cream/50 block">AVG Ticket Value</span>
                      <p className="text-lg font-serif font-bold text-white">R{analytics.avgOrderValue.toFixed(2)}</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-warm-cream/50 block">Reservation Success</span>
                      <p className="text-lg font-serif font-bold text-success-green">{analytics.rateOfCompletion.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Deep Dynamic Business Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card A: Service Popularity Analytics */}
              <div className="bg-[#1C1F32] p-6 rounded-2xl border border-white/5 text-left space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-accent-gold uppercase tracking-wider block">DEMAND ANALYTICS</span>
                  <h4 className="font-serif text-md font-bold text-white">Most Requested Workstations & Services</h4>
                </div>
                
                {analytics.topServices.length === 0 ? (
                  <p className="text-xs text-warm-cream/40 py-6 font-mono">No active service reservations logged yet.</p>
                ) : (
                  <div className="space-y-3">
                    {analytics.topServices.map((srv, idx) => (
                      <div key={srv.name} className="space-y-1 font-mono text-xs">
                        <div className="flex justify-between text-warm-cream/80">
                          <span className="truncate max-w-[200px]">{idx + 1}. {srv.name}</span>
                          <span className="text-accent-gold font-bold">{srv.count} reservations</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-[#C3B1E1] h-full" 
                            style={{ width: `${(srv.count / Math.max(...analytics.topServices.map(s => s.count))) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-[9px] text-warm-cream/40">
                          <span>Cumulative sales generated:</span>
                          <span>R{srv.revenue.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card B: Category Breakdown Shares */}
              <div className="bg-[#1C1F32] p-6 rounded-2xl border border-white/5 text-left space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-[#B3A1C1] uppercase tracking-wider block">REVENUE STREAM ANALYSIS</span>
                  <h4 className="font-serif text-md font-bold text-white">Contribution Shares by Studio Department</h4>
                </div>

                {analytics.categoryShares.length === 0 ? (
                  <p className="text-xs text-warm-cream/40 py-6 font-mono">Complete a booking to see departmental revenue contributions.</p>
                ) : (
                  <div className="space-y-3 font-mono text-xs">
                    {analytics.categoryShares.map((cat, idx) => {
                      const totalRev = analytics.categoryShares.reduce((s, c) => s + c.amount, 0) || 1;
                      const percentage = (cat.amount / totalRev) * 100;
                      return (
                        <div key={cat.category} className="flex items-center justify-between border-b border-white/5 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-warm-cream/40">{idx + 1}</span>
                            <span className="text-white text-xs">{cat.category}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-accent-gold font-bold block">R{cat.amount.toFixed(2)}</span>
                            <span className="text-[9px] text-warm-cream/40">{percentage.toFixed(1)}% Share</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ================= TAB 2: APPOINTMENTS MANAGER TABLE ================= */}
        {activeTab === "bookings" && (
          <div className="bg-[#1C1F32] p-6 rounded-2xl border border-white/5 space-y-4 text-left overflow-x-auto">
            <h3 className="font-serif text-lg font-bold text-white mb-2">Live Appointments List</h3>
            
            <table className="w-full text-xs font-mono border-collapse min-w-max">
              <thead>
                <tr className="border-b border-white/10 text-warm-cream/50 text-[10px]">
                  <th className="py-2.5 text-left">REF CODE</th>
                  <th className="py-2.5 text-left">CLIENT MAIL</th>
                  <th className="py-2.5 text-left">TARGET SERVICE</th>
                  <th className="py-2.5 text-left">DATE & SLOT</th>
                  <th className="py-2.5 text-left">STATUS</th>
                  <th className="py-2.5 text-left">BILLING</th>
                  <th className="py-2.5 text-right">ACTIONS CONTROL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 font-bold text-accent-gold">{b.id}</td>
                    <td className="py-3.5 truncate max-w-[120px]">{b.firstName} ({b.email})</td>
                    <td className="py-3.5 font-sans font-medium text-white">{b.serviceName}</td>
                    <td className="py-3.5">{b.date} &bull; {b.timeSlot}</td>
                    <td className="py-3.5">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        b.status === "Cancelled" 
                          ? "bg-coral-pop/25 text-coral-pop" 
                          : b.status === "Completed"
                            ? "bg-neutral-600/50 text-neutral-300"
                            : "bg-success-green/20 text-success-green"
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-accent-gold font-bold">R{b.totalDue}</td>
                    <td className="py-3.5 text-right space-x-1.5 flex items-center justify-end">
                      {b.status !== "Cancelled" && b.status !== "Completed" && (
                        <button
                          onClick={() => handleSendReminder(b)}
                          className="px-2 py-1 bg-accent-gold/15 hover:bg-accent-gold hover:text-studio-navy text-accent-gold rounded text-[9.5px] font-semibold flex items-center gap-1 transition-all"
                          title="Trigger Booking Reminder Notifications"
                        >
                          <Bell className="w-3 h-3" />
                          <span>Remind</span>
                        </button>
                      )}
                      {b.status === "Pending" && (
                        <button 
                          onClick={() => handleUpdateBookingStatus(b.id, "Confirmed")}
                          className="px-2 py-1 bg-success-green/25 text-success-green rounded text-[9.5px]"
                          title="Confirm Slot"
                        >
                          Confirm
                        </button>
                      )}
                      {b.status === "Confirmed" && (
                        <button 
                          onClick={() => handleUpdateBookingStatus(b.id, "Completed")}
                          className="px-2 py-1 bg-blue-500/25 text-teal-300 rounded text-[9.5px]"
                          title="Mark Completed"
                        >
                          Complete
                        </button>
                      )}
                      {b.status !== "Cancelled" && b.status !== "Completed" && (
                        <button 
                          onClick={() => handleUpdateBookingStatus(b.id, "Cancelled")}
                          className="px-2 py-1 bg-coral-pop/25 text-coral-pop rounded text-[9.5px]"
                          title="Cancel Slot"
                        >
                          Cancel
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteBooking(b.id)}
                        className="p-1 text-warm-cream/40 hover:text-coral-pop inline-block align-middle"
                        title="Purge"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ================= TAB 3: DUAL CATALOG & WORKSPACE PUBLISHER ================= */}
        {activeTab === "portfolio" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start text-left">
            
            {/* Left Box: Service Catalog Publisher */}
            <div className="bg-[#1C1F32] p-6 rounded-2xl border border-white/5 space-y-4 shadow-xl">
              <div className="border-b border-white/5 pb-3">
                <span className="text-[10px] font-mono text-accent-gold uppercase tracking-wider block font-bold">SERVICE MANAGEMENT</span>
                <h3 className="font-serif text-lg font-bold text-white">Publish New Digital Service</h3>
                <p className="text-[11px] text-warm-cream/55">Add brand new computer station rates, editing service items, or custom vector craft packages dynamically to client schedulers.</p>
              </div>

              <form onSubmit={handleAddService} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-warm-cream/60">Official Service Name</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Architectural Render Design"
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-accent-gold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-warm-cream/60">Service Category Group</label>
                    <select
                      value={newService.category}
                      onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                      className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none cursor-pointer focus:border-accent-gold"
                    >
                      <option value="Design (Adobe)">Design (Adobe)</option>
                      <option value="Photoshop">Photoshop</option>
                      <option value="Illustrator">Illustrator</option>
                      <option value="Photography">Photography</option>
                      <option value="Printing">Printing</option>
                      <option value="Video">Video</option>
                      <option value="Office & Admin">Office & Admin</option>
                      <option value="Internet & Browsing">Internet & Browsing</option>
                      <option value="Extras">Extras</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-warm-cream/60">Estimated Duration</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. 1 hour, 3 days, Custom"
                      value={newService.duration}
                      onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                      className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-accent-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-warm-cream/60">Base Price (ZAR R)</label>
                    <input 
                      type="number"
                      required
                      min={0}
                      value={newService.price}
                      onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
                      className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-accent-gold font-mono text-accent-gold font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-warm-cream/60">Price Calculation Mode</label>
                    <select
                      value={newService.priceType}
                      onChange={(e) => setNewService({ ...newService, priceType: e.target.value as any })}
                      className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none cursor-pointer focus:border-accent-gold"
                    >
                      <option value="fixed">Fixed Rate</option>
                      <option value="starting">Starting From</option>
                      <option value="per_hour">Per Hour Charge</option>
                      <option value="per_page">Per Page Charge</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-warm-cream/60">Service Feature Narrative Description</label>
                  <textarea 
                    rows={3}
                    placeholder="Provide a detailed outline of the workstation setup, tools made available or designers allocated..."
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-accent-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-accent-gold text-studio-navy font-bold text-xs uppercase cursor-pointer hover:bg-[#e0b430] transition-colors"
                >
                  Publish New Service Live 🚀
                </button>
              </form>
            </div>

            {/* Right Box: Portfolio Design & Live Project Publisher */}
            <div className="bg-[#1C1F32] p-6 rounded-2xl border border-white/5 space-y-4 shadow-xl">
              <div className="border-b border-white/5 pb-3">
                <span className="text-[10px] font-mono text-[#B3A1C1] uppercase tracking-wider block font-bold">PORTFOLIO & SHOWCASE</span>
                <h3 className="font-serif text-lg font-bold text-white">Publish New Design & Live Project</h3>
                <p className="text-[11px] text-warm-cream/55">Feature completed vector design specifications or live architectural projects in the public gallery catalog.</p>
              </div>

              <form onSubmit={handleAddPortfolio} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-warm-cream/60">Project or Design Case Title</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Observatory Corporate Brand Guidelines"
                    value={newPortfolio.title}
                    onChange={(e) => setNewPortfolio({ ...newPortfolio, title: e.target.value })}
                    className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-accent-gold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-warm-cream/60">Asset Showcase Classification</label>
                    <select
                      value={newPortfolio.category}
                      onChange={(e) => setNewPortfolio({ ...newPortfolio, category: e.target.value })}
                      className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none cursor-pointer focus:border-accent-gold"
                    >
                      <option value="Logos">Creative Design: Logos</option>
                      <option value="Flyers">Creative Design: Flyers</option>
                      <option value="Photo Editing">Creative Design: Photo Editing</option>
                      <option value="Illustrations">Creative Design: Illustrations</option>
                      <option value="Print Work">Creative Design: Print Work</option>
                      <option value="Web Design">Live Project: Web Design</option>
                      <option value="Layouts">Live Project: Brand/Bespoke Kit</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-warm-cream/60">Design Technologies / Software Used</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Photoshop, Illustrator, InDesign"
                      value={newPortfolio.tools}
                      onChange={(e) => setNewPortfolio({ ...newPortfolio, tools: e.target.value })}
                      className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-accent-gold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-warm-cream/60">Showcase Image Display URL (Unsplash or direct JPG link)</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. https://images.unsplash.com/..."
                    value={newPortfolio.imageUrl}
                    onChange={(e) => setNewPortfolio({ ...newPortfolio, imageUrl: e.target.value })}
                    className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs font-mono text-white outline-none focus:border-accent-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-warm-cream/60">Brief Project Narrative / Brief Results Case</label>
                  <textarea 
                    rows={3}
                    placeholder="Summarize client requirements, physical paper media printed, or custom typography pairings crafted at the shop..."
                    value={newPortfolio.desc}
                    onChange={(e) => setNewPortfolio({ ...newPortfolio, desc: e.target.value })}
                    className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-accent-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-accent-gold text-studio-navy font-bold text-xs uppercase cursor-pointer hover:bg-[#e0b430] transition-colors"
                >
                  Publish Showcase Item Live 🎨
                </button>
              </form>
            </div>

          </div>
        )}

        {/* ================= TAB 4: BLOG STORY PUBLISHER ================= */}
        {activeTab === "blogs" && (
          <div className="max-w-xl bg-[#1C1F32] p-6 rounded-2xl border border-white/5 text-left space-y-4">
            <h3 className="font-serif text-lg font-bold text-white pb-2 border-b border-white/5">Publish New Blog Journal</h3>
            
            <form onSubmit={handleAddBlog} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-xs font-mono text-warm-cream/60">Article Title</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Navigating Vector vs Raster Formats"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-warm-cream/60">Category Label</label>
                  <select
                    value={newBlog.category}
                    onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                    className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none cursor-pointer"
                  >
                    <option value="Design Tips">Design Tips</option>
                    <option value="Tutorials">Tutorials</option>
                    <option value="News">News</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-warm-cream/60">Journal Author Name</label>
                  <input 
                    type="text"
                    required
                    value={newBlog.author}
                    onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                    className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-warm-cream/60">Editorial Summary Paragraph</label>
                <input 
                  type="text"
                  required
                  placeholder="A short punchy preview of content..."
                  value={newBlog.summary}
                  onChange={(e) => setNewBlog({ ...newBlog, summary: e.target.value })}
                  className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-warm-cream/60">Article Content text (Markdown symbols accepted)</label>
                <textarea 
                  rows={4}
                  placeholder="Type article content..."
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                  className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs font-mono text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-accent-gold text-studio-navy font-bold text-xs uppercase cursor-pointer"
              >
                Publish Article live
              </button>
            </form>
          </div>
        )}

        {/* ================= TAB 5: PROMOTIONS BUILDER ENGINE ================= */}
        {activeTab === "promos" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start text-left">
            
            {/* Left promo code formulation form */}
            <div className="bg-[#1C1F32] p-6 rounded-2xl border border-white/5 space-y-4">
              <h3 className="font-serif text-lg font-bold text-white pb-2 border-b border-white/5">Create New Promo Code</h3>
              
              <form onSubmit={handleAddPromo} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-warm-cream/60">Marketing Title Name</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Winter Warmup Special"
                    value={newPromo.name}
                    onChange={(e) => setNewPromo({ ...newPromo, name: e.target.value })}
                    className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-warm-cream/60">Discount Code Syntax</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. WINTER15"
                      value={newPromo.code}
                      onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value })}
                      className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs font-mono text-white outline-none uppercase"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-warm-cream/60">Discount Percentage (%)</label>
                    <input 
                      type="number"
                      required
                      min={5}
                      max={75}
                      value={newPromo.discount}
                      onChange={(e) => setNewPromo({ ...newPromo, discount: Number(e.target.value) })}
                      className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-accent-gold text-studio-navy font-bold text-xs uppercase cursor-pointer text-center block"
                >
                  Publish Promo Coupon
                </button>
              </form>
            </div>

            {/* Listing existing promos */}
            <div className="bg-[#1C1F32] p-6 rounded-2xl border border-white/5 space-y-4">
              <h3 className="font-serif text-lg font-bold text-white">Active Promo Database</h3>
              
              <div className="space-y-3 text-xs">
                {promotions.map((p) => (
                  <div key={p.id} className="p-4 bg-ink-navy/60 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-semibold text-white">{p.name}</h4>
                      <p className="font-mono text-[10px] text-accent-gold pt-0.5 uppercase">Code: {p.promoCode}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-md font-bold text-success-green font-mono">{p.discountPercent}% OFF</span>
                      <p className="text-[9px] text-warm-cream/40 font-mono">Expires 2026-12-31</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 6: SETTINGS (PRICING & CONTACT COORDS) ================= */}
        {activeTab === "settings" && (
          <div className="space-y-8 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column: Pricing Panel */}
              <div className="bg-[#1C1F32] p-6 rounded-2xl border border-white/5 space-y-6">
                <div className="border-b border-white/5 pb-4">
                  <span className="text-xs font-mono text-accent-gold uppercase tracking-wider block font-bold">LIVE TARIFF DESK</span>
                  <h3 className="font-serif text-lg font-bold text-white">Adjust Station & Design Pricing</h3>
                  <p className="text-[11px] text-warm-cream/60">Changes automatically synchronize with both the transparent pricing tables and live booking flow calculators.</p>
                </div>

                {/* Bulk pricing index adjustment options */}
                <div className="bg-ink-navy/40 p-4 rounded-xl border border-white/5 space-y-3">
                  <span className="text-[10px] font-mono text-accent-gold uppercase block font-semibold">Bulk Price Tweaker Utilities</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => adjustAllPricesByPercent(10)}
                      className="px-2.5 py-1.5 bg-accent-gold/10 hover:bg-accent-gold text-accent-gold hover:text-studio-navy font-mono text-[10.5px] rounded border border-accent-gold/20 font-semibold transition-colors"
                    >
                      +10% globally
                    </button>
                    <button
                      type="button"
                      onClick={() => adjustAllPricesByPercent(-10)}
                      className="px-2.5 py-1.5 bg-accent-gold/10 hover:bg-accent-gold text-accent-gold hover:text-studio-navy font-mono text-[10.5px] rounded border border-accent-gold/20 font-semibold transition-colors"
                    >
                      -10% globally
                    </button>
                    <button
                      type="button"
                      onClick={() => adjustAllPricesByFlatAmount(5)}
                      className="px-2.5 py-1.5 bg-accent-gold/10 hover:bg-accent-gold text-accent-gold hover:text-studio-navy font-mono text-[10.5px] rounded border border-accent-gold/20 font-semibold transition-colors"
                    >
                      +R5 Flat rate
                    </button>
                    <button
                      type="button"
                      onClick={() => adjustAllPricesByFlatAmount(-5)}
                      className="px-2.5 py-1.5 bg-accent-gold/10 hover:bg-accent-gold text-accent-gold hover:text-studio-navy font-mono text-[10.5px] rounded border border-accent-gold/20 font-semibold transition-colors"
                    >
                      -R5 Flat rate
                    </button>
                  </div>
                </div>

                {/* Individual services table list with price state updater inputs */}
                <div className="space-y-3 max-h-[460px] overflow-y-auto scrollbar-thin pr-2">
                  {services.map((service) => (
                    <div key={service.id} className="p-3.5 bg-ink-navy/60 rounded-xl border border-white/5 flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono uppercase bg-white/5 text-warm-cream/50 px-2 py-0.5 rounded border border-white/5 font-semibold">{service.category}</span>
                        <h4 className="font-sans font-semibold text-xs text-white pt-1">{service.name}</h4>
                        <p className="text-[10.5px] text-warm-cream/50 font-mono text-accent-gold capitalize">Type: {service.priceType.replace("_", " ")}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Interactive Pricing History Tooltip */}
                        <div className="relative group/pricehistory">
                          <button
                            type="button"
                            className="p-1.5 bg-white/5 hover:bg-accent-gold/15 hover:text-accent-gold text-warm-cream/45 rounded-lg border border-white/5 transition-all"
                            title="View Pricing History"
                          >
                            <History className="w-3.5 h-3.5" />
                          </button>
                          
                          {/* Rich Floating Dropup Layer */}
                          <div className="absolute right-0 bottom-full mb-2.5 w-60 bg-[#1E2139] border border-white/10 p-3.5 rounded-2xl shadow-2xl scale-0 group-hover/pricehistory:scale-100 transition-all duration-200 origin-bottom-right z-50 text-[10.5px] space-y-2.5 pointer-events-none">
                            <div className="font-serif font-bold text-white border-b border-white/10 pb-1.5 flex items-center gap-1.5">
                              <History className="w-3.5 h-3.5 text-accent-gold" />
                              <span>Tariff Change Logs (Last 3)</span>
                            </div>
                            {(!service.priceHistory || service.priceHistory.length === 0) ? (
                              <div className="text-warm-cream/50 italic py-1 font-mono text-[9.5px] leading-tight">
                                No session adjustments recorded. Use the rate input or bulk tools to trigger live updates!
                              </div>
                            ) : (
                              <div className="space-y-2 font-mono text-[10px]">
                                {service.priceHistory.map((h, i) => {
                                  const diff = h.newPrice - h.oldPrice;
                                  const offsetColor = diff >= 0 ? "text-success-green" : "text-coral-pop";
                                  const offsetSign = diff >= 0 ? "+" : "";
                                  return (
                                    <div key={i} className="flex flex-col border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                                      <div className="flex justify-between items-center font-bold">
                                        <span className="text-white">R{h.oldPrice} &rarr; R{h.newPrice}</span>
                                        <span className={`${offsetColor} text-[9px] bg-white/5 px-1.5 py-0.5 rounded border border-white/5`}>
                                          {offsetSign}R{diff}
                                        </span>
                                      </div>
                                      <span className="text-[8.5px] text-warm-cream/45 italic">{h.date}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>

                        <span className="text-xs font-mono text-warm-cream/75">ZAR R</span>
                        <input
                          type="number"
                          min={1}
                          max={5000}
                          value={service.price}
                          onChange={(e) => handlePriceChange(service.id, Math.max(1, Number(e.target.value)))}
                          className="w-16 bg-studio-navy border border-white/10 rounded-lg py-1 px-2 text-center text-xs font-bold font-mono text-accent-gold outline-none focus:border-accent-gold placeholder-white/30"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Contact Coordinates Form */}
              <div className="bg-[#1C1F32] p-6 rounded-2xl border border-white/5 space-y-6">
                <div className="border-b border-white/5 pb-4">
                  <span className="text-xs font-mono text-accent-gold uppercase tracking-wider block font-bold">CONTACT & HOUR COORDS</span>
                  <h3 className="font-serif text-lg font-bold text-white">Adjust Contact and Operating Coordinates</h3>
                  <p className="text-[11px] text-warm-cream/60">Manage direct location strings, official support inbox, phone channels, and dynamic operating hours lists.</p>
                </div>

                <form onSubmit={handleUpdateContactDetails} className="space-y-4 text-xs">
                  
                   <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-mono text-warm-cream/60 font-semibold">Physical Location Address</label>
                      <span className="text-[10px] text-accent-gold font-mono">Presets below</span>
                    </div>
                    <textarea
                      rows={2}
                      required
                      value={localContact.address}
                      onChange={(e) => setLocalContact({ ...localContact, address: e.target.value })}
                      className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-accent-gold font-sans"
                    />
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <button
                        type="button"
                        onClick={() => setLocalContact({ ...localContact, address: "Suite 404, The Media Quarter, Somerset Road, De Waterkant, Cape Town, 8001" })}
                        className="px-2 py-0.5 bg-white/5 border border-white/5 hover:bg-accent-gold/10 hover:text-accent-gold text-[9.5px] font-mono rounded"
                      >
                        De Waterkant HQ
                      </button>
                      <button
                        type="button"
                        onClick={() => setLocalContact({ ...localContact, address: "Ground Floor, Workshop 17, Watershed, V&A Waterfront, Cape Town, 8002" })}
                        className="px-2 py-0.5 bg-white/5 border border-white/5 hover:bg-accent-gold/10 hover:text-accent-gold text-[9.5px] font-mono rounded"
                      >
                        V&A Waterfront Hub
                      </button>
                      <button
                        type="button"
                        onClick={() => setLocalContact({ ...localContact, address: "A36, The Old Biscuit Mill, 375 Albert Road, Woodstock, Cape Town, 7925" })}
                        className="px-2 py-0.5 bg-white/5 border border-white/5 hover:bg-accent-gold/10 hover:text-accent-gold text-[9.5px] font-mono rounded"
                      >
                        Woodstock Biscuit Mill
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-warm-cream/60 font-semibold">Official Email Support Address</label>
                      <input
                        type="email"
                        required
                        value={localContact.email}
                        onChange={(e) => setLocalContact({ ...localContact, email: e.target.value })}
                        className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-accent-gold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-warm-cream/60 font-semibold">Phone Hotline Channel</label>
                      <input
                        type="text"
                        required
                        value={localContact.phone}
                        onChange={(e) => setLocalContact({ ...localContact, phone: e.target.value })}
                        className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-accent-gold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-warm-cream/60 font-semibold">WhatsApp Support Number (For Click-to-Chat Link)</label>
                    <input
                      type="text"
                      required
                      placeholder="+27 71 000 0000"
                      value={localContact.whatsapp}
                      onChange={(e) => setLocalContact({ ...localContact, whatsapp: e.target.value })}
                      className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs font-mono text-white outline-none focus:border-accent-gold"
                    />
                    <span className="text-[9px] text-warm-cream/40 leading-none">Format with country code (e.g. +27 71 000 0000) for clean links.</span>
                  </div>

                  {/* Formspree & Payment Integration Setup */}
                  <div className="border-t border-white/5 pt-4 space-y-3">
                    <span className="text-[10px] font-mono text-accent-gold uppercase tracking-wide block font-semibold">Live Integration Configs (Formspree & Payments)</span>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-warm-cream/60 font-semibold">Formspree Form ID or Action URL</label>
                      <input
                        type="text"
                        required
                        value={localContact.formspreeId || ""}
                        onChange={(e) => setLocalContact({ ...localContact, formspreeId: e.target.value })}
                        className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-accent-gold font-mono"
                        placeholder="e.g. xjgzlrrg"
                      />
                      <span className="text-[9px] text-warm-cream/40 leading-none">Your bookings will post live metadata here to email you instantly! Currently configured to: <strong>{localContact.formspreeId || "xjgzlrrg"}</strong></span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-warm-cream/60 font-semibold">Active Settlement Gateway Mode</label>
                      <select
                        value={localContact.paymentGateway || "PayFast Sandbox"}
                        onChange={(e) => setLocalContact({ ...localContact, paymentGateway: e.target.value as any })}
                        className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-accent-gold cursor-pointer"
                      >
                        <option value="Direct EFT / Cash Hold">Direct EFT / Cash Hold Only</option>
                        <option value="PayFast Sandbox">PayFast Sandbox (Test Cards accepted)</option>
                        <option value="PayFast Live">PayFast Live (Active South African gateway)</option>
                      </select>
                    </div>

                    {localContact.paymentGateway && localContact.paymentGateway.includes("PayFast") && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-ink-navy/40 p-3.5 rounded-xl border border-white/5">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-warm-cream/60 font-semibold">PayFast Merchant ID</label>
                          <input
                            type="text"
                            required
                            value={localContact.payfastMerchantId || ""}
                            onChange={(e) => setLocalContact({ ...localContact, payfastMerchantId: e.target.value })}
                            className="w-full bg-studio-navy border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-accent-gold font-mono"
                            placeholder="e.g. 10000100"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-warm-cream/60 font-semibold">PayFast Merchant Key</label>
                          <input
                            type="text"
                            required
                            value={localContact.payfastMerchantKey || ""}
                            onChange={(e) => setLocalContact({ ...localContact, payfastMerchantKey: e.target.value })}
                            className="w-full bg-studio-navy border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-accent-gold font-mono"
                            placeholder="e.g. 46f0z6386qr72"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Op hours subsets */}
                  <div className="border-t border-white/5 pt-4 space-y-3">
                    <span className="text-[10px] font-mono text-accent-gold uppercase tracking-wide block font-semibold">Configure Access Hours Text</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-warm-cream/60 font-semibold">Monday - Thursday</label>
                        <input
                          type="text"
                          required
                          value={localContact.monThuHours}
                          onChange={(e) => setLocalContact({ ...localContact, monThuHours: e.target.value })}
                          className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-accent-gold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-warm-cream/60 font-semibold">Friday (Late Access)</label>
                        <input
                          type="text"
                          required
                          value={localContact.friHours}
                          onChange={(e) => setLocalContact({ ...localContact, friHours: e.target.value })}
                          className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-accent-gold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-warm-cream/60 font-semibold">Saturday Hours</label>
                        <input
                          type="text"
                          required
                          value={localContact.satHours}
                          onChange={(e) => setLocalContact({ ...localContact, satHours: e.target.value })}
                          className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-accent-gold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-warm-cream/60 font-semibold">Sunday Hours</label>
                        <input
                          type="text"
                          required
                          value={localContact.sunHours}
                          onChange={(e) => setLocalContact({ ...localContact, sunHours: e.target.value })}
                          className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-accent-gold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-accent-gold text-studio-navy hover:bg-[#e0b430] font-bold text-xs uppercase tracking-wider transition-colors shadow-lg hover:shadow-accent-gold/25 cursor-pointer"
                    >
                      Update Hub Contact Settings
                    </button>
                  </div>

                </form>
              </div>

            </div>
          </div>
        )}

        {/* ================= TAB 7: TEAM MEMBERS MANAGEMENT ================= */}
        {activeTab === "team" && (
          <div className="space-y-6 animate-fade-in text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Form to Add a New Team Member */}
              <div className="lg:col-span-4 bg-[#1C1F32] p-6 rounded-2xl border border-white/5 space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-accent-gold uppercase tracking-wider block">HUMAN RESOURCES</span>
                  <h3 className="font-serif text-lg font-bold text-white">Add Team Specialist</h3>
                  <p className="text-xs text-warm-cream/60">Introduce dry-lab operators, print technicians, or layout experts.</p>
                </div>

                <form onSubmit={handleAddTeamMember} className="space-y-3.5 text-xs pt-2">
                  <div className="space-y-1">
                    <label className="font-mono text-warm-cream/60 font-semibold">Specialist Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sipho Dube"
                      value={newTeamMember.name}
                      onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
                      className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-accent-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-warm-cream/60 font-semibold">Professional Role / Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Heavy Duty Press Technician"
                      value={newTeamMember.role}
                      onChange={(e) => setNewTeamMember({ ...newTeamMember, role: e.target.value })}
                      className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-accent-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-warm-cream/60 font-semibold">Avatar Monogram Initials (Optional)</label>
                    <input
                      type="text"
                      maxLength={3}
                      placeholder="e.g. SD"
                      value={newTeamMember.avatar}
                      onChange={(e) => setNewTeamMember({ ...newTeamMember, avatar: e.target.value.toUpperCase() })}
                      className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-accent-gold font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-warm-cream/60 font-semibold">Professional Bio & Experience Story</label>
                    <textarea
                      rows={4}
                      placeholder="Highlight primary software suite fluencies, rig run-times, or typical station service turnaround durations."
                      value={newTeamMember.desc}
                      onChange={(e) => setNewTeamMember({ ...newTeamMember, desc: e.target.value })}
                      className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white outline-none focus:border-accent-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-accent-gold text-studio-navy hover:bg-[#e0b430] font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Register New Specialist</span>
                  </button>
                </form>
              </div>

              {/* Box 2: Edit Team List Grid */}
              <div className="lg:col-span-8 bg-[#1C1F32] p-6 rounded-2xl border border-white/5 space-y-4">
                <div className="space-y-1 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-mono text-[#C3B1E1] uppercase tracking-wider block">STUDIO EXPERTS & OPERATORS</span>
                    <h3 className="font-serif text-lg font-bold text-white">Dynamic Staff Directory Panel</h3>
                    <p className="text-xs text-warm-cream/60">Inline modify active staff descriptions, update roles, or delete members entirely.</p>
                  </div>
                  <span className="px-2.5 py-1 bg-white/5 border border-white/5 rounded text-xs font-mono font-bold text-accent-gold shrink-0">
                    {team.length} Registered
                  </span>
                </div>

                {team.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl space-y-2">
                    <p className="text-sm font-medium text-warm-cream/60">No specialist accounts registered in this applet.</p>
                    <p className="text-xs text-warm-cream/45">Use the left form to inject dynamic staff logs into your custom About page.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {team.map((member) => (
                      <div key={member.id} className="bg-ink-navy/40 p-4 rounded-xl border border-white/5 space-y-3.5 relative">
                        
                        {/* Top corner Delete Button */}
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Are you sure you want to remove ${member.name} from the active staff catalog?`)) {
                              handleDeleteTeamMember(member.id);
                            }
                          }}
                          className="absolute top-4 right-4 p-1.5 hover:bg-coral-pop/20 text-warm-cream/45 hover:text-coral-pop rounded-lg border border-transparent hover:border-coral-pop/10 transition-colors cursor-pointer"
                          title="Remove Team Member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-accent-gold/10 border border-accent-gold/25 flex items-center justify-center font-mono font-bold text-sm text-accent-gold shrink-0">
                            {member.avatar || "ST"}
                          </div>
                          <div className="text-left flex-1 min-w-0 pr-8">
                            <input
                              type="text"
                              value={member.name}
                              onChange={(e) => handleUpdateTeamMember(member.id, { name: e.target.value })}
                              className="w-full bg-transparent border-0 border-b border-transparent focus:border-accent-gold pb-0.5 text-xs text-white font-serif font-bold focus:outline-none"
                              placeholder="Name"
                            />
                            <input
                              type="text"
                              value={member.role}
                              onChange={(e) => handleUpdateTeamMember(member.id, { role: e.target.value })}
                              className="w-full bg-transparent border-0 border-b border-transparent focus:border-accent-gold text-[10px] text-accent-gold font-mono focus:outline-none"
                              placeholder="Role"
                            />
                          </div>
                        </div>

                        <div className="space-y-1 text-left">
                          <label className="text-[9px] font-mono text-warm-cream/45 uppercase">Biography & Station Mastery</label>
                          <textarea
                            rows={3}
                            value={member.desc}
                            onChange={(e) => handleUpdateTeamMember(member.id, { desc: e.target.value })}
                            className="w-full bg-ink-navy/60 border border-white/5 rounded-lg p-2 text-[11px] text-warm-cream/80 outline-none focus:border-accent-gold/45 text-left leading-relaxed font-sans"
                            placeholder="Biography"
                          />
                        </div>

                        <div className="flex justify-between items-center text-[9px] text-warm-cream/35 border-t border-white/5 pt-2">
                          <span className="font-mono">ID: {member.id}</span>
                          <span className="text-success-green flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>Live Synced</span>
                          </span>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
