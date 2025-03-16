export default function createBreakpoint<T extends Record<string, number>>(
  breakpoints: T,
): () => keyof T {
  throw 'Not implemented';
}
