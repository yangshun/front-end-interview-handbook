import Alert from '~/components/ui/Alert';
import CodingWorkspaceExplorer from '~/components/workspace/common/explorer/CodingWorkspaceExplorer';

import { useCodingWorkspaceContext } from '../common/CodingWorkspaceContext';

export default function UserInterfaceCodingWorkspaceExplorer() {
  const { openFile } = useCodingWorkspaceContext();

  return (
    <div className="flex w-full p-2">
      <CodingWorkspaceExplorer
        bottomAddOn={
          <Alert bodySize="body3" variant="warning">
            For now, files cannot be created or renamed. It's acceptable to
            write multiple components within a single file during interviews.
          </Alert>
        }
        onOpenFile={openFile}
      />
    </div>
  );
}
