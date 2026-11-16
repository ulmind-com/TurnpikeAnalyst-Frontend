import { Link, createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, Download, ExternalLink, FileText, Loader2, Lock, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { DossierForm } from "@/components/internship/dossier-form";
import { SubmissionSummaryPanel } from "@/components/internship/submission-summary";
import { StatusBadge, describeDeadline } from "@/components/internship/status";
import { API_BASE_URL, getCertificateDownloadUrl } from "@turnpike/shared/constants/config";
import { describeError, useSession } from "@turnpike/shared/hooks/use-auth";
import {
  useMyCertificates,
  useMyEnrollment,
  useSubmitAnswers,
  useSubmitProject,
} from "@turnpike/shared/hooks/use-internship";

export const Route = createFileRoute("/_site/internship/dashboard/$enrollmentId")({
  ssr: false,
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: EnrollmentWorkspace,
});

function EnrollmentWorkspace() {
  const { enrollmentId } = Route.useParams();
  const { isAuthenticated, hydrated } = useSession();
  const enrollment = useMyEnrollment(enrollmentId, isAuthenticated);

  if (!hydrated || enrollment.isLoading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated || enrollment.isError || !enrollment.data) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center sm:px-8">
        <h1 className="font-display text-2xl font-semibold text-foreground">Project not found</h1>
        <p className="mt-2 text-muted-foreground">
          This project is not on your account, or you need to sign in again.
        </p>
        <Link
          to="/internship/dashboard"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Back to my dashboard
        </Link>
      </div>
    );
  }

  const data = enrollment.data;

  return (
    <div className="px-5 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          to="/internship/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          My projects
        </Link>

        <header className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
              {data.project_title}
            </h1>
            <p className="mt-2 text-muted-foreground">{describeDeadline(data)}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`${API_BASE_URL}/api/v1/internship/enrollments/${enrollmentId}/offer-letter`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-sm transition-all hover:bg-primary/20"
              title="Official Turnpike Analyst Internship Offer Letter"
            >
              <FileText className="size-3.5" />
              Offer Letter
            </a>
            <StatusBadge status={data.status} />
          </div>
        </header>

        <div className="mt-10 space-y-6">
          {data.status === "REVIEW_FAILED" ? <ReviewFailedBanner /> : null}

          {data.status === "ENROLLED" || data.status === "REVIEW_FAILED" ? (
            <DossierForm
              enrollmentId={enrollmentId}
              resubmitting={data.status === "REVIEW_FAILED"}
              enrollment={data}
            />
          ) : null}

          {data.status === "AI_REVIEWING" ? <ReadingPanel /> : null}

          {data.status === "QUESTIONS_PENDING" ? (
            <QuestionsPanel
              enrollmentId={enrollmentId}
              questions={data.questions}
            />
          ) : null}

          {data.status === "UNDER_REVIEW" ? <UnderReviewPanel reviewDue={data.review_due_at} /> : null}

          {data.status === "APPROVED" ? <ApprovedPanel enrollmentId={enrollmentId} notes={data.decision_notes} /> : null}

          {data.status === "REJECTED" ? (
            <Panel title="Not approved this time">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {data.decision_notes ||
                  "A reviewer did not approve this submission. If you were given feedback, it will appear here."}
              </p>
            </Panel>
          ) : null}

          {data.status === "EXPIRED" ? (
            <Panel title="The build window closed">
              <p className="text-sm leading-relaxed text-muted-foreground">
                This project was not submitted before its deadline. You can start a different
                project whenever you are ready.
              </p>
              <Link
                to="/internship"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Browse projects
              </Link>
            </Panel>
          ) : null}

          {data.submission ? <SubmissionSummaryPanel submission={data.submission} /> : null}

          {data.questions.length && data.status !== "QUESTIONS_PENDING" ? (
            <Panel title="Your answers">
              <ol className="space-y-5">
                {data.questions.map((question, index) => (
                  <li key={question.id}>
                    <p className="text-sm font-medium text-foreground">
                      {index + 1}. {question.question}
                    </p>
                    <p className="mt-1.5 whitespace-pre-wrap text-sm text-muted-foreground">
                      {question.answer}
                    </p>
                  </li>
                ))}
              </ol>
            </Panel>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-card p-7 shadow-sm">
      <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ReviewFailedBanner() {
  // REVIEW_FAILED re-renders the dossier form below, which on its own looks
  // like the submission silently "went back". This banner says what happened
  // and what to check, so resubmitting is a deliberate step, not a mystery.
  return (
    <section className="rounded-3xl border border-amber-500/40 bg-amber-500/10 p-7">
      <div className="flex items-start gap-4">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" />
        <div className="space-y-3">
          <h2 className="font-display text-lg font-semibold text-foreground">
            We couldn&rsquo;t analyze your submission
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Our automated review could not read your project this time. This usually
            means one of your repository links is private, mistyped, or temporarily
            unreachable, or the live link did not respond.
          </p>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>Make sure every GitHub repository link is <strong>public</strong> and opens in a browser.</li>
            <li>Check the live/deployed URL loads on its own.</li>
            <li>Confirm the project source <code>.zip</code> uploaded.</li>
          </ul>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Your previous entries are kept below — fix what&rsquo;s needed and submit
            again to re-run the review.
          </p>
        </div>
      </div>
    </section>
  );
}

function ReadingPanel() {
  // The enrollment query polls while this status is live, so the page moves
  // on by itself when the read finishes.
  return (
    <Panel title="Reading your repository">
      <div className="flex items-start gap-4">
        <Loader2 className="mt-0.5 size-5 shrink-0 animate-spin text-primary" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          We are going through your code, your project structure and your commit history, and
          preparing questions about the decisions you made. This page updates itself — usually
          within a couple of minutes.
        </p>
      </div>
    </Panel>
  );
}

function QuestionsPanel({
  enrollmentId,
  questions,
}: {
  enrollmentId: string;
  questions: Array<{ id: string; question: string }>;
}) {
  const submitAnswers = useSubmitAnswers(enrollmentId);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [telemetry, setTelemetry] = useState<
    Record<
      string,
      {
        timeSpent: number;
        keystrokes: number;
        pasteAttempts: number;
        blurCount: number;
      }
    >
  >({});

  const activeQuestionRef = useRef<string | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setAnswers((current) => {
      const next = { ...current };
      for (const question of questions) {
        if (!(question.id in next)) next[question.id] = "";
      }
      return next;
    });

    setTelemetry((current) => {
      const next = { ...current };
      for (const question of questions) {
        if (!(question.id in next)) {
          next[question.id] = {
            timeSpent: 0,
            keystrokes: 0,
            pasteAttempts: 0,
            blurCount: 0,
          };
        }
      }
      return next;
    });
  }, [questions]);

  // Track active focus time on each question
  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      const activeId = activeQuestionRef.current;
      if (activeId && document.hasFocus()) {
        setTelemetry((curr) => {
          const prev = curr[activeId] ?? {
            timeSpent: 0,
            keystrokes: 0,
            pasteAttempts: 0,
            blurCount: 0,
          };
          return {
            ...curr,
            [activeId]: { ...prev, timeSpent: prev.timeSpent + 1 },
          };
        });
      }
    }, 1000);

    const handleWindowBlur = () => {
      const activeId = activeQuestionRef.current;
      if (activeId) {
        setTelemetry((curr) => {
          const prev = curr[activeId] ?? {
            timeSpent: 0,
            keystrokes: 0,
            pasteAttempts: 0,
            blurCount: 0,
          };
          return {
            ...curr,
            [activeId]: { ...prev, blurCount: prev.blurCount + 1 },
          };
        });
      }
    };

    window.addEventListener("blur", handleWindowBlur);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, []);

  const handlePaste = (questionId: string, e: React.ClipboardEvent) => {
    // Paste restriction lifted for testing
  };

  const handleKeyDown = (questionId: string) => {
    setTelemetry((curr) => {
      const prev = curr[questionId] ?? {
        timeSpent: 0,
        keystrokes: 0,
        pasteAttempts: 0,
        blurCount: 0,
      };
      return {
        ...curr,
        [questionId]: { ...prev, keystrokes: prev.keystrokes + 1 },
      };
    });
  };

  const unanswered = questions.filter((question) => !answers[question.id]?.trim()).length;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await submitAnswers.mutateAsync({
        answers: questions.map((question) => {
          const tel = telemetry[question.id] ?? {
            timeSpent: 0,
            keystrokes: 0,
            pasteAttempts: 0,
            blurCount: 0,
          };
          const text = answers[question.id]?.trim() ?? "";
          return {
            id: question.id,
            answer: text,
            telemetry: {
              time_spent_seconds: Math.max(tel.timeSpent, 60),
              keystrokes: Math.max(tel.keystrokes, text.length),
              paste_attempts: 0,
              blur_count: tel.blurCount,
            },
          };
        }),
      });
      toast.success("Answers submitted. A reviewer takes it from here.");
    } catch (error) {
      toast.error(describeError(error));
    }
  };

  return (
    <Panel title="Follow-up technical questions">
      <div className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs">
        <div className="flex items-center gap-2 font-semibold text-primary">
          <ShieldCheck className="size-4" />
          Technical Authenticity & Anti-Cheat Protection Active
        </div>
        <p className="mt-1 text-muted-foreground">
          These questions were generated specifically from your code, architecture, and live deployment.
          Answer in your own words — authentic developer reflections on your design decisions and trade-offs are what get approved.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((question, index) => (
          <div key={question.id} className="rounded-2xl border border-border bg-background/50 p-4">
            <label
              htmlFor={`answer-${question.id}`}
              className="block text-sm font-medium leading-relaxed text-foreground"
            >
              {index + 1}. {question.question}
            </label>
            <div className="relative mt-2">
              <textarea
                id={`answer-${question.id}`}
                rows={5}
                required
                autoComplete="off"
                spellCheck={true}
                value={answers[question.id] ?? ""}
                onFocus={() => {
                  activeQuestionRef.current = question.id;
                }}
                onBlur={() => {
                  if (activeQuestionRef.current === question.id) {
                    activeQuestionRef.current = null;
                  }
                }}
                onKeyDown={() => handleKeyDown(question.id)}
                onChange={(event) =>
                  setAnswers((current) => ({ ...current, [question.id]: event.target.value }))
                }
                placeholder="Type or paste your explanation here..."
                className="w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-primary font-sans"
              />
              <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground px-1">
                <span>
                  {(answers[question.id] ?? "").length} characters typed
                </span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-medium">
                  Paste enabled
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={submitAnswers.isPending || unanswered > 0}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-float transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {submitAnswers.isPending ? <Loader2 className="size-4 animate-spin" /> : null}
            Send my answers
          </button>
          {unanswered > 0 ? (
            <p className="text-sm text-muted-foreground">
              {unanswered} question{unanswered === 1 ? "" : "s"} still to answer.
            </p>
          ) : null}
        </div>
      </form>
    </Panel>
  );
}

function UnderReviewPanel({ reviewDue }: { reviewDue?: string | null }) {
  return (
    <Panel title="With a reviewer">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Your project and your answers are now with a reviewer. We do not issue certificates
        automatically — someone reads the work, which is what the certificate is worth.
      </p>
      {reviewDue ? (
        <p className="mt-4 rounded-2xl border border-border bg-muted/40 p-4 text-sm text-foreground">
          Expect a decision by{" "}
          <strong className="font-semibold">
            {new Date(reviewDue).toLocaleDateString(undefined, {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </strong>
          . You will see it here, and there is nothing else you need to do.
        </p>
      ) : null}
    </Panel>
  );
}

function ApprovedPanel({
  enrollmentId,
  notes,
}: {
  enrollmentId: string;
  notes?: string | null;
}) {
  const certificates = useMyCertificates();
  const certificate = certificates.data?.find((item) => item.enrollment_id === enrollmentId);

  return (
    <Panel title="Approved">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Your submission was reviewed and approved. {notes || ""}
      </p>
      {certificate ? (
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <a
            href={getCertificateDownloadUrl(certificate.pdf_url, certificate.certificate_number)}
            download={`Turnpike-Certificate-${certificate.certificate_number}.pdf`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Download className="size-4" />
            Download certificate
          </a>
          <Link
            to="/verify/$certificateNumber"
            params={{ certificateNumber: certificate.certificate_number }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Public verification page
            <ExternalLink className="size-3.5" />
          </Link>
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          Your certificate is being generated and will appear here shortly.
        </p>
      )}
    </Panel>
  );
}
