import { Category } from "@/shared/types/dataTypes";
import { formatToFullDate } from "@/shared/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import CategoryActions from "./CategoryActions";

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
    cell: ({ row }) => {
      return <CategoryActions id={row.original.id} />;
    },
  },
];
