import { PowerSyncDatabase } from "@powersync/web";
import { AppSchema, Database } from "./AppSchema";
import { wrapPowerSyncWithKysely, } from "@powersync/kysely-driver";


export const db = new PowerSyncDatabase({
  schema: AppSchema,
  database: {
    dbFilename: "casanovapos.db",
  },
});


export const dbOrm = wrapPowerSyncWithKysely<Database>(db);
