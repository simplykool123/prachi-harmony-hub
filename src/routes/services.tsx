import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/prachi/PageHero";
import { ServiceCard } from "@/components/prachi/ServiceCard";
import { MotionSection } from "@/components/prachi/Motion";
import { CelestialDecor } from "@/components/prachi/CelestialDecor";
import { services } from "@/components/prachi/site-data";
import servicesHeroBg from "@/assets/services-hero-bg.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [
    { title: "Services | Vastu, Palmistry & Astrology" },
    { name: "description", content: "Explore twelve Vastu, Palmistry, Astrology and energy-balancing services by Prachi Fulfagar." },
    { property: "og:title", content: "Prachi Fulfagar Services" },
    { property: "og:description", content: "From your palm to your home — twelve services, one vision." },
    { property: "og:type", content: "website" },
    { name: "twitter:title", content: "Prachi Fulfagar Services" },
    { name: "twitter:description", content: "From your palm to your home — twelve services, one vision." },
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
      <CelestialDecor variant="compass" className="pf-services-spin-slow pointer-events-none absolute -right-24 top-20 hidden h-80 w-80 text-accent/15 lg:block" />
      <CelestialDecor variant="sun" className="pf-services-float pointer-events-none absolute -left-16 top-40 hidden h-48 w-48 text-accent/15 lg:block" />
      <CelestialDecor variant="moon" className="pf-services-drift pointer-events-none absolute -left-10 bottom-24 hidden h-44 w-44 text-accent/15 lg:block" />
      <div className="pointer-events-none absolute right-12 bottom-32 hidden lg:block pf-services-float" style={{ animationDelay: "1.5s" }}>
        <CelestialDecor variant="star" className="h-24 w-24 text-accent/20" />
      </div>

      <div className="pf-services-rail pointer-events-none left-6 hidden lg:block">
        <span className="pf-services-dot" style={{ top: "12%", left: "-2.5px" }} />
        <span className="pf-services-dot" style={{ top: "48%", left: "-2.5px" }} />
        <span className="pf-services-dot" style={{ top: "82%", left: "-2.5px" }} />
      </div>
      <div className="pf-services-rail pointer-events-none right-6 hidden lg:block" style={{ animationDelay: ".3s" }}>
        <span className="pf-services-dot" style={{ top: "22%", left: "-2.5px" }} />
        <span className="pf-services-dot" style={{ top: "60%", left: "-2.5px" }} />
        <span className="pf-services-dot" style={{ top: "90%", left: "-2.5px" }} />
      </div>

      <div className="pf-container relative z-10">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.name}
              className="pf-services-card-enter"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </div>
        <div className="mt-12 text-center"><Button asChild variant="hero"><Link to="/contact">Book Any Service</Link></Button></div>
      </div>
    </MotionSection>
  </>;
}
