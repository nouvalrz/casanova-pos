import { AppDataTable } from "@/shared/components/AppDataTable";
import {
  useFetchCategories,
  useFetchCategoriesTotal,
} from "@/shared/data/categoryServices";
import { categoryColumns } from "../components/categoryColumns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AppPagination } from "@/shared/components/AppPagination";
import { usePaginatedQueryParam } from "@/shared/hooks/usePaginatedQueryParam";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CategoriesPage() {
  const dataPerPage = 10;
  const navigate = useNavigate();
  const { page, setPage } = usePaginatedQueryParam("page", 1);
  const [searchInput, setSearchInput] = useState<string>("");
  const searchKeyword = useDebounce(searchInput, 300);

  const { data: categories, isPending: isCategoriesPending } =
    useFetchCategories(page, dataPerPage, searchKeyword);
  const { data: categoriesTotal, isPending: isCategoriesTotalPending } =
    useFetchCategoriesTotal(searchKeyword);

  return (
    <div className="px-4 pb-4 flex flex-col h-full">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-1">
              <CardTitle>Daftar Kategori</CardTitle>
              <CardDescription>Semua kategori di bisnismu</CardDescription>
            </div>
            <Button className="cursor-pointer" onClick={() => navigate("new")}>
              <Plus /> Tambah
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 flex-1">
          <Input
            placeholder="Cari ..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {isCategoriesPending && (
            <Skeleton className="w-full flex-1 rounded-lg" />
          )}
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
