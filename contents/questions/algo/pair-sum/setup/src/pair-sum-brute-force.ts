export default function pairSum(numbers: number[], target: number): number[] {
  // Iterate through each element in the array
  for (let i = 0; i < numbers.length; i++) {
    // For each element, iterate through the elements that come after it
    for (let j = i + 1; j < numbers.length; j++) {
      // If the sum of the two elements equals the target, return their indices
      if (numbers[j] === target - numbers[i]) {
        return [i, j];
      }
    }
  }
  // Return an empty array if no solution is found
  return [];
}
