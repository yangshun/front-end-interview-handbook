import type { editor } from 'monaco-editor';
import React, { useRef } from 'react';

import EmptyState from '~/components/ui/EmptyState';

import getLanguageFromFilePath from './getLanguageFromFilePath';
import useMonacoEditorAddActions from './useMonacoEditorAddActions';
import useMonacoEditorAddFormatter from './useMonacoEditorAddFormatter';
import useMonacoEditorOnShown from './useMonacoEditorOnShown';
import useMonacoEditorTheme from './useMonacoEditorTheme';

import MonacoEditor, { loader, useMonaco } from '@monaco-editor/react';

loader.config({
  paths: {
    vs:
      process.env.NODE_ENV === 'development'
        ? // Keep version synced with `monaco-editor` in package.json.
          'https://gfecdn.net/npm/monaco-editor@0.40.0/dev/vs'
        : 'https://gfecdn.net/npm/monaco-editor@0.40.0/min/vs',
  },
});

type Props = Readonly<
  {
    filePath: string;
    keepCurrentModel?: boolean;
    onFocus?: () => void;
    onMount?: (codeEditor: editor.IStandaloneCodeEditor) => void;
    value: string | null;
    wordWrap?: boolean;
  } & (
    | {
        onChange: (value: string) => void;
        readOnly?: boolean;
      }
    | {
        onChange?: (value: string) => void;
        readOnly: true;
      }
  )
>;

export default function MonacoCodeEditor({
  filePath,
  value,
  onMount,
  onChange,
  onFocus,
  wordWrap = false,
  readOnly = false,
  keepCurrentModel = true,
}: Props) {
  const monaco = useMonaco();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const themeKey = useMonacoEditorTheme();

  useMonacoEditorAddActions(monaco, editorRef.current);
  useMonacoEditorAddFormatter(monaco, editorRef.current, filePath);
  useMonacoEditorOnShown(editorContainerRef.current, onFocus);

  const language = getLanguageFromFilePath(filePath);

  return (
    <div ref={editorContainerRef} className="size-full" onFocus={onFocus}>
      <MonacoEditor
        keepCurrentModel={keepCurrentModel}
        language={language}
        loading={
          <EmptyState
            iconClassName="animate-bounce"
            size="sm"
            title="Loading editor"
            variant="editor_loading"
          />
        }
        options={{
          fixedOverflowWidgets: true,
          minimap: {
            enabled: false,
          },
          readOnly,
          wordWrap: wordWrap ? 'on' : 'off',
        }}
        path={filePath}
        theme={themeKey}
        value={value ?? ''}
        onChange={(val) => onChange?.(val ?? '')}
        onMount={(editorInstance) => {
          editorRef.current = editorInstance;
          onMount?.(editorInstance);
        }}
      />
    </div>
  );
}
