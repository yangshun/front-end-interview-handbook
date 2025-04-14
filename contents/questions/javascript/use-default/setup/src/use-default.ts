import { useState } from 'react';

export default function useDefault<TStateType>(
  defaultValue: TStateType,
  initialValue: TStateType | (() => TStateType),
) {
  const [value, setValue] = useState<TStateType | undefined | null>(
    initialValue,
  );

  if (value === undefined || value === null) {
    return [defaultValue, setValue] as const;
  }

  return [value, setValue] as const;
}
