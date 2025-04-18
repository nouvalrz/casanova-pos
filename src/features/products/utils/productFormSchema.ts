import { z } from "zod";

export const productFormSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Nama minimal 3 karakter" })
      .max(100, { message: "Nama maksimal 100 karakter" }),
    barcode_number: z
      .string()
      .min(8, { message: "Nomor barcode minimal 10 karakter" })
      .max(15, { message: "Nomor barcode maksimal 15 karakter" })
      .regex(/^\d+$/),
    category_id: z.string().nonempty("Kategori tidak boleh kosong"),
    unit: z
      .string()
      .max(10, { message: "Satuan maksimal 10 karakter" })
      .min(1, { message: "Satuan minimal 1 karakter" }),
    stock: z.number().min(0, { message: "Stok minimal 0" }).nullable(),
    cost_price: z.number().min(0, { message: "Harga Pokok minimal Rp 0" }),
    sale_price: z.number(),
    image_url: z.union([z.instanceof(File).optional(), z.string().optional()]),
  })
  .refine((data) => data.sale_price >= data.cost_price, {
    message: "Harga Jual harus lebih besar dari Harga Pokok",
    path: ["sale_price"],
  });
