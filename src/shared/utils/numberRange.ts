export const numberRange = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, i) => i + start);
