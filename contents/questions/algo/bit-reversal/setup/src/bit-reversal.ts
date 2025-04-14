export default function bitReversal(n: number): number {
  // Initialize result as 0
  let reversed = 0;

  // Iterate over each bit position
  for (let i = 0; i < 32; i++) {
    // Extract the least significant bit (LSB)
    const leastSignificantBit = n & 1;

    // Shift the LSB to the most significant position of the reversed number
    reversed = (reversed << 1) | leastSignificantBit;

    // Right shift the original number to process the next bit
    n >>= 1;
  }

  return reversed >>> 0; // Ensure the result is an unsigned 32-bit integer
}
