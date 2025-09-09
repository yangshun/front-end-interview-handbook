import type { SandpackFiles } from '@codesandbox/sandpack-react';
import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { useCallback, useState } from 'react';

import CodingWorkspaceCodeEditorResetCodeButton from '~/components/workspace/common/CodingWorkspaceCodeEditorResetCodeButton';
import MonacoCodeEditor from '~/components/workspace/common/editor/MonacoCodeEditor';
import CodingWorkspaceSolutionBanner from '~/components/workspace/common/solution/CodingWorkspaceSolutionBanner';
import {
  updateActiveFile,
  updateFile,
} from '~/components/workspace/common/store/sandpack-slice';
import {
  onUpdateSolutionCode,
  resetHasUnsavedSolutionChanges,
} from '~/components/workspace/common/store/solution-slice';

import UserInterfaceCodingWorkspaceSaveDialog from '../save-code/UserInterfaceCodingWorkspaceSaveDialog';
import { resetUserInterfaceCodingWorkspaceFile } from '../store/actions';
import {
  useUserInterfaceCodingWorkspaceDispatch,
  useUserInterfaceCodingWorkspaceSelector,
} from '../store/hooks';
import {
  loadLocalUserInterfaceQuestionCode,
  saveUserInterfaceQuestionCodeLocally,
} from '../UserInterfaceCodingWorkspaceCodeStorage';

type BaseProps = Readonly<{
  filePath: string;
}>;

type Props = Readonly<
  BaseProps & {
    isMobile?: boolean;
    onOpenSolution: ComponentProps<
      typeof CodingWorkspaceSolutionBanner
    >['onOpenSolution'];
    replaceCodeEditorContents: (files: SandpackFiles) => void;
  }
>;

export default function UserInterfaceCodingWorkspaceCodeEditor(props: Props) {
  const { filePath } = props;

  return (
    <div className={clsx('flex w-full flex-col')}>
      <div className="group relative size-full">
        <ResetCodeButtonWrapper filePath={filePath} />
        <CodeEditor filePath={filePath} />
      </div>
      <SolutionBanner {...props} />
    </div>
  );
}

function CodeEditor({ filePath }: BaseProps) {
  const workspaceDispatch = useUserInterfaceCodingWorkspaceDispatch();
  const files = useUserInterfaceCodingWorkspaceSelector(
    (state) => state.sandpack.current.files,
  );

  const onFocus = useCallback(() => {
    workspaceDispatch(updateActiveFile(filePath));
    // eslint-disable-next-line
  }, [filePath]);

  return (
    <MonacoCodeEditor
      filePath={filePath}
      value={files[filePath].code}
      onChange={(val) => {
        workspaceDispatch(updateFile({ content: val ?? '', path: filePath }));
        workspaceDispatch(
          onUpdateSolutionCode({
            ...files,
            [filePath]: { code: val ?? '' },
          }),
        );
      }}
      onFocus={onFocus}
    />
  );
}

function ResetCodeButtonWrapper({ filePath }: Readonly<{ filePath: string }>) {
  const workspaceDispatch = useUserInterfaceCodingWorkspaceDispatch();
  const currentOpenedSolution = useUserInterfaceCodingWorkspaceSelector(
    (state) => state.solution.currentOpenedSolution,
  );

  return (
    <div
      className={clsx(
        'z-sticky absolute right-1.5 top-1.5',
        'opacity-0 transition-opacity duration-200 group-hover:opacity-100',
      )}>
      <CodingWorkspaceCodeEditorResetCodeButton
        type={
          currentOpenedSolution
            ? currentOpenedSolution.attemptId
              ? 'attempt'
              : 'solution'
            : 'skeleton'
        }
        onResetFile={() =>
          workspaceDispatch(resetUserInterfaceCodingWorkspaceFile(filePath))
        }
      />
    </div>
  );
}

function SolutionBanner({
  isMobile = false,
  onOpenSolution,
  replaceCodeEditorContents,
}: Readonly<{
  isMobile?: boolean;
  onOpenSolution: ComponentProps<
    typeof CodingWorkspaceSolutionBanner
  >['onOpenSolution'];
  replaceCodeEditorContents: (files: SandpackFiles) => void;
}>) {
  const files = useUserInterfaceCodingWorkspaceSelector(
    (state) => state.sandpack.current.files,
  );
  const defaultFiles = useUserInterfaceCodingWorkspaceSelector(
    (state) => state.sandpack.default.files,
  );
  const currentOpenedSolution = useUserInterfaceCodingWorkspaceSelector(
    (state) => state.solution.currentOpenedSolution,
  );
  const question = useUserInterfaceCodingWorkspaceSelector(
    (state) => state.workspace.question,
  );
  const workspaceDispatch = useUserInterfaceCodingWorkspaceDispatch();
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  function overwriteWithSolutionCode() {
    saveUserInterfaceQuestionCodeLocally(question, files);
  }

  function revertToSavedCode() {
    const loadedFiles = loadLocalUserInterfaceQuestionCode(
      question,
      question.skeletonBundle!.files,
    );
    const newFiles = loadedFiles ?? defaultFiles;

    replaceCodeEditorContents(newFiles);
  }

  return (
    <>
      <CodingWorkspaceSolutionBanner
        isMobile={isMobile}
        workspaceType="ui"
        onOpenSolution={onOpenSolution}
        onOverwriteWithSolutionCode={overwriteWithSolutionCode}
        onRevertToSavedCode={revertToSavedCode}
        onSave={() => setShowSaveDialog(true)}
      />
      <UserInterfaceCodingWorkspaceSaveDialog
        currentAttempt={
          currentOpenedSolution && currentOpenedSolution.attemptId
            ? {
                id: currentOpenedSolution.attemptId,
                name: currentOpenedSolution.name,
              }
            : null
        }
        files={files}
        isShown={showSaveDialog}
        question={question!}
        onClose={() => setShowSaveDialog(false)}
        onSuccess={() => workspaceDispatch(resetHasUnsavedSolutionChanges())}
      />
    </>
  );
}
