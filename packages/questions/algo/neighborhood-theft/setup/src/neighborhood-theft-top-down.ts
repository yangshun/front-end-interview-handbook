// Memoization array to store the results of subproblems
let memo: number[] = [];

// Main function to calculate the maximum amount of money that can be robbed
export default function neighborhoodTheft(numbers: number[]): number {
  // Initialize the memo array with -1 to indicate uncomputed values
  memo = new Array(numbers.length).fill(-1);

  // Start the recursive function from the first house
  return robFrom(0, numbers);
}

// Helper function to calculate the maximum amount of money that can be robbed from the ith house onwards
function robFrom(i: number, numbers: number[]): number {
  // Base case: No more houses left to examine
  if (i >= numbers.length) {
    return 0;
  }

  // If the result for this subproblem is already computed, return the cached value
  if (memo[i] > -1) {
    return memo[i];
  }

  // Calculate the maximum amount by either:
  // 1. Skipping the current house and moving to the next one
  // 2. Robbing the current house and moving to the house after the next one
  const ans = Math.max(
    robFrom(i + 1, numbers),
    robFrom(i + 2, numbers) + numbers[i],
  );

  // Cache the result for future use
  memo[i] = ans;

  // Return the computed result
  return ans;
}
