export default function countOnesInBinary(num: number): number {
  // Count the number of set bits using Brian Kernighan's algorithm
  let count: number = 0;
  while (num !== 0) {
    count += num & 1; // Check the least significant bit whether it is a set bit and update the counting result
    num >>>= 1; // Unsigned right shift by 1 bit
  }
  return count;
}
