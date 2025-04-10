import { useState } from "react";
import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface AppPaginationProps {
  count: number; // total halaman
  defaultPage?: number;
  siblingCount?: number;
  boundaryCount?: number;
  onChange?: (page: number) => void;
}

export function AppPagination({
  count,
  defaultPage = 1,
  siblingCount = 1,
  boundaryCount = 1,
  onChange,
}: AppPaginationProps) {
  const [page, setPage] = useState(defaultPage);
  const handleChange = (newPage: number) => {
    setPage(newPage);
    onChange?.(newPage);
  };

  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count
  );

  const siblingsStart = Math.max(
    Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    count - boundaryCount - 1
  );

  const itemList: (number | string)[] = [
    "previous",
    ...startPages,
    ...(siblingsStart > boundaryCount + 2
      ? ["start-ellipsis"]
      : boundaryCount + 1 < count - boundaryCount
      ? [boundaryCount + 1]
      : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < count - boundaryCount - 1
      ? ["end-ellipsis"]
      : count - boundaryCount > boundaryCount
      ? [count - boundaryCount]
      : []),
    ...endPages,
    "next",
  ];


  return (
    <ShadPagination>
      <PaginationContent>
        {itemList.map((item, index) => {
          if (typeof item === "number") {
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={item === page}
                  onClick={() => handleChange(item)}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          }

          if (item === "start-ellipsis" || item === "end-ellipsis") {
            return (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          const isDisabled =
            (item === "previous" && page <= 1) ||
            (item === "next" && page >= count);

          return (
            <PaginationItem key={index}>
              {item === "previous" ? (
                <PaginationPrevious
                  onClick={() => !isDisabled && handleChange(page - 1)}
                />
              ) : (
                <PaginationNext
                  onClick={() => !isDisabled && handleChange(page + 1)}
                />
              )}
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </ShadPagination>
  );
}
