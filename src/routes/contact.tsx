import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Facebook, Instagram, MapPin, MessageCircle, Youtube, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/prachi/PageHero";
import { MotionSection } from "@/components/prachi/Motion";
import { cities, services, whatsappUrl } from "@/components/prachi/site-data";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Prachi Fulfagar | Book a Consultation" },
      { name: "description", content: "Book an in-person or remote Vastu, Palmistry or Astrology consultation with Prachi Fulfagar." },
      { property: "og:title", content: "Contact Prachi Fulfagar" },
      { property: "og:description", content: "Begin your journey — in person across India, or online worldwide." },
    ],
  }),
  component: ContactPage,
});

// ── Form schema ───────────────────────────────────────────────
const formSchema = z.object({
  full_name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email").or(z.literal("")),
  phone: z.string().min(6, "Please enter a valid phone number").or(z.literal("")),
  city_country: z.string().optional(),
  service_interested: z.string().optional(),
  preferred_mode: z.enum(["In-person", "Remote", "Home Visit"]).optional(),
  message: z.string().optional(),
}).refine((d) => d.email || d.phone, {
  message: "Please provide at least an email or phone number",
  path: ["email"],
});

type FormData = z.infer<typeof formSchema>;

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="Begin your journey"
        copy="In-person across India, or online from anywhere in the world."
      />
      <MotionSection className="pf-section bg-background pt-10">
        <div className="pf-container grid gap-14 lg:grid-cols-[1fr_.9fr] lg:gap-[60px]">
          <ContactForm />
          <ContactAside />
        </div>
      </MotionSection>
    </>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { preferred_mode: "Remote" },
  });

  const onSubmit = async (data: FormData) => {
    setServerError("");
    const { error } = await supabase.from("vp_contact_leads").insert({
      full_name: data.full_name,
      email: data.email || null,
      phone: data.phone || null,
      city_country: data.city_country || null,
      service_interested: data.service_interested || null,
      preferred_mode: data.preferred_mode || null,
      message: data.message || null,
      source: "website",
      status: "new",
    });

    if (error) {
      console.error(error);
      setServerError("Something went wrong. Please WhatsApp Prachi directly.");
      return;
    }
    setSubmitted(true);
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-[13px] text-[13px] font-light text-foreground outline-none transition focus:border-accent focus:shadow-[0_0_0_3px_rgb(232_160_32_/_0.1)]";
  const errorClass = "mt-1 text-[11px] text-red-500";
  const labelClass = "mb-1.5 block text-[11px] font-medium tracking-[0.5px] text-muted-foreground";

  if (submitted) {
    return (
      <div className="pf-card flex flex-col items-center justify-center rounded-2xl p-12 text-center">
        <CheckCircle2 className="h-10 w-10 text-accent" />
        <h2 className="pf-h3 mt-6">
          Thank you,{" "}
          <span className="text-accent">{watch("full_name").split(" ")[0]}</span>
        </h2>
        <p className="pf-body mt-3 max-w-sm">
          Your enquiry has been received. Prachi will reach out to you personally within 24 hours.
        </p>
        <Button asChild variant="whatsapp" className="mt-8">
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            Also message on WhatsApp
          </a>
        </Button>
      </div>
    );
  }

  return (
    <form className="pf-card rounded-2xl p-9" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="pf-h3 mb-7">Send a message</h2>
      <div className="grid gap-5">
        {/* Name */}
        <div>
          <label className={labelClass}>Full Name *</label>
          <input {...register("full_name")} type="text" placeholder="Your full name" className={inputClass} />
          {errors.full_name && <p className={errorClass}>{errors.full_name.message}</p>}
        </div>

        {/* Email + Phone in a row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Email Address</label>
            <input {...register("email")} type="email" placeholder="your@email.com" className={inputClass} />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Phone / WhatsApp</label>
            <input {...register("phone")} type="tel" placeholder="+91 or international" className={inputClass} />
            {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
          </div>
        </div>

        {/* City */}
        <div>
          <label className={labelClass}>City / Country</label>
          <input {...register("city_country")} type="text" placeholder="e.g. Mumbai, Dubai, London" className={inputClass} />
        </div>

        {/* Service */}
        <div>
          <label className={labelClass}>Service Interested In</label>
          <select {...register("service_interested")} className={inputClass}>
            <option value="">Select a service...</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Not sure — general enquiry">Not sure — general enquiry</option>
          </select>
        </div>

        {/* Preferred mode */}
        <div>
          <label className={labelClass}>Preferred Mode</label>
          <div className="flex flex-wrap gap-4 text-[13px] text-foreground">
            {(["In-person", "Remote", "Home Visit"] as const).map((mode) => (
              <label key={mode} className="flex cursor-pointer items-center gap-2">
                <input
                  {...register("preferred_mode")}
                  type="radio"
                  value={mode}
                  className="accent-[var(--color-accent)]"
                />
                {mode}
              </label>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className={labelClass}>Message (optional)</label>
          <textarea
            {...register("message")}
            rows={4}
            placeholder="Tell Prachi a little about what you're looking for..."
            className={inputClass}
          />
        </div>

        {/* Server error */}
        {serverError && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-[13px] text-red-600">
            {serverError}
          </div>
        )}

        <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>

        <p className="text-center text-[11px] text-muted-foreground">
          Or reach Prachi directly on{" "}
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="font-medium text-[#22C55E] hover:underline">
            WhatsApp
          </a>
        </p>
      </div>
    </form>
  );
}

function ContactAside() {
  return (
    <aside>
      <h2 className="font-heading text-[28px] font-light text-foreground">How to reach Prachi</h2>
      <div className="mt-8">
        {cities.map((city) => (
          <div key={city} className="flex gap-4 border-b border-border py-4">
            <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
            <div>
              <p className="text-[13px] font-medium text-foreground">{city}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {city === "Nashik"
                  ? "Primary office · Home base"
                  : city === "Kopargaon"
                  ? "Regional office · Travels all over India on request"
                  : "Office space · By appointment"}
              </p>
            </div>
          </div>
        ))}
        <p className="mt-4 text-[12px] italic text-muted-foreground">
          Remote consultations available worldwide — via Zoom, WhatsApp or phone.
        </p>
      </div>

      <div className="mt-9 rounded-xl border border-border bg-warm p-6">
        <MessageCircle className="h-6 w-6 text-[#22C55E]" />
        <p className="mt-3 text-sm font-medium text-foreground">Chat on WhatsApp</p>
        <p className="mt-1 text-[11px] text-muted-foreground">Typically responds within a few hours</p>
        <Button asChild variant="whatsapp" className="mt-4 w-full">
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            Open WhatsApp
          </a>
        </Button>
      </div>

      <div className="mt-8 flex gap-5 text-muted-foreground">
        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
          <Instagram className="h-[18px] w-[18px] transition hover:text-accent" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
          <Youtube className="h-[18px] w-[18px] transition hover:text-accent" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
          <Facebook className="h-[18px] w-[18px] transition hover:text-accent" />
        </a>
      </div>
    </aside>
  );
}
