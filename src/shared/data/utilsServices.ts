import { db } from "@/lib/powersync/powersyncClient";
import { useMutation } from "@tanstack/react-query";

type IsValueUniqueTypes = {
  table: string;
  column: string;
  value: string;
};

export const useUniqueInDatabase = () => {
  return useMutation({
    mutationFn: async ({ table, column, value }: IsValueUniqueTypes) => {
      const result = (await db.get(
        `SELECT COUNT(*) as total FROM ${table} WHERE LOWER(${column}) = LOWER('${value}')`
      )) as { total: number };

      if (typeof result.total === "number") {
        console.log(result.total === 0);
        return result.total === 0;
      }

      throw Error("Something went wrong");
    },
  });
};
