export default function findMissingNumberInSequence(numbers: number[]): number {
  numbers.sort((a, b) => a - b);

  // Check if the last number is equal to the array length
  if (numbers[numbers.length - 1] !== numbers.length) {
    return numbers.length;
  }
  // Check if the first number is 0
  else if (numbers[0] !== 0) {
    return 0;
  }

  // Iterate through the sorted array to find the missing number
  for (let i = 1; i < numbers.length; i++) {
    const expectedNum = numbers[i - 1] + 1;
    if (numbers[i] !== expectedNum) {
      return expectedNum;
    }
  }

  // Return -1 if no numbers are missing (should not happen in valid input)
  return -1;
}
