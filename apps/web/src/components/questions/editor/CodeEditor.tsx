import DraculaTheme from 'monaco-themes/themes/Dracula.json';

import type { Monaco } from '@monaco-editor/react';
import MonacoEditor from '@monaco-editor/react';

type Props = Readonly<{
  filePath: string;
  onChange: (value: string) => void;
  value: string | null;
}>;

const languageMapping: Record<string, string> = {
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
};

function getLanguageFromFilePath(filePath: string): string {
  const parts = filePath.split('.');
  const ext = parts[parts.length - 1];

  return ext in languageMapping ? languageMapping[ext] : ext;
}

// A controlled component because we need to allow resetting to
// the initial code.
export default function CodeEditor({ value, filePath, onChange }: Props) {
  function handleEditorWillMount(monaco: Monaco) {
    monaco.editor.defineTheme('dracula', DraculaTheme);
  }

  const language = getLanguageFromFilePath(filePath);

  return (
    <MonacoEditor
      beforeMount={handleEditorWillMount}
      defaultLanguage={language}
      options={{
        minimap: {
          enabled: true,
        },
      }}
      theme="dracula"
      value={value ?? ''}
      onChange={(val) => onChange(val ?? '')}
    />
  );
}
