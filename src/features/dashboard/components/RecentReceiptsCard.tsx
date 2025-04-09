import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RecentReceiptsItem from "./RecentReceiptsItem";
import { RecentReceipt } from "@/shared/types/receipt";
import clsx from "clsx";

function RecentReceiptsCard({
  data,
  className,
}: {
  data: RecentReceipt[] | null;
  className?: string;
}) {
  return (
    <Card className={clsx(className)}>
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
