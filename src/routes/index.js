import { authRoutes } from "./auth";
import { lazy } from "react";
import { adminRoutes } from "./admin";
import { dashboardRoutes } from "./dashboard";
import { Layout as AuthLayout } from "src/layouts/auth";
import HomePage from "src/pages";
import { Outlet } from "react-router-dom";
import Error401Page from "src/pages/401";
import Error404Page from "src/pages/404";
import Error500Page from "src/pages/500";
import { GuestGuard } from "src/guards/guest-guard";
const LoginPage = lazy(() => import("src/pages/auth/login"));

export const routes = [
  {
    path: "/",
    element: (
      <GuestGuard>
        <AuthLayout>
          <Outlet />
        </AuthLayout>
      </GuestGuard>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  ...authRoutes,
  ...dashboardRoutes,
  ...adminRoutes,
  {
    path: "401",
    element: <Error401Page />,
  },
  {
    path: "404",
    element: <Error404Page />,
  },
  {
    path: "500",
    element: <Error500Page />,
  },
  {
    path: "*",
    element: <Error404Page />,
  },
];
