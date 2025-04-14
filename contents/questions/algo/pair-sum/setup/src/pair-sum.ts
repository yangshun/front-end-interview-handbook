export default function pairSum(numbers: number[], target: number): number[] {
  const hash: { [key: number]: number } = {};

  for (let i = 0; i < numbers.length; i++) {
    const complement = target - numbers[i];

    // Check if the complement exists (excluding the current element)
    if (hash.hasOwnProperty(complement) && hash[complement] !== i) {
      return [hash[complement], i];
    }

    // Store the number and its index in the hash map
    hash[numbers[i]] = i;
  }

  // No solution found
  return [];
}
