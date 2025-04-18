import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppCombobox } from "@/shared/components/AppCombobox";
import { useProductQueryStore } from "../store/queryProductStore";

function ProductQuery({
  options,
}: {
  options: { value: string; label: string }[];
}) {
  const { setCategory, searchKeyword, setSearchKeyword, category } =
    useProductQueryStore();

  const handleReset = () => {
    setCategory("");
    setSearchKeyword("");
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Cari nama atau barcode ..."
          className="md:flex-[3]"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <AppCombobox
          placeholder="Cari berdasarkan kategori"
          onChange={(value) => {
            setCategory(value);
          }}
          value={category}
          options={options}
          className="md:flex-[1]"
        />
      </div>
      <Button
        variant={"secondary"}
        className="self-start"
        onClick={handleReset}
      >
        Atur Ulang
      </Button>
    </div>
  );
}

export default ProductQuery;
