import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/prachi/PageHero";
import { fadeUp } from "@/components/prachi/Motion";

export const Route = createFileRoute("/vastu-guide")({
  head: () => ({ meta: [
    { title: "Vastu Directional Guide | Prachi Fulfagar" },
    { name: "description", content: "A premium Vastu directional guide for homes, offices, shops, restaurants and sacred spaces." },
    { property: "og:title", content: "The Vastu Directional Guide" },
    { property: "og:description", content: "Ancient principles — one room at a time." },
  ]}),
  component: VastuGuidePage,
});

const rows = [
  ["Main Entrance", "East or North-East", "Invites positive energy and morning sunlight into the home"],
  ["Master Bedroom", "South-West", "Promotes stability, deep sleep and relationship harmony"],
  ["Kitchen", "South-East", "Aligns with the fire element — health, digestion and vitality"],
  ["Pooja Room", "North-East", "Sacred corner for spiritual energy and divine connection"],
  ["Living Room", "North or East", "Encourages social warmth and welcoming energy"],
  ["Children's Room", "West or North-West", "Supports focus, memory and academic growth"],
  ["Office — Owner's Cabin", "South-West facing North/East", "Authority and clear decision-making"],
  ["Office — Accounts / Cash", "North", "North is governed by Kuber — deity of wealth"],
  ["Shop / Showroom Entrance", "North or East", "Draws customer flow and fresh energy"],
  ["Hotel / Restaurant Kitchen", "South-East", "Fire zone — ideal for cooking and nourishment"],
  ["Bathroom / Toilet", "West or North-West", "Keeps negative energy away from sacred zones"],
  ["Staircase", "South, West or South-West", "Prevents energy leakage from sacred zones"],
];

function VastuGuidePage() {
  return <>
    <PageHero eyebrow="FREE RESOURCE" title="The Vastu directional guide" copy="Ancient principles — one room at a time. A starting point before your personal consultation with Prachi." />
    <section className="pf-section bg-background pt-10">
      <motion.div {...fadeUp} className="pf-container">
        <div className="overflow-hidden rounded-[14px] border border-border bg-card">
          <div className="grid grid-cols-1 bg-foreground text-primary-foreground md:grid-cols-[1.1fr_1fr_1.7fr]">
            {['Room / Zone', 'Ideal Direction', 'Why it matters'].map((head) => <div key={head} className="px-6 py-4 text-[11px] font-medium uppercase tracking-[1px]">{head}</div>)}
          </div>
          {rows.map(([room, direction, why], index) => (
            <div key={room} className={`grid grid-cols-1 border-b border-border last:border-b-0 md:grid-cols-[1.1fr_1fr_1.7fr] ${index % 2 ? 'bg-background' : 'bg-card'}`}>
              <div className="border-l-[3px] border-l-accent px-6 py-[18px] text-[13px] font-medium text-foreground">{room}</div>
              <div className="px-6 py-[18px] text-xs font-medium text-accent">{direction}</div>
              <div className="px-6 py-[18px] text-xs font-light leading-normal text-muted-foreground">{why}</div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="pf-body mb-6">Need a personal Vastu consultation? Book with Prachi</p>
          <Button asChild variant="hero"><Link to="/contact">Book Now</Link></Button>
        </div>
      </motion.div>
    </section>
  </>;
}
