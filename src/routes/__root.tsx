import { Outlet, Link, createRootRoute, HeadContent, Scripts, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

import { FloatingActions, Footer, Header } from "@/components/prachi/SiteLayout";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="pf-eyebrow pf-eyebrow-center">Not found</p>
        <h1 className="pf-h1 mt-7">404</h1>
        <p className="pf-body mt-3">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-8">
          <Link to="/" className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:brightness-[1.08]">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Prachi Fulfagar | Vastu, Palmistry & Astrology" },
      { name: "description", content: "Award-winning Vastu, Palmistry and Vedic Astrology consultations across India and internationally." },
      { name: "author", content: "Prachi Fulfagar" },
      { property: "og:title", content: "Prachi Fulfagar | Vastu, Palmistry & Astrology" },
      { property: "og:description", content: "Premium Vastu, Palmistry and Vedic Astrology guidance in India and worldwide." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const location = useLocation();
  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <FloatingActions />
    </>
  );
}
