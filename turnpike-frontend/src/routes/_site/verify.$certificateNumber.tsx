import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Loader2, ShieldX } from "lucide-react";

import { useVerifyCertificate } from "@turnpike/shared/hooks/use-internship";

export const Route = createFileRoute("/_site/verify/$certificateNumber")({
  head: ({ params }) => ({
    meta: [
      { title: `Verify ${params.certificateNumber} — Turnpike Analyst` },
      {
        name: "description",
        content:
          "Check whether a Turnpike Analyst internship certificate is genuine and still valid.",
      },
    ],
  }),
  component: VerifyCertificate,
});

function VerifyCertificate() {
  const { certificateNumber } = Route.useParams();
  const verification = useVerifyCertificate(certificateNumber);

  return (
    <div className="px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Certificate verification
        </p>
        <h1 className="font-display mt-3 font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {certificateNumber}
        </h1>

        {verification.isLoading ? (
          <div className="mt-10 flex items-center gap-3 rounded-3xl border border-border bg-card p-7">
            <Loader2 className="size-5 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Checking the register…</p>
          </div>
        ) : verification.isError ? (
          <div className="mt-10 rounded-3xl border border-destructive/30 bg-destructive/5 p-7">
            <ShieldX className="size-8 text-destructive" aria-hidden />
            <h2 className="font-display mt-4 text-xl font-semibold text-foreground">
              No certificate with that number
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Nothing in our register matches this number. Check the number was copied correctly,
              including the TA- prefix.
            </p>
          </div>
        ) : verification.data ? (
          <div
            className={`mt-10 rounded-3xl border p-7 ${
              verification.data.valid
                ? "border-success/40 bg-success/5"
                : "border-destructive/30 bg-destructive/5"
            }`}
          >
            {verification.data.valid ? (
              <BadgeCheck className="size-8 text-success" aria-hidden />
            ) : (
              <ShieldX className="size-8 text-destructive" aria-hidden />
            )}

            <h2 className="font-display mt-4 text-xl font-semibold text-foreground">
              {verification.data.valid
                ? "This certificate is genuine"
                : "This certificate has been revoked"}
            </h2>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex flex-wrap gap-2">
                <dt className="w-32 shrink-0 text-muted-foreground">Awarded to</dt>
                <dd className="font-medium text-foreground">
                  {verification.data.recipient_name}
                </dd>
              </div>
              <div className="flex flex-wrap gap-2">
                <dt className="w-32 shrink-0 text-muted-foreground">Project</dt>
                <dd className="font-medium text-foreground">{verification.data.track_title}</dd>
              </div>
              <div className="flex flex-wrap gap-2">
                <dt className="w-32 shrink-0 text-muted-foreground">Issued</dt>
                <dd className="text-foreground">
                  {new Date(verification.data.issued_at).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </dd>
              </div>
              <div className="flex flex-wrap gap-2">
                <dt className="w-32 shrink-0 text-muted-foreground">Issued by</dt>
                <dd className="text-foreground">{verification.data.issuer}</dd>
              </div>
            </dl>

            {verification.data.revoked ? (
              <p className="mt-6 rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
                This certificate was withdrawn after it was issued and should not be relied on.
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
