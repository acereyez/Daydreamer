import React, { useState } from "react";
import { 
  User, Mail, Phone, Clock, Calendar, FileText, CheckCircle2, 
  Trash2, ShieldAlert, KeyRound, Smartphone, LogOut, Sparkles, Bell
} from "lucide-react";
import { Booking, BookingStatus } from "../types";

interface AccountProps {
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
  currentUser: { name: string; email: string; phone: string; isLoggedIn: boolean } | null;
  onLogin: (name: string, email: string, phone: string) => void;
  onLogout: () => void;
  setRoute: (route: string) => void;
}

export default function Account({ 
  bookings, 
  onCancelBooking, 
  currentUser, 
  onLogin, 
  onLogout,
  setRoute
}: AccountProps) {
  const [activeTab, setActiveTab] = useState<"bookings" | "profile">("bookings");
  
  // Custom auth mockup values
  const [loginValues, setLoginValues] = useState({ name: "Thabo Nkosi", email: "thabo.nkosi@gmail.com", phone: "+27 71 504 3211", pass: "••••••••" });
  const [isSignMode, setIsSignMode] = useState(true);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(loginValues.name, loginValues.email, loginValues.phone);
  };

  const myBookings = bookings.filter(b => 
    currentUser?.isLoggedIn && b.email.toLowerCase() === currentUser.email.toLowerCase()
  );

  const upcomingBooking = myBookings.find(b => b.status === "Confirmed" || b.status === "Pending");

  return (
    <div className="min-h-screen bg-ink-navy text-warm-cream transition-colors duration-300 light:bg-surface-light light:text-studio-navy py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* If user is not logged in, show an exquisite authentic form */}
        {!currentUser?.isLoggedIn ? (
          <div className="bg-surface-dark p-8 rounded-3xl border border-white/10 text-center max-w-md mx-auto space-y-6 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-accent-gold/15 text-accent-gold flex items-center justify-center mx-auto">
              <KeyRound className="w-6 h-6 animate-pulse" />
            </div>

            <div className="space-y-1">
              <h2 className="font-serif text-2xl font-bold text-white">Guest Client Login</h2>
              <p className="text-xs text-warm-cream/65">Manage your upcoming workstation slots, invoices, and loyalty metrics.</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs text-left">
              <div className="space-y-1">
                <label className="text-xs font-mono text-warm-cream/60">Full Name</label>
                <input 
                  type="text"
                  required
                  value={loginValues.name}
                  onChange={(e) => setLoginValues({ ...loginValues, name: e.target.value })}
                  className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs font-mono text-warm-cream outline-none focus:border-accent-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-warm-cream/60">Email Address</label>
                <input 
                  type="email"
                  required
                  value={loginValues.email}
                  onChange={(e) => setLoginValues({ ...loginValues, email: e.target.value })}
                  className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs font-mono text-warm-cream outline-none focus:border-accent-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-warm-cream/60">Phone number (WhatsApp sync)</label>
                <input 
                  type="tel"
                  required
                  value={loginValues.phone}
                  onChange={(e) => setLoginValues({ ...loginValues, phone: e.target.value })}
                  className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs font-mono text-warm-cream outline-none focus:border-accent-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-warm-cream/60">Secure Password</label>
                <input 
                  type="password"
                  value={loginValues.pass}
                  onChange={(e) => setLoginValues({ ...loginValues, pass: e.target.value })}
                  className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs font-mono text-warm-cream outline-none focus:border-accent-gold"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-accent-gold text-studio-navy font-bold text-xs uppercase tracking-wider hover:bg-[#e0b430]"
                >
                  Confirm Sign In &bull; Launch Dashboard
                </button>
              </div>
            </form>

            <div className="text-[10px] text-warm-cream/40 pt-2 border-t border-white/5">
              <span>Daydreamer uses secure client local storage tokens. POPIA Compliant.</span>
            </div>
          </div>
        ) : (
          
          /* User is logged in, show fully features workspace client-side dashboard */
          <div className="space-y-8">
            
            {/* Upper profile statistics display panel */}
            <div className="bg-surface-dark p-6 sm:p-8 rounded-3xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 filter blur-[32px] rounded-full pointer-events-none"></div>
              
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-14 h-14 rounded-full bg-accent-gold text-studio-navy font-bold flex items-center justify-center text-xl font-serif shadow-md shrink-0">
                  {currentUser.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-center sm:justify-start gap-2">
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">{currentUser.name}</h2>
                    <span className="text-[9px] font-mono bg-success-green/20 text-success-green border border-success-green/30 px-2 py-0.2 rounded-full leading-none uppercase">CLIENT LEVEL I</span>
                  </div>
                  <p className="text-xs font-mono text-warm-cream/50">{currentUser.email} &bull; {currentUser.phone}</p>
                </div>
              </div>

              {/* Loyalty balance indicators */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center">
                <span className="text-[10px] font-mono text-accent-gold uppercase leading-none mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-accent-gold" /> Loyalty Points
                </span>
                <span className="text-2xl font-serif font-bold text-white leading-tight">150 <span className="text-xs font-mono text-warm-cream/40">Points</span></span>
                <span className="text-[8.5px] font-mono text-success-green leading-none pt-1">R15 reward credit active</span>
              </div>
            </div>

            {/* Selector Nav Tabs */}
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <div className="flex gap-2">
                {[
                  { id: "bookings", label: "My Bookings" },
                  { id: "profile", label: "Personal profile Settings" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-1.5 px-3 rounded-t text-xs font-mono font-medium border-b-2 transition-all ${
                      activeTab === tab.id
                        ? "border-accent-gold text-accent-gold font-bold"
                        : "border-transparent text-warm-cream/50 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <button 
                onClick={onLogout}
                className="text-[10px] font-mono text-coral-pop flex items-center gap-1 hover:underline"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>

            {/* Content Tabs render */}
            {activeTab === "bookings" ? (
              <div className="space-y-4">
                {/* Visual Active Booking Reminder Card */}
                {upcomingBooking && (
                  <div className="bg-accent-gold/10 border border-accent-gold/20 p-5 rounded-2xl text-left space-y-3.5 relative overflow-hidden animate-fade-in shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 filter blur-3xl rounded-full pointer-events-none"></div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent-gold/15 rounded-xl text-accent-gold shrink-0">
                        <Bell className="w-5 h-5 animate-bounce" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-accent-gold font-bold uppercase tracking-wider block">System Booking Reminder</span>
                        <h4 className="font-serif text-sm font-bold text-white">Upcoming Session: {upcomingBooking.serviceName}</h4>
                        <p className="text-xs text-warm-cream/70 leading-relaxed font-sans">
                          Friendly reminder that you have an active slot secured on <strong className="text-accent-gold font-mono font-medium">{upcomingBooking.date}</strong> at <strong className="text-accent-gold font-mono font-medium">{upcomingBooking.timeSlot}</strong>. Ensure file formats are compliant before arrival.
                        </p>
                      </div>
                    </div>
                    <div className="pt-1.5 flex flex-wrap gap-2 text-xs">
                      <button
                        onClick={() => {
                          const calendarContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${upcomingBooking.serviceName}\nDTSTART:20260528T100000Z\nDESCRIPTION:Daydreamer Studio Reservation ID: ${upcomingBooking.id}\nEND:VEVENT\nEND:VCALENDAR`;
                          const blob = new Blob([calendarContent], { type: "text/calendar" });
                          const url = URL.createObjectURL(blob);
                          const element = document.createElement("a");
                          element.href = url;
                          element.download = `Daydreamer_Booking_${upcomingBooking.id}.ics`;
                          element.click();
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-accent-gold text-studio-navy font-bold font-mono text-[11px] hover:bg-[#e0b430] transition-colors"
                      >
                        Add to Outlook / iCal (.ics)
                      </button>
                      <button
                        onClick={() => alert(`POPIA channel alert configured for ${upcomingBooking.phone}! You will receive notifications 2 hours prior to start time.`)}
                        className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-mono text-[11px] transition-colors"
                      >
                        Set WhatsApp Push Alert
                      </button>
                    </div>
                  </div>
                )}

                {myBookings.length > 0 ? (
                  myBookings.map((b) => (
                    <div 
                      key={b.id}
                      className="bg-surface-dark/80 border border-white/5 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono transition-all hover:border-white/10"
                    >
                      <div className="space-y-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-serif text-white">{b.serviceName}</span>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full border ${
                            b.status === "Cancelled" 
                              ? "bg-coral-pop/25 border-coral-pop/45 text-coral-pop" 
                              : "bg-success-green/20 border-success-green/30 text-success-green"
                          }`}>
                            {b.status}
                          </span>
                        </div>
                        <p className="text-[10px] text-warm-cream/55 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-accent-gold" /> {b.date} at {b.timeSlot} ({b.duration})
                        </p>
                        <p className="text-[9px] text-accent-gold leading-none pt-1">
                          Ref: <span className="font-bold">{b.id}</span> &bull; Payment Mode: {b.paymentMethod}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 justify-end">
                        <div className="text-right sm:pr-2">
                          <p className="text-[9px] text-warm-cream/45 uppercase leading-none">Settlement</p>
                          <strong className="text-xs text-accent-gold text-md">R{b.totalDue.toFixed(2)}</strong>
                        </div>

                        {b.status !== "Cancelled" && (
                          <button
                            type="button"
                            onClick={() => onCancelBooking(b.id)}
                            className="p-2rounded bg-white/5 hover:bg-coral-pop/10 hover:text-coral-pop text-warm-cream/45 rounded-lg border border-white/5 transition-all"
                            title="Cancel Placement"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/5 space-y-3">
                    <p className="text-xl">📅</p>
                    <h4 className="font-serif font-semibold text-white">No Bookings Found</h4>
                    <p className="text-xs text-warm-cream/60 max-w-xs mx-auto">
                      You haven&#39;t created any digital workstation or logo design appointments yet with this email.
                    </p>
                    <button
                      onClick={() => setRoute("booking")}
                      className="px-4 py-2 rounded bg-accent-gold text-studio-navy font-bold text-xs"
                    >
                      Create First Booking
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Profile configurations tab */
              <div className="bg-surface-dark p-6 rounded-2xl border border-white/5 space-y-6 text-xs text-left">
                <h3 className="font-serif text-lg font-bold text-white">Personal Contact Details</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-warm-cream/60">Display Name</label>
                    <input 
                      type="text"
                      className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs font-mono text-warm-cream outline-none"
                      defaultValue={currentUser.name}
                      readOnly
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-warm-cream/60">Mail Sync</label>
                    <input 
                      type="text"
                      className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs font-mono text-warm-cream outline-none"
                      defaultValue={currentUser.email}
                      readOnly
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/5">
                  <span className="text-xs font-mono text-accent-gold uppercase block">Alert Controls</span>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs">
                      <input type="checkbox" defaultChecked className="rounded text-accent-gold focus:ring-accent-gold" />
                      <span>Email transactional bills and receipts instantly</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs">
                      <input type="checkbox" defaultChecked className="rounded text-accent-gold focus:ring-accent-gold" />
                      <span>WhatsApp event alerts 2 hours prior to reservation schedule</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
