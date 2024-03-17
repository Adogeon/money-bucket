/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from "@tanstack/react-router"

// Import Routes

import { Route as rootRoute } from "./routes/__root"
import { Route as LoginImport } from "./routes/login"
import { Route as DashboardImport } from "./routes/dashboard"

// Create Virtual Routes

const TransactionLazyImport = createFileRoute("/transaction")()
const BucketLazyImport = createFileRoute("/bucket")()
const IndexLazyImport = createFileRoute("/")()

// Create/Update Routes

const TransactionLazyRoute = TransactionLazyImport.update({
  path: "/transaction",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/transaction.lazy").then((d) => d.Route))

const BucketLazyRoute = BucketLazyImport.update({
  path: "/bucket",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/bucket.lazy").then((d) => d.Route))

const LoginRoute = LoginImport.update({
  path: "/login",
  getParentRoute: () => rootRoute,
} as any)

const DashboardRoute = DashboardImport.update({
  path: "/dashboard",
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/index.lazy").then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    "/dashboard": {
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    "/login": {
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    "/bucket": {
      preLoaderRoute: typeof BucketLazyImport
      parentRoute: typeof rootRoute
    }
    "/transaction": {
      preLoaderRoute: typeof TransactionLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  DashboardRoute,
  LoginRoute,
  BucketLazyRoute,
  TransactionLazyRoute,
])

/* prettier-ignore-end */
