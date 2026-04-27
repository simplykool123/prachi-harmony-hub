import { Outlet, Link, createRootRoute, HeadContent, Scripts, useLocation } from "@tanstack/react-router";

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
      { property: "og:description", content: "Award-winning Vastu, Palmistry and Vedic Astrology consultations across India and internationally." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Prachi Fulfagar | Vastu, Palmistry & Astrology" },
      { name: "twitter:description", content: "Award-winning Vastu, Palmistry and Vedic Astrology consultations across India and internationally." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/aaaf5598-fb71-4e62-a060-e550de2af603/id-preview-226190e0--e437043d-7322-4bf3-b33a-4103bddd1da2.lovable.app-1777139515502.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/aaaf5598-fb71-4e62-a060-e550de2af603/id-preview-226190e0--e437043d-7322-4bf3-b33a-4103bddd1da2.lovable.app-1777139515502.png" },
    ],
    links: [
      { rel: "icon", href: "/favicons/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicons/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicons/favicon-16x16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/favicons/apple-touch-icon.png" },
      { rel: "manifest", href: "/favicons/site.webmanifest" },
      { rel: "stylesheet", href: appCss },
    ],
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
      <main key={location.pathname}>
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
