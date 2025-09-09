import { useEffect } from 'react';

import { saveJavaScriptQuestionCodeLocally } from '../JavaScriptCodingWorkspaceCodeStorage';
import { useJavaScriptCodingWorkspaceSelector } from '../store/hooks';

export default function useJavaScriptCodingWorkspaceSaveCodeLocally() {
  const { language, question } = useJavaScriptCodingWorkspaceSelector(
    (state) => state.workspace,
  );
  const currentOpenedSolution = useJavaScriptCodingWorkspaceSelector(
    (state) => state.solution.currentOpenedSolution,
  );
  const files = useJavaScriptCodingWorkspaceSelector(
    (state) => state.sandpack.current.files,
  );
  const { metadata, workspace } = question;
  const mainFileCode = files[workspace.main]?.code;

  useEffect(() => {
    if (mainFileCode != null && currentOpenedSolution == null) {
      saveJavaScriptQuestionCodeLocally(metadata, language, mainFileCode);
    }
  }, [language, mainFileCode, metadata, currentOpenedSolution]);
}
