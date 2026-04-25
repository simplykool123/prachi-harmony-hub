import { motion } from "framer-motion";
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
      className={cn("pf-card pf-card-hover relative overflow-hidden p-7", service.featured && "border-[1.5px] border-accent bg-badge")}
    >
      {service.featured && <div className="absolute inset-x-0 top-0 h-[3px] bg-accent" />}
      {service.featured && (
        <span className="absolute right-5 top-5 rounded-full bg-card px-2.5 py-1 text-[9px] font-medium uppercase tracking-[1.5px] text-badge-foreground shadow-card">
          Signature
        </span>
      )}
      <div className={cn("flex h-11 w-11 items-center justify-center rounded-full bg-badge text-accent", service.featured && "bg-card") }>
        <Icon size={18} strokeWidth={1.8} />
      </div>
      <h3 className="mt-5 font-heading text-[24px] font-normal leading-tight text-foreground">{service.name}</h3>
      <p className="mt-2.5 text-[13px] font-light leading-relaxed text-muted-foreground">{service.description}</p>
    </motion.article>
  );
}
