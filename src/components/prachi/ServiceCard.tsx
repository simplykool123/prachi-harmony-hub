import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { Service } from "./site-data";

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const Icon = service.icon;
  return (
    <div
    >
      <Link
        to="/services/$serviceSlug"
        params={{ serviceSlug: service.slug }}
        className={cn("pf-card pf-card-hover pf-infographic-card relative flex h-full overflow-hidden", service.featured && "border-[1.5px] border-accent bg-badge")}
      >
        {service.featured && <div className="absolute inset-x-0 top-0 h-[3px] bg-accent" />}
        {service.featured && (
          <span className="absolute right-4 top-4 rounded-full bg-card px-2 py-0.5 text-[8px] font-medium uppercase tracking-[1.2px] text-badge-foreground shadow-card">
            Signature
          </span>
        )}
        <div className="flex w-full items-center gap-3">
          <div className={cn("pf-infographic-icon", service.featured && "text-accent") }>
            <Icon size={17} strokeWidth={1.35} />
          </div>
          <h3 className={cn("font-heading text-[20px] font-normal leading-none text-foreground", service.featured && "text-accent")}>{service.name}</h3>
        </div>
        <p className="mt-3 text-[12px] font-light leading-[1.55] text-muted-foreground">{service.description}</p>
        <span className="mt-3 text-[11px] font-medium text-primary underline-offset-4 transition hover:underline">Read More</span>
      </Link>
    </div>
  );
}
