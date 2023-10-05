import clsx from 'clsx';
import type { editor } from 'monaco-editor';
import { useEffect, useState } from 'react';

import JavaScriptSelfTestCodesEmitter from '~/components/questions/content/JavaScriptSelfTestCodesEmitter';

import JavaScriptCodingWorkspaceCodeEditor from './JavaScriptCodingWorkspaceCodeEditor';

import { useMonaco } from '@monaco-editor/react';

type Props = Readonly<{
  testsPath: string;
}>;

export default function JavaScriptCodingWorkspaceTestsEditor({
  testsPath,
}: Props) {
  const monaco = useMonaco();
  const [editorInstance, setEditorInstance] =
    useState<editor.IStandaloneCodeEditor>();

  useEffect(() => {
    if (monaco == null) {
      return;
    }

    JavaScriptSelfTestCodesEmitter.on(
      'focus_on_test',
      async ({ index, path: fullPath }) => {
        if (!editorInstance) {
          return;
        }

        const path = fullPath.slice(0, index + 1);
        const parentPath = path.slice(0, path.length - 1);
        const testName = path[path.length - 1];
        const sep = '[\\s\\S\\n\\r]*?';
        const regex = `${parentPath.join(sep)}${sep}(${testName})`;

        const match = editorInstance
          ?.getModel()
          ?.findNextMatch(
            regex,
            { column: 1, lineNumber: 1 },
            true,
            true,
            null,
            true,
          );

        if (!match) {
          return;
        }

        const endPosition = match.range.getEndPosition().delta(0, 1);
        const startPosition = endPosition.delta(0, -(testName.length + 2));

        const range = monaco.Range.fromPositions(startPosition, endPosition);

        editorInstance.revealRangeNearTopIfOutsideViewport(range);

        const collection = editorInstance.createDecorationsCollection([
          {
            options: {
              inlineClassName: clsx(
                '!bg-brand',
                '!text-white',
                'transition-colors',
              ),
            },
            range,
          },
        ]);

        setTimeout(() => {
          collection.clear();
        }, 1000);
      },
    );

    return () => JavaScriptSelfTestCodesEmitter.off('focus_on_test');
  }, [monaco, editorInstance]);

  return (
    <JavaScriptCodingWorkspaceCodeEditor
      filePath={testsPath}
      onMount={setEditorInstance}
    />
  );
}
