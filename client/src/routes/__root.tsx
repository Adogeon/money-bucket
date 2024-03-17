import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import Appbar from "../components/Appbar/Appbar";
import { AuthContext } from "../context/AuthContext";
import { QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{
  auth: AuthContext;
  queryClient: QueryClient;
}>()({
  component: () => (
    <>
      <Appbar />
      <Outlet />
    </>
  ),
});
