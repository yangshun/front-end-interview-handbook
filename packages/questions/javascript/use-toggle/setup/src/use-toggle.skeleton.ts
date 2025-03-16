import { Dispatch, SetStateAction } from 'react';

export default function useToggle(
  defaultValue?: boolean,
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
  throw 'Not implemented';
}
