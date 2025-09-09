import reducer, {
  pauseTimer,
  startTimer,
  timerInitialState,
} from './timer-slice';

describe('timerSlice', () => {
  test('should return the initial state', () => {
    const state = reducer(undefined, { type: '@@INIT' });

    expect(state).toStrictEqual(timerInitialState);
  });

  test('should set running to true when startTimer is dispatched', () => {
    const state = reducer(timerInitialState, startTimer());

    expect(state.running).toBe(true);
  });

  test('should set running to false when pauseTimer is dispatched', () => {
    const initialRunningState = { running: true };
    const state = reducer(initialRunningState, pauseTimer());

    expect(state.running).toBe(false);
  });
});
