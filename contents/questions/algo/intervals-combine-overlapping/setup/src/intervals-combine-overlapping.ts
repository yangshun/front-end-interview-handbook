export default function mergeOverlappingIntervals(
  intervals: number[][],
): number[][] {
  // Sort the intervals by their starting points
  intervals.sort((a, b) => a[0] - b[0]);

  // Initialize an array to hold the merged intervals
  let merged: number[][] = [];

  // Iterate through each interval
  for (let interval of intervals) {
    // If the merged list is empty or the current interval does not overlap with the previous, append it
    if (merged.length === 0 || merged[merged.length - 1][1] < interval[0]) {
      merged.push(interval);
    }
    // Otherwise, there is overlap, so merge the current and previous intervals
    else {
      merged[merged.length - 1][1] = Math.max(
        merged[merged.length - 1][1],
        interval[1],
      );
    }
  }

  // Return the merged intervals
  return merged;
}
