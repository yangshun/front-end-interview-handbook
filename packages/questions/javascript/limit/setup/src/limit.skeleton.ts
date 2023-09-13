// Function signature for callback argument.
type Func<TParams extends any[], TResult> = (...args: TParams) => TResult;

export default function limit<TParams extends any[], TResult>(
  func: Func<TParams, TResult>,
  n: number,
): Func<TParams, TResult> {
  throw 'Not implemented!';
}
