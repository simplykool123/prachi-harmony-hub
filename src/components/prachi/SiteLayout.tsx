import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUp, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { navItems, services, socialLinks, whatsappUrl } from "./site-data";

const logoMark = "/site-images/prachi-logo-mark.png";
const logoWordmark = "/site-images/prachi-logo-wordmark.png";
const footerCompassImage = "/site-images/prachi-footer-compass-upload.png";

function Logo({ placement = "header" }: { placement?: "header" | "footer" }) {
  const isFooter = placement === "footer";
  return (
    <Link to="/" className="block leading-none" aria-label="Prachi Fulfagar home">
      <div className={isFooter ? "flex flex-col items-center gap-3 px-1 py-1" : "flex items-center gap-3 px-1 py-1"}>
        <img src={logoMark} alt="" width={256} height={256} loading="eager" decoding="async" className={isFooter ? "h-16 w-16 object-contain" : "h-11 w-11 shrink-0 object-contain"} />
        <img src={logoWordmark} alt="Prachi Fulfagar — Vastu, Palmist, Astrologer" width={680} height={160} loading="eager" decoding="async" className={isFooter ? "h-12 w-auto max-w-[240px] object-contain" : "h-9 w-auto max-w-[260px] object-contain"} />
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
  const footerServices = services.slice(1, 7);
  const quickLinks = [
    { label: "About Prachi", to: "/about" },
    { label: "Vastu Guide", to: "/vastu-guide" },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/contact" },
    { label: "Book a Session", to: "/contact" },
  ] as const;

  return (
    <footer className="relative overflow-hidden border-t border-foreground/10 bg-footer py-7 text-foreground">
      <img src={footerCompassImage} alt="" loading="lazy" decoding="async" className="pf-footer-compass absolute right-[-260px] top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 object-contain lg:block xl:right-[-250px]" />
      <div className="pf-container relative z-10 grid gap-7 lg:grid-cols-[1.1fr_0.9fr_0.9fr_1.1fr] lg:gap-9">
        <div className="flex flex-col items-center text-center lg:pr-8">
          <Logo placement="footer" />
          <p className="mt-4 max-w-[300px] text-[13px] leading-relaxed text-foreground/60">Guiding homes, businesses and lives with ancient wisdom and intuitive precision.</p>
          <div className="mt-4 flex items-center gap-4 text-primary" aria-hidden="true"><span className="h-px w-16 bg-primary/35" /><span className="text-xl leading-none">✧</span><span className="h-px w-16 bg-primary/35" /></div>
        </div>
        <nav className="border-foreground/10 lg:border-l lg:pl-12" aria-label="Footer services navigation">
          <h2 className="pf-footer-heading">Services</h2>
          <div className="mt-4 space-y-2">
            {footerServices.map((service) => {
              const Icon = service.icon;
              return <Link key={service.slug} to="/services/$serviceSlug" params={{ serviceSlug: service.slug }} className="flex items-center gap-3 text-[14px] text-foreground/60 transition hover:text-primary"><Icon className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.45} />{service.name}</Link>;
            })}
          </div>
          <Link to="/services" className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-primary">View all services <ArrowRight className="h-3.5 w-3.5" /></Link>
        </nav>
        <nav className="border-foreground/10 lg:border-l lg:pl-12" aria-label="Footer quick links navigation">
          <h2 className="pf-footer-heading">Quick Links</h2>
          <div className="mt-4 space-y-3">
            {quickLinks.map((item) => <Link key={item.label} to={item.to} className="flex items-center justify-between gap-4 text-[14px] text-foreground/60 transition hover:text-primary"><span>{item.label}</span><ArrowRight className="h-3.5 w-3.5 opacity-70" /></Link>)}
          </div>
        </nav>
        <div className="border-foreground/10 lg:border-l lg:pl-12">
          <h2 className="pf-footer-heading">Connect</h2>
          <div className="mt-4 space-y-3 text-[14px] leading-relaxed text-foreground/60">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-start gap-4 transition hover:text-primary"><Phone className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={1.6} /><span>+91 XXXXX XXXXX</span></a>
            <a href="mailto:hello@prachifulfagar.com" className="flex items-start gap-4 transition hover:text-primary"><Mail className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={1.6} /><span>hello@prachifulfagar.com</span></a>
            <p className="flex items-start gap-4"><MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={1.6} /><span>Mumbai, Pune, Nashik & Kopargaon</span></p>
          </div>
          <Button asChild variant="outline" className="mt-4 w-full justify-center border-primary/45 bg-transparent px-6 text-primary hover:bg-primary/10"><Link to="/contact">Book a Consultation <ArrowRight className="h-4 w-4" /></Link></Button>
          <div className="mt-4 flex justify-center gap-4">
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="pf-footer-social"><Instagram className="h-4 w-4" /></a>
            <a href={socialLinks.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="pf-footer-social"><Youtube className="h-4 w-4" /></a>
            <a href={socialLinks.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="pf-footer-social"><Facebook className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="pf-container relative z-10 mt-6 flex items-center justify-center gap-4 text-center text-[13px] text-foreground/55 before:h-px before:flex-1 before:bg-primary/15 after:h-px after:flex-1 after:bg-primary/15"><span className="text-primary">✦</span><span>© 2025 Prachi Fulfagar. All rights reserved.</span><span className="text-primary">✦</span></div>
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
