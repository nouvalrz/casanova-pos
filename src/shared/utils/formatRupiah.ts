export const formatRupiah = (value: number, withPrefix = true): string => {
  const formatter = new Intl.NumberFormat("id-ID");
  const formatted = formatter.format(value);

  return withPrefix ? `Rp ${formatted}` : formatted;
};
