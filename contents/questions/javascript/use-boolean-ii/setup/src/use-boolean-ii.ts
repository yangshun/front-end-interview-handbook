import { useCallback, useState } from 'react';

type UseBooleanReturn = {
  /** The current boolean state value. */
  value: boolean;
  /** Function to set the boolean state to `true`. */
  setTrue: () => void;
  /** Function to set the boolean state to `false`. */
  setFalse: () => void;
};

export default function useBoolean(initialValue = false): UseBooleanReturn {
  const [value, setValue] = useState(initialValue);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return { value, setTrue, setFalse };
}
