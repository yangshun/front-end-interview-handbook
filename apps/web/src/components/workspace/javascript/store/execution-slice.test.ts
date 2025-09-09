import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';

import reducer, {
  executionComplete,
  executionInitialState,
  runTests,
  submit,
} from './execution-slice';

const metadata = {
  format: 'javascript',
  slug: 'test-question',
} as QuestionMetadata;

describe('executionSlice', () => {
  test('should handle runTests action', () => {
    const newState = reducer(executionInitialState, runTests(metadata));

    expect(newState.status).toBe('running_tests');
    expect(newState.runSequenceNumber).toBe(1);
  });

  test('should handle submit action', () => {
    const newState = reducer(executionInitialState, submit(metadata));

    expect(newState.status).toBe('submitting');
    expect(newState.submitSequenceNumber).toBe(1);
  });
});

describe('executionComplete action', () => {
  test('should handle for run mode', () => {
    const state = {
      ...executionInitialState,
      runSequenceNumber: 2,
      status: 'running_tests' as const,
    };

    const result = reducer(
      state,
      executionComplete({ mode: 'run', outcome: 'correct' }),
    );

    expect(result.status).toBe('idle');
  });

  test('should handle for submit mode', () => {
    const state = {
      ...executionInitialState,
      status: 'submitting' as const,
      submitSequenceNumber: 3,
    };

    const result = reducer(
      state,
      executionComplete({ mode: 'submit', outcome: 'wrong' }),
    );

    expect(result.status).toBe('idle');
  });
});
