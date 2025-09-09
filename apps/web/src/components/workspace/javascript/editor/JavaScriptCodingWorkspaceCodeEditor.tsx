import clsx from 'clsx';
import type { editor } from 'monaco-editor';
import { type ComponentProps } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import MonacoCodeEditor from '~/components/workspace/common/editor/MonacoCodeEditor';
import type CodingWorkspaceSolutionBanner from '~/components/workspace/common/solution/CodingWorkspaceSolutionBanner';
import { updateFile } from '~/components/workspace/common/store/sandpack-slice';
import { onUpdateSolutionCode } from '~/components/workspace/common/store/solution-slice';
import { codingWorkspaceTabFileId } from '~/components/workspace/common/tabs/codingWorkspaceTabId';
import JavaScriptCodingWorkspaceResetCodeButton from '~/components/workspace/javascript/editor/JavaScriptCodingWorkspaceResetCodeButton';
import useJavaScriptCodingWorkspaceTilesContext from '~/components/workspace/javascript/hooks/useJavaScriptCodingWorkspaceTilesContext';
import JavaScriptCodingWorkspaceSolutionBanner from '~/components/workspace/javascript/solution/JavaScriptCodingWorkspaceSolutionBanner';
import {
  useJavaScriptCodingWorkspaceDispatch,
  useJavaScriptCodingWorkspaceSelector,
} from '~/components/workspace/javascript/store/hooks';
import JavaScriptCodingWorkspaceCustomTestCasesBanner from '~/components/workspace/javascript/tests/JavaScriptCodingWorkspaceCustomTestCasesBanner';

type BaseProps = Readonly<{
  filePath: string;
  onMount?: (codeEditor: editor.IStandaloneCodeEditor) => void;
}>;

type Props =
  | Readonly<
      BaseProps & {
        isMobile: boolean;
        onOpenSolution: ComponentProps<
          typeof CodingWorkspaceSolutionBanner
        >['onOpenSolution'];
        type: 'coding';
      }
    >
  | Readonly<
      BaseProps & {
        type: 'test';
      }
    >;

export default function JavaScriptCodingWorkspaceCodeEditor(props: Props) {
  const { filePath, onMount, type } = props;
  const { workspace } = useJavaScriptCodingWorkspaceSelector(
    (state) => state.workspace,
  ).question;
  const isMounted = useIsMounted();
  const isMainFile = filePath === workspace.main;
  const isRunFile = filePath === workspace.run;

  return (
    <div className={clsx('flex size-full flex-col')}>
      {isRunFile && isMounted() && (
        <JavaScriptCodingWorkspaceCustomTestCasesBanner />
      )}
      <div className={clsx('group relative size-full')}>
        {isRunFile && <ViewSubmissionTestsButton />}
        <JavaScriptCodingWorkspaceResetCodeButton filePath={filePath} />
        <CodeEditor
          filePath={filePath}
          isMainFile={isMainFile}
          onMount={onMount}
        />
      </div>
      {isMainFile && type === 'coding' && (
        <JavaScriptCodingWorkspaceSolutionBanner {...props} />
      )}
    </div>
  );
}

function CodeEditor({
  filePath,
  isMainFile,
  onMount,
}: Readonly<
  BaseProps & {
    isMainFile: boolean;
  }
>) {
  const workspaceDispatch = useJavaScriptCodingWorkspaceDispatch();
  const files = useJavaScriptCodingWorkspaceSelector(
    (state) => state.sandpack.current.files,
  );

  return (
    <MonacoCodeEditor
      filePath={filePath}
      value={files[filePath].code}
      onChange={(val) => {
        workspaceDispatch(updateFile({ content: val ?? '', path: filePath }));
        if (isMainFile) {
          workspaceDispatch(
            onUpdateSolutionCode({
              ...files,
              [filePath]: { code: val ?? '' },
            }),
          );
        }
      }}
      onMount={onMount}
    />
  );
}

function ViewSubmissionTestsButton() {
  const intl = useIntl();
  const { tilesDispatch } = useJavaScriptCodingWorkspaceTilesContext();
  const { workspace } = useJavaScriptCodingWorkspaceSelector(
    (state) => state.workspace,
  ).question;

  return (
    <Button
      className={clsx(
        'z-sticky absolute right-10 top-1.5',
        'opacity-0 transition-opacity duration-200 group-hover:opacity-100',
      )}
      label={intl.formatMessage({
        defaultMessage: 'View submission tests',
        description: 'Coding workspace view submission tests button label',
        id: 'j8tACI',
      })}
      size="xs"
      variant="secondary"
      onClick={() => {
        tilesDispatch({
          payload: {
            fallbackNeighborTabId: codingWorkspaceTabFileId(workspace.main),
            openBesideTabId: codingWorkspaceTabFileId(workspace.run),
            tabId: 'submission_test_cases',
          },
          type: 'tab-set-active-otherwise-open',
        });
      }}
    />
  );
}
