export default function combinationTargetSum(
  numbers: number[],
  target: number,
): number {
  // Initialize a dynamic programming (DP) array to store the number of
  // combinations for each sum up to the target
  const dp: number[] = new Array(target + 1).fill(0);

  // Base case: There's one way to reach a sum of 0 (using no elements)
  dp[0] = 1;

  // Iterate through all possible target sums from 1 to the actual target
  for (let combSum = 1; combSum <= target; combSum++) {
    // Iterate through each number in the 'nums' array
    for (const num of numbers) {
      // Check if the current number can be subtracted from the current target sum
      // without going below zero. This ensures we only consider valid combinations
      if (combSum - num >= 0) {
        // If valid, add the number of combinations for the remaining sum
        // (combSum - num) to the current sum's combination count. This leverages
        // previously calculated subproblems
        dp[combSum] += dp[combSum - num];
      }
    }
  }

  // The final element in the DP array (dp[target]) holds the number of
  // combinations that add up to the target sum
  return dp[target];
}
