type ThrottleFunction<T extends any[]> = (...args: T) => any;

export default function throttle<T extends any[]>(
  func: ThrottleFunction<T>,
  wait: number,
): ThrottleFunction<T> {
  throw 'Not implemented!';
}
