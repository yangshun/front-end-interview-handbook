'use client';

import clsx from 'clsx';
import type { editor } from 'monaco-editor';
import React, { useEffect, useRef } from 'react';

import { useIntl } from '~/components/intl';
import EmptyState from '~/components/ui/EmptyState';

import logEvent from '~/logging/logEvent';
import { cdnUrl } from '~/utils/cdnUrl';
import { getErrorMessage } from '~/utils/getErrorMessage';

import getLanguageFromFilePath from './getLanguageFromFilePath';
import useMonacoEditorVimMode from './hooks/useMonacoEditorVimMode';
import useMonacoEditorAddActions from './useMonacoEditorAddActions';
import useMonacoEditorAddFormatter from './useMonacoEditorAddFormatter';
import useMonacoEditorOnShown from './useMonacoEditorOnShown';
import useMonacoEditorTheme from './useMonacoEditorTheme';

import MonacoEditor, { loader, useMonaco } from '@monaco-editor/react';

function monacoUrl() {
  return process.env.NODE_ENV === 'development'
    ? // Keep version synced with `monaco-editor` in package.json.
      cdnUrl('/monaco-editor/dev/vs')
    : cdnUrl('/monaco-editor/min/vs');
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
    isVimModeEnabled?: boolean;
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
  language,
  height,
  value,
  onMount,
  onChange,
  onFocus,
  wordWrap = false,
  readOnly = false,
  keepCurrentModel = true,
  isVimModeEnabled = false,
  options,
}: Props) {
  const intl = useIntl();
  const monaco = useMonaco();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const vimStatusBarRef = useRef<HTMLDivElement | null>(null);
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
  useMonacoEditorVimMode(
    editorRef.current,
    isVimModeEnabled,
    vimStatusBarRef.current,
  );

  return (
    <>
      <div
        ref={vimStatusBarRef}
        className={clsx(
          'h-6 w-full bg-white px-3 font-mono text-sm/6 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 [&_input:focus]:outline-0 [&_input:focus]:ring-0 [&_input]:h-full [&_input]:border-0 [&_input]:bg-transparent [&_input]:text-sm/6',
          !isVimModeEnabled && 'hidden',
        )}
      />
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
    </>
  );
}
