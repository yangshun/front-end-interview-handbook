import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';

import logEvent from '~/logging/logEvent';

type ExecutionState = Readonly<{
  runSequenceNumber: number;
  status: 'idle' | 'loading' | 'running_tests' | 'submitting';
  submitSequenceNumber: number;
}>;

const runTestsStartedEventName = 'workspace-run-tests-started';
const runTestsCompleteEventName = 'workspace-run-tests-complete';
const submitStartedEventName = 'workspace-submit-started';
const submitCompleteEventName = 'workspace-submit-complete';

export const executionInitialState: ExecutionState = {
  runSequenceNumber: 0,
  status: 'idle',
  submitSequenceNumber: 0,
};

export const executionSlice = createSlice({
  initialState: executionInitialState,
  name: 'execution',
  reducers: {
    executionComplete: (
      state,
      action: PayloadAction<{
        mode: 'run' | 'submit';
        outcome: 'correct' | 'indeterminate' | 'none' | 'wrong';
      }>,
    ) => {
      state.status = 'idle';

      switch (action.payload.mode) {
        case 'run': {
          performance.mark(runTestsCompleteEventName);

          const runTestsDuration = performance.measure(
            'run-tests-duration',
            runTestsStartedEventName,
            runTestsCompleteEventName,
          );

          logEvent('question.run.complete', {
            duration: Math.floor(runTestsDuration.duration),
            namespace: 'workspace',
            outcome: action.payload.outcome,
            sequence: state.runSequenceNumber,
          });
          break;
        }
        case 'submit': {
          performance.mark(submitCompleteEventName);

          const submitDuration = performance.measure(
            'submit-duration',
            submitStartedEventName,
            submitCompleteEventName,
          );

          logEvent('question.submit.complete', {
            duration: Math.floor(submitDuration.duration),
            namespace: 'workspace',
            outcome: action.payload.outcome,
            sequence: state.submitSequenceNumber,
          });
          break;
        }
      }
    },
    runTests: (state, action: PayloadAction<QuestionMetadata>) => {
      state.runSequenceNumber += 1;
      state.status = 'running_tests';
      performance.mark(runTestsStartedEventName);

      const metadata = action.payload;

      logEvent('question.run', {
        format: metadata.format,
        namespace: 'workspace',
        slug: metadata.slug,
      });
    },
    submit: (state, action: PayloadAction<QuestionMetadata>) => {
      state.submitSequenceNumber += 1;
      state.status = 'submitting';
      performance.mark(submitStartedEventName);

      const metadata = action.payload;

      logEvent('question.submit', {
        format: metadata.format,
        namespace: 'workspace',
        slug: metadata.slug,
      });
    },
  },
});

export const { executionComplete, runTests, submit } = executionSlice.actions;

export default executionSlice.reducer;
