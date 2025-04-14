import { ROUTES } from "@/app/router/paths";
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
import { Database } from "@/lib/powersync/AppSchema";
import {
  useInsertCategory,
  useUpdateCategory,
} from "@/shared/data/categoryServices";
import { useUniqueInDatabase } from "@/shared/data/utilsServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const categoryFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nama minimal 3 karakter" })
    .max(100, { message: "Nama maksimal 100 karakter" }),
});

type CategoryFormProps = {
  editCategory?: Database["categories"];
};

export const CategoryForm: React.FC<CategoryFormProps> = ({ editCategory }) => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: editCategory ? editCategory.name! : "",
    },
  });

  const insertCategory = useInsertCategory();
  const updateCategory = useUpdateCategory();
  const uniqueInDatabase = useUniqueInDatabase();

  const onSubmit = async (values: z.infer<typeof categoryFormSchema>) => {
    try {
      const isUnique = await uniqueInDatabase.mutateAsync({
        table: "categories",
        column: "name",
        value: values.name,
      });

      if (editCategory && values.name === editCategory.name) {
        form.setError("name", {
          type: "manual",
          message: "Tidak ada perubahan nama",
        });
        return;
      }

      if (!isUnique) {
        form.setError("name", {
          type: "manual",
          message: "Nama kategori telah digunakan",
        });
        return;
      }

      if (editCategory) {
        await updateCategory.mutateAsync({
          id: editCategory.id,
          name: values.name,
        });
        navigate(-1); //back
        toast.success("Kategori berhasil di edit");
      } else {
        await insertCategory.mutateAsync(values);
        navigate(ROUTES.CATEGORIES_PAGE);
        toast.success("Berhasil menambah kategori");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
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
                  <Input placeholder="Contoh: Kemeja" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button
          type="submit"
          disabled={insertCategory.isPending || uniqueInDatabase.isPending}
          className="cursor-pointer"
        >
          {insertCategory.isPending ||
            (uniqueInDatabase.isPending && (
              <Loader2 className="animate-spin" />
            ))}{" "}
          {editCategory ? "Edit" : "Simpan"}
        </Button>
      </form>
    </Form>
  );
};
