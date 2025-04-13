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

export const formatToFullDate = (dateString: string): string => {
  const date = new Date(dateString);
  const userLocale = navigator.language || "id-ID";

  const formattedDate = new Intl.DateTimeFormat(userLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return formattedDate;
};
