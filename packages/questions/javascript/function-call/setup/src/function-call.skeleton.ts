interface Function {
  myCall(thisArg: any, ...args: any[]): any;
}

Function.prototype.myCall = function (thisArg, ...args) {
  throw 'Not implemented!';
};
