import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Database } from "@/lib/powersync/AppSchema";
import { AppCombobox } from "@/shared/components/AppCombobox";
import { useDBFetchCategories } from "@/shared/data/categoryServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { productFormSchema } from "../utils/productFormSchema";
import {
  useDBInsertProduct,
  useDBUpdateProduct,
} from "@/shared/data/productServices";
import { toast } from "sonner";
import { supabaseClient } from "@/lib/supabase/supabaseClient";
import { useInitStore } from "@/app/store/initStore";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useMaskCurrency } from "@/shared/hooks/useMaskCurrency";
import { useBarcodeIsUnique } from "../utils/barcodeUnique";
import { uploadProductImage } from "../utils/uploadProductImage";
import { ROUTES } from "@/app/router/paths";

type ProductFormProps = {
  editProduct?: Database["products"];
};

export const ProductForm: React.FC<ProductFormProps> = ({ editProduct }) => {
  const navigate = useNavigate();

  const { formatCurrency, unformatCurrency } = useMaskCurrency();
  const [isStock, setIsStock] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const insertProduct = useDBInsertProduct();
  const updateProduct = useDBUpdateProduct();
  const isBarcodeUnique = useBarcodeIsUnique();
  const { data: category, isPending: isCategoryPending } =
    useDBFetchCategories();

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: editProduct
      ? {
          name: editProduct.name!,
          barcode_number: editProduct.barcode_number!,
          category_id: editProduct.category_id!,
          cost_price: editProduct.cost_price!,
          sale_price: editProduct.sale_price!,
          image_url: editProduct.image_url ?? "",
          stock: editProduct.stock,
          unit: editProduct.unit!,
        }
      : {
          name: "",
          barcode_number: "",
          category_id: "",
          cost_price: 0,
          sale_price: 0,
          image_url: "",
          stock: null,
          unit: "",
        },
  });

  const onSubmit = async (values: z.infer<typeof productFormSchema>) => {
    setIsLoading(true);
    try {
      if (!editProduct) {
        await handleInsertProduct(values);
      } else {
        await handleUpdateProduct(values, editProduct);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e);
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
    }
    setIsLoading(false);
  };

  const handleInsertProduct = async (
    values: z.infer<typeof productFormSchema>
  ) => {
    let imagePath: string | null = null;
    const businessId = useInitStore.getState().user!.business_id;

    // Check uniqueness of barcode number
    const barcodeUnique = await isBarcodeUnique(values.barcode_number);
    if (!barcodeUnique) {
      form.setError("barcode_number", { message: "Barcode telah dipakai" });
      return;
    }

    // Upload image to supabase
    if (values.image_url instanceof File) {
      imagePath = await uploadProductImage(values.image_url, businessId!);
    }

    await insertProduct.mutateAsync({ ...values, image_url: imagePath ?? "" });
    toast.success("Berhasil menambahkan produk");
    navigate(ROUTES.PRODUCTS_PAGE, { replace: true });
  };

  const handleUpdateProduct = async (
    values: z.infer<typeof productFormSchema>,
    editProduct: Database["products"]
  ) => {
    let imagePath: string | null = null;
    const businessId = useInitStore.getState().user!.business_id;

    // Check uniqueness of barcode number when changes
    if (values.barcode_number !== editProduct.barcode_number) {
      const barcodeUnique = await isBarcodeUnique(values.barcode_number);

      if (!barcodeUnique) {
        form.setError("barcode_number", { message: "Barcode telah dipakai" });
        return;
      }
    }

    // Upload image to supabase
    if (values.image_url instanceof File) {
      imagePath = await uploadProductImage(values.image_url, businessId!);
    }

    await updateProduct.mutateAsync({
      value: { ...values, image_url: imagePath ?? values.image_url },
      id: editProduct.id,
    });

    toast.success("Berhasil mengedit produk");
    navigate(ROUTES.PRODUCTS_PAGE, { replace: true });
  };

  const onIsStockChange = (value: boolean) => {
    form.setValue("stock", null);
    setIsStock(value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: Jeans Pendek Biru" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="barcode_number"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Nomor Barcode</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: 8271992812" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {!isCategoryPending && category && (
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <AppCombobox
                    options={category.map((item) => {
                      return {
                        label: item.name!,
                        value: item.id!,
                      };
                    })}
                    placeholder="Pilih kategori"
                    onChange={field.onChange}
                    value={field.value}
                  />
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        )}

        <div className="flex flex-row gap-4 items-start">
          <div className="flex-1 flex flex-col gap-3">
            <FormField
              disabled={!isStock}
              control={form.control}
              name="stock"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Stok</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan jumlah stock"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value ? Number(value) : null);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex items-center space-x-2">
              <Switch
                id="airplane-mode"
                checked={isStock}
                onCheckedChange={onIsStockChange}
              />
              <Label htmlFor="airplane-mode">Dengan Stock?</Label>
            </div>
          </div>
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>Nama Satuan</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: pcs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="cost_price"
              render={({ field }) => {
                return (
                  <FormItem className="flex-1">
                    <FormLabel>Harga Pokok</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Rp 0"
                        {...field}
                        value={formatCurrency(field.value.toString())}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(Number(unformatCurrency(value)));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="sale_price"
              render={({ field }) => {
                return (
                  <FormItem className="flex-1">
                    <FormLabel>Harga Jual</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Rp 0"
                        {...field}
                        value={formatCurrency(field.value.toString())}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(Number(unformatCurrency(value)));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>Gambar Produk</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Rp 0"
                      type="file"
                      accept="image/*,capture=camera"
                      onChange={(e) => {
                        field.onChange(e.target.files && e.target.files[0]);
                      }}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          {typeof form.watch("image_url") === "string" &&
            (typeof form.watch("image_url") === "string" &&
            form.watch("image_url") === "" ? (
              <div className="w-32 h-32 bg-muted rounded-lg"></div>
            ) : (
              <img
                src={
                  supabaseClient.storage
                    .from("product-images")
                    .getPublicUrl(form.watch("image_url") as string).data
                    .publicUrl
                }
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            ))}
          {form.watch("image_url") instanceof File && (
            <img
              src={URL.createObjectURL(form.watch("image_url") as File)}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg"
            />
          )}
        </div>
        <Button disabled={isLoading}>
          {isLoading && <Loader2 className="animate-spin" />}
          {editProduct ? "Edit" : "Simpan"}
        </Button>
      </form>
    </Form>
  );
};
