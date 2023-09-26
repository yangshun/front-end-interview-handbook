type IterateeFn<T> = (value: T) => number | string;

export default function groupBy<T>(
  array: Array<T>,
  iteratee: IterateeFn<T> | string,
): Record<string, Array<T>> {
  const result: Record<string, Array<T>> = {};
  const iterateeFunc: IterateeFn<T> =
    typeof iteratee === 'function' ? iteratee : (value: any) => value[iteratee];

  for (const element of array) {
    const key = iterateeFunc(element);
    if (!Object.prototype.hasOwnProperty.call(result, key)) {
      result[key] = [];
    }

    result[key].push(element);
  }

  return result;
}
