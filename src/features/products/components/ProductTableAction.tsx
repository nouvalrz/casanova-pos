import { useInitStore } from "@/app/store/initStore";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function ProductTableAction({ id }: { id: string }) {
  const navigate = useNavigate();

  const { isOwner } = useInitStore();

  const handleClick = () => {
    if (isOwner()) {
      navigate(`${id}/edit`);
    } else {
      toast.warning("Edit produk hanya untuk Owner");
    }
  };

  return (
    <Button variant="ghost" onClick={handleClick} className="cursor-pointer">
      <Edit />
    </Button>
  );
}

export default ProductTableAction;
