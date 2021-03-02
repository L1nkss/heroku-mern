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

export const getFivePointScale = (vote: number): number => {
  let result;

  switch (Math.round(vote)) {
    case 10:
    case 9:
      result = 5;
      break;

    case 8:
    case 7:
      result = 4;
      break;

    case 6:
    case 5:
      result = 3;
      break;

    case 4:
    case 3:
      result = 2;
      break;

    case 2:
    case 1:
      result = 1;
      break;

    default:
      result = 0;
      break;
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
