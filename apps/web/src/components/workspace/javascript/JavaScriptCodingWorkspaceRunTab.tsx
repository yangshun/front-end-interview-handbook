import { useEffect } from 'react';

import JavaScriptTestCodesEmitter from '~/components/workspace/javascript/JavaScriptTestCodesEmitter';

import { useCodingWorkspaceContext } from '../common/CodingWorkspaceContext';
import { codingWorkspaceTabFileId } from '../common/tabs/codingWorkspaceTabId';
import TestsSection from '../common/tests/TestsSection';
import useJavaScriptCodingWorkspaceTilesContext from './useJavaScriptCodingWorkspaceTilesContext';

export default function JavaScriptCodingWorkspaceTestsRunTab({
  specPath,
}: Readonly<{
  specPath: string;
}>) {
  const { dispatch } = useJavaScriptCodingWorkspaceTilesContext();
  const { status } = useCodingWorkspaceContext();

  useEffect(() => {
    if (status === 'running_tests') {
      dispatch({
        payload: {
          tabId: 'run_tests',
        },
        type: 'tab-set-active',
      });
    }
  }, [dispatch, status]);

  return (
    <TestsSection
      specMode="run"
      specPath={specPath}
      onFocusConsole={() => {
        dispatch({
          payload: {
            tabId: 'console',
          },
          type: 'tab-set-active',
        });
      }}
      onShowTestCase={(_, index, specParts) => {
        dispatch({
          payload: {
            tabId: codingWorkspaceTabFileId(specPath),
          },
          type: 'tab-set-active',
        });
        JavaScriptTestCodesEmitter.emit('focus_on_test', {
          filePath: specPath,
          index,
          specParts,
        });
      }}
      onShowTestsCases={() => {
        dispatch({
          payload: {
            tabId: codingWorkspaceTabFileId(specPath),
          },
          type: 'tab-set-active',
        });
      }}
    />
  );
}
