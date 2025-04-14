export default function shortestSubstringContainingCharacters(
  str1: string,
  str2: string,
): string {
  // If either input string is empty, return an empty string as there's no valid window
  if (str1.length === 0 || str2.length === 0) {
    return '';
  }

  // Build a frequency map of characters in `str2` (target string)
  const dictT: Record<string, number> = {};
  for (let char of str2) {
    dictT[char] = (dictT[char] || 0) + 1; // Increment count of each character
  }

  // The number of unique characters in `str2` that must appear in the desired window
  const required = Object.keys(dictT).length;

  // Filter `str1` to include only characters present in `str2`
  // Store as tuples of [index, character]
  const filteredStr1: [number, string][] = [];
  for (let i = 0; i < str1.length; i++) {
    const char = str1[i];
    if (char in dictT) {
      filteredStr1.push([i, char]); // Keep only relevant characters with their indices
    }
  }

  // Initialize sliding window pointers
  let left = 0,
    right = 0;

  // Track how many characters from `dictT` have their required frequency in the current window
  let formed = 0;

  // A map to count characters in the current window
  const windowCounts: Record<string, number> = {};

  // Result to store the smallest window found: [window length, left index, right index]
  let ans: [number, number, number] = [-1, 0, 0];

  // Expand the window by moving the `right` pointer
  while (right < filteredStr1.length) {
    // Character at the right pointer in the filtered string
    const char = filteredStr1[right][1];
    windowCounts[char] = (windowCounts[char] || 0) + 1; // Increment count in the window

    // If the current character's count matches the required count, increment `formed`
    if (dictT[char] && windowCounts[char] === dictT[char]) {
      formed++;
    }

    // Try contracting the window from the left as long as all required characters are present
    while (left <= right && formed === required) {
      // Get the actual indices of the current window from the filtered string
      const start = filteredStr1[left][0];
      const end = filteredStr1[right][0];

      // Update the result if the current window is smaller than the previously found one
      if (ans[0] === -1 || end - start + 1 < ans[0]) {
        ans = [end - start + 1, start, end];
      }

      // Character to be removed from the window as the left pointer moves
      const charToRemove = filteredStr1[left][1];
      windowCounts[charToRemove] -= 1; // Decrement count in the window

      // If the character's count falls below the required count, decrement `formed`
      if (
        dictT[charToRemove] &&
        windowCounts[charToRemove] < dictT[charToRemove]
      ) {
        formed--;
      }

      // Move the left pointer to shrink the window
      left++;
    }

    // Move the right pointer to expand the window
    right++;
  }

  // If no valid window is found, return an empty string
  return ans[0] === -1 ? '' : str1.substring(ans[1], ans[2] + 1);
}
