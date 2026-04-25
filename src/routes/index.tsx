import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Hand, Leaf, MessageCircle, Moon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageComposition } from "@/components/prachi/ImageComposition";
import { CountUp, MotionSection, SectionIntro } from "@/components/prachi/Motion";
import { ServiceCard } from "@/components/prachi/ServiceCard";
import { awards, globalPresence, remedyHighlights, services, whatsappUrl } from "@/components/prachi/site-data";

const vastuPlanImage = "/site-images/prachi-vastu-plan.jpg";
const celestialPalmImage = "/site-images/prachi-celestial-palm.jpg";
const homeRemediesImage = "/site-images/prachi-home-remedies.jpg";
const energyElementsImage = "/site-images/prachi-energy-elements.jpg";
const prachiPortraitImage = "/site-images/prachi-fulfagar-portrait.jpg";

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

const testimonials = [
  ["Her Vastu consultation transformed our office energy entirely. The difference was almost immediate — smoother operations, happier team.", "Corporate Client", "Mumbai"],
  ["The palm reading revealed things about myself I had never been able to articulate. Deeply reassuring and accurate.", "Remote Client", "Dubai"],
  ["My child's focus improved after Prachi's Vastu corrections for the study room. Simple changes, profound results.", "Parent", "Nashik"],
];

const impactItems = [
  ["Health", "Restful rooms, balanced elements and less environmental stress support calmer daily routines."],
  ["Relationships", "Shared spaces are corrected for warmth, communication and emotional steadiness."],
  ["Business", "Entrances, seating and decision zones are aligned for confidence, clarity and growth."],
];

const processItems = [
  [Compass, "Discovery"],
  [Moon, "Diagnosis"],
  [Sparkles, "Design"],
  [Leaf, "Alignment"],
] as const;

function Index() {
  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden bg-background text-center">
        <img src={vastuPlanImage} alt="Vastu floor plan with brass compass" width={960} height={655} loading="eager" decoding="async" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="absolute -top-[220px] left-1/2 h-[360px] w-[150vw] -translate-x-1/2 rounded-b-[100%] bg-background shadow-[0_30px_70px_rgb(0_0_0_/_0.08)]" />
        <div className="absolute -bottom-[260px] left-1/2 h-[390px] w-[150vw] -translate-x-1/2 rounded-t-[100%] bg-background/92" />
        <div className="pf-compass-orbit absolute left-1/2 top-[36%] h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-foreground/40 before:absolute before:left-1/2 before:top-0 before:h-full before:w-px before:bg-primary-foreground/35 after:absolute after:left-0 after:top-1/2 after:h-px after:w-full after:bg-primary-foreground/35" />
        <div className="absolute left-1/2 top-[36%] grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-primary-foreground/65 text-primary-foreground"><Compass size={42} strokeWidth={1.15} /></div>
        <div className="pf-container relative z-10 flex min-h-[720px] flex-col items-center justify-center pt-24 text-primary-foreground">
          <p className="mb-6 font-heading text-[18px] italic tracking-[1px]">Unlock the Secrets of Your Life</p>
          <h1 className="max-w-4xl font-heading text-[48px] font-light leading-[1.06] sm:text-[64px] lg:text-[76px]">
            Revealing Your Space, One Energy at a Time
          </h1>
          <p className="mx-auto mt-6 max-w-[560px] text-[15px] font-light leading-relaxed tracking-[0.4px] text-primary-foreground/88">
            Prachi Fulfagar guides homes, businesses and lives through Vastu Shastra, Palmistry and Vedic Astrology.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Button asChild variant="hero"><Link to="/contact">Book A Consultation</Link></Button>
            <Button asChild variant="porcelain" className="border-primary-foreground/70 text-primary-foreground hover:border-primary-foreground"><Link to="/services">Explore Services</Link></Button>
          </div>
          <div className="absolute bottom-12 left-1/2 flex w-[120vw] -translate-x-1/2 items-center justify-center gap-10 overflow-hidden font-heading text-[70px] font-light leading-none text-primary-foreground/45 sm:text-[92px]">
            <span>Positivity</span><Moon className="h-5 w-5 shrink-0 text-accent" /><span>Future</span><Sparkles className="h-5 w-5 shrink-0 text-accent" /><span>Wisdom</span><Hand className="h-5 w-5 shrink-0 text-accent" /><span>Peace</span>
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
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[services[0], services[1], services[2], services[9], services[4], services[5]].map((service, index) => <ServiceCard key={service.name} service={service} index={index} />)}
          </div>
          <div className="mt-7 text-center"><Link to="/services" className="text-[13px] font-medium text-accent underline-offset-4 hover:underline">See all 12 services →</Link></div>
        </div>
      </MotionSection>

      <MotionSection className="pf-section overflow-hidden bg-card">
        <div className="pf-container grid items-center gap-16 lg:grid-cols-[46fr_54fr] lg:gap-20">
          <div>
            <p className="pf-eyebrow">HOME REMEDIES</p>
            <h2 className="pf-h2 mt-7">Small corrections that feel possible</h2>
            <p className="pf-body mt-5">Prachi’s work is solution-oriented — many improvements begin with simple placements, light, colour and element balance.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {remedyHighlights.map((item) => {
                const Icon = item.icon;
                return <article key={item.title} className="border-l border-accent/40 pl-4">
                  <Icon className="h-4 w-4 text-accent" strokeWidth={1.7} />
                  <h3 className="mt-3 font-body text-[13px] font-medium text-foreground">{item.title}</h3>
                  <p className="mt-1.5 text-xs font-light leading-relaxed text-muted-foreground">{item.description}</p>
                </article>;
              })}
            </div>
          </div>
          <ImageComposition
            primary={{ src: homeRemediesImage, alt: "Practical Vastu home remedy with flowers and water in a real living room", width: 1280, height: 960 }}
            secondary={{ src: energyElementsImage, alt: "Vastu energy elements with plant water candle and stone", width: 1120, height: 1328 }}
            align="right"
          />
        </div>
      </MotionSection>

      <MotionSection className="relative overflow-hidden bg-warm py-12">
        <div className="absolute left-[-8%] top-[-90px] h-[260px] w-[260px] rounded-full border border-accent/10" />
        <div className="pf-container flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
          {processItems.map(([Icon, label]) => (
            <div key={label} className="flex items-center gap-3 text-[13px] font-medium tracking-[0.6px] text-foreground">
              <Icon className="h-4 w-4 text-accent" strokeWidth={1.8} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="overflow-hidden bg-card py-16">
        <div className="pf-container grid items-center gap-10 lg:grid-cols-[46fr_54fr] lg:gap-14">
          <div>
            <p className="pf-eyebrow">ABOUT PRACHI</p>
            <h2 className="pf-h2 mt-7">Two decades. One rare combination.</h2>
            <p className="pf-body mt-5">Prachi Fulfagar is one of India's most credentialled Vastu and Palmistry consultants — combining both in a rare integrated practice that aligns you from the inside out.</p>
            <p className="pf-body mt-4">Consulting from Mumbai, Pune, Nashik and Kopargaon, she works with clients across India and internationally.</p>
            <Link to="/about" className="group mt-7 inline-flex text-[13px] font-medium text-accent">Read her full story <span className="transition group-hover:translate-x-1">→</span></Link>
          </div>
          <div className="relative min-h-[500px] sm:min-h-[560px]">
            <img src={prachiPortraitImage} alt="Prachi Fulfagar in her Vastu and Palmistry consultation studio" width={900} height={1350} loading="lazy" decoding="async" className="absolute right-0 top-0 h-[350px] w-[82%] rounded-l-full object-cover object-[center_18%] shadow-card" />
            <img src={celestialPalmImage} alt="Palmistry and astrology consultation details" width={1120} height={1328} loading="lazy" decoding="async" className="absolute bottom-0 right-0 h-[370px] w-[56%] rounded-t-full object-cover shadow-card" />
            <div className="absolute left-[18%] top-[58%] hidden h-px w-[48%] bg-accent/40 md:block" />
          </div>
        </div>
      </MotionSection>

      <MotionSection className="bg-background py-12">
        <div className="pf-container">
          <SectionIntro eyebrow="BEFORE & AFTER" title="The impact of alignment" copy="The goal is not decoration — it is a home or workplace that starts supporting the life inside it." />
          <div className="mt-9 grid gap-4 lg:grid-cols-3">
            {impactItems.map(([title, copy], index) => (
              <article key={title} className="pf-card p-5">
                <p className="text-[10px] font-medium uppercase tracking-[2px] text-accent">Impact 0{index + 1}</p>
                <h3 className="pf-h3 mt-3">{title}</h3>
                <div className="my-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-[11px] text-muted-foreground">
                  <span>Blocked</span><span className="text-accent">→</span><span className="text-foreground">Aligned</span>
                </div>
                <p className="text-[12px] font-light leading-relaxed text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="bg-card py-12">
        <div className="pf-container">
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

      <MotionSection className="pf-section bg-background">
        <div className="pf-container">
          <SectionIntro eyebrow="CLIENT STORIES" title="Lives that found balance" />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {testimonials.map(([quote, name, city], index) => (
              <article key={name} className="pf-card overflow-hidden p-0">
                <div className="h-[3px] bg-accent" />
                <div className="p-8">
                  <p className="font-heading text-[17px] italic leading-relaxed text-foreground">“{quote}”</p>
                  <p className="mt-6 text-xs font-medium text-foreground">{name}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{city}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="border-y border-border bg-warm py-[100px] text-center">
        <div className="pf-container">
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
