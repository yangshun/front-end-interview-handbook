import clsx from 'clsx';
import type { editor } from 'monaco-editor';
import { useEffect, useState } from 'react';

import JavaScriptTestCodesEmitter from '~/components/workspace/javascript/JavaScriptTestCodesEmitter';

import JavaScriptCodingWorkspaceCodeEditor from './JavaScriptCodingWorkspaceCodeEditor';

import { useMonaco } from '@monaco-editor/react';

type Props = Readonly<{
  specPath: string;
}>;

export default function JavaScriptCodingWorkspaceTestsEditor({
  specPath,
}: Props) {
  const monaco = useMonaco();
  const [editorInstance, setEditorInstance] =
    useState<editor.IStandaloneCodeEditor>();

  useEffect(() => {
    async function highlight({
      filePath,
      index,
      specParts,
    }: Readonly<{
      filePath: string;
      index: number;
      specParts: ReadonlyArray<string>;
    }>) {
      if (monaco == null || !editorInstance || filePath !== specPath) {
        return;
      }

      const part = specParts.slice(0, index + 1);
      const parentParts = part.slice(0, part.length - 1).map((item) => (`['"]${item}['"]`));
      const testName = part[part.length - 1];
      const escapedTestName = testName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const sep = '[\\s\\S\\n\\r]*?';
      const regex = `${parentParts.join(sep)}${sep}['"](${escapedTestName})['"]`;

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

      const endPosition = match.range.getEndPosition().delta(0, 0);
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
    }

    JavaScriptTestCodesEmitter.on('focus_on_test', highlight);

    return () => JavaScriptTestCodesEmitter.off('focus_on_test', highlight);
  }, [monaco, editorInstance, specPath]);

  return (
    <JavaScriptCodingWorkspaceCodeEditor
      filePath={specPath}
      onMount={setEditorInstance}
    />
  );
}
