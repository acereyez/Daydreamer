import { useState, useMemo } from "react";
import { 
  Monitor, Calendar, User, CreditCard, Check, Grid, ArrowLeft, ArrowRight,
  ShieldCheck, HelpCircle, Lock, Mail, FileText, Smartphone, LayoutGrid, Clock, AlertTriangle
} from "lucide-react";
import { Service, Booking, ServiceCategory, Promotion, ContactDetails } from "../types";

// Setup mapping
interface BookingFlowProps {
  services: Service[];
  promotions: Promotion[];
  bookedSlots: string[]; // e.g. ["srv-pc-hourly|2026-05-28|14:00"]
  onSubmitBooking: (booking: Omit<Booking, "id" | "status" | "createdAt">) => Booking;
  preselectedServiceId: string | null;
  setBookingServiceId: (id: string | null) => void;
  contactDetails: ContactDetails;
}

export default function BookingFlow({
  services,
  promotions,
  bookedSlots,
  onSubmitBooking,
  preselectedServiceId,
  setBookingServiceId,
  contactDetails
}: BookingFlowProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Choose Your Service states
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(preselectedServiceId);
  const [selectedDuration, setSelectedDuration] = useState<string>("1 hour");

  // Choose Date & Time states
  const [activeDate, setActiveDate] = useState<string>("2026-05-29"); // Default to tomorrow
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Details states
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    instructions: "",
    promoCode: ""
  });
  const [promoError, setPromoError] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [whatsAppConsent, setWhatsAppConsent] = useState(true);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Payment states
  const [selectedPayment, setSelectedPayment] = useState<string>("Card");
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Pre-sync with incoming prop
  useMemo(() => {
    if (preselectedServiceId && preselectedServiceId !== selectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  // Selected Service object
  const selectedService = useMemo(() => {
    return services.find(s => s.id === selectedServiceId) || null;
  }, [services, selectedServiceId]);

  // Generate 7 upcoming dates starting from May 28, 2026 (for our live mockup)
  const availableDatesList = useMemo(() => {
    const days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
    const dates = [
      { key: "2026-05-28", abb: "Thu", num: "28", status: "Today", isClosed: false },
      { key: "2026-05-29", abb: "Fri", num: "29", status: "Available", isClosed: false },
      { key: "2026-05-30", abb: "Sat", num: "30", status: "Available", isClosed: false },
      { key: "2026-05-31", abb: "Sun", num: "31", status: "Half Day", isClosed: false },
      { key: "2026-06-01", abb: "Mon", num: "01", status: "Available", isClosed: false },
      { key: "2026-06-02", abb: "Tue", num: "02", status: "Available", isClosed: false },
      { key: "2026-06-03", abb: "Wed", num: "03", status: "Full", isClosed: true }
    ];
    return dates;
  }, []);

  const timeSlotsList = useMemo(() => {
    return [
      { time: "09:00", isBooked: false },
      { time: "10:00", isBooked: false },
      { time: "11:00", isBooked: true }, // Muted booked example
      { time: "12:00", isBooked: false },
      { time: "13:00", isBooked: false },
      { time: "14:00", isBooked: true },
      { time: "15:00", isBooked: false },
      { time: "16:00", isBooked: false }
    ];
  }, []);

  // Price Calculation
  const originalPrice = useMemo(() => {
    if (!selectedService) return 0;
    
    // adjust price depending on hourly selection
    let mult = 1;
    if (selectedService.priceType === "per_hour") {
      if (selectedDuration === "2 hours") mult = 2;
      if (selectedDuration === "Half day (4 hrs)") mult = 4;
      if (selectedDuration === "Full day (8 hrs)") mult = 8;
    }
    return selectedService.price * mult;
  }, [selectedService, selectedDuration]);

  const discountAmount = useMemo(() => {
    return originalPrice * (discountPercent / 100);
  }, [originalPrice, discountPercent]);

  const finalPrice = useMemo(() => {
    return Math.max(0, originalPrice - discountAmount);
  }, [originalPrice, discountAmount]);

  // Actions
  const handleApplyPromo = () => {
    setPromoError("");
    const matched = promotions.find(p => p.promoCode.toUpperCase() === formValues.promoCode.trim().toUpperCase());
    if (matched) {
      setDiscountPercent(matched.discountPercent);
      setPromoApplied(true);
    } else {
      setPromoError("Invalid discount code syntax. Try STUDENT20.");
      setDiscountPercent(0);
      setPromoApplied(false);
    }
  };

  const handleStep1Continue = () => {
    if (selectedService) {
      setCurrentStep(2);
    }
  };

  const isCustomService = selectedService?.duration === "Custom";

  const handleStep2Continue = () => {
    if (isCustomService || selectedTime) {
      setCurrentStep(3);
    }
  };

  // Validate Step 3 Form fields
  const handleStep3Continue = () => {
    const errors: Record<string, string> = {};
    if (!formValues.firstName.trim()) errors.firstName = "Please enter your first name.";
    if (!formValues.lastName.trim()) errors.lastName = "Please enter your last name.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email.trim()) {
      errors.email = "Please state your email address.";
    } else if (!emailRegex.test(formValues.email)) {
      errors.email = "Please provide a valid email format.";
    }

    if (!formValues.phone.trim()) {
      errors.phone = "Please enter your active WhatsApp number.";
    } else if (formValues.phone.length < 8) {
      errors.phone = "Phone number seems too short (min 8 digits).";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({});
      setCurrentStep(4);
    }
  };

  const handleConfirmAndPay = async () => {
    if (!selectedService) return;
    setIsSubmitting(true);
    setSubmitError(null);

    const bookingData = {
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      duration: selectedDuration,
      date: activeDate,
      timeSlot: isCustomService ? "Flexible" : (selectedTime || "10:00"),
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      phone: formValues.phone,
      specialInstructions: formValues.instructions,
      promoCode: promoApplied ? formValues.promoCode : undefined,
      whatsAppNotify: whatsAppConsent,
      totalDue: finalPrice,
      paymentMethod: selectedPayment
    };

    // 1. First record booking in local database
    const newBooking = onSubmitBooking(bookingData);
    setConfirmedBooking(newBooking);

    // 2. Prepare Detailed Formspree Mail Package with clean, email-ready templating attributes
    const formspreePayload = {
      _subject: `Daydreamer Studio appointment confirmation [REF: ${newBooking.id}]`,
      _replyto: formValues.email,
      "Notification Copy List": `Client Inbox (${formValues.email}) & Studio Admin (hello@daydreamer.co.za)`,
      "Booking Reference ID": newBooking.id,
      "Service Requested": selectedService.name,
      "Service Category": selectedService.category,
      "Duration Chosen": selectedDuration,
      "Appointment Date": activeDate,
      "Calendar Slot": isCustomService ? "Flexible (Lead Designer Contact)" : (selectedTime || "10:00"),
      "Client First Name": formValues.firstName,
      "Client Last Name": formValues.lastName,
      "Client Email Inbox": formValues.email,
      "WhatsApp Contact Link": formValues.phone,
      "Client Instructions & Notes": formValues.instructions || "None specified by applicant.",
      "Promo Discount code": promoApplied ? formValues.promoCode : "None used",
      "WhatsApp Alerts Appointed": whatsAppConsent ? "Approved" : "Not Opted",
      "Billing Total Due": `R${finalPrice.toFixed(2)}`,
      "Settlement Selection": selectedPayment,
      "Real-time System Stamp": new Date().toLocaleString(),
      "CONFIRMATION EMAIL BLOCK SUMMARY": `
---------------------------------------------------------
DAYDREAMER CREATIVE STUDIO - BOOKING SUMMARY & TAX RECEIPT
---------------------------------------------------------
TAX INVOICE / RESERVATION RECORD

- Booking Reference ID: ${newBooking.id}
- Appointment Date:     ${activeDate}
- Scheduled Time Slot:  ${isCustomService ? "Flexible (Designer Review)" : (selectedTime || "10:00")}
- Service Name / Unit:  ${selectedService.name} (Duration: ${selectedDuration})

CLIENT BILLING & INBOX COORDINATES
- Client Full Name:     ${formValues.firstName} ${formValues.lastName}
- Client Email Address: ${formValues.email}
- Whatsapp / Cell Number: ${formValues.phone}

FINAL RECONCILIATION SUMMARY
- Base Price:           R${(selectedService.price).toFixed(2)}
- Promo/Coupon code:    ${promoApplied ? formValues.promoCode : "None applied"}
- Total Outstanding:    R${finalPrice.toFixed(2)}
- Payment Method Selected: ${selectedPayment}

Thank you for choosing Daydreamer. For immediate support, contact us at hello@daydreamer.co.za, via Whatsapp, or present this Booking Code at the front desk.
---------------------------------------------------------
`
    };

    try {
      // 3. Post booking to user's specified Formspree ID to enable instant emails
      const response = await fetch(`https://formspree.io/f/${contactDetails.formspreeId || "xjgzlrrg"}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formspreePayload)
      });

      if (!response.ok) {
        console.warn("Formspree response was not fully successful, proceeding onwards to protect customer booking journey.");
      }
    } catch (err) {
      console.error("Failed sending email verification to Formspree coordinates: ", err);
    } finally {
      setIsSubmitting(false);

      // 4. Handle Redirection to real-life Payment Gateway
      const isOnlinePay = selectedPayment === "Card" || selectedPayment === "PayFast";
      const isPayfastConfigured = contactDetails.paymentGateway && contactDetails.paymentGateway.includes("PayFast");

      if (isOnlinePay && isPayfastConfigured) {
        // Construct standard Form-based PayFast redirection secure gateway
        const form = document.createElement("form");
        form.method = "POST";
        form.action = contactDetails.paymentGateway === "PayFast Live"
          ? "https://www.payfast.co.za/eng/process"
          : "https://sandbox.payfast.co.za/eng/process";

        const addField = (name: string, value: string) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = name;
          input.value = value;
          form.appendChild(input);
        };

        addField("merchant_id", contactDetails.payfastMerchantId || "10000100");
        addField("merchant_key", contactDetails.payfastMerchantKey || "46f0z6386qr72");
        addField("return_url", window.location.origin + "?payment=success&ref=" + newBooking.id);
        addField("cancel_url", window.location.origin + "?payment=cancelled");
        addField("email_address", formValues.email);
        addField("name_first", formValues.firstName);
        addField("name_last", formValues.lastName);
        addField("item_name", `Daydreamer: ${selectedService.name} (${selectedDuration})`);
        addField("amount", finalPrice.toFixed(2));
        addField("m_payment_id", newBooking.id);

        document.body.appendChild(form);
        form.submit();
      } else {
        // Direct cash or EFT options go straight to success step 5
        setCurrentStep(5);
      }
    }
  };

  const handleReset = () => {
    setBookingServiceId(null);
    setSelectedServiceId(null);
    setSelectedTime(null);
    setFormValues({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      instructions: "",
      promoCode: ""
    });
    setPromoApplied(false);
    setDiscountPercent(0);
    setConfirmedBooking(null);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-ink-navy text-warm-cream transition-colors duration-300 light:bg-surface-light light:text-studio-navy py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Persistent Linear Progress Bar (shown only for steps 1-4) */}
        {currentStep <= 4 && (
          <div className="bg-[#1C1F32] light:bg-white p-6 rounded-2xl border border-white/5 light:border-black/5 shadow-lg">
            <div className="flex items-center justify-between relative">
              {/* background flow line */}
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-white/10 -translate-y-1/2 z-0"></div>
              {/* gold progress line indicator */}
              <div 
                className="absolute left-0 top-1/2 h-0.5 bg-accent-gold -translate-y-1/2 z-0 transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              ></div>

              {[
                { stepNum: 1, label: "Service", desc: "Choose type", icon: LayoutGrid },
                { stepNum: 2, label: "Date & Time", desc: "Pick a slot", icon: Calendar },
                { stepNum: 3, label: "Your Details", desc: "Contact info", icon: User },
                { stepNum: 4, label: "Payment", desc: "Confirm & pay", icon: CreditCard }
              ].map((step, idx) => {
                const IconComp = step.icon;
                const isCompleted = currentStep > step.stepNum;
                const isActive = currentStep === step.stepNum;
                
                return (
                  <div key={idx} className="flex flex-col items-center relative z-10">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isCompleted 
                          ? "bg-accent-gold text-studio-navy" 
                          : isActive 
                            ? "bg-accent-gold text-studio-navy ring-4 ring-accent-gold/25" 
                            : "bg-[#10101E] border border-white/10 text-warm-cream/55"
                      }`}
                    >
                      {isCompleted ? <Check className="w-5 h-5" /> : <IconComp className="w-4 h-4" />}
                    </div>
                    {/* Labels */}
                    <span className="text-[10px] font-mono mt-2 font-medium tracking-wide invisible sm:visible">
                      {step.label}
                    </span>
                    <span className="text-[9px] text-warm-cream/40 light:text-studio-navy/40 font-mono invisible sm:visible">
                      {step.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 1: CHOOSE YOUR SERVICE ================= */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center sm:text-left space-y-1">
              <span className="text-xs font-mono text-accent-gold">STEP 1 OF 4</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold dark:text-white light:text-studio-navy">Choose Your Digital Workstation or Creative Service</h2>
              <p className="text-xs text-warm-cream/65 light:text-studio-navy/70">Select the option that matches your goals. Walk-ins can reserve standard PC seats immediately.</p>
            </div>

            {/* 2-Column Selectable Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((srv) => {
                const isSelected = selectedServiceId === srv.id;
                return (
                  <div 
                    key={srv.id}
                    onClick={() => {
                      setSelectedServiceId(srv.id);
                      setBookingServiceId(srv.id);
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer relative flex items-start gap-3 select-none ${
                      isSelected
                        ? "bg-accent-gold/15 border-accent-gold text-white"
                        : "bg-[#1E1F35] light:bg-white border-white/5 light:border-black/5 hover:border-accent-gold/40 text-warm-cream light:text-studio-navy"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? "bg-accent-gold text-studio-navy" : "bg-ink-navy/40 text-accent-gold"
                    }`}>
                      <LayoutGrid className="w-4 h-4" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold leading-tight pr-6">{srv.name}</h4>
                        {/* Selected Checkmark in top-right */}
                        {isSelected && (
                          <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-accent-gold flex items-center justify-center">
                            <Check className="w-3 h-3 text-studio-navy stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] text-warm-cream/75 light:text-studio-navy/70 leading-relaxed pr-3 line-clamp-2">
                        {srv.description}
                      </p>
                      <span className="text-xs font-serif font-bold text-accent-gold block pt-1">
                        {srv.priceType === "starting" ? "from " : ""}
                        R{srv.price}
                        <span className="text-[10px] text-warm-cream/40 font-mono font-normal">
                          {srv.priceType === "per_hour" ? "/hr" : srv.priceType === "per_page" ? "/page" : ""}
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Session Duration Selector (relevant if computer hourly access is chosen) */}
            {selectedService && selectedService.priceType === "per_hour" && (
              <div className="bg-[#1C1F32] p-5 rounded-2xl border border-white/5 space-y-3">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-accent-gold" />
                  <h4 className="text-xs font-semibold font-mono uppercase tracking-wider text-white">Select Workstation Duration</h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    "1 hour",
                    "2 hours",
                    "Half day (4 hrs)",
                    "Full day (8 hrs)",
                    "Custom"
                  ].map((dur) => {
                    const isSelected = selectedDuration === dur;
                    return (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setSelectedDuration(dur)}
                        className={`py-2 px-3 rounded-lg text-[10px] font-semibold text-center transition-all ${
                          isSelected
                            ? "border border-accent-gold text-accent-gold bg-accent-gold/15"
                            : "bg-ink-navy/40 border border-transparent text-warm-cream/70 hover:bg-white/5"
                        }`}
                      >
                        {dur}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation Drawer Bottom */}
            <div className="flex justify-end pt-4 border-t border-white/5">
              <button
                onClick={handleStep1Continue}
                disabled={!selectedServiceId}
                className={`px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                  selectedServiceId
                    ? "bg-accent-gold text-studio-navy hover:bg-[#e0b430] cursor-pointer"
                    : "bg-surface-dark text-warm-cream/30 border border-white/5 cursor-not-allowed opacity-35"
                }`}
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: CHOOSE DATE & TIME ================= */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center sm:text-left space-y-1">
              <span className="text-xs font-mono text-accent-gold">STEP 2 OF 4</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold dark:text-white light:text-studio-navy">Reserve Your Appointment Date & Slot</h2>
              <p className="text-xs text-warm-cream/65 light:text-studio-navy/70">Pick a day and free daily time. Workstation slots are automatically confirmed.</p>
            </div>

            {/* Service Summary Node */}
            <div className="p-4 rounded-xl bg-[#1C1F32] border border-white/5 flex justify-between items-center text-xs">
              <div>
                <p className="font-mono text-[9px] text-accent-gold uppercase">Selected Service</p>
                <p className="font-serif font-bold text-white">{selectedService?.name}</p>
              </div>
              <button onClick={() => setCurrentStep(1)} className="text-[10px] font-mono text-accent-gold underline">Change Link</button>
            </div>

            {isCustomService ? (
              /* Custom Work Notice instead of specific slots */
              <div className="bg-[#1C2C42] border border-accent-gold/20 p-6 rounded-2xl space-y-3 flex items-start gap-4 text-left">
                <AlertTriangle className="w-8 h-8 text-accent-gold shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <h4 className="font-serif text-md font-bold text-white">Bespoke Designing Delivery</h4>
                  <p className="text-xs text-warm-cream/80 leading-relaxed">
                    Because this custom task (e.g. detailed Illustrator vector work, full dynamic brand kits) requires detailed technical scoping, we do not require a strict calendar slot booking now.
                  </p>
                  <p className="text-xs text-accent-gold font-mono">
                    Proceed to details. Once submitted, our lead designer will reach out within 24 hours via email/WhatsApp to coordinate!
                  </p>
                </div>
              </div>
            ) : (
              /* Standard Workstation dates & slots */
              <div className="space-y-6">
                
                {/* 7-Day Strip Carousel */}
                <div className="space-y-2">
                  <p className="text-xs font-mono text-warm-cream/50 uppercase">7-Day Calendar Strip</p>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {availableDatesList.map((day) => {
                      const isSelected = activeDate === day.key;
                      return (
                        <div 
                          key={day.key}
                          onClick={() => {
                            if (!day.isClosed) {
                              setActiveDate(day.key);
                              setSelectedTime(null);
                            }
                          }}
                          className={`p-3 rounded-xl text-center border transition-all select-none ${
                            day.isClosed
                              ? "opacity-35 cursor-not-allowed bg-black/10 border-transparent text-warm-cream/35"
                              : isSelected
                                ? "border border-accent-gold bg-accent-gold/15 text-accent-gold"
                                : "bg-[#1E1F35] light:bg-white border-white/5 hover:border-accent-gold/30 cursor-pointer"
                          }`}
                        >
                          <span className="text-[9px] font-mono uppercase block">{day.abb}</span>
                          <span className="text-md font-serif font-bold block leading-snug">{day.num}</span>
                          <span className="text-[8px] font-mono text-warm-cream/40 px-1 py-0.5 rounded uppercase mt-1 inline-block">
                            {day.status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Slot Legend */}
                <div className="flex gap-4 text-[9px] font-mono text-warm-cream/50 justify-center">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent-gold"></span> Selected
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-surface-dark"></span> Available
                  </span>
                  <span className="flex items-center gap-1.5 line-through decoration-white/30">
                    <span className="w-2 h-2 rounded-full bg-neutral-600/50"></span> Booked
                  </span>
                </div>

                {/* Slot Grid */}
                <div className="space-y-3">
                  <p className="text-xs font-mono text-warm-cream/50 uppercase">Available time slots for {activeDate}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {timeSlotsList.map((slot) => {
                      const isSelected = selectedTime === slot.time;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={slot.isBooked}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`p-3.5 rounded-lg text-xs font-semibold font-mono border text-center transition-all ${
                            slot.isBooked
                              ? "opacity-30 border-transparent bg-black/20 text-warm-cream/30 line-through cursor-not-allowed"
                              : isSelected
                                ? "border-accent-gold text-accent-gold bg-accent-gold/15"
                                : "bg-[#1E1F35] light:bg-white border-white/5 hover:border-accent-gold/30"
                          }`}
                        >
                          <span>{slot.time}</span>
                          <span className="block text-[9px] text-warm-cream/40 font-mono mt-0.5">
                            {slot.isBooked ? "Booked" : "Available"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* Navigation Row */}
            <div className="flex justify-between pt-4 border-t border-white/5">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-5 py-3 rounded-xl border border-white/10 hover:border-accent-gold hover:bg-white/5 font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleStep2Continue}
                disabled={!isCustomService && !selectedTime}
                className={`px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                  isCustomService || selectedTime
                    ? "bg-accent-gold text-studio-navy hover:bg-[#e0b430] cursor-pointer"
                    : "bg-surface-dark text-warm-cream/30 border border-white/5 cursor-not-allowed opacity-35"
                }`}
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: YOUR DETAILS ================= */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center sm:text-left space-y-1">
              <span className="text-xs font-mono text-accent-gold">STEP 3 OF 4</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold dark:text-white light:text-studio-navy">Provide Your Contact Details</h2>
              <p className="text-xs text-warm-cream/65 light:text-studio-navy/70">Your contact info will be used for instantaneous receipt confirmations and friendly reminders.</p>
            </div>

            {/* Service & Date Summary Capsule */}
            <div className="p-4 rounded-xl bg-[#1C1F32] border border-white/5 grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-accent-gold block text-[9px] uppercase">Service Type</span>
                <span className="text-white block font-serif truncate">{selectedService?.name}</span>
              </div>
              <div>
                <span className="text-accent-gold block text-[9px] uppercase">Scheduled Time</span>
                <span className="text-white block font-serif truncate">
                  {isCustomService ? "Flexible Scoping" : `${activeDate} at ${selectedTime}`}
                </span>
              </div>
            </div>

            {/* Input Form Fields */}
            <div className="bg-[#1C1F32] p-6 rounded-2xl border border-white/5 space-y-4">
              
              {/* Double row for name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-warm-cream/60">First name <span className="text-coral-pop">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Thabo"
                    value={formValues.firstName}
                    onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })}
                    className={`w-full bg-ink-navy/60 border rounded-xl py-2 px-3 text-xs font-mono text-warm-cream outline-none focus:border-accent-gold transition-all ${
                      formErrors.firstName ? "border-coral-pop" : "border-white/10"
                    }`}
                  />
                  {formErrors.firstName && <span className="text-[10px] text-coral-pop font-mono block">{formErrors.firstName}</span>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-warm-cream/60">Last name <span className="text-coral-pop">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nkosi"
                    value={formValues.lastName}
                    onChange={(e) => setFormValues({ ...formValues, lastName: e.target.value })}
                    className={`w-full bg-ink-navy/60 border rounded-xl py-2 px-3 text-xs font-mono text-warm-cream outline-none focus:border-accent-gold transition-all ${
                      formErrors.lastName ? "border-coral-pop" : "border-white/10"
                    }`}
                  />
                  {formErrors.lastName && <span className="text-[10px] text-coral-pop font-mono block">{formErrors.lastName}</span>}
                </div>
              </div>

              {/* Email & Phone numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-warm-cream/60">Email address <span className="text-coral-pop">*</span></label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formValues.email}
                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                    className={`w-full bg-ink-navy/60 border rounded-xl py-2 px-3 text-xs font-mono text-warm-cream outline-none focus:border-accent-gold transition-all ${
                      formErrors.email ? "border-coral-pop" : "border-white/10"
                    }`}
                  />
                  {formErrors.email && <span className="text-[10px] text-coral-pop font-mono block">{formErrors.email}</span>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-warm-cream/60">WhatsApp Phone number <span className="text-coral-pop">*</span></label>
                  <input
                    type="tel"
                    required
                    placeholder="+27 71 000 0000"
                    value={formValues.phone}
                    onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
                    className={`w-full bg-ink-navy/60 border rounded-xl py-2 px-3 text-xs font-mono text-warm-cream outline-none focus:border-accent-gold transition-all ${
                      formErrors.phone ? "border-coral-pop" : "border-white/10"
                    }`}
                  />
                  {formErrors.phone && <span className="text-[10px] text-coral-pop font-mono block">{formErrors.phone}</span>}
                </div>
              </div>

              {/* Special Instructions */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-warm-cream/60">Special Instructions or Task Requirements (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Please let me know if I need to carry my own USB disk, or if you also handle brochure bindings..."
                  value={formValues.instructions}
                  onChange={(e) => setFormValues({ ...formValues, instructions: e.target.value })}
                  className="w-full bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs font-sans text-warm-cream outline-none focus:border-accent-gold transition-all"
                />
              </div>

              {/* Promo validation box */}
              <div className="space-y-1 pt-2">
                <label className="text-xs font-mono text-warm-cream/60">Promo / Gift card code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. STUDENT20"
                    value={formValues.promoCode}
                    onChange={(e) => setFormValues({ ...formValues, promoCode: e.target.value })}
                    className="flex-1 bg-ink-navy/60 border border-white/10 rounded-xl py-2 px-3 text-xs font-mono text-warm-cream outline-none focus:border-accent-gold transition-all uppercase"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 rounded-xl bg-accent-gold text-studio-navy font-bold text-xs tracking-wider"
                  >
                    Apply code
                  </button>
                </div>
                {promoError && <span className="text-[10px] text-coral-pop font-mono block">{promoError}</span>}
                {promoApplied && (
                  <span className="text-[10px] text-success-green font-mono block flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" /> Coupon Applied successfully! ({discountPercent}% Discount)
                  </span>
                )}
              </div>
            </div>

            {/* WhatsApp Notify Consent */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#1D261E] border border-success-green/20">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-white">Send booking confirmation via WhatsApp</span>
                <p className="text-[10px] text-warm-cream/60 leading-none">Instant alerts directly to your phone. Muted option anytime.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={whatsAppConsent}
                  onChange={() => setWhatsAppConsent(!whatsAppConsent)}
                  className="sr-only peer" 
                />
                <div className="w-9 h-5 bg-neutral-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-success-green"></div>
              </label>
            </div>

            {/* Shield Check Privacy Notice */}
            <div className="p-4 bg-soft-lavender/5 border border-soft-lavender/25 rounded-xl flex gap-3 text-left">
              <ShieldCheck className="w-5 h-5 text-soft-lavender shrink-0 mt-0.5" />
              <p className="text-[10.5px] text-[#C3B1E1] leading-relaxed">
                <strong>Your privacy is secure.</strong> We strictly adhere to the South African POPI Act. Customer billing data and personal details are encrypted and never distributed to exterior parties.
              </p>
            </div>

            {/* Navigation Drawer Bottom */}
            <div className="flex justify-between pt-4 border-t border-white/5">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-5 py-3 rounded-xl border border-white/10 hover:border-accent-gold hover:bg-white/5 font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleStep3Continue}
                className="px-8 py-3 rounded-xl bg-accent-gold text-studio-navy hover:bg-[#e0b430] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Review booking</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: REVIEW & CONFIRM ================= */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="text-center sm:text-left space-y-1">
              <span className="text-xs font-mono text-accent-gold">STEP 4 OF 4</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold dark:text-white light:text-studio-navy">Review & Confirm Placement</h2>
              <p className="text-xs text-warm-cream/65 light:text-studio-navy/70">Verify your details, select your preferred payment mode, and securely complete transaction.</p>
            </div>

            {/* Detailed Summary Receipt Card */}
            <div className="bg-[#1C1F32] p-6 rounded-2xl border border-white/10 space-y-4">
              <span className="text-xs font-mono text-accent-gold uppercase block border-b border-white/5 pb-2">Booking Summary</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs">
                <div className="flex justify-between border-b border-white/5 py-1.5">
                  <span className="text-warm-cream/60">Service Category</span>
                  <span className="font-semibold text-white font-mono">{selectedService?.category}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 py-1.5">
                  <span className="text-warm-cream/60">Selected Digital Service</span>
                  <span className="font-semibold text-white font-serif">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 py-1.5">
                  <span className="text-warm-cream/60">Session Duration</span>
                  <span className="font-semibold text-white font-mono">{selectedDuration}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 py-1.5">
                  <span className="text-warm-cream/60">Date & Slot Target</span>
                  <span className="font-semibold text-white font-serif">
                    {isCustomService ? "Flexible Scoping" : `${activeDate} at ${selectedTime}`}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 py-1.5">
                  <span className="text-warm-cream/60">Primary User Contact</span>
                  <span className="font-semibold text-white">{formValues.firstName} {formValues.lastName}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 py-1.5">
                  <span className="text-warm-cream/60">Contact Number</span>
                  <span className="font-semibold text-white font-mono">{formValues.phone}</span>
                </div>
              </div>

              {/* Financial Dividers */}
              <div className="pt-4 border-t border-white/5 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-warm-cream/60">Service Subtotal</span>
                  <span className="font-mono text-white">R{originalPrice.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-success-green">
                    <span>Discount Applied ({discountPercent}%)</span>
                    <span>-R{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
                  <span className="text-sm font-semibold text-white">Total due</span>
                  <span className="text-xl font-serif font-bold text-accent-gold font-mono text-2xl">R{finalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selector Grid */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono text-warm-cream/60 uppercase">Choose Settlement Method</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: "Card", desc: "Visa, Mastercard via PayFast", note: "Online credit/debit card" },
                  { name: "EFT / Bank transfer", desc: "Instant SA bank transfer", note: "Submit proof within 2hr" },
                  { name: "Cash on arrival", desc: "Pay physically at cafe desk", note: "Holds seat for 30mins" },
                  { name: "PayFast", desc: "Secure PayFast portal integration", note: "Fastest checkout" }
                ].map((pay) => {
                  const isSelected = selectedPayment === pay.name;
                  return (
                    <div
                      key={pay.name}
                      onClick={() => setSelectedPayment(pay.name)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer relative flex items-start gap-3 ${
                        isSelected
                          ? "bg-accent-gold/10 border-accent-gold text-white"
                          : "bg-[#1E1F35] light:bg-white border-white/5 hover:border-accent-gold/30 text-warm-cream light:text-studio-navy"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-accent-gold text-studio-navy" : "bg-ink-navy/40 text-accent-gold"
                      }`}>
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5 select-none">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-semibold">{pay.name}</h5>
                          {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-accent-gold block absolute top-4 right-4 ring-2 ring-accent-gold/40"></span>}
                        </div>
                        <p className="text-[10px] text-warm-cream/60 leading-none">{pay.desc}</p>
                        <p className="text-[9px] text-accent-gold/80 italic font-mono pt-1 leading-none">{pay.note}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Free cancellation and agreement notice */}
            <div className="p-4 bg-orange-500/5 border border-orange-500/20 text-orange-400 rounded-xl text-[10px] leading-relaxed flex items-center gap-2">
              <HelpCircle className="w-4 h-4 shrink-0 text-orange-400" />
              <span>
                <strong>Cancellation Policy:</strong> Free cancellation up to 2 hours before your session. Late cancellations may incur a 50% reservation hold fee. By clicking below you agree to the conditions.
              </span>
            </div>

            {/* Navigation Row & Pay Lock */}
            <div className="flex justify-between pt-4 border-t border-white/5">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-5 py-3 rounded-xl border border-white/10 hover:border-accent-gold hover:bg-white/5 font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleConfirmAndPay}
                disabled={isSubmitting}
                className={`px-8 py-3.5 rounded-xl bg-accent-gold text-studio-navy hover:bg-[#e0b430] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-accent-gold/30 scale-102 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-studio-navy border-t-transparent rounded-full animate-spin"></span>
                    <span>Processing Securely...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Confirm & Secure Placement</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 5: CONFIRMATION SUCCESS SCREEN ================= */}
        {currentStep === 5 && confirmedBooking && (
          <div className="bg-[#1C1F32] p-8 rounded-3xl border border-white/10 text-center max-w-xl mx-auto space-y-6 shadow-2xl relative overflow-hidden">
            {/* Absolute faint party green glow */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-success-green"></div>

            <div className="w-16 h-16 rounded-full bg-success-green/10 border border-success-green/30 text-success-green flex items-center justify-center mx-auto shadow-xl">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Booking Confirmed!</h2>
              <p className="text-xs text-warm-cream/70 max-w-sm mx-auto">
                Your creative workstation has been secured. A confirmation summary is sent to <strong>{confirmedBooking.email}</strong> and via WhatsApp thread.
              </p>
            </div>

            {/* Receipt Booking Reference Code element */}
            <div className="py-3 px-4 rounded-xl bg-ink-navy/80 border border-white/5 inline-flex flex-col items-center">
              <span className="text-[9px] font-mono text-warm-cream/40 uppercase tracking-widest leading-none mb-1">REFERENCE HOLD CODE</span>
              <span className="text-sm font-mono font-bold text-accent-gold">{confirmedBooking.id}</span>
            </div>

            {/* Summary Details Rows */}
            <div className="border border-white/5 rounded-xl p-4 bg-ink-navy/40 text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-warm-cream/50">Recipient Name</span>
                <span className="text-white font-sans">{confirmedBooking.firstName} {confirmedBooking.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warm-cream/50">Requested Craft</span>
                <span className="text-white font-sans">{confirmedBooking.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warm-cream/50">Reservation Target</span>
                <span className="text-white font-sans">
                  {confirmedBooking.timeSlot === "Flexible" ? "Flexible scoping within 24hr" : `${confirmedBooking.date} at ${confirmedBooking.timeSlot}`}
                </span>
              </div>
              <div className="flex justify-between border-t border-white/5 pt-2 mt-2">
                <span className="text-accent-gold font-bold">Paid Settlement</span>
                <span className="text-accent-gold font-bold font-sans">R{confirmedBooking.totalDue.toFixed(2)} ({confirmedBooking.paymentMethod})</span>
              </div>
            </div>

            {/* Add to Calendar indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-[10px] font-mono">
              <div className="bg-[#141626] p-3 rounded-lg border border-white/5">
                <Mail className="w-4 h-4 mx-auto text-accent-gold mb-1" />
                <span className="block text-white">Confirmation Sent</span>
                <span className="text-warm-cream/40">Check your Inbox</span>
              </div>
              <div className="bg-[#141626] p-3 rounded-lg border border-white/5">
                <Calendar className="w-4 h-4 mx-auto text-[#B3A1C1] mb-1" />
                <span className="block text-white">Google Calendar</span>
                <a href="https://calendar.google.com" target="_blank" rel="noreferrer" className="text-accent-gold underline">Click to Add</a>
              </div>
              <div className="bg-[#141626] p-3 rounded-lg border border-white/5">
                <FileText className="w-4 h-4 mx-auto text-success-green mb-1" />
                <span className="block text-white">Download Receipt</span>
                <button onClick={() => window.print()} className="text-accent-gold underline">Print PDF</button>
              </div>
            </div>

            {/* Reset CTA */}
            <div className="pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-accent-gold text-studio-navy font-bold text-xs uppercase tracking-wider hover:bg-[#e0b430]"
              >
                Book Another session
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
