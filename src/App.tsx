import { useState, useEffect } from "react";
import { ArrowUp, ArrowLeft } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Services from "./components/Services";
import BookingFlow from "./components/BookingFlow";
import Gallery from "./components/Gallery";
import Pricing from "./components/Pricing";
import Blog from "./components/Blog";
import About from "./components/About";
import Contact from "./components/Contact";
import Account from "./components/Account";
import Admin from "./components/Admin";

import { 
  INITIAL_SERVICES, INITIAL_PORTFOLIO, INITIAL_BLOGS, 
  INITIAL_PROMOTIONS, INITIAL_BOOKINGS, INITIAL_CONTACT_DETAILS,
  INITIAL_TEAM
} from "./data/mockData";
import { Booking, Service, PortfolioItem, BlogPost, Promotion, ContactDetails, TeamMember } from "./types";

export default function App() {
  // Navigation with history trace
  const [route, setRouteInternal] = useState<string>("home");
  const [routeHistory, setRouteHistory] = useState<string[]>([]);
  
  const setRoute = (newRoute: string) => {
    if (newRoute !== route) {
      setRouteHistory(prev => [...prev, route]);
      setRouteInternal(newRoute);
    }
  };

  const handleGoBack = () => {
    if (routeHistory.length > 0) {
      const prev = routeHistory[routeHistory.length - 1];
      setRouteHistory(prevList => prevList.slice(0, -1));
      setRouteInternal(prev);
    } else {
      setRouteInternal("home");
    }
  };

  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // High fidelity selection state to pre-select items in the booking step wizard
  const [bookingServiceId, setBookingServiceId] = useState<string | null>(null);

  // Theme Sync
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("dd-dark-mode");
    return saved === null ? true : saved === "true"; // Default to dark cozy mode
  });

  // Database States
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem("dd-services-list");
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [promotions, setPromotions] = useState<Promotion[]>(INITIAL_PROMOTIONS);
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem("dd-bookings-list");
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });
  const [contactDetails, setContactDetails] = useState<ContactDetails>(() => {
    const saved = localStorage.getItem("dd-contact-details");
    return saved ? JSON.parse(saved) : INITIAL_CONTACT_DETAILS;
  });
  const [team, setTeam] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem("dd-team-list");
    return saved ? JSON.parse(saved) : INITIAL_TEAM;
  });

  // Capacity seats free state
  const [availableSeats, setAvailableSeats] = useState<number>(12);

  // Authenticated user
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; phone: string; isLoggedIn: boolean } | null>(() => {
    const saved = localStorage.getItem("dd-current-user");
    return saved ? JSON.parse(saved) : { name: "Thabo Nkosi", email: "thabo.nkosi@gmail.com", phone: "+27 71 504 3211", isLoggedIn: true }; // Default mock logged in thabo
  });

  // Synchronise dark mode class tags
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    localStorage.setItem("dd-dark-mode", String(darkMode));
  }, [darkMode]);

  // Sync bookings data cache
  useEffect(() => {
    localStorage.setItem("dd-bookings-list", JSON.stringify(bookings));
  }, [bookings]);

  // Sync services cache
  useEffect(() => {
    localStorage.setItem("dd-services-list", JSON.stringify(services));
  }, [services]);

  // Sync contact details cache
  useEffect(() => {
    localStorage.setItem("dd-contact-details", JSON.stringify(contactDetails));
  }, [contactDetails]);

  // Sync team cache
  useEffect(() => {
    localStorage.setItem("dd-team-list", JSON.stringify(team));
  }, [team]);

  // Sync user state
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("dd-current-user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("dd-current-user");
    }
  }, [currentUser]);

  // Add new booking
  const handleAddBooking = (bookingData: Omit<Booking, "id" | "status" | "createdAt">): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `DDR-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "Confirmed",
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [newBooking, ...prev]);
    // update seats count if hourly pc access was booked
    if (bookingData.serviceId === "srv-pc-hourly") {
      setAvailableSeats(prev => Math.max(0, prev - 1));
    }
    return newBooking;
  };

  // Cancel booking
  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => 
      prev.map(b => b.id === bookingId ? { ...b, status: "Cancelled" as const } : b)
    );
    // restore seat
    const canceledB = bookings.find(b => b.id === bookingId);
    if (canceledB && canceledB.serviceId === "srv-pc-hourly") {
      setAvailableSeats(prev => Math.min(16, prev + 1));
    }
  };

  // Auth actions
  const handleLogin = (name: string, email: string, phone: string) => {
    setCurrentUser({ name, email, phone, isLoggedIn: true });
  };

  const handleLogout = () => {
    setCurrentUser({ name: "", email: "", phone: "", isLoggedIn: false });
  };

  return (
    <div className="min-h-screen bg-warm-cream dark:bg-surface-darker transition-colors duration-300 flex flex-col justify-between text-studio-navy dark:text-warm-cream">
      
      {/* Dynamic Header navbar */}
      <Navbar 
        currentRoute={route} 
        setRoute={setRoute} 
        darkMode={darkMode} 
        toggleDarkMode={() => setDarkMode(!darkMode)}
        availableSeats={availableSeats}
      />

      {/* Main routing area */}
      <main className="flex-1">
        {route === "home" && (
          <Home 
            services={services} 
            portfolio={portfolio} 
            promotions={promotions}
            setRoute={setRoute}
            setBookingServiceId={setBookingServiceId}
            availableSeats={availableSeats}
            blogs={blogs}
          />
        )}

        {route === "services" && (
          <Services 
            services={services} 
            setRoute={setRoute}
            setBookingServiceId={setBookingServiceId}
          />
        )}

        {route === "booking" && (
          <BookingFlow 
            services={services}
            promotions={promotions}
            bookedSlots={[]}
            onSubmitBooking={handleAddBooking}
            preselectedServiceId={bookingServiceId}
            setBookingServiceId={setBookingServiceId}
            contactDetails={contactDetails}
          />
        )}

        {route === "gallery" && (
          <Gallery 
            portfolio={portfolio} 
            setRoute={setRoute} 
            setBookingServiceId={setBookingServiceId}
          />
        )}

        {route === "pricing" && (
          <Pricing 
            setRoute={setRoute} 
            setBookingServiceId={setBookingServiceId}
            services={services}
          />
        )}

        {route === "blog" && (
          <Blog blogs={blogs} />
        )}

        {route === "about" && (
          <About team={team} />
        )}

        {route === "contact" && (
          <Contact contactDetails={contactDetails} />
        )}

        {route === "account" && (
          <Account 
            bookings={bookings}
            onCancelBooking={handleCancelBooking}
            currentUser={currentUser}
            onLogin={handleLogin}
            onLogout={handleLogout}
            setRoute={setRoute}
          />
        )}

        {route === "admin" && (
          <Admin 
            bookings={bookings}
            portfolio={portfolio}
            blogs={blogs}
            promotions={promotions}
            services={services}
            contactDetails={contactDetails}
            team={team}
            setBookings={setBookings}
            setPortfolio={setPortfolio}
            setBlogs={setBlogs}
            setPromotions={setPromotions}
            setServices={setServices}
            setContactDetails={setContactDetails}
            setTeam={setTeam}
            availableSeats={availableSeats}
            setAvailableSeats={setAvailableSeats}
          />
        )}
      </main>

      {/* Persistent global rich footer */}
      <Footer setRoute={setRoute} contactDetails={contactDetails} />

      {/* Dynamic Floating Action Stack (Back Button & Scroll-to-Top Button) */}
      <div className="fixed bottom-6 right-6 flex flex-col sm:flex-row gap-3 z-50 pb-[env(safe-area-inset-bottom)]">
        {/* Floating Back Navigation Button (visible if user has active history or is not on home) */}
        {route !== "home" && (
          <button
            onClick={handleGoBack}
            className="p-3.5 bg-[#1C1F32] text-warm-cream hover:text-accent-gold rounded-full border border-white/10 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center gap-1.5 focus:outline-none cursor-pointer"
            title="Back to previous page"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline text-xs font-mono font-medium pr-1">Back</span>
          </button>
        )}

        {/* Floating Scroll to Top button (reveals on scroll threshold) */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-3.5 bg-accent-gold text-studio-navy hover:bg-[#e0b430] hover:text-studio-navy font-bold rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center gap-1.5 focus:outline-none cursor-pointer animate-pulse"
            title="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 font-bold" />
            <span className="hidden sm:inline text-xs font-mono font-bold pr-1">Top</span>
          </button>
        )}
      </div>
    </div>
  );
}
