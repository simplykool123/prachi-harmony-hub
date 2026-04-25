import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase, type VpContactLead } from "@/lib/supabase";
import { whatsappUrl } from "@/components/prachi/site-data";

export const Route = createFileRoute("/admin/leads")({
  component: AdminLeads,
});

const STATUSES = ["new", "contacted", "booked", "closed", "spam"] as const;

const STATUS_STYLE: Record<string, string> = {
  new: "bg-amber-50 text-amber-700",
  contacted: "bg-blue-50 text-blue-700",
  booked: "bg-green-50 text-green-700",
  closed: "bg-gray-100 text-gray-500",
  spam: "bg-red-50 text-red-600",
};

function AdminLeads() {
  const [leads, setLeads] = useState<VpContactLead[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<VpContactLead | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => { load(); }, []);

  async function load() {
    const { data } = await supabase.from("vp_contact_leads").select("*").order("created_at", { ascending: false });
    setLeads(data || []);
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from("vp_contact_leads").update({ status }).eq("id", id);
    load();
    if (selected?.id === id) setSelected({ ...selected, status: status as any });
  }

  async function saveNote(id: string) {
    await supabase.from("vp_contact_leads").update({ notes: note }).eq("id", id);
    load();
  }

  const filtered = filter === "all" ? leads : leads.filter((l) => l.status === filter);
  const newCount = leads.filter((l) => l.status === "new").length;

  return (
    <div>
      <p className="pf-eyebrow mb-2">Admin</p>
      <h1 className="font-heading text-[32px] font-light text-foreground mb-1">Contact Leads</h1>
      <p className="pf-body mb-6">All enquiries from your website contact form.</p>

      {/* Stats row */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {STATUSES.map((s) => {
          const count = leads.filter((l) => l.status === s).length;
          return (
            <button key={s} onClick={() => setFilter(filter === s ? "all" : s)} className={`pf-card rounded-xl p-3 text-center transition ${filter === s ? "border-accent" : "hover:border-accent"}`}>
              <p className="font-heading text-[28px] font-light text-accent leading-none">{count}</p>
              <p className="mt-1 text-[10px] capitalize text-muted-foreground">{s}</p>
            </button>
          );
        })}
      </div>

      {newCount > 0 && (
        <div className="mb-4 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-[13px] text-amber-800">
          You have <strong>{newCount} new enquir{newCount === 1 ? "y" : "ies"}</strong> — update the status when you contact them.
        </div>
      )}

      <div className={`grid gap-4 ${selected ? "grid-cols-2" : "grid-cols-1"}`}>

        {/* Lead list */}
        <div className="pf-card rounded-xl overflow-hidden p-0">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-warm">
            <p className="text-[12px] font-medium text-foreground">
              {filter === "all" ? "All Leads" : filter.charAt(0).toUpperCase() + filter.slice(1)} ({filtered.length})
            </p>
            {filter !== "all" && (
              <button onClick={() => setFilter("all")} className="text-[11px] text-muted-foreground hover:text-accent">Clear</button>
            )}
          </div>
          {filtered.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-[32px] text-accent mb-3">◎</p>
              <p className="text-[13px] text-muted-foreground">
                {filter === "all" ? "No enquiries yet — connect your contact form to start receiving leads." : `No ${filter} leads.`}
              </p>
            </div>
          ) : filtered.map((lead) => (
            <div
              key={lead.id}
              onClick={() => { setSelected(lead); setNote(lead.notes || ""); }}
              className={`flex items-start justify-between px-4 py-3.5 border-b border-border last:border-0 cursor-pointer transition ${selected?.id === lead.id ? "bg-warm" : "hover:bg-background"} ${lead.status === "new" ? "border-l-2 border-l-amber-400" : ""}`}
            >
              <div>
                <p className="text-[13px] font-medium text-foreground">{lead.full_name}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{lead.service_interested || "General enquiry"} · {lead.city_country || "Location not given"}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
              <span className={`mt-0.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium flex-shrink-0 ${STATUS_STYLE[lead.status] || ""}`}>
                {lead.status}
              </span>
            </div>
          ))}
        </div>

        {/* Lead detail */}
        {selected && (
          <div className="pf-card rounded-xl p-5">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="font-heading text-[22px] font-light text-foreground">{selected.full_name}</h2>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {new Date(selected.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
              <button onClick={() => setSelected(null)} className="text-[18px] text-muted-foreground hover:text-foreground leading-none">×</button>
            </div>

            <div className="space-y-2.5 mb-5">
              {[
                { label: "Email", value: selected.email, href: selected.email ? `mailto:${selected.email}` : null },
                { label: "Phone / WhatsApp", value: selected.phone, href: selected.phone ? `https://wa.me/${selected.phone.replace(/\D/g, "")}` : null },
                { label: "City / Country", value: selected.city_country },
                { label: "Service", value: selected.service_interested },
                { label: "Preferred Mode", value: selected.preferred_mode },
              ].filter((f) => f.value).map((f) => (
                <div key={f.label} className="rounded-lg border border-border bg-background p-3">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-1">{f.label}</p>
                  {f.href ? (
                    <a href={f.href} target="_blank" rel="noreferrer" className="text-[13px] font-medium text-accent hover:underline">{f.value}</a>
                  ) : (
                    <p className="text-[13px] font-medium text-foreground">{f.value}</p>
                  )}
                </div>
              ))}
              {selected.message && (
                <div className="rounded-lg border border-border bg-background p-3">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-1">Message</p>
                  <p className="text-[13px] font-light text-foreground leading-relaxed">{selected.message}</p>
                </div>
              )}
            </div>

            {/* Status */}
            <div className="mb-4">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-2">Update Status</p>
              <div className="flex flex-wrap gap-1.5">
                {STATUSES.map((s) => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)} className={`rounded-full border px-3 py-1 text-[11px] capitalize transition ${selected.status === s ? "border-foreground bg-foreground text-background font-medium" : "border-border text-muted-foreground hover:border-accent"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="mb-5">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5">Private Notes</p>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="Add a note..." className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-foreground outline-none resize-none focus:border-accent" />
              <button onClick={() => saveNote(selected.id)} className="mt-2 rounded-full border border-border px-4 py-1.5 text-[12px] text-foreground hover:border-accent">Save note</button>
            </div>

            {/* Quick contact */}
            <div className="flex gap-2 pt-4 border-t border-border">
              {selected.phone && (
                <a href={`https://wa.me/${selected.phone.replace(/\D/g, "")}?text=Hi ${encodeURIComponent(selected.full_name)}, this is Prachi Fulfagar. Thank you for reaching out!`} target="_blank" rel="noreferrer" className="rounded-full bg-[#22C55E] px-4 py-2 text-[12px] font-medium text-white hover:brightness-105">
                  WhatsApp
                </a>
              )}
              {selected.email && (
                <a href={`mailto:${selected.email}?subject=Your enquiry with Prachi Fulfagar`} className="rounded-full border border-border px-4 py-2 text-[12px] font-medium text-foreground hover:border-accent">
                  Send Email
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
