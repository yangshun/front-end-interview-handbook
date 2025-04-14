interface DebouncedFunction extends Function {
  cancel: () => void;
  flush: () => void;
}

export default function debounce(
  func: Function,
  wait: number,
): DebouncedFunction {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let context: any = undefined;
  let argsToInvoke: Array<any> | undefined = undefined;

  function clearTimer() {
    clearTimeout(timeoutId);
    timeoutId = undefined;
  }

  function invoke() {
    // Don't invoke if there's no pending callback.
    if (timeoutId == null) {
      return;
    }

    clearTimer();
    func.apply(context, argsToInvoke);
  }

  function fn(this: any, ...args: Array<any>) {
    clearTimer();
    argsToInvoke = args;
    context = this;
    timeoutId = setTimeout(function () {
      invoke();
    }, wait);
  }

  fn.cancel = clearTimer;
  fn.flush = invoke;
  return fn;
}
