import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[Supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not set. " +
    "Add them to your .env file."
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder"
);

// ── Database types ────────────────────────────────────────────

export interface VpBlogPost {
  id: string;
  title: string;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  body: string;
  excerpt: string | null;
  target_market: string;
  content_pillar: string;
  faq_json: Array<{ q: string; a: string }>;
  schema_json: Record<string, unknown>;
  og_image_url: string | null;
  reading_time_mins: number;
  keywords: string[];
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface VpSocialDraft {
  id: string;
  topic: string;
  content_pillar: string;
  caption_instagram: string | null;
  caption_youtube: string | null;
  caption_facebook: string | null;
  caption_linkedin: string | null;
  caption_pinterest: string | null;
  caption_threads: string | null;
  hashtags_instagram: string | null;
  image_prompt: string | null;
  status: "draft" | "approved" | "scheduled" | "posted" | "rejected";
  platform_targets: string[];
  created_at: string;
}

export interface VpContactLead {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  city_country: string | null;
  service_interested: string | null;
  preferred_mode: string | null;
  message: string | null;
  source: string;
  status: "new" | "contacted" | "booked" | "closed" | "spam";
  notes: string | null;
  created_at: string;
}

export interface VpCalendarItem {
  id: string;
  week_number: number;
  week_start_date: string | null;
  topic: string;
  content_pillar: string;
  target_market: string;
  blog_done: boolean;
  social_done: boolean;
  priority: "high" | "medium" | "low";
  notes: string | null;
}

export interface VpSetting {
  key: string;
  value: string | null;
  description: string | null;
  is_secret: boolean;
  updated_at: string | null;
}

export interface VpSocialAccount {
  platform: string;
  account_name: string | null;
  account_id: string | null;
  is_connected: boolean;
  postiz_channel_id: string | null;
  connected_at: string | null;
  updated_at: string | null;
}
