export const isStringsEqual = (a: string, b: string): Boolean => a.toLowerCase() === b.toLowerCase();

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
