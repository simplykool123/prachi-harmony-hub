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

export type AwardItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
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
  {
    name: "Geo Stress Correction",
    slug: "geo-stress",
    description: "Identify disturbed zones and apply non-invasive remedies for beds, desks and high-use areas.",
    icon: Zap,
  },
];

export const remedyHighlights = [
  { title: "Entrance clarity", description: "Clear the threshold, improve light, and place grounding elements to invite steadier energy.", icon: SunMedium },
  { title: "Bedroom balance", description: "Adjust bed position, colours and bedside symmetry for deeper rest and emotional ease.", icon: Leaf },
  { title: "Water placement", description: "Use simple bowls, plants or fountains only where they support prosperity and calm.", icon: Droplets },
  { title: "Work desk alignment", description: "Reorient desks and decision zones to strengthen focus, authority and business flow.", icon: BriefcaseBusiness },
];

export const awards: AwardItem[] = [
  { title: "Thailand Honorary Doctorate", description: "Awarded by the International Astrology Federation Inc., an American Research Organization.", icon: Award, image: "/site-images/awards/thailand-honorary-doctorate.jpg" },
  { title: "International Astro Purohit Award", description: "Awarded by the International Astrology Federation Inc. for participation in the Thailand Triangle Summit, Pattaya.", icon: Landmark, image: "/site-images/awards/international-astro-purohit-award.jpg" },
  { title: "Indo Thailand-Vastu Brihaspati Award", description: "Recognition from the International Astrology Federation Inc. during the Thailand Triangle Summit held in Pattaya.", icon: Award, image: "/site-images/awards/indo-thailand-vastu-brihaspati-award.jpg" },
  { title: "Indo Thailand Jyotish Puraskar Award", description: "Awarded for participation in the Thailand Triangle Summit covering medical astrology, numerology and Vastu.", icon: Landmark, image: "/site-images/awards/indo-thailand-jyotish-puraskar-award.jpg" },
  { title: "Certified Medical Astrological Proficiency", description: "Certification received through the International Astrology Federation Inc. at the Thailand Triangle Summit.", icon: Award, image: "/site-images/awards/certified-medical-astrological-proficiency.jpg" },
];

export const customerStories = [
  { quote: "When faced with tough decisions, I got some valuable advice and astrological guidance. Miss Prachi Fulfagar was very supportive and informative.", name: "Akshay Dixit", role: "Engineer" },
  { quote: "I would highly recommend Arash Consultant to anyone looking for guidance and direction through astrology. Their honest approach and patience is unbelievable.", name: "Abhi Jain", role: "Owner, Pragati Turf" },
  { quote: "One of the best Career Consultant organisations in Nashik. The counselling was truly satisfying and every point was explained in detail.", name: "Prashant Marathe", role: "Digital Marketer" },
  { quote: "Your astrological insights have greatly enhanced our business strategy. Your advice is invaluable in guiding our decisions and navigating challenges.", name: "Rahul Bhingardive", role: "Business Manager" },
  { quote: "Your thorough understanding of Vastu principles and practical recommendations have made a positive difference in our space.", name: "Krishna", role: "Pigmy Agent" },
  { quote: "Your insights into astrological trends have been invaluable in identifying new business opportunities and have significantly contributed to our growth.", name: "Vaishali", role: "Business Development Manager" },
];

export const globalPresence = ["India", "UAE", "UK", "USA", "Singapore", "Australia"];

export const cities = ["Mumbai", "Pune", "Nashik", "Kopargaon"];

export const socialLinks = {
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  youtube: "https://youtube.com",
} as const;

export const whatsappUrl =
  "https://wa.me/91XXXXXXXXXX?text=Hi%20Prachi%2C%20I%20would%20like%20to%20book%20a%20consultation.";
