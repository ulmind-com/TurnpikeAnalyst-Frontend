import { ExternalLink, PlayCircle } from "lucide-react";

import { MermaidDiagram } from "@turnpike/shared/components/premium/mermaid-diagram";
import type { Diagram, Submission } from "@turnpike/shared/types/internship";

/**
 * The intern's own view of what they submitted.
 *
 * Deliberately read-only and complete: once a dossier is in review, being
 * able to see exactly what was sent is what makes the follow-up questions
 * fair.
 */
export function SubmissionSummaryPanel({ submission }: { submission: Submission }) {
  const repos = submission.repositories?.length
    ? submission.repositories
    : [{ url: submission.repo_url, role: "repository", label: null }];

  return (
    <section className="rounded-3xl border border-border bg-card p-7 shadow-sm">
      <h2 className="font-display text-lg font-semibold text-foreground">What you submitted</h2>

      <div className="mt-5 flex flex-wrap gap-3">
        {repos.map((repo, idx) => (
          <a
            key={`${repo.url}-${idx}`}
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            {repo.role && repo.role !== "monorepo" && repo.role !== "repository" ? (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-primary">
                {repo.role}
              </span>
            ) : null}
            {repo.url.replace("https://github.com/", "")}
            <ExternalLink className="size-3.5" />
          </a>
        ))}
        {submission.demo_video_url ? (
          <a
            href={submission.demo_video_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            <PlayCircle className="size-4" />
            Demo recording
          </a>
        ) : null}
        {submission.live_url ? (
          <a
            href={submission.live_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            Live site
            <ExternalLink className="size-3.5" />
          </a>
        ) : null}
      </div>

      <dl className="mt-6 space-y-5">
        <Entry label="Purpose">{submission.purpose}</Entry>
        <Entry label="Technologies">
          {submission.technologies.length ? (
            <div className="flex flex-wrap gap-2">
              {submission.technologies.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </Entry>
        <Entry label="Architecture">{submission.architecture_text}</Entry>
        <DiagramEntry label="Architecture diagram" diagram={submission.architecture_diagram} />
        <Entry label="Data flow">{submission.data_flow_text}</Entry>
        <DiagramEntry label="Data flow diagram" diagram={submission.data_flow_diagram} />
        <Entry label="Use cases">
          {submission.use_cases.length ? (
            <ul className="space-y-1.5">
              {submission.use_cases.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          ) : null}
        </Entry>
        <Entry label="Benefit">{submission.benefits}</Entry>
        <Entry label="Notes">{submission.notes}</Entry>
        <Entry label="Submitted">{new Date(submission.submitted_at).toLocaleString()}</Entry>
      </dl>
    </section>
  );
}

function Entry({ label, children }: { label: string; children: React.ReactNode }) {
  if (!children) return null;
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
        {children}
      </dd>
    </div>
  );
}

export function DiagramEntry({
  label,
  diagram,
}: {
  label: string;
  diagram?: Diagram | null;
}) {
  if (!diagram) return null;
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-2">
        {diagram.kind === "mermaid" && diagram.mermaid ? (
          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <MermaidDiagram source={diagram.mermaid} />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Supplied as an uploaded image.
          </p>
        )}
      </dd>
    </div>
  );
}
