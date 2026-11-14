import type { Enrollment, InternshipStatus } from "@turnpike/shared/types/internship";

/**
 * How each state is presented to the intern.
 *
 * `REVIEW_FAILED` is deliberately not described as a failure of theirs: it
 * means our review could not run, and the wording has to make clear the
 * submission is safe and a person will look at it.
 */
const STATUS_META: Record<
  InternshipStatus,
  { label: string; tone: "neutral" | "active" | "waiting" | "good" | "bad" }
> = {
  ENROLLED: { label: "Building", tone: "active" },
  SUBMITTED: { label: "Submitted", tone: "waiting" },
  AI_REVIEWING: { label: "Reading your code", tone: "waiting" },
  QUESTIONS_PENDING: { label: "Questions waiting", tone: "active" },
  UNDER_REVIEW: { label: "Under review", tone: "waiting" },
  APPROVED: { label: "Approved", tone: "good" },
  REJECTED: { label: "Not approved", tone: "bad" },
  EXPIRED: { label: "Window closed", tone: "bad" },
  REVIEW_FAILED: { label: "Awaiting a reviewer", tone: "waiting" },
};

const TONE_CLASS = {
  neutral: "border-border text-muted-foreground",
  active: "border-primary/40 bg-primary/10 text-primary",
  waiting: "border-warning/40 bg-warning/10 text-warning-foreground",
  good: "border-success/40 bg-success/10 text-success",
  bad: "border-destructive/40 bg-destructive/10 text-destructive",
} as const;

export function StatusBadge({ status }: { status: InternshipStatus }) {
  const meta = STATUS_META[status] ?? { label: status, tone: "neutral" as const };
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-semibold ${TONE_CLASS[meta.tone]}`}
    >
      {meta.label}
    </span>
  );
}

function daysBetween(from: Date, to: Date): number {
  return Math.ceil((to.getTime() - from.getTime()) / 86_400_000);
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/** One sentence telling the intern what the current date actually means. */
export function describeDeadline(enrollment: Enrollment): string {
  const now = new Date();

  switch (enrollment.status) {
    case "ENROLLED": {
      const remaining = daysBetween(now, new Date(enrollment.deadline_at));
      if (remaining < 0) return "The build window has closed.";
      if (remaining === 0) return "Due today.";
      if (remaining === 1) return "1 day left to submit.";
      return `${remaining} days left — due ${formatDate(enrollment.deadline_at)}.`;
    }
    case "AI_REVIEWING":
      return "Your repository is being read. This usually takes a couple of minutes.";
    case "QUESTIONS_PENDING":
      return "Follow-up questions are ready for you to answer.";
    case "UNDER_REVIEW":
      return enrollment.review_due_at
        ? `A reviewer will decide by ${formatDate(enrollment.review_due_at)}.`
        : "With a reviewer now.";
    case "REVIEW_FAILED":
      return "Your submission is saved. A reviewer will pick it up directly.";
    case "APPROVED":
      return "Approved — your certificate is ready.";
    case "REJECTED":
      return "Not approved this time.";
    case "EXPIRED":
      return `The window closed on ${formatDate(enrollment.deadline_at)}.`;
    default:
      return "";
  }
}
