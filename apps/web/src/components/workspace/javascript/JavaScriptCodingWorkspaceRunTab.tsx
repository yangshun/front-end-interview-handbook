import { useEffect } from 'react';

import JavaScriptSelfTestCodesEmitter from '~/components/questions/content/JavaScriptSelfTestCodesEmitter';

import useJavaScriptCodingWorkspaceTilesContext from './useJavaScriptCodingWorkspaceTilesContext';
import { useCodingWorkspaceContext } from '../CodingWorkspaceContext';
import { codingWorkspaceTabFileId } from '../common/tabs/codingWorkspaceTabId';
import TestsSection from '../common/tests/TestsSection';

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
      onShowTestCase={(_, index, displayPath) => {
        dispatch({
          payload: {
            tabId: codingWorkspaceTabFileId(specPath),
          },
          type: 'tab-set-active',
        });
        JavaScriptSelfTestCodesEmitter.emit('focus_on_test', {
          index,
          path: displayPath,
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
