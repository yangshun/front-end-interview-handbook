import { Dispatch, SetStateAction } from 'react';

interface StateMediator<S = unknown> {
  (newState: S): S;
  (newState: S, dispatch: Dispatch<SetStateAction<S>>): void;
}

export default function useMediatedState<S = unknown>(
  mediator: StateMediator<S>,
  initialState?: S,
): [S, Dispatch<SetStateAction<S>>] {
  throw 'Not implemented';
}
