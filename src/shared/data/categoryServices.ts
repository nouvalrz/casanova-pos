import { useMutation, useQuery } from "@tanstack/react-query";
import { Category } from "../types/dataTypes";
import { useInitStore } from "@/app/store/initStore";
import { dbOrm } from "@/lib/powersync/powersyncClient";
import { sql } from "@powersync/kysely-driver";
import { Database } from "@/lib/powersync/AppSchema";

export const useDBFetchCategories = () => {
  const businessId = useInitStore.getState().user?.business_id;

  return useQuery<Database["categories"][], Error>({
    queryKey: ["categories", businessId],
    queryFn: async () => {
      const result = await dbOrm
        .selectFrom("categories")
        .selectAll("categories")
        .where("categories.business_id", "=", businessId!)
        .groupBy("categories.id")
        .orderBy("categories.created_at", "desc")
        .execute();
      return result;
    },
  });
};

export const useDBFetchCategoriesWithPagination = (
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
        .orderBy("categories.created_at", "desc")
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

export const useDBFetchCategoryById = (id: string) => {
  return useQuery<Database["categories"], Error>({
    queryKey: ["category-by-id", id],
    queryFn: async () => {
      const result = await dbOrm
        .selectFrom("categories")
        .selectAll()
        .where("categories.id", "=", id)
        .executeTakeFirst();

      if (result) {
        return result;
      }

      throw Error("Category not found");
    },
  });
};

export const useDBFetchCategoriesTotal = (searchKeyword: string = "") => {
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

export const useDBInsertCategory = () => {
  const businessId = useInitStore.getState().user?.business_id;
  return useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      await dbOrm
        .insertInto("categories")
        .values({
          name: name,
          business_id: businessId!,
          created_at: sql`datetime()`,
          id: sql`uuid()`,
        })
        .executeTakeFirst();
    },
  });
};

export const useDBUpdateCategory = () => {
  return useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      await dbOrm
        .updateTable("categories")
        .set({ name: name })
        .where("categories.id", "=", id)
        .executeTakeFirst();
    },
  });
};
