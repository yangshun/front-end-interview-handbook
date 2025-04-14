type UseObjectUpdater<T extends Record<string | number | symbol, any>> = (
  partialOrUpdaterFunction: Partial<T> | ((prev: T) => Partial<T>),
) => void;

export default function useObject<
  T extends Record<string | number | symbol, any>,
>(initialValue: T): [T, UseObjectUpdater<T>] {
  throw 'Not implemented';
}
