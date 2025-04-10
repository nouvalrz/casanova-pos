import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  useFetchTodayProfit,
  useFetchTodayRevenue,
} from "@/shared/data/receiptServices";
import { ChartPie } from "lucide-react";
import OverviewSkeltonCard from "./OverviewSkeltonCard";
import { formatRupiah } from "@/shared/utils/formatRupiah";

function ProfitCard() {
  const { isPending: isPendingProfit, data: profit } = useFetchTodayProfit();
  const { isPending: isPendingRevenue, data: revenue } = useFetchTodayRevenue();

  const calculateProfitPercentage = (
    revenue: number,
    profit: number
  ): number => {
    return Math.floor((profit / revenue) * 100);
  };

  if (isPendingProfit) {
    return <OverviewSkeltonCard />;
  }

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <div className="flex flex-row gap-2 items-center text-sm text-muted-foreground">
          <ChartPie className="size-5" />
          <CardTitle>Keuntungan</CardTitle>
        </div>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {formatRupiah(profit ?? 0)}
        </CardTitle>
        {!isPendingRevenue && (revenue !== 0 || profit !== 0) && (
          <CardDescription>
            {calculateProfitPercentage(revenue ?? 0, profit ?? 0)}% dari
            Pemasukan
          </CardDescription>
        )}
      </CardHeader>
    </Card>
  );
}

export default ProfitCard;
