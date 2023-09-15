import { useEffect } from 'react';

import type { SandpackBundlerFiles } from '../explorer/types';

import type { Monaco } from '@monaco-editor/react';

// This hook should be run on the project level, and not for individual files.
export default function useMonacoEditorModels(
  monaco: Monaco | null,
  files: SandpackBundlerFiles,
) {
  // Creates models for a project.
  useEffect(() => {
    if (monaco == null) {
      return;
    }

    Object.entries(files).forEach(([filePath, bundlerFile]) => {
      const uri = monaco.Uri.parse(filePath);

      // Calling createModel() while a model exists for a uri
      // will cause the editor to crash, so we need to check first.
      if (monaco.editor.getModel(uri)) {
        return;
      }

      monaco.editor.createModel(bundlerFile.code, undefined, uri);
    });
  }, [monaco, files]);

  // Use this only when the page unmounts, not on the editor level
  // because a page can contain multiple editor instances that
  // reference the same models.
  useEffect(() => {
    return () => {
      if (monaco == null) {
        return;
      }

      const models = monaco.editor.getModels();

      models.forEach((model) => {
        model.dispose();
      });
    };
  }, [monaco]);
}
