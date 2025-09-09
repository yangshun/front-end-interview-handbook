import reducer, {
  initialJavaScriptWorkspaceState,
  setLanguage,
} from './javascript-workspace-slice';

describe('javascriptWorkspaceSlice', () => {
  test('should return the initial state', () => {
    const state = reducer(undefined, { type: '@@INIT' });

    expect(state).toEqual(initialJavaScriptWorkspaceState);
  });

  test('should update the language with setLanguage', () => {
    const newState = reducer(
      initialJavaScriptWorkspaceState,
      setLanguage('ts'),
    );

    expect(newState.language).toBe('ts');
  });

  test('should not modify question state when setting language', () => {
    const newState = reducer(
      initialJavaScriptWorkspaceState,
      setLanguage('js'),
    );

    expect(newState.question).toEqual({});
  });
});
