import { createFileRoute, redirect } from "@tanstack/react-router";

import HomePage from "../pages/Home";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        from: "/dashboard",
        to: "/login",
      });
    }
  },
  component: HomePage,
});
