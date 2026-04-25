import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionSection } from "@/components/prachi/Motion";
import { supabase, type VpBlogPost } from "@/lib/supabase";
import { whatsappUrl } from "@/components/prachi/site-data";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} | Prachi Fulfagar` },
      { name: "description", content: "Expert Vastu, Palmistry and Astrology insights from Prachi Fulfagar." },
    ],
  }),
  component: BlogPostPage,
});

// Simple markdown renderer — handles H2, H3, bold, italic, lists, tables
function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3 class='font-heading text-[22px] font-light text-foreground mt-8 mb-3'>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2 class='font-heading text-[28px] font-light text-foreground mt-10 mb-4'>$1</h2>")
    .replace(/\*\*(.+?)\*\*/g, "<strong class='font-medium text-foreground'>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^> (.+)$/gm, "<blockquote class='border-l-2 border-accent pl-4 italic text-muted-foreground my-4'>$1</blockquote>")
    .replace(/^- (.+)$/gm, "<li class='flex gap-2 text-[14px] text-muted-foreground font-light leading-relaxed mb-1'><span class='mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent'></span><span>$1</span></li>")
    .replace(/(<li.*<\/li>\n?)+/g, "<ul class='my-4 space-y-1'>$&</ul>")
    .replace(/^\|(.+)\|$/gm, (row) => {
      const cells = row.split("|").filter(Boolean);
      return "<tr>" + cells.map(c => `<td class='px-4 py-2 text-[13px] text-muted-foreground border border-border'>${c.trim()}</td>`).join("") + "</tr>";
    })
    .replace(/(<tr>.*<\/tr>\n?)+/g, (t) => `<div class='overflow-x-auto my-6'><table class='w-full border-collapse border border-border rounded-lg overflow-hidden'><tbody>${t}</tbody></table></div>`)
    .replace(/\n\n/g, "</p><p class='text-[14px] font-light leading-[1.85] text-muted-foreground mt-4'>")
    .replace(/^/, "<p class='text-[14px] font-light leading-[1.85] text-muted-foreground'>")
    .replace(/$/, "</p>");
}

function BlogPostPage() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<VpBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("vp_blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (!data) {
        setNotFoundState(true);
      } else {
        setPost(data);
        // Inject JSON-LD structured data
        if (data.schema_json) {
          const script = document.createElement("script");
          script.type = "application/ld+json";
          script.text = JSON.stringify(data.schema_json);
          document.head.appendChild(script);
        }
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="pf-section">
        <div className="pf-container max-w-[720px]">
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-24 rounded bg-border" />
            <div className="h-10 w-3/4 rounded bg-border" />
            <div className="h-4 w-full rounded bg-border" />
            <div className="h-4 w-full rounded bg-border" />
            <div className="h-4 w-2/3 rounded bg-border" />
          </div>
        </div>
      </div>
    );
  }

  if (notFoundState || !post) {
    return (
      <div className="pf-section text-center">
        <div className="pf-container max-w-md">
          <p className="pf-eyebrow pf-eyebrow-center mb-3">Not found</p>
          <h1 className="pf-h2">This post doesn't exist</h1>
          <Button asChild variant="porcelain" className="mt-8">
            <Link to="/blog">← Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Article header */}
      <div className="bg-warm py-16">
        <div className="pf-container max-w-[720px]">
          <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-[12px] text-muted-foreground transition hover:text-accent">
            <ArrowLeft className="h-3 w-3" /> Back to Blog
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground">
            <span className="rounded-full bg-accent/10 px-3 py-1 text-[10px] font-medium text-accent">
              {post.content_pillar}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {post.reading_time_mins} min read
            </span>
            {post.published_at && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            )}
          </div>
          <h1 className="font-heading mt-5 text-[40px] font-light leading-[1.15] text-foreground md:text-[48px]">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-4 text-[16px] font-light leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          )}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-[12px] font-medium text-accent">
              PF
            </div>
            <div>
              <p className="text-[13px] font-medium text-foreground">Prachi Fulfagar</p>
              <p className="text-[11px] text-muted-foreground">Vastu · Palmistry · Astrology</p>
            </div>
          </div>
        </div>
      </div>

      {/* Article body */}
      <MotionSection className="pf-section bg-background pt-10">
        <div className="pf-container max-w-[720px]">
          <div
            className="prose-pf"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }}
          />

          {/* FAQ section — LLM friendly */}
          {post.faq_json && post.faq_json.length > 0 && (
            <div className="mt-14 border-t border-border pt-10">
              <h2 className="font-heading text-[28px] font-light text-foreground mb-6">
                Frequently asked questions
              </h2>
              <div className="space-y-6">
                {post.faq_json.map((faq, i) => (
                  <div key={i} className="rounded-xl border border-border bg-warm p-5">
                    <h3 className="text-[14px] font-medium text-foreground mb-2">{faq.q}</h3>
                    <p className="text-[13px] font-light leading-relaxed text-muted-foreground">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA band */}
          <div className="mt-14 rounded-2xl border border-accent/30 bg-warm p-8 text-center">
            <p className="pf-eyebrow pf-eyebrow-center mb-3">Ready to begin?</p>
            <h2 className="font-heading text-[28px] font-light text-foreground">
              Book a personal consultation
            </h2>
            <p className="pf-body mt-2 max-w-sm mx-auto">
              In person across India — Mumbai, Pune, Nashik, Kopargaon — or online from anywhere in the world.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild variant="hero">
                <Link to="/contact">Book a Consultation</Link>
              </Button>
              <Button asChild variant="whatsapp">
                <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp Prachi</a>
              </Button>
            </div>
          </div>

          {/* Keywords — hidden but crawlable */}
          {post.keywords && post.keywords.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {post.keywords.map((kw) => (
                <span key={kw} className="rounded-full bg-background border border-border px-3 py-1 text-[11px] text-muted-foreground">
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>
      </MotionSection>
    </>
  );
}
