import { createFileRoute } from "@tanstack/react-router";
import { cloneElement, type HTMLAttributes, type ReactElement } from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, MapPin, MessageCircle, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/prachi/PageHero";
import { MotionSection, fadeUp } from "@/components/prachi/Motion";
import { cities, services, whatsappUrl } from "@/components/prachi/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact Prachi Fulfagar | Book a Consultation" },
    { name: "description", content: "Book an in-person or remote Vastu, Palmistry or Astrology consultation with Prachi Fulfagar." },
    { property: "og:title", content: "Contact Prachi Fulfagar" },
    { property: "og:description", content: "Begin your journey — in person across India, or online worldwide." },
  ]}),
  component: ContactPage,
});

function ContactPage() {
  return <>
    <PageHero eyebrow="CONTACT" title="Begin your journey" copy="In-person across India, or online from anywhere in the world." />
    <MotionSection className="pf-section bg-background pt-10">
      <div className="pf-container grid gap-14 lg:grid-cols-[1fr_.9fr] lg:gap-[60px]">
        <motion.form {...fadeUp} className="pf-card rounded-2xl p-9" onSubmit={(e) => e.preventDefault()}>
          <h2 className="pf-h3 mb-7">Send a message</h2>
          <div className="grid gap-5">
            <Field label="Full Name"><input type="text" /></Field>
            <Field label="Email Address"><input type="email" /></Field>
            <Field label="Phone / WhatsApp"><input type="tel" /></Field>
            <Field label="City / Country"><input type="text" /></Field>
            <Field label="Service Interested In"><select>{services.map((service) => <option key={service.name}>{service.name}</option>)}</select></Field>
            <div>
              <label className="mb-2 block text-[11px] font-medium tracking-[0.5px] text-muted-foreground">Preferred Mode</label>
              <div className="flex flex-wrap gap-4 text-[13px] text-foreground">
                {['In-person', 'Remote', 'Home Visit'].map((mode) => <label key={mode} className="flex items-center gap-2"><input name="mode" type="radio" className="accent-[var(--color-accent)]" />{mode}</label>)}
              </div>
            </div>
            <Field label="Message"><textarea rows={4} /></Field>
            <Button type="submit" variant="hero" className="w-full">Send Message</Button>
          </div>
        </motion.form>
        <motion.aside {...fadeUp}>
          <h2 className="font-heading text-[28px] font-light text-foreground">How to reach Prachi</h2>
          <div className="mt-8">
            {cities.map((city) => <div key={city} className="flex gap-4 border-b border-border py-4">
              <MapPin className="mt-1 h-4 w-4 text-accent" />
              <div><p className="text-[13px] font-medium text-foreground">{city}</p><p className="mt-0.5 text-[11px] text-muted-foreground">{city === 'Nashik' ? 'Primary office · Home base' : city === 'Kopargaon' ? 'Regional office · Travels all over India on request' : 'Office space · By appointment'}</p></div>
            </div>)}
          </div>
          <div className="mt-9 rounded-xl border border-border bg-warm p-6">
            <MessageCircle className="h-6 w-6 text-whatsapp" />
            <p className="mt-3 text-sm font-medium text-foreground">Chat on WhatsApp</p>
            <p className="mt-1 text-[11px] text-muted-foreground">Typically responds within a few hours</p>
            <Button asChild variant="whatsapp" className="mt-4 w-full"><a href={whatsappUrl} target="_blank" rel="noreferrer">Open WhatsApp</a></Button>
          </div>
          <div className="mt-8 flex gap-5 text-muted-foreground">
            <Instagram className="h-[18px] w-[18px] transition hover:text-accent" />
            <Youtube className="h-[18px] w-[18px] transition hover:text-accent" />
            <Facebook className="h-[18px] w-[18px] transition hover:text-accent" />
          </div>
        </motion.aside>
      </div>
    </MotionSection>
  </>;
}

function Field({ label, children }: { label: string; children: ReactElement<HTMLAttributes<HTMLElement>> }) {
  const controlClass = "w-full rounded-lg border border-border bg-background px-4 py-[13px] text-[13px] font-light text-foreground outline-none transition focus:border-accent focus:shadow-[0_0_0_3px_rgb(232_160_32_/_0.1)]";
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium tracking-[0.5px] text-muted-foreground">{label}</span>
      {cloneElement(children, { className: controlClass })}
    </label>
  );
}
