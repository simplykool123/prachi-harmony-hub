import {
  Building2,
  Factory,
  Gem,
  Globe2,
  Hand,
  Home,
  Map,
  Palette,
  Sparkles,
  Star,
  Triangle,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const navItems = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Vastu Guide", to: "/vastu-guide" },
  { label: "Heer", to: "/heer" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
] as const;

export type Service = {
  name: string;
  description: string;
  icon: LucideIcon;
  featured?: boolean;
};

export const services: Service[] = [
  {
    name: "Palm + Vastu Combo",
    description: "Prachi's signature — align inner self and outer space in one reading",
    icon: Gem,
    featured: true,
  },
  {
    name: "Residential Vastu",
    description: "Harmonise your home for health, peace and prosperity",
    icon: Home,
  },
  {
    name: "Commercial Vastu",
    description: "Offices, shops, showrooms and hotels aligned for growth",
    icon: Building2,
  },
  {
    name: "Industrial Vastu",
    description: "Factories and warehouses optimised for productivity and safety",
    icon: Factory,
  },
  {
    name: "Palmistry Reading",
    description: "A deep reading of your palm — personality, career and life path",
    icon: Hand,
  },
  {
    name: "Geo Stress Correction",
    description: "Detect and neutralise hidden geopathic earth energies",
    icon: Zap,
  },
  {
    name: "Pyramidology",
    description: "Sacred geometry pyramids to correct Vastu without renovation",
    icon: Triangle,
  },
  {
    name: "Energy Balancing",
    description: "Restore positive energy flow in any home or office",
    icon: Sparkles,
  },
  {
    name: "Colour Guidelines",
    description: "Vastu-approved colour palettes for each room and direction",
    icon: Palette,
  },
  {
    name: "Remote Consultation",
    description: "Expert guidance from anywhere in the world",
    icon: Globe2,
  },
  {
    name: "Plot Selection",
    description: "Choose the right plot before you build — avoid costly mistakes",
    icon: Map,
  },
  {
    name: "Career Astrology",
    description: "Chart-guided decisions for career and business timing",
    icon: Star,
  },
];

export const cities = ["Mumbai", "Pune", "Nashik", "Kopargaon"];

export const whatsappUrl =
  "https://wa.me/91XXXXXXXXXX?text=Hi%20Prachi%2C%20I%20would%20like%20to%20book%20a%20consultation.";
