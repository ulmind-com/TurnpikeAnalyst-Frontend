import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { GoogleSignInButton } from "@/components/internship/google-sign-in-button";
import { describeError, useSession } from "@turnpike/shared/hooks/use-auth";
import { useEnroll, useMyEnrollments } from "@turnpike/shared/hooks/use-internship";

export const Route = createFileRoute("/_site/internship/propose")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Propose your own project — Turnpike Analyst" },
      {
        name: "description",
        content:
          "Build something of your own choosing and have it reviewed for a free internship certificate.",
      },
    ],
  }),
  component: ProposeProject,
});

const DURATIONS = [1, 2, 3];

function ProposeProject() {
  const navigate = useNavigate();
  const { isAuthenticated, hydrated } = useSession();
  const enrollments = useMyEnrollments(isAuthenticated);
  const enroll = useEnroll();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [stack, setStack] = useState("");
  const [months, setMonths] = useState(1);

  const hasActive = enrollments.data?.some(
    (item) => !["APPROVED", "REJECTED", "EXPIRED"].includes(item.status),
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const intended = stack
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (summary.trim().length < 40) {
      toast.error("Describe the project in a little more detail.");
      return;
    }
    if (!intended.length) {
      toast.error("Name at least one technology you intend to use.");
      return;
    }

    try {
      const created = await enroll.mutateAsync({
        mode: "OWN",
        duration_months: months,
        own_project: {
          title: title.trim(),
          summary: summary.trim(),
          intended_stack: intended,
        },
      });
      toast.success("You're enrolled. The clock starts now.");
      void navigate({
        to: "/internship/dashboard/$enrollmentId",
        params: { enrollmentId: created._id },
      });
    } catch (error) {
      toast.error(describeError(error));
    }
  };

  if (!hydrated) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="px-5 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          to="/internship"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All projects
        </Link>

        <h1 className="font-display mt-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground">
          Build your own project
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          You do not have to take one of our briefs. Choose your own project and your own
          technology — the review is the same either way, and so is the certificate.
        </p>

        {!isAuthenticated ? (
          <div className="mt-10 rounded-3xl border border-border bg-muted/30 p-7">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Sign in to start
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your Google account creates your intern profile. Nothing is charged, at any point.
            </p>
            <div className="mt-5">
              <GoogleSignInButton redirectTo="/internship/propose" />
            </div>
          </div>
        ) : hasActive ? (
          <div className="mt-10 rounded-3xl border border-border bg-muted/30 p-7">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Finish your current project first
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The programme runs one project at a time, so your work gets a proper review.
            </p>
            <Link
              to="/internship/dashboard"
              className="mt-5 inline-flex items-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              Go to my dashboard
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-foreground">
                What are you building?
              </label>
              <input
                id="title"
                required
                minLength={4}
                maxLength={150}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Shipment reconciliation API"
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-primary"
              />
            </div>

            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-foreground">
                What will it do?
              </label>
              <textarea
                id="summary"
                required
                rows={5}
                maxLength={1000}
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
                placeholder="The problem it solves, who it is for, and roughly how it works."
                className="mt-2 w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-primary"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                This becomes the brief your submission is reviewed against, so be specific
                about what you intend to deliver.
              </p>
            </div>

            <div>
              <label htmlFor="stack" className="block text-sm font-medium text-foreground">
                Technologies you intend to use
              </label>
              <textarea
                id="stack"
                required
                rows={4}
                value={stack}
                onChange={(event) => setStack(event.target.value)}
                placeholder={"React\nFastAPI\nPostgreSQL"}
                className="mt-2 w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-primary"
              />
              <p className="mt-2 text-xs text-muted-foreground">One per line.</p>
            </div>

            <div>
              <span className="block text-sm font-medium text-foreground">
                How long do you want?
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {DURATIONS.map((option) => (
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
              <p className="mt-2 text-xs text-muted-foreground">
                The certificate states the duration you pick. Choose the one that matches the
                scope you have described.
              </p>
            </div>

            <button
              type="submit"
              disabled={enroll.isPending || !title.trim()}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-float transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {enroll.isPending ? <Loader2 className="size-4 animate-spin" /> : null}
              Start my {months} month{months === 1 ? "" : "s"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
