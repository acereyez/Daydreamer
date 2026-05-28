import { useState, useMemo } from "react";
import { 
  Filter, Sparkles, X, Palette, Calendar, ArrowRight, Monitor, PenTool, LayoutGrid 
} from "lucide-react";
import { PortfolioItem } from "../types";

interface GalleryProps {
  portfolio: PortfolioItem[];
  setRoute: (route: string) => void;
  setBookingServiceId: (id: string | null) => void;
}

export default function Gallery({ 
  portfolio, 
  setRoute, 
  setBookingServiceId 
}: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const categories = ["All", "Logos", "Flyers", "Photo Editing", "Illustrations", "Print Work", "Web Design"];

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return portfolio;
    return portfolio.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [portfolio, selectedCategory]);

  const handleBookService = (category: string) => {
    // Map portfolio category to service types
    let serviceId = "srv-ds-logo"; // Default logo design
    const lower = category.toLowerCase();
    
    if (lower.includes("photo")) serviceId = "srv-ps-retouch";
    else if (lower.includes("illustration")) serviceId = "srv-ai-vector";
    else if (lower.includes("flyer")) serviceId = "srv-ds-flyer";
    else if (lower.includes("print")) serviceId = "srv-pr-photo";
    else if (lower.includes("web") || lower.includes("layout")) serviceId = "srv-ai-brandkit";

    setBookingServiceId(serviceId);
    setActiveItem(null);
    setRoute("booking");
  };

  return (
    <div className="min-h-screen bg-ink-navy text-warm-cream transition-colors duration-300 light:bg-surface-light light:text-studio-navy py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center md:text-left space-y-2 max-w-2xl">
          <span className="text-xs font-mono tracking-widest text-[#B3A1C1] light:text-studio-navy/50 uppercase">STUDIO WORK SAMPLES</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-white light:text-studio-navy">Owner Creative Showcase</h1>
          <p className="text-xs sm:text-sm text-warm-cream/70 light:text-studio-navy/80">
            A curated grid of architectural logos, duotone flyers, retro photo restorations, and sleek vector identity systems completed physically at our Observatory desks.
          </p>
        </div>

        {/* Filter Categories Horizontal Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-4">
          <span className="text-xs font-mono text-warm-cream/50 pr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter Category
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                  isActive
                    ? "bg-accent-gold text-studio-navy font-bold"
                    : "bg-[#1E1F35] light:bg-white text-warm-cream/70 light:text-studio-navy/70 border border-white/5 hover:border-accent-gold/20"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Masonry / Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative h-96 rounded-2xl overflow-hidden border border-white/10 dark:border-white/10 light:border-black/5 hover:border-accent-gold/40 transition-all duration-300 shadow-xl cursor-pointer"
            >
              {/* Image with referrerPolicy */}
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Hover Dark Vignette Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-navy via-ink-navy/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-6">
                <span className="text-[10px] font-mono text-accent-gold uppercase tracking-wider mb-2 bg-[#1C1F32]/60 px-2 py-0.5 rounded-full w-max">
                  {item.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-white mb-2 leading-tight group-hover:text-accent-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-warm-cream/70 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-4">
                  {item.description}
                </p>
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-mono text-accent-gold flex items-center gap-1">
                    <span>View item details</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                  <div className="flex gap-1">
                    {item.toolsUsed.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[9px] font-mono bg-white/10 text-white px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Inspection Overlay Modal */}
        {activeItem && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-surface-dark borders border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative text-warm-cream">
              {/* Close Button */}
              <button 
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-neutral-800 transition-colors text-white z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col">
                {/* Hero visual */}
                <div className="h-64 sm:h-80 w-full relative">
                  <img 
                    src={activeItem.imageUrl} 
                    alt={activeItem.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[10px] font-mono bg-accent-gold text-studio-navy font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {activeItem.category}
                    </span>
                  </div>
                </div>

                {/* Info Text panel */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
                      {activeItem.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-warm-cream/80 leading-relaxed font-sans">
                      {activeItem.description}
                    </p>
                  </div>

                  {/* Tools used & credits */}
                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <span className="text-xs font-mono text-accent-gold uppercase block">Software & Process Tools</span>
                    <div className="flex flex-wrap gap-2">
                      {activeItem.toolsUsed.map((tool, index) => (
                        <span key={index} className="text-xs font-mono bg-ink-navy border border-white/10 px-3 py-1 rounded-lg text-white">
                          🔧 {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dedicated Action to pre-select in Booking flow */}
                  <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-left">
                      <p className="text-[10px] font-mono text-warm-cream/40 leading-none">Starting from</p>
                      <p className="text-xl font-serif font-bold text-accent-gold">R150 - R300</p>
                    </div>

                    <button
                      onClick={() => handleBookService(activeItem.category)}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-accent-gold hover:bg-[#e0b430] text-studio-navy font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Palette className="w-4 h-4 text-studio-navy" />
                      <span>Book similar creative service</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
