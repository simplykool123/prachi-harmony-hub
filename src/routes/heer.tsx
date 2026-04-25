import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/prachi/PageHero";
import { MotionSection } from "@/components/prachi/Motion";

export const Route = createFileRoute("/heer")({
  head: () => ({ meta: [
    { title: "Heer | Prachi Fulfagar" },
    { name: "description", content: "A quiet editorial space from Prachi Fulfagar, coming soon." },
    { property: "og:title", content: "Heer | Prachi Fulfagar" },
    { property: "og:description", content: "A quiet editorial space from Prachi Fulfagar, coming soon." },
  ]}),
  component: HeerPage,
});

function HeerPage() {
  return <>
    <PageHero eyebrow="HEER" title="A quiet space for deeper wisdom" copy="Prachi's reflections, stories and teachings will be shared here soon." />
    <MotionSection className="pf-section bg-background pt-10 text-center"><Button asChild variant="porcelain"><Link to="/contact">Book a Session</Link></Button></MotionSection>
  </>;
}
