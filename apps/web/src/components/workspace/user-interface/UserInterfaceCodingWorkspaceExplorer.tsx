import CodingWorkspaceExplorer from '~/components/workspace/common/explorer/CodingWorkspaceExplorer';

import { useCodingWorkspaceContext } from '../CodingWorkspaceContext';

export default function UserInterfaceCodingWorkspaceExplorer() {
  const { openFile } = useCodingWorkspaceContext();

  return (
    <div className="w-full p-2">
      <CodingWorkspaceExplorer onOpenFile={openFile} />
    </div>
  );
}
