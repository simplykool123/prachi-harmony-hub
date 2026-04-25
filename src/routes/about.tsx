import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { ImageComposition } from "@/components/prachi/ImageComposition";
import { PageHero } from "@/components/prachi/PageHero";
import { MotionSection, SectionIntro, fadeUp } from "@/components/prachi/Motion";
import { awards, cities, globalPresence } from "@/components/prachi/site-data";
import vastuPlanImage from "@/assets/site-images/prachi-vastu-plan.jpg";
import celestialPalmImage from "@/assets/site-images/prachi-celestial-palm.jpg";
import officeVastuImage from "@/assets/site-images/prachi-office-vastu.jpg";
import familyHomeImage from "@/assets/site-images/prachi-family-home.jpg";

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
      <div className="pf-container grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <ImageComposition
          primary={{ src: familyHomeImage, alt: "Real home interior balanced with practical Vastu guidance", width: 1280, height: 960 }}
          secondary={{ src: celestialPalmImage, alt: "Palmistry consultation details in warm light", width: 1120, height: 1328 }}
        />
        <motion.div {...fadeUp}>
          <p className="pf-eyebrow">HER STORY</p>
          <h2 className="pf-h2 mt-7">Two decades. One rare combination.</h2>
          <p className="pf-body mt-5">For over two decades, Prachi Fulfagar has been a trusted guide for thousands of people seeking clarity — through their palms, their homes, and the stars.</p>
          <p className="pf-body mt-4">What sets Prachi apart is her rare combination of Palmistry and Vastu Shastra — a pairing that allows her to read both the person and their environment, aligning them together for results neither practice achieves alone.</p>
          <p className="pf-body mt-4">Today, Prachi consults from offices in Mumbai, Pune, Nashik and Kopargaon, and works with clients across India and internationally.</p>
        </motion.div>
      </div>
    </MotionSection>
    <MotionSection className="pf-section bg-background">
      <div className="pf-container">
        <SectionIntro eyebrow="INTERNATIONAL RECOGNITION" title="Awards, authority and global presence" />
        <div className="mt-14 grid gap-10 lg:grid-cols-[58fr_42fr] lg:items-center">
          <div className="grid gap-5">
            {awards.map((award, index) => {
              const Icon = award.icon;
              return <motion.article {...fadeUp} key={award.title} transition={{ duration: .7, ease: "easeOut", delay: index * .08 }} className="pf-card grid gap-5 border-l-[3px] border-l-accent p-7 sm:grid-cols-[auto_1fr]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-badge text-accent"><Icon size={20} strokeWidth={1.6} /></div>
                <div><p className="text-[9px] font-medium uppercase tracking-[2px] text-accent">AWARD 0{index + 1}</p><h3 className="pf-h3 mt-2 text-[26px]">{award.title}</h3><p className="mt-3 text-[13px] font-light leading-relaxed text-muted-foreground">{award.description}</p></div>
              </motion.article>;
            })}
          </div>
          <ImageComposition
            primary={{ src: officeVastuImage, alt: "Professional office Vastu consultation with plan and remedies", width: 1280, height: 960 }}
            secondary={{ src: vastuPlanImage, alt: "Detailed Vastu floor plan consultation setting", width: 1408, height: 960 }}
            align="right"
          />
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
          {cities.map((city) => <motion.article {...fadeUp} key={city} className="rounded-xl border border-border bg-card-soft p-7 text-center">
            <MapPin className="mx-auto h-5 w-5 text-accent" />
            <h3 className="pf-h3 mt-3 text-[22px]">{city}</h3>
            <p className="mt-1 text-[11px] text-muted-foreground">Office space</p>
            {city === "Kopargaon" && <p className="mt-1.5 text-[10px] text-accent">+ travels all over India on request</p>}
          </motion.article>)}
        </div>
        <p className="mt-9 font-heading text-base italic text-muted-foreground">Remote consultations available worldwide — via Zoom, WhatsApp or phone.</p>
      </div>
    </MotionSection>
  </>;
}
