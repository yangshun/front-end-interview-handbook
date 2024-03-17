export default function mean(array: Array<number>): number {
  let total: number = 0;

  // Calculate the sum of all numbers in the array.
  for (let i = 0; i < array.length; i++) {
    total += array[i];
  }

  // Calculate the mean from the sum.
  return total / array.length;
}
