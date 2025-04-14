export default function neighborhoodTheftCircular(numbers: number[]): number {
  // If there are no houses, return 0
  if (numbers.length === 0) return 0;
  // If there is only one house, return the amount in that house
  if (numbers.length === 1) return numbers[0];

  // Calculate the maximum amount of money that can be robbed by excluding either the first or the last house
  const max1 = robSimple(numbers, 0, numbers.length - 2);
  const max2 = robSimple(numbers, 1, numbers.length - 1);

  // Return the maximum amount from the two calculated values
  return Math.max(max1, max2);
}

// Helper function to find the maximum amount of money that can be robbed from a range of houses
function robSimple(numbers: number[], start: number, end: number): number {
  let t1 = 0,
    t2 = 0;

  // Iterate over the range of houses
  for (let i = start; i <= end; i++) {
    // Store the current value of t1 in a temporary variable
    const temp = t1;
    // Update t1 to be the maximum of robbing the current house plus the amount from t2, or the current value of t1
    t1 = Math.max(numbers[i] + t2, t1);
    // Update t2 to the previous value of t1
    t2 = temp;
  }

  // Return the maximum amount of money that can be robbed from the given range of houses
  return t1;
}
