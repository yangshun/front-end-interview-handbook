export default function longestPalindromeSubstring(str: string): string {
  // Helper function to check if the substring s[i:j] is a palindrome
  const check = (i: number, j: number) => {
    let left = i; // Start pointer
    let right = j - 1; // End pointer (one less because j is exclusive)

    // Check characters from both ends moving towards the center
    while (left < right) {
      // If the characters at the current pointers don't match, it's not a palindrome
      if (str.charAt(left) !== str.charAt(right)) {
        return false;
      }

      // Move pointers closer to the center
      left++;
      right--;
    }

    // If all characters matched, it's a palindrome
    return true;
  };

  // Iterate over possible lengths of the substring, starting from the longest
  for (let length = str.length; length > 0; length--) {
    // For each length, iterate over all possible starting points of the substring
    for (let start = 0; start <= str.length - length; start++) {
      // If the substring s[start:start+length] is a palindrome, return it
      if (check(start, start + length)) {
        return str.substring(start, start + length);
      }
    }
  }

  // If no palindrome is found (though technically it shouldn't happen), return an empty string
  return '';
}
