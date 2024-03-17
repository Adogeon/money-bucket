import { createFileRoute, redirect } from "@tanstack/react-router";

import HomePage from "../pages/Home";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: HomePage,
});
