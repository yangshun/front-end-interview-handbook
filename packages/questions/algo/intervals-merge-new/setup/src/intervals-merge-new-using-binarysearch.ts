export default function mergeNewInterval(
  intervals: number[][],
  newInterval: number[],
): number[][] {
  // If the intervals array is empty, return a list containing the newInterval
  if (intervals.length === 0) {
    return [newInterval];
  }

  let n = intervals.length;
  let target = newInterval[0]; // The start value of the new interval
  let left = 0,
    right = n - 1;

  // Binary search to find the position to insert newInterval
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (intervals[mid][0] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // Insert newInterval at the found position
  intervals.splice(left, 0, newInterval);

  // Initialize the result array to hold merged intervals
  let res: number[][] = [];
  for (let interval of intervals) {
    // If res is empty or there is no overlap, add the interval to the result
    if (res.length === 0 || res[res.length - 1][1] < interval[0]) {
      res.push(interval);
      // If there is an overlap, merge the intervals by updating the end of the last interval in res
    } else {
      res[res.length - 1][1] = Math.max(res[res.length - 1][1], interval[1]);
    }
  }
  return res; // Return the merged intervals
}
