import { useEffect } from 'react';

import { useTilesContext } from '~/react-tiling/state/useTilesContext';

import { useCodingWorkspaceContext } from '../CodingWorkspaceContext';
import TestsSection from '../common/tests/TestsSection';

export default function JavaScriptCodingWorkspaceTestsRunPanel({
  specPath,
}: Readonly<{
  specPath: string;
}>) {
  const { dispatch } = useTilesContext();
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
      onShowTestsCases={() => {
        dispatch({
          payload: {
            tabId: specPath,
          },
          type: 'tab-set-active',
        });
      }}
    />
  );
}
