import type { editor } from 'monaco-editor';
import { useEffect } from 'react';

import { useCodingWorkspaceContext } from '../../CodingWorkspaceContext';

import type { Monaco } from '@monaco-editor/react';

export default function useMonacoEditorAddActions(
  monaco: Monaco | null,
  editor: editor.IStandaloneCodeEditor | null,
) {
  const { submit, runTests } = useCodingWorkspaceContext();

  useEffect(() => {
    if (!monaco || !editor) {
      return;
    }

    // TODO: Customize these actions.
    editor.addAction({
      id: 'gfe.submit',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      label: 'GreatFrontEnd: Submit code',
      run (_ed: editor.ICodeEditor) {
        console.log('TODO: Submit code');
        submit();
      },
    });

    editor.addAction({
      id: 'gfe.run',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Quote],
      label: 'GreatFrontEnd: Run code',
      run (_ed: editor.ICodeEditor) {
        // TODO: Only add this for JS questions.
        console.log('TODO: Run code');
        runTests();
      },
    });
  }, [monaco, editor, submit, runTests]);
}
