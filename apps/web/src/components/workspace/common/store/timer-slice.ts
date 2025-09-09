import { createSlice } from '@reduxjs/toolkit';

export const timerInitialState = {
  running: false,
};

export const timerSlice = createSlice({
  initialState: timerInitialState,
  name: 'timer',
  reducers: {
    pauseTimer: (state) => {
      state.running = false;
    },
    startTimer: (state) => {
      state.running = true;
    },
  },
});

export const { pauseTimer, startTimer } = timerSlice.actions;

export default timerSlice.reducer;

export type TimerState = ReturnType<typeof timerSlice.getInitialState>;
