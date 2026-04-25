import {
  Award,
  Building2,
  BriefcaseBusiness,
  Droplets,
  Factory,
  Gem,
  Globe2,
  Hand,
  Home,
  Landmark,
  Leaf,
  Map,
  Palette,
  Sparkles,
  Star,
  SunMedium,
  Triangle,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Vastu Guide", to: "/vastu-guide" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
] as const;

export type Service = {
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  featured?: boolean;
};

export const services: Service[] = [
  {
    name: "Palm + Vastu Combo",
    slug: "palm-vastu-combo",
    description: "Prachi’s signature consultation connecting personal patterns with the energy of your home or workspace.",
    icon: Gem,
    featured: true,
  },
  {
    name: "Residential Vastu",
    slug: "residential-vastu",
    description: "Room-by-room corrections for sleep, health, relationships and a calmer everyday rhythm.",
    icon: Home,
  },
  {
    name: "Commercial Vastu",
    slug: "commercial-vastu",
    description: "Practical desk, entrance and team-zone alignment for offices, shops, showrooms and hotels.",
    icon: Building2,
  },
  {
    name: "Industrial Vastu",
    slug: "industrial-vastu",
    description: "Factory and warehouse planning that supports smoother movement, productivity and safety.",
    icon: Factory,
  },
  {
    name: "Palmistry Reading",
    slug: "palmistry",
    description: "A focused reading of personality, timing, strengths, career direction and relationship patterns.",
    icon: Hand,
  },
  {
    name: "Geo Stress Correction",
    slug: "geo-stress",
    description: "Identify disturbed zones and apply non-invasive remedies for beds, desks and high-use areas.",
    icon: Zap,
  },
  {
    name: "Pyramidology",
    slug: "pyramidology",
    description: "Targeted pyramid placements to correct imbalances when renovation is not possible.",
    icon: Triangle,
  },
  {
    name: "Energy Balancing",
    slug: "energy-balancing",
    description: "Element-led corrections using light, plants, water, metal and movement to refresh blocked spaces.",
    icon: Sparkles,
  },
  {
    name: "Colour Guidelines",
    slug: "colour-guidelines",
    description: "Premium colour direction for bedrooms, offices, entrances and commercial interiors.",
    icon: Palette,
  },
  {
    name: "Remote Consultation",
    slug: "remote",
    description: "Plan review and guided corrections through video sessions for clients across India and overseas.",
    icon: Globe2,
  },
  {
    name: "Plot Selection",
    slug: "plot-selection",
    description: "Evaluate land shape, slope, entry, road position and build potential before investing.",
    icon: Map,
  },
  {
    name: "Career Astrology",
    slug: "career-astrology",
    description: "Chart-guided clarity for professional decisions, business timing and important transitions.",
    icon: Star,
  },
];

export const remedyHighlights = [
  { title: "Entrance clarity", description: "Clear the threshold, improve light, and place grounding elements to invite steadier energy.", icon: SunMedium },
  { title: "Bedroom balance", description: "Adjust bed position, colours and bedside symmetry for deeper rest and emotional ease.", icon: Leaf },
  { title: "Water placement", description: "Use simple bowls, plants or fountains only where they support prosperity and calm.", icon: Droplets },
  { title: "Work desk alignment", description: "Reorient desks and decision zones to strengthen focus, authority and business flow.", icon: BriefcaseBusiness },
];

export const awards = [
  { title: "Thailand Honorary Doctorate", description: "Conferred by the International Astrology Federation Inc. at the Thailand Triangle Summit.", icon: Award },
  { title: "International Astro Purohit Award", description: "Awarded for outstanding contribution to the science of Vastu and Astrology.", icon: Landmark },
];

export const globalPresence = ["India", "UAE", "UK", "USA", "Singapore", "Australia"];

export const cities = ["Mumbai", "Pune", "Nashik", "Kopargaon"];

export const whatsappUrl =
  "https://wa.me/91XXXXXXXXXX?text=Hi%20Prachi%2C%20I%20would%20like%20to%20book%20a%20consultation.";
