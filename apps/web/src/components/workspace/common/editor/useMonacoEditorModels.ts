import type { Monaco } from '@monaco-editor/react';
import { useEffect } from 'react';

import type { SandpackBundlerFiles } from '../explorer/types';
import getLanguageFromFilePath from './getLanguageFromFilePath';

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

    const filePathSet = new Set(
      Object.keys(files).map((path) => monaco.Uri.parse(path).toString()),
    );

    // Dispose models that are no longer in the current files
    monaco.editor
      .getModels()
      .filter((model) => !filePathSet.has(model.uri.toString()))
      .forEach((model) => model.dispose());

    // Create or update monaco models for the current files
    Object.entries(files).forEach(([filePath, bundlerFile]) => {
      const uri = monaco.Uri.parse(filePath);
      const model = monaco.editor.getModel(uri);

      if (model == null) {
        monaco.editor.createModel(
          bundlerFile.code,
          getLanguageFromFilePath(filePath)?.language ?? undefined,
          uri,
        );

        return;
      }

      if (model.getValue() !== bundlerFile.code) {
        model.setValue(bundlerFile.code);
      }
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

      // Dispose models because some questions have the same
      // files and going from one question to another should
      // show the latest file.
      models.forEach((model) => {
        model.dispose();
      });
    };
  }, [monaco]);
}
