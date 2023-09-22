interface Function {
  myBind(thisArg: any, ...boundArgs: any[]): Function;
}

/**
 * @param {any} thisArg
 * @param {...*} boundArgs
 * @return {Function}
 */
Function.prototype.myBind = function (thisArg, ...boundArgs) {
  const originalMethod = this;
  return function (...args: any[]) {
    return originalMethod.apply(thisArg, [...boundArgs, ...args]);
  };
};
