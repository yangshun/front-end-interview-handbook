import type { SandpackBundlerFiles } from '@codesandbox/sandpack-client';
import type { Monaco } from '@monaco-editor/react';
import { debounce } from 'lodash-es';
import { useEffect, useRef } from 'react';

const DEBOUNCE_INTERVAL = 300;

// This hook runs TypeScript validation every time the files are updated.
// Not sure why it doesn't trigger automatically when models are updated, so we're triggering it ourselves.
export default function useMonacoLanguagesTypeScriptRunDiagnostics(
  monaco: Monaco | null,
  shouldUseTypeScript = false,
  enabled = true,
  files: SandpackBundlerFiles,
) {
  const runDiagnostics = useRef<() => null | void>();

  useEffect(() => {
    if (monaco == null || !shouldUseTypeScript) {
      return;
    }

    if (enabled) {
      // Debounce to improve performance.
      // Running too often also leads to some worker error (set interval to 0 to see).
      runDiagnostics.current = debounce(() => {
        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: false,
          noSyntaxValidation: false,
        });
      }, DEBOUNCE_INTERVAL);
    } else {
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true,
      });
    }
  }, [enabled, monaco, shouldUseTypeScript]);

  useEffect(() => {
    if (enabled) {
      runDiagnostics.current?.();
    }
  }, [enabled, files]);
}
