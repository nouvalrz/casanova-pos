import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function OverviewSkeltonCard() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <Skeleton className="h-4 w-[50%]" />
        <Skeleton className="h-6 w-[75%]" />
      </CardContent>
    </Card>
  );
}

export default OverviewSkeltonCard;
