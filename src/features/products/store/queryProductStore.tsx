import { create } from "zustand";

type ProductQueryState = {
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
};

export const useProductQueryStore = create<ProductQueryState>((set) => {
  return {
    searchKeyword: "",
    category: "",
    setSearchKeyword: (value) => {
      set({ searchKeyword: value });
    },
    setCategory(value) {
      set({ category: value });
    },
  };
});
