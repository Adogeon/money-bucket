import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import Appbar from "../components/Appbar/Appbar";
import { AuthContext } from "../context/AuthContext";
import { QueryClient } from "@tanstack/react-query";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<{
  auth: AuthContext;
  queryClient: QueryClient;
}>()({
  component: () => (
    <>
      <Appbar />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
