export default function countPalindromicSubstrings(str: string): number {
  const n = str.length;
  let ans = 0;

  // If the string is empty, return 0
  if (n === 0) {
    return 0;
  }

  // Initialize a 2D array (dp) to store whether substrings are palindromic
  const dp: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false));

  // Base case: single letter substrings are always palindromes
  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
    ans++; // Count single letter palindromes
  }

  // Base case: check double letter substrings
  for (let i = 0; i < n - 1; i++) {
    dp[i][i + 1] = str[i] === str[i + 1];
    ans += dp[i][i + 1] ? 1 : 0; // Count double letter palindromes
  }

  // Check all other substrings of length 3 to n
  for (let len = 3; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1; // Ending index of the substring
      dp[i][j] = dp[i + 1][j - 1] && str[i] === str[j];
      ans += dp[i][j] ? 1 : 0; // Count palindromes of length len
    }
  }

  return ans;
}
