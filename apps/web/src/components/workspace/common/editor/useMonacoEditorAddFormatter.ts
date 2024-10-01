import { type editor as Editor } from 'monaco-editor';
import type { Plugin } from 'prettier';
import { useCallback, useEffect } from 'react';

import { useToast } from '~/components/global/toasts/useToast';
import { useIntl } from '~/components/intl';

import type { Monaco } from '@monaco-editor/react';

export default function useMonacoEditorAddFormatter(
  monaco: Monaco | null,
  editor: Editor.IStandaloneCodeEditor | null,
  filePath: string,
) {
  const { showToast } = useToast();
  const intl = useIntl();

  const showErrorToast = useCallback(() => {
    showToast({
      title: intl.formatMessage({
        defaultMessage: 'An error occurred while formatting the code',
        description:
          'Error message shown when an error occurs while formatting code',
        id: 'OOyT6O',
      }),
      variant: 'danger',
      // TODO(workspace): actually show the error message
      // (right now its way too long to be shown in a toast,
      // maybe log it in the workspace console?)
    });
  }, [showToast, intl]);
  const format = useCallback(async () => {
    const model = editor?.getModel();

    if (!monaco || !editor || !model) {
      return;
    }

    const value = editor.getValue();
    const cursorPosition = editor.getPosition();
    const cursorOffset =
      (cursorPosition && model.getOffsetAt(cursorPosition)) || 0;

    const { formatWithCursor } = await import('prettier/standalone');

    const options = {
      cursorOffset,
      parser: 'babel',
      plugins: [] as Array<Plugin>,
    };

    const fileExtension = filePath.split('.').pop();

    switch (fileExtension) {
      case 'ts':
      case 'tsx':
        // Reason for estree: https://github.com/prettier/prettier/issues/15473
        // No clue why it doesn't have a type definition though
        options.plugins.push(await import('prettier/plugins/typescript'));
        options.plugins.push(
          (await import('prettier/plugins/estree')) as never,
        );
        options.parser = 'typescript';
        break;
      case 'js':
      case 'jsx':
        options.plugins.push(await import('prettier/plugins/babel'));
        options.plugins.push(
          (await import('prettier/plugins/estree')) as never,
        );
        options.parser = 'babel';
        break;
      case 'svelte':
        // Used internally in prettier-plugin-svelte
        options.plugins.push(await import('prettier/plugins/babel'));
        options.plugins.push(
          (await import('prettier/plugins/estree')) as never,
        );
        options.plugins.push(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore this library doesnt have any typedef
          await import('prettier-plugin-svelte/browser'),
        );
        options.parser = 'svelte';
        break;
      case 'vue':
        options.plugins.push(await import('prettier/plugins/babel'));
        options.plugins.push(
          (await import('prettier/plugins/estree')) as never,
        );
        options.plugins.push(await import('prettier/plugins/html'));
        options.parser = 'vue';
        break;
      case 'html':
        options.plugins.push(await import('prettier/plugins/html'));
        options.parser = 'html';
        break;
      case 'css':
        options.plugins.push(await import('prettier/plugins/postcss'));
        options.parser = 'css';
        break;
    }

    try {
      const { formatted, cursorOffset: newOffset } = await formatWithCursor(
        value || '',
        options,
      );

      let newCursorPosition = [
        new monaco.Selection(
          cursorPosition?.lineNumber || 0,
          cursorPosition?.column || 0,
          cursorPosition?.lineNumber || 0,
          cursorPosition?.column || 0,
        ),
      ];

      // TODO(workspace): make it also work for svelte files
      if (fileExtension !== 'svelte') {
        let lineNumber = 1;
        let column = 1;

        for (let i = 0; i < newOffset; i++) {
          if (formatted[i] === '\n') {
            lineNumber++;
            column = 1;
          } else {
            column++;
          }
        }

        newCursorPosition = [
          new monaco.Selection(lineNumber, column, lineNumber, column),
        ];
      }

      editor.executeEdits(
        '',
        [
          {
            range: model.getFullModelRange(),
            text: formatted,
          },
        ],
        newCursorPosition,
      );
    } catch (e) {
      showErrorToast();
      console.error(e);
    }
  }, [editor, filePath, showErrorToast, monaco]);

  useEffect(() => {
    if (!monaco || !editor) {
      return;
    }

    const { html, css, typescript } = monaco.languages;

    html.htmlDefaults.setModeConfiguration({
      ...html.htmlDefaults.modeConfiguration,
      documentFormattingEdits: false,
      documentRangeFormattingEdits: false,
    });
    css.cssDefaults.setModeConfiguration({
      ...css.cssDefaults.modeConfiguration,
      documentFormattingEdits: false,
      documentRangeFormattingEdits: false,
    });
    typescript.typescriptDefaults.setModeConfiguration({
      ...typescript.typescriptDefaults.modeConfiguration,
      documentRangeFormattingEdits: false,
      onTypeFormattingEdits: false,
    });
    typescript.javascriptDefaults.setModeConfiguration({
      ...typescript.javascriptDefaults.modeConfiguration,
      documentRangeFormattingEdits: false,
      onTypeFormattingEdits: false,
    });

    editor.addAction({
      contextMenuGroupId: '1_modification',
      contextMenuOrder: 5,
      id: 'gfe.formatCode',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
      label: 'GreatFrontEnd: Format Code',
      run(_editor: Editor.ICodeEditor) {
        format();
      },
    });
  }, [monaco, editor, format]);
}
