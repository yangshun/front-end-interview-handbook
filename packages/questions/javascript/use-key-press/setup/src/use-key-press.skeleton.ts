export default function useKeyPress(
  key: string,
  callback: (e: KeyboardEvent) => void,
  {
    event = 'keydown',
    target = window,
  }: { event?: 'keydown' | 'keyup'; target?: EventTarget } = {
    event: 'keydown',
    target: window,
  },
) {
  throw 'Not implemented';
}
