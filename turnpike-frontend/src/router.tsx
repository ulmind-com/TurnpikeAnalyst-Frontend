import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";

import { setUnauthorizedRedirect } from "@turnpike/shared/api/client";

import { routeTree } from "./routeTree.gen";

// This app has no /login route — the console owns that. An intern whose
// session cannot be refreshed belongs back at the programme page.
setUnauthorizedRedirect("/internship");

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
