export const getTimeToRead = (characterLength = 0) => {
  const wordsPerMinute = 200;
  const words = characterLength / 5;
  const minutes = words / wordsPerMinute;
  const readTime = Math.ceil(minutes);
  return `${readTime} min`;
};

export const getFormattedDate = (date) => {
  // get beautiful date format
  const d = new Date(date);
  return d.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};
