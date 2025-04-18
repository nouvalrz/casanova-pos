import { Product } from "@/shared/types/dataTypes";
import { formatRupiah } from "@/shared/utils/formatRupiah";
import { ColumnDef } from "@tanstack/react-table";
import ProductTableAction from "./ProductTableAction";
import { Box, ScanBarcode } from "lucide-react";

export const productColumns: ColumnDef<Product>[] = [
  {
    id: "barcode_number",
    accessorKey: "barcode_number",
    header: "Produk",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col lg:flex-row gap-3 flex-wrap text-xs">
          {row.original.image_url ? (
            <img
              src={row.original.image_url}
              alt=""
              className="w-10 h-10 object-cover rounded-lg"
            />
          ) : (
            <div className="w-10 h-10 bg-muted rounded-lg flex justify-center items-center">
              <Box className="text-muted-foreground" />
            </div>
          )}
          <div>
            <p className="text-sm! mb-1">{row.original.name}</p>
            <div className="flex flex-row items-center gap-1">
              <ScanBarcode size={14} />
              <p className="text-muted-foreground">
                {row.original.barcode_number}
              </p>
            </div>

            <p className="text-muted-foreground">
              Kategori : {row.original.category_name}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    id: "stock",
    accessorKey: "stock",
    header: "Stok",
    cell: ({ row }) => {
      return <p>{row.original.stock ?? "-"}</p>;
    },
  },
  {
    id: "sold",
    accessorKey: "sold",
    header: "Terjual",
  },
  {
    id: "cost_price",
    accessorKey: "cost_price",
    header: "Harga Pokok",
    cell: ({ row }) => {
      return <p>{formatRupiah(row.original.cost_price!)}</p>;
    },
  },
  {
    id: "sale_price",
    accessorKey: "sale_price",
    header: "Harga Jual",
    cell: ({ row }) => {
      return <p>{formatRupiah(row.original.sale_price!)}</p>;
    },
  },
  {
    id: "action",
    header: "Aksi",
    cell: ({ row }) => {
      return <ProductTableAction id={row.original.id} />;
    },
  },
];
