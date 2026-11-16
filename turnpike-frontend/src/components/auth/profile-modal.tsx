"use client";

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Award,
  Building,
  CheckCircle2,
  FolderGit2,
  Globe,
  Loader2,
  LogOut,
  Mail,
  Phone,
  Shield,
  Sparkles,
  User,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@turnpike/shared/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@turnpike/shared/components/ui/avatar";
import { Input } from "@turnpike/shared/components/ui/input";
import { Label } from "@turnpike/shared/components/ui/label";
import { Textarea } from "@turnpike/shared/components/ui/textarea";
import { useLogout, useSession, useUpdateProfile } from "@turnpike/shared/hooks/use-auth";
import { useMyCertificates, useMyEnrollments } from "@turnpike/shared/hooks/use-internship";

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const { user, isAuthenticated } = useSession();
  const logout = useLogout("/");
  const updateProfile = useUpdateProfile();

  const enrollmentsQuery = useMyEnrollments(isAuthenticated);
  const certificatesQuery = useMyCertificates(isAuthenticated);

  const [activeTab, setActiveTab] = useState<"overview" | "edit">("overview");

  // Form states
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || "");
      setTitle(user.title || "");
      setBio(user.bio || "");
      setPhone(user.phone || "");
      setCompany(user.company || "");
      setAvatarUrl(user.avatar_url || "");
    }
  }, [user]);

  if (!user) return null;

  const initials = (user.full_name || "Intern")
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

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
      toast.success("Profile updated successfully!");
      setActiveTab("overview");
    } catch {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const projectCount = enrollmentsQuery.data?.length ?? 0;
  const certificateCount = certificatesQuery.data?.length ?? 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[540px] p-0 overflow-hidden border border-border/80 bg-background/95 backdrop-blur-2xl shadow-2xl rounded-3xl">
        {/* Profile Banner */}
        <div className="relative p-6 pb-4 border-b border-border/60 bg-gradient-to-br from-primary/15 via-cyan-500/10 to-transparent">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
              <Sparkles className="size-3" />
              Verified Identity
            </span>
            <span className="text-[11px] font-mono text-muted-foreground uppercase">
              Role: {user.role || "CLIENT"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Avatar className="size-16 rounded-2xl border-2 border-primary/40 shadow-lg ring-4 ring-primary/10">
                <AvatarImage src={user.avatar_url || undefined} alt={user.full_name} className="object-cover" />
                <AvatarFallback className="rounded-2xl bg-gradient-to-br from-primary to-cyan-600 text-white font-bold text-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 size-5 rounded-full bg-emerald-500 ring-2 ring-background flex items-center justify-center text-white text-[10px]">
                <CheckCircle2 className="size-3.5" />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight text-foreground truncate">
                  {user.full_name}
                </h2>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 truncate mt-0.5">
                <Mail className="size-3 shrink-0" />
                {user.email}
              </p>
              {user.title && (
                <p className="text-xs font-medium text-primary/90 mt-1 truncate">
                  {user.title}
                </p>
              )}
            </div>
          </div>

          {/* Navigation Pill tabs */}
          <div className="mt-5 grid grid-cols-2 p-1 rounded-2xl bg-muted/60 border border-border/50 text-xs font-medium">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`py-1.5 rounded-xl transition-all ${
                activeTab === "overview"
                  ? "bg-background text-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Overview & Stats
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("edit")}
              className={`py-1.5 rounded-xl transition-all ${
                activeTab === "edit"
                  ? "bg-background text-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 pt-5">
          {activeTab === "overview" ? (
            <div className="space-y-5">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-border/70 bg-card/60 p-3.5">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[11px] font-medium">Internship Projects</span>
                    <FolderGit2 className="size-4 text-primary" />
                  </div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                    {projectCount}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Enrolled / Submitted</p>
                </div>

                <div className="rounded-2xl border border-border/70 bg-card/60 p-3.5">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[11px] font-medium">Verified Credentials</span>
                    <Award className="size-4 text-amber-500" />
                  </div>
                  <div className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                    {certificateCount}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Issued Certificates</p>
                </div>
              </div>

              {/* Bio block if present */}
              {user.bio ? (
                <div className="rounded-2xl border border-border/60 bg-muted/30 p-3.5 text-xs text-foreground/90 leading-relaxed">
                  <span className="block font-semibold text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                    About
                  </span>
                  {user.bio}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-border/70 p-3 text-center text-xs text-muted-foreground">
                  No bio added yet. Click &quot;Edit Profile&quot; to customize your intern bio.
                </div>
              )}

              {/* Detail Items */}
              <div className="space-y-2 rounded-2xl border border-border/60 bg-card/40 p-3.5 text-xs">
                {user.company && (
                  <div className="flex items-center justify-between py-1">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Building className="size-3.5" /> Company / University:
                    </span>
                    <span className="font-medium text-foreground">{user.company}</span>
                  </div>
                )}
                {user.phone && (
                  <div className="flex items-center justify-between py-1">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Phone className="size-3.5" /> Phone:
                    </span>
                    <span className="font-medium text-foreground">{user.phone}</span>
                  </div>
                )}
                <div className="flex items-center justify-between py-1">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Shield className="size-3.5" /> Security Status:
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-500 font-medium">
                    <CheckCircle2 className="size-3" /> Active & Verified
                  </span>
                </div>
              </div>

              {/* Quick links */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to="/internship/dashboard"
                  onClick={() => onOpenChange(false)}
                  className="flex items-center justify-center gap-1.5 rounded-2xl border border-border/80 bg-background/80 py-2.5 px-3 text-xs font-semibold text-foreground hover:bg-accent hover:border-primary/40 transition-all text-center"
                >
                  <span>My Projects</span>
                  <ExternalLink className="size-3 text-muted-foreground" />
                </Link>

                <Link
                  to="/verify"
                  onClick={() => onOpenChange(false)}
                  className="flex items-center justify-center gap-1.5 rounded-2xl border border-border/80 bg-background/80 py-2.5 px-3 text-xs font-semibold text-foreground hover:bg-accent hover:border-primary/40 transition-all text-center"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="size-3 text-muted-foreground" />
                </Link>
              </div>

              {/* Logout Button */}
              <div className="pt-2 border-t border-border/50 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">Session active</span>
                <button
                  type="button"
                  onClick={() => {
                    onOpenChange(false);
                    logout();
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="size-3.5" />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            /* Edit Profile Tab */
            <form onSubmit={handleSave} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="edit-name" className="text-xs font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="edit-name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="h-9 text-xs rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="edit-title" className="text-xs font-medium">
                    Job Title / Role
                  </Label>
                  <Input
                    id="edit-title"
                    placeholder="e.g. Full Stack Developer"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-9 text-xs rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-bio" className="text-xs font-medium">
                  Bio / About You
                </Label>
                <Textarea
                  id="edit-bio"
                  placeholder="Share your technical interests, stacks, and background..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="text-xs rounded-xl resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="edit-company" className="text-xs font-medium">
                    Company / University
                  </Label>
                  <Input
                    id="edit-company"
                    placeholder="Turnpike University"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="h-9 text-xs rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="edit-phone" className="text-xs font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="edit-phone"
                    placeholder="+1 555-0199"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-9 text-xs rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-avatar" className="text-xs font-medium">
                  Avatar Image URL
                </Label>
                <Input
                  id="edit-avatar"
                  placeholder="https://... image link"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="h-9 text-xs rounded-xl"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  className="px-3.5 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateProfile.isPending}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 disabled:opacity-50 shadow-sm"
                >
                  {updateProfile.isPending ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : null}
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

