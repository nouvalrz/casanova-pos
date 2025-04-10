import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRupiah } from "@/shared/utils/formatRupiah";
import { useFetchTodayRevenue } from "@/shared/data/receiptServices";
import { CircleDollarSign } from "lucide-react";
import OverviewSkeltonCard from "./OverviewSkeltonCard";

function RevenueCard() {
  const { isPending, data } = useFetchTodayRevenue();

  if (isPending) {
    return <OverviewSkeltonCard />;
  }

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <div className="flex flex-row gap-2 items-center text-sm text-muted-foreground">
          <CircleDollarSign className="size-5" />
          <CardTitle>Pemasukan</CardTitle>
        </div>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {formatRupiah(data ?? 0)}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default RevenueCard;
