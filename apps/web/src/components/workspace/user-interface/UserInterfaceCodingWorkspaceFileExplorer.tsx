import CodingFileExplorer from '~/components/workspace/common/explorer/CodingFileExplorer';

import { useCodingWorkspaceContext } from '../CodingWorkspaceContext';

export default function UserInterfaceCodingFileExplorer() {
  const { openFile } = useCodingWorkspaceContext();

  return (
    <div className="w-full p-2">
      <CodingFileExplorer onOpenFile={openFile} />
    </div>
  );
}
