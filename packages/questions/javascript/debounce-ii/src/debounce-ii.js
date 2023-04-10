/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
export default function debounce(func, wait = 0) {
  let timeoutId = null;
  let context = undefined;
  let argsToInvoke = undefined;

  function clearTimer() {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  function invoke() {
    // Don't invoke if there's no pending callback.
    if (timeoutId == null) {
      return;
    }

    clearTimer();
    func.apply(context, argsToInvoke);
  }

  function fn(...args) {
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
