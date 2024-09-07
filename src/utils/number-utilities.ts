export const formatNumber = (
  num: number,
  minimumFractionDigits: number = 0,
  maximumFractionDigits: number = 5
) => {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits,
    maximumFractionDigits,
  });
  return parseFloat(formatter.format(num));
};
