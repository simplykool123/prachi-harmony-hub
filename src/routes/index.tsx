import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Compass, Flower2, Globe2, Hand, Leaf, MessageCircle, Moon, MoonStar, ShieldCheck, SunMoon, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountUp, MotionSection, SectionIntro } from "@/components/prachi/Motion";
import { ServiceCard } from "@/components/prachi/ServiceCard";
import { awards, customerStories, globalPresence, remedyHighlights, services, whatsappUrl } from "@/components/prachi/site-data";

const vastuPlanImage = "/site-images/prachi-vastu-plan.jpg";
const celestialPalmImage = "/site-images/prachi-celestial-palm.jpg";
const premiumPalmReadingImage = "/site-images/prachi-premium-palm-reading.jpg";
const homeRemediesImage = "/site-images/prachi-home-remedies.jpg";
const energyElementsImage = "/site-images/prachi-energy-elements.jpg";
const prachiPortraitImage = "/site-images/prachi-fulfagar-portrait.jpg";
const orangeArtworkImage = "/site-images/prachi-orange-artwork.png";
const celestialRingImage = "/site-images/prachi-celestial-ring.png";
const celestialSunImage = "/site-images/prachi-celestial-sun.png";
const celestialMoonImage = "/site-images/prachi-celestial-moon.png";
const impactHealthImage = "/site-images/prachi-impact-health.png";
const impactRelationshipImage = "/site-images/prachi-impact-relationship.png";
const impactBusinessImage = "/site-images/prachi-impact-business.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prachi Fulfagar | Vastu, Palmistry & Astrology" },
      { name: "description", content: "Award-winning Vastu, Palmistry and Vedic Astrology consultant serving India and international clients." },
      { property: "og:title", content: "Prachi Fulfagar | Ancient Wisdom for Harmony" },
      { property: "og:description", content: "Premium Vastu, Palmistry and Vedic Astrology consultations in India and worldwide." },
    ],
  }),
  component: Index,
});

const pillars = [
  ["01", "Palmistry", "Read your destiny through the lines and mounts of your palm"],
  ["02", "Vastu Shastra", "Align your space with the five elements for lasting harmony"],
  ["03", "Vedic Astrology", "Understand your cosmic path through planetary wisdom"],
];

const stats = [
  [20, "+", "Years of practice"],
  [5000, "+", "Clients worldwide"],
  [4, "", "City offices"],
  [12, "+", "Countries served"],
];

const impactItems = [
  ["Health", "Restful rooms, balanced elements and less environmental stress support calmer daily routines.", "sunrise"],
  ["Relationships", "Shared spaces are corrected for warmth, communication and emotional steadiness.", "hands"],
  ["Business", "Entrances, seating and decision zones are aligned for confidence, clarity and growth.", "growth"],
];

const processItems = [
  { icon: Compass, label: "Discovery", copy: "Understanding your space, goals & energy" },
  { icon: MoonStar, label: "Diagnosis", copy: "Analyzing energy patterns & identifying imbalances" },
  { icon: Flower2, label: "Design", copy: "Creating a Vastu-aligned space plan" },
  { icon: Leaf, label: "Alignment", copy: "Fine-tuning elements for harmony & flow" },
] as const;

const aboutStats = [
  { icon: Award, value: "20+", label: "Years of Practice" },
  { icon: Users, value: "5000+", label: "Clients Worldwide" },
  { icon: Globe2, value: "India &", label: "Worldwide" },
  { icon: ShieldCheck, value: "Trusted by", label: "Generations" },
] as const;

function CelestialMotion({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <div className="relative h-full w-full">
        <img src={celestialRingImage} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-contain opacity-80" />
        <img src={celestialSunImage} alt="" loading="lazy" decoding="async" className="absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 object-contain" />
        <div className="pf-png-moon-orbit absolute inset-0">
          <img src={celestialMoonImage} alt="" loading="lazy" decoding="async" className="absolute left-1/2 top-[1%] h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 object-contain" />
        </div>
      </div>
    </div>
  );
}

function ImpactIllustration({ type }: { type: string }) {
  const image = type === "sunrise" ? impactHealthImage : type === "hands" ? impactRelationshipImage : type === "growth" ? impactBusinessImage : null;

  if (image) {
    return (
      <div className={`relative shrink-0 ${type === "growth" ? "h-44 w-32" : "h-40 w-28"}`}>
        <img src={image} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain" />
      </div>
    );
  }

  if (type === "hands") {
    return (
      <div className="relative h-32 w-32 shrink-0 text-accent/70">
        <div className="absolute inset-x-6 top-0 h-full rounded-t-full border border-current" />
        <Moon className="absolute left-1/2 top-7 h-9 w-9 -translate-x-1/2" strokeWidth={1.15} />
        <Hand className="absolute bottom-4 left-4 h-10 w-10 rotate-[-18deg]" strokeWidth={1.1} />
        <Hand className="absolute bottom-4 right-4 h-10 w-10 scale-x-[-1] rotate-[-18deg]" strokeWidth={1.1} />
      </div>
    );
  }

  if (type === "growth") {
    return (
      <div className="relative h-32 w-32 shrink-0 text-accent/70">
        <div className="absolute inset-x-6 top-0 h-full rounded-t-full border border-current border-b-0" />
        <SunMoon className="absolute right-9 top-5 h-12 w-12" strokeWidth={1.05} />
        <div className="absolute bottom-2 right-4 flex items-end gap-1.5">
          {[28, 44, 62, 82].map((height) => <span key={height} className="w-3 border border-current" style={{ height }} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-32 w-32 shrink-0 text-accent/70">
      <div className="absolute inset-x-6 top-0 h-full rounded-t-full border border-current border-b-0" />
      <SunMoon className="absolute left-1/2 top-10 h-14 w-14 -translate-x-1/2" strokeWidth={1.05} />
      <div className="absolute bottom-6 left-8 h-10 w-16 rounded-t-full border-t border-current" />
      <div className="absolute bottom-2 left-1/2 h-px w-10 -translate-x-1/2 bg-current" />
    </div>
  );
}

function Index() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero-cream">
        <div className="pf-hero-motion-bg absolute inset-0" aria-hidden="true" />
        <div className="pf-hero-cream-overlay absolute inset-0" aria-hidden="true" />
        <div className="pf-hero-vignette absolute inset-0" aria-hidden="true" />
        <div className="pf-container relative z-10 grid min-h-[780px] items-center gap-12 py-28 md:py-32 lg:grid-cols-[300px_minmax(0,1fr)_300px] lg:gap-10 lg:py-36">
          <div className="relative order-2 hidden min-h-[420px] lg:order-1 lg:block">
            <div className="pf-hero-image-shadow pf-hero-slide-left pf-hero-image-frame absolute left-0 top-1/2 h-[300px] w-[300px] -translate-y-1/2 overflow-hidden rounded-full border border-hero-orange/15 bg-card">
              <img src={vastuPlanImage} alt="Bright Vastu compass and floor plan" width={960} height={655} loading="eager" decoding="async" fetchPriority="high" className="pf-hero-image-hover h-full w-full object-cover" />
            </div>
          </div>
          <div className="relative order-1 mx-auto max-w-[680px] text-center lg:order-2">
            <div className="pf-sacred-symbol mx-auto mb-7 text-hero-orange/70" aria-hidden="true">
              <svg viewBox="0 0 72 72" fill="none" className="h-12 w-12">
                <circle cx="36" cy="36" r="20" stroke="currentColor" strokeWidth="1" />
                <path d="M36 16v40M16 36h40M22 22l28 28M50 22 22 50" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
                <circle cx="36" cy="36" r="5" stroke="currentColor" strokeWidth="0.9" />
              </svg>
            </div>
            <p className="pf-eyebrow pf-eyebrow-center text-[12px] sm:text-[13px]">Vastu • Palmistry • Astrology</p>
            <h1 className="pf-hero-fade-up mx-auto mt-11 max-w-3xl font-heading text-[64px] font-light leading-[1.08] text-foreground sm:text-[82px] lg:text-[96px]">
              See the unseen change
            </h1>
            <p className="pf-hero-fade-up pf-hero-delay-1 mx-auto mt-9 max-w-[500px] text-[15px] font-light leading-relaxed text-hero-muted sm:text-[16px]">
              Personal guidance for homes, businesses and life decisions through Vastu, Palmistry and Career Astrology.
            </p>
            <div className="pf-hero-fade-up pf-hero-delay-2 mt-12 flex flex-wrap justify-center gap-5">
              <Button asChild variant="hero" className="bg-hero-orange text-primary-foreground shadow-none hover:bg-hero-orange"><Link to="/contact">Book A Consultation</Link></Button>
              <Button asChild variant="porcelain" className="border-foreground/15 bg-transparent text-foreground hover:border-hero-orange/45"><Link to="/services">Explore Services</Link></Button>
            </div>
          </div>
          <div className="relative order-3 hidden min-h-[420px] lg:block">
            <div className="pf-hero-image-shadow pf-hero-slide-right pf-hero-image-frame absolute right-0 top-1/2 h-[390px] w-[260px] -translate-y-1/2 overflow-hidden rounded-full border border-hero-orange/15 bg-card">
              <img src={premiumPalmReadingImage} alt="Warm close-up palm reading consultation" width={1024} height={1280} loading="eager" decoding="async" className="pf-hero-image-hover h-full w-full object-cover object-[50%_45%]" />
            </div>
          </div>
        </div>
      </section>

      <MotionSection className="relative overflow-hidden bg-card py-12">
        <div className="absolute left-1/2 top-1/2 hidden h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border lg:block" />
        <div className="pf-container grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="grid divide-y divide-border md:grid-cols-4 md:divide-x md:divide-y-0 lg:col-span-2">
            {stats.map(([value, suffix, label]) => (
              <div key={label} className="py-5 text-center md:py-0">
                <div className="font-heading text-[48px] font-light leading-none text-accent"><CountUp value={Number(value)} suffix={String(suffix)} /></div>
                <p className="mt-2 text-[11px] font-medium tracking-[0.4px] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="bg-background py-12">
        <div className="pf-container">
          <SectionIntro eyebrow="WHAT WE OFFER" title="Services for every space and soul" copy="From your palm to your home — a complete system of ancient wisdom." />
          <div className="mx-auto mt-8 grid max-w-[980px] gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service, index) => <ServiceCard key={service.name} service={service} index={index} />)}
          </div>
          <div className="mt-7 text-center"><Link to="/services" className="text-[13px] font-medium text-accent underline-offset-4 hover:underline">See all 12 services →</Link></div>
        </div>
      </MotionSection>

      <MotionSection className="bg-card py-12">
        <div className="pf-container relative overflow-hidden py-3">
          <div className="grid items-center gap-10 lg:grid-cols-[56fr_44fr] lg:gap-12">
            <div className="relative z-10">
              <p className="pf-eyebrow">HOME REMEDIES</p>
              <h2 className="pf-h2 mt-7 max-w-[480px]">Small corrections that feel <em className="font-heading font-light italic text-accent">possible</em></h2>
              <p className="pf-body mt-5 max-w-[460px]">Prachi’s work is solution-oriented — many improvements begin with simple placements, light, colour and element balance.</p>
              <div className="mt-9 grid gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
                {remedyHighlights.map((item) => {
                  const Icon = item.icon;
                  return <article key={item.title} className="pf-remedy-item px-3 text-center first:pl-0 last:pr-0">
                    <div className="pf-remedy-icon mx-auto">
                      <Icon className="h-7 w-7 text-accent" strokeWidth={1.45} />
                    </div>
                    <h3 className="mt-4 font-body text-[13px] font-medium leading-snug text-foreground">{item.title}</h3>
                    <span className="mx-auto mt-4 block h-px w-6 bg-accent" />
                    <p className="mx-auto mt-4 max-w-[150px] text-[12px] font-light leading-relaxed text-muted-foreground">{item.description}</p>
                  </article>;
                })}
              </div>
            </div>
            <div className="pf-remedy-visual relative z-10 mx-auto w-full max-w-[410px] py-8 lg:py-0">
              <div className="pf-remedy-orbits" aria-hidden="true" />
              <span className="pf-remedy-star pf-remedy-star-a" aria-hidden="true">✦</span>
              <span className="pf-remedy-star pf-remedy-star-b" aria-hidden="true">✦</span>
              <div className="pf-remedy-image-shell relative z-10 h-[500px] w-full">
                <img src={homeRemediesImage} alt="Practical Vastu home remedy with flowers and water in a real living room" width={1280} height={960} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
              <div className="pf-remedy-artwork absolute left-0 top-[34%] z-20 grid h-28 w-28 -translate-x-1/3 place-items-center rounded-full border border-accent/45 bg-card shadow-card md:h-32 md:w-32">
                <img src={orangeArtworkImage} alt="Sacred Vastu harmony line artwork" width={1280} height={1280} loading="lazy" decoding="async" className="h-[78%] w-[78%] object-contain" />
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="relative overflow-hidden bg-warm py-8">
        <img src={celestialSunImage} alt="" loading="lazy" decoding="async" className="pf-process-side-image left-4 top-6 h-24 w-24 md:left-10 md:h-32 md:w-32" />
        <img src={celestialRingImage} alt="" loading="lazy" decoding="async" className="pf-process-side-image bottom-6 right-4 h-28 w-28 md:right-10 md:h-36 md:w-36" />
        <div className="pf-container relative z-10">
          <div className="mx-auto grid max-w-[920px] grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4 md:gap-y-0">
            {processItems.map((item, index) => {
              const Icon = item.icon;
              return (
              <div key={item.label} className="pf-process-step relative flex flex-col items-center text-center">
                <div className="pf-process-icon-frame">
                  <Icon className="h-6 w-6 text-accent" strokeWidth={1.45} />
                </div>
                <span className="mt-2 font-heading text-[23px] font-light leading-none text-accent/30">0{index + 1}</span>
                <p className="mt-0.5 font-heading leading-none text-foreground text-lg font-normal">{item.label}</p>
                <p className="mx-auto mt-1.5 max-w-[175px] text-[12px] font-light leading-snug text-muted-foreground">{item.copy}</p>
              </div>
              );
            })}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="relative overflow-hidden bg-card py-16">
        <div className="pf-container relative z-10 grid items-center gap-10 lg:grid-cols-[31fr_38fr_31fr]">
          <div className="pf-about-portrait-wrap relative mx-auto min-h-[470px] w-full max-w-[320px]">
            <div className="pf-about-orbit pf-about-orbit-left" aria-hidden="true" />
            <div className="pf-about-image-frame pf-about-image-arch absolute inset-x-0 top-0 mx-auto h-[455px] w-[88%]">
              <img src={prachiPortraitImage} alt="Prachi Fulfagar in her Vastu and Palmistry consultation studio" width={900} height={1350} loading="lazy" decoding="async" className="h-full w-full object-cover object-[center_8%]" />
            </div>
            <div className="pf-about-badge pf-about-badge-left">
              <Hand className="h-12 w-12" strokeWidth={1.25} />
            </div>
          </div>
          <div className="text-center">
            <div className="pf-about-top-mark mx-auto" aria-hidden="true">
              <img src={orangeArtworkImage} alt="" loading="lazy" decoding="async" className="h-12 w-12 object-contain" />
            </div>
            <p className="pf-eyebrow pf-eyebrow-center mt-7 py-0">ABOUT PRACHI</p>
            <h2 className="pf-h2 mx-auto mt-7 max-w-[430px]">Two decades. One rare combination.</h2>
            <p className="pf-body mx-auto mt-5 max-w-[430px]">Prachi Fulfagar is one of India's most credentialled Vastu and Palmistry consultants — combining both in a rare integrated practice that aligns you from the inside out.</p>
            <p className="pf-body mx-auto mt-4 max-w-[430px]">Consulting from Mumbai, Pune, Nashik and Kopargaon, she works with clients across India and internationally.</p>
            <div className="mt-9 grid grid-cols-2 gap-y-7 sm:grid-cols-4 sm:divide-x sm:divide-border">
              {aboutStats.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="px-3 text-center">
                    <div className="pf-about-stat-icon mx-auto"><Icon className="h-6 w-6 text-accent" strokeWidth={1.35} /></div>
                    <p className="mt-3 font-heading text-[22px] font-light leading-none text-accent">{item.value}</p>
                    <p className="mt-1 text-[12px] font-light leading-snug text-muted-foreground">{item.label}</p>
                  </div>
                );
              })}
            </div>
            <Link to="/about" className="group mt-8 inline-flex text-[13px] font-medium text-accent">Read her full story <span className="transition group-hover:translate-x-1">→</span></Link>
          </div>
          <div className="pf-about-side-wrap relative mx-auto min-h-[430px] w-full max-w-[330px]">
            <div className="pf-about-orbit pf-about-orbit-right" aria-hidden="true" />
            <div className="pf-about-image-frame pf-about-image-soft absolute inset-x-0 bottom-0 mx-auto h-[385px] w-[92%]">
              <img src={celestialPalmImage} alt="Palmistry and astrology consultation details" width={1120} height={1328} loading="lazy" decoding="async" className="h-full w-full object-cover object-[center_42%]" />
            </div>
            <div className="pf-about-badge pf-about-badge-right">
              <Hand className="h-12 w-12" strokeWidth={1.25} />
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="relative overflow-hidden bg-background py-16">
        <img src={vastuPlanImage} alt="Faint Vastu plan background" width={960} height={655} loading="lazy" decoding="async" className="absolute left-0 top-0 h-full w-[46%] object-cover opacity-[0.08]" />
        <CelestialMotion className="absolute right-[6%] top-10 hidden h-[166px] w-[166px] lg:block" />
        <div className="pf-container relative z-10">
          <SectionIntro eyebrow="BEFORE & AFTER" title="The impact of alignment" copy="The goal is not decoration — it is a home or workplace that starts supporting the life inside it." />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {impactItems.map(([title, copy, type], index) => (
              <article key={title} className="pf-card grid min-h-[178px] grid-cols-[1fr_auto] items-center gap-4 overflow-hidden p-5">
                <div>
                <p className="text-[10px] font-medium uppercase tracking-[2px] text-accent">Impact 0{index + 1}</p>
                <h3 className="pf-h3 mt-3">{title}</h3>
                <div className="my-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-[11px] text-muted-foreground">
                  <span>Blocked</span><span className="text-accent">→</span><span className="text-foreground">Aligned</span>
                </div>
                <p className="text-[12px] font-light leading-relaxed text-muted-foreground">{copy}</p>
                </div>
                <ImpactIllustration type={String(type)} />
              </article>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="relative overflow-hidden bg-card py-14">
        <div className="absolute -top-20 left-1/2 h-40 w-[120vw] -translate-x-1/2 rounded-b-[100%] bg-background/80" />
        <div className="pf-container relative z-10">
          <SectionIntro eyebrow="AUTHORITY" title="Awards, recognition and global reach" copy="A trusted practice serving Indian and international clients with recognised expertise." />
          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            {awards.map((award, index) => {
              const Icon = award.icon;
              return <article key={award.title} className="pf-card grid gap-4 p-5 sm:grid-cols-[auto_1fr]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-badge text-accent"><Icon size={20} strokeWidth={1.6} /></div>
                <div><p className="text-[9px] font-medium uppercase tracking-[2px] text-accent">Recognition 0{index + 1}</p><h3 className="pf-h3 mt-2">{award.title}</h3><p className="mt-2 text-[13px] font-light leading-relaxed text-muted-foreground">{award.description}</p></div>
              </article>;
            })}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {globalPresence.map((place) => <span key={place} className="rounded-full border border-border bg-card-soft px-4 py-2 text-[11px] text-muted-foreground">{place}</span>)}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="relative overflow-hidden bg-background py-16">
        <img src={celestialPalmImage} alt="Palmistry background for client stories" width={759} height={900} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-background/78" />
        <div className="pf-container relative z-10">
          <SectionIntro eyebrow="CLIENT STORIES" title="Lives that found balance" />
          <div className="pf-story-marquee mt-14 overflow-hidden">
            <div className="pf-story-track flex w-max gap-5">
              {[...customerStories, ...customerStories].map((story, index) => (
                <article key={`${story.name}-${story.role}-${index}`} className="pf-card w-[310px] shrink-0 overflow-hidden p-0 sm:w-[360px]">
                  <div className="h-[3px] bg-accent" />
                  <div className="p-8">
                    <p className="font-heading text-[17px] italic leading-relaxed text-foreground">“{story.quote}”</p>
                    <p className="mt-6 text-xs font-medium text-foreground">{story.name}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{story.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="relative min-h-[520px] overflow-hidden border-y border-border bg-warm pb-20 pt-28 text-center">
        <img src={vastuPlanImage} alt="Vastu floor plan with brass compass" width={960} height={655} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-background/62" />
        <div className="absolute -top-[130px] left-1/2 h-[250px] w-[150vw] -translate-x-1/2 rounded-b-[100%] bg-background" />
        <div className="pf-compass-orbit absolute left-1/2 top-[60%] h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20" />
        <div className="pf-container relative z-10 pt-20">
          <div className="mx-auto mb-8 h-px w-12 bg-accent" />
          <h2 className="pf-h2">Begin your journey to harmony</h2>
          <p className="pf-body mx-auto mt-4 max-w-xl">Book a consultation — in person or online, across India and internationally.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3.5">
            <Button asChild variant="hero"><Link to="/contact">Book a Session</Link></Button>
            <Button asChild variant="porcelain"><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle className="text-whatsapp" />WhatsApp Now</a></Button>
          </div>
        </div>
      </MotionSection>
    </>
  );
}
