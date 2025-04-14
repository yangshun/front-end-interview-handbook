export default function taskCoordinator(tasks: string[], k: number): number {
  // Array to store the frequency of each task (26 letters, A-Z)
  const counter: number[] = new Array(26).fill(0);
  let maximum = 0; // Maximum frequency of any task
  let maxCount = 0; // Number of tasks with maximum frequency

  // Traverse through tasks to calculate task frequencies
  for (const task of tasks) {
    const index = task.charCodeAt(0) - 'A'.charCodeAt(0);
    counter[index]++;

    if (maximum === counter[index]) {
      maxCount++;
    } else if (maximum < counter[index]) {
      maximum = counter[index];
      maxCount = 1;
    }
  }

  // Calculate idle slots, available tasks, and idles needed
  const partCount = maximum - 1;
  const partLength = k - (maxCount - 1);
  const emptySlots = partCount * partLength;
  const availableTasks = tasks.length - maximum * maxCount;
  const idles = Math.max(0, emptySlots - availableTasks);

  // Return the total time required
  return tasks.length + idles;
}
