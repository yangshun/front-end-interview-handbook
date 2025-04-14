// Function signature for callback argument.
type Func<TParams extends any[], TResult> = (...args: TParams) => TResult;

export default function limit<TParams extends any[], TResult>(
  func: Func<TParams, TResult>,
  n: number,
): Func<TParams, TResult> {
  let count = 0;
  let value: TResult;

  return function (this: any, ...args: TParams): TResult {
    if (count < n) {
      value = func.apply(this, args);
      count++;
    }

    return value;
  };
}
