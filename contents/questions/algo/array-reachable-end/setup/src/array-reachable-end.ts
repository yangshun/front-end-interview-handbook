export default function arrayReachableEnd(numbers: number[]): boolean {
  // Initialize a variable to track the farthest reachable position (last element initially)
  let farthestReachable = numbers.length - 1;

  // Iterate backwards through the array (from the end)
  for (
    let currentPosition = numbers.length - 1;
    currentPosition >= 0;
    currentPosition--
  ) {
    // Check if the current position can reach the farthest reachable position
    if (currentPosition + numbers[currentPosition] >= farthestReachable) {
      // Update the farthest reachable position if the current position can reach it
      farthestReachable = currentPosition;
    }
  }

  // Return true if the farthest reachable position is the
  // first element (meaning you can reach the end)
  return farthestReachable === 0;
}
