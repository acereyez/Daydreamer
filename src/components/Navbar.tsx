import { useState } from "react";
import { 
  Menu, X, Sun, Moon, Sparkles, Monitor, Palette, BookOpen, 
  User, Shield, MessageSquare, Briefcase, Calendar, Info, Phone
} from "lucide-react";

interface NavbarProps {
  currentRoute: string;
  setRoute: (route: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  availableSeats: number;
}

export default function Navbar({ 
  currentRoute, 
  setRoute, 
  darkMode, 
  toggleDarkMode,
  availableSeats
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Home", icon: Sparkles },
    { id: "services", label: "Services", icon: Palette },
    { id: "booking", label: "Book Session", icon: Calendar },
    { id: "gallery", label: "Portfolio", icon: Briefcase },
    { id: "pricing", label: "Pricing", icon: Monitor },
    { id: "blog", label: "Blog", icon: BookOpen },
    { id: "about", label: "About", icon: Info },
    { id: "contact", label: "Contact", icon: Phone },
    { id: "account", label: "My Account", icon: User },
    { id: "admin", label: "Admin", icon: Shield },
  ];

  const handleNavClick = (route: string) => {
    setRoute(route);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-ink-navy/90 dark:bg-ink-navy/90 light:bg-surface-neutral-light/95 backdrop-blur-md border-b border-white/5 light:border-black/5 text-warm-cream light:text-studio-navy transition-all">
      {/* Top micro promotion bar */}
      <div className="bg-gradient-to-r from-accent-gold/20 via-studio-navy to-accent-gold/20 light:from-accent-gold/40 light:to-accent-gold/30 text-center py-1.5 text-xs font-medium border-b border-accent-gold/10 flex items-center justify-center gap-2">
        <span className="inline-block bg-coral-pop text-white text-[9px] px-1 rounded-sm uppercase font-mono animate-pulse">PROMO</span>
        <span>🎓 Student Special — 20% off workstation sessions this week with code <strong className="font-mono text-accent-gold dark:text-accent-gold light:text-studio-navy selection:bg-accent-gold">STUDENT20</strong></span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo element */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => handleNavClick("home")}
          >
            <div className="w-9 h-9 rounded-full bg-surface-dark dark:bg-surface-dark light:bg-white border border-accent-gold/40 flex items-center justify-center shadow-lg group-hover:border-accent-gold transition-colors">
              <span className="text-xl">☕</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-xl tracking-tight font-semibold text-white light:text-studio-navy group-hover:text-accent-gold transition-colors">Daydreamer and Sons</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold"></span>
              </div>
              <p className="text-[10px] font-mono tracking-widest text-accent-gold light:text-studio-navy/70 uppercase">Creative Hub & Cafe</p>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentRoute === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-wide flex items-center gap-1.5 transition-all outline-none ${
                    isActive 
                      ? "bg-accent-gold/15 border-b-[2px] border-accent-gold text-accent-gold font-semibold"
                      : "text-warm-cream/80 light:text-studio-navy/80 hover:text-accent-gold hover:bg-white/5 light:hover:bg-black/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3">
            {/* Live Status Badge */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono bg-[#1E261E] light:bg-[#E8F5E9] border border-[#2E5E35]/40 text-success-green px-2.5 py-1 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success-green"></span>
              </span>
              <span>Open &bull; {availableSeats} Seats Free</span>
            </div>

            {/* Light/Dark Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-white/10 light:hover:bg-black/5 text-accent-gold transition-colors"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-white/10 light:hover:bg-black/5 text-warm-cream light:text-studio-navy transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-darker light:bg-surface-neutral-light border-b border-white/5 light:border-black/5 py-4 px-2 space-y-1 transform origin-top transition-all">
          <div className="px-3 pb-3 border-b border-white/5 light:border-black/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success-green"></span>
              </span>
              <span className="text-xs font-mono text-success-green">Cafe Live &bull; {availableSeats} Workstations Available</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1 pt-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentRoute === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`p-3 rounded-lg text-xs font-medium flex flex-col items-center justify-center gap-2 border text-center transition-all ${
                    isActive
                      ? "bg-accent-gold/15 border-accent-gold text-accent-gold"
                      : "bg-surface-dark/40 light:bg-white/40 border-transparent text-warm-cream/80 light:text-studio-navy/80 hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
