Array.prototype.myMap = function (callbackFn, thisArg) {
  throw 'Not implemented!';
};

interface Array<T> {
  myMap<U>(callbackFn: (value: T) => U, thisArg?: any): Array<U>;
}
