import type { Monaco } from '@monaco-editor/react';
import type { editor, Uri } from 'monaco-editor';
import { useEffect } from 'react';

export default function useMonacoEditorRegisterEditorOpener(
  monaco: Monaco | null,
  onOpenFile: (filePath: string, fromFilePath?: string) => void,
) {
  useEffect(() => {
    if (monaco == null) {
      return;
    }

    const disposer = monaco?.editor?.registerEditorOpener?.({
      openCodeEditor: (source: editor.ICodeEditor, resource: Uri) => {
        onOpenFile(resource.path, source.getModel()?.uri.path);

        return true;
      },
    });

    if (disposer == null) {
      return;
    }

    const { dispose } = disposer;

    return () => {
      dispose();
    };
  }, [monaco, onOpenFile]);
}
