import type { Monaco } from '@monaco-editor/react';
import { useEffect } from 'react';

export default function useMonacoLanguagesJSONDefaults(monaco: Monaco | null) {
  useEffect(() => {
    if (monaco == null) {
      return;
    }

    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      allowComments: true,
      trailingCommas: 'ignore',
    });
  }, [monaco]);
}
