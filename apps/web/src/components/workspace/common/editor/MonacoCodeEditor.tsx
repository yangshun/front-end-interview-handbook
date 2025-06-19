'use client';

import MonacoEditor, { loader, useMonaco } from '@monaco-editor/react';
import clsx from 'clsx';
import type { editor } from 'monaco-editor';
import React, { useEffect, useRef } from 'react';

import { useIntl } from '~/components/intl';
import EmptyState from '~/components/ui/EmptyState';

import logEvent from '~/logging/logEvent';
import { getErrorMessage } from '~/utils/getErrorMessage';

import getLanguageFromFilePath from './getLanguageFromFilePath';
import useMonacoEditorAddActions from './useMonacoEditorAddActions';
import useMonacoEditorAddFormatter from './useMonacoEditorAddFormatter';
import useMonacoEditorOnShown from './useMonacoEditorOnShown';
import useMonacoEditorTheme from './useMonacoEditorTheme';

function monacoUrl() {
  return process.env.NODE_ENV === 'development'
    ? // Keep version synced with `monaco-editor` in package.json.
      '/monaco-editor/dev/vs'
    : '/monaco-editor/min/vs';
}

loader.config({
  paths: {
    vs: monacoUrl(),
  },
});

type Props = Readonly<
  {
    className?: string;
    filePath?: string;
    height?: React.ComponentProps<typeof MonacoEditor>['height'];
    keepCurrentModel?: boolean;
    language?: string;
    onFocus?: () => void;
    onMount?: (codeEditor: editor.IStandaloneCodeEditor) => void;
    options?: editor.IStandaloneEditorConstructionOptions;
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
  className,
  filePath,
  height,
  keepCurrentModel = true,
  language,
  onChange,
  onFocus,
  onMount,
  options,
  readOnly = false,
  value,
  wordWrap = false,
}: Props) {
  const intl = useIntl();
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

  const languageExt = getLanguageFromFilePath(filePath);

  useMonacoEditorAddActions(monaco, editorRef.current);
  useMonacoEditorAddFormatter(monaco, editorRef.current, languageExt?.ext);
  useMonacoEditorOnShown(editorContainerRef.current, onFocus);

  return (
    <div
      ref={editorContainerRef}
      className={clsx(className, 'size-full')}
      onFocus={onFocus}>
      <MonacoEditor
        height={height}
        keepCurrentModel={keepCurrentModel}
        language={language ?? languageExt?.language ?? undefined}
        loading={
          <EmptyState
            iconClassName="animate-bounce"
            size="sm"
            title={intl.formatMessage({
              defaultMessage: 'Loading editor',
              description: 'Loading code editor',
              id: 'AFsv0q',
            })}
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
          ...options,
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
