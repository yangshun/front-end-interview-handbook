interface Array<T> {
  myMap<U>(
    callbackFn: (value: T, index: number, array: Array<T>) => U,
    thisArg?: any,
  ): Array<U>;
}

Array.prototype.myMap = function (callbackFn, thisArg) {
  throw 'Not implemented!';
};
