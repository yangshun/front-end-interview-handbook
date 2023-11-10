interface Array<T> {
  myConcat(...items: Array<T | Array<T>>): Array<T>;
}

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
