export default function pairSum(numbers: number[], target: number): number[] {
  const hash: { [key: number]: number } = {};

  // First pass: Populate the hash table with numbers and their indices
  for (let i = 0; i < numbers.length; i++) {
    hash[numbers[i]] = i;
  }

  // Second pass: Check for the complement
  for (let i = 0; i < numbers.length; i++) {
    const complement = target - numbers[i];

    // Ensure complement exists and is not the same index as the current one
    if (complement in hash && hash[complement] !== i) {
      return [i, hash[complement]];
    }
  }

  // If no solution is found
  return [];
}
