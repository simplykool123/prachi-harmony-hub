import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/prachi/PageHero";
import { MotionSection } from "@/components/prachi/Motion";
import { CelestialDecor } from "@/components/prachi/CelestialDecor";
import vastuGuideHeroBg from "@/assets/vastu-guide-hero-bg.jpg";

export const Route = createFileRoute("/vastu-guide")({
  head: () => ({ meta: [
    { title: "Vastu Directional Guide | Prachi Fulfagar" },
    { name: "description", content: "Free Vastu directional guide by Prachi Fulfagar. Learn the ideal room directions, five elements and common Vastu mistakes for homes and offices." },
    { property: "og:title", content: "The Vastu Directional Guide" },
    { property: "og:description", content: "Ancient principles — one room at a time." },
    { property: "og:type", content: "article" },
    { name: "twitter:title", content: "The Vastu Directional Guide" },
    { name: "twitter:description", content: "Ancient principles — one room at a time." },
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
    <PageHero eyebrow="FREE RESOURCE" title="The Vastu directional guide" copy="Ancient principles — one room at a time. A starting point before your personal consultation with Prachi." backgroundImage={vastuGuideHeroBg} />
    <MotionSection className="pf-section pf-celestial-section bg-background pt-10">
      <CelestialDecor variant="compass" className="pointer-events-none absolute -right-16 top-12 hidden h-64 w-64 text-accent/10 lg:block" />
      <div className="pf-container relative z-10">
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
        <section className="mt-16">
          <h2 className="pf-h2 text-center">5 Common Vastu Mistakes</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mistakes.map((m) => (
              <article key={m.title} className="pf-card p-6">
                <h3 className="font-heading text-[18px] font-normal text-accent">{m.title}</h3>
                <p className="mt-2 text-[13px] font-light leading-relaxed text-muted-foreground">{m.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="pf-h2 text-center">The Five Elements at a Glance</h2>
          <div className="mt-8 overflow-hidden rounded-[14px] border border-border bg-card">
            <div className="grid grid-cols-1 bg-foreground text-primary-foreground md:grid-cols-[1fr_1fr_1.5fr]">
              {['Element', 'Direction', 'Room / Feature'].map((h) => <div key={h} className="px-6 py-4 text-[11px] font-medium uppercase tracking-[1px]">{h}</div>)}
            </div>
            {elements.map(([el, dir, room], i) => (
              <div key={el} className={`grid grid-cols-1 border-b border-border last:border-b-0 md:grid-cols-[1fr_1fr_1.5fr] ${i % 2 ? 'bg-background' : 'bg-card'}`}>
                <div className="border-l-[3px] border-l-accent px-6 py-[18px] text-[13px] font-medium text-foreground">{el}</div>
                <div className="px-6 py-[18px] text-xs font-medium text-accent">{dir}</div>
                <div className="px-6 py-[18px] text-xs font-light leading-normal text-muted-foreground">{room}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 text-center">
          <p className="pf-body mb-6 mx-auto max-w-2xl">This guide gives you the foundation. For a personalised analysis of your home, office or plot, book a consultation with Prachi.</p>
          <Button asChild variant="hero"><Link to="/contact">Book a Consultation</Link></Button>
        </div>
      </div>
    </MotionSection>
  </>;
}

const mistakes = [
  { title: "Toilet in the North-East", body: "The NE is the most sacred zone. A toilet here creates constant energy drain." },
  { title: "Kitchen in the North-West or North", body: "Fire in a water-governed zone causes friction in health and relationships." },
  { title: "Master bedroom in the North-East", body: "Too light an energy for deep sleep and stability." },
  { title: "Main door facing South", body: "Invites instability; remedied with specific placements if unavoidable." },
  { title: "Mirrors facing the bed", body: "Reflects energy back during sleep; disrupts rest and creates restlessness." },
];

const elements: [string, string, string][] = [
  ["Earth (Prithvi)", "South-West", "Master bedroom, heavy furniture"],
  ["Water (Jal)", "North-East", "Meditation, prayer, water features"],
  ["Fire (Agni)", "South-East", "Kitchen, electrical, lighting"],
  ["Air (Vayu)", "North-West", "Guest room, children, movement"],
  ["Space (Akasha)", "Centre (Brahmasthan)", "Keep this zone open and light"],
];
