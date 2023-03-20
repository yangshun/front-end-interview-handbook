Array.prototype.myMap = function (callbackFn, thisArg) {
  if (
    typeof callbackFn !== 'function' ||
    !callbackFn.call ||
    !callbackFn.apply
  ) {
    throw new TypeError(`${callbackFn} is not a function`);
  }

  const len = this.length;
  const A = new Array(len);
  let k = 0;

  while (k < len) {
    // Ignore index if value is not defined for index (e.g. in sparse arrays).
    const kPresent = Object.hasOwn(this, k);
    if (kPresent) {
      const kValue = this[k];
      const mappedValue = callbackFn.call(thisArg, kValue, k, this);
      A[k] = mappedValue;
    }
    k = k + 1;
  }

  return A;
};
