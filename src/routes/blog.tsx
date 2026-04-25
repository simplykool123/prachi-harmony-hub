import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/prachi/PageHero";
import { MotionSection } from "@/components/prachi/Motion";
import { supabase, type VpBlogPost } from "@/lib/supabase";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog | Prachi Fulfagar — Vastu, Palmistry & Astrology Insights" },
      { name: "description", content: "Expert insights on Vastu Shastra, Palmistry and Vedic Astrology from internationally awarded consultant Prachi Fulfagar." },
      { property: "og:title", content: "Blog | Prachi Fulfagar" },
      { property: "og:description", content: "Vastu, Palmistry and Astrology insights — for India and international readers." },
    ],
  }),
  component: BlogPage,
});

const PILLAR_COLORS: Record<string, string> = {
  Vastu: "bg-amber-50 text-amber-700",
  Palmistry: "bg-rose-50 text-rose-700",
  Astrology: "bg-blue-50 text-blue-700",
  Heer: "bg-green-50 text-green-700",
  General: "bg-gray-50 text-gray-700",
};

function BlogPage() {
  const [posts, setPosts] = useState<VpBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasSupabase, setHasSupabase] = useState(true);

  useEffect(() => {
    async function load() {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl || supabaseUrl.includes("placeholder")) {
        setHasSupabase(false);
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("vp_blog_posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (!error) setPosts(data || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <>
      <PageHero
        eyebrow="BLOG"
        title="Insights for a balanced life"
        copy="Notes on homes, hands and planetary wisdom — written for readers across India and internationally."
      />

      <MotionSection className="pf-section bg-background pt-10">
        <div className="pf-container">

          {loading && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="pf-card animate-pulse rounded-xl p-6">
                  <div className="mb-4 h-3 w-20 rounded bg-border" />
                  <div className="mb-2 h-5 w-3/4 rounded bg-border" />
                  <div className="h-4 w-full rounded bg-border" />
                  <div className="mt-2 h-4 w-2/3 rounded bg-border" />
                </div>
              ))}
            </div>
          )}

          {!loading && !hasSupabase && (
            <div className="mx-auto max-w-lg rounded-2xl border border-border bg-warm p-10 text-center">
              <BookOpen className="mx-auto mb-4 h-8 w-8 text-accent" />
              <p className="pf-eyebrow pf-eyebrow-center mb-3">Coming soon</p>
              <h2 className="font-heading text-2xl font-light text-foreground">Blog posts are on their way</h2>
              <p className="pf-body mt-3">
                Prachi's insights on Vastu, Palmistry and Astrology will appear here soon.
                Use the admin dashboard to write and publish your first post.
              </p>
              <Button asChild variant="porcelain" className="mt-6">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          )}

          {!loading && hasSupabase && posts.length === 0 && (
            <div className="mx-auto max-w-lg rounded-2xl border border-border bg-warm p-10 text-center">
              <BookOpen className="mx-auto mb-4 h-8 w-8 text-accent" />
              <p className="pf-eyebrow pf-eyebrow-center mb-3">Coming soon</p>
              <h2 className="font-heading text-2xl font-light text-foreground">First posts are being prepared</h2>
              <p className="pf-body mt-3">
                Insights on Vastu Shastra, Palmistry and Vedic Astrology for readers in India and worldwide.
              </p>
              <Button asChild variant="porcelain" className="mt-6">
                <Link to="/contact">Book a consultation</Link>
              </Button>
            </div>
          )}

          {!loading && posts.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="pf-card group block rounded-xl p-6 transition hover:border-accent"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${PILLAR_COLORS[post.content_pillar] || PILLAR_COLORS.General}`}>
                      {post.content_pillar}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{post.reading_time_mins} min read</span>
                    {post.target_market !== "India" && (
                      <span className="ml-auto text-[10px] text-muted-foreground">{post.target_market}</span>
                    )}
                  </div>
                  <h2 className="font-heading text-[20px] font-light leading-snug text-foreground group-hover:text-accent transition">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-2 text-[13px] font-light leading-relaxed text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-5 flex items-center gap-1 text-[12px] font-medium text-accent">
                    Read more
                    <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </MotionSection>
    </>
  );
}
