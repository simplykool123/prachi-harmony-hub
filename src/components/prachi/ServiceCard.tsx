import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { Service } from "./site-data";

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const Icon = service.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.08 }}
      className={cn("pf-card pf-card-hover pf-infographic-card relative overflow-hidden", service.featured && "border-[1.5px] border-accent bg-badge")}
    >
      <Link to="/services/$serviceSlug" params={{ serviceSlug: service.slug }} className="absolute inset-0 z-10" aria-label={`Read more about ${service.name}`} />
      {service.featured && <div className="absolute inset-x-0 top-0 h-[3px] bg-accent" />}
      {service.featured && (
        <span className="absolute right-5 top-5 rounded-full bg-card px-2.5 py-1 text-[9px] font-medium uppercase tracking-[1.5px] text-badge-foreground shadow-card">
          Signature
        </span>
      )}
      <div className={cn("pf-infographic-icon", service.featured && "text-accent") }>
        <Icon size={32} strokeWidth={1.45} />
      </div>
      <h3 className={cn("mt-8 font-heading text-[28px] font-normal leading-tight text-foreground", service.featured && "text-accent")}>{service.name}</h3>
      <p className="mt-4 max-w-[285px] text-[15px] font-light leading-relaxed text-muted-foreground">{service.description}</p>
      <span className="mt-auto pt-8 text-[12px] font-medium text-primary underline-offset-4 transition hover:underline">Read More</span>
    </motion.article>
  );
}
