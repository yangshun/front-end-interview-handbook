export default function setCancellableTimeout(
  callback: Function,
  delay?: number,
  ...args: Array<any>
): () => void {
  const timerId = setTimeout(callback, delay, ...args);

  return () => {
    clearTimeout(timerId);
  };
}
