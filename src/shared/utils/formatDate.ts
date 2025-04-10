export const formatToCompactDate = (dateString: string): string => {
  const date = new Date(dateString);

  const time = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const day = date.getDate();
  const today = new Date().getDate();
  const isToday = day === today;
  const month = date.toLocaleString(undefined, { month: "long" });

  const formatted = `${isToday ? "Hari ini" : day}, ${
    isToday ? "" : month
  }${time.replace(":", ".")}`;

  return formatted;
};
