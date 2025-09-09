import { useMonaco } from '@monaco-editor/react';
import clsx from 'clsx';
import type { editor } from 'monaco-editor';
import { useEffect, useState } from 'react';

import JavaScriptCodingWorkspaceCodeEditor from '~/components/workspace/javascript/editor/JavaScriptCodingWorkspaceCodeEditor';
import { useJavaScriptCodingWorkspaceSelector } from '~/components/workspace/javascript/store/hooks';

type Props = Readonly<{
  specPath: string;
}>;

export default function JavaScriptCodingWorkspaceTestsEditor({
  specPath,
}: Props) {
  const monaco = useMonaco();
  const [editorInstance, setEditorInstance] =
    useState<editor.IStandaloneCodeEditor>();
  const testFocus = useJavaScriptCodingWorkspaceSelector(
    (state) => state.workspace.testFocus,
  );

  useEffect(() => {
    if (monaco == null || !editorInstance || testFocus == null) {
      return;
    }

    const { filePath, index, specParts } = testFocus;

    if (filePath !== specPath) {
      return;
    }

    const part = specParts.slice(0, index + 1);
    const parentParts = part
      .slice(0, part.length - 1)
      .map((item) => `['"]${item}['"]`);
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
            '!text-neutral-900',
            'transition-colors',
          ),
        },
        range,
      },
    ]);

    setTimeout(() => {
      collection.clear();
    }, 1000);
  }, [monaco, editorInstance, specPath, testFocus]);

  return (
    <JavaScriptCodingWorkspaceCodeEditor
      filePath={specPath}
      type="test"
      onMount={setEditorInstance}
    />
  );
}
