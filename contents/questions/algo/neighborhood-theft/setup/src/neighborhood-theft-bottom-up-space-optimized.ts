export default function neighborhoodTheft(numbers: number[]): number {
  const N = numbers.length;

  // Special handling for empty case (no houses to rob).
  if (N === 0) {
    return 0;
  }

  // If there's only one house, return its value.
  if (N === 1) {
    return numbers[0];
  }

  // Initialize two variables to keep track of the maximum amounts:
  // prev1: max amount for robbing from house i+1 to the end
  // prev2: max amount for robbing from house i+2 to the end
  let prev1 = 0; // Equivalent to maxRobbedAmount[i+1]
  let prev2 = 0; // Equivalent to maxRobbedAmount[i+2]

  // Iterate backwards from the last house
  for (let i = N - 1; i >= 0; i--) {
    // Current maximum is either:
    // - Skipping the current house (prev1)
    // - Robbing the current house and adding prev2
    const current = Math.max(prev1, prev2 + numbers[i]);

    // Update prev2 and prev1 for the next iteration
    prev2 = prev1;
    prev1 = current;
  }

  // The final result is stored in prev1
  return prev1;
}
