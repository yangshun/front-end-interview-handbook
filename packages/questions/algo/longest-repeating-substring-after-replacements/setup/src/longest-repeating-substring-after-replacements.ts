export default function longestSubstringReplacement(
  str: string,
  k: number,
): number {
  let start = 0;
  const frequencyMap: number[] = new Array(26).fill(0);
  let maxFrequency = 0;
  let longestSubstringLength = 0;

  for (let end = 0; end < str.length; end++) {
    // Calculate the relative order of the current character entering the window
    const currentChar = str.charCodeAt(end) - 'A'.charCodeAt(0);

    // Increment the frequency of the current character
    frequencyMap[currentChar] += 1;

    // Update the maximum frequency we've seen in any window
    maxFrequency = Math.max(maxFrequency, frequencyMap[currentChar]);

    // If the window is invalid, move the start pointer to the right
    const isValid = end + 1 - start - maxFrequency <= k;
    if (!isValid) {
      const outgoingChar = str.charCodeAt(start) - 'A'.charCodeAt(0);

      // Decrease the frequency of the outgoing character
      frequencyMap[outgoingChar] -= 1;

      // Move the start pointer forward
      start += 1;
    }

    // The window is valid at this point, update the length of the longest valid substring
    longestSubstringLength = end + 1 - start;
  }

  return longestSubstringLength;
}
