import { useState, useEffect } from "react";
import { 
  Monitor, GraduationCap, CalendarRange, Palette, Layers, Contact, Sparkles, 
  History, Camera, PenTool, Printer, Video, FileText, Usb, ChevronRight, 
  ChevronLeft, Star, Clock, Laptop, ShieldCheck, Heart, ArrowRight,
  Mic, Scissors, UserSquare, Compass, Image, Film, HelpCircle, CloudLightning,
  Lightbulb, Quote
} from "lucide-react";
import { Service, PortfolioItem, Promotion, BlogPost } from "../types";
import { INITIAL_BLOGS } from "../data/mockData";

// Dynamic translation map for requested icons in data
const ICON_MAP: Record<string, any> = {
  Monitor, GraduationCap, CalendarRange, Palette, Layers, Contact, Sparkles, 
  History, Camera, PenTool, Printer, Video, FileText, Usb, Mic, Scissors, 
  UserSquare, Compass, Image, Film, HelpCircle, CloudLightning
};

interface HomeProps {
  services: Service[];
  portfolio: PortfolioItem[];
  promotions: Promotion[];
  setRoute: (route: string) => void;
  setBookingServiceId: (id: string | null) => void;
  availableSeats: number;
  blogs?: BlogPost[];
}

export default function Home({ 
  services, 
  portfolio, 
  promotions, 
  setRoute, 
  setBookingServiceId,
  availableSeats,
  blogs
}: HomeProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [tickerOffset, setTickerOffset] = useState(0);

  // New useState hook to fetch and keep a random blog insight
  const [creativeInsight, setCreativeInsight] = useState<BlogPost | null>(null);

  useEffect(() => {
    const dataSource = blogs && blogs.length > 0 ? blogs : INITIAL_BLOGS;
    if (dataSource && dataSource.length > 0) {
      const randomIndex = Math.floor(Math.random() * dataSource.length);
      setCreativeInsight(dataSource[randomIndex]);
    }
  }, [blogs]);

  const handleShuffleInsight = () => {
    const dataSource = blogs && blogs.length > 0 ? blogs : INITIAL_BLOGS;
    if (dataSource && dataSource.length > 1) {
      let nextIndex = Math.floor(Math.random() * dataSource.length);
      if (creativeInsight && dataSource[nextIndex].id === creativeInsight.id) {
        nextIndex = (nextIndex + 1) % dataSource.length;
      }
      setCreativeInsight(dataSource[nextIndex]);
    }
  };

  const testimonials = [
    {
      name: "Lerato D.",
      role: "Freelance Illustrator",
      stars: 5,
      avatar: "LD",
      text: "The sound-dampened meeting booth at Daydreamer was exactly what I needed for my high-stakes client pitches. Extremely fast fibre line and incredibly tasty brew!"
    },
    {
      name: "Stefan S.",
      role: "Engineering Student",
      stars: 5,
      avatar: "SS",
      text: "The student 4hr package is unbeatable of its kind. I printed my complete final design blueprints and scanned archives in 20 minutes with zero hassle. Truly my second home."
    },
    {
      name: "Naledi M.",
      role: "E-Commerce Start-up",
      stars: 5,
      avatar: "NM",
      text: "Had a vector logo created by the Daydreamer studio team for my small cosmetics brand is beautiful! High quality, professional response, and same-week turnaround. Fully recommend!"
    }
  ];

  const valuePillars = [
    {
      title: "Gigabit Fibre Connection",
      description: "Blazing fast upload and download speeds, fully uncapped. Perfect for uploading master files, digital assets, or joining streams.",
      icon: Laptop,
      color: "bg-accent-gold/10 text-accent-gold"
    },
    {
      title: "Premium Creative Desks",
      description: "Equipped with the complete Adobe Creative Suite (Photoshop, Illustrator, Premier) and professional high-res colour monitors.",
      icon: Palette,
      color: "bg-soft-lavender/10 text-soft-lavender"
    },
    {
      title: "Expert Studio Staff",
      description: "Need help scanning historic negatives, restoring old prints, formatting resumes, or converting video containers? We are on standby.",
      icon: Sparkles,
      color: "bg-success-green/10 text-success-green"
    },
    {
      title: "Laser Fast Turnaround",
      description: "Same-day creative output for logo designs, flyers, passport photos, laminating, document binding, and emergency prints.",
      icon: ShieldCheck,
      color: "bg-coral-pop/10 text-coral-pop"
    }
  ];

  const featuredServices = services.filter(s => s.popular).slice(0, 6);
  const featuredPortfolio = portfolio.filter(p => p.isFeatured).slice(0, 4);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleBookNow = (serviceId: string) => {
    setBookingServiceId(serviceId);
    setRoute("booking");
  };

  return (
    <div className="min-h-screen bg-ink-navy text-warm-cream transition-colors duration-300 light:bg-surface-light light:text-studio-navy">
      
      {/* 1. Hero Section & Gradient Textures */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 px-4 overflow-hidden grain-texture">
        {/* Soft floating cosmic aura grids */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-accent-gold/8 dark:bg-accent-gold/8 light:bg-accent-gold/10 filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-soft-lavender/8 dark:bg-soft-lavender/8 light:bg-soft-lavender/15 filter blur-[120px] animation-delay-3000"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          
          {/* DAILY CREATIVE INSIGHT */}
          {creativeInsight && (
            <div className="mx-auto max-w-2xl bg-[#1C1F32] light:bg-white border border-accent-gold/20 p-5 rounded-2xl text-left space-y-3.5 relative overflow-hidden shadow-2xl transition-all hover:border-accent-gold/40 animate-fade-in">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 filter blur-3xl rounded-full pointer-events-none"></div>
              
              <div className="flex items-center justify-between gap-4 text-xs font-mono">
                <span className="flex items-center gap-2 text-accent-gold font-bold uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4 text-accent-gold animate-pulse" />
                  <span>Daily Creative Insight</span>
                </span>
                <span className="text-[10px] text-warm-cream/40 light:text-studio-navy/40 font-semibold px-2 py-0.5 rounded bg-white/5 border border-white/5">
                  {creativeInsight.category} &bull; {creativeInsight.readTime}
                </span>
              </div>
              
              <div className="space-y-1.5">
                <h4 className="font-serif text-sm font-bold text-white light:text-studio-navy">
                  &ldquo;{creativeInsight.title}&rdquo;
                </h4>
                <p className="text-xs text-warm-cream/75 light:text-studio-navy/85 italic font-serif leading-relaxed pl-3.5 border-l-2 border-accent-gold/30">
                  {creativeInsight.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-accent-gold/15 flex items-center justify-center text-[9px] font-bold text-accent-gold font-mono">
                    {creativeInsight.authorInitials || "ZD"}
                  </div>
                  <span className="text-[10px] text-warm-cream/50 light:text-studio-navy/65 font-medium">Shared by {creativeInsight.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShuffleInsight}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-white font-mono text-[10px] hover:text-accent-gold transition-all cursor-pointer"
                  >
                    Shuffle Insight
                  </button>
                  <button
                    onClick={() => setRoute("blog")}
                    className="px-2.5 py-1 rounded-lg bg-accent-gold text-studio-navy font-bold font-mono text-[10px] hover:bg-[#e0b430] transition-colors cursor-pointer"
                  >
                    Read Full Article
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Animated Float Pulse Availability Badge */}
          <div className="inline-flex items-center gap-2 bg-surface-dark light:bg-white border border-accent-gold/40 hover:border-accent-gold transition-colors px-4 py-2 rounded-full shadow-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-green opacity-70"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success-green"></span>
            </span>
            <span className="text-xs font-mono tracking-wide text-warm-cream light:text-studio-navy">
              Open Now &bull; <strong className="text-success-green">{availableSeats} Workspace Seats</strong> Free for Walk-ins
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-tight leading-tight max-w-4xl mx-auto dark:text-white light:text-studio-navy">
              Where <span className="italic text-accent-gold font-light">Original Ideas</span> Come to Life.
            </h1>
            <p className="text-md sm:text-xl text-warm-cream/70 light:text-studio-navy/80 font-sans max-w-2xl mx-auto leading-relaxed">
              Obsidians, creators, freelancers, and students: Welcome to Daydreamer and Sons, a cozy Cape Town internet café and fully-serviced digital core studio.
            </p>
          </div>

          {/* Actions Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setBookingServiceId(null);
                setRoute("booking");
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-accent-gold hover:bg-[#e0b430] text-studio-navy font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-accent-gold/20 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Book a Session</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setRoute("services")}
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-warm-cream/20 hover:border-accent-gold hover:bg-white/5 light:hover:bg-studio-navy/5 text-warm-cream light:text-studio-navy font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2"
            >
              Discover Service Catalog
            </button>
          </div>

          {/* Micro stats banner */}
          <div className="pt-8 border-t border-white/5 light:border-black/5 grid grid-cols-3 gap-4 max-w-lg mx-auto text-center">
            <div>
              <p className="text-xl sm:text-2xl font-serif font-semibold text-accent-gold">1Gbps</p>
              <p className="text-[10px] font-mono tracking-wider text-warm-cream/50 light:text-studio-navy/60 uppercase">Fibre Link</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-serif font-semibold text-white light:text-studio-navy">100%</p>
              <p className="text-[10px] font-mono tracking-wider text-warm-cream/50 light:text-studio-navy/60 uppercase">POPIA Secure</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-serif font-semibold text-soft-lavender">Adobe Pro</p>
              <p className="text-[10px] font-mono tracking-wider text-warm-cream/50 light:text-studio-navy/60 uppercase">Stations</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PC & Workstation Live Availability Widget */}
      <section className="bg-surface-darker light:bg-surface-neutral-light py-6 border-y border-white/5 light:border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-xs font-mono uppercase tracking-widest text-accent-gold">Current Status Overview</p>
            <h3 className="font-serif text-lg font-semibold text-white light:text-studio-navy">Live Studio Workstations</h3>
          </div>
          <div className="flex-1 max-w-md w-full">
            <div className="flex justify-between text-xs font-mono text-warm-cream/60 light:text-studio-navy/70 mb-1.5">
              <span>{availableSeats} available of 16 desks</span>
              <span className="font-semibold text-success-green">{(availableSeats/16*100).toFixed(0)}% available</span>
            </div>
            <div className="w-full h-3 bg-surface-dark rounded-full overflow-hidden border border-white/5 flex">
              {/* Green for active, gray for busy */}
              {Array.from({ length: 16 }).map((_, i) => {
                const isActive = i < availableSeats;
                return (
                  <div 
                    key={i} 
                    className={`h-full flex-1 border-r border-[#10101e]/60 last:border-0 ${
                      isActive ? "bg-success-green" : "bg-neutral-600/65"
                    }`}
                  />
                );
              })}
            </div>
          </div>
          <button
            onClick={() => {
              setBookingServiceId("srv-pc-hourly");
              setRoute("booking");
            }}
            className="px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 light:bg-studio-navy/5 text-xs font-mono tracking-wide text-accent-gold font-medium border border-accent-gold/20 flex items-center justify-center gap-2"
          >
            <span>Reserve PC Seat</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 3. Services Snapshot (Sliding horizontal container on desktop, vertical list on mobile) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 border-b border-white/5 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest text-accent-gold light:text-studio-navy/60 uppercase">STUDIO ESSENTIALS</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white light:text-studio-navy">
              Most Popular Creative Services
            </h2>
          </div>
          <button 
            onClick={() => setRoute("services")} 
            className="text-xs text-accent-gold font-mono tracking-wide hover:underline flex items-center gap-1 group"
          >
            <span>See entire service catalog</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => {
            const IconComp = ICON_MAP[service.icon] || Palette;
            return (
              <div 
                key={service.id} 
                className="group relative bg-surface-dark/80 light:bg-white border border-white/5 light:border-black/5 p-6 rounded-2xl hover:border-accent-gold/40 transition-all flex flex-col justify-between hover:shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-accent-gold/10 text-accent-gold flex items-center justify-center group-hover:bg-accent-gold group-hover:text-studio-navy transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    {service.popular && (
                      <span className="text-[9px] font-mono bg-accent-gold/20 text-accent-gold border border-accent-gold/30 px-2 py-0.5 rounded-full uppercase">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg font-semibold text-white light:text-studio-navy group-hover:text-accent-gold transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs text-warm-cream/65 light:text-studio-navy/70 leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 light:border-black/5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-accent-gold">
                    from R{service.price}
                    <span className="text-[10px] text-warm-cream/40 light:text-studio-navy/40 font-mono font-normal">
                      {service.priceType === "per_hour" ? "/hr" : service.priceType === "per_page" ? "/page" : ""}
                    </span>
                  </span>
                  <button
                    onClick={() => handleBookNow(service.id)}
                    className="px-4 py-2 rounded-lg bg-surface-dark dark:bg-surface-dark light:bg-surface-neutral-light hover:bg-accent-gold hover:text-studio-navy text-xs font-medium transition-all"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Why Daydreamer Section */}
      <section className="bg-surface-darker/60 light:bg-surface-neutral-light/50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono tracking-widest text-accent-gold light:text-studio-navy/60 uppercase">STUDIO ATTRIBUTES</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white light:text-studio-navy">
              Crafted Around Creators & Working Professionals
            </h2>
            <p className="text-sm text-warm-cream/65 light:text-studio-navy/70">
              We ditched sterile white lighting and old desk systems to engineer the ultimate workspace for your original goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuePillars.map((pillar, i) => {
              const PillarIcon = pillar.icon;
              return (
                <div 
                  key={i} 
                  className="bg-surface-dark light:bg-white p-6 rounded-2xl border border-white/5 light:border-black/5 hover:border-accent-gold/20 transition-all space-y-4"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pillar.color}`}>
                    <PillarIcon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-white light:text-studio-navy">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-warm-cream/65 light:text-studio-navy/70 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Portfolio Teaser Mosaic with Hover Reveal */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 border-b border-white/5 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest text-accent-gold light:text-studio-navy/50 uppercase">CREATIVE DESIGN CASE STUDIES</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white light:text-studio-navy">
              Owner Portfolio Showcase
            </h2>
          </div>
          <button 
            onClick={() => setRoute("gallery")} 
            className="text-xs text-accent-gold font-mono hover:underline flex items-center gap-1 group"
          >
            <span>Explore all showcase works</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mosaic Layout Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPortfolio.map((item) => (
            <div 
              key={item.id} 
              className="group relative h-80 rounded-2xl overflow-hidden border border-white/10 shadow-lg cursor-pointer"
              onClick={() => setRoute("gallery")}
            >
              {/* Image with Referrer Policy */}
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {/* Elegant Accent Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-navy via-ink-navy/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-6">
                <span className="text-[10px] font-mono text-accent-gold uppercase tracking-wider mb-2">
                  {item.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-white mb-2 leading-tight group-hover:text-accent-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-warm-cream/70 line-clamp-2 mb-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.toolsUsed.map((tool, index) => (
                    <span key={index} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. High Fidelity Testimonials Carousel */}
      <section className="bg-surface-darker/70 light:bg-surface-neutral-light/40 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-12 relative z-10 text-center">
          <span className="text-xs font-mono tracking-widest text-accent-gold uppercase">HEARD ON THE Observatory CHAT</span>

          <div className="relative min-h-[220px] flex items-center justify-center">
            {testimonials.map((t, idx) => {
              const isActive = idx === activeTestimonial;
              return (
                <div 
                  key={idx} 
                  className={`w-full transition-all duration-500 transform absolute ${
                    isActive ? "opacity-100 scale-100 relative pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                  } space-y-6`}
                >
                  <div className="flex justify-center gap-1 text-accent-gold">
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <Star key={s} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <blockquote className="font-serif text-xl sm:text-2xl italic text-white light:text-studio-navy leading-relaxed max-w-3xl mx-auto">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent-gold text-studio-navy font-bold flex items-center justify-center text-xs font-mono shadow-md">
                      {t.avatar}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-white light:text-studio-navy">{t.name}</p>
                      <p className="text-[10px] font-mono text-warm-cream/50 light:text-studio-navy/60 uppercase">{t.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indicators Buttons */}
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full border border-white/15 light:border-black/5 hover:border-accent-gold hover:bg-white/5 transition-colors text-warm-cream light:text-studio-navy"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === activeTestimonial ? "w-6 bg-accent-gold" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full border border-white/15 light:border-black/5 hover:border-accent-gold hover:bg-white/5 transition-colors text-warm-cream light:text-studio-navy"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. Bottom Promotional Callout Banner */}
      <section className="bg-gradient-to-r from-accent-gold/20 via-studio-navy to-accent-gold/20 py-16 text-center border-t border-white/5 text-warm-cream">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <span className="inline-block bg-coral-pop text-white text-[10px] px-2.5 py-1 rounded font-mono uppercase font-bold tracking-widest leading-none">
            Limited Time Deal
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-semibold dark:text-white light:text-studio-navy">
            Got an Emergency Designing Task?
          </h2>
          <p className="text-xs sm:text-sm text-warm-cream/70 max-w-xl mx-auto leading-relaxed">
            From vintage photo restorations up to bespoke banner vectors, our physical studio desk delivers premium high-fidelity output. Click below to secure a physical workspace or design slot and save 20% first-up!
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setBookingServiceId(null);
                setRoute("booking");
              }}
              className="px-8 py-3.5 rounded-full bg-accent-gold text-studio-navy hover:bg-[#e0b430] font-bold text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
            >
              Book My Working Slot
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
