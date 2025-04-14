export default function findMissingNumberInSequence(numbers: number[]): number {
  const n: number = numbers.length;

  // Iterate through the expected range of numbers from 0 to n
  for (let i = 0; i <= n; i++) {
    // Check if the current number `i` exists in the array
    let found = false;
    for (let j = 0; j < n; j++) {
      if (numbers[j] === i) {
        found = true;
        break; // Stop searching once the number is found
      }
    }

    // If the current number `i` is not found, it's the missing number
    if (!found) {
      return i;
    }
  }

  // Return -1 if no missing number is found (should not happen in valid input)
  return -1;
}
