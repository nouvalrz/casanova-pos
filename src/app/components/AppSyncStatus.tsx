// import { useStatus } from "@powersync/react";
import { RefreshCw, RefreshCwOff } from "lucide-react";
import { useInitStore } from "../store/initStore";

function AppSyncStatus() {
  const { powersync } = useInitStore();
  if (powersync.currentStatus.connected) {
    return <RefreshCw />;
  } else {
    return <RefreshCwOff />;
  }
}

export default AppSyncStatus;
