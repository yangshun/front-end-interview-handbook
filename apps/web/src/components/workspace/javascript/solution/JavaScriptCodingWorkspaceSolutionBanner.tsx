import { type ComponentProps, useCallback } from 'react';

import { updateFile } from '~/components/workspace//common/store/sandpack-slice';
import CodingWorkspaceSolutionBanner from '~/components/workspace/common/solution/CodingWorkspaceSolutionBanner';

import {
  loadLocalJavaScriptQuestionCode,
  saveJavaScriptQuestionCodeLocally,
} from '../JavaScriptCodingWorkspaceCodeStorage';
import { submit } from '../store/execution-slice';
import {
  useJavaScriptCodingWorkspaceDispatch,
  useJavaScriptCodingWorkspaceSelector,
} from '../store/hooks';

export default function JavaScriptCodingWorkspaceSolutionBanner({
  isMobile = false,
  onOpenSolution,
}: Readonly<{
  isMobile?: boolean;
  onOpenSolution: ComponentProps<
    typeof CodingWorkspaceSolutionBanner
  >['onOpenSolution'];
}>) {
  const files = useJavaScriptCodingWorkspaceSelector(
    (state) => state.sandpack.current.files,
  );
  const { language, question } = useJavaScriptCodingWorkspaceSelector(
    (state) => state.workspace,
  );
  const workspaceDispatch = useJavaScriptCodingWorkspaceDispatch();
  const { metadata, skeleton, workspace } = question;

  const overwriteWithSolutionCode = useCallback(() => {
    saveJavaScriptQuestionCodeLocally(
      metadata,
      language,
      files[workspace.main]?.code ?? '',
    );
  }, [files, language, metadata, workspace.main]);
  const revertToSavedCode = useCallback(() => {
    const loadedCode = loadLocalJavaScriptQuestionCode(metadata, language);
    const code = loadedCode ?? skeleton[language];

    workspaceDispatch(updateFile({ content: code, path: workspace.main }));
  }, [language, metadata, workspace.main, skeleton, workspaceDispatch]);

  return (
    <CodingWorkspaceSolutionBanner
      isMobile={isMobile}
      workspaceType="js"
      onOpenSolution={onOpenSolution}
      onOverwriteWithSolutionCode={overwriteWithSolutionCode}
      onRevertToSavedCode={revertToSavedCode}
      onSave={() => workspaceDispatch(submit(metadata))}
    />
  );
}
