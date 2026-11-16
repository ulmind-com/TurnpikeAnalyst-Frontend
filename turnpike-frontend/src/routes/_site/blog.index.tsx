import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/site/parallax";
import { PremiumCard, PremiumCardSkeleton, humanise } from "@/components/site/premium-card";
import { Section, SectionHeading } from "@/components/site/section";
import { WaveDivider } from "@/components/site/wave-divider";
import { usePublicBlogs } from "@turnpike/shared/hooks/use-public-api";

export const Route = createFileRoute("/_site/blog/")({
  head: () => ({
    meta: [
      { title: "Insights — Field Notes from Turnpike Analyst Engagements" },
      {
        name: "description",
        content:
          "Editorial and field notes on ECM migration, intelligent automation and regulated content operations from Turnpike Analyst consultants.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Insights — Turnpike Analyst" },
      {
        property: "og:description",
        content: "Practitioner writing on migration fidelity, automation and content governance.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const blogs = usePublicBlogs();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  
  const currentBlogs = (blogs.data ?? []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil((blogs.data ?? []).length / itemsPerPage);


  return (
    <>
      <Section className="pt-8">
        <SectionHeading
          eyebrow="Insights"
          title="Field notes from live engagements"
          description="Written by the consultants doing the work, not a content team."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentBlogs.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.05}>
              <PremiumCard
                accent="cyan"
                bookmarkable
                icon={<BookOpen className="size-5" />}
                title={post.title}
                description={post.summary}
                meta={[
                  { label: "Author", value: post.author },
                  {
                    label: "Published",
                    value: post.published_at
                      ? new Date(post.published_at).toLocaleDateString(undefined, {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "—",
                  },
                  { label: "Category", value: humanise(post.category) },
                ]}
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-105"
                >
                  Read more
                </Link>
              </PremiumCard>
            </Reveal>
          ))}
          {blogs.isLoading
            ? Array.from({ length: 9 }).map((_, index) => <PremiumCardSkeleton key={index} />)
            : null}
          {!blogs.isLoading && (blogs.data?.length ?? 0) === 0 ? (
            <p className="text-sm text-muted-foreground">Insights are publishing soon.</p>
          ) : null}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium rounded-full bg-secondary text-secondary-foreground disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`size-10 rounded-full text-sm font-medium transition-colors ${
                  currentPage === i + 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium rounded-full bg-secondary text-secondary-foreground disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </Section>
      <WaveDivider variant="ribbon" />
    </>
  );
}

