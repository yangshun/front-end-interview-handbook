// Enum to represent the state of each index in the array
enum Index {
  GOOD, // Represents a position from which you can reach the last position
  BAD, // Represents a position from which you cannot reach the last position
  UNKNOWN, // Represents an unknown state
}

/**
 * Determines if you can reach the last element in an array, where each element represents
 * the maximum positions you can reach from that index.
 *
 * @param {number[]} numbers - An array of numbers representing maximum positions reachable from that index.
 * @returns {boolean} - True if you can reach the last index, false otherwise.
 */
export default function arrayReachableEnd(numbers: number[]): boolean {
  // Initialize the memoization array with "UNKNOWN"
  let memo: Index[] = Array(numbers.length).fill(Index.UNKNOWN);

  // The last position is always "GOOD" because we are already there
  memo[memo.length - 1] = Index.GOOD;

  // Iterate from the second last position to the first position
  for (let i = numbers.length - 2; i >= 0; i--) {
    // Calculate the furthest position that can be reached from the current position
    let furthestPosition: number = Math.min(i + numbers[i], numbers.length - 1);

    // Check if any reachable position from the current position is "GOOD"
    for (let j = i + 1; j <= furthestPosition; j++) {
      if (memo[j] == Index.GOOD) {
        // Mark the current position as "GOOD" if a reachable position is "GOOD"
        memo[i] = Index.GOOD;
        break;
      }
    }
  }

  // Return true if the first position is "GOOD", meaning you can reach the last element
  return memo[0] == Index.GOOD;
}
