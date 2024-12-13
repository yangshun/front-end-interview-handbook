export default function mostCommonElements(
  numbers: number[],
  k: number,
): number[] {
  const frequencyMap: { [key: number]: number } = {};

  // Count the frequency of each number in the array
  for (let i = 0; i < numbers.length; i++) {
    frequencyMap[numbers[i]] = (frequencyMap[numbers[i]] || 0) + 1;
  }

  // Create an array of buckets where the index represents the frequency
  const buckets: number[][] = Array(numbers.length + 1)
    .fill(null)
    .map(() => []);

  // Place numbers into the corresponding bucket based on their frequency
  for (const num in frequencyMap) {
    const frequency = frequencyMap[num];
    buckets[frequency].push(Number(num));
  }

  const result: number[] = [];

  // Iterate from the highest frequency bucket to the lowest
  for (let i = buckets.length - 1; i >= 0 && k > 0; i--) {
    if (buckets[i].length > 0) {
      for (const num of buckets[i]) {
        result.push(num);
        k--;
        if (k === 0) break;
      }
    }
  }

  return result;
}
