import type { editor } from 'monaco-editor';
// @ts-expect-error monaco-vim is not typed.
import { initVimMode } from 'monaco-vim';
import { useEffect, useRef } from 'react';

export default function useMonacoEditorVimMode(
  editorInstance: editor.IStandaloneCodeEditor | null,
  enabled: boolean,
  vimStatusBar: HTMLDivElement | null,
) {
  // AnyIntentional as monaco-vim is not typed.
  const vimModeRef = useRef<AnyIntentional>(null);

  useEffect(() => {
    if (!editorInstance) {
      return;
    }

    if (enabled && !vimModeRef.current) {
      vimModeRef.current = initVimMode(editorInstance, vimStatusBar);
    } else if (!enabled && vimModeRef.current) {
      vimModeRef.current.dispose();
      vimModeRef.current = null;
    }

    return () => {
      if (vimModeRef.current) {
        vimModeRef.current.dispose();
        vimModeRef.current = null;
      }
    };
  }, [editorInstance, enabled, vimStatusBar]);
}
