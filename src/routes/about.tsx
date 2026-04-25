import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/prachi/PageHero";
import { MotionSection, SectionIntro, fadeUp } from "@/components/prachi/Motion";
import { cities } from "@/components/prachi/site-data";

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
    <MotionSection className="pf-section bg-card">
      <div className="pf-container grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <motion.div {...fadeUp} className="grid aspect-[4/5] place-items-center rounded-2xl bg-warm outline outline-1 outline-offset-8 outline-accent/30">
          <p className="font-heading text-3xl italic text-muted-foreground">Prachi Fulfagar</p>
        </motion.div>
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
        <SectionIntro eyebrow="INTERNATIONAL RECOGNITION" title="Globally recognised expertise" />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {["Thailand Honorary Doctorate", "International Astro Purohit Award"].map((title, index) => (
            <motion.article {...fadeUp} key={title} transition={{ duration: .7, ease: "easeOut", delay: index * .08 }} className="pf-card border-t-[3px] border-t-accent p-8">
              <p className="text-[9px] font-medium uppercase tracking-[2px] text-accent">AWARD 0{index + 1}</p>
              <h3 className="pf-h3 mt-3 text-[26px]">{title}</h3>
              <p className="mt-3 text-[13px] font-light leading-relaxed text-muted-foreground">{index === 0 ? "Conferred by the International Astrology Federation Inc. — an American Research Organisation — at the Thailand Triangle Summit. One of the highest international recognitions in the field." : "Awarded by the International Astrology Federation for outstanding contribution to the science of Vastu and Astrology — recognised for excellence in practice and community outreach."}</p>
            </motion.article>
          ))}
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
