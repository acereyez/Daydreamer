import { Service, ServiceCategory, PortfolioItem, BlogPost, Promotion, BusinessDay, Booking, ContactDetails, TeamMember } from "../types";

export const INITIAL_SERVICES: Service[] = [
  // Internet & Browsing
  {
    id: "srv-pc-hourly",
    name: "Hourly PC Access",
    description: "High-speed browsing & creative workstations with full software access.",
    category: ServiceCategory.INTERNET,
    price: 15,
    priceType: "per_hour",
    duration: "1 hr",
    icon: "Monitor",
    popular: true
  },
  {
    id: "srv-pc-student",
    name: "Student Support Bundle (4 hr)",
    description: "Discounted multi-hour workstation pass for studies, research, and writing.",
    category: ServiceCategory.INTERNET,
    price: 45,
    priceType: "fixed",
    duration: "4 hrs",
    icon: "GraduationCap"
  },
  {
    id: "srv-pc-fullday",
    name: "Full Day Pass",
    description: "Uncapped, high-speed connection and zero interruption creative workspace.",
    category: ServiceCategory.INTERNET,
    price: 100,
    priceType: "fixed",
    duration: "8 hrs",
    icon: "CalendarRange"
  },
  {
    id: "srv-booth",
    name: "Private Meeting Booth",
    description: "Sound-dampened private booth equipped with workstation for calls & focus.",
    category: ServiceCategory.INTERNET,
    price: 30,
    priceType: "per_hour",
    duration: "1 hr",
    icon: "Mic"
  },
  {
    id: "srv-pc-weekly",
    name: "Co-working Hot Desk Weekly Pass",
    description: "Get 5 full days of dynamic workspace desk access featuring high-speed uncapped fiber and dedicated power backup.",
    category: ServiceCategory.INTERNET,
    price: 350,
    priceType: "fixed",
    duration: "5 days",
    icon: "CalendarRange"
  },
  {
    id: "srv-booth-podcast",
    name: "Studio Podcast Sound Booth",
    description: "Sound-insulated booth equipped with professional USB studio condenser microphones, pop filters, and multi-track audio software.",
    category: ServiceCategory.INTERNET,
    price: 80,
    priceType: "per_hour",
    duration: "1 hr",
    icon: "Mic",
    popular: true
  },

  // Design (Adobe Suite)
  {
    id: "srv-ds-logo",
    name: "Logo Design Service",
    description: "High-impact custom dynamic logos tailored perfectly for your rising brand identity.",
    category: ServiceCategory.DESIGN,
    price: 150,
    priceType: "starting",
    duration: "Custom",
    icon: "Palette",
    popular: true
  },
  {
    id: "srv-ds-flyer",
    name: "Flyer & Poster Design",
    description: "Eye-catching, professional promotional prints designed to capture rapid attention.",
    category: ServiceCategory.DESIGN,
    price: 80,
    priceType: "starting",
    duration: "Same Day",
    icon: "Layers"
  },
  {
    id: "srv-ds-bizcard",
    name: "Business Card Design",
    description: "Custom layout of professional cards that define authority. Deliver files ready for print.",
    category: ServiceCategory.DESIGN,
    price: 100,
    priceType: "starting",
    duration: "Same Day",
    icon: "Contact"
  },
  {
    id: "srv-ds-social",
    name: "Social Branding Template Kit",
    description: "Custom package containing 6 bespoke social media templates for Instagram, Facebook or LinkedIn, layered & print-ready.",
    category: ServiceCategory.DESIGN,
    price: 400,
    priceType: "starting",
    duration: "2 days",
    icon: "Layers"
  },
  {
    id: "srv-ds-stationery",
    name: "Corporate Letterhead & Stationery",
    description: "Polished digital design of business invoice sheets, official letterheads, and corporate envelopes aligned with brand guides.",
    category: ServiceCategory.DESIGN,
    price: 150,
    priceType: "starting",
    duration: "Same Day",
    icon: "FileText"
  },

  // Photoshop
  {
    id: "srv-ps-retouch",
    name: "Professional Photo Retouching",
    description: "Expert editorial skin and blemish retouch, portrait enhancements, and tone curves.",
    category: ServiceCategory.PHOTOSHOP,
    price: 60,
    priceType: "starting",
    duration: "Same Day",
    icon: "Sparkles"
  },
  {
    id: "srv-ps-bgnuke",
    name: "Background Removal",
    description: "Surgical cutout of models or products. Ideal for commercial catalogs.",
    category: ServiceCategory.PHOTOSHOP,
    price: 30,
    priceType: "starting",
    duration: "Same Day",
    icon: "Scissors"
  },
  {
    id: "srv-ps-restore",
    name: "Vintage Photo Restoration",
    description: "Reconstruct torn, stained, faded, or scratched heritage family legacy photographs.",
    category: ServiceCategory.PHOTOSHOP,
    price: 90,
    priceType: "starting",
    duration: "Custom",
    icon: "History",
    popular: true
  },
  {
    id: "srv-ps-mockup",
    name: "Custom Product Cover Mockups",
    description: "Professional placements of digital client designs onto realistic clothing, book, container, or card mockups for commercial galleries.",
    category: ServiceCategory.PHOTOSHOP,
    price: 50,
    priceType: "starting",
    duration: "Same Day",
    icon: "Image"
  },

  // Illustrator
  {
    id: "srv-ai-vector",
    name: "Custom Vector Illustration",
    description: "Scalable vector designs, custom artwork, characters or precise schematic representations.",
    category: ServiceCategory.ILLUSTRATOR,
    price: 200,
    priceType: "starting",
    duration: "Custom",
    icon: "PenTool"
  },
  {
    id: "srv-ai-brandkit",
    name: "Complete Brand Identity Kit",
    description: "Comprehensive visual kit with typography, asset color guidelines, logos, and layouts.",
    category: ServiceCategory.ILLUSTRATOR,
    price: 300,
    priceType: "starting",
    duration: "Custom",
    icon: "Briefcase"
  },
  {
    id: "srv-ai-indesign",
    name: "Magazine Layout & Menu Print Design",
    description: "Multi-page layout typography and geometric vector guides for corporate newsletters, menus, catalogs, or reports.",
    category: ServiceCategory.ILLUSTRATOR,
    price: 240,
    priceType: "starting",
    duration: "Custom",
    icon: "PenTool"
  },

  // Photography
  {
    id: "srv-ph-id",
    name: "ID & Passport Photo Shoot",
    description: "Biometric-compliant photographs shot & printed in minutes with custom retouches.",
    category: ServiceCategory.PHOTOGRAPHY,
    price: 60,
    priceType: "fixed",
    duration: "~15 min",
    icon: "Camera",
    popular: true
  },
  {
    id: "srv-ph-portrait",
    name: "Quick Portrait Session",
    description: "Studio portrait on clean backing for Linkedin, resumes, templates, or media cards.",
    category: ServiceCategory.PHOTOGRAPHY,
    price: 250,
    priceType: "starting",
    duration: "Same Day",
    icon: "UserSquare"
  },
  {
    id: "srv-ph-flatlay",
    name: "eCommerce Product Flatlay Shoot",
    description: "Studio lit, professionally captured product photos on custom colored backdrops, optimized for online shopping shops.",
    category: ServiceCategory.PHOTOGRAPHY,
    price: 380,
    priceType: "starting",
    duration: "Same Day",
    icon: "Camera",
    popular: true
  },
  {
    id: "srv-ph-headshot",
    name: "Social Media Portrait Shoot",
    description: "Express portrait mini-session with professional natural lighting, perfect for LinkedIn, resume, or branding pages.",
    category: ServiceCategory.PHOTOGRAPHY,
    price: 180,
    priceType: "fixed",
    duration: "~20 min",
    icon: "UserSquare"
  },

  // Printing
  {
    id: "srv-pr-bw",
    name: "B&W Standard Document Printing",
    description: "High-speed laser printing of text documents, contracts, or drafts.",
    category: ServiceCategory.PRINTING,
    price: 2,
    priceType: "per_page",
    duration: "~10 min",
    icon: "Printer"
  },
  {
    id: "srv-pr-col",
    name: "Colour Graphic Printing",
    description: "Vibrant high-density ink printouts for documents, CVs, matrices or custom reports.",
    category: ServiceCategory.PRINTING,
    price: 5,
    priceType: "per_page",
    duration: "~10 min",
    icon: "Compass"
  },
  {
    id: "srv-pr-photo",
    name: "Photo Quality Glossy Printing",
    description: "Premium high-grade photographic prints designed to last lifetimes.",
    category: ServiceCategory.PRINTING,
    price: 15,
    priceType: "per_page",
    duration: "~15 min",
    icon: "Image",
    popular: true
  },
  {
    id: "srv-pr-lam",
    name: "Thermal Sheet Lamination",
    description: "Hot thermal laminating protective plastic sleeve for certificates, passes and lists.",
    category: ServiceCategory.PRINTING,
    price: 20,
    priceType: "fixed",
    duration: "~5 min",
    icon: "Layers"
  },
  {
    id: "srv-pr-bind",
    name: "Frosted Spiral Booklet Binding",
    description: "Collate professional books, essays or briefs with durable frosted spiral combs.",
    category: ServiceCategory.PRINTING,
    price: 35,
    priceType: "fixed",
    duration: "~15 min",
    icon: "FileText"
  },
  {
    id: "srv-pr-bulk",
    name: "Bulk Fast Document Scanning",
    description: "Automated high-speed document scan to multi-page clean PDFs straight to email.",
    category: ServiceCategory.PRINTING,
    price: 15,
    priceType: "starting",
    duration: "~10 min",
    icon: "Printer"
  },
  {
    id: "srv-pr-wide",
    name: "Wide-Format Poster Printing (A2 - A0)",
    description: "Large-scale printing onto heavyweight presentation paper or high-density architectural drawing cards.",
    category: ServiceCategory.PRINTING,
    price: 95,
    priceType: "per_page",
    duration: "~20 min",
    icon: "Compass"
  },
  {
    id: "srv-pr-press",
    name: "Premium Sublimation Press (Mug/T-Shirt)",
    description: "High-temperature heat press transferring gorgeous design graphics directly onto solid mugs or apparel cotton fabrics.",
    category: ServiceCategory.PRINTING,
    price: 130,
    priceType: "fixed",
    duration: "Same Day",
    icon: "Layers"
  },

  // Video
  {
    id: "srv-vd-edit",
    name: "Creative Video Editing",
    description: "Cutting, transitions, text overlays, audio sync, and grading for short videos.",
    category: ServiceCategory.VIDEO,
    price: 300,
    priceType: "starting",
    duration: "Custom",
    icon: "Video"
  },
  {
    id: "srv-vd-reels",
    name: "Viral Reels & TikTok Assembly",
    description: "Fast-paced hooks, subtitles, and audio integration optimized for social search feeds.",
    category: ServiceCategory.VIDEO,
    price: 150,
    priceType: "starting",
    duration: "Same Day",
    icon: "Film"
  },
  {
    id: "srv-vd-vlog",
    name: "YouTube / Long-Form Vlog Editing",
    description: "Stitching multi-cam sequences, color grading, caption adding, and integration of unlicensed audio clips (up to 12 minutes).",
    category: ServiceCategory.VIDEO,
    price: 450,
    priceType: "starting",
    duration: "Custom",
    icon: "Video"
  },

  // Office & Admin
  {
    id: "srv-of-cv",
    name: "Professional CV / Resume Typing",
    description: "Get typed, structured, and cleanly formatted layouts that stand out for hiring.",
    category: ServiceCategory.OFFICE,
    price: 80,
    priceType: "fixed",
    duration: "Same Day",
    icon: "FileText"
  },
  {
    id: "srv-of-form",
    name: "Online Government Applications",
    description: "Assistance with online application forms, registrations, profile setups or uploads.",
    category: ServiceCategory.OFFICE,
    price: 40,
    priceType: "fixed",
    duration: "~30 min",
    icon: "HelpCircle"
  },
  {
    id: "srv-of-scpc",
    name: "SARS & Business CIPC Registration Guide",
    description: "Assisting young founders with the step-by-step registration of custom new companies and obtaining active tax certificates.",
    category: ServiceCategory.OFFICE,
    price: 160,
    priceType: "fixed",
    duration: "1 hr",
    icon: "HelpCircle"
  },
  {
    id: "srv-of-cover",
    name: "Custom Cover Letter Copywriting",
    description: "Drafting custom, tailored cover letters designed to align with corporate vacancies or creative agency internship applications.",
    category: ServiceCategory.OFFICE,
    price: 60,
    priceType: "fixed",
    duration: "Same Day",
    icon: "FileText"
  },

  // Extras
  {
    id: "srv-ex-usb",
    name: "USB & Data Backup Transfer",
    description: "Secure, virus-scanned files migration between phones, USB keys, and online drives.",
    category: ServiceCategory.EXTRAS,
    price: 20,
    priceType: "fixed",
    duration: "~15 min",
    icon: "Usb"
  },
  {
    id: "srv-ex-cloud",
    name: "Cloud Upload Sync Assistance",
    description: "Format, compress, and sync large files directly into secure Google Drive or Dropbox.",
    category: ServiceCategory.EXTRAS,
    price: 30,
    priceType: "fixed",
    duration: "~15 min",
    icon: "CloudLightning"
  },
  {
    id: "srv-ex-rush",
    name: "Ultra Overnight Rush Processing Fee",
    description: "Bypass standard queues and obtain finished creative assets, design prints, or restored works within a guaranteed 12-hour window.",
    category: ServiceCategory.EXTRAS,
    price: 150,
    priceType: "fixed",
    duration: "<12 hrs",
    icon: "Sparkles"
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: "port-1",
    title: "Celestial Bakery Logo Design",
    description: "A gorgeous, golden-clad dynamic brand identity pairing deep celestial themes with organic handcrafted bakery vectors.",
    category: "Logos",
    imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop",
    toolsUsed: ["Illustrator", "Photoshop", "Brand Kit"],
    isFeatured: true
  },
  {
    id: "port-2",
    title: "Summer Solstice Gig Invitation",
    description: "Highly structural, modern flyer designed for Daydreamer records, capturing textured duotone colors.",
    category: "Flyers",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop",
    toolsUsed: ["Photoshop", "Typography Pairings"],
    isFeatured: true
  },
  {
    id: "port-3",
    title: "Dusk Silhouette Photo Enhancements",
    description: "Complex photographic retouching, color space adjustment, and detailed skin texture restoration.",
    category: "Photo Editing",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
    toolsUsed: ["Photoshop", "Lightroom"],
    isFeatured: true
  },
  {
    id: "port-4",
    title: "Cosmic Voyager Vector Artwork",
    description: "Precision vector work representing futuristic astronaut floating and painting among custom galaxy stars.",
    category: "Illustrations",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    toolsUsed: ["Illustrator"],
    isFeatured: false
  },
  {
    id: "port-5",
    title: "Vintage Archival Restoration",
    description: "Brought an original 1920s torn memory of a family back to lifetime clarity by custom photo restoration.",
    category: "Photo Editing",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop",
    toolsUsed: ["Photoshop", "Scanner Pro"],
    isFeatured: true
  },
  {
    id: "port-6",
    title: "Serene Studio Web Layout",
    description: "High fidelity interface mockup for a contemporary architecture clinic focused on clean, architectural lines.",
    category: "Web Design",
    imageUrl: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=600&auto=format&fit=crop",
    toolsUsed: ["Illustrator", "Figma"],
    isFeatured: false
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "post-1",
    title: "Navigating Adobe: Spotting Vector vs Raster Formats",
    summary: "A crisp guide to understanding when print shops require Illustrator files versus high-resolution Photoshop exports.",
    content: `
### Why Understanding Formats Saves You Cash

Every print studio or digital project relies heavily on crisp layouts. If you've ever submitted a logo for print only to have it outputted blurry, you fell victim to the **Raster vs Vector** trap!

Here is our quick creative studio guide to help you build like a pro:

1. **Raster Images (Photoshop)**
   * Built on pixels: fixed grids of color.
   * File formats: \`.png\`, \`.jpg\`, \`.tiff\`.
   * Best for: Detailed imagery, subtle background removals, and complex lighting.
   * Critical Limit: Scaling up too much leads to pixelated, blurry results.

2. **Vector Graphics (Illustrator)**
   * Built on geometric formulas: points, anchor lines, curves.
   * File formats: \`.svg\`, \`.ai\`, \`.eps\`.
   * Best for: Logos, bold typography, layout lines, and merchandise vectors.
   * Magic power: Scale it to the size of a billboard or as tiny as a stamp—it remains beautifully razor-sharp.

> **Rule of Thumb:** Logos must always begin their life in **Adobe Illustrator**. Photos of your team must proceed through **Photoshop**.

Need help getting your current logo pixel-purged and vectorized? Drop by Daydreamer and Sons' print & creative desk! We handle immediate vector conversions starting from just R200!
    `,
    category: "Design Tips",
    readTime: "3 min read",
    publishDate: "May 25, 2026",
    author: "Zola Dube (Studio Admin)",
    authorInitials: "ZD",
    isFeatured: true,
    imageUrl: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "post-2",
    title: "5 Formatting Hacks to Secure Your First Job Interview",
    summary: "Your CV design directly impacts a recruiter's first glance. Let's make it neat, visual, and highly clean.",
    content: `
### Beat the CV Filter in 5 Quick Steps

Did you know the average recruiter spends only **6-8 seconds** reviewing a resume? If your document is cluttered, uses bad default fonts, or is saved as a generic editable file, it's headed straight for the bin.

Here are the typography and design hacks used at Daydreamer and Sons' admin and typing desk:

#### 1. Reject Times New Roman
Go for clean, modern, highly legible sans-serif fonts:
* **Inter** or **DM Sans** for digital templates.
* **Helvetica** or **Arial** for robust classic corporate formats.

#### 2. Visual Hierarchy rules
Bold your titles, and make them slightly larger than the descriptive paragraph text:
* Main Title: 16pt Bold.
* Core Section Headers: 13pt Medium Gold/Navy color.
* Details: 10pt or 11pt Regular gray.

#### 3. Output as PDF Exclusive
Never submit your CV in Word (\`.docx\`) unless explicitly asked! Rich fonts shift, layouts break, and different operating systems render alignment differently. Send a pristine \`.pdf\` file.

#### 4. The One-Page limit
Keep it tight. Avoid sprawling logs of primary school rewards. Focus heavily on your impact, metrics, and technical skills.

#### 5. Stop by for Professional layout formatting!
At Daydreamer and Sons, we offer document scan and CV typing assistance from R80, ensuring your resume lands fully formatted, cleanly optimized, and saved directly to your cloud storage!
    `,
    category: "News",
    readTime: "4 min read",
    publishDate: "May 22, 2026",
    author: "Zola Dube (Studio Admin)",
    authorInitials: "ZD",
    isFeatured: false,
    imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "post-3",
    title: "Creative Inspiration: Crafting Cozy Space Workspace Aesthetics",
    summary: "Designing comfortable digital spaces increases focus. Insights behind how we designed Daydreamer and Sons.",
    content: `
### Aesthetics & Soundscapes: Designing Focus

When we set out to build Daydreamer and Sons, our primary goal was to step away from the stark, sterile gray of historical internet cafés. We wanted a warm twilight cocoon that sparks imagination.

Here are our principles for drafting creative focus atmospheres, whether at home or inside our studio:

* **Dark Mode is Health**: Blue light strains eyes. Selecting deep slate-navy limits fatigue during intensive design marathons.
* **Accent Touches Spark Joy**: Gold highlights guide the eye without creating overbearing visual noise.
* **The Living Room Vibe**: Potted plants, real warm wood framing, and low-frequency coffee shop jazz stimulate original ideas.
* **Work Station Density**: Ensure everyone gets generous elbow space. Standard monitors belong on arm mounts to keep workspaces free!

Next time you are working on a tough client brief, drop by, pick your desktop, order a warm cream macchiato, and let's craft!
    `,
    category: "Tutorials",
    readTime: "5 min read",
    publishDate: "May 18, 2026",
    author: "Zola Dube (Owner)",
    authorInitials: "ZD",
    isFeatured: false,
    imageUrl: "https://images.unsplash.com/photo-1502429808839-443b1b55a9ff?q=80&w=600&auto=format&fit=crop"
  }
];

export const INITIAL_PROMOTIONS: Promotion[] = [
  {
    id: "promo-student",
    name: "Student Special Offer",
    description: "Submit active student card and save 20% on all PC access time!",
    promoCode: "STUDENT20",
    discountPercent: 20,
    isHomepageTicker: true,
    expiryDate: "2026-12-31"
  },
  {
    id: "promo-creative",
    name: "Logo + Design Launch Bundle",
    description: "Launch your business! Get 15% discount on vector design packages.",
    promoCode: "LAUNCHe15",
    discountPercent: 15,
    isHomepageTicker: true,
    expiryDate: "2026-07-31"
  }
];

export const BUSINESS_HOURS: BusinessDay[] = [
  { day: "Monday", open: "08:00", close: "18:00", isClosed: false },
  { day: "Tuesday", open: "08:00", close: "18:00", isClosed: false },
  { day: "Wednesday", open: "08:00", close: "18:00", isClosed: false },
  { day: "Thursday", open: "08:00", close: "18:00", isClosed: false },
  { day: "Friday", open: "08:00", close: "19:00", isClosed: false },
  { day: "Saturday", open: "09:00", close: "16:00", isClosed: false },
  { day: "Sunday", open: "10:00", close: "15:00", isClosed: false }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "DDR-20260528-9844",
    serviceId: "srv-ds-logo",
    serviceName: "Logo Design Service",
    duration: "Custom",
    date: "2026-05-28",
    timeSlot: "12:00",
    firstName: "Thabo",
    lastName: "Nkosi",
    email: "thabo.nkosi@gmail.com",
    phone: "+27 71 504 3211",
    specialInstructions: "I'll be bringing a layout scratch concept. Looking for an elegant logo representing a food truck client.",
    whatsAppNotify: true,
    status: "Confirmed",
    totalDue: 150,
    paymentMethod: "EFT / Bank transfer",
    createdAt: "2026-05-27T10:00:00Z"
  },
  {
    id: "DDR-20260528-1025",
    serviceId: "srv-pc-hourly",
    serviceName: "Hourly PC Access",
    duration: "2 hours",
    date: "2026-05-28",
    timeSlot: "14:00",
    firstName: "Sanele",
    lastName: "Khumalo",
    email: "sanele.khumalo@hotmail.com",
    phone: "+27 82 431 0928",
    whatsAppNotify: true,
    status: "Confirmed",
    totalDue: 30,
    paymentMethod: "Cash on arrival",
    createdAt: "2026-05-28T09:15:00Z"
  },
  {
    id: "DDR-20260529-5742",
    serviceId: "srv-ph-id",
    serviceName: "ID & Passport Photo Shoot",
    duration: "~15 min",
    date: "2026-05-29",
    timeSlot: "10:00",
    firstName: "Chloe",
    lastName: "Smit",
    email: "chloe.s@webmail.co.za",
    phone: "+27 63 948 2911",
    whatsAppNotify: true,
    status: "Pending",
    totalDue: 60,
    paymentMethod: "Card",
    createdAt: "2026-05-28T14:20:00Z"
  }
];

export const INITIAL_CONTACT_DETAILS: ContactDetails = {
  address: "Suite 404, The Media Quarter, Somerset Road, De Waterkant, Cape Town, 8001",
  email: "hello@daydreamer.co.za",
  phone: "+27 (21) 448-2900",
  whatsapp: "+27 71 000 0000",
  monThuHours: "08:00 – 18:00",
  friHours: "08:00 – 19:00",
  satHours: "09:00 – 16:00",
  sunHours: "10:00 – 15:00",
  formspreeId: "xjgzlrrg",
  payfastMerchantId: "10000100",
  payfastMerchantKey: "46f0z6386qr72",
  paymentGateway: "PayFast Sandbox"
};

export const INITIAL_TEAM: TeamMember[] = [
  { 
    id: "team-1", 
    name: "Zola Dube", 
    role: "Co-Founder & Technical Lead", 
    desc: "Zola keeps our robust Gigabit gateway online, assists clients with advanced cloud operations, and operates our high-resolution archival scanners.", 
    avatar: "ZD" 
  },
  { 
    id: "team-2", 
    name: "Sipho Nkosi", 
    role: "Lead Graphic Illustrator", 
    desc: "Sipho operates our dedicated Photoshop and Illustrator rigs, converting client briefs into scalable vector assets and gorgeous restorations.", 
    avatar: "SN" 
  }
];


