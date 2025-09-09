import clsx from 'clsx';
import { useCallback } from 'react';

import CodingWorkspaceCodeEditorResetCodeButton from '~/components/workspace/common/CodingWorkspaceCodeEditorResetCodeButton';

import { resetJavaScriptCodingWorkspaceFile } from './store/actions';
import {
  useJavaScriptCodingWorkspaceDispatch,
  useJavaScriptCodingWorkspaceSelector,
} from './store/hooks';

export default function JavaScriptCodingWorkspaceResetCodeButton({
  filePath,
}: Readonly<{ filePath: string }>) {
  const workspaceDispatch = useJavaScriptCodingWorkspaceDispatch();
  const onResetFile = useCallback(() => {
    workspaceDispatch(resetJavaScriptCodingWorkspaceFile(filePath));
  }, [workspaceDispatch, filePath]);
  const currentOpenedSolution = useJavaScriptCodingWorkspaceSelector(
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
        onResetFile={onResetFile}
      />
    </div>
  );
}
