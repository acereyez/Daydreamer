import { Laptop, Cpu, ShieldCheck, Mail, Phone, MapPin, Printer, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { TeamMember } from "../types";

interface AboutProps {
  team?: TeamMember[];
}

export default function About({ team: customTeam }: AboutProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const defaultTeam = [
    { id: "team-1", name: "Zola Dube", role: "Co-Founder & Technical Lead", desc: "Zola keeps our robust Gigabit gateway online, assists clients with advanced cloud operations, and operates our high-resolution archival scanners.", avatar: "ZD" },
    { id: "team-2", name: "Sipho Nkosi", role: "Lead Graphic Illustrator", desc: "Sipho operates our dedicated Photoshop and Illustrator rigs, converting client briefs into scalable vector assets and gorgeous restorations.", avatar: "SN" }
  ];

  const team = customTeam && customTeam.length > 0 ? customTeam : defaultTeam;

  const gearSpecs = [
    { title: "Gigabit Fiber Pipeline", desc: "Redundant high-speed commercial fiber entries ensuring blazing low-latency downloads even during major campus exam weeks.", icon: Laptop },
    { title: "High-Density Gloss Printers", desc: "Professional archival inkjet and high-speed document laser duplicators for same-day passport shoots, business cards, and binding.", icon: Printer },
    { title: "Fully Sourced Software", desc: "Workstations come pre-configured with the complete Adobe Creative Suite, AutoCAD viewer, and complete administrative editors.", icon: Cpu }
  ];

  const faqs = [
    {
      q: "What file formats do you accept for custom graphic designs and prints?",
      a: "For custom design works, we prefer layered vector formats (Photoshop .PSD, Illustrator .AI, or editable .PDF). For immediate print station orders, standard high-resolution .PDF, transparent .PNG, or high-quality copy-ready .JPG files are fully supported. Our graphic rigs can translate files down to standard web formats on the fly."
    },
    {
      q: "How are custom physical printing costs calculated?",
      a: "Printing costs vary based on weight, paper size, and finish. Standard document pages and black/white copies are inexpensive. Premium high-gloss photograph prints, heavyweight presentation cardstock, large-scale posters (A2 down to A0), and physical sublimation heat-press projects carry customized per-unit rates. Archival print discounts are applied automatically to bulk student, corporate, or institutional catalogs."
    },
    {
      q: "What are your booking hold and cancellation policies?",
      a: "You can modify, cancel, or reschedule your computer station, photography shoot, or sound booth slot up to 2 hours in advance. To keep scheduling fair, unpaid booked slots are held for a maximum of 15 minutes past the scheduled start time before they are automatically released into the general waitlist queue."
    },
    {
      q: "How do payments work inside this interactive booking system?",
      a: "Our portal connects directly with the secure, verified PayFast gateway. We support active South African debit cards, credit cards, or instant EFT options. Test bookings run securely through the sandbox network, while live client entries process real-world card payments securely, bypassing local server logs completely."
    },
    {
      q: "Will I get an automatic confirmation for my creative booking?",
      a: "Absolutely! After booking your digital workstation or custom design slot, the system posts the full metadata payload live to our email hub, instantly notifying our managers and your private email. You will receive a unique booking reference code to present at our front desk."
    },
    {
      q: "What are your hours, and do you support emergency overnight rush work?",
      a: "We are open daily for co-working, digital admin, list editing, and physical printing. If you have an urgent presentation, vector design file, or complex report layout print deadline, you can add our specialized 'Ultra Overnight Rush' processing fee to skip waiting queues and obtain finished assets in under 12 hours."
    }
  ];

  return (
    <div className="min-h-screen bg-ink-navy text-warm-cream transition-colors duration-300 light:bg-surface-light light:text-studio-navy py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Section Header */}
        <div className="text-center md:text-left space-y-2 max-w-2xl">
          <span className="text-xs font-mono tracking-widest text-accent-gold light:text-studio-navy/60 uppercase">OUR ORIGINS STORIES</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-white light:text-studio-navy">About Daydreamer and Sons</h1>
          <p className="text-xs sm:text-sm text-warm-cream/70 light:text-studio-navy/80">
            Learn about who we are, our creative philosophies, and our heavy-duty technical specifications.
          </p>
        </div>

        {/* Narrative layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white light:text-studio-navy">
              More than an Internet Café: We Built a Cozy Creative Haven.
            </h2>
            <p className="text-xs sm:text-sm text-warm-cream/75 light:text-studio-navy/80 leading-relaxed font-sans">
              Daydreamer and Sons began as a response to Cape Town&#39;s stark, uninspiring internet bars. We believe digital administration and creative designs shouldn&#39;t proceed in uninspiring fluorescent rooms. 
            </p>
            <p className="text-xs sm:text-sm text-warm-cream/75 light:text-studio-navy/80 leading-relaxed font-sans">
              We selected solid warm wood workspace materials, deep twilight cozy dark themes, soft ambient desk highlights, and matched them with the absolute best fiber links in Observatory. Whether you are typing a crucial CV, applying for official government documents, scanning archival ancestry memories, or hosting a Zoom board meeting, you belong at our solid workstations.
            </p>
          </div>

          {/* Large Unsplash photo of cafe visual */}
          <div className="lg:col-span-5 h-80 rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop" 
              alt="Daydreamer Cafe Interior Cozy workspace" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Technical Gear Highlights */}
        <div className="space-y-6 pt-10 border-t border-white/5">
          <h3 className="font-serif text-xl font-semibold text-white text-center">Equipment & Studio Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gearSpecs.map((spec, index) => {
              const SpecIcon = spec.icon;
              return (
                <div key={index} className="bg-surface-dark light:bg-white border border-white/5 p-6 rounded-2xl space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-gold/15 text-accent-gold flex items-center justify-center">
                    <SpecIcon className="w-5 h-5 animate-pulse" />
                  </div>
                  <h4 className="font-serif text-md font-bold text-white light:text-studio-navy">{spec.title}</h4>
                  <p className="text-xs text-warm-cream/65 light:text-studio-navy/70 leading-relaxed">{spec.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Meet the Studio Team */}
        <div className="space-y-8 pt-10 border-t border-white/5">
          <div className="text-center space-y-1 max-w-lg mx-auto">
            <span className="text-xs font-mono text-accent-gold uppercase">OBSERVATORY HUB STEWARDS</span>
            <h3 className="font-serif text-2xl font-bold text-white light:text-studio-navy">Meet the Team</h3>
            <p className="text-xs text-warm-cream/60">Friendly technical experts dedicated to enabling your digital targets.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {team.map((member, index) => (
              <div 
                key={index}
                className="bg-surface-dark light:bg-white border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 shadow-lg hover:border-accent-gold/20 transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-accent-gold text-studio-navy font-bold flex items-center justify-center text-lg font-mono shadow-md">
                  {member.avatar}
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-bold text-white light:text-studio-navy">{member.name}</h4>
                  <p className="text-[10px] font-mono text-accent-gold uppercase tracking-wider">{member.role}</p>
                </div>
                <p className="text-xs text-warm-cream/70 light:text-studio-navy/70 leading-relaxed font-sans">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="space-y-8 pt-10 border-t border-white/5">
          <div className="text-center space-y-1 max-w-lg mx-auto">
            <span className="text-xs font-mono text-accent-gold uppercase">FREQUENTLY ASKED QUESTIONS</span>
            <h3 className="font-serif text-2xl font-bold text-white light:text-studio-navy">Knowledge Base & Studio Policies</h3>
            <p className="text-xs text-warm-cream/60">Answers to common queries about design file compliance, printing scale, and interactive portal scheduling.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-surface-dark light:bg-white border border-white/5 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full py-5 px-6 flex items-center justify-between text-left gap-4 font-serif text-sm font-semibold text-white light:text-studio-navy hover:text-accent-gold transition-colors focus:outline-none"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-accent-gold flex-shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-accent-gold flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-warm-cream/40 flex-shrink-0" />
                    )}
                  </button>

                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-[300px] border-t border-white/5" : "max-h-0"
                    }`}
                  >
                    <div className="p-6 text-xs text-warm-cream/75 light:text-studio-navy/80 leading-relaxed font-sans">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
