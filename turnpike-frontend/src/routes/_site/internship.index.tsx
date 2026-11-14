import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Award, CalendarClock, Check, GitBranch, ShieldCheck } from "lucide-react";

import { useTracks } from "@turnpike/shared/hooks/use-internship";
import { useSession } from "@turnpike/shared/hooks/use-auth";
import { useMyEnrollments } from "@turnpike/shared/hooks/use-internship";
import type { TrackCategory } from "@turnpike/shared/types/internship";

export const Route = createFileRoute("/_site/internship/")({
  head: () => ({
    meta: [
      { title: "Internship Programme — Turnpike Analyst" },
      {
        name: "description",
        content:
          "Build a real engineering project, have it reviewed against the standard we hold our own delivery to, and earn a free certificate from an ISO-certified consultancy.",
      },
    ],
  }),
  component: InternshipLanding,
});

const CATEGORY_LABELS: Record<TrackCategory, string> = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  FULLSTACK: "Full stack",
  DATA_ENGINEERING: "Data engineering",
  DEVOPS: "DevOps",
  AI_ML: "AI & ML",
};

const STEPS = [
  {
    icon: GitBranch,
    title: "Choose a project — ours or your own",
    body: "Take one of our briefs, or propose your own project in whatever technology you like. Then pick one, two or three months; the certificate states the duration you chose.",
  },
  {
    icon: ShieldCheck,
    title: "Build it, then write it up",
    body: "Submit the repository together with the project's purpose, the technologies, the architecture, a data flow diagram, the use cases and the benefit — and a recording of it running on your own machine.",
  },
  {
    icon: CalendarClock,
    title: "Answer the follow-up questions",
    body: "Your repository is read and checked against what you wrote. The questions come from your project specifically, so no two interns get the same ones.",
  },
  {
    icon: Award,
    title: "Receive the certificate",
    body: "A reviewer reads your submission, watches your demo and reads your answers before anything is issued. Free of charge, from a company registered in the USA and India.",
  },
];

/** The exact artefacts the programme asks for, stated plainly up front. */
const DELIVERABLES = [
  "The project itself, in a public GitHub repository",
  "What it is for — the problem it solves",
  "The technologies you used",
  "The architecture",
  "A data flow diagram",
  "The use cases it serves",
  "The benefit of using it",
  "A recording of you running it locally",
];

function InternshipLanding() {
  const { isAuthenticated } = useSession();
  const tracks = useTracks();
  const enrollments = useMyEnrollments(isAuthenticated);

  const activeEnrollment = enrollments.data?.find(
    (enrollment) =>
      !["APPROVED", "REJECTED", "EXPIRED"].includes(enrollment.status),
  );

  return (
    <div className="relative">
      <section className="px-5 pb-16 pt-16 sm:px-8 lg:pb-20 lg:pt-24">
        <div className="mx-auto w-full max-w-5xl">
          <p className="inline-flex items-center rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Internship programme · 1, 2 or 3 months · No fee
          </p>
          <h1 className="font-display mt-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Build something real. Have it reviewed properly.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Build something real — one of our briefs, or a project of your own in any technology
            you like. Show us what you built and how it works, run it for us, and answer
            questions about your own decisions. A reviewer signs off before any certificate is
            issued, which is what makes it worth putting on a CV. There is no charge, ever.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            {activeEnrollment ? (
              <Link
                to="/internship/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-float transition-colors hover:bg-primary/90"
              >
                Continue {activeEnrollment.track_title}
                <ArrowRight className="size-4" />
              </Link>
            ) : (
              <a
                href="#tracks"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-float transition-colors hover:bg-primary/90"
              >
                See the projects
                <ArrowRight className="size-4" />
              </a>
            )}
            {isAuthenticated ? (
              <Link
                to="/internship/dashboard"
                className="inline-flex items-center rounded-full border border-border bg-card/60 px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                My dashboard
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-muted/30 px-5 py-16 sm:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div key={step.title}>
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {index + 1}
                </span>
                <step.icon className="size-5 text-muted-foreground" aria-hidden />
              </div>
              <h2 className="font-display mt-4 text-lg font-semibold text-foreground">
                {step.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What you submit
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            All of it, for any project. The breadth is the point — it is how we know the work
            is genuinely yours.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {DELIVERABLES.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-sm text-foreground"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="tracks" className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Available projects
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            One attempt at a time. Choose the brief that matches what you want to be hired to
            do — or bring your own project instead.
          </p>
          <Link
            to="/internship/propose"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            I have my own project idea
            <ArrowRight className="size-4" />
          </Link>

          {tracks.isLoading ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="h-56 rounded-3xl border border-border bg-muted/40" />
              ))}
            </div>
          ) : tracks.isError ? (
            <p className="mt-10 rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-foreground">
              The project list could not be loaded. Refresh the page, or try again shortly.
            </p>
          ) : !tracks.data?.length ? (
            <p className="mt-10 rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
              No projects are open for applications right now. Check back soon.
            </p>
          ) : (
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {tracks.data.map((track) => (
                <Link
                  key={track._id}
                  to="/internship/$slug"
                  params={{ slug: track.slug }}
                  className="group flex flex-col rounded-3xl border border-border bg-card p-7 shadow-sm transition-colors hover:border-primary/50"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {CATEGORY_LABELS[track.category] ?? track.category}
                    </span>
                    <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                      {track.level.toLowerCase()}
                    </span>
                    <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                      {track.build_days} days
                    </span>
                  </div>
                  <h3 className="font-display mt-4 text-xl font-semibold text-foreground">
                    {track.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {track.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Read the brief
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
