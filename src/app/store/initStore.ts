import { Database } from "@/lib/powersync/AppSchema";
import { db, dbOrm } from "@/lib/powersync/powersyncClient";
import { SupabaseConnector } from "@/lib/powersync/SupabaseConnector";
import { ROLES } from "@/shared/constants/roles";
import { PowerSyncDatabase } from "@powersync/web";
import { create } from "zustand";

interface InitState {
  supabaseConnector: SupabaseConnector;
  powersync: PowerSyncDatabase;
  databaseInitialized: boolean;
  initDatabase: () => Promise<void>;
  sessionInitialized: boolean;
  initSession: () => Promise<void>;
  userInitialized: boolean;
  user: Database["users"] | null;
  initUser: () => Promise<void>;
  isOwner: () => boolean;
}

export const useInitStore = create<InitState>((set, get) => {
  const supabaseConnector = new SupabaseConnector();
  const powersync = db;

  return {
    supabaseConnector,
    powersync,
    sessionInitialized: false,
    initSession: async () => {
      if (get().sessionInitialized) {
        return;
      }

      const supabaseConnector = get().supabaseConnector;
      const session = await supabaseConnector.client.auth.getSession();

      supabaseConnector.currentSession = session.data.session;

      set({ supabaseConnector });
      set({ sessionInitialized: true });
    },
    databaseInitialized: false,
    initDatabase: async () => {
      if (get().databaseInitialized) {
        return;
      }

      // Debug global access
      const powersync = get().powersync;
      const supabaseConnector = get().supabaseConnector;

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
      await powersync.waitForFirstSync();

      set({ powersync, supabaseConnector });
      set({ databaseInitialized: true });
    },
    userInitialized: false,
    user: null,
    initUser: async () => {
      if (get().userInitialized) {
        return;
      }
      const currentSession = get().supabaseConnector.currentSession;
      const result = await dbOrm
        .selectFrom("users")
        .where("auth_user_id", "=", currentSession!.user.id)
        .selectAll()
        .execute();

      set({ user: result[0] });
      set({ userInitialized: true });
    },
    isOwner: () => get().user?.role === ROLES.OWNER,
  };
});
