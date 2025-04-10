import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const usePaginatedQueryParam = (paramName: string, defaultValue = 1) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(defaultValue);

  useEffect(() => {
    const raw = Number(searchParams.get(paramName) ?? defaultValue);
    setPage(isNaN(raw) || raw < 1 ? defaultValue : raw);
  }, [searchParams, paramName, defaultValue]);

  const handleChange = (newPage: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(paramName, newPage.toString());
      return newParams;
    });
  };

  return { page, setPage: handleChange };
};
