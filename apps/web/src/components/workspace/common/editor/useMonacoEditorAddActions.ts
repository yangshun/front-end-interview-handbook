import type { Monaco } from '@monaco-editor/react';
import type { editor as Editor } from 'monaco-editor';
import { useEffect } from 'react';

import { useCodingWorkspaceContext } from '../CodingWorkspaceContext';

export default function useMonacoEditorAddActions(
  monaco: Monaco | null,
  editor: Editor.IStandaloneCodeEditor | null,
) {
  const { submit, runTests } = useCodingWorkspaceContext();

  useEffect(() => {
    if (!monaco || !editor) {
      return;
    }

    // TODO(workspace): Remove for UI questions.
    editor.addAction({
      id: 'gfe.submit',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      label: 'GreatFrontEnd: Submit code',
      run(_editor: Editor.ICodeEditor) {
        submit();
      },
    });

    // TODO(workspace): Remove for UI questions.
    editor.addAction({
      id: 'gfe.run',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Quote],
      label: 'GreatFrontEnd: Run code',
      run(_ed: Editor.ICodeEditor) {
        runTests();
      },
    });
  }, [monaco, editor, submit, runTests]);
}
