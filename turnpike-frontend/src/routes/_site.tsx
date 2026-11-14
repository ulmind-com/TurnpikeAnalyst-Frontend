import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";

import { AuroraBackground } from "@turnpike/shared/components/effects/aurora-background";
import { FloatingActions } from "@/components/site/floating-actions";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SupportChat } from "@/components/site/support-chat";

export const Route = createFileRoute("/_site")({
  component: SiteLayout,
});

function SiteLayout() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isHome = pathname === "/";

  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <SiteHeader />
      <main className="relative z-10">
        <Outlet />
      </main>
      <SiteFooter />
      <FloatingActions />
      <SupportChat />
    </div>
  );
}


