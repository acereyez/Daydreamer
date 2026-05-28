import { useState, useMemo } from "react";
import { 
  Monitor, GraduationCap, CalendarRange, Palette, Layers, Contact, Sparkles, 
  History, Camera, PenTool, Printer, Video, FileText, Usb, Search, 
  ArrowUpDown, Clock, CheckCircle2, Mic, Scissors, UserSquare, Compass, 
  Image, Film, HelpCircle, CloudLightning, ChevronRight
} from "lucide-react";
import { Service, ServiceCategory } from "../types";

// Keep ICON_MAP aligned
const ICON_MAP: Record<string, any> = {
  Monitor, GraduationCap, CalendarRange, Palette, Layers, Contact, Sparkles, 
  History, Camera, PenTool, Printer, Video, FileText, Usb, Mic, Scissors, 
  UserSquare, Compass, Image, Film, HelpCircle, CloudLightning
};

interface ServicesProps {
  services: Service[];
  setRoute: (route: string) => void;
  setBookingServiceId: (id: string | null) => void;
}

export default function Services({ 
  services, 
  setRoute, 
  setBookingServiceId 
}: ServicesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("popular");

  const categories = ["All", ...Object.values(ServiceCategory)];

  const sortedAndFilteredServices = useMemo(() => {
    let result = [...services];

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter(s => s.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.name.toLowerCase().includes(query) || 
        s.description.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popular") {
      result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [services, selectedCategory, searchQuery, sortBy]);

  const handleBookNow = (serviceId: string) => {
    setBookingServiceId(serviceId);
    setRoute("booking");
  };

  return (
    <div className="min-h-screen bg-warm-cream dark:bg-surface-darker text-studio-navy dark:text-warm-cream transition-colors duration-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center md:text-left space-y-2 max-w-2xl">
          <span className="text-xs font-mono tracking-widest text-accent-gold dark:text-accent-gold/80 uppercase">Daydreamer and Sons Service Desk</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-white light:text-studio-navy">
            Our Service Catalog
          </h1>
          <p className="text-xs sm:text-sm text-warm-cream/70 light:text-studio-navy/80">
            Explore transparent pricing, estimated processing durations, and select the key digital crafts tailored for your current goals.
          </p>
        </div>

        {/* Sticky Filters, Search & Sort Control Panel */}
        <div className="bg-surface-dark/90 light:bg-white p-4 rounded-2xl border border-white/5 light:border-black/5 backdrop-blur-md sticky top-18 z-40 shadow-xl space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-warm-cream/40 light:text-studio-navy/40">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search services (e.g. logo, passport prints)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-ink-navy/60 light:bg-surface-neutral-light border border-white/10 light:border-black/10 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-warm-cream light:text-studio-navy outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-warm-cream/50 light:text-studio-navy/50 flex items-center gap-1 shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5" /> Sort by
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-ink-navy/60 light:bg-surface-neutral-light border border-white/10 light:border-black/10 text-xs font-mono rounded-xl px-3 py-2 text-warm-cream light:text-studio-navy outline-none focus:border-accent-gold transition-all cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low &rarr; High</option>
                <option value="price-high">Price: High &rarr; Low</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Categories Tab Bar */}
          <div className="overflow-x-auto scrollbar-thin">
            <div className="flex gap-1.5 pb-2 min-w-max">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium font-sans tracking-wide transition-all uppercase ${
                      isActive
                        ? "bg-accent-gold text-studio-navy font-bold shadow-md"
                        : "bg-ink-navy/40 light:bg-surface-neutral-light border border-white/5 light:border-black/5 text-warm-cream/70 light:text-studio-navy/70 hover:bg-white/5"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Services Results Grid */}
        {sortedAndFilteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAndFilteredServices.map((service) => {
              const IconComp = ICON_MAP[service.icon] || Palette;
              return (
                <div 
                  key={service.id}
                  className="group bg-[#1B1E32]/70 light:bg-white border border-white/5 light:border-black/5 rounded-2xl p-6 hover:border-accent-gold/40 transition-all flex flex-col justify-between hover:shadow-2xl"
                >
                  <div className="space-y-4">
                    {/* Upper row */}
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-accent-gold/10 text-accent-gold flex items-center justify-center group-hover:bg-accent-gold group-hover:text-studio-navy transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="flex gap-1">
                        <span className="text-[9px] font-mono tracking-wide bg-surface-dark dark:bg-surface-dark light:bg-surface-neutral-light text-accent-gold px-2 py-0.5 rounded-full border border-white/5">
                          {service.category}
                        </span>
                        {service.popular && (
                          <span className="text-[9px] font-mono tracking-wide bg-accent-gold/20 text-accent-gold px-2 py-0.5 rounded-full border border-accent-gold/30 uppercase">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="space-y-2">
                      <h3 className="font-serif text-lg font-bold text-white light:text-studio-navy group-hover:text-accent-gold transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-xs text-warm-cream/65 light:text-studio-navy/70 leading-relaxed min-h-[40px]">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Pricing and book action */}
                  <div className="mt-8 pt-4 border-t border-white/5 light:border-black/5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-warm-cream/40 light:text-studio-navy/40 uppercase">Est. Cost</span>
                      <span className="text-md font-serif font-bold text-accent-gold">
                        {service.priceType === "starting" ? "from " : ""}
                        R{service.price}
                        <span className="text-[10px] text-warm-cream/40 light:text-studio-navy/40 font-mono font-normal">
                          {service.priceType === "per_hour" ? "/hr" : service.priceType === "per_page" ? "/page" : ""}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-warm-cream/50 light:text-studio-navy/50 flex items-center gap-1 leading-none shrink-0 bg-white/5 light:bg-black/5 px-2 py-1 rounded">
                        <Clock className="w-3 h-3 text-accent-gold" /> {service.duration}
                      </span>
                      <button
                        onClick={() => handleBookNow(service.id)}
                        className="px-4 py-2 rounded-lg bg-accent-gold hover:bg-[#e0b430] text-studio-navy font-bold text-xs transition-colors shrink-0"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface-dark light:bg-white rounded-2xl border border-white/5 space-y-4">
            <p className="text-2xl">🔍</p>
            <h3 className="font-serif text-lg font-semibold text-white light:text-studio-navy">No match found</h3>
            <p className="text-xs text-warm-cream/65 max-w-sm mx-auto">
              We couldn&#39;t locate any digital service matching &ldquo;{searchQuery}&rdquo;. Try another search term or click &ldquo;All&rdquo; above.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-4 py-2 rounded bg-accent-gold text-studio-navy font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Government applications notification footer */}
        <div className="bg-gradient-to-r from-soft-lavender/5 to-accent-gold/5 border border-white/5 light:border-black/5 p-6 rounded-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <span className="text-3xl">💡</span>
          <div className="space-y-1">
            <h4 className="font-serif font-semibold text-white light:text-studio-navy">Need help with Official CVs or Online Government Portals?</h4>
            <p className="text-xs text-warm-cream/75 leading-relaxed">
              We offer comprehensive typing, document formatting, scanning, and file upload services to online job portals and department forms. Speak to our on-duty administrative assistant or choose one of our Office & Admin packages!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
