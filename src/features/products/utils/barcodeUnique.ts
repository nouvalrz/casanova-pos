import { useDBIsUnique } from "@/shared/data/utilsServices";

export const useBarcodeIsUnique = () => {
  const uniqueDatabase = useDBIsUnique();

  const isBarcodeUnique = async (barcodeNumber: string) =>
    await uniqueDatabase.mutateAsync({
      table: "products",
      column: "barcode_number",
      value: barcodeNumber,
    });

  return isBarcodeUnique;
};
