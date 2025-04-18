import { useCallback } from "react";

export const useMaskCurrency = (currency: string = "Rp") => {
  const formatCurrency = useCallback(
    (value: string) => {
      const number = value.replace(/\D/g, "");
      if (!number) return "";
      return currency + " " + number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    [currency]
  );

  const unformatCurrency = useCallback((formatted: string) => {
    return formatted.replace(/\D/g, "");
  }, []);

  return { formatCurrency, unformatCurrency };
};
