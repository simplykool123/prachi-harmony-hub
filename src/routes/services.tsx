import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/prachi/PageHero";
import { ServiceCard } from "@/components/prachi/ServiceCard";
import { MotionSection } from "@/components/prachi/Motion";
import { CelestialDecor } from "@/components/prachi/CelestialDecor";
import { services } from "@/components/prachi/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [
    { title: "Services | Vastu, Palmistry & Astrology" },
    { name: "description", content: "Explore twelve Vastu, Palmistry, Astrology and energy-balancing services by Prachi Fulfagar." },
    { property: "og:title", content: "Prachi Fulfagar Services" },
    { property: "og:description", content: "From your palm to your home — twelve services, one vision." },
  ]}),
  component: ServicesPage,
});

function ServicesPage() {
  const location = useLocation();

  if (location.pathname !== "/services") {
    return <Outlet />;
  }

  return <>
    <PageHero eyebrow="SERVICES" title="Every dimension of harmony" copy="From your palm to your home — twelve services, one vision." />
    <MotionSection className="pf-section pf-celestial-section bg-background pt-10">
      <CelestialDecor variant="compass" className="pointer-events-none absolute -right-20 top-16 hidden h-72 w-72 text-accent/10 lg:block" />
      <CelestialDecor variant="moon" className="pointer-events-none absolute -left-12 bottom-12 hidden h-44 w-44 text-accent/10 lg:block" />
      <div className="pf-container relative z-10">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => <ServiceCard key={service.name} service={service} index={index} />)}
        </div>
        <div className="mt-12 text-center"><Button asChild variant="hero"><Link to="/contact">Book Any Service</Link></Button></div>
      </div>
    </MotionSection>
  </>;
}
