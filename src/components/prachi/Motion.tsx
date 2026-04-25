import { type ReactNode } from "react";

export function MotionSection({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={className}>
      {children}
    </section>
  );
}

export function SectionIntro({ eyebrow, title, copy, centered = true }: { eyebrow: string; title: string; copy?: string; centered?: boolean }) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`pf-eyebrow ${centered ? "pf-eyebrow-center" : ""}`}>{eyebrow}</p>
      <h2 className="pf-h2 mt-7">{title}</h2>
      {copy && <p className="pf-body mx-auto mt-4 max-w-xl">{copy}</p>}
    </div>
  );
}

export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  return <span>{value.toLocaleString()}{suffix}</span>;
}
