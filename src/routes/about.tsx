import { createFileRoute } from "@tanstack/react-router";
import { Hand, MapPin } from "lucide-react";
import { PageHero } from "@/components/prachi/PageHero";
import { MotionSection, SectionIntro } from "@/components/prachi/Motion";
import { awards, cities, globalPresence } from "@/components/prachi/site-data";

const celestialPalmImage = "/site-images/prachi-celestial-palm.jpg";
const prachiPortraitImage = "/site-images/prachi-fulfagar-portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About Prachi Fulfagar | Vastu & Palmistry Consultant" },
    { name: "description", content: "Learn about Prachi Fulfagar's two-decade practice and international recognition in Vastu and Palmistry." },
    { property: "og:title", content: "About Prachi Fulfagar" },
    { property: "og:description", content: "A rare combination of Palmistry and Vastu Shastra, guided with modern clarity." },
  ]}),
  component: AboutPage,
});

function AboutPage() {
  return <>
    <PageHero eyebrow="ABOUT" title="Where ancient wisdom meets modern clarity" copy="A rare combination of Palmistry and Vastu Shastra — personally guided." />
    <MotionSection className="pf-section overflow-hidden bg-card">
      <div className="pf-container grid items-center gap-10 lg:grid-cols-[31fr_38fr_31fr]">
        <div className="relative min-h-[440px]">
          <img src={prachiPortraitImage} alt="Prachi Fulfagar in her Vastu and Palmistry consultation studio" width={900} height={1350} loading="lazy" decoding="async" className="absolute inset-x-0 top-0 mx-auto h-[440px] w-[88%] rounded-t-full object-cover object-[center_8%] shadow-card" />
        </div>
        <div className="text-center">
          <p className="pf-eyebrow pf-eyebrow-center">HER STORY</p>
          <h2 className="pf-h2 mt-7">Two decades. One rare combination.</h2>
          <p className="pf-body mx-auto mt-5 max-w-[430px]">For over two decades, Prachi Fulfagar has been a trusted guide for thousands of people seeking clarity — through their palms, their homes, and the stars.</p>
          <p className="pf-body mx-auto mt-4 max-w-[430px]">What sets Prachi apart is her rare combination of Palmistry and Vastu Shastra — a pairing that allows her to read both the person and their environment, aligning them together for results neither practice achieves alone.</p>
          <p className="pf-body mx-auto mt-4 max-w-[430px]">Today, Prachi consults from offices in Mumbai, Pune, Nashik and Kopargaon, and works with clients across India and internationally.</p>
        </div>
        <div className="relative min-h-[440px]">
          <img src={celestialPalmImage} alt="Palmistry consultation details in warm light" width={1120} height={1328} loading="lazy" decoding="async" className="absolute inset-x-0 bottom-0 mx-auto h-[360px] w-[88%] rounded-b-full object-cover shadow-card" />
          <div className="absolute right-0 top-10 hidden h-px w-[70%] bg-accent/40 md:block" />
          <div className="absolute left-1/2 top-0 grid h-28 w-28 -translate-x-1/2 place-items-center rounded-t-full border border-border bg-background text-accent shadow-card"><Hand className="h-12 w-12" strokeWidth={1.3} /></div>
        </div>
      </div>
    </MotionSection>
    <MotionSection className="pf-section bg-background">
      <div className="pf-container">
        <SectionIntro eyebrow="INTERNATIONAL RECOGNITION" title="Awards, authority and global presence" />
        <div className="mt-10 grid gap-4 lg:grid-cols-[0.92fr_1.65fr]">
          {awards.slice(0, 1).map((award, index) => {
            const Icon = award.icon;
            return <article key={award.title} className="pf-card overflow-hidden">
              <div className="grid aspect-[3/4] place-items-center bg-card-soft p-3">
                <img src={award.image} alt={`${award.title} certificate`} width={800} height={1067} loading="lazy" decoding="async" className="max-h-full w-full object-contain" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-badge text-accent"><Icon size={16} strokeWidth={1.6} /></div>
                  <p className="text-[9px] font-medium uppercase tracking-[2px] text-accent">AWARD 0{index + 1}</p>
                </div>
                <h3 className="pf-h3 mt-4 text-[22px]">{award.title}</h3>
                <p className="mt-2 text-[12px] font-light leading-relaxed text-muted-foreground">{award.description}</p>
              </div>
            </article>;
          })}
          <div className="grid gap-4 md:grid-cols-2">
            {awards.slice(1).map((award, index) => {
              const Icon = award.icon;
              return <article key={award.title} className="pf-card overflow-hidden">
                <div className="grid aspect-[16/10] place-items-center bg-card-soft p-3">
                  <img src={award.image} alt={`${award.title} certificate`} width={900} height={563} loading="lazy" decoding="async" className="max-h-full w-full object-contain" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-badge text-accent"><Icon size={15} strokeWidth={1.6} /></div>
                    <p className="text-[9px] font-medium uppercase tracking-[2px] text-accent">AWARD 0{index + 2}</p>
                  </div>
                  <h3 className="pf-h3 mt-3 text-[20px]">{award.title}</h3>
                  <p className="mt-1.5 text-[12px] font-light leading-relaxed text-muted-foreground">{award.description}</p>
                </div>
              </article>;
            })}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {globalPresence.map((place) => <span key={place} className="rounded-full border border-border bg-card px-4 py-2 text-[11px] text-muted-foreground">{place}</span>)}
        </div>
      </div>
    </MotionSection>
    <MotionSection className="pf-section bg-card">
      <div className="pf-container text-center">
        <SectionIntro eyebrow="OFFICES" title="Where you can find Prachi" />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((city) => <article key={city} className="rounded-xl border border-border bg-card-soft p-7 text-center">
            <MapPin className="mx-auto h-5 w-5 text-accent" />
            <h3 className="pf-h3 mt-3 text-[22px]">{city}</h3>
            <p className="mt-1 text-[11px] text-muted-foreground">Office space</p>
            {city === "Kopargaon" && <p className="mt-1.5 text-[10px] text-accent">+ travels all over India on request</p>}
          </article>)}
        </div>
        <p className="mt-9 font-heading text-base italic text-muted-foreground">Remote consultations available worldwide — via Zoom, WhatsApp or phone.</p>
      </div>
    </MotionSection>
  </>;
}
