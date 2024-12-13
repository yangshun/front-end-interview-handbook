export default function combinationTargetSum(
  numbers: number[],
  target: number,
): number {
  // Initialize the memoization map
  const memo = new Map<number, number>();

  // Helper function for recursion with memoization
  function combs(remain: number): number {
    // Base case: if remaining target is 0, there is one valid combination
    if (remain === 0) return 1;
    // If the result for the current remaining target is already computed, return it
    if (memo.has(remain)) return memo.get(remain)!;

    let result = 0;
    // Iterate through the numbers to calculate combinations
    for (const num of numbers) {
      // Only proceed if the remaining target after subtracting the current number is non-negative
      if (remain - num >= 0) {
        result += combs(remain - num);
      }
    }
    // Store the computed result in the memoization map
    memo.set(remain, result);
    return result;
  }

  // Start the recursive function
  return combs(target);
}
