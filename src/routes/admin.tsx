import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

// ── Password gate ────────────────────────────────────────────
const PASS = import.meta.env.VITE_ADMIN_PASSWORD || "Prachi@Admin2025";
const SESSION_KEY = "vp_admin_ok";

function isAuthed(): boolean {
  try {
    const v = localStorage.getItem(SESSION_KEY);
    if (!v) return false;
    return Date.now() < JSON.parse(v).expiry;
  } catch { return false; }
}

function saveAuth() {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ expiry: Date.now() + 24 * 60 * 60 * 1000 }));
}

function LoginGate({ onLogin }: { onLogin: () => void }) {
  const [val, setVal] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");

  function attempt() {
    if (val === PASS) { saveAuth(); onLogin(); }
    else { setErr("Incorrect password"); setVal(""); }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FAFAF8" }}>
      <div className="pf-card w-full max-w-sm rounded-2xl p-10 text-center">
        <p className="font-heading text-[22px] font-light text-foreground">
          Prachi <span className="text-accent">·</span> Fulfagar
        </p>
        <p className="pf-eyebrow pf-eyebrow-center mt-1 mb-8">Admin Access</p>
        <div className="mb-4 text-left">
          <label className="mb-1.5 block text-[11px] font-medium tracking-[0.5px] text-muted-foreground">PASSWORD</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={val}
              onChange={(e) => setVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && attempt()}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-10 text-[13px] text-foreground outline-none focus:border-accent"
              placeholder="Enter admin password"
            />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-[12px]">
              {show ? "hide" : "show"}
            </button>
          </div>
          {err && <p className="mt-1 text-[12px] text-red-500">{err}</p>}
        </div>
        <button onClick={attempt} className="w-full rounded-full bg-primary py-3 text-[13px] font-medium text-primary-foreground transition hover:brightness-105">
          Enter Dashboard
        </button>
        <p className="mt-4 text-[11px] text-muted-foreground">Session lasts 24 hours</p>
      </div>
    </div>
  );
}

// ── Sidebar nav ───────────────────────────────────────────────
const NAV = [
  { to: "/admin/", label: "Dashboard", icon: "▦" },
  { to: "/admin/blog", label: "Blog Writer", icon: "✍" },
  { to: "/admin/social", label: "Social Posts", icon: "◈" },
  { to: "/admin/calendar", label: "Content Calendar", icon: "◷" },
  { to: "/admin/leads", label: "Contact Leads", icon: "◎" },
];

function AdminLayout() {
  const [authed, setAuthed] = useState(isAuthed());
  const location = useLocation();

  useEffect(() => { if (isAuthed()) setAuthed(true); }, []);
  if (!authed) return <LoginGate onLogin={() => setAuthed(true)} />;

  return (
    <div className="flex min-h-screen bg-background" style={{ fontFamily: "var(--font-body)" }}>
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-52 flex-shrink-0 flex-col border-r border-border bg-white">
        <div className="border-b border-border px-5 py-6">
          <p className="font-heading text-[16px] font-light text-foreground">
            Prachi <span className="text-accent">·</span> Fulfagar
          </p>
          <p className="mt-0.5 text-[9px] font-medium tracking-[2px] text-accent">ADMIN</p>
        </div>
        <nav className="flex-1 p-3">
          {NAV.map((n) => {
            const active = n.to === "/admin/" ? location.pathname === "/admin" || location.pathname === "/admin/" : location.pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] transition mb-0.5 border-l-2 ${
                  active
                    ? "border-accent bg-warm font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:bg-warm hover:text-foreground"
                }`}
              >
                <span className="text-[13px]">{n.icon}</span>
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border px-5 py-4 text-[10px] text-muted-foreground">
          <Link to="/" className="hover:text-accent">← View website</Link>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-8 max-w-4xl">
        <Outlet />
      </main>
    </div>
  );
}
