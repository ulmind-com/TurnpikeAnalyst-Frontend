import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Boxes,
  ExternalLink,
  FolderGit2,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Sun,
  User as UserIcon,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useMemo, useState } from "react";

import { TurnpikeLogo } from "@/components/site/turnpike-logo";
import { AuthModal } from "@/components/auth/auth-modal";
import { usePrefs } from "@turnpike/shared/hooks/use-prefs";
import { useLogout, useSession, useUpdateProfile } from "@turnpike/shared/hooks/use-auth";
import { useServices, useIndustries } from "@turnpike/shared/hooks/use-api";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@turnpike/shared/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@turnpike/shared/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@turnpike/shared/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@turnpike/shared/components/ui/avatar";

import { MEGA_MENUS } from "./mega-menu-content";
import { MegaMenuDropdown } from "./mega-menu-dropdown";

type MegaMenuData = (typeof MEGA_MENUS)[keyof typeof MEGA_MENUS];

/**
 * One description of the navigation, rendered by both the desktop bar and the
 * mobile sheet. Keeping a single source is what stops the two from drifting —
 * the previous markup duplicated every entry, and the mobile "Software
 * Support" row had quietly ended up pointing at /services.
 *
 * `section` is the path prefix that marks the entry active, so a service
 * detail page keeps its parent highlighted.
 */
type NavEntry =
  | { kind: "link"; label: string; to: string; section: string }
  | { kind: "menu"; label: string; section: string; menu: MegaMenuData };

export function SiteHeader({ revealOnScroll = false }: { revealOnScroll?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { dark, setPref } = usePrefs();
  const { user, isAuthenticated } = useSession();
  const logout = useLogout("/");
  const updateProfile = useUpdateProfile();

  const { data: servicesData } = useServices({ limit: 1000 });
  const { data: industriesData } = useIndustries({ limit: 1000 });

  const dynamicServicesMenu = useMemo(
    () => buildServiceMenu(MEGA_MENUS.services, servicesData, (parent) => parent !== "DIGITAL_CONTENT_SERVICES"),
    [servicesData],
  );

  const dynamicDigitalContentMenu = useMemo(
    () =>
      buildServiceMenu(
        MEGA_MENUS.digitalContent,
        servicesData,
        (parent) => parent === "DIGITAL_CONTENT_SERVICES",
        (name) => (name === "DIGITAL_CONTENT_SERVICES" ? "DIGITAL CONTENT SOLUTIONS" : name),
      ),
    [servicesData],
  );

  const dynamicIndustriesMenu = useMemo(
    () => buildIndustryMenu(MEGA_MENUS.industries, industriesData),
    [industriesData],
  );

  const nav: NavEntry[] = [
    { kind: "link", label: "Home", to: "/", section: "/" },
    { kind: "menu", label: "Services", section: "/services", menu: dynamicServicesMenu },
    { kind: "menu", label: "Industries", section: "/industries", menu: dynamicIndustriesMenu },
    {
      kind: "menu",
      label: "Digital Content Services",
      section: "/digital-content",
      menu: dynamicDigitalContentMenu,
    },
    {
      kind: "link",
      label: "Software Support",
      to: "/software-support",
      section: "/software-support",
    },
    { kind: "menu", label: "Training & Courses", section: "/training", menu: MEGA_MENUS.training },
    { kind: "link", label: "Internship", to: "/internship", section: "/internship" },
    { kind: "link", label: "Blogs", to: "/blog", section: "/blog" },
    { kind: "menu", label: "Contact Us", section: "/contact", menu: MEGA_MENUS.contactUs },
  ];

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
  });

  const hidden = revealOnScroll && !scrolled;

  // "/" must match exactly; every other section also matches its detail pages,
  // so /services/filenet-to-cloud-migration still highlights Services.
  const isActive = (section: string) =>
    section === "/" ? pathname === "/" : pathname === section || pathname.startsWith(`${section}/`);

  const toggleTheme = () => {
    const next = !dark;
    setPref("dark", next);
    if (isAuthenticated) {
      updateProfile.mutate({ theme: next ? "dark" : "light" });
    }
  };

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? -140 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className={`sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-500 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center pl-1" aria-label="Turnpike Analyst — home">
          <TurnpikeLogo dark={false} />
        </Link>

        {/* The bar carries eight top-level entries whose combined width is
            ~1400px, so the full row only fits from 1440px up. Below that the
            sheet takes over — at the previous 1280px threshold the row
            overflowed the viewport and the Sign In button wrapped onto a
            second line. */}
        <NavigationMenu className="hidden flex-1 justify-center px-1 min-[1440px]:flex">
          <NavigationMenuList className="flex-nowrap justify-center gap-0.5">
            {nav.map((entry) => {
              const active = isActive(entry.section);
              return (
                <NavigationMenuItem key={entry.label}>
                  {entry.kind === "link" ? (
                    <Link to={entry.to} className={navItemClass(active)}>
                      {active ? <ActivePill /> : null}
                      <span className="relative">{entry.label}</span>
                    </Link>
                  ) : (
                    <>
                      <NavigationMenuTrigger
                        className={`${navItemClass(active)} bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-foreground`}
                      >
                        {active ? <ActivePill /> : null}
                        <span className="relative">{entry.label}</span>
                      </NavigationMenuTrigger>
                      <MegaMenuDropdown data={entry.menu} />
                    </>
                  )}
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex shrink-0 items-center gap-2">
          {/* User Auth: Sign In button when logged out, Avatar + Dropdown when logged in */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-border/80 bg-background/80 p-1 pl-1 pr-2.5 transition-all hover:border-primary/50 hover:bg-accent/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
                >
                  <Avatar className="size-8 rounded-full border border-primary/30 ring-2 ring-primary/10">
                    <AvatarImage src={user.avatar_url || undefined} alt={user.full_name} className="object-cover" />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-cyan-600 text-white font-bold text-xs">
                      {(user.full_name || "U").slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline-block max-w-[110px] truncate text-xs font-semibold text-foreground">
                    {user.full_name?.split(" ")[0] || "Profile"}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-60 rounded-2xl p-1.5 shadow-xl border-border/80 bg-background/95 backdrop-blur-xl"
              >
                <DropdownMenuLabel className="px-3 py-2 font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-xs font-bold leading-none text-foreground truncate">
                      {user.full_name}
                    </p>
                    <p className="text-[11px] leading-none text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="rounded-xl px-3 py-2 text-xs cursor-pointer flex items-center gap-2 font-medium">
                  <Link to="/account">
                    <UserIcon className="size-3.5 text-primary" />
                    <span>My Profile & Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl px-3 py-2 text-xs cursor-pointer flex items-center gap-2 font-medium">
                  <Link to="/internship/dashboard">
                    <FolderGit2 className="size-3.5 text-cyan-500" />
                    <span>My Internship Projects</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl px-3 py-2 text-xs cursor-pointer flex items-center gap-2 font-medium">
                  <Link to="/verify">
                    <Award className="size-3.5 text-amber-500" />
                    <span>Verify Credentials</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => logout()}
                  className="rounded-xl px-3 py-2 text-xs cursor-pointer text-destructive focus:text-destructive flex items-center gap-2 font-medium"
                >
                  <LogOut className="size-3.5" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              type="button"
              onClick={() => setAuthModalOpen(true)}
              className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-primary to-cyan-500 px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-95 hover:shadow active:scale-[0.98]"
            >
              <LogIn className="size-3.5 shrink-0" />
              <span>Sign In</span>
            </button>
          )}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            className="mr-1 grid size-10 shrink-0 place-items-center rounded-full border border-border/60 bg-background/60 text-foreground transition-colors hover:text-primary sm:mr-2"
          >
            {dark ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
          </button>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="grid size-10 place-items-center rounded-full border border-border/60 bg-background/60 text-foreground transition-colors hover:text-primary min-[1440px]:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-2 top-full mt-2 flex max-h-[85vh] flex-col gap-1 overflow-y-auto rounded-3xl border border-border/60 bg-background/95 p-3 shadow-xl backdrop-blur-xl min-[1440px]:hidden"
          >
            <Accordion type="single" collapsible className="w-full">
              {nav.map((entry) =>
                entry.kind === "link" ? (
                  <Link
                    key={entry.label}
                    to={entry.to}
                    onClick={() => setOpen(false)}
                    className={mobileLinkClass(isActive(entry.section))}
                  >
                    {entry.label}
                    <ArrowRight className="size-4 opacity-60" />
                  </Link>
                ) : (
                  <AccordionItem key={entry.label} value={entry.label} className="border-b-0">
                    <AccordionTrigger
                      className={`rounded-2xl px-4 py-3 text-sm transition-colors hover:no-underline ${
                        isActive(entry.section)
                          ? "font-semibold text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      {entry.label}
                    </AccordionTrigger>
                    <AccordionContent className="pb-0 pl-4 pr-2">
                      <div className="flex flex-col py-1">
                        {entry.menu.categories
                          .flatMap((category) => category.items)
                          .map((item) => (
                            <Link
                              key={item.href + item.title}
                              to={item.href}
                              onClick={() => setOpen(false)}
                              className="rounded-xl px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                            >
                              {item.title}
                            </Link>
                          ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ),
              )}
            </Accordion>

            {/* Mobile Sheet Auth Section */}
            <div className="mt-3 border-t border-border/60 pt-3 px-1">
              {isAuthenticated && user ? (
                <div className="space-y-2">
                  <Link
                    to="/account"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center gap-3 rounded-2xl bg-muted/40 p-2.5 text-left border border-border/60 hover:bg-muted"
                  >
                    <Avatar className="size-9 rounded-xl border border-primary/40">
                      <AvatarImage src={user.avatar_url || undefined} alt={user.full_name} className="object-cover" />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-cyan-600 text-white font-bold text-xs">
                        {(user.full_name || "U").slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-foreground truncate">{user.full_name}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <span className="text-[11px] font-semibold text-primary">Profile &rarr;</span>
                  </Link>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/internship/dashboard"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-border/70 py-2 text-xs font-medium text-foreground hover:bg-accent"
                    >
                      <FolderGit2 className="size-3.5 text-cyan-500" />
                      <span>My Projects</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        logout();
                      }}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-destructive/30 py-2 text-xs font-medium text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="size-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setAuthModalOpen(true);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-cyan-500 py-3 text-xs font-semibold text-primary-foreground shadow-sm"
                >
                  <LogIn className="size-4" />
                  <span>Sign In / Create Account</span>
                </button>
              )}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </motion.header>
  );
}

/** Shared pill that slides between the active desktop nav entries. */
function ActivePill() {
  return (
    <motion.span
      layoutId="nav-pill"
      className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))]"
    />
  );
}

function navItemClass(active: boolean) {
  // whitespace-nowrap matters: without it a two-word entry such as "Software
  // Support" breaks onto a second line and lifts the whole bar's height.
  // Padding opens up again at 2xl, where there is room to spare.
  return `relative whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors duration-300 2xl:px-3.5 ${
    active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
  }`;
}

function mobileLinkClass(active: boolean) {
  return `flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition-colors ${
    active
      ? "bg-primary/10 font-semibold text-primary"
      : "text-muted-foreground hover:bg-accent hover:text-foreground"
  }`;
}

type MenuItem = MegaMenuData["categories"][number]["items"][number];

/**
 * Rebuild a mega menu from live API rows, keeping the hand-picked icon for any
 * service the static menu already described and falling back to a neutral one
 * for the rest.
 */
function buildServiceMenu(
  fallback: MegaMenuData,
  services: Array<{ title: string; slug: string; short_description?: string; parent_category?: string }> | undefined,
  include: (parentCategory: string) => boolean,
  renameCategory: (name: string) => string = (name) => name,
): MegaMenuData {
  if (!services) return fallback;

  const staticItems = fallback.categories.flatMap((category) => category.items);
  const grouped = new Map<string, MenuItem[]>();

  for (const service of services) {
    const parent = (service.parent_category || "OTHER").toUpperCase();
    if (!include(parent)) continue;

    const href = `/services/${service.slug}`;
    grouped.set(parent, [
      ...(grouped.get(parent) ?? []),
      {
        title: service.title,
        description: service.short_description || "Explore this service",
        icon: staticItems.find((item) => item.href === href)?.icon ?? Boxes,
        href,
      },
    ]);
  }

  return { ...fallback, categories: toSortedCategories(grouped, renameCategory) };
}

function buildIndustryMenu(
  fallback: MegaMenuData,
  industries: Array<{ title: string; slug: string; short_description?: string; parent_category?: string }> | undefined,
): MegaMenuData {
  if (!industries) return fallback;

  const staticItems = fallback.categories.flatMap((category) => category.items);
  const grouped = new Map<string, MenuItem[]>();

  for (const industry of industries) {
    const parent = (industry.parent_category || "OTHER").toUpperCase();
    const href = `/industries/${industry.slug}`;
    grouped.set(parent, [
      ...(grouped.get(parent) ?? []),
      {
        title: industry.title,
        description: industry.short_description || "Explore this industry",
        icon: staticItems.find((item) => item.href === href)?.icon ?? Boxes,
        href,
      },
    ]);
  }

  return { ...fallback, categories: toSortedCategories(grouped) };
}

function toSortedCategories(
  grouped: Map<string, MenuItem[]>,
  renameCategory: (name: string) => string = (name) => name,
) {
  return Array.from(grouped.entries())
    .map(([name, items]) => ({
      name: renameCategory(name),
      items: [...items].sort((a, b) => a.title.localeCompare(b.title)),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
