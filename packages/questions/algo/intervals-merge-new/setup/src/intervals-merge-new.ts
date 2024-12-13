export default function mergeNewInterval(
  intervals: number[][],
  newInterval: number[],
): number[][] {
  let n = intervals.length,
    i = 0,
    res = [];

  // Case 1: No overlapping before merging intervals
  // Add all intervals that come before the new interval (no overlap)
  while (i < n && intervals[i][1] < newInterval[0]) {
    res.push(intervals[i]);
    i++;
  }

  // Case 2: Overlapping and merging intervals
  // Merge all intervals that overlap with the new interval
  while (i < n && newInterval[1] >= intervals[i][0]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]); // Adjust the start of the new interval
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]); // Adjust the end of the new interval
    i++;
  }
  res.push(newInterval); // Add the merged interval to the result

  // Case 3: No overlapping after merging newInterval
  // Add all remaining intervals after the new interval
  while (i < n) {
    res.push(intervals[i]);
    i++;
  }

  return res;
}
