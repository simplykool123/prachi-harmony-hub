import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase, type VpBlogPost } from "@/lib/supabase";
import { generateBlogPost, type GeneratedBlog } from "@/lib/claude";

export const Route = createFileRoute("/admin/blog")({
  component: AdminBlog,
});

const MARKETS = ["India", "UAE", "UK", "USA", "Singapore", "Australia", "Global"];
const PILLARS = ["Vastu", "Palmistry", "Astrology", "Heer", "General"];

const inputClass = "w-full rounded-lg border border-border bg-background px-4 py-3 text-[13px] text-foreground outline-none transition focus:border-accent focus:shadow-[0_0_0_3px_rgb(232_160_32_/_0.1)]";
const labelClass = "mb-1.5 block text-[10px] font-medium tracking-[0.5px] text-muted-foreground uppercase";

function AdminBlog() {
  const [view, setView] = useState<"list" | "write" | "preview">("list");
  const [posts, setPosts] = useState<VpBlogPost[]>([]);
  const [topic, setTopic] = useState("");
  const [market, setMarket] = useState("India");
  const [pillar, setPillar] = useState("Vastu");
  const [gen, setGen] = useState<GeneratedBlog | null>(null);
  const [editBody, setEditBody] = useState("");
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const hasKey = !!import.meta.env.VITE_ANTHROPIC_API_KEY;

  useEffect(() => { loadPosts(); }, []);

  async function loadPosts() {
    const { data } = await supabase.from("vp_blog_posts").select("*").order("created_at", { ascending: false });
    setPosts(data || []);
  }

  async function handleGenerate() {
    if (!topic.trim()) { setError("Enter a topic first"); return; }
    setError(""); setGenerating(true);
    try {
      const result = await generateBlogPost(topic, market, pillar);
      setGen(result); setEditBody(result.body); setView("preview");
    } catch (e: any) { setError(e.message); }
    finally { setGenerating(false); }
  }

  async function handleSave(publish: boolean) {
    if (!gen) return;
    setSaving(true);
    const { error: err } = await supabase.from("vp_blog_posts").insert({
      ...gen, body: editBody, target_market: market, content_pillar: pillar,
      published: publish, published_at: publish ? new Date().toISOString() : null,
    });
    setSaving(false);
    if (!err) { setView("list"); setGen(null); setTopic(""); loadPosts(); }
    else setError(err.message);
  }

  async function togglePublish(post: VpBlogPost) {
    await supabase.from("vp_blog_posts").update({ published: !post.published, published_at: !post.published ? new Date().toISOString() : null }).eq("id", post.id);
    loadPosts();
  }

  async function deletePost(id: string) {
    if (!confirm("Delete this post?")) return;
    await supabase.from("vp_blog_posts").delete().eq("id", id);
    loadPosts();
  }

  return (
    <div>
      <p className="pf-eyebrow mb-2">Admin</p>
      <h1 className="font-heading text-[32px] font-light text-foreground mb-1">Blog Writer</h1>
      <p className="pf-body mb-6">Claude writes full SEO + LLM-optimised posts. You review and publish.</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["list", "write"] as const).map((v) => (
          <button key={v} onClick={() => setView(v)} className={`rounded-full px-4 py-2 text-[13px] transition border ${view === v ? "bg-foreground text-background border-foreground" : "bg-background text-muted-foreground border-border hover:border-accent"}`}>
            {v === "list" ? `All Posts (${posts.length})` : "Write New Post"}
          </button>
        ))}
      </div>

      {/* Write view */}
      {view === "write" && (
        <div className="pf-card rounded-xl p-6">
          <p className="mb-5 text-[13px] font-medium text-foreground">Tell Claude what to write</p>

          {!hasKey && (
            <div className="mb-4 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-[13px] text-amber-800">
              Add <code className="font-mono text-[12px]">VITE_ANTHROPIC_API_KEY</code> to your .env file to enable AI writing.
              Until then, you can write manually below.
            </div>
          )}

          <div className="mb-4">
            <label className={labelClass}>Topic</label>
            <input value={topic} onChange={(e) => setTopic(e.target.value)} className={inputClass} placeholder="e.g. Vastu tips for home office — for remote workers in UK" />
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
            <button onClick={handleGenerate} disabled={generating || !hasKey} className="rounded-full bg-primary px-5 py-2.5 text-[13px] font-medium text-primary-foreground transition hover:brightness-105 disabled:opacity-50">
              {generating ? "Writing (~15 sec)..." : "Generate with Claude"}
            </button>
            <button onClick={() => setView("list")} className="rounded-full border border-border px-5 py-2.5 text-[13px] text-muted-foreground hover:border-accent">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Preview / edit view */}
      {view === "preview" && gen && (
        <div className="space-y-4">
          <div className="pf-card rounded-xl p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-[10px] font-medium tracking-[2px] text-accent uppercase mb-1">Generated by Claude</p>
                <h2 className="font-heading text-[22px] font-light text-foreground">{gen.title}</h2>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => { setView("write"); setGen(null); }} className="rounded-full border border-border px-4 py-2 text-[12px] text-muted-foreground hover:border-accent">← Redo</button>
                <button onClick={() => handleSave(false)} disabled={saving} className="rounded-full border border-border px-4 py-2 text-[12px] text-foreground hover:border-accent disabled:opacity-50">Save Draft</button>
                <button onClick={() => handleSave(true)} disabled={saving} className="rounded-full bg-primary px-4 py-2 text-[12px] font-medium text-primary-foreground hover:brightness-105 disabled:opacity-50">Publish</button>
              </div>
            </div>

            {/* Meta preview */}
            <div className="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3">
              <p className="text-[10px] font-medium text-green-800 uppercase tracking-wide mb-1">Meta Description</p>
              <p className="text-[13px] text-green-700">{gen.meta_description}</p>
            </div>
            <div className="mb-4 grid grid-cols-3 gap-3">
              {[{ l: "Slug", v: `/${gen.slug}` }, { l: "Reading time", v: `${gen.reading_time_mins} min` }, { l: "Keywords", v: gen.keywords?.slice(0, 3).join(", ") }].map((f) => (
                <div key={f.l} className="rounded-lg border border-border bg-background p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">{f.l}</p>
                  <p className="text-[12px] font-medium text-foreground">{f.v}</p>
                </div>
              ))}
            </div>

            {/* Editable body */}
            <label className={labelClass}>Blog Body (editable)</label>
            <textarea value={editBody} onChange={(e) => setEditBody(e.target.value)} rows={18} className={inputClass + " resize-y"} />
          </div>

          {/* FAQ */}
          {gen.faq_json?.length > 0 && (
            <div className="pf-card rounded-xl p-6">
              <p className="text-[12px] font-medium text-foreground mb-3">FAQ — auto-included (LLM-friendly)</p>
              {gen.faq_json.map((f, i) => (
                <div key={i} className="mb-3 rounded-lg border border-border bg-background p-3">
                  <p className="text-[13px] font-medium text-foreground mb-1">Q: {f.q}</p>
                  <p className="text-[12px] text-muted-foreground">A: {f.a}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* List view */}
      {view === "list" && (
        <div className="pf-card rounded-xl overflow-hidden p-0">
          {posts.length === 0 ? (
            <div className="p-12 text-center">
              <p className="font-heading text-[32px] font-light text-accent mb-3">✍</p>
              <p className="text-[14px] font-medium text-foreground mb-1">No posts yet</p>
              <p className="pf-body mb-5">Click "Write New Post" and Claude will draft your first SEO blog</p>
              <button onClick={() => setView("write")} className="rounded-full bg-primary px-5 py-2.5 text-[13px] font-medium text-primary-foreground hover:brightness-105">
                Write first post
              </button>
            </div>
          ) : (
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-border bg-warm">
                  {["Title", "Market", "Pillar", "Status", "Date", ""].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[10px] font-medium tracking-wide text-muted-foreground uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0">
                    <td className="max-w-[220px] truncate px-4 py-3 font-medium text-foreground">{p.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.target_market}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.content_pillar}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${p.published ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {p.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{new Date(p.created_at).toLocaleDateString("en-IN")}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <button onClick={() => togglePublish(p)} className={`text-[11px] font-medium ${p.published ? "text-muted-foreground" : "text-green-700"} hover:underline`}>
                          {p.published ? "Unpublish" : "Publish"}
                        </button>
                        <button onClick={() => deletePost(p.id)} className="text-[11px] text-red-500 hover:underline">Delete</button>
                      </div>
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
