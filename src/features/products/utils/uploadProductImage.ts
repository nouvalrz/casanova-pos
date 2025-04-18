import { supabaseClient } from "@/lib/supabase/supabaseClient";
import { v4 as uuidv4 } from "uuid";

export const uploadProductImage = async (file: File, businessId: string) => {
  const { data, error } = await supabaseClient.storage
    .from("product-images")
    .upload(`${businessId}/product-${uuidv4()}`, file);

  if (error) {
    throw Error(error.message);
  }

  return data.path;
};
