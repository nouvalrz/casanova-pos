import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetchTodayExpenses } from "@/shared/data/receiptServices";
import { SquareArrowUpRight } from "lucide-react";
import OverviewSkeltonCard from "./OverviewSkeltonCard";
import { formatRupiah } from "@/shared/utils/formatRupiah";

function ExpensesCard() {
  const { isPending, data } = useFetchTodayExpenses();

  if (isPending) {
    return <OverviewSkeltonCard />;
  }

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <div className="flex flex-row gap-2 items-center text-sm text-muted-foreground">
          <SquareArrowUpRight className="size-5" />
          <CardTitle>Pengeluaran</CardTitle>
        </div>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {formatRupiah(data ?? 0)}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default ExpensesCard;
