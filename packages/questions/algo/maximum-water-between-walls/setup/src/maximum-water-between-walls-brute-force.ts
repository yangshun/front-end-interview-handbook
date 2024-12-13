export default function maximumWaterBetweenWalls(walls: number[]): number {
  // Initialize the maximum area to 0
  let maxArea = 0;

  // Iterate over each pair of walls
  for (let left = 0; left < walls.length; left++) {
    for (let right = left + 1; right < walls.length; right++) {
      // Calculate the width between the walls
      const width = right - left;

      // Calculate the area using the shorter wall
      const currentArea = Math.min(walls[left], walls[right]) * width;

      // Update maxArea if the current area is larger
      maxArea = Math.max(maxArea, currentArea);
    }
  }

  // Return the maximum area found
  return maxArea;
}
