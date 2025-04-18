import { useMutation, useQuery } from "@tanstack/react-query";
import { Product } from "../types/dataTypes";
import { dbOrm } from "@/lib/powersync/powersyncClient";
import { useInitStore } from "@/app/store/initStore";
import { z } from "zod";
import { productFormSchema } from "@/features/products/utils/productFormSchema";
import { sql } from "@powersync/kysely-driver";
import { supabaseClient } from "@/lib/supabase/supabaseClient";
import { Database } from "@/lib/powersync/AppSchema";

export const useDBFetchProductById = (id: string) => {
  return useQuery<Database["products"], Error>({
    refetchOnMount: "always",
    queryKey: ["product-by-id", id],
    queryFn: async () => {
      const result = await dbOrm
        .selectFrom("products")
        .selectAll()
        .where("products.id", "=", id)
        .executeTakeFirst();

      if (result) return result;

      throw Error("Product not found");
    },
  });
};

export const useDBFetchProductsWithPagination = (
  page: string | number,
  count: number,
  searchKeyword: string = "",
  category: string = ""
) => {
  const businessId = useInitStore.getState().user?.business_id;

  return useQuery<Product[], Error>({
    queryKey: ["products", businessId, page, searchKeyword, category],
    queryFn: async () => {
      let query = dbOrm
        .selectFrom("products")
        .innerJoin("categories", "products.category_id", "categories.id")
        .leftJoin(
          "receipt_products",
          "products.id",
          "receipt_products.product_id"
        )
        .selectAll("products")
        .select(({ fn }) => [
          fn<number>("coalesce", ["receipt_products.quantity", sql`0`]).as(
            "sold"
          ),
          "categories.name as category_name",
        ])
        .where("products.business_id", "=", businessId!)
        .groupBy("products.id")
        .orderBy("products.created_at", "desc")
        .limit(count)
        .offset(count * (Number(page) - 1));

      if (searchKeyword) {
        query = query.where((eb) => {
          return eb("products.name", "like", `%${searchKeyword}%`).or(
            "products.barcode_number",
            "like",
            `%${searchKeyword}%`
          );
        });
      }

      if (category) {
        query = query.where("products.category_id", "=", category);
      }

      const result = await query.execute();

      return result.map((item) => {
        if (item.image_url) {
          const { data } = supabaseClient.storage
            .from("product-images")
            .getPublicUrl(item.image_url, { transform: { quality: 30 } });
          return { ...item, image_url: data.publicUrl };
        }
        return item;
      });
    },
  });
};

export const useDBFetchProductsTotal = (
  searchKeyword: string,
  category: string
) => {
  const businessId = useInitStore.getState().user?.business_id;
  return useQuery<number, Error>({
    queryKey: ["products-total", businessId, searchKeyword, category],
    queryFn: async () => {
      let query = dbOrm
        .selectFrom("products")
        .select(({ fn }) => [fn<number>("count", ["products.id"]).as("total")])
        .where("products.business_id", "=", businessId!);

      if (searchKeyword) {
        query = query.where((eb) => {
          return eb("products.name", "like", `%${searchKeyword}%`).or(
            "products.barcode_number",
            "like",
            `%${searchKeyword}%`
          );
        });
      }

      if (category) {
        query = query.where("products.category_id", "=", category);
      }

      const result = await query.executeTakeFirst();

      return result?.total ?? 0;
    },
  });
};

export const useDBInsertProduct = () => {
  return useMutation({
    mutationFn: async (value: z.infer<typeof productFormSchema>) => {
      const businessId = useInitStore.getState().user?.business_id;
      await dbOrm
        .insertInto("products")
        .values({
          id: sql`uuid()`,
          barcode_number: value.barcode_number,
          business_id: businessId!,
          category_id: value.category_id,
          name: value.name,
          cost_price: value.cost_price,
          sale_price: value.sale_price,
          image_url: typeof value.image_url === "string" ? value.image_url : "",
          stock: value.stock,
          unit: value.unit,
          created_at: sql`datetime()`,
        })
        .executeTakeFirst();
    },
  });
};

export const useDBUpdateProduct = () => {
  return useMutation({
    mutationFn: async ({
      value,
      id,
    }: {
      value: z.infer<typeof productFormSchema>;
      id: string;
    }) => {
      await dbOrm
        .updateTable("products")
        .set({
          barcode_number: value.barcode_number,
          category_id: value.category_id,
          name: value.name,
          cost_price: value.cost_price,
          sale_price: value.sale_price,
          image_url: typeof value.image_url === "string" ? value.image_url : "",
          stock: value.stock,
          unit: value.unit,
        })
        .where("products.id", "=", id)
        .executeTakeFirst();
    },
  });
};
