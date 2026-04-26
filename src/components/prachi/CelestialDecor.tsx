type CelestialDecorProps = {
  variant?: "sun" | "moon" | "star" | "compass";
  className?: string;
};

export function CelestialDecor({ variant = "star", className = "" }: CelestialDecorProps) {
  if (variant === "sun") {
    return (
      <svg viewBox="0 0 96 96" fill="none" className={className} aria-hidden="true">
        <circle cx="48" cy="48" r="17" stroke="currentColor" strokeWidth="1" />
        <circle cx="48" cy="48" r="7" stroke="currentColor" strokeWidth="0.9" />
        {Array.from({ length: 16 }).map((_, index) => {
          const angle = (index * 22.5 * Math.PI) / 180;
          const x1 = 48 + Math.cos(angle) * 25;
          const y1 = 48 + Math.sin(angle) * 25;
          const x2 = 48 + Math.cos(angle) * 38;
          const y2 = 48 + Math.sin(angle) * 38;
          return <path key={index} d={`M${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(2)}`} stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />;
        })}
      </svg>
    );
  }

  if (variant === "moon") {
    return (
      <svg viewBox="0 0 96 96" fill="none" className={className} aria-hidden="true">
        <path d="M61 18c-17 5-29 20-29 38 0 12 5 22 13 29C28 82 16 67 16 49 16 27 34 9 56 9c2 0 4 0 5 1Z" stroke="currentColor" strokeWidth="1.05" />
        <path d="M66 30c7 3 12 10 12 18s-5 15-12 18" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M69 20l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" stroke="currentColor" strokeWidth="0.85" />
      </svg>
    );
  }

  if (variant === "compass") {
    return (
      <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
        <circle cx="60" cy="60" r="45" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="60" cy="60" r="31" stroke="currentColor" strokeWidth="0.75" />
        <path d="M60 14 67 53 106 60 67 67 60 106 53 67 14 60 53 53 60 14Z" stroke="currentColor" strokeWidth="0.9" />
        <path d="M60 31 66 60 60 89 54 60 60 31Z" stroke="currentColor" strokeWidth="0.65" />
        <circle cx="60" cy="60" r="8" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path d="M32 7c3 14 11 22 25 25-14 3-22 11-25 25-3-14-11-22-25-25 14-3 22-11 25-25Z" stroke="currentColor" strokeWidth="1" />
      <path d="M49 8c1 5 4 8 9 9-5 1-8 4-9 9-1-5-4-8-9-9 5-1 8-4 9-9Z" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

export function DoubleLineMark({ className = "" }: { className?: string }) {
  return (
    <div className={`pf-double-line ${className}`} aria-hidden="true">
      <span />
      <i>✦</i>
      <span />
    </div>
  );
}