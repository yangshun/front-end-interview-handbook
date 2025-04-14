export default function uniqBy(array, iteratee = (value) => value) {
  const compare = new Set();
  const result = [];

  array.forEach((item) => {
    if (!compare.has(iteratee(item))) {
      result.push(item);
      compare.add(iteratee(item));
    }
  });

  return result;
}
