Array.prototype.square = function () {
  throw 'Not implemented!';
};

interface Array<T> {
  square(): Array<number>;
}
