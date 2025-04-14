interface Function {
  myApply(this: any, thisArg: any, argArray?: any[]): any;
}

Function.prototype.myApply = function (thisArg, args) {
  throw 'Not implemented!';
};
