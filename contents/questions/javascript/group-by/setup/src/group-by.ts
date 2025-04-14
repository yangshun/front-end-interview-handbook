export default function groupBy<T>(
  array: Array<T>,
  iteratee: (value: T) => number | string,
): Record<string, Array<T>> {
  const result: Record<string, Array<T>> = {};

  for (const element of array) {
    const key = iteratee(element);
    if (!Object.prototype.hasOwnProperty.call(result, key)) {
      result[key] = [];
    }

    result[key].push(element);
  }

  return result;
}
