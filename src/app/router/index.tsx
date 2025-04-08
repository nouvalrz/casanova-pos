import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthGuard, GuestGuard, InitGuard } from "./guards";
import LoginPage from "@/features/auth/pages/LoginPage";
import { ROUTES } from "./paths";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import AppLayout from "../layouts/AppLayout";
import RootLayout from "../layouts/RootLayout";
import ReceiptPage from "@/features/receipt/pages/ReceiptPage";
import ProductsPage from "@/features/products/pages/ProductsPage";
import CategoriesPage from "@/features/categories/pages/CategoriesPage";
import PriceLabelPrintPage from "@/features/price-label-print/pages/PriceLabelPrintPage";
import ReportingPage from "@/features/reporting/pages/ReportingPage";
import SettingPage from "@/features/setting/pages/SettingPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: ROUTES.LOGIN_PAGE,
        element: (
          <GuestGuard>
            <LoginPage />
          </GuestGuard>
        ),
      },
      {
        path: "/",
        element: (
          <AuthGuard>
            <InitGuard>
              <AppLayout />
            </InitGuard>
          </AuthGuard>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={ROUTES.DASHBOARD_PAGE} replace />,
          },
          {
            path: ROUTES.DASHBOARD_PAGE.slice(1),
            element: <DashboardPage />,
          },
          {
            path: ROUTES.RECEIPT_PAGE.slice(1),
            element: <ReceiptPage />,
          },
          {
            path: ROUTES.PRODUCTS_PAGE.slice(1),
            element: <ProductsPage />,
          },
          {
            path: ROUTES.CATEGORIES_PAGE.slice(1),
            element: <CategoriesPage />,
          },
          {
            path: ROUTES.PRICE_LABEL_PRINT_PAGE.slice(1),
            element: <PriceLabelPrintPage />,
          },
          {
            path: ROUTES.REPORTING_PAGE.slice(1),
            element: <ReportingPage />,
          },
          {
            path: ROUTES.SETTING_PAGE.slice(1),
            element: <SettingPage />,
          },
        ],
      },
    ],
  },
]);
