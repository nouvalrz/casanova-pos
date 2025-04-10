import {
  Boxes,
  ChartSpline,
  Home,
  Lock,
  PrinterIcon,
  Receipt,
  SettingsIcon,
  SquareStack,
  Store,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useFetchBusiness } from "@/shared/data/businessServices";
import { ROUTES } from "../router/paths";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useInitStore } from "../store/initStore";

const ownerItems = [
  {
    title: "Dashboard",
    url: ROUTES.DASHBOARD_PAGE,
    icon: Home,
  },
  {
    title: "Buka Kasir",
    url: ROUTES.RECEIPT_PAGE,
    icon: Receipt,
  },
  {
    title: "Produk",
    url: ROUTES.PRODUCTS_PAGE,
    icon: Boxes,
  },
  {
    title: "Kategori",
    url: ROUTES.CATEGORIES_PAGE,
    icon: SquareStack,
  },
  {
    title: "Cetak Label",
    url: ROUTES.PRICE_LABEL_PRINT_PAGE,
    icon: PrinterIcon,
  },
  {
    title: "Laporan",
    url: ROUTES.REPORTING_PAGE,
    icon: ChartSpline,
  },
  {
    title: "Pengaturan",
    url: ROUTES.SETTING_PAGE,
    icon: SettingsIcon,
  },
];

const staffItems = [
  {
    title: "Dashboard",
    url: ROUTES.DASHBOARD_PAGE,
    icon: Home,
  },
  {
    title: "Buka Kasir",
    url: ROUTES.RECEIPT_PAGE,
    icon: Receipt,
  },
  {
    title: "Produk",
    url: ROUTES.PRODUCTS_PAGE,
    icon: Boxes,
  },
  {
    title: "Kategori",
    url: ROUTES.CATEGORIES_PAGE,
    icon: SquareStack,
  },
  {
    title: "Cetak Label",
    url: ROUTES.PRICE_LABEL_PRINT_PAGE,
    icon: PrinterIcon,
  },
  {
    title: "Riwayat Transaksi",
    url: ROUTES.REPORTING_PAGE,
    icon: ChartSpline,
  },
  {
    title: "Pengaturan",
    url: ROUTES.SETTING_PAGE,
    icon: SettingsIcon,
  },
];

export function AppSidebar() {
  const { pathname } = useLocation();
  const { isOwner, user } = useInitStore();
  const { isLoading, data: business } = useFetchBusiness();
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {!isLoading && (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Store className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">{business?.name}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {(isOwner() ? ownerItems : staffItems).map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-row items-center">
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-black">
                <User className="size-4" />
              </div>
              <div className="flex flex-col gap-1 leading-none">
                <span className="font-medium">{user?.name}</span>
                <span className="truncate text-xs text-muted-foreground capitalize">
                  {user?.role}
                </span>
              </div>
            </SidebarMenuButton>
            <Button
              variant="secondary"
              className={clsx("cursor-pointer hidden", { block: open })}
            >
              <Lock className="size-4" />
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
