import type { Monaco } from '@monaco-editor/react';
import { useEffect } from 'react';

import type { TsConfigCompilerOptionsJSON } from './convertTsConfigToTsCompilerOptions';
import { convertTsConfigToTsCompilerOptions } from './convertTsConfigToTsCompilerOptions';

/**
 * This hook loads the contents of `tsconfig.json` into Monaco's TypeScript compiler worker.
 */
export default function useMonacoLanguagesLoadTSConfig(
  monaco: Monaco | null,
  shouldUseTypeScript = false,
  tsConfigString: string | null, // Use a string to make comparisons easier.
) {
  useEffect(() => {
    if (monaco == null || !shouldUseTypeScript || tsConfigString == null) {
      return;
    }

    let tsConfig: Readonly<{
      compilerOptions: TsConfigCompilerOptionsJSON;
    }> | null = null;

    try {
      tsConfig = JSON.parse(tsConfigString);
      if (tsConfig == null) {
        return;
      }
    } catch {
      // Terminate if parsing the TS config results in an error.
      return;
    }

    console.info('[tsconfig.json]', tsConfig);
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      ...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
      ...convertTsConfigToTsCompilerOptions(monaco, tsConfig.compilerOptions),
    });
  }, [monaco, shouldUseTypeScript, tsConfigString]);
}
