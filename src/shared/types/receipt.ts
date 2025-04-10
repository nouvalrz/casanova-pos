export type RecentReceipt = {
  id: string;
  created_at: string | null;
  receipt_number: string | null;
  total_bill: number | null;
  product_names: string[];
};
