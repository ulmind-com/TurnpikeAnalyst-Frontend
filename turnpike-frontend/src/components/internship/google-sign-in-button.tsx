import { useNavigate } from "@tanstack/react-router";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { firebaseAuthMessage, isSocialCancel, useAppleLogin, useGoogleLogin } from "@turnpike/shared/hooks/use-auth";
import { AuthModal } from "@/components/auth/auth-modal";

/** Google's own mark, used only on the button that signs in with Google. */
export function GoogleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M21.6 12.2c0-.7-.1-1.3-.2-2H12v3.9h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.7 0 4.9-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2Z" fill="#FBBC05" />
      <path
        d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 0 0 3.1 7.4L6.4 10c.8-2.3 3-4.1 5.6-4.1Z"
        fill="#EA4335"
      />
    </svg>
  );
}

/** Apple's clean mark. */
export function AppleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 170 170" className={className} fill="currentColor" aria-hidden="true">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-6.53-9.89-11.66-21.64-15.4-35.25-3.74-13.6-5.61-26.21-5.61-37.82 0-14.99 3.82-27.42 11.45-37.31 7.63-9.89 17.1-14.94 28.41-15.15 4.58 0 9.89 1.25 15.93 3.75 6.04 2.5 10.23 3.81 12.57 3.93 1.96-.24 6.27-1.63 12.92-4.17 6.66-2.54 12.44-3.69 17.36-3.45 13.06.66 23.47 5.14 31.24 13.45-11.29 6.84-16.82 16.48-16.59 28.92.24 10.12 4.12 18.59 11.66 25.4 7.53 6.81 16.43 10.74 26.69 11.79-2.54 7.64-5.6 15.34-9.18 23.11zM119.22 31.84c0-7.39 2.65-14.3 7.95-20.73 5.3-6.43 11.87-10.42 19.71-11.96.24 1.13.36 2.38.36 3.75 0 7.39-2.73 14.51-8.19 21.36-5.46 6.85-12.08 10.87-19.83 12.06z" />
    </svg>
  );
}

export function GoogleSignInButton({
  redirectTo = "/internship/dashboard",
  label = "Continue with Google",
}: {
  redirectTo?: string;
  label?: string;
}) {
  const googleLogin = useGoogleLogin();
  const appleLogin = useAppleLogin();
  const navigate = useNavigate();
  const [busyAction, setBusyAction] = useState<"google" | "apple" | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleGoogle = async () => {
    setBusyAction("google");
    try {
      await googleLogin();
      toast.success("Signed in");
      void navigate({ href: redirectTo, replace: true });
    } catch (error) {
      if (!isSocialCancel(error)) toast.error(firebaseAuthMessage(error));
    } finally {
      setBusyAction(null);
    }
  };

  const handleApple = async () => {
    setBusyAction("apple");
    try {
      await appleLogin();
      toast.success("Signed in");
      void navigate({ href: redirectTo, replace: true });
    } catch (error) {
      if (!isSocialCancel(error)) toast.error(firebaseAuthMessage(error));
    } finally {
      setBusyAction(null);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
        <button
          type="button"
          onClick={handleGoogle}
          disabled={busyAction !== null}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full border border-border bg-card px-5 py-2.5 text-xs sm:text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-accent disabled:opacity-60"
        >
          {busyAction === "google" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <GoogleMark className="size-4" />
          )}
          <span>{label}</span>
        </button>

        <button
          type="button"
          onClick={handleApple}
          disabled={busyAction !== null}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full border border-border bg-card px-5 py-2.5 text-xs sm:text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-accent disabled:opacity-60"
        >
          {busyAction === "apple" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <AppleMark className="size-4" />
          )}
          <span>Continue with Apple</span>
        </button>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-dashed border-border/80 px-4 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
        >
          <Mail className="size-3.5" />
          <span>Email / Password</span>
        </button>
      </div>

      <AuthModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
