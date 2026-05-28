import { useState } from "react";
import { Monitor, CreditCard, Sparkles, HelpCircle, ChevronRight, Calculator, FileText, Smartphone, Printer } from "lucide-react";
import { Service } from "../types";

interface PricingProps {
  setRoute: (route: string) => void;
  setBookingServiceId: (id: string | null) => void;
  services: Service[];
}

export default function Pricing({ setRoute, setBookingServiceId, services }: PricingProps) {
  const [activeTab, setActiveTab] = useState<"computing" | "creative" | "printing">("computing");

  const getDynamicPrice = (serviceId: string, defaultValue: number) => {
    const service = services.find(s => s.id === serviceId);
    return service ? `R${service.price}` : `R${defaultValue}`;
  };

  const computingTiers = [
    { name: "Standard PC Access", price: getDynamicPrice("srv-pc-hourly", 15), unit: "/ hour", desc: "High-speed browsing, email, and MS Office utilities.", features: ["1Gbps fiber internet link", "Standard web cam & mic", "Saves files directly to cloud", "Walk-ins friendly"] },
    { name: "Student Workstation Pass", price: getDynamicPrice("srv-pc-student", 45), unit: "/ 4 hours", desc: "Special discounted block for long research or writing tasks.", features: ["1Gbps fiber internet link", "Silent, focused environment", "Dedicated study space", "Student ID card required"], popular: true },
    { name: "Unlimited Day Pass", price: getDynamicPrice("srv-pc-fullday", 100), unit: "/ day", desc: "Ideal for coworking freelancers needing continuous uncapped uptime.", features: ["Uncapped 1Gbps fiber link", "Dual desktop monitor setups", "Free document scanner up to 5 pages", "Flexible desk switching"] },
    { name: "Soundproof Meeting Booth", price: getDynamicPrice("srv-booth", 30), unit: "/ hour", desc: "Equipped sound-dampened focus zone with full PC rigs.", features: ["100% audio isolation", "High fidelity microphone & ring light", "Dual digital screens", "Private zoom call setups"] }
  ];

  const creativeTiers = [
    { name: "Surgical Photoshop Retouch", price: `from ${getDynamicPrice("srv-ps-retouch", 60)}`, unit: "/ photo", desc: "Expert studio skin correction, editorial grading and restoration.", features: ["Pristine background removals", "Vintage tear reconstructions", "Biometric ID standards compliant", "Same-day photo files link"] },
    { name: "Dynamic Logo Design", price: `from ${getDynamicPrice("srv-ds-logo", 150)}`, unit: "/ project", desc: "Original brand visual identity crafted to custom client briefs.", features: ["Vector exports (.SVG, .AI)", "3 initial brand variants", "Dark & Light mode variations", "Complete copyright delivery"], popular: true },
    { name: "Bespoke Illustrator Vector Work", price: `from ${getDynamicPrice("srv-ai-vector", 200)}`, unit: "/ art", desc: "Scalable commercial illustrations, icon packs or typography.", features: ["Unlimited resolution file grids", "Transparent layers output", "Print-shop ready files", "Source files included"] },
    { name: "Complete Brand Identity Kit", price: `from ${getDynamicPrice("srv-ai-brandkit", 300)}`, unit: "/ kit", desc: "Full visual assets, logo variations, typography guides.", features: ["Bespoke Brand Book", "Letterhead & Envelope templates", "Social media banners & avatars", "Custom digital layout templates"] }
  ];

  const printingTiers = [
    { name: "B&W Standard Document", price: getDynamicPrice("srv-pr-bw", 2), unit: "/ page", desc: "High-speed monochrome document, draft, and legal form printing.", features: ["Premium 80gs paper stock", "Duplex double-sided options", "High-speed paper layout feed", "Sourced from cloud keys or USB"] },
    { name: "Colour Graphic Print", price: getDynamicPrice("srv-pr-col", 5), unit: "/ page", desc: "Vibrant full-bleed ink prints for CVs, artwork layouts, and reports.", features: ["Vivid precision high-density ink", "Smooth 100gsm matte prints", "Pristine alignment bounds", "Walk-in instantaneous processing"] },
    { name: "Glossy Archival Photo Quality", price: getDynamicPrice("srv-pr-photo", 15), unit: "/ page", desc: "Deep rich photographic replication designed to resist archival wear.", features: ["Premium 250gsm gloss heavy card", "High fidelity rich colors", "Borderless vector layouts", "Custom scan conversions included"], popular: true },
    { name: "Sleek Lamination & Binding", price: `from ${getDynamicPrice("srv-pr-lam", 20)}`, unit: "/ document", desc: "Hot thermal laminating sleeves and professional document book bindings.", features: ["150-micron heat lamination (R20)", "Frosted spiral coil binding (R35)", "Waterproof secure protective edges", "Perfect for legal certificates / guides"] }
  ];

  const packageDeals = [
    { name: "Daydreamer and Sons Startup Bundle", price: "R450", desc: "Get your business launched with pristine graphic alignment.", items: ["Custom Business Logo Design", "Printers-ready Business Card Layout", "2 Custom Social Media Announcement Templates"] },
    { name: "Observatory Print Bundle", price: "R120", desc: "Perfect bundle for academics, students, or legal scans.", items: ["50 High Speed B&W laser prints", "10 High-definition Colour prints", "Complete spiral binder & document lamination"] }
  ];

  const getActiveTiers = () => {
    if (activeTab === "computing") return computingTiers;
    if (activeTab === "creative") return creativeTiers;
    return printingTiers;
  };

  const handleBookNow = (serviceId: string) => {
    setBookingServiceId(serviceId);
    setRoute("booking");
  };

  return (
    <div className="min-h-screen bg-ink-navy text-warm-cream transition-colors duration-300 light:bg-surface-light light:text-studio-navy py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center md:text-left space-y-2 max-w-2xl">
          <span className="text-xs font-mono tracking-widest text-[#B3A1C1] light:text-studio-navy/60 uppercase">TRANSPARENT PRICING GRID</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-white light:text-studio-navy">Honest, Clear Pricing</h1>
          <p className="text-xs sm:text-sm text-warm-cream/70 light:text-studio-navy/80">
            No hidden core taxes or unexpected processing surcharges. We maintain highly transparent, human rates matching local Cape Town makers.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="flex gap-2 bg-surface-dark border border-white/5 p-1.5 rounded-2xl max-w-lg mx-auto sm:mx-0">
          {[
            { id: "computing", label: "Computing Desks", icon: Monitor },
            { id: "creative", label: "Creative Design", icon: Sparkles },
            { id: "printing", label: "Printing Catalog", icon: Printer }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all outline-none ${
                  isActive
                    ? "bg-accent-gold text-studio-navy font-bold shadow-md"
                    : "text-warm-cream/70 hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Tier Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {getActiveTiers().map((tier, idx) => (
            <div 
              key={idx}
              className={`flex flex-col justify-between p-6 bg-surface-dark/70 light:bg-white border rounded-2xl transition-all relative ${
                tier.popular 
                  ? "border-accent-gold shadow-accent-gold/5 shadow-2xl" 
                  : "border-white/5 light:border-black/5"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-widest font-bold bg-accent-gold text-studio-navy px-3 py-1 rounded-full uppercase">
                  Most Popular
                </span>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-white light:text-studio-navy">{tier.name}</h3>
                  <p className="text-xs text-warm-cream/60 light:text-studio-navy/60 leading-relaxed min-h-[36px]">{tier.desc}</p>
                </div>

                {/* Big Price numbers */}
                <div className="py-2 flex items-baseline gap-1 border-y border-white/5">
                  <span className="text-3xl font-serif font-bold text-accent-gold">{tier.price}</span>
                  <span className="text-[10px] text-warm-cream/40 font-mono font-normal">{tier.unit}</span>
                </div>

                {/* Features bulletins */}
                <ul className="space-y-2 text-[10.5px] text-warm-cream/85 light:text-studio-navy/80 font-sans">
                  {tier.features.map((feat, index) => (
                    <li key={index} className="flex items-start gap-1.5 leading-tight">
                      <span className="text-accent-gold shrink-0 mt-0.5">&bull;</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5">
                <button
                  onClick={() => handleBookNow(activeTab === "computing" ? "srv-pc-hourly" : activeTab === "creative" ? "srv-ds-logo" : "srv-pr-bw")}
                  className={`w-full py-2.5 rounded-lg font-bold text-xs transition-colors ${
                    tier.popular
                      ? "bg-accent-gold text-studio-navy hover:bg-[#e0b430]"
                      : "bg-surface-dark hover:bg-accent-gold hover:text-studio-navy text-accent-gold text-xs"
                  }`}
                >
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Commercial package deals bento layout */}
        <div className="space-y-6 pt-10 border-t border-white/5">
          <div className="space-y-1">
            <span className="text-xs font-mono text-accent-gold uppercase block">COMBO BUNDLE PACKAGES</span>
            <h2 className="font-serif text-2xl font-bold text-white light:text-studio-navy">Ultimate Start-up Bundle Offers</h2>
            <p className="text-xs text-warm-cream/60">Save up to 25% by bundling your layout design and photo prints together.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packageDeals.map((pack, idx) => (
              <div 
                key={idx}
                className="bg-surface-dark p-6 rounded-2xl border border-white/5 flex flex-col justify-between gap-6"
              >
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif text-lg font-bold text-white">{pack.name}</h3>
                    <span className="text-2xl font-serif font-semibold text-accent-gold">{pack.price}</span>
                  </div>
                  <p className="text-xs text-warm-cream/65">{pack.desc}</p>
                  
                  {/* Package breakdown list */}
                  <ul className="space-y-1.5 text-xs text-white/90 pt-3 border-t border-white/5 font-mono">
                    {pack.items.map((item, key) => (
                      <li key={key} className="flex items-center gap-2">
                        <span className="text-success-green">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => handleBookNow("srv-ai-brandkit")}
                    className="px-6 py-2.5 rounded-xl bg-accent-gold/15 border border-accent-gold text-accent-gold font-bold text-xs tracking-wide hover:bg-accent-gold hover:text-studio-navy transition-all"
                  >
                    Request Combo Placement
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick FAQ / Billing note */}
        <div className="p-6 rounded-2xl bg-surface-dark light:bg-white border border-white/5 text-xs space-y-3 max-w-4xl mx-auto text-left leading-relaxed">
          <h4 className="font-serif text-sm font-semibold text-white light:text-studio-navy flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-accent-gold" /> Frequently Asked Billing Inquiries
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <strong className="text-white">Are students always discounted?</strong>
              <p className="text-warm-cream/70">Yes. Submit an active student card and get 20% off all physical hourly PC seats instantly using code <strong>STUDENT20</strong>.</p>
            </div>
            <div className="space-y-1">
              <strong className="text-white">What payment gates are active?</strong>
              <p className="text-warm-cream/70">We support Visa, Mastercard, instant EFT transfers, and Cash settlements on-site at the principal reception counter in Observatory.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
