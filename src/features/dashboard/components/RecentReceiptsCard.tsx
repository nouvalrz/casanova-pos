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
import AppEmpty from "@/shared/components/AppEmpty";

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
      <CardContent className="flex flex-col h-full">
        {data!.length > 0 && (
          <div className="flex flex-col gap-6">
            {data?.map((item) => (
              <RecentReceiptsItem key={item.id} {...item} />
            ))}
          </div>
        )}

        {data!.length === 0 && (
          <div className="flex flex-col justify-center items-center flex-1">
            <AppEmpty />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentReceiptsCard;
