import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageComposition } from "@/components/prachi/ImageComposition";
import { CountUp, MotionSection, SectionIntro } from "@/components/prachi/Motion";
import { ServiceCard } from "@/components/prachi/ServiceCard";
import { awards, globalPresence, remedyHighlights, services, whatsappUrl } from "@/components/prachi/site-data";

const vastuPlanImage = "/site-images/prachi-vastu-plan.jpg";
const celestialPalmImage = "/site-images/prachi-celestial-palm.jpg";
const homeRemediesImage = "/site-images/prachi-home-remedies.jpg";
const energyElementsImage = "/site-images/prachi-energy-elements.jpg";
const familyHomeImage = "/site-images/prachi-family-home.jpg";

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

function Index() {
  return (
    <>
      <section className="relative grid min-h-[560px] place-items-center overflow-hidden bg-background text-center lg:min-h-[calc(62vh-40px)]">
        <img
          src={vastuPlanImage}
          alt="Vastu floor plan with brass compass"
          width={960}
          height={655}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="pointer-events-none absolute -left-24 top-12 hidden h-[440px] w-[440px] rounded-full object-cover lg:block"
        />
        <img
          src={celestialPalmImage}
          alt="Palmistry consultation with celestial chart"
          width={759}
          height={900}
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute -right-16 bottom-0 hidden h-[460px] w-[360px] rounded-t-full object-cover lg:block"
        />
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/8" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/12" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/7" />
        <div className="pf-container relative z-10 py-12">
          <p className="mb-7 text-[10px] font-medium uppercase tracking-[3px] text-accent">
            Award-winning · Pan-India · International Sessions
          </p>
          <h1 className="pf-h1">
            <span className="block">Ancient wisdom.</span>
            <span className="block italic text-accent">A balanced, peaceful life.</span>
          </h1>
          <p className="pf-body mx-auto mt-6 max-w-[480px] text-[15px]">
            Prachi Fulfagar guides you through Vastu Shastra, Palmistry and Vedic Astrology — helping homes, businesses and lives find their natural harmony.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3.5">
            <Button asChild variant="hero"><Link to="/contact">Book a Consultation</Link></Button>
            <Button asChild variant="porcelain"><Link to="/services">Explore Services</Link></Button>
          </div>
        </div>
      </section>

      <MotionSection className="bg-card py-14">
        <div className="pf-container grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {pillars.map(([num, name, desc]) => (
            <div key={num} className="px-10 py-8 text-center md:py-0">
              <div className="font-heading text-[52px] font-light leading-none text-accent">{num}</div>
              <h2 className="mt-4 font-body text-[13px] font-medium tracking-[0.5px] text-foreground">{name}</h2>
              <p className="mx-auto mt-2 max-w-[180px] text-[13px] font-light leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="pf-section bg-background">
        <div className="pf-container">
          <SectionIntro eyebrow="WHAT WE OFFER" title="Services for every space and soul" copy="From your palm to your home — a complete system of ancient wisdom." />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[services[0], services[1], services[2], services[9], services[4], services[5]].map((service, index) => <ServiceCard key={service.name} service={service} index={index} />)}
          </div>
          <div className="mt-10 text-center"><Link to="/services" className="text-[13px] font-medium text-accent underline-offset-4 hover:underline">See all 12 services →</Link></div>
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

      <MotionSection className="bg-warm py-14">
        <div className="pf-container grid divide-y divide-border md:grid-cols-4 md:divide-x md:divide-y-0">
          {stats.map(([value, suffix, label]) => (
            <div key={label} className="py-6 text-center md:py-0">
              <div className="font-heading text-[52px] font-light leading-none text-accent"><CountUp value={Number(value)} suffix={String(suffix)} /></div>
              <p className="mt-2 text-[11px] font-normal tracking-[0.5px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="pf-section overflow-hidden bg-card">
        <div className="pf-container grid items-center gap-16 lg:grid-cols-[48fr_52fr] lg:gap-20">
          <div>
            <p className="pf-eyebrow">ABOUT PRACHI</p>
            <h2 className="pf-h2 mt-7">Two decades. One rare combination.</h2>
            <p className="pf-body mt-5">Prachi Fulfagar is one of India's most credentialled Vastu and Palmistry consultants — combining both in a rare integrated practice that aligns you from the inside out.</p>
            <p className="pf-body mt-4">Consulting from Mumbai, Pune, Nashik and Kopargaon, she works with clients across India and internationally.</p>
            <Link to="/about" className="group mt-7 inline-flex text-[13px] font-medium text-accent">Read her full story <span className="transition group-hover:translate-x-1">→</span></Link>
          </div>
          <ImageComposition
            primary={{ src: familyHomeImage, alt: "Balanced family home interior after practical Vastu alignment", width: 1280, height: 960 }}
            secondary={{ src: celestialPalmImage, alt: "Palmistry and astrology consultation details", width: 1120, height: 1328 }}
          />
        </div>
      </MotionSection>

      <MotionSection className="pf-section bg-background">
        <div className="pf-container">
          <SectionIntro eyebrow="BEFORE & AFTER" title="The impact of alignment" copy="The goal is not decoration — it is a home or workplace that starts supporting the life inside it." />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {impactItems.map(([title, copy], index) => (
              <article key={title} className="pf-card p-7">
                <p className="text-[10px] font-medium uppercase tracking-[2px] text-accent">Impact 0{index + 1}</p>
                <h3 className="pf-h3 mt-4">{title}</h3>
                <div className="my-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-[11px] text-muted-foreground">
                  <span>Blocked</span><span className="text-accent">→</span><span className="text-foreground">Aligned</span>
                </div>
                <p className="text-[13px] font-light leading-relaxed text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="pf-section bg-card">
        <div className="pf-container">
          <SectionIntro eyebrow="AUTHORITY" title="Awards, recognition and global reach" copy="A trusted practice serving Indian and international clients with recognised expertise." />
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {awards.map((award, index) => {
              const Icon = award.icon;
              return <article key={award.title} className="pf-card grid gap-5 p-7 sm:grid-cols-[auto_1fr]">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-badge text-accent"><Icon size={22} strokeWidth={1.6} /></div>
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
