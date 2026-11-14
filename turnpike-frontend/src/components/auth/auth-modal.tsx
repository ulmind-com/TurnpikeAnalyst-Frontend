"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MailCheck,
  User,
  Building,
  ShieldCheck,
  BadgeCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  KeyRound,
} from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@turnpike/shared/components/ui/dialog";
import { Input } from "@turnpike/shared/components/ui/input";
import { Label } from "@turnpike/shared/components/ui/label";
import {
  describeError,
  firebaseAuthMessage,
  isSocialCancel,
  useGoogleLogin,
  useLogin,
  useSendRegisterCode,
  useVerifyRegister,
} from "@turnpike/shared/hooks/use-auth";

function GoogleMark({ className }: { className?: string }) {
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

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "signin" | "register";
}

const BRAND_POINTS = [
  { icon: BadgeCheck, title: "Verified credentials", body: "Blockchain-style certificate IDs you can share and verify." },
  { icon: ShieldCheck, title: "Enterprise-grade security", body: "Your projects and reviews stay private and encrypted." },
  { icon: Sparkles, title: "AI code reviews", body: "Practitioner-led feedback on every architectural submission." },
];

export function AuthModal({ open, onOpenChange, defaultTab = "signin" }: AuthModalProps) {
  const [tab, setTab] = useState<"signin" | "register">(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [loadingAction, setLoadingAction] = useState<"google" | "manual" | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sign In fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register (email-verified sign-up): two steps — details, then code+password.
  const [registerStep, setRegisterStep] = useState<"details" | "code">("details");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerCompany, setRegisterCompany] = useState("");
  const [registerCode, setRegisterCode] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [resendIn, setResendIn] = useState(0);

  const googleLogin = useGoogleLogin();
  const manualLogin = useLogin();
  const sendCode = useSendRegisterCode();
  const verifyAndCreate = useVerifyRegister();

  const busy = loadingAction !== null;

  // Resend cooldown ticker.
  useEffect(() => {
    if (resendIn <= 0) return;
    const id = window.setInterval(() => setResendIn((s) => (s <= 1 ? 0 : s - 1)), 1000);
    return () => window.clearInterval(id);
  }, [resendIn]);

  const handleGoogle = async () => {
    setErrorMessage(null);
    setLoadingAction("google");
    try {
      const res = await googleLogin();
      toast.success(`Welcome back, ${res.user.full_name || "there"}!`);
      onOpenChange(false);
    } catch (err) {
      // User closing the popup is not an error; a blocked popup falls back to
      // a redirect inside the hook and never rejects here.
      if (!isSocialCancel(err)) setErrorMessage(firebaseAuthMessage(err));
    } finally {
      setLoadingAction(null);
    }
  };

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
    setErrorMessage(null);
    setLoadingAction("manual");
    try {
      const res = await manualLogin(loginEmail.trim(), loginPassword);
      toast.success(`Welcome back, ${res.user.full_name || "there"}!`);
      onOpenChange(false);
    } catch (err) {
      setErrorMessage(describeError(err));
    } finally {
      setLoadingAction(null);
    }
  };

  // Register step 1: email the verification code.
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName.trim() || !registerEmail.trim()) {
      setErrorMessage("Please enter your name and email.");
      return;
    }
    setErrorMessage(null);
    setLoadingAction("manual");
    try {
      await sendCode(registerEmail.trim(), registerName.trim());
      setRegisterStep("code");
      setResendIn(45);
      toast.success(`We sent a 6-digit code to ${registerEmail.trim()}.`);
    } catch (err) {
      setErrorMessage(describeError(err));
    } finally {
      setLoadingAction(null);
    }
  };

  const handleResendCode = async () => {
    if (resendIn > 0 || busy) return;
    setErrorMessage(null);
    setLoadingAction("manual");
    try {
      await sendCode(registerEmail.trim(), registerName.trim());
      setResendIn(45);
      toast.success("A new code is on its way.");
    } catch (err) {
      setErrorMessage(describeError(err));
    } finally {
      setLoadingAction(null);
    }
  };

  // Register step 2: verify the code, set a password, create the account.
  const handleVerifyCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerCode.trim().length !== 6) {
      setErrorMessage("Enter the 6-digit code from your email.");
      return;
    }
    if (registerPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }
    setErrorMessage(null);
    setLoadingAction("manual");
    try {
      const res = await verifyAndCreate({
        email: registerEmail.trim(),
        code: registerCode.trim(),
        password: registerPassword,
        full_name: registerName.trim(),
        company: registerCompany.trim() || null,
      });
      toast.success(`Account created! Welcome, ${res.user.full_name}!`);
      onOpenChange(false);
    } catch (err) {
      setErrorMessage(describeError(err));
    } finally {
      setLoadingAction(null);
    }
  };

  const switchTab = (next: "signin" | "register") => {
    setTab(next);
    setErrorMessage(null);
    if (next === "register") setRegisterStep("details");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-1.5rem)] max-w-[940px] gap-0 overflow-hidden border border-border/70 bg-background p-0 shadow-[0_40px_120px_-32px_rgba(0,0,0,0.55)] sm:rounded-[28px]">
        <DialogHeader className="sr-only">
          <DialogTitle>Sign in to Turnpike Analyst</DialogTitle>
          <DialogDescription>
            Access your enrolled internship projects, AI code reviews, and verified certificates.
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-[1.05fr_1fr]">
          {/* ───────── Brand panel (desktop only) ───────── */}
          <aside className="relative hidden flex-col justify-between overflow-hidden bg-[#07120d] p-8 text-white md:flex">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-90"
              style={{
                background:
                  "radial-gradient(130% 120% at 0% 0%, rgba(16,185,129,0.38) 0%, rgba(6,20,15,0) 55%), radial-gradient(120% 120% at 100% 100%, rgba(45,212,191,0.28) 0%, rgba(6,20,15,0) 50%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                backgroundSize: "34px 34px",
              }}
            />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200 backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Turnpike Analyst Passport
              </div>
              <h2 className="mt-7 font-display text-[2rem] font-semibold leading-[1.12] tracking-tight">
                {tab === "signin" ? (
                  <>
                    Welcome back to your
                    <br />
                    <span className="text-emerald-300">enterprise workspace.</span>
                  </>
                ) : (
                  <>
                    Start your internship
                    <br />
                    <span className="text-emerald-300">journey with us.</span>
                  </>
                )}
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
                One passport for enrolled projects, AI-reviewed submissions, and verifiable
                credentials — built for regulated industries.
              </p>
            </div>

            <ul className="relative mt-8 space-y-4">
              {BRAND_POINTS.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
                    <Icon className="size-4.5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="text-xs leading-relaxed text-white/55">{body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="relative mt-8 flex items-center gap-3 border-t border-white/10 pt-5 text-xs text-white/55">
              <ShieldCheck className="size-4 text-emerald-300" />
              <span>SOC-aligned infrastructure · Your data stays encrypted</span>
            </div>
          </aside>

          {/* ───────── Form panel ───────── */}
          <div className="flex flex-col p-6 sm:p-8">
            {/* Tabs */}
            <div className="grid grid-cols-2 gap-1 rounded-2xl bg-muted/60 p-1 text-sm font-medium">
              {(["signin", "register"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => switchTab(t)}
                  className={`rounded-xl py-2 transition-all ${
                    tab === t
                      ? "bg-background text-foreground shadow-sm ring-1 ring-border/60"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t === "signin" ? "Sign in" : "Create account"}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                {tab === "signin" ? "Sign in to your account" : "Create your intern profile"}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {tab === "signin"
                  ? "Access your projects, reviews, and verified certificates."
                  : "Submit designs, get AI reviews, and earn verified credentials."}
              </p>
            </div>

            {errorMessage && (
              <div
                role="alert"
                aria-live="polite"
                className="mt-5 flex items-start gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 p-3 text-xs font-medium text-destructive"
              >
                <span className="mt-px grid size-4 shrink-0 place-items-center rounded-full bg-destructive/20 text-[10px] font-bold">
                  !
                </span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Social — Google only (Apple sign-in needs a paid Apple Developer
                account, so it is intentionally not offered). Hidden on the code
                step, where the person is mid-way through email sign-up. */}
            {(tab === "signin" || registerStep === "details") && (
              <>
                <button
                  type="button"
                  onClick={handleGoogle}
                  disabled={busy}
                  className="mt-5 flex h-11 w-full items-center justify-center gap-2.5 rounded-2xl border border-border bg-card text-sm font-semibold text-foreground shadow-sm transition-all hover:border-foreground/20 hover:bg-accent active:scale-[0.98] disabled:opacity-50"
                >
                  {loadingAction === "google" ? (
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  ) : (
                    <GoogleMark className="size-4 shrink-0" />
                  )}
                  <span>Continue with Google</span>
                </button>

                <div className="relative my-5 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/60" />
                  </div>
                  <span className="relative bg-background px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    or {tab === "signin" ? "continue" : "sign up"} with email
                  </span>
                </div>
              </>
            )}

            {tab === "signin" ? (
              <form onSubmit={handleManualLogin} className="space-y-4">
                <Field
                  id="signin-email"
                  label="Email address"
                  icon={Mail}
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  value={loginEmail}
                  onChange={setLoginEmail}
                />
                <PasswordField
                  id="signin-password"
                  label="Password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={loginPassword}
                  onChange={setLoginPassword}
                  show={showPassword}
                  onToggle={() => setShowPassword((s) => !s)}
                />
                <SubmitButton busy={loadingAction === "manual"} label="Sign in" />
              </form>
            ) : registerStep === "details" ? (
              <form onSubmit={handleSendCode} className="space-y-3.5">
                <Field
                  id="reg-name"
                  label="Full name"
                  required
                  icon={User}
                  placeholder="Your name"
                  value={registerName}
                  onChange={setRegisterName}
                />
                <Field
                  id="reg-email"
                  label="Email address"
                  required
                  icon={Mail}
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={registerEmail}
                  onChange={setRegisterEmail}
                />
                <Field
                  id="reg-company"
                  label="Company or university"
                  icon={Building}
                  placeholder="Optional"
                  value={registerCompany}
                  onChange={setRegisterCompany}
                />
                <SubmitButton busy={loadingAction === "manual"} label="Send verification code" />
              </form>
            ) : (
              <form onSubmit={handleVerifyCreate} className="space-y-4">
                <div className="flex items-start gap-3 rounded-2xl border border-primary/25 bg-primary/5 p-3">
                  <MailCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    We sent a 6-digit code to{" "}
                    <span className="font-semibold text-foreground">{registerEmail.trim()}</span>.
                    Enter it below and set a password to finish.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="reg-code" className="text-xs font-medium text-foreground/90">
                    Verification code <span className="text-primary">*</span>
                  </Label>
                  <div className="relative">
                    <KeyRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="reg-code"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      placeholder="______"
                      value={registerCode}
                      onChange={(e) => setRegisterCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="h-12 rounded-2xl border-border/70 pl-9 text-center text-lg font-semibold tracking-[0.5em]"
                    />
                  </div>
                  <div className="flex items-center justify-between pt-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        setRegisterStep("details");
                        setErrorMessage(null);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ArrowLeft className="size-3" />
                      Change email
                    </button>
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={resendIn > 0 || busy}
                      className="text-[11px] font-medium text-primary transition-colors hover:text-primary/80 disabled:text-muted-foreground"
                    >
                      {resendIn > 0 ? `Resend code in ${resendIn}s` : "Resend code"}
                    </button>
                  </div>
                </div>

                <PasswordField
                  id="reg-password"
                  label="Set a password"
                  required
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  value={registerPassword}
                  onChange={setRegisterPassword}
                  show={showPassword}
                  onToggle={() => setShowPassword((s) => !s)}
                />
                <SubmitButton busy={loadingAction === "manual"} label="Verify & create account" />
              </form>
            )}

            <p className="mt-5 text-center text-[11px] leading-relaxed text-muted-foreground">
              By continuing you agree to Turnpike Analyst&rsquo;s{" "}
              <span className="font-medium text-foreground/80">Terms of Service</span> and{" "}
              <span className="font-medium text-foreground/80">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ───────── Field primitives ───────── */

function Field({
  id,
  label,
  icon: Icon,
  type = "text",
  placeholder,
  autoComplete,
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-medium text-foreground/90">
        {label} {required && <span className="text-primary">*</span>}
      </Label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="h-11 rounded-2xl border-border/70 pl-9 text-sm"
        />
      </div>
    </div>
  );
}

function PasswordField({
  id,
  label,
  placeholder,
  autoComplete,
  value,
  onChange,
  show,
  onToggle,
  required,
}: {
  id: string;
  label: string;
  placeholder?: string;
  autoComplete?: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-medium text-foreground/90">
        {label} {required && <span className="text-primary">*</span>}
      </Label>
      <div className="relative">
        <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="h-11 rounded-2xl border-border/70 pl-9 pr-10 text-sm"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </div>
  );
}

function SubmitButton({ busy, label }: { busy: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={busy}
      className="group flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-foreground text-sm font-semibold text-background shadow-md transition-all hover:bg-foreground/90 active:scale-[0.99] disabled:opacity-50"
    >
      {busy ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <>
          <span>{label}</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </>
      )}
    </button>
  );
}
