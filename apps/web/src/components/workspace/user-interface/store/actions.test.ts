import {
  replaceCurrentFileState,
  updateFile,
} from '~/components/workspace/common/store/sandpack-slice';

import { saveUserInterfaceQuestionCodeLocally } from '../UserInterfaceCodingWorkspaceCodeStorage';
import {
  replaceUserInterfaceCodeEditorContents,
  resetUserInterfaceCodingWorkspaceFile,
} from './actions';

vi.mock('../UserInterfaceCodingWorkspaceCodeStorage', () => ({
  saveUserInterfaceQuestionCodeLocally: vi.fn(),
}));

describe('resetUserInterfaceCodingWorkspaceFile', () => {
  const mockDispatch = vi.fn();
  const mockGetState = vi.fn();

  const filePath = '/App.js';

  const baseState = {
    sandpack: {
      current: {
        files: {
          [filePath]: { code: 'old code' },
        },
      },
      default: {
        files: {
          [filePath]: { code: 'default code' },
        },
      },
    },
    solution: {
      currentOpenedSolution: null,
    },
    workspace: {
      question: { metadata: { slug: 'question-1' } },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should reset file to default and save locally if no solution is opened', () => {
    mockGetState.mockReturnValue(baseState);

    const thunk = resetUserInterfaceCodingWorkspaceFile(filePath);

    thunk(mockDispatch, mockGetState, undefined);

    expect(saveUserInterfaceQuestionCodeLocally).toHaveBeenCalledWith(
      baseState.workspace.question,
      { [filePath]: { code: 'default code' } },
    );

    expect(mockDispatch).toHaveBeenCalledWith(
      updateFile({
        files: { [filePath]: { code: 'default code' } },
      }),
    );
  });

  test('should reset file to solution content if solution is present', () => {
    const solutionState = {
      ...baseState,
      solution: {
        currentOpenedSolution: {
          files: {
            [filePath]: { code: 'solution code' },
          },
        },
      },
    };

    mockGetState.mockReturnValue(solutionState);

    const thunk = resetUserInterfaceCodingWorkspaceFile(filePath);

    thunk(mockDispatch, mockGetState, undefined);

    expect(saveUserInterfaceQuestionCodeLocally).not.toHaveBeenCalled();

    expect(mockDispatch).toHaveBeenCalledWith(
      updateFile({
        files: { [filePath]: { code: 'solution code' } },
      }),
    );
  });
});

describe('replaceUserInterfaceCodeEditorContents', () => {
  const mockDispatch = vi.fn();
  const mockGetState = vi.fn();

  const file1 = '/App.js';
  const file2 = '/utils.js';
  const file3 = '/newFile.js';
  const updatedFile1 = '/App.tsx';

  const defaultState = {
    sandpack: {
      current: {
        activeFile: file1,
        files: {
          [file1]: { code: 'code 1' },
          [file2]: { code: 'code 2' },
        },
        visibleFiles: [file1, file2],
      },
    },
  };

  const changeActiveFile = vi.fn();
  const closeFile = vi.fn();
  const openFile = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should close removed files, update state, open new files, and change active tab', () => {
    const newFiles = {
      [file3]: { code: 'New file' },
      [updatedFile1]: { code: 'updated code file 1' },
    };

    mockGetState.mockReturnValue(defaultState);

    const thunk = replaceUserInterfaceCodeEditorContents({
      changeActiveFile,
      closeFile,
      newFiles,
      openFile,
    });

    thunk(mockDispatch, mockGetState, undefined);

    // Close removed file
    expect(closeFile).toHaveBeenCalledWith(expect.stringContaining(file2));

    // Replace state
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: replaceCurrentFileState.type,
      }),
    );

    // Open new visible newFiles
    expect(openFile).toHaveBeenCalledWith(
      expect.stringContaining(updatedFile1),
    );

    // Update active file
    expect(changeActiveFile).toHaveBeenCalledWith(
      expect.stringContaining(updatedFile1),
    );
  });
});
