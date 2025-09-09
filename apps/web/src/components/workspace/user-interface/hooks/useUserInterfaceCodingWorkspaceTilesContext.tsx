import { useTilesContext } from '~/react-tiling/state/useTilesContext';

import type { UserInterfaceCodingWorkspaceTabsType } from '../UserInterfaceCodingWorkspaceTypes';

export default function useUserInterfaceCodingWorkspaceTilesContext() {
  return useTilesContext<UserInterfaceCodingWorkspaceTabsType>();
}
