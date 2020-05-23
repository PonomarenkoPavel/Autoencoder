export const isNumeric = (number) =>
  !Number.isNaN(parseFloat(number)) &&
  !Number.isNaN(Number(number)) &&
  Number.isFinite(Number(number));
