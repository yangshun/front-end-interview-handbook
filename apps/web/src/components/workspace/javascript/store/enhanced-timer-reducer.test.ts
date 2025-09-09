import { executionComplete } from './execution-slice';
import { makeJavaScriptCodingWorkspaceStore } from './javascript-store';

describe('JavaScript enhanced timer reducer', () => {
  beforeEach(() => {
    globalThis.performance = {
      mark: vi.fn(),
      measure: vi.fn(() => ({ duration: 123 })),
    } as unknown as Performance;

    vi.clearAllMocks();
  });

  test('sets running to false on correct submit', () => {
    const store = makeJavaScriptCodingWorkspaceStore({
      timer: { running: true },
    });

    store.dispatch(executionComplete({ mode: 'submit', outcome: 'correct' }));

    expect(store.getState().timer.running).toBe(false);
  });

  test('does not change running on incorrect submit', () => {
    const store = makeJavaScriptCodingWorkspaceStore({
      timer: { running: true },
    });

    store.dispatch(executionComplete({ mode: 'submit', outcome: 'wrong' }));

    expect(store.getState().timer.running).toBe(true);
  });

  test('does not change running on run mode', () => {
    const store = makeJavaScriptCodingWorkspaceStore({
      timer: { running: true },
    });

    store.dispatch(executionComplete({ mode: 'run', outcome: 'correct' }));

    expect(store.getState().timer.running).toBe(true);
  });
});
