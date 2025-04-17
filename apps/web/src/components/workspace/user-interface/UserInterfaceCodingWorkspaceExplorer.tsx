'use client';

import { useIntl } from '~/components/intl';
import CodingWorkspaceExplorer from '~/components/workspace/common/explorer/CodingWorkspaceExplorer';

import { useCodingWorkspaceContext } from '../common/CodingWorkspaceContext';

export default function UserInterfaceCodingWorkspaceExplorer() {
  const intl = useIntl();
  const { openFile } = useCodingWorkspaceContext();

  return (
    <div className="flex w-full p-2">
      <CodingWorkspaceExplorer readOnly={false} onOpenFile={openFile} />
    </div>
  );
}
