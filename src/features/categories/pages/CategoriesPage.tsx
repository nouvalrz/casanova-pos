import { AppDataTable } from "@/shared/components/AppDataTable";
import {
  useFetchCategories,
  useFetchCategoriesTotal,
} from "@/shared/data/categoryServices";
import { categoryColumns } from "../components/categoryColumns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AppPagination } from "@/shared/components/AppPagination";
import { usePaginatedQueryParam } from "@/shared/hooks/usePaginatedQueryParam";

function CategoriesPage() {
  const { page, setPage } = usePaginatedQueryParam("page", 1);

  const dataPerPage = 10;

  const { data: categories, isPending: isCategoriesPending } =
    useFetchCategories(page, dataPerPage);
  const { data: categoriesTotal, isPending: isCategoriesTotalPending } =
    useFetchCategoriesTotal();

  return (
    <div className="px-4 pb-4 flex flex-col h-full">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>Daftar Kategori</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 flex-1">
          <Input placeholder="Cari ..." />
          {!isCategoriesPending && (
            <AppDataTable columns={categoryColumns} data={categories ?? []} />
          )}
        </CardContent>
        <CardFooter className="flex flex-row justify-end">
          {!isCategoriesTotalPending && (
            <AppPagination
              count={Math.ceil((categoriesTotal ?? 1) / dataPerPage)}
              boundaryCount={1}
              defaultPage={Number(page)}
              siblingCount={1}
              onChange={setPage}
            />
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default CategoriesPage;
