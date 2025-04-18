import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CategoryForm } from "../components/CategoryForm";

export default function AddCategoryPage() {
  return (
    <div className="px-4">
      <Card>
        <CardHeader>
          <CardTitle>Tambah Kategori</CardTitle>
          <CardDescription>Buat kategori baru untuk bisnismu</CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryForm />
        </CardContent>
      </Card>
    </div>
  );
}
