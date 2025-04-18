import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductForm } from "../components/ProductForm";
import { useParams } from "react-router-dom";
import { useDBFetchProductById } from "@/shared/data/productServices";

function EditProductPage() {
  const { id } = useParams();
  const { data, isPending } = useDBFetchProductById(id!);
  return (
    <div className="px-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Produk</CardTitle>
          <CardDescription>
            Ubah informasi produk untuk bisnismu
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isPending && data && <ProductForm editProduct={data} />}
        </CardContent>
      </Card>
    </div>
  );
}

export default EditProductPage;
