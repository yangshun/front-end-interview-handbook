interface Function {
  myBind(this: Function, thisArg: any, ...argArray: any[]): Function;
}

Function.prototype.myBind = function (
  this: Function,
  thisArg: any,
  ...argArray: any[]
) {
  throw 'Not implemented!';
};
