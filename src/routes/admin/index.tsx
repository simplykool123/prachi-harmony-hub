import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/")({
  component: AdminIndex,
});

function Stat({ label, value, sub, to, color }: { label: string; value: number | string; sub: string; to: string; color: string }) {
  return (
    <Link to={to} className="pf-card block rounded-xl p-5 transition hover:border-accent">
      <p className="text-[10px] font-medium tracking-[1.5px] text-muted-foreground uppercase mb-2">{label}</p>
      <p className="font-heading text-[40px] font-light leading-none" style={{ color }}>{value}</p>
      <p className="mt-2 text-[11px] text-muted-foreground">{sub}</p>
    </Link>
  );
}

function AdminIndex() {
  const [stats, setStats] = useState({ blogs: 0, published: 0, leads: 0, newLeads: 0, social: 0 });
  const [leads, setLeads] = useState<any[]>([]);
  const hasKey = !!import.meta.env.VITE_ANTHROPIC_API_KEY;
  const hasSupabase = !!(import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes("placeholder"));

  useEffect(() => {
    if (!hasSupabase) return;
    Promise.all([
      supabase.from("vp_blog_posts").select("id, published"),
      supabase.from("vp_contact_leads").select("id, full_name, service_interested, status, created_at").order("created_at", { ascending: false }).limit(5),
      supabase.from("vp_social_drafts").select("id"),
    ]).then(([b, l, s]) => {
      const blogs = b.data || [];
      const allLeads = l.data || [];
      setStats({ blogs: blogs.length, published: blogs.filter((x: any) => x.published).length, leads: allLeads.length, newLeads: allLeads.filter((x: any) => x.status === "new").length, social: (s.data || []).length });
      setLeads(allLeads);
    });
  }, []);

  return (
    <div>
      <p className="pf-eyebrow mb-2">Admin</p>
      <h1 className="font-heading text-[32px] font-light text-foreground mb-1">Good morning, Prachi</h1>
      <p className="pf-body mb-8">Your content overview.</p>

      {/* System status */}
      <div className="mb-8 flex flex-wrap gap-4 rounded-xl border border-border bg-warm p-4 text-[12px]">
        <StatusDot ok={hasSupabase} label="Supabase" detail={hasSupabase ? "Connected" : "Add VITE_SUPABASE_URL to .env"} />
        <StatusDot ok={hasKey} label="Claude API" detail={hasKey ? "Connected" : "Add VITE_ANTHROPIC_API_KEY to .env"} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Stat label="Blog Posts" value={stats.blogs} sub={`${stats.published} published`} to="/admin/blog" color="var(--color-accent)" />
        <Stat label="Contact Leads" value={stats.leads} sub={`${stats.newLeads} new`} to="/admin/leads" color="#D4520A" />
        <Stat label="Social Drafts" value={stats.social} sub="Posts drafted" to="/admin/social" color="#3B6D11" />
      </div>

      {/* Quick actions + recent leads */}
      <div className="grid grid-cols-2 gap-6">
        <div className="pf-card rounded-xl p-5">
          <p className="mb-4 text-[12px] font-medium text-foreground">Quick Actions</p>
          {[
            { to: "/admin/blog", label: "✍ Write a blog post" },
            { to: "/admin/social", label: "◈ Draft social posts" },
            { to: "/admin/calendar", label: "◷ Content calendar" },
            { to: "/admin/leads", label: "◎ Check enquiries" },
          ].map((a) => (
            <Link key={a.to} to={a.to} className="block rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-foreground transition hover:border-accent mb-2">
              {a.label}
            </Link>
          ))}
        </div>

        <div className="pf-card rounded-xl p-5">
          <p className="mb-4 text-[12px] font-medium text-foreground">Recent Enquiries</p>
          {leads.length === 0 ? (
            <p className="text-[13px] text-muted-foreground">Enquiries from your website form appear here.</p>
          ) : leads.map((l) => (
            <div key={l.id} className="flex justify-between items-start py-2.5 border-b border-border last:border-0">
              <div>
                <p className="text-[13px] font-medium text-foreground">{l.full_name}</p>
                <p className="text-[11px] text-muted-foreground">{l.service_interested || "General"}</p>
              </div>
              <span className={`text-[10px] font-medium rounded-full px-2 py-0.5 ${l.status === "new" ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-500"}`}>
                {l.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusDot({ ok, label, detail }: { ok: boolean; label: string; detail: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`h-2 w-2 rounded-full ${ok ? "bg-green-500" : "bg-amber-400"}`} />
      <span className="font-medium text-foreground">{label}</span>
      <span className="text-muted-foreground">{detail}</span>
    </div>
  );
}
