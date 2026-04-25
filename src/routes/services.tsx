import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/prachi/PageHero";
import { ServiceCard } from "@/components/prachi/ServiceCard";
import { MotionSection } from "@/components/prachi/Motion";
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
    <MotionSection className="pf-section bg-background pt-10">
      <div className="pf-container">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => <ServiceCard key={service.name} service={service} index={index} />)}
        </div>
        <div className="mt-12 text-center"><Button asChild variant="hero"><Link to="/contact">Book Any Service</Link></Button></div>
      </div>
    </MotionSection>
  </>;
}
