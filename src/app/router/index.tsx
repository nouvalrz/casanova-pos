import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthGuard, GuestGuard, InitGuard, OwnerGuard } from "./guards";
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
import AddCategoryPage from "@/features/categories/pages/AddCategoryPage";
import EditCategoryPage from "@/features/categories/pages/EditCategoryPage";
import AddProductPage from "@/features/products/pages/AddProductPage";
import EditProductPage from "@/features/products/pages/EditProductPage";

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
            children: [
              {
                index: true,
                element: <ProductsPage />,
              },
              {
                path: "new",
                element: (
                  <OwnerGuard>
                    <AddProductPage />
                  </OwnerGuard>
                ),
              },
              {
                path: ":id/edit",
                element: (
                  <OwnerGuard>
                    <EditProductPage />
                  </OwnerGuard>
                ),
              },
            ],
          },
          {
            path: ROUTES.CATEGORIES_PAGE.slice(1),
            children: [
              {
                index: true,
                element: <CategoriesPage />,
              },
              {
                path: "new",
                element: <AddCategoryPage />,
              },
              {
                path: ":id/edit",
                element: <EditCategoryPage />,
              },
            ],
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
