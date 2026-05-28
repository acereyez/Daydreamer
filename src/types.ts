export enum ServiceCategory {
  ALL = "All",
  INTERNET = "Internet & Browsing",
  DESIGN = "Design (Adobe)",
  PHOTOSHOP = "Photoshop",
  ILLUSTRATOR = "Illustrator",
  PHOTOGRAPHY = "Photography",
  PRINTING = "Printing",
  VIDEO = "Video",
  OFFICE = "Office & Admin",
  EXTRAS = "Extras",
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  price: number;
  priceType: "fixed" | "starting" | "per_hour" | "per_page";
  duration: string;
  icon: string; // Lucide icon name
  popular?: boolean;
  priceHistory?: Array<{ oldPrice: number; newPrice: number; date: string }>;
}

export type BookingStatus = "Pending" | "Confirmed" | "In Progress" | "Completed" | "Cancelled" | "No-show";

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  duration: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "11:00"
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialInstructions?: string;
  promoCode?: string;
  whatsAppNotify: boolean;
  status: BookingStatus;
  totalDue: number;
  paymentMethod: string;
  createdAt: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  toolsUsed: string[];
  isFeatured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: string;
  authorInitials: string;
  isFeatured: boolean;
  imageUrl: string;
}

export interface Promotion {
  id: string;
  name: string;
  description: string;
  promoCode: string;
  discountPercent: number; // e.g. 20 for 20%
  isHomepageTicker: boolean;
  expiryDate: string;
}

export interface BusinessDay {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

export interface ContactDetails {
  address: string;
  email: string;
  phone: string;
  whatsapp: string;
  monThuHours: string;
  friHours: string;
  satHours: string;
  sunHours: string;
  formspreeId?: string;
  payfastMerchantId?: string;
  payfastMerchantKey?: string;
  paymentGateway?: "PayFast Sandbox" | "PayFast Live" | "Direct EFT / Cash Hold";
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  desc: string;
  avatar: string; // Avatar initials
}


