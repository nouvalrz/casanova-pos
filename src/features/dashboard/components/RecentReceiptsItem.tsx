import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { RecentReceipt } from "@/shared/types/dataTypes";
import { formatToCompactDate } from "@/shared/utils/formatDate";
import { formatRupiah } from "@/shared/utils/formatRupiah";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, ReceiptText } from "lucide-react";

function RecentReceiptsItem({
  id,
  created_at,
  product_names,
  receipt_number,
  total_bill,
}: RecentReceipt) {
  return (
    <div className="flex flex-row items-start gap-4">
      <div className="bg-muted rounded-full p-3">
        <ReceiptText className="text-black size-5" />
      </div>
      <div className="flex-1 text-sm">
        <p className="font-medium">{formatToCompactDate(created_at!)}</p>
        <p className="text-muted-foreground">{receipt_number}</p>
        <p className="text-muted-foreground mt-1">{product_names}</p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <p className="font-medium">{formatRupiah(total_bill ?? 0)}</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem key={id}>Lihat Rincian</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default RecentReceiptsItem;
