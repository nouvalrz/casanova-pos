import { AppPagination } from "@/shared/components/AppPagination";
import RecentReceiptsCard from "./RecentReceiptsCard";
import {
  useFetchRecentReceipts,
  useFetchRecentReceiptsTotal,
} from "@/shared/data/receiptServices";

import { usePaginatedQueryParam } from "@/shared/hooks/usePaginatedQueryParam";
import clsx from "clsx";

function RecentReceiptsWrapper({ className }: { className?: string }) {
  const { page, setPage } = usePaginatedQueryParam("receiptsPage", 1);
  const dataPerPage = 10;

  const { data: recentReceipts, isPending: isPendingRecentReceipts } =
    useFetchRecentReceipts(page, dataPerPage);
  const { data: receiptsTotal, isPending: isPendingReceiptsTotal } =
    useFetchRecentReceiptsTotal();

  return (
    <div className={clsx("flex flex-col gap-4", className)}>
      {!isPendingRecentReceipts && (
        <RecentReceiptsCard data={recentReceipts ?? null} className="flex-1" />
      )}
      {!isPendingReceiptsTotal && (
        <div className="flex flex-row justify-end">
          <AppPagination
            count={Math.ceil((receiptsTotal ?? 1) / dataPerPage)}
            boundaryCount={1}
            defaultPage={page}
            siblingCount={1}
            onChange={setPage}
          />
        </div>
      )}
    </div>
  );
}

export default RecentReceiptsWrapper;
