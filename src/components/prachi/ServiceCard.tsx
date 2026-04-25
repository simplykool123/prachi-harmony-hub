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
      className={cn("pf-card pf-card-hover relative p-7", service.featured && "border-[1.5px] border-accent")}
    >
      {service.featured && (
        <span className="absolute right-5 top-5 rounded-full bg-badge px-2.5 py-1 text-[9px] font-medium uppercase tracking-[1.5px] text-badge-foreground">
          Signature
        </span>
      )}
      <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-badge text-accent">
        <Icon size={18} strokeWidth={1.8} />
      </div>
      <h3 className="mt-4 font-body text-[13px] font-medium leading-snug text-foreground">{service.name}</h3>
      <p className="mt-1.5 text-xs font-light leading-relaxed text-muted-foreground">{service.description}</p>
    </motion.article>
  );
}
