import type { Dispatch, SetStateAction } from 'react';
import { useSessionStorage } from 'usehooks-ts';

export default function useSessionStorageForSets<T>(
  key: string,
  initialValue: Set<T>,
): [Set<T>, Dispatch<SetStateAction<Set<T>>>] {
  const initialArrayValue = Array.from(initialValue.values());
  const [arrayValue, setArrayValue] = useSessionStorage<Array<T>>(
    key,
    initialArrayValue,
  );

  const value = new Set(arrayValue);
  const setValue = (newValue: Set<T>) => {
    const newArrayValue = Array.from(newValue.values());

    setArrayValue(newArrayValue);
  };

  return [value, setValue as Dispatch<SetStateAction<Set<T>>>];
}
