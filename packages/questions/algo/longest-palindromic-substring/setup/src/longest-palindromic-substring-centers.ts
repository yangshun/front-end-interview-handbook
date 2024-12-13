export default function longestPalindromeSubstring(str: string): string {
  // Helper function to expand around a center and find the longest palindromic substring
  function expand(i: number, j: number): string {
    let left: number = i; // Start pointer for the left side of the potential palindrome
    let right: number = j; // Start pointer for the right side of the potential palindrome

    // Expand outwards while the characters on both sides are equal
    // and the pointers are within bounds of the string
    while (left >= 0 && right < str.length && str[left] === str[right]) {
      left--; // Move left pointer to the left
      right++; // Move right pointer to the right
    }

    // Return the substring that is the palindrome found
    // Note: left + 1 and right are used to get the correct bounds of the palindrome
    return str.slice(left + 1, right);
  }

  let ans: string = ''; // Initialize the variable to store the longest palindromic substring

  // Iterate through each character in the string as potential centers of palindromes
  for (let i = 0; i < str.length; i++) {
    // Find the longest odd-length palindrome with center at `i`
    let odd: string = expand(i, i);
    // Update the result if the found palindrome is longer than the previous longest
    if (odd.length > ans.length) {
      ans = odd;
    }

    // Find the longest even-length palindrome with centers at `i` and `i + 1`
    let even: string = expand(i, i + 1);
    // Update the result if the found palindrome is longer than the previous longest
    if (even.length > ans.length) {
      ans = even;
    }
  }

  // Return the longest palindromic substring found
  return ans;
}
