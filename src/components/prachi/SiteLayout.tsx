import { Link } from "@tanstack/react-router";
import { ArrowUp, Instagram, MessageCircle, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { navItems, services, whatsappUrl } from "./site-data";

const logoWhite = "/site-images/prachi-fulfagar-logo-white.png";

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="block leading-none" aria-label="Prachi Fulfagar home">
      <div className={light ? "inline-flex px-1 py-1" : "inline-flex px-1 py-1"}>
        <img src={logoWhite} alt="Prachi Fulfagar" width={360} height={246} loading="eager" decoding="async" className="h-11 w-auto object-contain" />
      </div>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 border-b border-foreground/10 bg-footer text-foreground transition-shadow ${scrolled ? "shadow-nav" : ""}`}>
      <div className="pf-container flex items-center justify-between gap-5 py-3">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            item.to === "/services" ? (
              <div key={item.to} className="group relative py-4">
                <Link to="/services" className="pf-nav-link">
                  {item.label}
                </Link>
                <div className="invisible absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 translate-y-2 rounded-[18px] border border-border bg-card p-4 opacity-0 shadow-card-hover transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="grid grid-cols-2 gap-1.5">
                    {services.map((service) => {
                      const Icon = service.icon;
                      return (
                        <Link key={service.slug} to="/services/$serviceSlug" params={{ serviceSlug: service.slug }} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-foreground transition hover:bg-badge hover:text-primary">
                          <Icon className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.7} />
                          <span>{service.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={item.to} to={item.to} className="pf-nav-link">
                {item.label}
              </Link>
            )
          ))}
        </nav>
        <Button asChild size="sm" className="px-5 py-2.5 text-xs">
          <Link to="/contact">Book a Session</Link>
        </Button>
      </div>
    </header>
  );
}

export function Footer() {
  const footerLinks = navItems.filter((item) => item.to !== "/blog");
  return (
    <footer className="border-t border-foreground/10 bg-footer py-10 text-foreground">
      <div className="pf-container grid gap-8 md:grid-cols-3 md:items-start">
        <div>
          <Logo light />
          <p className="mt-4 text-[11px] text-foreground/55">© 2025 PrachiFulfagar.com</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3 md:justify-center" aria-label="Footer navigation">
          {footerLinks.map((item) => (
            <Link key={item.to} to={item.to} className="text-xs text-foreground/60 transition hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="md:text-right">
          <p className="text-xs text-foreground/55">prachifulfagar.com</p>
          <div className="mt-4 flex gap-4 md:justify-end">
            <Instagram className="h-[18px] w-[18px] text-foreground/55 transition hover:text-primary" />
            <Youtube className="h-[18px] w-[18px] text-foreground/55 transition hover:text-primary" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-7 right-7 z-50 flex flex-col items-end gap-3">
      {visible && (
        <button
          type="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-card transition hover:border-accent hover:text-accent"
        >
          <ArrowUp size={17} />
        </button>
      )}
      <a href={whatsappUrl} aria-label="Chat with Prachi" className="group flex items-center gap-3" target="_blank" rel="noreferrer">
        <span className="rounded-full bg-footer px-3 py-1.5 text-[11px] text-primary-foreground opacity-0 shadow-card transition group-hover:opacity-100">
          Chat with Prachi
        </span>
        <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-whatsapp text-primary-foreground shadow-[0_4px_16px_rgb(34_197_94_/_0.35)] transition group-hover:scale-[1.08]">
          <MessageCircle size={22} />
        </span>
      </a>
    </div>
  );
}
