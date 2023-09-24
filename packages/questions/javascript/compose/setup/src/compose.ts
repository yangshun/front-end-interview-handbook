export default function compose(...fns: Array<Function>): Function {
  return function (x: any): Function {
    return fns.reduceRight((result, func) => func(result), x);
  };
}
