import type { Mock } from 'vitest';

import { codingWorkspaceConvertFilesToSandpackBundlerFiles } from '../utils/codingWorkspaceConvertFiles';
import reducer, {
  initializeSandpack,
  replaceCurrentFileState,
  resetFile,
  sandpackInitialState,
  type SandpackState,
  updateActiveFile,
  updateFile,
} from './sandpack-slice';

const mockConvertedFiles = {
  '/App.js': { code: 'console.log("App")' },
};

vi.mock('../codingWorkspaceConvertFiles', () => ({
  codingWorkspaceConvertFilesToSandpackBundlerFiles: vi.fn(),
}));

describe('sandpackSlice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should initialize sandpack', () => {
    const payload = {
      current: {
        activeFile: '/App.js',
        files: mockConvertedFiles,
        visibleFiles: ['/App.js'],
      },
      default: {
        activeFile: '/App.js',
        files: mockConvertedFiles,
        visibleFiles: ['/App.js'],
      },
    };

    const newState = reducer(sandpackInitialState, initializeSandpack(payload));

    expect(newState.current).toBe(payload.current);
    expect(newState.default).toBe(payload.default);
  });

  test('should replace current file state', () => {
    const fileState = {
      activeFile: '/New.js',
      files: { '/New.js': { code: 'new content' } },
      visibleFiles: ['/New.js'],
    };

    const newState = reducer(
      sandpackInitialState,
      replaceCurrentFileState(fileState),
    );

    expect(newState.current).toBe(fileState);
  });

  test('should reset file to default', () => {
    const initialState: SandpackState = {
      current: {
        activeFile: '/index.js',
        files: { '/index.js': { code: 'edited content' } },
        visibleFiles: [],
      },
      default: {
        activeFile: '/index.js',
        files: { '/index.js': { code: 'original content' } },
        visibleFiles: [],
      },
    };

    const newState = reducer(initialState, resetFile('/index.js'));

    expect(newState.current.files['/index.js']).toBe(
      initialState.default.files['/index.js'],
    );
  });

  test('should update active file', () => {
    const newState = reducer(
      sandpackInitialState,
      updateActiveFile('/main.ts'),
    );

    expect(newState.current.activeFile).toBe('/main.ts');
  });

  test('should update file content (single update)', () => {
    const initialState: SandpackState = {
      ...sandpackInitialState,
      current: {
        ...sandpackInitialState.current,
        files: { '/file.js': { code: 'old code' } },
      },
    };

    const newState = reducer(
      initialState,
      updateFile({ content: 'updated code', path: '/file.js' }),
    );

    expect(newState.current.files['/file.js']).toStrictEqual({
      code: 'updated code',
    });
  });

  test('should update multiple files via SandpackFiles', () => {
    const inputFiles = {
      '/new.js': { code: 'new file content' },
    };

    (codingWorkspaceConvertFilesToSandpackBundlerFiles as Mock).mockReturnValue(
      {
        '/new.js': { code: 'new file content' },
      },
    );

    const newState = reducer(
      sandpackInitialState,
      updateFile({ files: inputFiles }),
    );

    expect(
      codingWorkspaceConvertFilesToSandpackBundlerFiles,
    ).toHaveBeenCalledWith(inputFiles);
    expect(newState.current.files['/new.js']).toStrictEqual({
      code: 'new file content',
    });
  });
});
