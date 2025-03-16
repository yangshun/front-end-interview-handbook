import { Dispatch, SetStateAction } from 'react';

interface UseStepReturn {
  step: number;
  next: () => void;
  previous: () => void;
  reset: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function useStep(maxStep: number): UseStepReturn {
  throw 'Not implemented';
}
