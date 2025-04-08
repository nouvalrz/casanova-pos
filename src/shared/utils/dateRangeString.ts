export const dateRangeFromTodayString = (dayCount: number = 1): string[] => {
  const toDateStr = (d: Date) => d.toISOString().slice(0, 19).replace("T", " ");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + dayCount);

  const todayStr = toDateStr(today);
  const tomorrowStr = toDateStr(tomorrow);

  return [todayStr, tomorrowStr];
};
