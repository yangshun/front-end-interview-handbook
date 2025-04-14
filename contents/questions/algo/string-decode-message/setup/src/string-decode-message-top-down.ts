// Recursive function with memoization to count the number of ways to decode a string
function recursiveWithMemo(
  index: number, // Current index in the string
  str: string, // The input string to decode
  memo: Map<number, number>, // Memoization map to store previously computed results
): number {
  // If the result for the current index is already computed, return it from the memo
  if (memo.has(index)) {
    return memo.get(index)!;
  }
  // If the current index has reached the end of the string, return 1 (valid decode)
  if (index === str.length) {
    return 1;
  }
  // If the current character is '0', return 0 (no valid decode)
  if (str.charAt(index) === '0') {
    return 0;
  }
  // If the current index is the last character, return 1 (single valid decode)
  if (index === str.length - 1) {
    return 1;
  }

  // Initialize the answer by decoding one character
  let ans = recursiveWithMemo(index + 1, str, memo);

  // Check if the next two characters form a valid number <= 26 and decode it
  if (parseInt(str.substring(index, index + 2)) <= 26) {
    ans += recursiveWithMemo(index + 2, str, memo);
  }

  // Store the computed result in the memo map
  memo.set(index, ans);
  return ans;
}

export default function decodeMessage(str: string): number {
  let memo = new Map<number, number>();
  return recursiveWithMemo(0, str, memo);
}
