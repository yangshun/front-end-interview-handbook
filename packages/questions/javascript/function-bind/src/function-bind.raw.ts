interface Function {
  myBind(thisArg: any, ...boundArgs: any[]): Function;
}

/**
 * @param {any} thisArg
 * @param {...*} boundArgs
 */
Function.prototype.myBind = function (thisArg, ...boundArgs) {
  const originalMethod = this;
  return function (...args) {
    return originalMethod.apply(thisArg, [...boundArgs, ...args]);
  };
};
