/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {Function}
 */
Function.prototype.myBind = function (thisArg, ...argArray) {
  const originalFunc = this;
  if (typeof originalFunc !== 'function') {
    throw new TypeError('Bind must be called on a function');
  }

  return function (...args) {
    return Reflect.apply(originalFunc, thisArg, [...argArray, ...args]);
    // This also works 👇
    // return Function.prototype.apply.call(originalFunc, thisArg, [
    //   ...argArray,
    //   ...args,
    // ]);
  };
};
