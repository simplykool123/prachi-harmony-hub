import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Hand, Leaf, MessageCircle, Moon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountUp, MotionSection, SectionIntro } from "@/components/prachi/Motion";
import { ServiceCard } from "@/components/prachi/ServiceCard";
import { awards, customerStories, globalPresence, remedyHighlights, services, whatsappUrl } from "@/components/prachi/site-data";

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
      <section className="relative min-h-[700px] overflow-hidden bg-background">
        <div className="pf-container relative z-10 grid min-h-[700px] items-center gap-8 pt-24 lg:grid-cols-[280px_minmax(0,1fr)_320px]">
          <div className="relative order-2 hidden min-h-[430px] lg:order-1 lg:block">
            <div className="pf-compass-drift absolute left-0 top-10 h-[330px] w-[330px] overflow-hidden rounded-full border border-accent/25 bg-card shadow-card">
              <img src={vastuPlanImage} alt="Animated Vastu compass and floor plan" width={960} height={655} loading="eager" decoding="async" fetchPriority="high" className="h-full w-full scale-110 object-cover opacity-90" />
            </div>
            <div className="pf-compass-orbit absolute left-[78px] top-[88px] h-[174px] w-[174px] rounded-full border border-accent/45 before:absolute before:left-1/2 before:top-0 before:h-full before:w-px before:bg-accent/25 after:absolute after:left-0 after:top-1/2 after:h-px after:w-full after:bg-accent/25" />
          </div>
          <div className="order-1 mx-auto max-w-[620px] text-center lg:order-2">
            <p className="pf-eyebrow">Vastu • Palmistry • Astrology</p>
            <h1 className="mt-8 max-w-3xl font-heading text-[56px] font-light leading-[1.04] text-foreground sm:text-[72px] lg:text-[86px]">
              See the unseen change
            </h1>
            <p className="mt-6 max-w-[520px] text-[16px] font-light leading-relaxed text-muted-foreground">
              Personal guidance for homes, businesses and life decisions through Vastu, Palmistry and Career Astrology.
            </p>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <Button asChild variant="hero"><Link to="/contact">Book A Consultation</Link></Button>
              <Button asChild variant="porcelain"><Link to="/services">Explore Services</Link></Button>
            </div>
          </div>
          <div className="relative order-3 hidden min-h-[500px] lg:block">
            <div className="absolute right-0 top-0 h-[390px] w-[270px] overflow-hidden rounded-t-full rounded-bl-[90px] shadow-card">
              <img src={energyElementsImage} alt="Vastu energy elements arranged for harmony" width={1120} height={1328} loading="eager" decoding="async" className="h-full w-full object-cover" />
            </div>
            <div className="absolute bottom-2 left-0 h-[230px] w-[185px] overflow-hidden rounded-br-[85px] rounded-tl-[85px] border-[10px] border-background shadow-card">
              <img src={celestialPalmImage} alt="Palmistry and astrology consultation details" width={759} height={900} loading="eager" decoding="async" className="h-full w-full object-cover" />
            </div>
            <div className="absolute bottom-28 right-5 h-px w-44 bg-accent/35" />
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
            {services.slice(0, 6).map((service, index) => <ServiceCard key={service.name} service={service} index={index} />)}
          </div>
          <div className="mt-7 text-center"><Link to="/services" className="text-[13px] font-medium text-accent underline-offset-4 hover:underline">See all 12 services →</Link></div>
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

      <MotionSection className="relative overflow-hidden bg-card py-16">
        <div className="absolute -right-24 top-12 h-[360px] w-[360px] rounded-full border border-accent/10" />
        <div className="pf-container grid items-center gap-12 lg:grid-cols-[45fr_55fr] lg:gap-16">
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
          <div className="relative grid min-h-[540px] grid-cols-2 gap-5">
            <img src={homeRemediesImage} alt="Practical Vastu home remedy with flowers and water in a real living room" width={1280} height={960} loading="lazy" decoding="async" className="h-[310px] w-full rounded-[28px] rounded-br-[120px] object-cover shadow-card" />
            <div className="relative overflow-hidden rounded-full bg-footer p-10 text-center text-foreground shadow-card">
              <Leaf className="mx-auto h-14 w-14 text-accent" strokeWidth={1.2} />
              <p className="mt-5 font-heading text-[28px] leading-none">Harmony</p>
            </div>
            <div className="relative mt-6 flex items-center justify-center rounded-t-full border border-border bg-background p-8">
              <div className="pf-compass-orbit h-36 w-36 rounded-full border border-accent/25" />
              <Sparkles className="absolute h-10 w-10 text-accent" strokeWidth={1.3} />
            </div>
            <img src={energyElementsImage} alt="Vastu energy elements with plant water candle and stone" width={1120} height={1328} loading="lazy" decoding="async" className="-mt-16 h-[390px] w-full rounded-t-full object-cover shadow-card" />
          </div>
        </div>
      </MotionSection>

      <MotionSection className="relative overflow-hidden bg-card py-16">
        <div className="pf-container relative z-10 grid items-center gap-8 lg:grid-cols-[32fr_36fr_32fr]">
          <div className="relative min-h-[430px]">
            <img src={prachiPortraitImage} alt="Prachi Fulfagar in her Vastu and Palmistry consultation studio" width={900} height={1350} loading="lazy" decoding="async" className="absolute inset-x-0 top-0 mx-auto h-[430px] w-[86%] rounded-t-full object-cover object-[center_8%] shadow-card" />
          </div>
          <div className="text-center">
            <p className="pf-eyebrow pf-eyebrow-center">ABOUT PRACHI</p>
            <h2 className="pf-h2 mt-7">Two decades. One rare combination.</h2>
            <p className="pf-body mx-auto mt-5 max-w-[420px]">Prachi Fulfagar is one of India's most credentialled Vastu and Palmistry consultants — combining both in a rare integrated practice that aligns you from the inside out.</p>
            <p className="pf-body mx-auto mt-4 max-w-[420px]">Consulting from Mumbai, Pune, Nashik and Kopargaon, she works with clients across India and internationally.</p>
            <Link to="/about" className="group mt-7 inline-flex text-[13px] font-medium text-accent">Read her full story <span className="transition group-hover:translate-x-1">→</span></Link>
          </div>
          <div className="relative min-h-[430px]">
            <img src={celestialPalmImage} alt="Palmistry and astrology consultation details" width={1120} height={1328} loading="lazy" decoding="async" className="absolute inset-x-0 bottom-0 mx-auto h-[360px] w-[86%] rounded-b-full object-cover shadow-card" />
            <div className="absolute left-0 top-8 hidden h-px w-[72%] bg-accent/45 md:block" />
            <div className="absolute left-1/2 top-0 grid h-28 w-28 -translate-x-1/2 place-items-center rounded-t-full border border-border bg-background text-accent shadow-card">
              <Hand className="h-12 w-12" strokeWidth={1.3} />
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="relative overflow-hidden bg-background py-14">
        <img src={vastuPlanImage} alt="Faint Vastu plan background" width={960} height={655} loading="lazy" decoding="async" className="absolute left-0 top-0 h-full w-[46%] object-cover opacity-[0.08]" />
        <div className="absolute right-[11%] top-16 h-44 w-44 rounded-full border border-border" />
        <div className="pf-container relative z-10">
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

      <MotionSection className="relative min-h-[520px] overflow-hidden border-y border-border bg-warm py-20 text-center">
        <img src={vastuPlanImage} alt="Vastu floor plan with brass compass" width={960} height={655} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-background/62" />
        <div className="absolute -top-[190px] left-1/2 h-[310px] w-[150vw] -translate-x-1/2 rounded-b-[100%] bg-background" />
        <div className="pf-compass-orbit absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20" />
        <div className="pf-container relative z-10">
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
