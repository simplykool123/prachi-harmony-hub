import { motion } from "framer-motion";
import { fadeUp } from "./Motion";

export function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <section className="bg-background pb-10 pt-10 text-center">
      <motion.div {...fadeUp} className="pf-container">
        <div className="mx-auto mb-5 h-px w-12 bg-accent" />
        <p className="pf-eyebrow pf-eyebrow-center">{eyebrow}</p>
        <h1 className="pf-h1 mx-auto mt-5 max-w-3xl">{title}</h1>
        <p className="pf-body mx-auto mt-5 max-w-xl text-[15px]">{copy}</p>
      </motion.div>
    </section>
  );
}
