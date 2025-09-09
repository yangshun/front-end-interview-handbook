import type { Reducer } from '@reduxjs/toolkit';

import baseSolutionReducer, {
  type SolutionState,
} from '~/components/workspace/common/store/solution-slice';

import { executionComplete } from './execution-slice';

const enhancedSolutionReducer: Reducer<SolutionState> = (state, action) => {
  const nextState = baseSolutionReducer(state, action);

  // If the opened solution is submitted and the outcome is correct,
  // we reset the hasUnsavedSolutionChanges flag to false.
  if (
    executionComplete.match(action) &&
    action.payload.mode === 'submit' &&
    action.payload.outcome === 'correct'
  ) {
    return {
      ...nextState,
      hasUnsavedSolutionChanges: false,
    };
  }

  return nextState;
};

export default enhancedSolutionReducer;
