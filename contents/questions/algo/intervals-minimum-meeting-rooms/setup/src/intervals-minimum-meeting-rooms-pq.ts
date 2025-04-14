// Importing the PriorityQueue from a suitable library
import { MinPriorityQueue } from '@datastructures-js/priority-queue';

export default function minMeetingRoomsNeeded(intervals: number[][]): number {
  // Check for the base case. If there are no intervals, return 0
  if (intervals.length === 0) {
    return 0;
  }

  // Min heap to track the end time of meetings
  const allocator = new MinPriorityQueue<number>();

  // Sort the intervals by start time
  intervals.sort((a, b) => a[0] - b[0]);

  // Add the first meeting's end time to the heap
  allocator.enqueue(intervals[0][1]);

  // Iterate over remaining intervals
  for (let i = 1; i < intervals.length; i++) {
    // If the room due to free up the earliest is free, assign that room to this meeting
    if (intervals[i][0] >= allocator.front()) {
      allocator.dequeue();
    }

    // Add the current meeting's end time to the heap
    allocator.enqueue(intervals[i][1]);
  }

  // The size of the heap tells us the minimum rooms required for all the meetings
  return allocator.size();
}
