import { Button } from "@/components/ui/button";
import { Category } from "@/shared/types/dataTypes";
import { formatToFullDate } from "@/shared/utils/formatDate";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, MoreHorizontal } from "lucide-react";

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Nama Kategori",
  },
  {
    accessorKey: "total_products",
    header: "Jumlah Barang",
  },
  {
    accessorKey: "created_at",
    header: "Dibuat pada",
    cell: ({ row }) => {
      return <p>{formatToFullDate(row.getValue("created_at"))}</p>;
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Eye />
              Lihat Produk
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
