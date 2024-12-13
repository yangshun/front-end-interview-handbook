export default function optimalStockTrading(prices: number[]): number {
  // Initialize the maximum profit to 0
  let maxProfit = 0;

  // Iterate through each day's price
  for (let i = 0; i < prices.length - 1; i++) {
    // For each day, compare it with the prices of the subsequent days
    for (let j = i + 1; j < prices.length; j++) {
      // Calculate the profit by subtracting the current day's price from the future day's price
      const profit = prices[j] - prices[i];

      // If the calculated profit is greater than the current maximum profit, update the maximum profit
      if (profit > maxProfit) {
        maxProfit = profit;
      }
    }
  }

  // Return the maximum profit
  return maxProfit;
}
