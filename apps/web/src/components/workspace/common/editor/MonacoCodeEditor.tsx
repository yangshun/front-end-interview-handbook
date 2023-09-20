import type { editor } from 'monaco-editor';
import React, { useRef } from 'react';

import EmptyState from '~/components/ui/EmptyState';

import getLanguageFromFilePath from './getLanguageFromFilePath';
import useMonacoEditorAddActions from './useMonacoEditorAddActions';
import useMonacoEditorOnShown from './useMonacoEditorOnShown';
import useMonacoEditorTheme from './useMonacoEditorTheme';

import MonacoEditor, { loader, useMonaco } from '@monaco-editor/react';

loader.config({
  // Keep version synced with `monaco-editor` in package.json.
  paths: {
    vs: '/monaco-editor/min/vs',
    // Process.env.NODE_ENV === 'development'
    //   ? '/monaco-editor/dev/vs'
    //   : '/monaco-editor/min/vs',
  },
});

type Props = Readonly<{
  filePath: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  value: string | null;
}>;

export default function MonacoCodeEditor({
  filePath,
  value,
  onChange,
  onFocus,
}: Props) {
  const monaco = useMonaco();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const themeKey = useMonacoEditorTheme();

  useMonacoEditorAddActions(monaco, editorRef.current);
  useMonacoEditorOnShown(editorContainerRef.current, onFocus);

  const language = getLanguageFromFilePath(filePath);

  return (
    <div ref={editorContainerRef} className="h-full w-full" onFocus={onFocus}>
      <MonacoEditor
        keepCurrentModel={true}
        language={language}
        loading={
          <EmptyState
            iconClassName="animate-bounce"
            title="Loading editor"
            variant="editor_loading"
          />
        }
        options={{
          fixedOverflowWidgets: true,
          minimap: {
            enabled: false,
          },
        }}
        path={filePath}
        theme={themeKey}
        value={value ?? ''}
        onChange={(val) => onChange(val ?? '')}
        onMount={(editorInstance) => {
          editorRef.current = editorInstance;
        }}
      />
    </div>
  );
}
