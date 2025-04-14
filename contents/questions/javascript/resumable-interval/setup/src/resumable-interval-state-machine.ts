interface Resumable {
  start: () => void;
  pause: () => void;
  stop: () => void;
}

export default function createResumableInterval(
  callback: Function,
  delay?: number,
  ...args: Array<any>
): Resumable {
  let timerId: number | null;
  let state: State = 'paused';

  function nextState(action: Action) {
    const newState: State = stateMachine[state][action];
    if (newState === state) {
      return;
    }

    state = newState;
    switch (state) {
      case 'paused':
      case 'stopped':
        clearInterval(timerId ?? undefined);
        timerId = null;
        return;
      case 'running':
        callback(...args);
        timerId = setInterval(callback, delay, ...args);
        return;
    }
  }

  return {
    start: () => nextState('start'),
    pause: () => nextState('pause'),
    stop: () => nextState('stop'),
  };
}

type State = 'stopped' | 'paused' | 'running';
type Action = 'pause' | 'start' | 'stop';
type StateMachine = Record<State, Record<Action, State>>;

const stateMachine: StateMachine = {
  stopped: {
    pause: 'stopped',
    start: 'stopped',
    stop: 'stopped',
  },
  paused: {
    pause: 'paused',
    start: 'running',
    stop: 'stopped',
  },
  running: {
    pause: 'paused',
    start: 'running',
    stop: 'stopped',
  },
};
