import { useQuery } from "@tanstack/react-query";
import { Category } from "../types/dataTypes";
import { useInitStore } from "@/app/store/initStore";
import { dbOrm } from "@/lib/powersync/powersyncClient";

export const useFetchCategories = (
  page: string | number,
  count: number,
  searchKeyword: string = ""
) => {
  const businessId = useInitStore.getState().user?.business_id;

  return useQuery<Category[], Error>({
    queryKey: ["categories", businessId, page, searchKeyword],
    queryFn: async () => {
      let query = dbOrm
        .selectFrom("categories")
        .leftJoin("products", "products.category_id", "categories.id")
        .selectAll("categories")
        .select(({ fn }) => [
          fn<number>("count", ["products.category_id"]).as("total_products"),
        ])
        .where("categories.business_id", "=", businessId!)
        .groupBy("categories.id")
        .orderBy("categories.created_at", "asc")
        .limit(count)
        .offset(count * (Number(page) - 1));

      if (searchKeyword) {
        query = query.where("categories.name", "like", `%${searchKeyword}%`);
      }

      const result = await query.execute();

      return result;
    },
  });
};

export const useFetchCategoriesTotal = (searchKeyword: string = "") => {
  const businessId = useInitStore.getState().user?.business_id;

  return useQuery<number, Error>({
    queryKey: ["categories-total", businessId, searchKeyword],
    queryFn: async () => {
      let query = dbOrm
        .selectFrom("categories")
        .select(({ fn }) => [
          fn<number>("count", ["categories.id"]).as("total"),
        ])
        .where("categories.business_id", "=", businessId!);

      if (searchKeyword) {
        query = query.where("categories.name", "like", `%${searchKeyword}%`);
      }

      const result = await query.executeTakeFirst();

      return result?.total ?? 0;
    },
  });
};
