export default function isMeetingCalendarValid(intervals: number[][]): boolean {
  // Sort the intervals based on the start times
  intervals.sort((a, b) => a[0] - b[0]);

  // Iterate through the sorted intervals
  for (let i = 0; i < intervals.length - 1; i++) {
    // Check if the end time of the current interval is greater than the start time of the next interval
    if (intervals[i][1] > intervals[i + 1][0]) {
      return false; // If there is an overlap, return false
    }
  }

  // If no overlaps are found, return true
  return true;
}
