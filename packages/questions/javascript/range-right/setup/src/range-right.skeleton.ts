export default function rangeRight(end: number): Array<number>;
export default function rangeRight(
  start: number,
  end: number,
  step?: number,
): Array<number>;

/**
 * @param {number} start - The first number of the resultant array.
 * @param {number} end - The value where the resultant array will stop at and not contain it.
 * @param {number} step - The step / increment value of each number in the array.
 * @return {Array<number>} Returns the array with the sequence of numbers in the specified range.
 */
export default function rangeRight(
  start: number = 0,
  end?: number,
  step: number = 1,
): Array<number> {
  throw 'Not implemented!';
}
