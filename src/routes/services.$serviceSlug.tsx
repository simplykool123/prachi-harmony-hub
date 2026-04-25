import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cities, services, whatsappUrl } from "@/components/prachi/site-data";

export const Route = createFileRoute("/services/$serviceSlug")({
  head: ({ params }) => {
    const service = services.find((item) => item.slug === params.serviceSlug);
    return { meta: [
      { title: service ? `${service.name} | Prachi Fulfagar Services` : "Service | Prachi Fulfagar" },
      { name: "description", content: service?.description ?? "Premium Vastu, Palmistry and Astrology services by Prachi Fulfagar." },
      { property: "og:title", content: service ? `${service.name} | Prachi Fulfagar` : "Prachi Fulfagar Service" },
      { property: "og:description", content: service?.description ?? "Premium Vastu, Palmistry and Astrology consultations." },
    ] };
  },
  component: ServiceDetailPage,
});

type Step = { number: string; title: string; description: string };
type Detail = {
  intro: string;
  included: string[];
  for: string[];
  steps: Step[];
  badge?: string;
};

const serviceDetails: Record<string, Detail> = {
  "palm-vastu-combo": {
    badge: "Signature Service",
    intro:
      "Most people try to fix their home or their habits separately. The Palm + Vastu Combo session works on both at once — reading the patterns written in your palm and then examining how your living or working space either supports or contradicts those patterns. The result is a personalised set of corrections that feel effortless, because they are built around you specifically.",
    included: [
      "Full palmistry reading — life, heart, head and fate lines with detailed interpretation",
      "Analysis of mounts, finger shapes and hand texture",
      "Complete Vastu assessment of your home or workspace (floor plan or in-person visit)",
      "Written summary of findings for both palm and space",
      "3–5 specific Vastu corrections tailored to your palm profile",
      "30-minute follow-up call within 30 days",
    ],
    for: [
      "Anyone feeling stuck — in career, relationships or health — who wants to understand both their inner patterns and outer environment",
      "People moving into a new home or starting a new venture",
      "Those who have tried individual Vastu or astrology consultations and want a more integrated approach",
    ],
    steps: [
      { number: "01", title: "Share your details", description: "Send Prachi your date of birth and floor plan or address. For in-person: book a visit time." },
      { number: "02", title: "Palm reading session", description: "A focused 45–60 minute reading of your palm — recorded or with written notes shared afterward." },
      { number: "03", title: "Vastu assessment", description: "Room-by-room review against your palm profile. Corrections suggested based on what your palm reveals." },
      { number: "04", title: "Corrections and follow-up", description: "A written report with 3–5 practical corrections. Follow-up call to review progress." },
    ],
  },
  "residential-vastu": {
    intro:
      "The home is the most intimate environment in a person's life — and when its energy is misaligned, the effects show up in sleep, mood, relationships and health. Prachi's Residential Vastu consultation looks at every zone of your home against the five elements and the eight directions, and identifies what needs to shift — often with changes that require no renovation at all.",
    included: [
      "Full directional analysis of all rooms (entrance, bedroom, kitchen, pooja room, living room, bathrooms, children's rooms)",
      "Identification of any negative zones or energy blocks",
      "Correction recommendations — furniture placement, colours, objects, plants",
      "Geo stress check for bedrooms and workspaces",
      "Written report with priority corrections listed clearly",
      "Available in-person (Mumbai, Pune, Nashik, Kopargaon) or remotely via floor plan and photos",
    ],
    for: [
      "Families experiencing recurring health issues, sleep disturbances or relationship friction at home",
      "Anyone moving into a new flat or house before settling in",
      "People who have renovated or redecorated and feel the space isn't quite right",
    ],
    steps: [
      { number: "01", title: "Submit your floor plan", description: "Share a basic floor plan with North direction marked, plus photos of key rooms. Or book an in-person visit." },
      { number: "02", title: "Zone-by-zone analysis", description: "Prachi analyses each room against Vastu principles — directions, elements and energy flow." },
      { number: "03", title: "Report and corrections", description: "A written report with specific, practical corrections. No jargon. No unnecessary changes." },
    ],
  },
  "commercial-vastu": {
    intro:
      "A business space carries its own energy — and that energy affects footfall, team dynamics, decision-making and revenue. Prachi's Commercial Vastu consultations are direct and practical, focused on the changes that make a measurable difference: entrance placement, owner cabin direction, cash counter position, team seating and customer flow paths.",
    included: ["Entrance and customer flow analysis", "Owner or MD cabin direction and desk placement", "Team seating zones — accounts, sales, HR, operations", "Cash counter, safe and billing desk placement", "Meeting room and reception area corrections", "Colour recommendations per zone", "Shop, showroom or hospitality-specific advice (restaurant kitchen zone, hotel lobby energy)", "In-person visit or remote floor plan review"],
    for: ["Business owners experiencing sluggish revenue, high staff turnover or operational friction", "Shop or showroom owners wanting to improve customer engagement and conversion", "Hotels, restaurants and hospitality businesses seeking better energy flow", "New offices being set up for the first time"],
    steps: [
      { number: "01", title: "Share your space details", description: "Floor plan, North direction and photos. Describe the nature of the business briefly." },
      { number: "02", title: "Zone analysis", description: "Prachi maps your space against commercial Vastu principles — identifying corrections by department and function." },
      { number: "03", title: "Implementation report", description: "A written report your team or interior designer can implement directly. Clear, prioritised, practical." },
    ],
  },
  "industrial-vastu": {
    intro: "Industrial environments carry unique energy demands — machinery, movement, storage and production all have directional requirements in Vastu that, when ignored, contribute to accidents, breakdowns, low output and labour unrest. Prachi's Industrial Vastu assessments are built around the specific layout and function of the facility, with a practical focus on productivity, safety and financial flow.",
    included: ["Site and plot directional analysis", "Entry gate and main access road assessment", "Production floor and machinery placement guidance", "Raw material and finished goods storage zones", "Owner and management office direction", "Water source, fire and electrical zone review", "Geo stress check for high-use worker areas", "Written report with corrections for existing layout or guidance for new construction"],
    for: ["Factory owners experiencing repeated machinery breakdowns, accidents or labour issues", "Warehouse and logistics facilities with unexplained operational problems", "Industrial units under construction — Vastu input at planning stage"],
    steps: [
      { number: "01", title: "Submit site plan", description: "Share the site layout with North direction, entry gate locations and key area labels." },
      { number: "02", title: "Industrial zone analysis", description: "Prachi assesses each zone — production, storage, management, utilities — against Vastu principles." },
      { number: "03", title: "Corrections report", description: "A prioritised report of corrections. Implementable with or without renovation." },
    ],
  },
  palmistry: {
    intro: "Palmistry is not fortune-telling. It is a system of reading the physical map of a person — the lines, mounts, shapes and patterns in the hand — that has been refined over thousands of years. Prachi's palmistry sessions are grounded, insightful and deeply personal. Most people leave with a clearer sense of what they are naturally suited to and where they have been working against their own grain.",
    included: ["Reading of all major lines — life, heart, head, fate and sun lines", "Mount analysis — Venus, Jupiter, Saturn, Moon and Mars", "Finger and thumb shape interpretation", "Timing indicators for major life phases", "Career aptitude and natural talent assessment", "Relationship and compatibility patterns", "Health indicators and energetic tendencies", "Recording or written notes shared after the session"],
    for: ["Individuals at a crossroads — career change, relationship decisions, major investments", "People who feel they are not living in alignment with their true nature", "Those curious about palmistry who want a serious, in-depth reading rather than a surface-level session", "Overseas clients — available fully online via palm photograph"],
    steps: [
      { number: "01", title: "Send palm photographs", description: "High-resolution photos of both palms — front and back — in natural light. Include date of birth." },
      { number: "02", title: "The reading session", description: "A 45–60 minute session — video call or in-person. Prachi walks through each element of your palm in detail." },
      { number: "03", title: "Notes and follow-up", description: "Key insights shared in writing. Short follow-up questions welcome within 7 days of session." },
    ],
  },
  "geo-stress": {
    intro: "Geopathic stress refers to natural earth energies — underground water veins, geological fault lines and electromagnetic disturbances — that, when they pass through spaces where people sleep or spend long hours, contribute to chronic fatigue, poor sleep, anxiety and unexplained health issues. It is one of the most overlooked factors in home and workplace well-being, and one of the most impactful to correct.",
    included: ["Geo stress mapping of your home or workspace", "Identification of disturbed zones affecting beds, desks and seating areas", "Non-invasive correction methods — no demolition, no structural changes", "Pyramid or energetic remedy placement guidance", "Advice on repositioning furniture to avoid high-stress zones", "Available remotely via floor plan and photos"],
    for: ["People suffering from chronic poor sleep despite a healthy routine", "Anyone experiencing unexplained fatigue, anxiety or recurring illness", "Families where one room consistently causes discomfort or illness", "Businesses with unusually high staff sick days or low energy in specific areas"],
    steps: [
      { number: "01", title: "Share your floor plan", description: "Mark where people sleep, sit and spend long hours. Note any recurring complaints." },
      { number: "02", title: "Geo stress assessment", description: "Prachi identifies the disturbed zones and their likely source." },
      { number: "03", title: "Corrections and remedies", description: "Non-invasive remedies placed or repositioned. Practical and immediate to implement." },
    ],
  },
  pyramidology: {
    intro: "Pyramids have been used across cultures for thousands of years to concentrate, direct and harmonise energy. In Vastu, pyramid placements offer a powerful and completely non-invasive way to correct directional imbalances — particularly in rented homes, offices where structural changes are not permitted, or spaces where renovation is not practical. Prachi identifies the exact zones and types of pyramids required for each space.",
    included: ["Vastu analysis to identify which zones need correction", "Pyramid type selection — material, size and facing direction", "Exact placement guidance — room by room", "Activation instructions for each placement", "Can be combined with any other Vastu session", "Available remotely — works from floor plan and photos", "Pyramid products available through Heer (houseofremedies.in)"],
    for: ["Tenants and renters who cannot make structural changes", "Office spaces under lease where renovation is not permitted", "Anyone who needs Vastu corrections quickly and without disruption", "Existing Vastu clients looking to strengthen their corrections"],
    steps: [
      { number: "01", title: "Vastu assessment first", description: "Prachi identifies the imbalanced zones in your space that need correction." },
      { number: "02", title: "Pyramid prescription", description: "Type, size, material and exact position of each pyramid recommended." },
      { number: "03", title: "Placement and activation", description: "Guided placement — remote or in-person. Pyramid products available through Heer." },
    ],
  },
  "energy-balancing": {
    intro: "Every space holds energy — and over time, that energy can become stagnant, heavy or imbalanced. Energy Balancing uses the five Vastu elements — Earth, Water, Fire, Air and Space — to restore a natural flow to any environment. This is a gentler, more holistic approach compared to structural corrections, and works beautifully as a first step or as a complement to a full Vastu session.",
    included: ["Five-element assessment of the space", "Identification of heavy, stagnant or blocked energy zones", "Element-based corrections — plants, water features, lighting, metals, colours, crystals and movement", "Recommendations from Heer's curated healing product range where relevant", "Suitable for homes, offices and personal healing spaces", "Available remotely"],
    for: ["Anyone who feels a space is dull, heavy or lacking life — without being able to explain why", "People recovering from illness, grief or a difficult life phase and wanting to refresh their environment", "Creative professionals wanting a more vibrant and inspired workspace"],
    steps: [
      { number: "01", title: "Space assessment", description: "Photos and a brief description of the space and how it currently feels." },
      { number: "02", title: "Element analysis", description: "Prachi identifies which elements are excess, missing or blocked." },
      { number: "03", title: "Corrections and product guidance", description: "Specific, affordable adjustments. Product recommendations from Heer where relevant." },
    ],
  },
  "colour-guidelines": {
    intro: "Colour is not simply aesthetic — in Vastu, each direction and room type has colours that support its natural energy and colours that work against it. Choosing the wrong colour for a bedroom or entrance can subtly affect sleep, mood and the energy of everyone in the space. Prachi's Colour Guidelines session gives you a specific, direction-aware palette for every room in your home or office.",
    included: ["Room-by-room colour analysis based on direction and function", "Paint colour recommendations — walls, ceilings and accents", "Textile and furnishing colour guidance", "Commercial interior colour zoning — reception, sales floor, meeting rooms", "Specific brand colour recommendations for business signage and interiors", "Works alongside any interior designer's plan"],
    for: ["Homeowners about to paint or renovate", "Interior designers who want to add a Vastu-aligned colour layer to their work", "Businesses redesigning their interiors or branding environments", "Anyone who has painted a room and felt it doesn't feel right"],
    steps: [
      { number: "01", title: "Share your floor plan", description: "Mark North direction and note the current colours used in each room." },
      { number: "02", title: "Direction-based analysis", description: "Each room assessed by direction and its Vastu element." },
      { number: "03", title: "Colour palette report", description: "A written palette — specific paint names or codes — for each room or zone." },
    ],
  },
  remote: {
    intro: "Distance is no barrier to a thorough Vastu or palmistry consultation. Prachi has worked with clients across the UAE, UK, USA, Singapore, Australia and across India — entirely remotely — with results that match and often exceed in-person sessions. All that is needed is a clear floor plan, a set of photographs and a video call.",
    included: ["Full Vastu assessment via floor plan and photos", "Palmistry reading via high-resolution palm photographs", "Video call session (Zoom or WhatsApp) — recorded if requested", "Written correction report shared within 48 hours", "Supports all services — Residential, Commercial, Industrial, Geo Stress, Pyramidology, Palmistry", "Time zones accommodated — early morning or evening slots for overseas clients"],
    for: ["Indian clients overseas — UAE, UK, USA, Singapore, Canada, Australia", "Clients across India who are not in Mumbai, Pune, Nashik or Kopargaon", "Anyone who prefers a flexible, time-efficient consultation format"],
    steps: [
      { number: "01", title: "Submit documents", description: "Floor plan with North direction, clear photographs of each room. For palmistry: palm photos in natural light." },
      { number: "02", title: "Video session", description: "A focused 45–60 minute call with Prachi. She walks you through every finding and correction in real time." },
      { number: "03", title: "Written report", description: "Full written summary of corrections or reading notes shared within 48 hours." },
    ],
  },
  "plot-selection": {
    intro: "Choosing the right plot is the foundation of everything that follows. A plot that is well-proportioned, correctly oriented and free from geopathic disturbance will support a home or building that feels right for generations. Prachi's Plot Selection consultation evaluates every aspect of a potential plot before you commit — saving both money and energy in the long run.",
    included: ["Plot shape and proportions analysis", "Direction of entry and road position", "Slope and drainage assessment", "Surrounding environment — roads, buildings, water bodies, trees", "Geo stress check for the plot", "Best placement of main entrance and building footprint on the land", "Comparison of up to 3 plots if needed", "Available remotely via maps and photos or on-site visit"],
    for: ["Families buying land to build their home", "Builders and developers selecting sites for residential or commercial projects", "Anyone comparing multiple plot options before making a final decision"],
    steps: [
      { number: "01", title: "Share plot details", description: "Location, plot dimensions, North direction and surrounding context. Google Maps link and photos." },
      { number: "02", title: "Vastu plot analysis", description: "Shape, slope, road position, entry direction and geo stress assessed." },
      { number: "03", title: "Recommendation report", description: "Clear go / no-go with specific guidance on building placement if the plot is recommended." },
    ],
  },
  "career-astrology": {
    intro: "Career decisions carry enormous weight — and making them without understanding the planetary timing at play means navigating blind. Prachi's Career Astrology sessions use the Vedic birth chart to identify natural aptitudes, current planetary periods (dashas) and the most favourable timing for major professional moves. It is one of the most practical applications of astrology for the modern professional.",
    included: ["Full Vedic birth chart reading — focused on the 10th house (career) and relevant planetary placements", "Current dasha and antardasha analysis — what the next 1–3 years hold professionally", "Best timing windows for job changes, business launches and investments", "Natural strengths and career aptitudes from the chart", "Business partner compatibility if relevant", "Available online or in-person"],
    for: ["Professionals considering a career change or promotion opportunity", "Entrepreneurs planning a business launch or major expansion", "Anyone feeling stuck or stagnant professionally and wanting clarity on timing", "Overseas professionals — NRIs and international clients welcome"],
    steps: [
      { number: "01", title: "Share birth details", description: "Full date, time and place of birth. Accuracy of birth time improves reading quality." },
      { number: "02", title: "Chart analysis", description: "Prachi reads the chart with specific focus on career, timing and current planetary periods." },
      { number: "03", title: "Session and report", description: "45–60 minute session — video or in-person. Key timing windows and recommendations shared in writing." },
    ],
  },
};

function DetailSection({ label, heading, children }: { label: string; heading: string; children: React.ReactNode }) {
  return (
    <section className="mt-16">
      <p className="text-[10px] font-medium uppercase leading-none tracking-[3px] text-accent">{label}</p>
      <h2 className="mt-5 font-heading text-[28px] font-light leading-tight text-foreground">{heading}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function DotList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="grid grid-cols-[auto_1fr] gap-3 text-[14px] font-light leading-relaxed text-foreground">
          <span className="mt-[0.65em] h-1.5 w-1.5 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ServiceDetailPage() {
  const { serviceSlug } = Route.useParams();
  const service = services.find((item) => item.slug === serviceSlug);
  const detail = serviceDetails[serviceSlug];

  if (!service || !detail) throw notFound();

  const Icon = service.icon;

  return (
    <main className="bg-background py-12 sm:py-16">
      <div className="mx-auto w-[min(760px,calc(100%-40px))]">
        <Link to="/services" className="text-[13px] font-medium text-accent underline-offset-4 hover:underline">
          ← Back to Services
        </Link>

        <header className="relative mt-14 text-center">
          {detail.badge && (
            <span className="mb-6 inline-flex rounded-full bg-badge px-4 py-2 text-[10px] font-medium uppercase tracking-[2px] text-badge-foreground">
              {detail.badge}
            </span>
          )}
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-muted text-muted-foreground">
            <Icon size={48} strokeWidth={1.35} />
          </div>
          <h1 className="mx-auto mt-8 font-heading text-[52px] font-light leading-[1.08] text-foreground">{service.name}</h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] font-light leading-relaxed text-muted-foreground">{service.description}</p>
          <div className="mx-auto mt-8 h-px w-[60px] bg-accent" />
        </header>

        <DetailSection label="Introduction" heading="A personal, practical approach">
          <p className="text-[15px] font-light leading-[1.85] text-muted-foreground">{detail.intro}</p>
        </DetailSection>

        <DetailSection label="What's included" heading="What Prachi reviews with you">
          <DotList items={detail.included} />
        </DetailSection>

        <DetailSection label="Who this is for" heading="Best suited for">
          <DotList items={detail.for} />
        </DetailSection>

        <DetailSection label="How it works" heading="The consultation flow">
          <div className="space-y-8">
            {detail.steps.map((step) => (
              <article key={step.number} className="grid gap-4 sm:grid-cols-[72px_1fr]">
                <div className="font-heading text-[36px] font-light leading-none text-accent">{step.number}</div>
                <div>
                  <h3 className="font-body text-[13px] font-medium leading-tight text-foreground">{step.title}</h3>
                  <p className="mt-2 text-[13px] font-light leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </DetailSection>

        <section className="mt-16 border-t border-accent/45 pt-10 text-center">
          <h2 className="font-heading text-[32px] font-light leading-tight text-foreground">Ready to begin?</h2>
          <p className="mx-auto mt-3 max-w-lg text-[15px] font-light leading-relaxed text-muted-foreground">Book a personal consultation with Prachi — in person or online.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Button asChild variant="hero"><Link to="/contact">Book a Consultation</Link></Button>
            <Button asChild variant="porcelain"><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle className="text-whatsapp" />WhatsApp Prachi</a></Button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {cities.map((city) => <span key={city} className="rounded-full border border-border bg-card px-4 py-2 text-[11px] text-muted-foreground">{city}</span>)}
          </div>
          <p className="mt-4 text-[12px] font-light text-muted-foreground">Remote sessions available worldwide</p>
        </section>
      </div>
    </main>
  );
}
