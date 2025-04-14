export default function countBy<T>(
  array: Array<T>,
  iteratee: (value: T) => number | string | undefined,
): Record<string, number> {
  const result: Record<string, number> = {};

  for (const element of array) {
    const key = String(iteratee(element));
    if (!Object.prototype.hasOwnProperty.call(result, key)) {
      result[key] = 0;
    }

    result[key]++;
  }

  return result;
}
