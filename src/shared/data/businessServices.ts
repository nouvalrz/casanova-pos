import { useInitStore } from "@/app/store/initStore";
import { Database } from "@/lib/powersync/AppSchema";
import { dbOrm } from "@/lib/powersync/powersyncClient";
import { useQuery } from "@tanstack/react-query";

export const useFetchBusiness = () => {
  const businessId = useInitStore.getState().user?.business_id;
  return useQuery<Database["business"], Error>({
    queryKey: ["business", businessId],
    queryFn: async () => {
      const result = await dbOrm
        .selectFrom("business")
        .where("business.id", "=", businessId!)
        .selectAll()
        .execute();
      return result[0];
    },
  });
};
