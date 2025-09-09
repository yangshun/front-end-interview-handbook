import { useTilesContext } from '~/react-tiling/state/useTilesContext';

import type { JavaScriptCodingWorkspaceTabsType } from '../JavaScriptCodingWorkspaceTypes';

export default function useJavaScriptCodingWorkspaceTilesContext() {
  return useTilesContext<JavaScriptCodingWorkspaceTabsType>();
}
