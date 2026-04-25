import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountUp, MotionSection, SectionIntro, fadeUp, staggerContainer, staggerItem } from "@/components/prachi/Motion";
import { ServiceCard } from "@/components/prachi/ServiceCard";
import { services, whatsappUrl } from "@/components/prachi/site-data";

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

function Index() {
  return (
    <>
      <section className="relative grid min-h-[calc(100vh-81px)] place-items-center overflow-hidden bg-background text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/8" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/12" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/7" />
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="pf-container relative z-10 py-20">
          <motion.p variants={staggerItem} className="mb-7 text-[10px] font-medium uppercase tracking-[3px] text-accent">
            Award-winning · Pan-India · International Sessions
          </motion.p>
          <motion.h1 className="pf-h1">
            <motion.span className="block" variants={staggerItem}>Ancient wisdom.</motion.span>
            <motion.span className="block italic text-accent" variants={staggerItem}>A balanced, peaceful life.</motion.span>
          </motion.h1>
          <motion.p variants={staggerItem} className="pf-body mx-auto mt-6 max-w-[480px] text-[15px]">
            Prachi Fulfagar guides you through Vastu Shastra, Palmistry and Vedic Astrology — helping homes, businesses and lives find their natural harmony.
          </motion.p>
          <motion.div variants={staggerItem} className="mt-10 flex flex-wrap justify-center gap-3.5">
            <Button asChild variant="hero"><Link to="/contact">Book a Consultation</Link></Button>
            <Button asChild variant="porcelain"><Link to="/services">Explore Services</Link></Button>
          </motion.div>
        </motion.div>
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

      <MotionSection className="pf-section bg-card">
        <div className="pf-container grid items-center gap-16 lg:grid-cols-[55fr_45fr] lg:gap-20">
          <motion.div {...fadeUp}>
            <p className="pf-eyebrow">ABOUT PRACHI</p>
            <h2 className="pf-h2 mt-7">Two decades. One rare combination.</h2>
            <p className="pf-body mt-5">Prachi Fulfagar is one of India's most credentialled Vastu and Palmistry consultants — combining both in a rare integrated practice that aligns you from the inside out.</p>
            <p className="pf-body mt-4">Consulting from Mumbai, Pune, Nashik and Kopargaon, she works with clients across India and internationally.</p>
            <Link to="/about" className="group mt-7 inline-flex text-[13px] font-medium text-accent">Read her full story <span className="transition group-hover:translate-x-1">→</span></Link>
          </motion.div>
          <div className="grid gap-4">
            {["Thailand Honorary Doctorate", "International Astro Purohit Award"].map((title, index) => (
              <motion.article {...fadeUp} key={title} transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.08 }} className="rounded-xl border border-l-[3px] border-border border-l-accent bg-card-soft p-5">
                <p className="text-[9px] font-medium uppercase tracking-[2px] text-accent">AWARD 0{index + 1}</p>
                <h3 className="pf-h3 mt-2 text-xl">{title}</h3>
                <p className="mt-2 text-xs font-light leading-relaxed text-muted-foreground">{index === 0 ? "Conferred by the International Astrology Federation Inc. at the Thailand Triangle Summit." : "Awarded by the International Astrology Federation for outstanding contribution to Vastu and Astrology."}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="pf-section bg-background">
        <div className="pf-container">
          <SectionIntro eyebrow="CLIENT STORIES" title="Lives that found balance" />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {testimonials.map(([quote, name, city], index) => (
              <motion.article {...fadeUp} key={name} transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.08 }} className="pf-card overflow-hidden p-0">
                <div className="h-[3px] bg-accent" />
                <div className="p-8">
                  <p className="font-heading text-[17px] italic leading-relaxed text-foreground">“{quote}”</p>
                  <p className="mt-6 text-xs font-medium text-foreground">{name}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{city}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="border-y border-border bg-warm py-[100px] text-center">
        <motion.div {...fadeUp} className="pf-container">
          <div className="mx-auto mb-8 h-px w-12 bg-accent" />
          <h2 className="pf-h2">Begin your journey to harmony</h2>
          <p className="pf-body mx-auto mt-4 max-w-xl">Book a consultation — in person or online, across India and internationally.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3.5">
            <Button asChild variant="hero"><Link to="/contact">Book a Session</Link></Button>
            <Button asChild variant="porcelain"><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle className="text-whatsapp" />WhatsApp Now</a></Button>
          </div>
        </motion.div>
      </MotionSection>
    </>
  );
}
