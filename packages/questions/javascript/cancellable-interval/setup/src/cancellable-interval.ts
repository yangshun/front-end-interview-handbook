export default function setCancellableInterval(
  callback: Function,
  delay?: number,
  ...args: Array<any>
): () => void {
  const timerId = setInterval(callback, delay, ...args);

  return () => {
    clearInterval(timerId);
  };
}
