import type { Reducer } from '@reduxjs/toolkit';

import baseTimerReducer from '~/components/workspace/common/store/timer-slice';
import type { TimerState } from '~/components/workspace/common/store/timer-slice';

import { executionComplete } from './execution-slice';

const enhancedTimerReducer: Reducer<TimerState> = (state, action) => {
  const nextState = baseTimerReducer(state, action);

  if (
    executionComplete.match(action) &&
    action.payload.mode === 'submit' &&
    action.payload.outcome === 'correct'
  ) {
    return {
      ...nextState,
      running: false,
    };
  }

  return nextState;
};

export default enhancedTimerReducer;
