import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import ProductQuery from "../components/ProductQuery";
import { useDBFetchCategories } from "@/shared/data/categoryServices";
import {
  useDBFetchProductsTotal,
  useDBFetchProductsWithPagination,
} from "@/shared/data/productServices";
import { useNavigate } from "react-router-dom";
import { usePaginatedQueryParam } from "@/shared/hooks/usePaginatedQueryParam";
import { useProductQueryStore } from "../store/queryProductStore";
import { AppDataTable } from "@/shared/components/AppDataTable";
import { productColumns } from "../components/productColumns";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useInitStore } from "@/app/store/initStore";
import { toast } from "sonner";
import { AppPagination } from "@/shared/components/AppPagination";

function ProductsPage() {
  const dataPerPage = 10;
  const navigate = useNavigate();
  const { page, setPage } = usePaginatedQueryParam("page", 1);
  const { data: categories, isPending: isCategoriesPending } =
    useDBFetchCategories();

  const { searchKeyword: searchInput, category } = useProductQueryStore();
  const searchKeyword = useDebounce(searchInput, 300);

  const { data: products, isPending: isProductsPending } =
    useDBFetchProductsWithPagination(
      page,
      dataPerPage,
      searchKeyword,
      category
    );

  const { data: productsTotal, isPending: isProductsTotalPending } =
    useDBFetchProductsTotal(searchKeyword, category);

  const { isOwner } = useInitStore();

  const productColumnsByRole = !isOwner()
    ? productColumns.filter((column) => column.id! !== "cost_price")
    : productColumns;

  const handleAddButton = () => {
    if (isOwner()) {
      navigate("new");
    } else {
      toast.warning("Edit produk hanya untuk Owner");
    }
  };

  return (
    <div className="px-4 pb-4 flex flex-col h-full">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-1">
              <CardTitle>Daftar Produk</CardTitle>
              <CardDescription>Semua produk di bisnismu</CardDescription>
            </div>
            <Button className="cursor-pointer" onClick={handleAddButton}>
              <Plus /> Tambah
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 flex-1">
          {!isCategoriesPending && categories && (
            <ProductQuery
              options={categories.map((item) => {
                return { value: item.id, label: item.name! };
              })}
            />
          )}
          {!isProductsPending && products && (
            <AppDataTable columns={productColumnsByRole} data={products} />
          )}
        </CardContent>
        <CardFooter className="flex flex-row justify-end">
          {!isProductsTotalPending && (
            <AppPagination
              count={Math.ceil((productsTotal ?? 1) / dataPerPage)}
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

export default ProductsPage;
