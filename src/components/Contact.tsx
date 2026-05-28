import React, { useState } from "react";
import { Mail, Phone, MapPin, MessageSquare, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { ContactDetails } from "../types";

interface ContactProps {
  contactDetails: ContactDetails;
}

export default function Contact({ contactDetails }: ContactProps) {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Computing Access Booking Inquiry",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors: Record<string, string> = {};
    if (!formValues.name.trim()) tempErrors.name = "We need to know your name.";
    if (!formValues.email.trim()) {
      tempErrors.email = "Please state your email address.";
    } else if (!formValues.email.includes("@")) {
      tempErrors.email = "Invalid email formatting.";
    }
    if (!formValues.message.trim()) tempErrors.message = "Write down your message details first!";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    // Mimic API dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormValues({
        name: "",
        email: "",
        phone: "",
        subject: "Computing Access Booking Inquiry",
        message: ""
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-ink-navy text-warm-cream transition-colors duration-300 light:bg-surface-light light:text-studio-navy py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center md:text-left space-y-2 max-w-2xl">
          <span className="text-xs font-mono tracking-widest text-accent-gold light:text-studio-navy/60 uppercase">GET IN INK CONTACT</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-white light:text-studio-navy">Contact Daydreamer and Sons Desk</h1>
          <p className="text-xs sm:text-sm text-warm-cream/70 light:text-studio-navy/80">
            Submit an immediate message below, coordinates on Google Maps, or select high-speed WhatsApp dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* 1. Left interactive contact form */}
          <div className="lg:col-span-7 bg-surface-dark p-6 sm:p-8 rounded-2xl border border-white/5 space-y-6">
            <h3 className="font-serif text-xl font-bold text-white">Direct Message Desk</h3>
            
            {submitSuccess ? (
              <div className="bg-[#1D261E] border border-success-green/20 p-6 rounded-xl text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-success-green/10 flex items-center justify-center mx-auto text-success-green">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-white">Message Dispatched!</h4>
                  <p className="text-xs text-warm-cream/70 mt-1 max-w-xs mx-auto">
                    We appreciate your message. Our on-duty studio technician will review and reply within 2 working hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
                  className="px-4 py-2 rounded bg-accent-gold text-studio-navy font-bold text-xs"
                >
                  Message Desk Again
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-warm-cream/60">Your Name <span className="text-coral-pop">*</span></label>
                    <input 
                      type="text"
                      placeholder="e.g. Thabo Nkosi"
                      value={formValues.name}
                      onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                      className={`w-full bg-ink-navy/60 border rounded-xl py-2 px-3 text-xs font-mono text-warm-cream outline-none focus:border-accent-gold transition-all ${
                        errors.name ? "border-coral-pop" : "border-white/10"
                      }`}
                    />
                    {errors.name && <span className="text-[10px] text-coral-pop font-mono block">{errors.name}</span>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-warm-cream/60">Email Address <span className="text-coral-pop">*</span></label>
                    <input 
                      type="email"
                      placeholder="thabo@gmail.com"
                      value={formValues.email}
                      onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                      className={`w-full bg-ink-navy/60 border rounded-xl py-2 px-3 text-xs font-mono text-warm-cream outline-none focus:border-accent-gold transition-all ${
                        errors.email ? "border-coral-pop" : "border-white/10"
                      }`}
                    />
                    {errors.email && <span className="text-[10px] text-coral-pop font-mono block">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-warm-cream/60">Phone number (Optional)</label>
                    <input 
                      type="tel"
                      placeholder="+27 71 000 0000"
                      value={formValues.phone || ""}
                      onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
                      className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs font-mono text-warm-cream outline-none focus:border-accent-gold transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-warm-cream/60">Subject Category</label>
                    <select
                      value={formValues.subject}
                      onChange={(e) => setFormValues({ ...formValues, subject: e.target.value })}
                      className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs font-mono text-warm-cream outline-none focus:border-accent-gold transition-all cursor-pointer"
                    >
                      <option value="Computing Access Booking Inquiry">Computing Access Booking Inquiry</option>
                      <option value="Advanced Adobe Graphics Design Request">Advanced Adobe Graphics Design Request</option>
                      <option value="Vintage Photo Restoration Services Quote">Vintage Photo Restoration Services Quote</option>
                      <option value="Document Form Fillings Assistance">Document Form Fillings Assistance</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-warm-cream/60">Message Requirements <span className="text-coral-pop">*</span></label>
                  <textarea 
                    rows={4}
                    placeholder="Provide detailed description of your requested design, document scan count, or preferred PC workspace slot..."
                    value={formValues.message}
                    onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
                    className={`w-full bg-ink-navy/60 border rounded-xl py-3 px-3 text-xs font-sans text-warm-cream outline-none focus:border-accent-gold transition-all ${
                      errors.message ? "border-coral-pop" : "border-white/10"
                    }`}
                  />
                  {errors.message && <span className="text-[10px] text-coral-pop font-mono block">{errors.message}</span>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-accent-gold text-studio-navy font-bold text-xs uppercase tracking-wider hover:bg-[#e0b430] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-accent-gold/25"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Delivering message details...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* 2. Right Contact Info Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Click-to-Chat WhatsApp banner */}
            <div className="bg-[#25D366] text-white p-6 rounded-2xl space-y-4 shadow-xl">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-6 h-6 fill-current text-white animate-bounce" />
                <h3 className="font-serif text-lg font-bold">Fastest Dispatch: WhatsApp Desk</h3>
              </div>
              <p className="text-xs leading-relaxed opacity-95">
                Got a quick question about workstation seat availability or print rates? Connect directly with Zola (Hub steward) via continuous WhatsApp live thread.
              </p>
              <a
                href={`https://wa.me/${contactDetails.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20Daydreamer.%20I'd%20like%20to%20ask%20about%20your%20design%20and%20PC%20workstation%20slots.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-white text-[#25D366] font-bold text-xs tracking-wide uppercase transition-transform hover:scale-102 hover:shadow-lg"
              >
                <span>Launch Client Chat Thread</span>
              </a>
            </div>

            {/* General display listings */}
            <div className="bg-surface-dark border border-white/5 p-6 rounded-2xl text-xs space-y-4 text-left">
              <h4 className="font-serif text-md font-semibold text-white">Observatory Physical Hub</h4>
              
              <div className="space-y-3 font-mono text-warm-cream/85">
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                  <span className="font-sans text-white">{contactDetails.address}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="w-5 h-5 text-accent-gold shrink-0" />
                  <a href={`mailto:${contactDetails.email}`} className="hover:text-gold transition-colors font-mono">{contactDetails.email}</a>
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone className="w-5 h-5 text-accent-gold shrink-0" />
                  <a href={`tel:${contactDetails.phone}`} className="hover:text-gold transition-colors">{contactDetails.phone}</a>
                </p>
              </div>

              {/* Operating hours table */}
              <div className="border-t border-white/5 pt-4 space-y-2">
                <span className="text-[10px] font-mono font-medium tracking-wide block uppercase text-accent-gold">Daily Desk Access Hours</span>
                <ul className="space-y-1 font-mono text-warm-cream/65">
                  <li className="flex justify-between"><span>Monday &ndash; Thursday</span><span>{contactDetails.monThuHours}</span></li>
                  <li className="flex justify-between font-bold text-success-green"><span>Friday (Late access)</span><span>{contactDetails.friHours}</span></li>
                  <li className="flex justify-between"><span>Saturday</span><span>{contactDetails.satHours}</span></li>
                  <li className="flex justify-between"><span>Sunday</span><span>{contactDetails.sunHours}</span></li>
                </ul>
              </div>
            </div>

            {/* Static Simulated Map Graphic with Route directions link */}
            <div className="h-44 rounded-2xl overflow-hidden border border-white/10 relative shadow-xl group">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=400&auto=format&fit=crop" 
                alt="Observatory Cape Town Map visual" 
                className="w-full h-full object-cover filtering brightness-50 opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-black/60">
                <MapPin className="w-6 h-6 text-accent-gold mb-1.5 animate-bounce" />
                <span className="font-serif text-xs font-bold text-white block">Observatory Creative Hub</span>
                <span className="text-[9px] font-mono text-warm-cream/65 block mt-0.5">Click map to fetch GPS navigation route coords</span>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="mt-2.5 text-[10px] font-mono font-medium underline text-accent-gold"
                >
                  Retrieve Google Directions
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
