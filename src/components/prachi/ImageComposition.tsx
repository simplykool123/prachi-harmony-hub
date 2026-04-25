import { motion } from "framer-motion";
import { fadeUp } from "./Motion";

type CompositionImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export function ImageComposition({
  primary,
  secondary,
  align = "left",
}: {
  primary: CompositionImage;
  secondary: CompositionImage;
  align?: "left" | "right";
}) {
  const isRight = align === "right";

  return (
    <motion.div {...fadeUp} className="relative min-h-[500px] sm:min-h-[540px]">
      <img
        src={primary.src}
        alt={primary.alt}
        width={primary.width}
        height={primary.height}
        loading="lazy"
        className={`absolute top-0 h-[330px] w-[78%] object-cover shadow-card ${isRight ? "right-0 rounded-l-full" : "left-0 rounded-r-full"}`}
      />
      <img
        src={secondary.src}
        alt={secondary.alt}
        width={secondary.width}
        height={secondary.height}
        loading="lazy"
        className={`absolute bottom-0 h-[390px] w-[54%] object-cover shadow-card ${isRight ? "left-0 rounded-t-full" : "right-0 rounded-t-full"}`}
      />
      <div className={`absolute top-[58%] hidden h-px w-[42%] bg-accent/40 md:block ${isRight ? "right-[9%]" : "left-[9%]"}`} />
    </motion.div>
  );
}