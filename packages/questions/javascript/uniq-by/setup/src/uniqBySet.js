export default function uniqBy(array, iteratee = (value) => value) {
  const compare = new Set();
  const result = [];

  // Convert string `iteratee` into function.
  const iterateeFunc =
    typeof iteratee === 'function' ? iteratee : (value) => value[iteratee];

  array.forEach((item) => {
    if (
      (iterateeFunc(item) != null || item == array[0]) &&
      !compare.has(iterateeFunc(item))
    ) {
      result.push(item);
      compare.add(iterateeFunc(item));
    }
  });

  return result;
}
