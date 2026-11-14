import {
  AlertTriangle,
  CheckCircle2,
  FileArchive,
  GitBranch,
  Globe,
  Loader2,
  Plus,
  SearchCheck,
  Trash2,
  Upload,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";

import {
  uploadAttachment,
  uploadSourceArchive,
} from "@turnpike/shared/api/services/internship.api";
import { MermaidDiagram } from "@turnpike/shared/components/premium/mermaid-diagram";
import { describeError } from "@turnpike/shared/hooks/use-auth";
import { useAnalyzeSources, useSubmitProject } from "@turnpike/shared/hooks/use-internship";
import type {
  Diagram,
  RepoEntryPayload,
  SourceAnalysisResponse,
  SourceArchive,
  SubmissionPayload,
} from "@turnpike/shared/types/internship";

/** One diagram's editing state, before it becomes a `Diagram`. */
type DiagramDraft = {
  kind: "mermaid" | "image";
  mermaid: string;
  assetId: string | null;
  filename: string | null;
};

type RepoDraft = {
  role: string;
  label: string;
  url: string;
};

type Draft = {
  architecture_type: "single" | "multiple";
  repositories: RepoDraft[];
  live_url: string;
  demo_video_url: string;
  purpose: string;
  technologies: string;
  architecture_text: string;
  data_flow_text: string;
  use_cases: string;
  benefits: string;
  notes: string;
  architecture: DiagramDraft;
  dataFlow: DiagramDraft;
};

const EMPTY_DIAGRAM: DiagramDraft = {
  kind: "mermaid",
  mermaid: "",
  assetId: null,
  filename: null,
};

const DEFAULT_SINGLE_REPOS: RepoDraft[] = [{ role: "monorepo", label: "Main repository", url: "" }];
const DEFAULT_MULTI_REPOS: RepoDraft[] = [
  { role: "frontend", label: "Frontend app", url: "" },
  { role: "backend", label: "Backend API", url: "" },
];

const EMPTY: Draft = {
  architecture_type: "single",
  repositories: DEFAULT_SINGLE_REPOS,
  live_url: "",
  demo_video_url: "",
  purpose: "",
  technologies: "",
  architecture_text: "",
  data_flow_text: "",
  use_cases: "",
  benefits: "",
  notes: "",
  architecture: EMPTY_DIAGRAM,
  dataFlow: EMPTY_DIAGRAM,
};

const REPO_ROLES = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend / API" },
  { value: "admin", label: "Admin Panel" },
  { value: "mobile", label: "Mobile App" },
  { value: "monorepo", label: "Fullstack / Monorepo" },
  { value: "other", label: "Other Service" },
] as const;

const EXAMPLE_MERMAID = `graph TD
  U[User] --> A[Web app]
  A --> B[API]
  B --> D[(Database)]`;

const toLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const STEPS = [
  "Repos & live check",
  "The write-up",
  "Diagrams",
  "Source code (.zip)",
] as const;

const MAX_ARCHIVE_BYTES = 50 * 1024 * 1024;

export function DossierForm({
  enrollmentId,
  resubmitting,
}: {
  enrollmentId: string;
  resubmitting: boolean;
}) {
  const submit = useSubmitProject(enrollmentId);
  const analyze = useAnalyzeSources(enrollmentId);
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [archive, setArchive] = useState<SourceArchive | null>(null);
  const [analysis, setAnalysis] = useState<SourceAnalysisResponse | null>(null);
  const [analyzedFingerprint, setAnalyzedFingerprint] = useState<string>("");

  const storageKey = `turnpike.dossier.v2.${enrollmentId}`;
  const archiveKey = `turnpike.archive.${enrollmentId}`;

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<Draft>;
        setDraft({
          ...EMPTY,
          ...parsed,
          repositories:
            Array.isArray(parsed.repositories) && parsed.repositories.length
              ? parsed.repositories
              : EMPTY.repositories,
        });
      }
      const savedArchive = window.localStorage.getItem(archiveKey);
      if (savedArchive) setArchive(JSON.parse(savedArchive) as SourceArchive);
    } catch {
      // Non-fatal; clean form state still works.
    }
  }, [storageKey, archiveKey]);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(draft));
    } catch {
      // Non-fatal.
    }
  }, [draft, storageKey]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));

  const currentSourceFingerprint = JSON.stringify({
    repos: draft.repositories.map((r) => r.url.trim()),
    live: draft.live_url.trim(),
  });

  const switchArchitectureType = (type: "single" | "multiple") => {
    setAnalysis(null);
    if (type === "single") {
      const firstUrl = draft.repositories[0]?.url ?? "";
      setDraft((c) => ({
        ...c,
        architecture_type: "single",
        repositories: [{ role: "monorepo", label: "Main repository", url: firstUrl }],
      }));
    } else {
      const existing = draft.repositories.filter((r) => r.url.trim());
      setDraft((c) => ({
        ...c,
        architecture_type: "multiple",
        repositories:
          existing.length >= 2
            ? existing
            : [
                { role: "frontend", label: "Frontend app", url: existing[0]?.url ?? "" },
                { role: "backend", label: "Backend API", url: "" },
              ],
      }));
    }
  };

  const applyPresetRepoCount = (count: 2 | 3) => {
    setAnalysis(null);
    const current = draft.repositories;
    if (count === 2) {
      set("repositories", [
        current[0] ?? { role: "frontend", label: "Frontend app", url: "" },
        current[1] ?? { role: "backend", label: "Backend API", url: "" },
      ]);
    } else {
      set("repositories", [
        current[0] ?? { role: "frontend", label: "Frontend app", url: "" },
        current[1] ?? { role: "backend", label: "Backend API", url: "" },
        current[2] ?? { role: "admin", label: "Admin panel", url: "" },
      ]);
    }
  };

  const updateRepo = (index: number, patch: Partial<RepoDraft>) => {
    setDraft((c) => {
      const next = [...c.repositories];
      next[index] = { ...next[index], ...patch };
      return { ...c, repositories: next };
    });
  };

  const addRepo = () => {
    if (draft.repositories.length >= 6) {
      toast.error("Maximum 6 repositories supported per project.");
      return;
    }
    set("repositories", [
      ...draft.repositories,
      { role: "other", label: "", url: "" },
    ]);
  };

  const removeRepo = (index: number) => {
    if (draft.repositories.length <= 1) return;
    set(
      "repositories",
      draft.repositories.filter((_, i) => i !== index),
    );
  };

  const runLiveAnalysis = async (): Promise<SourceAnalysisResponse | null> => {
    const validRepos: RepoEntryPayload[] = draft.repositories
      .filter((r) => r.url.trim())
      .map((r) => ({
        url: r.url.trim(),
        role: r.role,
        label: r.label.trim() || undefined,
      }));

    if (!validRepos.length) {
      toast.error("Enter at least one public GitHub repository URL first.");
      return null;
    }

    for (const r of validRepos) {
      if (!/^https?:\/\/(www\.)?github\.com\/[^/\s]+\/[^/\s]+/i.test(r.url)) {
        toast.error(`Invalid GitHub URL: ${r.url}`);
        return null;
      }
    }

    try {
      const result = await analyze.mutateAsync({
        repositories: validRepos,
        live_url: draft.live_url.trim() || undefined,
      });
      setAnalysis(result);
      setAnalyzedFingerprint(currentSourceFingerprint);

      // Auto-suggest detected stack if technologies field is empty
      if (!draft.technologies.trim() && result.detected_technologies.length) {
        set("technologies", result.detected_technologies.join("\n"));
      }

      if (result.all_accessible) {
        toast.success("Repositories verified! Ready to proceed.");
      } else {
        toast.error("One or more repositories could not be accessed. Check the details below.");
      }
      return result;
    } catch (error) {
      toast.error(describeError(error));
      return null;
    }
  };

  const handleNextFromStep0 = async () => {
    const filledRepos = draft.repositories.filter((r) => r.url.trim());
    if (!filledRepos.length) {
      toast.error("Add your GitHub repository link first.");
      return;
    }
    if (!draft.demo_video_url.trim()) {
      toast.error("Add a recording of your project running.");
      return;
    }

    // If not yet verified or URLs changed, run live analysis automatically before moving forward!
    if (!analysis || analyzedFingerprint !== currentSourceFingerprint) {
      const res = await runLiveAnalysis();
      if (!res || !res.all_accessible) return;
    } else if (!analysis.all_accessible) {
      toast.error("Fix the inaccessible repository URLs before continuing.");
      return;
    }

    setStep(1);
  };

  const toDiagram = (value: DiagramDraft): Diagram =>
    value.kind === "mermaid"
      ? { kind: "mermaid", mermaid: value.mermaid }
      : { kind: "image", asset_id: value.assetId };

  const incomplete = (): string | null => {
    const filledRepos = draft.repositories.filter((r) => r.url.trim());
    if (!filledRepos.length) return "Add at least one GitHub repository link.";
    if (!draft.demo_video_url.trim()) return "Add a recording of the project running.";
    if (draft.purpose.trim().length < 40) return "Describe the project's purpose in a little more detail (min 40 chars).";
    if (!toLines(draft.technologies).length) return "List the technologies you used.";
    if (draft.architecture_text.trim().length < 40) return "Describe your architecture (min 40 chars).";
    if (draft.data_flow_text.trim().length < 40) return "Describe your data flow (min 40 chars).";
    if (!toLines(draft.use_cases).length) return "Give at least one use case.";
    if (draft.benefits.trim().length < 40) return "Describe the benefit of the project (min 40 chars).";
    for (const [label, value] of [
      ["architecture", draft.architecture],
      ["data flow", draft.dataFlow],
    ] as const) {
      if (value.kind === "mermaid" && !value.mermaid.trim())
        return `Add your ${label} diagram, or switch it to an image upload.`;
      if (value.kind === "image" && !value.assetId)
        return `Upload your ${label} diagram image.`;
    }
    if (!archive) return "Upload your project source as a .zip file.";
    return null;
  };

  const handleArchive = async (file: File | undefined) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".zip")) {
      toast.error("Please choose a valid .zip archive file.");
      return;
    }
    if (file.size > MAX_ARCHIVE_BYTES) {
      toast.error("The .zip file is larger than 50 MB. Exclude node_modules, .venv, .git, and build folders before zipping — your full code is still read from your GitHub repos.");
      return;
    }
    try {
      const uploaded = await uploadSourceArchive(enrollmentId, file);
      setArchive(uploaded);
      try {
        window.localStorage.setItem(archiveKey, JSON.stringify(uploaded));
      } catch {
        // Non-fatal.
      }
      toast.success("Source archive uploaded and verified!");
    } catch (error) {
      toast.error(describeError(error));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const problem = incomplete();
    if (problem) {
      toast.error(problem);
      return;
    }

    const repos: RepoEntryPayload[] = draft.repositories
      .filter((r) => r.url.trim())
      .map((r) => ({
        url: r.url.trim(),
        role: r.role,
        label: r.label.trim() || undefined,
      }));

    const payload: SubmissionPayload = {
      repo_url: repos[0].url,
      repositories: repos,
      project_architecture_type: draft.architecture_type,
      live_url: draft.live_url.trim() || undefined,
      demo_video_url: draft.demo_video_url.trim(),
      purpose: draft.purpose.trim(),
      technologies: toLines(draft.technologies),
      architecture_text: draft.architecture_text.trim(),
      architecture_diagram: toDiagram(draft.architecture),
      data_flow_text: draft.data_flow_text.trim(),
      data_flow_diagram: toDiagram(draft.dataFlow),
      use_cases: toLines(draft.use_cases),
      benefits: draft.benefits.trim(),
      notes: draft.notes.trim() || undefined,
    };

    try {
      await submit.mutateAsync(payload);
      window.localStorage.removeItem(storageKey);
      window.localStorage.removeItem(archiveKey);
      toast.success("Submitted! Our AI engine is analyzing your repositories, zip archive, and live deployment now.");
    } catch (error) {
      toast.error(describeError(error));
    }
  };

  return (
    <section className="rounded-3xl border border-border bg-card p-7 shadow-sm">
      <h2 className="font-display text-lg font-semibold text-foreground">
        {resubmitting ? "Submit again" : "Submit your project"}
      </h2>

      {resubmitting ? (
        <p className="mt-4 rounded-2xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          Your previous submission is saved and a reviewer can still see it.
          Submitting again replaces it and restarts the automated read.
        </p>
      ) : null}

      <ol className="mt-6 flex flex-wrap gap-2">
        {STEPS.map((label, index) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => setStep(index)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                step === index
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              {index + 1}. {label}
            </button>
          </li>
        ))}
      </ol>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {step === 0 ? (
          <>
            {/* Interactive project structure question */}
            <div className="rounded-2xl border border-border bg-muted/20 p-5">
              <span className="block text-sm font-medium text-foreground">
                How is your project codebase arranged on GitHub?
              </span>
              <p className="mt-1 text-xs text-muted-foreground">
                Let us know whether all code sits in one repository or is split across multiple repos (e.g. Frontend + Backend + Admin).
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => switchArchitectureType("single")}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    draft.architecture_type === "single"
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border bg-background hover:bg-accent/50"
                  }`}
                >
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <GitBranch className="size-4 text-primary" />
                    Single Repository (Monorepo)
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Everything lives together in 1 public GitHub repo.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => switchArchitectureType("multiple")}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    draft.architecture_type === "multiple"
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border bg-background hover:bg-accent/50"
                  }`}
                >
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <GitBranch className="size-4 text-primary" />
                    Multiple Repositories
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Separate repos for Frontend, Backend, Admin Panel, or Mobile app.
                  </p>
                </button>
              </div>

              {draft.architecture_type === "multiple" ? (
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                  <span className="text-xs font-medium text-muted-foreground">Quick presets:</span>
                  <button
                    type="button"
                    onClick={() => applyPresetRepoCount(2)}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground hover:bg-accent"
                  >
                    2 Repos (Frontend + Backend)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPresetRepoCount(3)}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground hover:bg-accent"
                  >
                    3 Repos (Frontend + Backend + Admin)
                  </button>
                </div>
              ) : null}
            </div>

            {/* Dynamic Repository URL Inputs */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  GitHub {draft.architecture_type === "single" ? "repository" : "repositories"}
                </span>
                {draft.architecture_type === "multiple" && draft.repositories.length < 6 ? (
                  <button
                    type="button"
                    onClick={addRepo}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-foreground hover:bg-accent"
                  >
                    <Plus className="size-3.5" />
                    Add repository
                  </button>
                ) : null}
              </div>

              {draft.repositories.map((repo, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-border bg-background/50 p-4 space-y-3"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    {draft.architecture_type === "multiple" ? (
                      <select
                        value={repo.role}
                        onChange={(e) => updateRepo(index, { role: e.target.value })}
                        className="rounded-lg border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground outline-none focus-visible:border-primary"
                      >
                        {REPO_ROLES.map((r) => (
                          <option key={r.value} value={r.value}>
                            {r.label}
                          </option>
                        ))}
                      </select>
                    ) : null}

                    {draft.architecture_type === "multiple" ? (
                      <input
                        type="text"
                        value={repo.label}
                        onChange={(e) => updateRepo(index, { label: e.target.value })}
                        placeholder="Short label (optional, e.g. Storefront UI)"
                        className="flex-1 min-w-[160px] rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground outline-none focus-visible:border-primary"
                      />
                    ) : null}

                    {draft.architecture_type === "multiple" && draft.repositories.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeRepo(index)}
                        className="ml-auto text-muted-foreground hover:text-destructive p-1"
                        title="Remove repository"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    ) : null}
                  </div>

                  <input
                    type="url"
                    required
                    value={repo.url}
                    onChange={(e) => updateRepo(index, { url: e.target.value })}
                    placeholder="https://github.com/your-username/your-repository"
                    className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus-visible:border-primary"
                  />
                </div>
              ))}
              <p className="text-xs text-muted-foreground">
                All repositories must be public so our AI verification system can read files, commits, and structure.
              </p>
            </div>

            <Field
              label="Deployed / Live URL"
              optional
              hint="If hosted (Vercel, Render, Netlify, Railway, etc.), we inspect the live URL and verify it matches your repositories."
            >
              <input
                type="url"
                value={draft.live_url}
                onChange={(event) => set("live_url", event.target.value)}
                placeholder="https://your-project.vercel.app"
                className={inputClass}
              />
            </Field>

            {/* Instant Pre-Check Verify Button + Live Results Card */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <SearchCheck className="size-4 text-primary" />
                    Instant Source & Live URL Verification
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Inspects your GitHub repos and live website right now to verify accessibility and detect your tech stack before you continue.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void runLiveAnalysis()}
                  disabled={analyze.isPending}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
                >
                  {analyze.isPending ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <SearchCheck className="size-3.5" />
                  )}
                  {analyze.isPending ? "Analyzing..." : "Analyze sources now"}
                </button>
              </div>

              {analysis ? (
                <div className="mt-4 space-y-3 border-t border-primary/10 pt-4">
                  {analysis.repos.map((r, i) => (
                    <div
                      key={i}
                      className="flex flex-wrap items-start justify-between gap-2 rounded-xl border border-border bg-card p-3 text-xs"
                    >
                      <div className="flex items-start gap-2.5">
                        {r.accessible ? (
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                        ) : (
                          <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                        )}
                        <div>
                          <p className="font-semibold text-foreground">
                            [{r.role.toUpperCase()}] {r.owner && r.name ? `${r.owner}/${r.name}` : r.url}
                          </p>
                          {r.accessible ? (
                            <p className="mt-0.5 text-muted-foreground">
                              {r.file_count} files • {r.commit_count} commits ({r.distinct_commit_days} days) • Languages:{" "}
                              {Object.keys(r.languages).slice(0, 4).join(", ") || "N/A"}
                            </p>
                          ) : (
                            <p className="mt-0.5 text-destructive">{r.error}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {analysis.live_site ? (
                    <div className="flex items-start gap-2.5 rounded-xl border border-border bg-card p-3 text-xs">
                      {analysis.live_site.reachable && !analysis.live_site.is_placeholder_or_parked ? (
                        <Globe className="mt-0.5 size-4 shrink-0 text-success" />
                      ) : (
                        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" />
                      )}
                      <div>
                        <p className="font-semibold text-foreground">
                          Live Site: {analysis.live_site.title || analysis.live_site.final_url}
                        </p>
                        <p className="mt-0.5 text-muted-foreground">
                          {analysis.live_site.reachable
                            ? `HTTP ${analysis.live_site.status_code} • Detected: ${analysis.live_site.detected_tech.join(", ") || "Web page"}`
                            : analysis.live_site.error}
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {analysis.warnings.length ? (
                    <div className="rounded-xl border border-warning/30 bg-warning/10 p-3 text-xs text-foreground space-y-1">
                      <p className="font-semibold flex items-center gap-1.5">
                        <AlertTriangle className="size-3.5 text-warning" />
                        Inspection notes
                      </p>
                      <ul className="list-disc pl-4 text-muted-foreground space-y-0.5">
                        {analysis.warnings.map((w, idx) => (
                          <li key={idx}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>

            <Field
              label="Recording of it running locally / demo video"
              hint="An unlisted YouTube, Loom or Google Drive link showing your project starting and working end-to-end."
            >
              <input
                type="url"
                required
                value={draft.demo_video_url}
                onChange={(event) => set("demo_video_url", event.target.value)}
                placeholder="https://youtu.be/..."
                className={inputClass}
              />
            </Field>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <Field label="Purpose" hint="What problem does this solve, and for whom?">
              <textarea
                rows={4}
                value={draft.purpose}
                onChange={(event) => set("purpose", event.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Technologies used" hint="One per line (auto-detected languages pre-filled if empty).">
              <textarea
                rows={5}
                value={draft.technologies}
                onChange={(event) => set("technologies", event.target.value)}
                placeholder={"React\nFastAPI\nMongoDB"}
                className={inputClass}
              />
            </Field>

            <Field
              label="Architecture"
              hint="The pieces, what each repository/service is responsible for, and why you split them that way."
            >
              <textarea
                rows={6}
                value={draft.architecture_text}
                onChange={(event) => set("architecture_text", event.target.value)}
                className={inputClass}
              />
            </Field>

            <Field
              label="Data flow"
              hint="Follow one piece of data from where it enters the frontend to where it is persisted and returned."
            >
              <textarea
                rows={6}
                value={draft.data_flow_text}
                onChange={(event) => set("data_flow_text", event.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Use cases" hint="One per line. Who does what, and what they get.">
              <textarea
                rows={4}
                value={draft.use_cases}
                onChange={(event) => set("use_cases", event.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Benefit" hint="What is measurably better because this exists?">
              <textarea
                rows={4}
                value={draft.benefits}
                onChange={(event) => set("benefits", event.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Anything else the reviewer should know" optional>
              <textarea
                rows={3}
                value={draft.notes}
                onChange={(event) => set("notes", event.target.value)}
                placeholder="Trade-offs, things you ran out of time for, how to run it locally."
                className={inputClass}
              />
            </Field>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <DiagramField
              label="Architecture diagram"
              enrollmentId={enrollmentId}
              value={draft.architecture}
              onChange={(value) => set("architecture", value)}
            />
            <DiagramField
              label="Data flow diagram"
              enrollmentId={enrollmentId}
              value={draft.dataFlow}
              onChange={(value) => set("dataFlow", value)}
            />
          </>
        ) : null}

        {step === 3 ? (
          <ArchiveField archive={archive} onPick={handleArchive} />
        ) : null}

        <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
          {step > 0 ? (
            <button type="button" onClick={() => setStep(step - 1)} className={secondaryClass}>
              Back
            </button>
          ) : null}
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              disabled={analyze.isPending}
              onClick={() => {
                if (step === 0) {
                  void handleNextFromStep0();
                } else {
                  setStep(step + 1);
                }
              }}
              className={primaryClass}
            >
              {analyze.isPending ? <Loader2 className="size-4 animate-spin" /> : null}
              {step === 0 ? "Verify & Next" : "Next"}
            </button>
          ) : (
            <button type="submit" disabled={submit.isPending} className={primaryClass}>
              {submit.isPending ? <Loader2 className="size-4 animate-spin" /> : null}
              Submit for review
            </button>
          )}
          <p className="text-xs text-muted-foreground">Your draft is auto-saved locally as you type.</p>
        </div>
      </form>
    </section>
  );
}

const inputClass =
  "mt-2 w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-primary";
const primaryClass =
  "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60";
const secondaryClass =
  "inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent";

function Field({
  label,
  hint,
  optional,
  children,
}: {
  label: string;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="block text-sm font-medium text-foreground">
        {label}
        {optional ? <span className="font-normal text-muted-foreground"> (optional)</span> : null}
      </span>
      {children}
      {hint ? <p className="mt-2 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function DiagramField({
  label,
  enrollmentId,
  value,
  onChange,
}: {
  label: string;
  enrollmentId: string;
  value: DiagramDraft;
  onChange: (value: DiagramDraft) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const attachment = await uploadAttachment(enrollmentId, file);
      onChange({ ...value, assetId: attachment.asset_id, filename: attachment.filename });
      toast.success("Diagram uploaded");
    } catch (error) {
      toast.error(describeError(error));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="rounded-2xl border border-border p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <div className="flex gap-1 rounded-full border border-border p-0.5">
          {(["mermaid", "image"] as const).map((kind) => (
            <button
              key={kind}
              type="button"
              onClick={() => onChange({ ...value, kind })}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                value.kind === kind
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {kind === "mermaid" ? "Write it" : "Upload an image"}
            </button>
          ))}
        </div>
      </div>

      {value.kind === "mermaid" ? (
        <>
          <p className="mt-3 text-xs text-muted-foreground">
            Mermaid syntax. Writing it means our automated reviewer can read your diagram and ask architecture questions directly about it.
          </p>
          <textarea
            rows={8}
            value={value.mermaid}
            onChange={(event) => onChange({ ...value, mermaid: event.target.value })}
            placeholder={EXAMPLE_MERMAID}
            className={`${inputClass} font-mono text-xs`}
          />
          {value.mermaid.trim() ? (
            <div className="mt-4 rounded-xl border border-border bg-muted/30 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Preview
              </p>
              <MermaidDiagram source={value.mermaid} />
            </div>
          ) : null}
        </>
      ) : (
        <>
          <p className="mt-3 text-xs text-muted-foreground">
            PNG, JPEG or WebP, up to 10 MB. Export from draw.io, Excalidraw, or Figma.
          </p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Upload className="size-4" />
            )}
            {value.assetId ? "Replace image" : "Choose image"}
          </button>
          {value.filename ? (
            <p className="mt-2 text-xs text-muted-foreground">Uploaded: {value.filename}</p>
          ) : null}
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(event) => void handleFile(event.target.files?.[0])}
            className="hidden"
          />
        </>
      )}
    </div>
  );
}

const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

function ArchiveField({
  archive,
  onPick,
}: {
  archive: SourceArchive | null;
  onPick: (file: File | undefined) => Promise<void>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const choose = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      await onPick(file);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="rounded-2xl border border-border p-5">
      <span className="text-sm font-medium text-foreground">Project source archive (.zip)</span>
      <p className="mt-3 text-xs text-muted-foreground">
        Upload your project source code as a single <code>.zip</code>, up to 50 MB. The
        automated reviewer reads it alongside your GitHub repositories and cross-checks
        file trees, manifests, and code consistency — your full code is still read from
        your GitHub repos, so the zip is a supporting copy. Exclude{" "}
        <code>node_modules</code>, <code>.git</code>, build output, and <code>.venv</code>{" "}
        to stay under the limit.
      </p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent disabled:opacity-60"
      >
        {uploading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <FileArchive className="size-4" />
        )}
        {uploading
          ? "Uploading & inspecting .zip..."
          : archive
            ? "Replace .zip archive"
            : "Choose .zip archive"}
      </button>
      {archive ? (
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-success/30 bg-success/5 px-3.5 py-2.5 text-xs text-foreground">
          <CheckCircle2 className="size-4 shrink-0 text-success" />
          <span>
            Verified & stored: <strong>{archive.filename}</strong> ({formatBytes(archive.size_bytes)})
          </span>
        </div>
      ) : null}
      <input
        ref={inputRef}
        type="file"
        accept=".zip,application/zip,application/x-zip-compressed,application/octet-stream"
        onChange={(event) => void choose(event.target.files?.[0])}
        className="hidden"
      />
    </div>
  );
}
