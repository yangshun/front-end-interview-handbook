export default function findDuplicates(numbers: number[]): boolean {
  // Get the size of the input array for loop iteration
  const n: number = numbers.length;

  // Iterate through each pair of elements in the array
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // Check if the elements at index i and j are the same
      if (numbers[i] === numbers[j]) {
        return true; // Duplicate found, return true
      }
    }
  }

  //No duplicates were found, return false
  return false;
}
