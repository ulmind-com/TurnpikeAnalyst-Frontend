import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CalendarClock, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

import { GoogleSignInButton } from "@/components/internship/google-sign-in-button";
import { describeError, useSession } from "@turnpike/shared/hooks/use-auth";
import {
  useEnroll,
  useMyEnrollments,
  useTrack,
} from "@turnpike/shared/hooks/use-internship";

export const Route = createFileRoute("/_site/internship/$slug")({
  head: ({ params }) => ({
    meta: [
      {
        // The brief itself is fetched client-side, so the slug is the best
        // title available at render time — still better than inheriting the
        // site-wide default on every project page.
        title: `${params.slug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")} — Internship project — Turnpike Analyst`,
      },
    ],
  }),
  component: TrackDetail,
});

function TrackDetail() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const { isAuthenticated, hydrated } = useSession();

  const track = useTrack(slug);
  const enrollments = useMyEnrollments(isAuthenticated);
  const enroll = useEnroll();
  const [enrolling, setEnrolling] = useState(false);

  const existing = enrollments.data?.find((item) => item.track_slug === slug);
  const hasOtherActive = enrollments.data?.some(
    (item) =>
      item.track_slug !== slug &&
      !["APPROVED", "REJECTED", "EXPIRED"].includes(item.status),
  );

  const [months, setMonths] = useState(1);

  const handleEnroll = async () => {
    if (!track.data) return;
    setEnrolling(true);
    try {
      const created = await enroll.mutateAsync({
        mode: "TRACK",
        track_id: track.data._id,
        duration_months: months,
      });
      toast.success("You're enrolled. The clock starts now.");
      void navigate({ to: "/internship/dashboard/$enrollmentId", params: { enrollmentId: created._id } });
    } catch (error) {
      toast.error(describeError(error));
    } finally {
      setEnrolling(false);
    }
  };

  if (track.isLoading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (track.isError || !track.data) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8">
        <h1 className="font-display text-2xl font-semibold text-foreground">Project not found</h1>
        <p className="mt-2 text-muted-foreground">
          This brief may have been withdrawn. The open projects are listed on the programme page.
        </p>
        <Link
          to="/internship"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Back to the programme
        </Link>
      </div>
    );
  }

  const data = track.data;

  return (
    <article className="px-5 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-4xl">
        <Link
          to="/internship"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All projects
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {data.category.replace(/_/g, " ").toLowerCase()}
          </span>
          <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
            {data.level.toLowerCase()}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
            <CalendarClock className="size-3.5" />
            {data.build_days} days to build
          </span>
        </div>

        <h1 className="font-display mt-5 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
          {data.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{data.summary}</p>

        <div className="prose prose-slate mt-10 max-w-none dark:prose-invert prose-headings:font-display">
          <ReactMarkdown>{data.brief}</ReactMarkdown>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <section className="rounded-3xl border border-border bg-card p-7">
            <h2 className="font-display text-lg font-semibold text-foreground">Requirements</h2>
            <ul className="mt-4 space-y-2.5">
              {data.requirements.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-border bg-card p-7">
            <h2 className="font-display text-lg font-semibold text-foreground">What to submit</h2>
            <ul className="mt-4 space-y-2.5">
              {data.deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {data.suggested_stack.length ? (
              <>
                <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Suggested stack — not a requirement
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {data.suggested_stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </>
            ) : null}
          </section>
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-muted/30 p-7">
          {!hydrated ? (
            <Loader2 className="size-5 animate-spin text-primary" />
          ) : !isAuthenticated ? (
            <>
              <h2 className="font-display text-lg font-semibold text-foreground">
                Sign in to start
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Your Google account creates your intern profile. Nothing is charged, at any point.
              </p>
              <div className="mt-5">
                <GoogleSignInButton redirectTo={`/internship/${slug}`} />
              </div>
            </>
          ) : existing ? (
            <>
              <h2 className="font-display text-lg font-semibold text-foreground">
                You are already on this project
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Current status: {existing.status.replace(/_/g, " ").toLowerCase()}.
              </p>
              <Link
                to="/internship/dashboard/$enrollmentId"
                params={{ enrollmentId: existing._id }}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Open my project
              </Link>
            </>
          ) : hasOtherActive ? (
            <>
              <h2 className="font-display text-lg font-semibold text-foreground">
                Finish your current project first
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                The programme runs one project at a time, so your work gets a proper review.
              </p>
              <Link
                to="/internship/dashboard"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                Go to my dashboard
              </Link>
            </>
          ) : (
            <>
              <h2 className="font-display text-lg font-semibold text-foreground">
                Ready to start?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose how long you want. The certificate states the duration you pick, so
                choose the one that matches the effort you intend to put in.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[1, 2, 3].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setMonths(option)}
                    className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                      months === option
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {option} month{option === 1 ? "" : "s"}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleEnroll}
                disabled={enrolling}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-float transition-colors hover:bg-primary/90 disabled:opacity-60"
              >
                {enrolling ? <Loader2 className="size-4 animate-spin" /> : null}
                Enrol for {months} month{months === 1 ? "" : "s"}
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
