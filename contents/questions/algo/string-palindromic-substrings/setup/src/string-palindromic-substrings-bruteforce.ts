function isPalindrome(str: string, low: number, high: number): boolean {
  // Continue checking as long as the left index is less than the right index
  while (low < high) {
    // If characters at low and high do not match, it's not a palindrome
    if (str[low] !== str[high]) {
      return false;
    }
    // Move towards the center
    low++;
    high--;
  }
  // If all characters matched, it's a palindrome
  return true;
}

export default function countPalindromicSubstrings(str: string): number {
  let ans = 0;

  // Iterate over all possible starting points of substrings
  for (let low = 0; low < str.length; low++) {
    // Iterate over all possible ending points of substrings starting at low
    for (let high = low; high < str.length; high++) {
      // Increment ans if the substring s[low...high] is a palindrome
      ans += isPalindrome(str, low, high) ? 1 : 0;
    }
  }

  return ans;
}
