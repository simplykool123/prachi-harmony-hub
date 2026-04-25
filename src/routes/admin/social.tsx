import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase, type VpSocialDraft } from "@/lib/supabase";
import { generateSocialPosts, type GeneratedSocial } from "@/lib/claude";

export const Route = createFileRoute("/admin/social")({
  component: AdminSocial,
});

const MARKETS = ["India", "UAE", "UK", "USA", "Global"];
const PILLARS = ["Vastu", "Palmistry", "Astrology", "Heer", "General"];
const PLATFORMS = [
  { key: "caption_instagram", label: "Instagram" },
  { key: "caption_youtube", label: "YouTube" },
  { key: "caption_facebook", label: "Facebook" },
  { key: "caption_linkedin", label: "LinkedIn" },
  { key: "caption_pinterest", label: "Pinterest" },
  { key: "caption_threads", label: "Threads" },
] as const;

const inputClass = "w-full rounded-lg border border-border bg-background px-4 py-3 text-[13px] text-foreground outline-none transition focus:border-accent";
const labelClass = "mb-1.5 block text-[10px] font-medium tracking-[0.5px] text-muted-foreground uppercase";

function AdminSocial() {
  const [view, setView] = useState<"list" | "create" | "result">("list");
  const [drafts, setDrafts] = useState<VpSocialDraft[]>([]);
  const [topic, setTopic] = useState("");
  const [market, setMarket] = useState("India");
  const [pillar, setPillar] = useState("Vastu");
  const [result, setResult] = useState<GeneratedSocial | null>(null);
  const [editResult, setEditResult] = useState<Partial<GeneratedSocial>>({});
  const [activeTab, setActiveTab] = useState("caption_instagram");
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const hasKey = !!import.meta.env.VITE_ANTHROPIC_API_KEY;

  useEffect(() => { loadDrafts(); }, []);

  async function loadDrafts() {
    const { data } = await supabase.from("vp_social_drafts").select("*").order("created_at", { ascending: false });
    setDrafts(data || []);
  }

  async function handleGenerate() {
    if (!topic.trim()) { setError("Enter a topic"); return; }
    setError(""); setGenerating(true);
    try {
      const res = await generateSocialPosts(topic, pillar, market);
      setResult(res); setEditResult(res); setView("result");
    } catch (e: any) { setError(e.message); }
    finally { setGenerating(false); }
  }

  async function handleSave(status: "draft" | "approved") {
    if (!result) return;
    setSaving(true);
    const { error: err } = await supabase.from("vp_social_drafts").insert({ topic, content_pillar: pillar, ...editResult, status, platform_targets: ["instagram", "facebook", "youtube", "linkedin"] });
    setSaving(false);
    if (!err) { setView("list"); setResult(null); setTopic(""); loadDrafts(); }
    else setError(err.message);
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from("vp_social_drafts").update({ status }).eq("id", id);
    loadDrafts();
  }

  return (
    <div>
      <p className="pf-eyebrow mb-2">Admin</p>
      <h1 className="font-heading text-[32px] font-light text-foreground mb-1">Social Post Drafter</h1>
      <p className="pf-body mb-6">One topic → Claude writes captions for all 6 platforms at once.</p>

      <div className="flex gap-2 mb-6">
        {(["list", "create"] as const).map((v) => (
          <button key={v} onClick={() => setView(v)} className={`rounded-full px-4 py-2 text-[13px] transition border ${view === v ? "bg-foreground text-background border-foreground" : "bg-background text-muted-foreground border-border hover:border-accent"}`}>
            {v === "list" ? `All Drafts (${drafts.length})` : "Create New Posts"}
          </button>
        ))}
      </div>

      {/* Create */}
      {view === "create" && (
        <div className="pf-card rounded-xl p-6">
          {!hasKey && (
            <div className="mb-4 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-[13px] text-amber-800">
              Add <code className="font-mono text-[12px]">VITE_ANTHROPIC_API_KEY</code> to your .env file to enable AI writing.
            </div>
          )}
          <div className="mb-4">
            <label className={labelClass}>Topic</label>
            <input value={topic} onChange={(e) => setTopic(e.target.value)} className={inputClass} placeholder="e.g. Why your bedroom should be in South-West direction" />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Target Market</label>
              <select value={market} onChange={(e) => setMarket(e.target.value)} className={inputClass}>
                {MARKETS.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Content Pillar</label>
              <select value={pillar} onChange={(e) => setPillar(e.target.value)} className={inputClass}>
                {PILLARS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>
          {error && <p className="mb-3 rounded-lg bg-red-50 px-4 py-3 text-[13px] text-red-600">{error}</p>}
          <div className="flex gap-3">
            <button onClick={handleGenerate} disabled={generating || !hasKey} className="rounded-full bg-primary px-5 py-2.5 text-[13px] font-medium text-primary-foreground hover:brightness-105 disabled:opacity-50">
              {generating ? "Generating (~10 sec)..." : "Generate All Captions"}
            </button>
            <button onClick={() => setView("list")} className="rounded-full border border-border px-5 py-2.5 text-[13px] text-muted-foreground hover:border-accent">Cancel</button>
          </div>
        </div>
      )}

      {/* Result */}
      {view === "result" && result && (
        <div className="space-y-4">
          <div className="pf-card rounded-xl p-6">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="text-[10px] font-medium tracking-[2px] text-accent uppercase mb-1">Generated by Claude</p>
                <p className="text-[16px] font-medium text-foreground">{topic}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setView("create"); setResult(null); }} className="rounded-full border border-border px-4 py-2 text-[12px] text-muted-foreground hover:border-accent">← Redo</button>
                <button onClick={() => handleSave("draft")} disabled={saving} className="rounded-full border border-border px-4 py-2 text-[12px] text-foreground hover:border-accent disabled:opacity-50">Save Draft</button>
                <button onClick={() => handleSave("approved")} disabled={saving} className="rounded-full bg-primary px-4 py-2 text-[12px] font-medium text-primary-foreground hover:brightness-105 disabled:opacity-50">Approve</button>
              </div>
            </div>

            {/* Platform tabs */}
            <div className="flex flex-wrap gap-2 mb-5">
              {PLATFORMS.map((p) => (
                <button key={p.key} onClick={() => setActiveTab(p.key)} className={`rounded-full px-3 py-1.5 text-[12px] transition border ${activeTab === p.key ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-accent"}`}>
                  {p.label}
                </button>
              ))}
            </div>

            {/* Active caption */}
            {PLATFORMS.map((p) => p.key === activeTab && (
              <div key={p.key}>
                <label className={labelClass}>{p.label} Caption</label>
                <textarea
                  value={(editResult as any)[p.key] || ""}
                  onChange={(e) => setEditResult({ ...editResult, [p.key]: e.target.value })}
                  rows={5}
                  className={inputClass + " resize-y"}
                />
              </div>
            ))}

            {/* Hashtags */}
            <div className="mt-4 rounded-lg border border-border bg-background p-3">
              <p className={labelClass}>Hashtags</p>
              <p className="text-[12px] text-foreground leading-relaxed">{editResult.hashtags_instagram}</p>
            </div>

            {/* Image prompt */}
            <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className={labelClass + " text-amber-700"}>AI Image Prompt (paste into GPT Image / Gemini Imagen)</p>
              <p className="text-[12px] text-amber-800 leading-relaxed">{editResult.image_prompt}</p>
              <button onClick={() => navigator.clipboard.writeText(editResult.image_prompt || "")} className="mt-2 rounded-full border border-amber-300 px-3 py-1 text-[11px] text-amber-700 hover:bg-amber-100">
                Copy prompt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      {view === "list" && (
        <div className="pf-card rounded-xl overflow-hidden p-0">
          {drafts.length === 0 ? (
            <div className="p-12 text-center">
              <p className="font-heading text-[32px] font-light text-accent mb-3">◈</p>
              <p className="text-[14px] font-medium text-foreground mb-1">No social posts yet</p>
              <p className="pf-body mb-5">Claude writes captions for all 6 platforms at once</p>
              <button onClick={() => setView("create")} className="rounded-full bg-primary px-5 py-2.5 text-[13px] font-medium text-primary-foreground hover:brightness-105">
                Create first posts
              </button>
            </div>
          ) : (
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-border bg-warm">
                  {["Topic", "Pillar", "Status", "Date", ""].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[10px] font-medium tracking-wide text-muted-foreground uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {drafts.map((d) => (
                  <tr key={d.id} className="border-b border-border last:border-0">
                    <td className="max-w-[260px] truncate px-4 py-3 font-medium text-foreground">{d.topic}</td>
                    <td className="px-4 py-3 text-muted-foreground">{d.content_pillar}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${d.status === "approved" ? "bg-green-50 text-green-700" : d.status === "posted" ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-500"}`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{new Date(d.created_at).toLocaleDateString("en-IN")}</td>
                    <td className="px-4 py-3">
                      {d.status === "draft" && (
                        <button onClick={() => updateStatus(d.id, "approved")} className="text-[11px] font-medium text-green-700 hover:underline">Approve</button>
                      )}
                      {d.status === "approved" && (
                        <button onClick={() => updateStatus(d.id, "posted")} className="text-[11px] font-medium text-blue-700 hover:underline">Mark Posted</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
