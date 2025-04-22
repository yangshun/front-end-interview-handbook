'use client';

import CodingWorkspaceExplorer from '~/components/workspace/common/explorer/CodingWorkspaceExplorer';

import { useCodingWorkspaceContext } from '../common/CodingWorkspaceContext';

export default function UserInterfaceCodingWorkspaceExplorer() {
  const { openFile } = useCodingWorkspaceContext();

  return (
    <div className="flex w-full p-2">
      <CodingWorkspaceExplorer readOnly={false} onOpenFile={openFile} />
    </div>
  );
}
