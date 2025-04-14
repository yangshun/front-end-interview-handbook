export default function mostCommonElements(
  numbers: number[],
  k: number,
): number[] {
  const frequency: { value: number; count: number }[] = [];

  // Step 1: Calculate frequencies manually using nested loops
  for (let i = 0; i < numbers.length; i++) {
    let found = false;
    for (let j = 0; j < frequency.length; j++) {
      if (frequency[j].value === numbers[i]) {
        frequency[j].count++;
        found = true;
        break;
      }
    }
    if (!found) {
      frequency.push({ value: numbers[i], count: 1 });
    }
  }

  // Step 2: Sort the frequencies array by count in descending order
  frequency.sort((a, b) => b.count - a.count);

  // Step 3: Extract the `k` most common elements
  const result: number[] = [];
  for (let i = 0; i < k && i < frequency.length; i++) {
    result.push(frequency[i].value);
  }

  return result;
}
