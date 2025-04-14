interface Array<T> {
  square(): Array<number>;
}

Array.prototype.square = function () {
  const length = this.length;
  const results = new Array(length);

  for (let i = 0; i < length; i++) {
    results[i] = this[i] * this[i];
  }

  return results;
};
