export default function neighborhoodTheftCircular(numbers: number[]): number {
  // If there are no houses, return 0
  if (numbers.length === 0) return 0;
  // If there is only one house, return the amount in that house
  if (numbers.length === 1) return numbers[0];

  // Calculate the maximum amount of money that can be robbed by excluding either the first or the last house
  const max1 = robWithMemo(numbers, 0, numbers.length - 2);
  const max2 = robWithMemo(numbers, 1, numbers.length - 1);

  // Return the maximum amount from the two calculated values
  return Math.max(max1, max2);
}

// Helper function to find the maximum amount of money that can be robbed from a range of houses using memoization
function robWithMemo(numbers: number[], start: number, end: number): number {
  // Initialize the memoization array with -1 indicating uncomputed values
  const memo: number[] = new Array(numbers.length).fill(-1);

  // Recursive function with memoization
  function dp(i: number): number {
    // Base case: if i is beyond the end of the range, return 0
    if (i > end) return 0;

    // Return the cached value if it's already computed
    if (memo[i] !== -1) return memo[i];

    // Recursively compute the maximum amount by choosing to rob or not rob the current house
    const robCurrent = numbers[i] + dp(i + 2); // Rob current house and move to the house after next
    const skipCurrent = dp(i + 1); // Skip current house and move to the next house

    // Store the result in the memo array
    memo[i] = Math.max(robCurrent, skipCurrent);

    return memo[i];
  }

  // Start the recursion from the starting index
  return dp(start);
}
