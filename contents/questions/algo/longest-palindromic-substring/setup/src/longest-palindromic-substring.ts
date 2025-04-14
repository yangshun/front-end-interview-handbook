export default function longestPalindromeSubstring(str: string): string {
  const n = str.length;

  // Initialize a 2D array `dp` where dp[i][j] will be true if the substring s[i..j] is a palindrome
  const dp: boolean[][] = Array.from(Array(n), () => Array(n).fill(false));

  // `ans` will store the starting and ending indices of the longest palindromic substring found
  let ans = [0, 0];

  // Every single character is a palindrome, so set dp[i][i] to true for all i
  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
  }

  // Check for palindromes of length 2 (i.e., pairs of consecutive characters)
  for (let i = 0; i < n - 1; i++) {
    if (str[i] === str[i + 1]) {
      dp[i][i + 1] = true;
      ans = [i, i + 1]; // Update the longest palindrome indices
    }
  }

  // Check for palindromes of length 3 and greater
  for (let diff = 2; diff < n; diff++) {
    for (let i = 0; i < n - diff; i++) {
      let j = i + diff;
      // If the characters at the start and end of the substring are equal
      // and the substring s[i+1..j-1] is a palindrome, then s[i..j] is a palindrome
      if (str[i] === str[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
        ans = [i, j]; // Update the longest palindrome indices
      }
    }
  }

  // Extract the longest palindromic substring from the string using the indices stored in `ans`
  const i = ans[0];
  const j = ans[1];
  return str.slice(i, j + 1);
}
