export default function longestIncreasingSubsequence(
  numbers: number[],
): number {
  // Initialize an array dp where dp[i] will store the length of the longest increasing subsequence ending at index i
  const dp: number[] = new Array(numbers.length).fill(1);

  // Iterate through each element in numbers array starting from the second element
  for (let i = 1; i < numbers.length; i++) {
    // Compare current element numbers[i] with all previous elements numbers[j] where j < i
    for (let j = 0; j < i; j++) {
      // If numbers[i] is greater than numbers[j], it means we can extend the subsequence ending at i with j
      if (numbers[i] > numbers[j]) {
        // Update dp[i] to be the maximum of its current value or dp[j] + 1
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  // Find the maximum value in dp array, which represents the length of the longest increasing subsequence
  let longest = 0;
  for (let c of dp) {
    longest = Math.max(longest, c);
  }

  // Return the length of the longest increasing subsequence
  return longest;
}
