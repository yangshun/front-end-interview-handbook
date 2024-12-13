function minimumCoinsForChangeHelper(coins: number[], target: number): number {
  // Base case: If the amount is 0, no coins are needed.
  if (target === 0) {
    return 0;
  }

  let minCoins = Infinity;

  // Try each coin denomination.
  for (const coin of coins) {
    // Check if the coin denomination is not greater than the amount.
    if (coin <= target) {
      // Recursively calculate the minimum coins needed for the remaining amount.
      const remainingCoins = minimumCoinsForChangeHelper(coins, target - coin);

      // If a valid solution is found and it requires fewer coins, update minCoins.
      if (remainingCoins !== -1 && remainingCoins + 1 < minCoins) {
        minCoins = remainingCoins + 1;
      }
    }
  }

  // If no valid solution was found, return -1. Otherwise, return the minimum coins.
  return minCoins === Infinity ? -1 : minCoins;
}

export default function minimumCoinsForChange(
  coins: number[],
  target: number,
): number {
  return minimumCoinsForChangeHelper(coins, target);
}
