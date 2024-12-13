export default function longestSubstringReplacement(
  str: string,
  k: number,
): number {
  // Binary search over the length of the substring
  // `low` holds the valid value, and `high` holds the invalid value
  let low = 1;
  let high = str.length + 1;

  while (low + 1 < high) {
    const mid = low + Math.floor((high - low) / 2);

    // Check if we can make a valid substring of length `mid`
    if (canMakeValidSubstring(str, mid, k)) {
      // Explore the right half
      low = mid;
    } else {
      // Explore the left half
      high = mid;
    }
  }

  // Return the length of the longest substring that satisfies the condition
  return low;
}

// Helper function to check if a valid substring of a given length can be made
function canMakeValidSubstring(
  str: string,
  substringLength: number,
  k: number,
): boolean {
  // Frequency map to store the frequency of characters in the current window
  const freqMap: number[] = new Array(26).fill(0);
  let maxFrequency = 0;
  let start = 0;

  for (let end = 0; end < str.length; end++) {
    // Update the frequency of the current character
    freqMap[str.charCodeAt(end) - 'A'.charCodeAt(0)] += 1;

    // If the window [start, end] exceeds `substringLength`, move the start pointer
    if (end + 1 - start > substringLength) {
      // Decrease the frequency of the character at the start before moving the pointer
      freqMap[str.charCodeAt(start) - 'A'.charCodeAt(0)] -= 1;
      start += 1;
    }

    // Record the maximum frequency seen so far
    maxFrequency = Math.max(
      maxFrequency,
      freqMap[str.charCodeAt(end) - 'A'.charCodeAt(0)],
    );

    // Check if the current window can be made valid with at most `k` replacements
    if (substringLength - maxFrequency <= k) {
      return true;
    }
  }

  // If no valid substring of the given size was found
  return false;
}
