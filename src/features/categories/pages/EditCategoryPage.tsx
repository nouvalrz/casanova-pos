import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CategoryForm } from "../components/CategoryForm";
import { useNavigate, useParams } from "react-router-dom";
import { useDBFetchCategoryById } from "@/shared/data/categoryServices";
import { useEffect } from "react";
import { ROUTES } from "@/app/router/paths";

export default function EditCategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isError, isPending } = useDBFetchCategoryById(id!);

  useEffect(() => {
    if (isError) {
      navigate(ROUTES.CATEGORIES_PAGE);
    }
  }, [isError, navigate]);

  return (
    <div className="px-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Kategori</CardTitle>
          <CardDescription>Ubah nama kategori mu</CardDescription>
        </CardHeader>
        <CardContent>
          {!isPending && <CategoryForm editCategory={data} />}
        </CardContent>
      </Card>
    </div>
  );
}
