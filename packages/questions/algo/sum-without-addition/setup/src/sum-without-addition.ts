export default function sumWithoutAddition(a: number, b: number): number {
  // Initialize a variable carry to hold the carry bits generated during each iteration
  let carry: number = 0;

  // Loop continues as long as there's a carry bit or bits to process in a or b
  while (b !== 0 || carry !== 0) {
    // Extract the carry bit from the AND operation of a and b
    carry = a & b;

    // Use the XOR operation to add a and b without the carry bit
    a = a ^ b;

    // Left shift the carry bit for the next iteration
    b = carry << 1;
  }

  // Return the final result, which is stored in 'a' after all carry bits have been processed
  return a;
}
