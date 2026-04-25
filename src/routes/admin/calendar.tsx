import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase, type VpCalendarItem } from "@/lib/supabase";

export const Route = createFileRoute("/admin/calendar")({
  component: AdminCalendar,
});

const PILLAR_COLOR: Record<string, string> = {
  Vastu: "bg-amber-50 text-amber-700",
  Palmistry: "bg-rose-50 text-rose-700",
  Astrology: "bg-blue-50 text-blue-700",
  Heer: "bg-green-50 text-green-700",
  General: "bg-gray-100 text-gray-600",
};

function AdminCalendar() {
  const [items, setItems] = useState<VpCalendarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => { load(); }, []);

  async function load() {
    const { data } = await supabase.from("vp_content_calendar").select("*").order("week_number").order("priority");
    setItems(data || []);
    setLoading(false);
  }

  async function toggle(id: string, field: "blog_done" | "social_done", current: boolean) {
    await supabase.from("vp_content_calendar").update({ [field]: !current }).eq("id", id);
    load();
  }

  const weeks = [...new Set(items.map((i) => i.week_number))].sort((a, b) => a - b);
  const done = items.filter((i) => i.blog_done && i.social_done).length;

  return (
    <div>
      <p className="pf-eyebrow mb-2">Admin</p>
      <h1 className="font-heading text-[32px] font-light text-foreground mb-1">Content Calendar</h1>
      <p className="pf-body mb-6">4-week plan. Click any topic to generate blog + social posts.</p>

      {/* Progress */}
      <div className="pf-card rounded-xl p-5 mb-8 flex items-center gap-6">
        <div>
          <p className="text-[10px] font-medium tracking-[1.5px] text-muted-foreground uppercase mb-1">Progress</p>
          <p className="font-heading text-[40px] font-light text-accent leading-none">{done}/{items.length}</p>
          <p className="text-[11px] text-muted-foreground mt-1">topics complete</p>
        </div>
        <div className="flex-1">
          <div className="h-2 rounded-full bg-border overflow-hidden">
            <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${items.length ? (done / items.length) * 100 : 0}%` }} />
          </div>
          <div className="mt-3 flex gap-5 text-[11px]">
            <span className="text-amber-600">{items.filter((i) => i.blog_done).length} blogs written</span>
            <span className="text-rose-600">{items.filter((i) => i.social_done).length} social done</span>
            <span className="text-muted-foreground">{items.filter((i) => !i.blog_done || !i.social_done).length} remaining</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-border" />)}</div>
      ) : weeks.map((week) => (
        <div key={week} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <p className="text-[10px] font-medium tracking-[3px] text-accent uppercase">Week {week}</p>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="space-y-2">
            {items.filter((i) => i.week_number === week).map((item) => {
              const allDone = item.blog_done && item.social_done;
              return (
                <div key={item.id} className={`pf-card rounded-xl p-4 ${allDone ? "opacity-60" : ""}`}>
                  <div className="flex items-start gap-3">
                    {/* Priority dot */}
                    <div className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${item.priority === "high" ? "bg-red-400" : item.priority === "medium" ? "bg-amber-400" : "bg-gray-300"}`} />

                    {/* Topic */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-foreground leading-snug mb-2">{item.topic}</p>
                      <div className="flex gap-2 flex-wrap">
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${PILLAR_COLOR[item.content_pillar] || PILLAR_COLOR.General}`}>
                          {item.content_pillar}
                        </span>
                        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] text-gray-600">{item.target_market}</span>
                      </div>
                    </div>

                    {/* Checkboxes */}
                    <div className="flex gap-4 flex-shrink-0 items-center">
                      <label className={`flex items-center gap-1.5 cursor-pointer text-[12px] ${item.blog_done ? "text-green-700" : "text-muted-foreground"}`}>
                        <input type="checkbox" checked={item.blog_done} onChange={() => toggle(item.id, "blog_done", item.blog_done)} className="accent-amber-500" />
                        Blog
                      </label>
                      <label className={`flex items-center gap-1.5 cursor-pointer text-[12px] ${item.social_done ? "text-green-700" : "text-muted-foreground"}`}>
                        <input type="checkbox" checked={item.social_done} onChange={() => toggle(item.id, "social_done", item.social_done)} className="accent-rose-500" />
                        Social
                      </label>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => navigate({ to: "/admin/blog" })}
                        className={`rounded-full border px-3 py-1.5 text-[11px] font-medium transition ${item.blog_done ? "border-border text-muted-foreground" : "border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100"}`}
                      >
                        {item.blog_done ? "✓ Blog" : "✍ Write"}
                      </button>
                      <button
                        onClick={() => navigate({ to: "/admin/social" })}
                        className={`rounded-full border px-3 py-1.5 text-[11px] font-medium transition ${item.social_done ? "border-border text-muted-foreground" : "border-green-300 bg-green-50 text-green-700 hover:bg-green-100"}`}
                      >
                        {item.social_done ? "✓ Social" : "◈ Draft"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
