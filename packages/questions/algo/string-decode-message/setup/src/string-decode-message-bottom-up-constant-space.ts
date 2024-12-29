export default function decodeMessage(str: string): number {
  // Handle edge case: empty string
  if (str.length === 0) return 0;

  // Variables to store the last two results
  let prev = 1; // Represents dp[i-2], initialized for empty string
  let curr = str[0] === '0' ? 0 : 1; // Represents dp[i-1]

  // Iterate through the string
  for (let i = 2; i <= str.length; i++) {
    let temp = 0; // Temporarily store the current dp[i]

    // Check if successful single-digit decode is possible
    if (str[i - 1] !== '0') {
      temp += curr;
    }

    // Check if successful two-digit decode is possible
    const twoDigit = parseInt(str.substring(i - 2, i), 10);
    if (twoDigit >= 10 && twoDigit <= 26) {
      temp += prev;
    }

    // Update prev and curr for the next iteration
    prev = curr;
    curr = temp;
  }

  // The last value of curr contains the result
  return curr;
}
