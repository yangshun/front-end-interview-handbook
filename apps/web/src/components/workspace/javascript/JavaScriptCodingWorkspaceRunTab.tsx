import { useEffect } from 'react';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import {
  useJavaScriptCodingWorkspaceDispatch,
  useJavaScriptCodingWorkspaceSelector,
} from '~/components/workspace/javascript/store/hooks';
import { focusOnTest } from '~/components/workspace/javascript/store/javascript-workspace-slice';

import { codingWorkspaceTabFileId } from '../common/tabs/codingWorkspaceTabId';
import TestsSection from '../common/tests/TestsSection';
import useJavaScriptCodingWorkspaceTilesContext from './useJavaScriptCodingWorkspaceTilesContext';

export default function JavaScriptCodingWorkspaceTestsRunTab({
  metadata,
  specPath,
}: Readonly<{
  metadata: QuestionMetadata;
  specPath: string;
}>) {
  const { tilesDispatch } = useJavaScriptCodingWorkspaceTilesContext();
  const dispatch = useJavaScriptCodingWorkspaceDispatch();
  const executionStatus = useJavaScriptCodingWorkspaceSelector(
    (state) => state.execution.status,
  );

  useEffect(() => {
    if (executionStatus === 'running_tests') {
      tilesDispatch({
        payload: {
          tabId: 'run_tests',
        },
        type: 'tab-set-active',
      });
    }
  }, [tilesDispatch, executionStatus]);

  return (
    <TestsSection
      metadata={metadata}
      specMode="run"
      specPath={specPath}
      onFocusConsole={() => {
        tilesDispatch({
          payload: {
            tabId: 'console',
          },
          type: 'tab-set-active',
        });
      }}
      onShowTestCase={(_, index, specParts) => {
        tilesDispatch({
          payload: {
            tabId: codingWorkspaceTabFileId(specPath),
          },
          type: 'tab-set-active',
        });
        dispatch(
          focusOnTest({
            filePath: specPath,
            index,
            specParts,
          }),
        );
      }}
      onShowTestsCases={() => {
        tilesDispatch({
          payload: {
            tabId: codingWorkspaceTabFileId(specPath),
          },
          type: 'tab-set-active',
        });
      }}
    />
  );
}
