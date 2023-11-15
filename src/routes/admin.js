import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import AdminDashboardLayout from "src/layouts/admin";

const ClientsPage = lazy(() => import("src/pages/admin/clients"));
const SMSSummaryPage = lazy(() => import("src/pages/admin/smsSummary"));
const PaymentSummaryPage = lazy(() => import("src/pages/admin/paymentSummary"));
const ClientsCreatePage = lazy(() => import("src/pages/admin/clients/create"));
const ClientsEditPage = lazy(() => import("src/pages/admin/clients/edit"));
const ClientsDetailPage = lazy(() => import("src/pages/admin/clients/detail"));
const AdminPage = lazy(() => import("src/pages/admin"));
const SettingsPage = lazy(() => import("src/pages/admin/settings"));

export const adminRoutes = [
  {
    path: "admin",
    element: (
      <AdminDashboardLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </AdminDashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
      {
        path: "clients",
        children: [
          {
            index: true,
            element: <ClientsPage />,
          },
          {
            path: "create",
            element: <ClientsCreatePage />,
          },
          {
            path: ":clientId",
            element: <ClientsDetailPage />,
          },
          {
            path: ":clientId/edit",
            element: <ClientsEditPage />,
          },
        ],
      },
      {
        path: "sms-summary",
        children: [
          {
            index: true,
            element: <SMSSummaryPage />,
          },
          {
            path: "create",
            element: <ClientsCreatePage />,
          },
          {
            path: ":clientId",
            element: <ClientsDetailPage />,
          },
          {
            path: ":clientId/edit",
            element: <ClientsEditPage />,
          },
        ],
      },
      {
        path: "payment-summary",
        children: [
          {
            index: true,
            element: <PaymentSummaryPage />,
          },
          {
            path: "create",
            element: <ClientsCreatePage />,
          },
          {
            path: ":clientId",
            element: <ClientsDetailPage />,
          },
          {
            path: ":clientId/edit",
            element: <ClientsEditPage />,
          },
        ],
      },
      {
        path: 'settings',
        children: [
          {
            index: true,
            element: <SettingsPage />,
          }
        ]
      }
    ],
  },
];
