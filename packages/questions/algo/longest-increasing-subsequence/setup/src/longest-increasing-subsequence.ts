function binarySearch(sub: number[], num: number): number {
  let left = 0;
  let right = sub.length - 1;

  // Perform binary search
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (sub[mid] === num) {
      return mid;
    }

    if (sub[mid] < num) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

export default function longestIncreasingSubsequence(
  numbers: number[],
): number {
  // Array to store the current longest increasing subsequence
  const sub: number[] = [];
  sub.push(numbers[0]);

  // Iterate over the numbers array
  for (let i = 1; i < numbers.length; i++) {
    const num = numbers[i];

    // If the current number is greater than the last element in 'sub'
    // then add it to 'sub'
    if (num > sub[sub.length - 1]) {
      sub.push(num);
    } else {
      // Otherwise, find the position to replace in 'sub' using binary search
      const j = binarySearch(sub, num);
      sub[j] = num;
    }
  }

  // Return the size of 'sub', which represents the length of the LIS
  return sub.length;
}
