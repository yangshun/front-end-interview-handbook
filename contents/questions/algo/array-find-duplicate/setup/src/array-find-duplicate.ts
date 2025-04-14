export default function findDuplicates(numbers: number[]): boolean {
  // Create a set to store unique elements seen so far
  const seen: Set<number> = new Set();

  // Get the size of the input array for loop iteration
  const n: number = numbers.length;

  // Iterate through each element in the nums array
  for (let i = 0; i < n; i++) {
    // Try inserting the current element into the set
    // If insertion fails, it means the element already exists (duplicate)
    if (seen.has(numbers[i])) {
      return true; // Duplicate found, return true
    }
    seen.add(numbers[i]);
  }

  // If we reach here, no duplicates were found, return false
  return false;
}
