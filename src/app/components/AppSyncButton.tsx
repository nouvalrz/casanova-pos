import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useInitStore } from "../store/initStore";

function AppSyncButton() {
  return (
    <>
      <Button
        variant="ghost"
        className="text-muted-foreground font-normal cursor-pointer"
      >
        Sync
        <RefreshCw />
      </Button>
    </>
  );
}

export default AppSyncButton;
