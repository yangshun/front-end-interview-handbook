export default function optimalStockTrading(prices: number[]): number {
  // Initialize maximum profit to 0, assuming no profit initially
  let maxProfit: number = 0;

  // Track the lowest buying price seen so far
  let lowestPrice: number = Number.MAX_SAFE_INTEGER;

  for (const currentPrice of prices) {
    // Update the lowest buying price if a lower price is encountered
    lowestPrice = Math.min(lowestPrice, currentPrice);

    // Calculate potential profit for the current price
    const potentialProfit: number = currentPrice - lowestPrice;

    // Update the maximum profit if a higher potential profit is found
    maxProfit = Math.max(maxProfit, potentialProfit);
  }

  return maxProfit;
}
