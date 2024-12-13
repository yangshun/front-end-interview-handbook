export default function minMeetingRoomsNeeded(intervals: number[][]): number {
  // Check for the base case. If there are no intervals, return 0
  if (intervals.length === 0) {
    return 0;
  }

  // Separate start and end times into their own arrays
  const start: number[] = new Array(intervals.length);
  const end: number[] = new Array(intervals.length);

  for (let i = 0; i < intervals.length; i++) {
    start[i] = intervals[i][0];
    end[i] = intervals[i][1];
  }

  // Sort the start and end times
  start.sort((a, b) => a - b);
  end.sort((a, b) => a - b);

  // The two pointers in the algorithm: endPointer and startPointer
  let startPointer = 0,
    endPointer = 0;

  // Variable to keep track of the maximum number of rooms used
  let usedRooms = 0;

  // Iterate over the intervals
  while (startPointer < intervals.length) {
    // If there is a meeting that has ended by the time the meeting at startPointer starts
    if (start[startPointer] >= end[endPointer]) {
      usedRooms -= 1;
      endPointer += 1;
    }

    // Regardless of whether a room frees up or not, we allocate a room for the current meeting
    usedRooms += 1;
    startPointer += 1;
  }

  return usedRooms;
}
