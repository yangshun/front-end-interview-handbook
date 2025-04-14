export default function longestConsecutiveNumberSeq(numbers: number[]): number {
  // Return 0 if the array is empty
  if (numbers.length === 0) {
    return 0;
  }

  // Variable to track the longest streak of consecutive numbers
  let longestStreak = 0;

  // Iterate through each number in the array
  for (let i = 0; i < numbers.length; i++) {
    // Start a new sequence with the current number
    let currentNum = numbers[i];
    let currentStreak = 1;

    // Keep checking for the next consecutive numbers
    while (numbers.includes(currentNum + 1)) {
      // Increment the current number and the streak length
      currentNum += 1;
      currentStreak += 1;
    }

    // Update the longest streak if the current streak is longer
    longestStreak = Math.max(longestStreak, currentStreak);
  }

  // Return the length of the longest consecutive number sequence
  return longestStreak;
}
