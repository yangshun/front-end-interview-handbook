Function.prototype.myBind = function (thisArg, ...boundArgs) {
  const originalFunc = this;
  if (typeof originalFunc !== 'function') {
    throw new TypeError('Bind must be called on a function');
  }

  return function (...args) {
    return Reflect.apply(originalFunc, thisArg, [...boundArgs, ...args]);
    // This also works 👇
    // return Function.prototype.apply.call(originalFunc, thisArg, [
    //   ...boundArgs,
    //   ...args,
    // ]);
  };
};
