export function priceRoundToNearestNiceNumber(priceParam: number) {
  const price = Math.ceil(priceParam);

  // Show small numbers as-is.
  if (price < 250) {
    return price;
  }

  // Round to nearest 10.
  if (price < 1000) {
    return Math.ceil(price / 10) * 10;
  }

  // Round to nearest 100.
  if (price < 10000) {
    return Math.ceil(price / 100) * 100;
  }

  // Round to nearest 1000.
  return Math.ceil(price / 1000) * 1000;
}
