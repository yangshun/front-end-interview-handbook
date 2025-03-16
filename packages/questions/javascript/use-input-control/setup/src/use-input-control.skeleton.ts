import { ChangeEvent } from 'react';

interface UseInputValueReturn {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function useInputControl(
  initialValue: string,
): UseInputValueReturn {
  throw 'Not implemented';
}
