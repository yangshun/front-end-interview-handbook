interface Resumable {
  start: () => void;
  pause: () => void;
  stop: () => void;
}

export default function createResumableInterval(
  callback: Function,
  delay?: number,
  ...args: Array<any>
): Resumable {
  throw 'Not implemented';
}
