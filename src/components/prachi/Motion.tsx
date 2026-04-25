import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

export function SectionIntro({ eyebrow, title, copy, centered = true }: { eyebrow: string; title: string; copy?: string; centered?: boolean }) {
  return (
    <motion.div {...fadeUp} className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`pf-eyebrow ${centered ? "pf-eyebrow-center" : ""}`}>{eyebrow}</p>
      <h2 className="pf-h2 mt-7">{title}</h2>
      {copy && <p className="pf-body mx-auto mt-4 max-w-xl">{copy}</p>}
    </motion.div>
  );
}

export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1600, bounce: 0 });
  const rounded = useTransform(spring, (latest) => `${Math.round(latest).toLocaleString()}${suffix}`);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}
