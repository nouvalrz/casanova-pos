import { db } from "@/lib/powersync/powersyncClient";
import { SupabaseConnector } from "@/lib/powersync/SupabaseConnector";
import { PowerSyncDatabase } from "@powersync/web";
import { create } from "zustand";

interface InitState {
  supabaseConnector: SupabaseConnector;
  powersync: PowerSyncDatabase;
  initialized: boolean;
  init: () => void;
}

export const useInitStore = create<InitState>((set, get) => {
  const supabaseConnector = new SupabaseConnector();
  const powersync = db;

  return {
    supabaseConnector,
    powersync,
    initialized: false,
    init: async () => {
      if (get().initialized) {
        return;
      }

      // Debug global access
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any)._powersync = powersync;

      await powersync.init();

      supabaseConnector.registerListener({
        initialized: () => {},
        sessionStarted: () => {
          powersync.connect(supabaseConnector);
        },
      });

      await supabaseConnector.init();
      set({ initialized: true });
    },
  };
});
