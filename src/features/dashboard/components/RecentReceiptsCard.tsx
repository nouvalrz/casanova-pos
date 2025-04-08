import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchRecentReceipts } from "@/shared/data/receiptServices";
import RecentReceiptsItem from "./RecentReceiptsItem";

function RecentReceiptsCard() {
  const { data, isPending } = useFetchRecentReceipts();

  if (isPending) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Struk Terbaru</CardTitle>
        <CardDescription>Diambil 2 hari terakhir</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {data?.map((item) => (
            <RecentReceiptsItem key={item.id} {...item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default RecentReceiptsCard;
