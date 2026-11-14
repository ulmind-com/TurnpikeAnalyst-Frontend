import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Download, Loader2 } from "lucide-react";

import { GoogleSignInButton } from "@/components/internship/google-sign-in-button";
import { StatusBadge, describeDeadline } from "@/components/internship/status";
import { useSession } from "@turnpike/shared/hooks/use-auth";
import { API_BASE_URL } from "@turnpike/shared/constants/config";
import {
  useMyCertificates,
  useMyEnrollments,
} from "@turnpike/shared/hooks/use-internship";

export const Route = createFileRoute("/_site/internship/dashboard/")({
  // The session lives in browser storage, so this page is client-rendered.
  ssr: false,
  head: () => ({
    meta: [
      { title: "My internship — Turnpike Analyst" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { isAuthenticated, hydrated, user } = useSession();
  const enrollments = useMyEnrollments(isAuthenticated);
  const certificates = useMyCertificates(isAuthenticated);

  if (!hydrated) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center sm:px-8">
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Sign in to see your projects
        </h1>
        <p className="mt-2 text-muted-foreground">
          Your intern profile is tied to your Google account.
        </p>
        <div className="mt-6 flex justify-center">
          <GoogleSignInButton />
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {user?.full_name ? `Hello, ${user.full_name.split(" ")[0]}` : "My internship"}
        </h1>
        <p className="mt-3 text-muted-foreground">
          Your projects, where each one stands, and anything that needs you.
        </p>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-foreground">Projects</h2>

          {enrollments.isLoading ? (
            <div className="mt-4 h-28 rounded-3xl border border-border bg-muted/40" />
          ) : !enrollments.data?.length ? (
            <div className="mt-4 rounded-3xl border border-border bg-card p-7">
              <p className="text-sm text-muted-foreground">
                You have not started a project yet.
              </p>
              <Link
                to="/internship"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Browse the projects
                <ArrowRight className="size-4" />
              </Link>
            </div>
          ) : (
            <ul className="mt-4 space-y-4">
              {enrollments.data.map((enrollment) => (
                <li key={enrollment._id}>
                  <Link
                    to="/internship/dashboard/$enrollmentId"
                    params={{ enrollmentId: enrollment._id }}
                    className="group flex flex-col gap-4 rounded-3xl border border-border bg-card p-7 shadow-sm transition-colors hover:border-primary/50 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {enrollment.track_title}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">
                        {describeDeadline(enrollment)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <StatusBadge status={enrollment.status} />
                      <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {certificates.data?.length ? (
          <section className="mt-12">
            <h2 className="font-display text-lg font-semibold text-foreground">Certificates</h2>
            <ul className="mt-4 space-y-3">
              {certificates.data.map((certificate) => (
                <li
                  key={certificate._id}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-foreground">{certificate.track_title}</p>
                    <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                      {certificate.certificate_number}
                      {certificate.revoked ? " · revoked" : ""}
                    </p>
                  </div>
                  {certificate.revoked ? null : (
                    <a
                      href={`${API_BASE_URL}${certificate.pdf_url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                    >
                      <Download className="size-4" />
                      Download PDF
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}
