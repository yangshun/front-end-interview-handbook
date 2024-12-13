export default function longestConsecutiveNumberSeq(numbers: number[]): number {
  // Create a set from the array to remove duplicates and allow O(1) lookups
  let num_set: Set<number> = new Set(numbers);

  // Variable to keep track of the longest streak found
  let longestStreak: number = 0;

  // Iterate over each number in the set
  num_set.forEach((num) => {
    // Check if it's the start of a sequence (no preceding number)
    if (!num_set.has(num - 1)) {
      let currentNum: number = num; // Current number in the sequence
      let currentStreak: number = 1; // Current streak length

      // Continue the sequence while the next number is in the set
      while (num_set.has(currentNum + 1)) {
        currentNum += 1;
        currentStreak += 1;
      }

      // Update the longest streak found so far
      longestStreak = Math.max(longestStreak, currentStreak);
    }
  });

  // Return the length of the longest consecutive sequence
  return longestStreak;
}
