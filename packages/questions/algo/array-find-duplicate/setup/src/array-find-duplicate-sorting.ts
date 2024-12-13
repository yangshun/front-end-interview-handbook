export default function findDuplicates(numbers: number[]): boolean {
  // Sort the array in ascending order
  numbers.sort((a, b) => a - b);

  // Iterate through the sorted array
  for (let i = 0; i < numbers.length - 1; i++) {
    // Check if the current element is equal to the next element
    if (numbers[i] === numbers[i + 1]) {
      return true; // If a duplicate is found, return true
    }
  }

  // If no duplicates are found, return false
  return false;
}
