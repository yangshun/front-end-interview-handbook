export default function longestUniqueSubstring(str: string): number {
  let n = str.length; // Get the length of the input string
  let res = 0; // Variable to store the length of the longest substring without repeating characters

  // Iterate over all possible starting points of substrings
  for (let i = 0; i < n; i++) {
    // Initializing all characters as not visited
    let visited = new Array(256).fill(false);

    for (let j = i; j < n; j++) {
      // If current character is visited
      // Break the loop
      if (visited[str.charCodeAt(j)] === true) {
        break;
      } else {
        // Else update the result if this window is larger,
        // and mark current character as visited.
        res = Math.max(res, j - i + 1);
        visited[str.charCodeAt(j)] = true;
      }
    }
  }
  return res;
}
