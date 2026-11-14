import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Award,
  BadgeCheck,
  Building,
  CalendarDays,
  CheckCircle2,
  Download,
  FolderGit2,
  Loader2,
  LogOut,
  Mail,
  Pencil,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { StatusBadge, describeDeadline } from "@/components/internship/status";
import { API_BASE_URL } from "@turnpike/shared/constants/config";
import { useLogout, useSession, useUpdateProfile } from "@turnpike/shared/hooks/use-auth";
import { useMyCertificates, useMyEnrollments } from "@turnpike/shared/hooks/use-internship";
import { Input } from "@turnpike/shared/components/ui/input";
import { Label } from "@turnpike/shared/components/ui/label";
import { Textarea } from "@turnpike/shared/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@turnpike/shared/components/ui/avatar";

export const Route = createFileRoute("/_site/account")({
  ssr: false,
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: AccountPage,
});

function AccountPage() {
  const { user, isAuthenticated, hydrated } = useSession();
  const logout = useLogout("/");
  const updateProfile = useUpdateProfile();

  const enrollments = useMyEnrollments(isAuthenticated);
  const certificates = useMyCertificates(isAuthenticated);

  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (!user) return;
    setFullName(user.full_name || "");
    setTitle(user.title || "");
    setBio(user.bio || "");
    setPhone(user.phone || "");
    setCompany(user.company || "");
    setAvatarUrl(user.avatar_url || "");
  }, [user]);

  const approvedCount = useMemo(
    () => (enrollments.data ?? []).filter((e) => e.status === "APPROVED").length,
    [enrollments.data],
  );

  if (!hydrated) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center sm:px-8">
        <h1 className="font-display text-2xl font-semibold text-foreground">You&rsquo;re signed out</h1>
        <p className="mt-2 text-muted-foreground">
          Sign in from the top-right of the page to open your account.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Back to home
        </Link>
      </div>
    );
  }

  const initials = (user.full_name || "Intern")
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, { month: "short", year: "numeric" })
    : null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile.mutateAsync({
        full_name: fullName.trim(),
        title: title.trim() || null,
        bio: bio.trim() || null,
        phone: phone.trim() || null,
        company: company.trim() || null,
        avatar_url: avatarUrl.trim() || null,
      });
      toast.success("Profile updated.");
      setEditing(false);
    } catch {
      toast.error("Could not save your changes. Please try again.");
    }
  };

  const certHref = (pdfUrl: string) =>
    pdfUrl.startsWith("http") ? pdfUrl : `${API_BASE_URL}${pdfUrl}`;

  return (
    <div className="px-5 py-10 sm:px-8 lg:py-16">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        {/* ───────── Hero ───────── */}
        <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-card">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-90"
            style={{
              background:
                "radial-gradient(130% 120% at 0% 0%, var(--primary) 0%, transparent 42%), radial-gradient(120% 120% at 100% 0%, var(--brand-cyan, #22d3ee) 0%, transparent 45%)",
              opacity: 0.12,
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "34px 34px",
            }}
          />
          <div className="relative p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                <Sparkles className="size-3" />
                Turnpike Analyst Passport
              </span>
              <span className="rounded-full border border-border/70 bg-background/60 px-3 py-1 font-mono text-[11px] uppercase text-muted-foreground">
                {user.role || "CLIENT"}
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative">
                <Avatar className="size-20 rounded-2xl border-2 border-primary/40 shadow-lg ring-4 ring-primary/10">
                  <AvatarImage src={user.avatar_url || undefined} alt={user.full_name} className="object-cover" />
                  <AvatarFallback className="rounded-2xl bg-gradient-to-br from-primary to-cyan-600 text-xl font-bold text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute -bottom-1 -right-1 grid size-6 place-items-center rounded-full bg-emerald-500 text-white ring-2 ring-card">
                  <CheckCircle2 className="size-3.5" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {user.full_name}
                </h1>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Mail className="size-3.5 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  {user.title ? <span className="font-medium text-primary/90">{user.title}</span> : null}
                  {memberSince ? (
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="size-3" /> Member since {memberSince}
                    </span>
                  ) : null}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEditing((v) => !v)}
                className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-border/80 bg-background/70 px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-accent sm:self-auto"
              >
                {editing ? <X className="size-3.5" /> : <Pencil className="size-3.5" />}
                {editing ? "Close editor" : "Edit profile"}
              </button>
            </div>

            {/* Stat tiles */}
            <div className="mt-7 grid grid-cols-3 gap-3">
              <StatTile icon={FolderGit2} tint="text-primary" label="Projects" value={enrollments.data?.length ?? 0} />
              <StatTile icon={Award} tint="text-amber-500" label="Certificates" value={certificates.data?.length ?? 0} />
              <StatTile icon={BadgeCheck} tint="text-emerald-500" label="Approved" value={approvedCount} />
            </div>
          </div>
        </section>

        {/* ───────── Edit form ───────── */}
        {editing ? (
          <section className="rounded-3xl border border-border/70 bg-card p-6 sm:p-7">
            <h2 className="font-display text-lg font-semibold text-foreground">Edit your profile</h2>
            <form onSubmit={handleSave} className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldBlock label="Full name" required>
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required className="h-10 rounded-xl" />
                </FieldBlock>
                <FieldBlock label="Job title / role">
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Full Stack Developer" className="h-10 rounded-xl" />
                </FieldBlock>
              </div>
              <FieldBlock label="Bio">
                <Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} placeholder="Your stacks, interests, and background…" className="rounded-xl resize-none" />
              </FieldBlock>
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldBlock label="Company / university">
                  <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Optional" className="h-10 rounded-xl" />
                </FieldBlock>
                <FieldBlock label="Phone">
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Optional" className="h-10 rounded-xl" />
                </FieldBlock>
              </div>
              <FieldBlock label="Avatar image URL">
                <Input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://… image link" className="h-10 rounded-xl" />
              </FieldBlock>
              <div className="flex items-center justify-end gap-2 pt-1">
                <button type="button" onClick={() => setEditing(false)} className="rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateProfile.isPending}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {updateProfile.isPending ? <Loader2 className="size-4 animate-spin" /> : null}
                  Save changes
                </button>
              </div>
            </form>
          </section>
        ) : null}

        {/* ───────── About + details ───────── */}
        {!editing && (user.bio || user.company || user.phone) ? (
          <section className="grid gap-4 lg:grid-cols-2">
            {user.bio ? (
              <div className="rounded-3xl border border-border/70 bg-card p-5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">About</p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">{user.bio}</p>
              </div>
            ) : null}
            <div className="space-y-2 rounded-3xl border border-border/70 bg-card p-5 text-sm">
              {user.company ? (
                <DetailRow icon={Building} label="Company / University" value={user.company} />
              ) : null}
              {user.phone ? <DetailRow icon={Phone} label="Phone" value={user.phone} /> : null}
              <div className="flex items-center justify-between py-1">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <ShieldCheck className="size-3.5" /> Security
                </span>
                <span className="inline-flex items-center gap-1 font-medium text-emerald-500">
                  <CheckCircle2 className="size-3" /> Active &amp; verified
                </span>
              </div>
            </div>
          </section>
        ) : null}

        {/* ───────── Projects + Certificates ───────── */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border/70 bg-card p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">My projects</h2>
              <Link to="/internship" className="text-xs font-semibold text-primary hover:underline">
                Browse projects
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {enrollments.isLoading ? (
                <RowSkeleton />
              ) : enrollments.data?.length ? (
                enrollments.data.map((e) => (
                  <Link
                    key={e._id}
                    to="/internship/dashboard/$enrollmentId"
                    params={{ enrollmentId: e._id }}
                    className="block rounded-2xl border border-border/70 bg-background/50 p-4 transition-colors hover:border-primary/40 hover:bg-accent"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="min-w-0 flex-1 truncate font-medium text-foreground">{e.project_title}</p>
                      <StatusBadge status={e.status} />
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground">{describeDeadline(e)}</p>
                  </Link>
                ))
              ) : (
                <EmptyState
                  icon={FolderGit2}
                  text="No projects yet."
                  cta={{ to: "/internship", label: "Start an internship project" }}
                />
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-border/70 bg-card p-5 sm:p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">My certificates</h2>
            <div className="mt-4 space-y-3">
              {certificates.isLoading ? (
                <RowSkeleton />
              ) : certificates.data?.length ? (
                certificates.data.map((c) => (
                  <div key={c._id} className="rounded-2xl border border-border/70 bg-background/50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{c.track_title || "Internship certificate"}</p>
                        <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{c.certificate_number}</p>
                      </div>
                      {c.revoked ? (
                        <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold text-destructive">
                          Revoked
                        </span>
                      ) : (
                        <Award className="size-4 shrink-0 text-amber-500" />
                      )}
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Link
                        to="/verify/$certificateNumber"
                        params={{ certificateNumber: c.certificate_number }}
                        className="inline-flex items-center gap-1 rounded-lg border border-border/80 bg-background px-2.5 py-1 text-[11px] font-semibold text-foreground hover:bg-accent"
                      >
                        <BadgeCheck className="size-3" /> Verify
                      </Link>
                      {c.pdf_url ? (
                        <a
                          href={certHref(c.pdf_url)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-border/80 bg-background px-2.5 py-1 text-[11px] font-semibold text-foreground hover:bg-accent"
                        >
                          <Download className="size-3" /> PDF
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState
                  icon={Award}
                  text="No certificates yet — finish a project to earn one."
                />
              )}
            </div>
          </div>
        </section>

        {/* ───────── Sign out ───────── */}
        <section className="flex items-center justify-between rounded-3xl border border-border/70 bg-card px-5 py-4">
          <span className="text-xs text-muted-foreground">Signed in as {user.email}</span>
          <button
            type="button"
            onClick={() => logout()}
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </section>
      </div>
    </div>
  );
}

function StatTile({
  icon: Icon,
  tint,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tint: string;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background/60 p-3.5">
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="text-[11px] font-medium">{label}</span>
        <Icon className={`size-4 ${tint}`} />
      </div>
      <div className="mt-2 text-2xl font-bold tracking-tight text-foreground">{value}</div>
    </div>
  );
}

function FieldBlock({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-foreground/90">
        {label} {required ? <span className="text-primary">*</span> : null}
      </Label>
      {children}
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="size-3.5" /> {label}
      </span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

function RowSkeleton() {
  return (
    <div className="space-y-3">
      {[0, 1].map((i) => (
        <div key={i} className="h-16 animate-pulse rounded-2xl border border-border/60 bg-muted/40" />
      ))}
    </div>
  );
}

function EmptyState({
  icon: Icon,
  text,
  cta,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  cta?: { to: "/internship"; label: string };
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border/70 p-6 text-center">
      <Icon className="mx-auto size-6 text-muted-foreground/60" />
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
      {cta ? (
        <Link to={cta.to} className="mt-3 inline-block text-xs font-semibold text-primary hover:underline">
          {cta.label}
        </Link>
      ) : null}
    </div>
  );
}
