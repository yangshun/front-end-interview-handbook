export default function productExceptSelf(numbers: number[]): number[] {
  // Get the length of the input array
  const length = numbers.length;

  // Initialize the result array
  const result: number[] = new Array(length).fill(1);

  // Calculate products of all elements to the left of each index
  for (let i = 1; i < length; i++) {
    // result[i] contains the product of all elements to the left of index 'i'
    result[i] = numbers[i - 1] * result[i - 1];
  }

  // Variable to hold the product of all elements to the right
  let rightProduct = 1;
  for (let i = length - 1; i >= 0; i--) {
    // Multiply the right product with the current result
    result[i] *= rightProduct;
    // Update rightProduct with the current element
    rightProduct *= numbers[i];
  }

  // Convert -0 or +0 to normal 0
  for (let i = 0; i < length; i++) {
    if (result[i] === -0) {
      result[i] = 0;
    }
  }

  return result;
}
