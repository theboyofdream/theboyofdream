import { Outlet, createRootRoute, createRoute } from "@tanstack/react-router";

import { AppHome } from "./index";

function RootLayout(): React.JSX.Element {
  return <Outlet />;
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  component: AppHome,
  getParentRoute: () => rootRoute,
  path: "/",
});

// Catch-all so the app also renders when served from a subpath
// (e.g. /komorebi/index.html) instead of only at the base root.
const catchAllRoute = createRoute({
  component: AppHome,
  getParentRoute: () => rootRoute,
  path: "*",
});

export const routeTree = rootRoute.addChildren([indexRoute, catchAllRoute]);
