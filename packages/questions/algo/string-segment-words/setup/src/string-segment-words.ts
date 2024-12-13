export default function segmentWords(str: string, dict: string[]): boolean {
  // Create a set from the word dictionary for quick lookup
  const dictSet = new Set(dict);

  // Create a DP array initialized to false, with an extra space for the base case
  const dp: boolean[] = new Array(str.length + 1).fill(false);
  dp[0] = true; // Base case: an empty string can always be segmented

  // Iterate over the end positions of the substring
  for (let end = 1; end <= str.length; end++) {
    // Iterate over the start positions of the substring
    for (let start = 0; start < end; start++) {
      // If the substring from start to end can be segmented
      if (dp[start] && dictSet.has(str.substring(start, end))) {
        dp[end] = true; // Mark the end position as true
        break; // No need to check further start positions for this end
      }
    }
  }

  // The last element in dp represents whether the entire string can be segmented
  return dp[str.length];
}
