// Memoization array to store the state of each position
let memo: string[];

/**
 * Helper function to determine if you can reach to the last position from the current position.
 *
 * @param {number} position - The current position in the array.
 * @param {number[]} numbers - An array of numbers representing maximum jump lengths at each index.
 * @returns {boolean} - True if you can reach the last element from the current position, false otherwise.
 */
const canReachLastPosition = (position: number, numbers: number[]): boolean => {
  // Check the memoization array to see if the result is already computed
  if (memo[position] !== 'UNKNOWN') {
    return memo[position] === 'GOOD';
  }

  // If current position is a stuck position, directly return false
  if (numbers[position] === 0) {
    memo[position] = 'BAD';
    return false;
  }

  // Calculate the furthest position that can be reached from the current position
  const furthestJump = Math.min(
    position + numbers[position],
    numbers.length - 1,
  );

  // Iterate through all positions that can be reached from the current position
  // Iterate backward for better efficiency (reduce redundant calls)
  for (
    let nextPosition = furthestJump;
    nextPosition > position;
    nextPosition--
  ) {
    if (canReachLastPosition(nextPosition, numbers)) {
      memo[position] = 'GOOD';
      return true;
    }
  }

  // If none of the next positions can reach the last position, mark the current position as "BAD"
  memo[position] = 'BAD';
  return false;
};

/**
 * Determines if you can reach the last element in an array, where each element represents
 * the maximum jump length you can make from that position.
 *
 * @param {number[]} numbers - An array of numbers representing maximum jump lengths at each index.
 * @returns {boolean} - True if you can reach the last element, false otherwise.
 */
export default function endOfArrayReachable(numbers: number[]): boolean {
  // Initialize the memoization array with "UNKNOWN"
  memo = new Array(numbers.length).fill('UNKNOWN');

  // The last position is always "GOOD" because we are already there
  memo[memo.length - 1] = 'GOOD';

  // Start the recursion from the first position
  return canReachLastPosition(0, numbers);
}
