import type { editor } from 'monaco-editor';
import React, { useEffect, useRef } from 'react';

import EmptyState from '~/components/ui/EmptyState';

import logEvent from '~/logging/logEvent';
import { getErrorMessage } from '~/utils/getErrorMessage';

import getLanguageFromFilePath from './getLanguageFromFilePath';
import useMonacoEditorAddActions from './useMonacoEditorAddActions';
import useMonacoEditorAddFormatter from './useMonacoEditorAddFormatter';
import useMonacoEditorOnShown from './useMonacoEditorOnShown';
import useMonacoEditorTheme from './useMonacoEditorTheme';

import MonacoEditor, { loader, useMonaco } from '@monaco-editor/react';

function monacoUrl() {
  return process.env.NODE_ENV === 'development'
    ? // Keep version synced with `monaco-editor` in package.json.
      'https://gfecdn.net/npm/monaco-editor@0.40.0/dev/vs'
    : 'https://gfecdn.net/npm/monaco-editor@0.40.0/min/vs';
}

loader.config({
  paths: {
    vs: monacoUrl(),
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

const monacoPingURL = monacoUrl() + '/loader.js';

async function pingMonacoEditorLoader() {
  try {
    const response = await fetch(monacoPingURL);
    const text = await response.text();

    logEvent('monaco.reachable', {
      namespace: 'workspace',
      url: monacoPingURL,
      version: /Version: (.*)\n/.exec(text)?.[1],
    });
  } catch (error) {
    logEvent('monaco.unreachable', {
      error: getErrorMessage(error),
      namespace: 'workspace',
      url: monacoPingURL,
    });
    console.error(getErrorMessage(error));
  }
}

// Module-level, just need to load once per user.
let pingSent = false;

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

  useEffect(() => {
    if (pingSent) {
      return;
    }

    pingSent = true;
    pingMonacoEditorLoader();
  }, []);

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
