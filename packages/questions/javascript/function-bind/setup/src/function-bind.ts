interface Function {
  myBind(this: Function, thisArg: any, ...argArray: any[]): Function;
}

Function.prototype.myBind = function (thisArg, ...argArray) {
  const originalMethod = this;
  return function (...args: any[]) {
    return originalMethod.apply(thisArg, [...argArray, ...args]);
  };
};
