import { MapPin, Mail, Phone, Clock, MessageSquare, ShieldAlert, Sparkles } from "lucide-react";
import { ContactDetails } from "../types";

interface FooterProps {
  setRoute: (route: string) => void;
  contactDetails: ContactDetails;
}

export default function Footer({ setRoute, contactDetails }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink-navy border-t border-white/5 text-warm-cream py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Absolute faint background circle lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-gold/5 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-soft-lavender/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand/Tagline Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">☕</span>
              <span className="font-serif text-xl tracking-wide font-semibold text-white">Daydreamer and Sons</span>
            </div>
            <p className="text-sm text-warm-cream/65 leading-relaxed">
              Where Ideas Come to Life. A cozy premium creative studio & internet cafe powering students, freelancers, designers, and local business dreamers.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="text-[11px] font-mono px-2 py-1 rounded bg-surface-dark border border-white/10 text-accent-gold">
                🇿🇦 Cape Town, South Africa
              </span>
              <span className="text-[11px] font-mono px-2 py-1 rounded bg-surface-dark border border-white/10 text-accent-gold">
                Adobe Creative Partner
              </span>
            </div>
          </div>

          {/* Quick Navigation links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-accent-gold uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-warm-cream/80">
              <li>
                <button onClick={() => setRoute("home")} className="hover:text-accent-gold transition-colors text-left flex items-center gap-1.5">
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button onClick={() => setRoute("services")} className="hover:text-accent-gold transition-colors text-left flex items-center gap-1.5">
                  <span>Services Catalog</span>
                </button>
              </li>
              <li>
                <button onClick={() => setRoute("booking")} className="hover:text-accent-gold transition-colors text-left flex items-center gap-1.5 font-medium text-accent-gold">
                  <span>Book Session</span>
                </button>
              </li>
              <li>
                <button onClick={() => setRoute("gallery")} className="hover:text-accent-gold transition-colors text-left flex items-center gap-1.5">
                  <span>Owner Portfolio</span>
                </button>
              </li>
              <li>
                <button onClick={() => setRoute("pricing")} className="hover:text-accent-gold transition-colors text-left flex items-center gap-1.5">
                  <span>Pricing Table</span>
                </button>
              </li>
              <li>
                <button onClick={() => setRoute("blog")} className="hover:text-accent-gold transition-colors text-left flex items-center gap-1.5">
                  <span>Creative Insights Blog</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Info & Hours Panel */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-accent-gold uppercase mb-4">Operating Hours</h3>
            <ul className="space-y-2 text-sm text-warm-cream/80 font-mono">
              <li className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-warm-cream/60">Mon &ndash; Thu</span>
                <span>{contactDetails.monThuHours}</span>
              </li>
              <li className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-warm-cream/60 font-medium text-success-green flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success-green animate-pulse"></span> Friday
                </span>
                <span className="text-success-green">{contactDetails.friHours}</span>
              </li>
              <li className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-warm-cream/60">Saturday</span>
                <span>{contactDetails.satHours}</span>
              </li>
              <li className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-warm-cream/60">Sunday</span>
                <span>{contactDetails.sunHours}</span>
              </li>
            </ul>
          </div>

          {/* Location / Direct Contact */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-accent-gold uppercase mb-4">Get In Touch</h3>
            <div className="space-y-3.5 text-sm text-warm-cream/80">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                <span>{contactDetails.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent-gold shrink-0" />
                <a href={`mailto:${contactDetails.email}`} className="hover:text-accent-gold transition-colors">{contactDetails.email}</a>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent-gold shrink-0" />
                <a href={`tel:${contactDetails.phone}`} className="hover:text-accent-gold transition-colors">{contactDetails.phone}</a>
              </p>
              
              <div className="pt-2">
                <a 
                  href={`https://wa.me/${contactDetails.whatsapp.replace(/[^0-9]/g, "")}?text=Hi%20Daydreamer%20Studio!%20I'd%20like%20to%20ask%20about%20your%20design%20and%20PC%20services.`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-[#25D366] text-white hover:bg-[#20ba56] transition-colors font-medium text-xs shadow-md"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  Chat with Owner via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-warm-cream/60 font-mono text-center sm:text-left">
            &copy; {currentYear} Daydreamer and Sons (PTY) LTD. All rights reserved. &bull; Observatory Creative Hub.
          </p>

          <div className="flex items-center gap-4 text-xs text-warm-cream/50">
            <span>Secure Checkout Protected by</span>
            <div className="flex gap-2 text-[10px] font-mono font-bold">
              <span className="border border-white/20 px-1.5 py-0.5 rounded bg-surface-dark/50">PayFast</span>
              <span className="border border-white/20 px-1.5 py-0.5 rounded bg-surface-dark/50">EFT</span>
              <span className="border border-white/20 px-1.5 py-0.5 rounded bg-surface-dark/50">Visa/MC</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
