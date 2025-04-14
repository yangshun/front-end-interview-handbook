/**
 * @template T
 * @param {...(T | Array<T>)} items
 * @return {Array<T>}
 */
Array.prototype.myConcat = function (...items) {
  const newArray = [...this];

  for (let i = 0; i < items.length; i++) {
    if (Array.isArray(items[i])) {
      newArray.push(...items[i]);
    } else {
      newArray.push(items[i]);
    }
  }

  return newArray;
};
