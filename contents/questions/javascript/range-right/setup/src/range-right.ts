// Overloaded function declarations
export default function range(end: number): Array<number>;
export default function range(
  start: number,
  end: number,
  step?: number,
): Array<number>;

/**
 * @param {number} start - The start of the range.
 * @param {number} end - The end of the range.
 * @param {number} step - The value to increment or decrement by.
 * @returns {Array<number>} An array of numbers in the specified range.
 */
export default function range(
  start: number = 0,
  end?: number,
  step: number = 1,
): Array<number> {
  const result: Array<number> = [];

  // Adjust parameters if only `end` is provided
  if (end === undefined) {
    end = start;
    start = 0;
  }

  // Adjust `step` for descending sequences
  if (end < start && step === 1) {
    step = -1;
  }

  // Determine the number of elements in `result`
  const length = (end - start) / (step || 1);

  // Generate the range
  for (let i = 0; i < length; i++) {
    result.unshift(start + i * step);
  }

  return result;
}
