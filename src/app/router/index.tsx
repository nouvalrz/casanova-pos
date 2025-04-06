import { createBrowserRouter } from "react-router-dom";
import { AuthGuard, GuestGuard, InitGuard } from "./guards";
import LoginPage from "@/features/auth/pages/LoginPage";
import EntryPage from "../pages/EntryPage";
import { ROUTES } from "./paths";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import AppLayout from "../layouts/AppLayout";
import RootLayout from "../layouts/RootLayout";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: ROUTES.ENTRY_PAGE,
        element: <EntryPage />,
      },
      {
        path: "/",
        element: <InitGuard />,
        children: [
          {
            path: ROUTES.LOGIN_PAGE.slice(1),
            element: (
              <GuestGuard>
                <LoginPage />
              </GuestGuard>
            ),
          },
          {
            path: ROUTES.DASHBOARD_PAGE.slice(1),
            element: <AppLayout />,
            children: [
              {
                index: true,
                element: (
                  <AuthGuard>
                    <DashboardPage />
                  </AuthGuard>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
]);
