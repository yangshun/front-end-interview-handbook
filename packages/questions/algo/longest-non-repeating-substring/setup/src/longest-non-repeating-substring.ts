export default function longestUniqueSubstring(str: string): number {
  // Create a map to store the last seen position of each character in the string
  const map = new Map<string, number>();

  // Initialize variables to keep track of the maximum length of the substring without repeating characters
  let maxLen = 0;

  // 'left' is the starting index of the current substring being evaluated
  let left = 0;

  // Iterate over the string with 'right' as the end index of the current substring
  for (let right = 0; right < str.length; right++) {
    // If the current character has been seen before and is within the current substring
    if (map.has(str[right])) {
      // Move the 'left' pointer to the right of the last seen position of the current character
      // This ensures the substring being evaluated doesn't contain duplicate characters
      left = Math.max(map.get(str[right])!, left);
    }

    // Update the maximum length of the substring found so far
    maxLen = Math.max(maxLen, right - left + 1);

    // Store the current character's position in the map, adding 1 to handle 0-based indexing
    map.set(str[right], right + 1);
  }

  // Return the length of the longest substring without repeating characters
  return maxLen;
}
