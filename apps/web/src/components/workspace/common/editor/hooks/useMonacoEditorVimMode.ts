import type { editor } from 'monaco-editor';
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

    const initVimModeIfEnabled = async () => {
      if (enabled && !vimModeRef.current) {
        // Dynamically import monaco-vim only when needed
        // @ts-expect-error monaco-vim is not typed
        const { initVimMode } = await import('monaco-vim');

        vimModeRef.current = initVimMode(editorInstance, vimStatusBar);
      } else if (!enabled && vimModeRef.current) {
        vimModeRef.current.dispose();
        vimModeRef.current = null;
      }
    };

    initVimModeIfEnabled();

    return () => {
      if (vimModeRef.current) {
        vimModeRef.current.dispose();
        vimModeRef.current = null;
      }
    };
  }, [editorInstance, enabled, vimStatusBar]);
}
