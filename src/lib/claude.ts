// Claude API helper
// Add VITE_ANTHROPIC_API_KEY to your .env when ready to unlock AI generation

const MODEL = "claude-sonnet-4-6";

async function callClaude(system: string, user: string): Promise<string> {
  const key = import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (!key) throw new Error("Add VITE_ANTHROPIC_API_KEY to your .env file to enable AI writing");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4096,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || "Claude API error");
  }

  const data = await res.json();
  return data.content[0].text;
}

// ── Blog generator ────────────────────────────────────────────

export interface GeneratedBlog {
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  excerpt: string;
  body: string;
  keywords: string[];
  reading_time_mins: number;
  faq_json: Array<{ q: string; a: string }>;
  schema_json: Record<string, unknown>;
}

export async function generateBlogPost(
  topic: string,
  targetMarket: string,
  contentPillar: string
): Promise<GeneratedBlog> {
  const system = `You are an expert SEO content writer for Prachi Fulfagar — an internationally 
awarded Vastu Shastra, Palmistry and Vedic Astrology consultant. She has offices in Mumbai, Pune, 
Nashik and Kopargaon and serves clients globally. 

Writing style: warm, knowledgeable, calming. Never salesy or generic.
SEO: structured for Google AI Overviews, ChatGPT and Perplexity.
Always end with a CTA to book a consultation at prachifulfagar.com.

Respond with ONLY valid JSON. No markdown, no backticks, no explanation.`;

  const user = `Write a complete SEO blog post for prachifulfagar.com.
Topic: ${topic}
Target market: ${targetMarket}  
Content pillar: ${contentPillar}

Return this exact JSON:
{
  "title": "SEO title under 60 chars with main keyword",
  "slug": "url-slug-kebab-case",
  "meta_title": "Meta title under 60 chars",
  "meta_description": "Compelling meta description under 155 chars with keyword",
  "excerpt": "2-sentence summary",
  "body": "Full post in markdown. Intro (2-3 sentences), 5 H2 sections each 100-120 words, a direction table or tip callout box, conclusion with CTA. 600-700 words total. Keyword naturally 3-4 times.",
  "keywords": ["kw1","kw2","kw3","kw4","kw5"],
  "reading_time_mins": 5,
  "faq_json": [
    {"q":"Question?","a":"Direct answer in 2 sentences."},
    {"q":"Question?","a":"Answer."},
    {"q":"Question?","a":"Answer."},
    {"q":"Question?","a":"Answer."},
    {"q":"Question?","a":"Answer."}
  ],
  "schema_json": {
    "@context":"https://schema.org",
    "@type":"Article",
    "headline":"same as title",
    "author":{"@type":"Person","name":"Prachi Fulfagar","url":"https://prachifulfagar.com"},
    "publisher":{"@type":"Organization","name":"Prachi Fulfagar","url":"https://prachifulfagar.com"},
    "description":"same as meta_description"
  }
}`;

  const raw = await callClaude(system, user);
  return JSON.parse(raw.replace(/```json|```/g, "").trim()) as GeneratedBlog;
}

// ── Social post generator ─────────────────────────────────────

export interface GeneratedSocial {
  caption_instagram: string;
  caption_youtube: string;
  caption_facebook: string;
  caption_linkedin: string;
  caption_pinterest: string;
  caption_threads: string;
  hashtags_instagram: string;
  image_prompt: string;
}

export async function generateSocialPosts(
  topic: string,
  contentPillar: string,
  targetMarket: string
): Promise<GeneratedSocial> {
  const system = `You are a social media expert for Prachi Fulfagar — an internationally 
awarded Vastu, Palmistry and Astrology consultant. Her brand is premium, warm, calm and spiritual.
Respond with ONLY valid JSON. No markdown, no backticks.`;

  const user = `Write social media captions for all platforms about:
Topic: ${topic}
Content pillar: ${contentPillar}
Target market: ${targetMarket}

Return this exact JSON:
{
  "caption_instagram": "150-220 chars. Warm spiritual tone. 2-3 emojis. End with question or insight. No hashtags.",
  "caption_youtube": "200-300 chars. Include keyword. Mention booking. Add: prachifulfagar.com",
  "caption_facebook": "180-250 chars. Friendly, educational, good for Indian audience.",
  "caption_linkedin": "200-280 chars. Professional thought leadership. Corporate Vastu angle where relevant.",
  "caption_pinterest": "100-150 chars. Keyword-rich. Descriptive for discovery.",
  "caption_threads": "120-180 chars. Conversational, punchy, one key insight.",
  "hashtags_instagram": "#vastu #vastushastra #vastuexpert #palmistry #astrology #vastuforhome #spiritualhealing #prachifulfagar #vastuindia #holisticliving",
  "image_prompt": "Detailed image generation prompt. Style: premium spiritual, warm cream and gold, minimal luxury. No text in image. Example format: 'A serene [scene], soft golden hour light, warm cream tones, no people, no text, premium lifestyle photography style'"
}`;

  const raw = await callClaude(system, user);
  return JSON.parse(raw.replace(/```json|```/g, "").trim()) as GeneratedSocial;
}
