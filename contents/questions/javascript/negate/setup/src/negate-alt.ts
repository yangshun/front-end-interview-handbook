export default function negate(predicate: Function): Function {
  return function (this: any): boolean {
    return !predicate.apply(this, arguments);
  };
}
