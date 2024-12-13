export default function longestConsecutiveNumberSeq(numbers: number[]): number {
  // Return 0 if the array is empty
  if (numbers.length == 0) {
    return 0;
  }

  // Sort the array in ascending order
  numbers.sort((a, b) => a - b);

  // Initialize the longest and current streaks
  let longestStreak = 1;
  let currentStreak = 1;

  // Iterate through the sorted array starting from the second element
  for (let i = 1; i < numbers.length; i++) {
    // Check if the current number is different from the previous number
    if (numbers[i] != numbers[i - 1]) {
      // Check if the current number is consecutive to the previous number
      if (numbers[i] == numbers[i - 1] + 1) {
        currentStreak += 1;
      } else {
        // Update the longest streak if the current streak is longer
        longestStreak = Math.max(longestStreak, currentStreak);
        // Reset the current streak
        currentStreak = 1;
      }
    }
  }

  // Return the maximum of the longest streak and the current streak
  return Math.max(longestStreak, currentStreak);
}
