import { CategoryRecord, ProductRecord } from "@/lib/powersync/AppSchema";

export type RecentReceipt = {
  id: string;
  created_at: string | null;
  receipt_number: string | null;
  total_bill: number | null;
  product_names: string[];
};

export interface Category extends CategoryRecord {
  total_products: number | null;
}

export interface Product extends ProductRecord {
  sold: number | null;
  category_name: string | null;
}
