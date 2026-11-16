import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, GraduationCap, Layers } from "lucide-react";
import { motion } from "motion/react";

import { Reveal } from "@/components/site/parallax";
import { humanise } from "@/components/site/premium-card";
import { Section } from "@/components/site/section";
import { WaveDivider } from "@/components/site/wave-divider";
import { usePublicCourse, usePublicCourses } from "@turnpike/shared/hooks/use-public-api";

export const Route = createFileRoute("/_site/training/$slug")({
  head: () => ({
    meta: [
      { title: "Course detail — Turnpike Analyst Academy" },
      {
        name: "description",
        content:
          "Curriculum, level and duration for this practitioner-led Turnpike Analyst Academy training track.",
      },
      { property: "og:type", content: "article" },
      { property: "og:title", content: "Course detail — Turnpike Analyst Academy" },
      {
        property: "og:description",
        content: "Curriculum, level and duration for this Turnpike Analyst Academy track.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CourseDetailPage,
});

function CourseDetailPage() {
  const { slug } = Route.useParams();
  const course = usePublicCourse(slug);
  const all = usePublicCourses();

  const related = (all.data ?? []).filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <>
      <Section className="pt-8">
        <Link
          to="/training"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          All courses
        </Link>

        {course.isLoading ? (
          <div className="mt-8 h-64 animate-pulse rounded-[2rem] bg-card/50" />
        ) : course.data ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-card/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary backdrop-blur">
                <GraduationCap className="size-3.5" />
                {humanise(course.data.category)}
              </span>
              <h1 className="font-display mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                {course.data.title}
              </h1>
              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-card/60 px-4 py-2">
                  <Layers className="size-4 text-primary" />
                  {humanise(course.data.level)}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-card/60 px-4 py-2">
                  <Clock className="size-4 text-primary" />
                  {course.data.duration_hours} hours
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] px-4 py-2 font-semibold text-primary-foreground">
                  ${course.data.price.toLocaleString()}
                </span>
              </div>
            </motion.div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
              <Reveal className="rounded-[2rem] border border-white/60 bg-card/60 p-8 backdrop-blur-xl">
                <h2 className="font-display text-xl font-semibold tracking-tight">Curriculum</h2>
                <div className="mt-5 space-y-3">
                  {(course.data.curriculum ?? []).map((module, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06, duration: 0.4 }}
                      className="rounded-2xl border border-white/60 bg-card/55 px-5 py-4 text-sm transition-transform duration-300 hover:-translate-y-1"
                    >
                      <span className="font-semibold text-primary">Module {index + 1}</span>
                      <p className="mt-1 text-muted-foreground">
                        {String(
                          (module as Record<string, unknown>).title ??
                            (module as Record<string, unknown>).name ??
                            Object.values(module)[0] ??
                            "Practitioner-led session",
                        )}
                      </p>
                    </motion.div>
                  ))}
                  {!course.data.curriculum?.length ? (
                    <p className="text-sm text-muted-foreground">
                      Detailed curriculum shared during enrolment.
                    </p>
                  ) : null}
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-[2rem] border border-white/60 bg-card/60 p-7 backdrop-blur-xl">
                  <p className="text-sm text-muted-foreground">
                    Cohorts run virtually and on-site, delivered by consultants working live estates.
                  </p>
                  <Link
                    to="/contact"
                    className="mt-6 flex items-center justify-center rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:brightness-105"
                  >
                    Enquire about this track
                  </Link>
                </div>
              </Reveal>
            </div>

            {related.length ? (
              <div className="mt-16">
                <h2 className="font-display text-2xl font-semibold tracking-tight">Other tracks</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {related.map((item, index) => (
                    <Reveal key={item.slug} delay={index * 0.06}>
                      <Link
                        to="/training/$slug"
                        params={{ slug: item.slug }}
                        className="group block h-full rounded-[1.75rem] border border-white/60 bg-card/55 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
                      >
                        <p className="font-display font-semibold leading-snug transition-colors group-hover:text-primary">
                          {item.title}
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {humanise(item.level)} · {item.duration_hours}h
                        </p>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <p className="mt-10 text-sm text-muted-foreground">This course is not published.</p>
        )}
      </Section>
      <WaveDivider variant="curve" />
    </>
  );
}

