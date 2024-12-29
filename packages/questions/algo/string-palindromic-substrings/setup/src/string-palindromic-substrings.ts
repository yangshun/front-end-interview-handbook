export default function countPalindromicSubstrings(str: string): number {
  let ans = 0;

  // Iterate through each character in the string
  for (let i = 0; i < str.length; i++) {
    // Count odd-length palindromes with a single character center
    ans += countPalindromesAroundCenter(str, i, i);

    // Count even-length palindromes with consecutive characters as the center
    ans += countPalindromesAroundCenter(str, i, i + 1);
  }

  return ans;
}

function countPalindromesAroundCenter(
  str: string,
  low: number,
  high: number,
): number {
  let ans = 0;

  // Expand around the center as long as the characters at the edges match
  while (low >= 0 && high < str.length) {
    if (str[low] !== str[high]) {
      break; // Stop if characters don't match
    }

    // Expand the window outward
    low--;
    high++;

    // Increment the palindrome count
    ans++;
  }

  return ans;
}
