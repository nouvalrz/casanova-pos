import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import AppBreadcrumb from "./AppBreadcrumb";

import AppSyncStatus from "./AppSyncStatus";
import AppSyncButton from "./AppSyncButton";

function AppHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" />
        <div className="flex-1">
          <AppBreadcrumb />
        </div>
        {/* <AppSyncButton /> */}
        {/* <AppSyncStatus /> */}
      </div>
    </header>
  );
}

export default AppHeader;
