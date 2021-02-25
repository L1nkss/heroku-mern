export const isStringsEqual = (a: string, b: string): boolean => a.toLowerCase() === b.toLowerCase();

export const getRatingClass = (vote: number): string => {
  let result = "tbm";

  if (vote > 0 && vote <= 5) {
    result = "low";
  }

  if (vote > 5 && vote <= 8) {
    result = "medium";
  }

  if (vote > 8) {
    result = "high";
  }

  return result;
};

export const timeConvert = (n: number) => {
  const hours = (n / 60);
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);

  // Если фильм идем меньше часа, не возвращаем часы-
  return `${rhours ? `${rhours}h` : ""} ${rminutes} min`;
};
