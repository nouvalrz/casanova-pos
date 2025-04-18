import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductForm } from "../components/ProductForm";

function AddProductPage() {
  return (
    <div className="px-4">
      <Card>
        <CardHeader>
          <CardTitle>Tambah Produk</CardTitle>
          <CardDescription>
            Daftarkan produk baru untuk bisnismu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default AddProductPage;
