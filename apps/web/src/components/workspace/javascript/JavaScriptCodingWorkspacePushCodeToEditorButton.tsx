'use client';

import CodingWorkspacePushCodeToEditorButton from '~/components/workspace/common/CodingWorkspacePushCodeToEditorButton';
import { updateFile } from '~/components/workspace/common/store/sandpack-slice';

import { updateCurrentOpenedSolution } from '../common/store/solution-slice';
import {
  useJavaScriptCodingWorkspaceDispatch,
  useJavaScriptCodingWorkspaceSelector,
} from './store/hooks';

type Variant = 'attempt' | 'solution';

type Props = Readonly<{
  contents: string;
  metadata: {
    id?: string;
    name: string;
  };
  onOpenSolutionInWorkspace?: () => void;
  type: Variant;
}>;

export default function JavaScriptCodingWorkspacePushCodeToEditorButton({
  contents,
  metadata,
  onOpenSolutionInWorkspace,
  type,
}: Props) {
  const workspaceDispatch = useJavaScriptCodingWorkspaceDispatch();
  const { workspace } = useJavaScriptCodingWorkspaceSelector(
    (state) => state.workspace.question,
  );

  function replaceCodeEditorContents() {
    workspaceDispatch(
      updateFile({
        content: contents,
        path: workspace.main,
      }),
    );
  }

  return (
    <CodingWorkspacePushCodeToEditorButton
      type={type}
      onProceed={() => {
        workspaceDispatch(
          updateCurrentOpenedSolution({
            attemptId: metadata.id,
            files: {
              [workspace.main]: {
                code: contents,
              },
            },
            name: metadata.name,
          }),
        );
        replaceCodeEditorContents();
        onOpenSolutionInWorkspace?.();
      }}
    />
  );
}
