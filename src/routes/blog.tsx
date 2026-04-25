import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/prachi/PageHero";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [
    { title: "Blog | Prachi Fulfagar" },
    { name: "description", content: "Premium insights on Vastu, Palmistry and Vedic Astrology from Prachi Fulfagar." },
    { property: "og:title", content: "Blog | Prachi Fulfagar" },
    { property: "og:description", content: "Premium insights on Vastu, Palmistry and Vedic Astrology." },
  ]}),
  component: BlogPage,
});

function BlogPage() {
  return <>
    <PageHero eyebrow="BLOG" title="Insights for a balanced life" copy="Selected notes on homes, hands and planetary wisdom will arrive soon." />
    <section className="pf-section bg-background pt-10 text-center"><Button asChild variant="porcelain"><Link to="/services">Explore Services</Link></Button></section>
  </>;
}
