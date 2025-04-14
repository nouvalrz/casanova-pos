import React from "react";
import { ROUTES } from "../router/paths";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const breadcrumbMap: Record<string, string> = {
  [ROUTES.DASHBOARD_PAGE]: "Dashboard",
  [ROUTES.RECEIPT_PAGE]: "Transaksi",
  [ROUTES.PRODUCTS_PAGE]: "Produk",
  [ROUTES.CATEGORIES_PAGE]: "Kategori",
  [ROUTES.CATEGORIES_PAGE + "/new"]: "Tambah Kategori",
  [ROUTES.PRICE_LABEL_PRINT_PAGE]: "Label Harga",
  [ROUTES.REPORTING_PAGE]: "Laporan",
  [ROUTES.SETTING_PAGE]: "Pengaturan",
};
function AppBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathnames.map((segment, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const label =
            breadcrumbMap[to] ||
            segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

          return (
            <React.Fragment key={to}>
              {index !== 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLast ? (
                  <span className="text-muted-foreground">{label}</span>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={to}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default AppBreadcrumb;
