type IterateeFn<T> = (value: T) => number | string;

export default function countBy<T>(
  array: Array<T>,
  iteratee: IterateeFn<T> | string,
): Record<string, number> {
  const result: Record<string, number> = {};
  const iterateeFunc: IterateeFn<T> =
    typeof iteratee === 'function' ? iteratee : (value: any) => value[iteratee];

  for (const element of array) {
    const key = iterateeFunc(element);
    if (!Object.prototype.hasOwnProperty.call(result, key)) {
      result[key] = 0;
    }

    result[key]++;
  }

  return result;
}
