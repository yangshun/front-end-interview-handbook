export default function shortestSubstringContainingCharacters(
  str1: string,
  str2: string,
): string {
  // Edge case: If either string is empty, return an empty string.
  if (str1.length === 0 || str2.length === 0) {
    return '';
  }

  // Dictionary to keep track of the frequency of each character in `str2`.
  let dictT: Map<string, number> = new Map();
  for (let i = 0; i < str2.length; i++) {
    dictT.set(str2.charAt(i), (dictT.get(str2.charAt(i)) || 0) + 1);
  }

  // Number of unique characters in `str2` that must be present in the desired window.
  let required: number = dictT.size;

  // Pointers for the sliding window technique.
  let left = 0,
    right = 0;

  // `formed` tracks how many unique characters in the current window match the desired count.
  let formed: number = 0;

  // Dictionary to count the characters in the current window.
  let windowCounts: Map<string, number> = new Map();

  // Result placeholder to store the smallest window found (length, left index, right index).
  let ans: number[] = [-1, 0, 0];

  // Expand the window by moving the right pointer (`right`) to the right.
  while (right < str1.length) {
    // Add the character at the right pointer to the window's counts.
    let c: string = str1.charAt(right);
    windowCounts.set(c, (windowCounts.get(c) || 0) + 1);

    // If the current character's count in the window matches its count in `str2`, increase `formed`.
    if (dictT.has(c) && windowCounts.get(c) === dictT.get(c)) {
      formed++;
    }

    // Try to contract the window by moving the left pointer (`left`) to the right.
    while (left <= right && formed === required) {
      c = str1.charAt(left);

      // Update the result if this window is smaller than the previously found smallest window.
      if (ans[0] === -1 || right - left + 1 < ans[0]) {
        ans[0] = right - left + 1;
        ans[1] = left;
        ans[2] = right;
      }

      // Remove the character at the left pointer from the window's counts.
      windowCounts.set(c, windowCounts.get(c)! - 1);

      // If the count of this character in the window falls below its count in `str2`, reduce `formed`.
      if (dictT.has(c) && windowCounts.get(c)! < dictT.get(c)!) {
        formed--;
      }

      // Move the left pointer to the right, contracting the window.
      left++;
    }

    // Move the right pointer to the right, expanding the window.
    right++;
  }

  // Return the smallest window found, or an empty string if no such window exists.
  return ans[0] === -1 ? '' : str1.substring(ans[1], ans[2] + 1);
}
