import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/services/")({
  beforeLoad: () => {
    throw redirect({
      to: "/",
    });
  },
});
