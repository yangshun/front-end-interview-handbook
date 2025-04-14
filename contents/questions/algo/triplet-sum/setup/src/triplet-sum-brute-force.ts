export default function tripletSum(numbers: number[]): number[][] {
  // Set to store unique triplets
  const uniqueTriplets = new Set<string>();
  const n = numbers.length;

  // Iterate through the array to find triplets
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        // Check if the sum of three numbers is zero
        if (numbers[i] + numbers[j] + numbers[k] === 0) {
          // Sort the triplet to maintain order
          const triplet = [numbers[i], numbers[j], numbers[k]].sort(
            (a, b) => a - b,
          );
          // Convert to string for set storage
          uniqueTriplets.add(JSON.stringify(triplet));
        }
      }
    }
  }
  // result should be in sorted order as mentioned in the description.
  const result: number[][] = Array.from(uniqueTriplets)
    .map((triplet) => JSON.parse(triplet))
    .sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);

  return result;
}
