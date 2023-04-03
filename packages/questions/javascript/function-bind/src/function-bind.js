/**
 * @param {Object} thisArg
 * @param {...*} boundArgs
 * @return {void}
 */
Function.prototype.myBind = function (thisArg, ...boundArgs) {
  const originalMethod = this;
  return function (...args) {
    return originalMethod.apply(thisArg, [...boundArgs, ...args]);
  };
};
