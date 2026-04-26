
import { CelestialDecor, DoubleLineMark } from "./CelestialDecor";

export function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <section className="relative overflow-hidden bg-background pb-10 pt-10 text-center">
      <CelestialDecor variant="moon" className="pointer-events-none absolute left-[7%] top-7 hidden h-28 w-28 text-accent/10 lg:block" />
      <CelestialDecor variant="sun" className="pointer-events-none absolute right-[8%] top-10 hidden h-24 w-24 text-accent/12 lg:block" />
      <div className="pf-container relative z-10">
        <DoubleLineMark className="mx-auto mb-5 w-[190px] text-accent/65" />
        <p className="pf-eyebrow pf-eyebrow-center">{eyebrow}</p>
        <h1 className="pf-h1 mx-auto mt-5 max-w-3xl">{title}</h1>
        <p className="pf-body mx-auto mt-5 max-w-xl text-[15px]">{copy}</p>
      </div>
    </section>
  );
}
