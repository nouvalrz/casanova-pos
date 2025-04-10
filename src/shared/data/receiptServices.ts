import { useInitStore } from "@/app/store/initStore";
import { dbOrm } from "@/lib/powersync/powersyncClient";
import { useQuery } from "@tanstack/react-query";
import { dateRangeFromTodayString } from "../utils/dateRangeString";
import { RecentReceipt } from "../types/receipt";
import { sql } from "@powersync/kysely-driver";

export const useFetchTodayRevenue = () => {
  const businessId = useInitStore.getState().user?.business_id;

  return useQuery<number, Error>({
    queryKey: ["today-income", businessId],
    queryFn: async () => {
      const [today, tomorrow] = dateRangeFromTodayString();
      const result = await dbOrm
        .selectFrom("receipts")
        .select(({ fn }) => [fn.sum("total_bill").as("total_today")])
        .where("business_id", "=", businessId!)
        .where("created_at", ">=", today)
        .where("created_at", "<", tomorrow)
        .executeTakeFirst();

      return Number(result?.total_today ?? 0);
    },
  });
};

export const useFetchTodayProfit = () => {
  const businessId = useInitStore.getState().user?.business_id;
  return useQuery<number, Error>({
    queryKey: ["today-profit", businessId],
    queryFn: async () => {
      const [today, tomorrow] = dateRangeFromTodayString();
      const result = await dbOrm
        .selectFrom("receipts")
        .select(({ fn }) => [fn.sum("total_profit").as("total_today")])
        .where("business_id", "=", businessId!)
        .where("created_at", ">=", today)
        .where("created_at", "<", tomorrow)
        .executeTakeFirst();

      return Number(result?.total_today ?? 0);
    },
  });
};

export const useFetchTodayExpenses = () => {
  const businessId = useInitStore.getState().user?.business_id;

  return useQuery<number, Error>({
    queryKey: ["today-expenses", businessId],
    queryFn: async () => {
      const [today, tomorrow] = dateRangeFromTodayString();
      const result = await dbOrm
        .selectFrom("expenses")
        .select(({ fn }) => [fn.sum("amount").as("total_today")])
        .where("business_id", "=", businessId!)
        .where("created_at", ">=", today)
        .where("created_at", "<", tomorrow)
        .executeTakeFirst();

      return Number(result?.total_today ?? 0);
    },
  });
};

export const useFetchTotalReceipt = () => {
  const businessId = useInitStore.getState().user?.business_id;

  return useQuery<number, Error>({
    queryKey: ["today-receipt", businessId],
    queryFn: async () => {
      const [today, tomorrow] = dateRangeFromTodayString();
      const result = await dbOrm
        .selectFrom("receipts")
        .select(({ fn }) => [fn.count("receipts.id").as("total_today")])
        .where("business_id", "=", businessId!)
        .where("created_at", ">=", today)
        .where("created_at", "<", tomorrow)
        .executeTakeFirst();

      return Number(result?.total_today ?? 0);
    },
  });
};

export const useFetchRecentReceipts = (page: number, count: number) => {
  const businessId = useInitStore.getState().user?.business_id;
  return useQuery<RecentReceipt[], Error>({
    queryKey: ["recent-receipts", businessId, page, count],
    queryFn: async () => {
      const [today, nextDay] = dateRangeFromTodayString(2);
      const result = await dbOrm
        .selectFrom("receipts")
        .innerJoin(
          "receipt_products",
          "receipts.id",
          "receipt_products.receipt_id"
        )
        .select(({ fn }) => [
          "receipts.id",
          "receipts.created_at",
          "receipts.receipt_number",
          "receipts.total_bill",
          fn
            .agg<string[]>("group_concat", [
              "receipt_products.product_name",
              sql.raw(`', '`),
            ])
            .as("product_names"),
        ])
        .where("receipts.business_id", "=", businessId!)
        .where("receipts.created_at", ">=", today)
        .where("receipts.created_at", "<", nextDay)
        .orderBy("receipts.created_at desc")
        .groupBy([
          "receipts.id",
          "receipts.created_at",
          "receipts.receipt_number",
          "receipts.total_bill",
        ])
        .limit(count)
        .offset(count * (page - 1))
        .execute();

      return result;
    },
  });
};

export const useFetchRecentReceiptsTotal = () => {
  const businessId = useInitStore.getState().user?.business_id;
  return useQuery<number, Error>({
    queryKey: ["recent-receipts-total", businessId],
    queryFn: async () => {
      const [today, nextDay] = dateRangeFromTodayString(2);
      const result = await dbOrm
        .selectFrom("receipts")
        .select(({ fn }) => [fn.count<number>("receipts.id").as("total")])
        .where("receipts.business_id", "=", businessId!)
        .where("receipts.created_at", ">=", today)
        .where("receipts.created_at", "<", nextDay)
        .executeTakeFirst();

      return Number(result?.total ?? 0);
    },
  });
};
