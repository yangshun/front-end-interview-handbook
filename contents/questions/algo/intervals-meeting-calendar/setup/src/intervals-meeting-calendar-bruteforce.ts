export default function isMeetingCalendarValid(intervals: number[][]): boolean {
  const overlap = (interval1: number[], interval2: number[]): boolean => {
    return (
      (interval1[0] >= interval2[0] && interval1[0] < interval2[1]) ||
      (interval2[0] >= interval1[0] && interval2[0] < interval1[1])
    );
  };

  // Iterate through each pair of intervals to check for overlaps
  for (let i = 0; i < intervals.length; i++) {
    for (let j = i + 1; j < intervals.length; j++) {
      if (overlap(intervals[i], intervals[j])) {
        return false; // If any overlap is found, return false
      }
    }
  }
  return true; // If no overlaps are found, return true
}
