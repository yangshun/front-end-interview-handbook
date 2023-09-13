Array.prototype.myReduce = function (callbackFn, initialValue) {
  const len = this.length;

  if (
    typeof callbackFn !== 'function' ||
    !callbackFn.call ||
    !callbackFn.apply
  ) {
    throw new TypeError(`${callbackFn} is not a function`);
  }

  if (len === 0 && initialValue === undefined) {
    throw new TypeError('Reduce of empty array with no initial value');
  }

  let k = 0;
  let accumulator = undefined;

  if (initialValue !== undefined) {
    accumulator = initialValue;
  } else {
    let kPresent = false;
    while (!kPresent && k < len) {
      // Ignore index if value is not defined for index (e.g. in sparse arrays).
      kPresent = Object.hasOwn(this, k);
      if (kPresent) {
        accumulator = this[k];
      }
      k = k + 1;
    }

    if (!kPresent) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
  }

  while (k < len) {
    const kPresent = Object.hasOwn(this, k);
    if (kPresent) {
      const kValue = this[k];
      accumulator = callbackFn(accumulator, kValue, k, this);
    }
    k = k + 1;
  }

  return accumulator;
};
