import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase, type VpSetting, type VpSocialAccount } from "@/lib/supabase";
import { Instagram, Facebook, Youtube, Linkedin, Pin, AtSign } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

// ── Constants ────────────────────────────────────────────────

const KEY_CONFIG = [
  { key: "anthropic_api_key", label: "Claude API Key (blog + social writing)", defaultSecret: true },
  { key: "openai_api_key", label: "OpenAI API Key (image generation)", defaultSecret: true },
  { key: "gemini_api_key", label: "Gemini API Key (Hindi posts)", defaultSecret: true },
  { key: "postiz_api_key", label: "Postiz API Key", defaultSecret: true },
  { key: "postiz_base_url", label: "Postiz Instance URL", defaultSecret: false },
  { key: "whatsapp_number", label: "WhatsApp Number", defaultSecret: false },
  { key: "admin_email", label: "Admin Notification Email", defaultSecret: false },
  { key: "site_url", label: "Live Site URL", defaultSecret: false },
] as const;

const PLATFORMS = [
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "youtube", label: "YouTube", Icon: Youtube },
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { key: "pinterest", label: "Pinterest", Icon: Pin },
  { key: "threads", label: "Threads", Icon: AtSign },
] as const;

type TabId = "apiKeys" | "socialAccounts" | "postiz" | "imageGen";

const TABS: { id: TabId; label: string }[] = [
  { id: "apiKeys", label: "API Keys" },
  { id: "socialAccounts", label: "Social Accounts" },
  { id: "postiz", label: "Postiz Integration" },
  { id: "imageGen", label: "Image Generation" },
];

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-[13px] text-foreground outline-none transition focus:border-accent";
const labelClass =
  "mb-1.5 block text-[10px] font-medium tracking-[0.5px] text-muted-foreground uppercase";

// ── Main component ───────────────────────────────────────────

function AdminSettings() {
  const [tab, setTab] = useState<TabId>("apiKeys");
  const [settings, setSettings] = useState<Record<string, VpSetting>>({});
  const [socialAccounts, setSocialAccounts] = useState<Record<string, VpSocialAccount>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    const [sRes, aRes] = await Promise.all([
      supabase.from("vp_settings").select("*"),
      supabase
        .from("vp_social_accounts")
        .select("platform, account_name, account_id, is_connected, postiz_channel_id, connected_at, updated_at"),
    ]);

    const settingsMap: Record<string, VpSetting> = {};
    (sRes.data || []).forEach((s: VpSetting) => {
      settingsMap[s.key] = s;
    });
    setSettings(settingsMap);

    const accountsMap: Record<string, VpSocialAccount> = {};
    (aRes.data || []).forEach((a: VpSocialAccount) => {
      accountsMap[a.platform] = a;
    });
    setSocialAccounts(accountsMap);

    setLoading(false);
  }

  async function saveSetting(key: string, value: string) {
    const { error } = await supabase
      .from("vp_settings")
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
    if (error) throw error;
    await loadAll();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-[13px] text-muted-foreground">Loading settings…</p>
      </div>
    );
  }

  return (
    <div>
      <p className="pf-eyebrow mb-2">Admin</p>
      <h1 className="font-heading text-[32px] font-light text-foreground mb-1">Settings</h1>
      <p className="pf-body mb-6">Configure API keys, social accounts, and integrations.</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-[13px] transition border ${
              tab === t.id
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-muted-foreground border-border hover:border-accent"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "apiKeys" && (
        <ApiKeysTab settings={settings} onSave={saveSetting} />
      )}
      {tab === "socialAccounts" && (
        <SocialAccountsTab accounts={socialAccounts} settings={settings} onRefresh={loadAll} />
      )}
      {tab === "postiz" && (
        <PostizTab
          settings={settings}
          accounts={socialAccounts}
          onSave={saveSetting}
          onRefresh={loadAll}
          onSwitchTab={setTab}
        />
      )}
      {tab === "imageGen" && (
        <ImageGenTab settings={settings} onSave={saveSetting} />
      )}
    </div>
  );
}

// ── Tab 1: API Keys ───────────────────────────────────────────

function ApiKeysTab({
  settings,
  onSave,
}: {
  settings: Record<string, VpSetting>;
  onSave: (key: string, value: string) => Promise<void>;
}) {
  return (
    <div className="pf-card rounded-xl p-6">
      <p className="mb-1 text-[14px] font-medium text-foreground">API Keys &amp; Configuration</p>
      <p className="pf-body mb-5 text-[12px]">
        Keys are stored securely in Supabase. Secret keys are masked by default.
      </p>
      <div>
        {KEY_CONFIG.map((cfg) => (
          <ApiKeyRow
            key={cfg.key}
            keyConfig={cfg}
            setting={settings[cfg.key]}
            onSave={onSave}
          />
        ))}
      </div>
    </div>
  );
}

function ApiKeyRow({
  keyConfig,
  setting,
  onSave,
}: {
  keyConfig: (typeof KEY_CONFIG)[number];
  setting: VpSetting | undefined;
  onSave: (key: string, value: string) => Promise<void>;
}) {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showValue, setShowValue] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [rowError, setRowError] = useState("");

  const hasValue = !!setting?.value;
  const isSecret = setting?.is_secret ?? keyConfig.defaultSecret;
  const maskedDisplay =
    hasValue && isSecret
      ? "••••••••••••" + (setting?.value?.slice(-4) ?? "")
      : setting?.value ?? "";

  function startEdit() {
    setInputValue(setting?.value ?? "");
    setEditMode(true);
    setShowValue(false);
    setRowError("");
  }

  function cancelEdit() {
    setEditMode(false);
    setShowValue(false);
    setRowError("");
  }

  async function handleSave() {
    setSaving(true);
    setRowError("");
    try {
      await onSave(keyConfig.key, inputValue);
      setSaved(true);
      setEditMode(false);
      setShowValue(false);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setRowError("Save failed. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex items-start gap-4 border-b border-border py-4 last:border-0">
      {/* Status dot */}
      <div
        className={`mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full ${
          hasValue ? "bg-green-500" : "bg-gray-300"
        }`}
      />

      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium text-foreground">{keyConfig.label}</p>
        <p className="mb-2 font-mono text-[10px] text-muted-foreground">{keyConfig.key}</p>

        {!editMode ? (
          <div className="flex items-center gap-2">
            <span className="font-mono text-[12px] text-muted-foreground">
              {hasValue ? (
                showValue ? setting?.value : maskedDisplay
              ) : (
                <em>Not set</em>
              )}
            </span>
            {isSecret && hasValue && (
              <button
                type="button"
                onClick={() => setShowValue(!showValue)}
                className="text-[10px] text-muted-foreground hover:text-foreground"
              >
                {showValue ? "hide" : "show"}
              </button>
            )}
          </div>
        ) : (
          <div className="relative">
            <input
              type={isSecret && !showValue ? "password" : "text"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              className={inputClass + " pr-14"}
              placeholder={`Enter ${keyConfig.label}`}
              autoFocus
            />
            {isSecret && (
              <button
                type="button"
                onClick={() => setShowValue(!showValue)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground hover:text-foreground"
              >
                {showValue ? "hide" : "show"}
              </button>
            )}
          </div>
        )}

        {rowError && <p className="mt-1 text-[12px] text-red-500">{rowError}</p>}
      </div>

      {/* Action buttons */}
      <div className="mt-0.5 flex flex-shrink-0 items-center gap-2">
        {saved && (
          <span className="text-[11px] font-medium text-green-600">Saved ✓</span>
        )}
        {!editMode ? (
          <button
            onClick={startEdit}
            className="rounded-full border border-border px-3 py-1.5 text-[11px] text-muted-foreground transition hover:border-accent hover:text-foreground"
          >
            {hasValue ? "Edit" : "Set"}
          </button>
        ) : (
          <>
            <button
              onClick={cancelEdit}
              className="rounded-full border border-border px-3 py-1.5 text-[11px] text-muted-foreground hover:border-accent"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-full bg-primary px-3 py-1.5 text-[11px] font-medium text-primary-foreground hover:brightness-105 disabled:opacity-50"
            >
              {saving ? "…" : "Save"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Tab 2: Social Accounts ────────────────────────────────────

function SocialAccountsTab({
  accounts,
  settings,
  onRefresh,
}: {
  accounts: Record<string, VpSocialAccount>;
  settings: Record<string, VpSetting>;
  onRefresh: () => Promise<void>;
}) {
  return (
    <div>
      <p className="pf-body mb-4 text-[12px]">
        Connect your social accounts via Postiz. Enter the Postiz Channel ID for each platform after connecting.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PLATFORMS.map((platform) => (
          <SocialPlatformCard
            key={platform.key}
            platform={platform}
            account={accounts[platform.key]}
            settings={settings}
            onRefresh={onRefresh}
          />
        ))}
      </div>
    </div>
  );
}

function SocialPlatformCard({
  platform,
  account,
  settings,
  onRefresh,
}: {
  platform: (typeof PLATFORMS)[number];
  account: VpSocialAccount | undefined;
  settings: Record<string, VpSetting>;
  onRefresh: () => Promise<void>;
}) {
  const [channelId, setChannelId] = useState(account?.postiz_channel_id ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [cardError, setCardError] = useState("");

  const postizBaseUrl = settings["postiz_base_url"]?.value ?? "";
  const isConnected = !!(account?.is_connected && account?.postiz_channel_id);
  const { Icon } = platform;

  function handleConnectViaPostiz() {
    if (postizBaseUrl) {
      window.open(postizBaseUrl, "_blank", "noopener,noreferrer");
    }
  }

  async function handleSaveChannelId() {
    setSaving(true);
    setCardError("");
    const { error } = await supabase.from("vp_social_accounts").upsert(
      {
        platform: platform.key,
        postiz_channel_id: channelId || null,
        is_connected: !!channelId,
        connected_at: channelId ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "platform" }
    );
    setSaving(false);
    if (error) {
      setCardError("Save failed. Try again.");
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      await onRefresh();
    }
  }

  async function handleDisconnect() {
    const { error } = await supabase
      .from("vp_social_accounts")
      .update({
        is_connected: false,
        postiz_channel_id: null,
        connected_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq("platform", platform.key);
    if (!error) {
      setChannelId("");
      await onRefresh();
    }
  }

  return (
    <div className="pf-card rounded-xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-foreground" />
          <span className="text-[14px] font-medium text-foreground">{platform.label}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`h-2 w-2 rounded-full ${isConnected ? "bg-green-500" : "bg-gray-300"}`} />
          <span className="text-[11px] text-muted-foreground">
            {isConnected ? "Connected" : "Not connected"}
          </span>
        </div>
      </div>

      {isConnected && account?.account_name && (
        <p className="mb-3 text-[12px] text-muted-foreground">
          <span className="font-medium text-foreground">{account.account_name}</span>
        </p>
      )}

      {!isConnected && (
        <button
          onClick={handleConnectViaPostiz}
          disabled={!postizBaseUrl}
          title={!postizBaseUrl ? "Set Postiz Instance URL in API Keys tab first" : ""}
          className="mb-3 w-full rounded-lg border border-border px-3 py-2 text-[12px] text-foreground transition hover:border-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          Connect via Postiz
        </button>
      )}

      <div>
        <label className={labelClass}>Postiz Channel ID</label>
        <div className="flex gap-2">
          <input
            value={channelId}
            onChange={(e) => setChannelId(e.target.value)}
            className={inputClass + " py-2 text-[12px]"}
            placeholder="e.g. abc123"
          />
          <button
            onClick={handleSaveChannelId}
            disabled={saving}
            className="whitespace-nowrap rounded-lg bg-primary px-3 py-2 text-[11px] font-medium text-primary-foreground hover:brightness-105 disabled:opacity-50"
          >
            {saved ? "Saved ✓" : saving ? "…" : "Save"}
          </button>
        </div>
        {cardError && <p className="mt-1 text-[12px] text-red-500">{cardError}</p>}
      </div>

      {isConnected && (
        <button
          onClick={handleDisconnect}
          className="mt-3 text-[11px] text-red-500 hover:underline"
        >
          Disconnect
        </button>
      )}
    </div>
  );
}

// ── Tab 3: Postiz Integration ─────────────────────────────────

function PostizTab({
  settings,
  accounts,
  onSave,
  onRefresh,
  onSwitchTab,
}: {
  settings: Record<string, VpSetting>;
  accounts: Record<string, VpSocialAccount>;
  onSave: (key: string, value: string) => Promise<void>;
  onRefresh: () => Promise<void>;
  onSwitchTab: (tab: TabId) => void;
}) {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [savingToggle, setSavingToggle] = useState(false);

  const postizUrl = settings["postiz_base_url"]?.value ?? "";
  const postizKey = settings["postiz_api_key"]?.value ?? "";
  const connectedAccounts = PLATFORMS.map((p) => accounts[p.key]).filter(
    (a): a is VpSocialAccount => !!(a?.is_connected && a?.postiz_channel_id)
  );
  const autoPush = settings["auto_push_to_postiz"]?.value === "true";

  async function handleTestPost() {
    if (!postizUrl || !postizKey) return;
    setTesting(true);
    setTestResult(null);
    try {
      const channels = connectedAccounts.map((a) => a.postiz_channel_id).filter(Boolean);
      const res = await fetch(`${postizUrl}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${postizKey}`,
        },
        body: JSON.stringify({
          content: "Test post from Prachi Fulfagar admin dashboard",
          channels,
        }),
      });
      if (res.ok) {
        setTestResult({ ok: true, msg: "Test post sent to Postiz successfully!" });
      } else {
        setTestResult({ ok: false, msg: `Postiz returned status ${res.status}` });
      }
    } catch {
      setTestResult({ ok: false, msg: "Could not reach Postiz instance. Check the URL." });
    } finally {
      setTesting(false);
    }
  }

  async function handleToggleAutoPush() {
    setSavingToggle(true);
    try {
      await onSave("auto_push_to_postiz", String(!autoPush));
      await onRefresh();
    } finally {
      setSavingToggle(false);
    }
  }

  return (
    <div className="pf-card rounded-xl p-6 space-y-4">
      <div>
        <p className="text-[14px] font-medium text-foreground mb-1">Integration Status</p>
        <p className="pf-body text-[12px]">Check each step to ensure Postiz is fully configured.</p>
      </div>

      {/* Step 1 */}
      <StepItem
        num={1}
        label="Postiz URL configured?"
        ok={!!postizUrl}
        detail={
          postizUrl ? (
            <span className="font-mono text-[12px] text-muted-foreground">{postizUrl}</span>
          ) : (
            <button
              onClick={() => onSwitchTab("apiKeys")}
              className="text-[12px] text-accent hover:underline"
            >
              Set in API Keys tab →
            </button>
          )
        }
      />

      {/* Step 2 */}
      <StepItem
        num={2}
        label="Postiz API Key configured?"
        ok={!!postizKey}
        detail={
          postizKey ? (
            <span className="text-[12px] text-green-600">API key is set</span>
          ) : (
            <button
              onClick={() => onSwitchTab("apiKeys")}
              className="text-[12px] text-accent hover:underline"
            >
              Set in API Keys tab →
            </button>
          )
        }
      />

      {/* Step 3 */}
      <StepItem
        num={3}
        label="Social accounts connected?"
        ok={connectedAccounts.length > 0}
        detail={
          <p className="text-[12px] text-muted-foreground">
            {connectedAccounts.length > 0 ? (
              <>
                {connectedAccounts.length} connected:{" "}
                {connectedAccounts.map((a) => a.platform).join(", ")}
              </>
            ) : (
              <>No accounts connected — set Channel IDs in Social Accounts tab</>
            )}
          </p>
        }
      />

      {/* Step 4: Test push */}
      <div className="flex items-start gap-4 rounded-xl border border-border bg-background p-4">
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-foreground text-[11px] font-medium text-background">
          4
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-medium text-foreground mb-1">Push a test draft</p>
          <p className="text-[12px] text-muted-foreground mb-3">
            Sends a test post to Postiz using your configured channels.
          </p>
          <button
            onClick={handleTestPost}
            disabled={testing || !postizUrl || !postizKey || connectedAccounts.length === 0}
            className="rounded-full bg-primary px-4 py-2 text-[12px] font-medium text-primary-foreground hover:brightness-105 disabled:opacity-40"
          >
            {testing ? "Sending…" : "Send test post to Postiz"}
          </button>
          {testResult && (
            <p className={`mt-2 text-[12px] ${testResult.ok ? "text-green-600" : "text-red-500"}`}>
              {testResult.msg}
            </p>
          )}
        </div>
      </div>

      {/* Step 5: Auto-push toggle */}
      <div className="flex items-start gap-4 rounded-xl border border-border bg-background p-4">
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-foreground text-[11px] font-medium text-background">
          5
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-medium text-foreground mb-0.5">Auto-push toggle</p>
              <p className="text-[12px] text-muted-foreground">
                Automatically push approved social drafts to Postiz
              </p>
            </div>
            <button
              onClick={handleToggleAutoPush}
              disabled={savingToggle}
              aria-label="Toggle auto push"
              className={`relative flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-colors disabled:opacity-50 ${
                autoPush ? "bg-primary" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  autoPush ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            {autoPush
              ? "ON — approved drafts will auto-push to Postiz"
              : "OFF — approve saves locally only"}
          </p>
        </div>
      </div>
    </div>
  );
}

function StepItem({
  num,
  label,
  ok,
  detail,
}: {
  num: number;
  label: string;
  ok: boolean;
  detail?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-border bg-background p-4">
      <div
        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-medium ${
          ok ? "bg-green-500 text-white" : "bg-amber-100 text-amber-800"
        }`}
      >
        {ok ? "✓" : num}
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-0.5">
          <p className="text-[13px] font-medium text-foreground">{label}</p>
          {ok ? (
            <span className="text-[10px] font-medium text-green-600">Configured</span>
          ) : (
            <span className="text-[10px] font-medium text-amber-600">Not set</span>
          )}
        </div>
        {detail}
      </div>
    </div>
  );
}

// ── Tab 4: Image Generation ───────────────────────────────────

function ImageGenTab({
  settings,
  onSave,
}: {
  settings: Record<string, VpSetting>;
  onSave: (key: string, value: string) => Promise<void>;
}) {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [genError, setGenError] = useState("");
  const [savingProvider, setSavingProvider] = useState(false);

  const provider =
    (settings["image_provider"]?.value as "openai" | "gemini" | "manual") ?? "manual";
  const openaiKey = settings["openai_api_key"]?.value ?? "";
  const geminiKey = settings["gemini_api_key"]?.value ?? "";

  async function handleProviderChange(val: "openai" | "gemini" | "manual") {
    setSavingProvider(true);
    try {
      await onSave("image_provider", val);
    } finally {
      setSavingProvider(false);
    }
  }

  async function handleGenerate() {
    if (!prompt.trim()) { setGenError("Enter a prompt"); return; }
    setGenError("");
    setGeneratedImage(null);
    setGenerating(true);

    try {
      if (provider === "openai") {
        if (!openaiKey) { setGenError("OpenAI API key not configured in API Keys tab"); return; }
        const res = await fetch("https://api.openai.com/v1/images/generations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({ model: "gpt-image-1", prompt, n: 1, size: "1024x1024" }),
        });
        const data = await res.json();
        if (!res.ok) { setGenError(`OpenAI error: ${res.status}`); return; }
        const imgData = data.data?.[0];
        if (imgData?.b64_json) {
          setGeneratedImage(`data:image/png;base64,${imgData.b64_json}`);
        } else if (imgData?.url) {
          setGeneratedImage(imgData.url);
        } else {
          setGenError("No image returned from OpenAI");
        }
      } else if (provider === "gemini") {
        if (!geminiKey) { setGenError("Gemini API key not configured in API Keys tab"); return; }
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              instances: [{ prompt }],
              parameters: { sampleCount: 1 },
            }),
          }
        );
        const data = await res.json();
        if (!res.ok) { setGenError(`Gemini error: ${res.status}`); return; }
        const b64 = data.predictions?.[0]?.bytesBase64Encoded;
        if (b64) {
          setGeneratedImage(`data:image/png;base64,${b64}`);
        } else {
          setGenError("No image returned from Gemini");
        }
      }
    } catch {
      setGenError("Failed to generate image. Check your API key and connection.");
    } finally {
      setGenerating(false);
    }
  }

  const providerLabels = {
    openai: "OpenAI GPT Image",
    gemini: "Gemini Imagen",
    manual: "Manual",
  };

  const providerStatus = {
    openai: openaiKey ? "configured" : "not configured",
    gemini: geminiKey ? "configured" : "not configured",
    manual: "copy prompt, use externally",
  };

  return (
    <div className="space-y-4">
      <div className="pf-card rounded-xl p-6">
        <p className="mb-1 text-[14px] font-medium text-foreground">Image Provider</p>
        <p className="pf-body mb-4 text-[12px]">
          Select which AI model to use for image generation.
        </p>

        <div className="mb-4 flex flex-wrap gap-3">
          {(["openai", "gemini", "manual"] as const).map((p) => (
            <button
              key={p}
              onClick={() => handleProviderChange(p)}
              disabled={savingProvider}
              className={`rounded-full border px-4 py-2 text-[12px] transition ${
                provider === p
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-muted-foreground hover:border-accent"
              }`}
            >
              {providerLabels[p]}
            </button>
          ))}
        </div>

        <div className="space-y-2 rounded-lg border border-border bg-background p-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Provider Status
          </p>
          {(["openai", "gemini", "manual"] as const).map((p) => (
            <div key={p} className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  p === "manual"
                    ? "bg-gray-400"
                    : (p === "openai" ? openaiKey : geminiKey)
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              />
              <span
                className={`text-[12px] ${
                  provider === p ? "font-medium text-foreground" : "text-muted-foreground"
                }`}
              >
                {providerLabels[p]} — {providerStatus[p]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pf-card rounded-xl p-6">
        <p className="mb-1 text-[14px] font-medium text-foreground">Test Image Generation</p>
        <p className="pf-body mb-4 text-[12px]">
          {provider === "manual"
            ? "Manual mode — copy the prompt and paste it into your preferred image tool."
            : `Generate a test image using ${providerLabels[provider]}.`}
        </p>

        <div className="mb-4">
          <label className={labelClass}>Image Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className={inputClass + " resize-none"}
            placeholder="Describe the image you want to generate…"
          />
        </div>

        {genError && (
          <p className="mb-3 rounded-lg bg-red-50 px-4 py-3 text-[13px] text-red-600">
            {genError}
          </p>
        )}

        {provider === "manual" ? (
          <button
            onClick={() => navigator.clipboard.writeText(prompt)}
            disabled={!prompt.trim()}
            className="rounded-full border border-border px-5 py-2.5 text-[13px] text-foreground hover:border-accent disabled:opacity-40"
          >
            Copy prompt
          </button>
        ) : (
          <button
            onClick={handleGenerate}
            disabled={generating || !prompt.trim()}
            className="rounded-full bg-primary px-5 py-2.5 text-[13px] font-medium text-primary-foreground hover:brightness-105 disabled:opacity-50"
          >
            {generating ? "Generating…" : "Generate test image"}
          </button>
        )}

        {generatedImage && (
          <div className="mt-4">
            <p className={labelClass}>Generated Image</p>
            <img
              src={generatedImage}
              alt="AI generated"
              className="max-w-sm w-full rounded-xl border border-border"
            />
          </div>
        )}
      </div>
    </div>
  );
}
