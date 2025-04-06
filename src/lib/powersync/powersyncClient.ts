import { PowerSyncDatabase } from "@powersync/web";
import { AppSchema } from "./AppSchema";

export const db = new PowerSyncDatabase({
  schema: AppSchema,
  database: {
    dbFilename: "casanovapos.db",
  },
});
