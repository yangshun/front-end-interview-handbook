'use client';

import type { SandpackFiles } from '@codesandbox/sandpack-react';

import CodingWorkspacePushCodeToEditorButton from '~/components/workspace/common/CodingWorkspacePushCodeToEditorButton';
import { updateCurrentOpenedSolution } from '~/components/workspace/common/store/solution-slice';

import { useUserInterfaceCodingWorkspaceDispatch } from './store/hooks';

type Variant = 'attempt' | 'solution';

type Props = Readonly<{
  files: SandpackFiles;
  metadata: {
    id?: string;
    name: string;
  };
  onOpenSolutionInWorkspace: (files: SandpackFiles) => void;
  type: Variant;
}>;

export default function UserInterfaceCodingWorkspacePushCodeToEditorButton({
  files,
  metadata,
  onOpenSolutionInWorkspace,
  type,
}: Props) {
  const workspaceDispatch = useUserInterfaceCodingWorkspaceDispatch();

  return (
    <CodingWorkspacePushCodeToEditorButton
      type={type}
      onProceed={() => {
        workspaceDispatch(
          updateCurrentOpenedSolution({
            attemptId: metadata.id,
            files,
            name: metadata.name,
          }),
        );
        onOpenSolutionInWorkspace(files);
      }}
    />
  );
}
