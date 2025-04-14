export default function maximumWaterBetweenWalls(walls: number[]): number {
  // Initialize variables for pointers and maximum area
  let left = 0;
  let right = walls.length - 1;
  let maxWaterArea = 0;

  // Iterate while left and right pointers haven't crossed
  while (left < right) {
    // Calculate the area formed between the walls pointed by 'left' and 'right'.
    // The height is limited by the shorter wall, and the width is (right - left).
    const currentArea = (right - left) * Math.min(walls[left], walls[right]);
    maxWaterArea = Math.max(maxWaterArea, currentArea);

    // Move the pointer with the shorter height towards the center
    // By doing this, we give a chance to find a taller wall and potentially increase the area.
    if (walls[left] < walls[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWaterArea;
}
