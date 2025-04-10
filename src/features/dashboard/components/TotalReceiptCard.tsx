import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetchTotalReceipt } from "@/shared/data/receiptServices";
import { ScrollText } from "lucide-react";
import OverviewSkeltonCard from "./OverviewSkeltonCard";

function TotalReceiptCard() {
  const { isPending, data } = useFetchTotalReceipt();

  if (isPending) {
    return <OverviewSkeltonCard />;
  }

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <div className="flex flex-row gap-2 items-center text-sm text-muted-foreground">
          <ScrollText className="size-5" />
          <CardTitle>Total Struk</CardTitle>
        </div>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {data}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default TotalReceiptCard;
