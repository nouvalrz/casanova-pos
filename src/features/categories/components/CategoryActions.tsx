import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu.tsx";
import { MoreHorizontal, Edit, Eye } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const CategoryActions: React.FC<{ id: string }> = ({ id }) => {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate(`${id}/edit`)}>
          <Edit /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Eye />
          Lihat Produk
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryActions;
