export default function minimumCoinsForChange(
  coins: number[],
  target: number,
): number {
  // Initialize a dp array with a large value (Infinity)
  const dp: number[] = new Array(target + 1).fill(Number.MAX_VALUE);

  // Base case: 0 coins are needed to make amount 0
  dp[0] = 0;

  // Iterate over each amount from 1 to the target amount
  for (let i = 1; i <= target; i++) {
    // Check each coin to see if it can contribute to the current amount
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  // If the value at dp[amount] is still Infinity, return -1 (not possible)
  // Otherwise, return the minimum number of coins needed for the target amount
  return dp[target] === Number.MAX_VALUE ? -1 : dp[target];
}
