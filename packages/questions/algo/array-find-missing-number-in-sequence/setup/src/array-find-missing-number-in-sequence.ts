export default function findMissingNumberInSequence(numbers: number[]): number {
  let expectedSum = 0;
  const n = numbers.length;

  // Calculate the expected sum of all numbers from 0 to n
  for (let i = 0; i <= n; i++) {
    expectedSum += i;
  }

  // Calculate the actual sum of elements in the array
  let actualSum = 0;
  for (const num of numbers) {
    actualSum += num;
  }

  // Return the missing number (expected sum - actual sum)
  return expectedSum - actualSum;
}
