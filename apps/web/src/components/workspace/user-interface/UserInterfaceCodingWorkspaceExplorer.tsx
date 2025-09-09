'use client';

import { useIntl } from '~/components/intl';
import Alert from '~/components/ui/Alert';
import CodingWorkspaceExplorer from '~/components/workspace/common/explorer/CodingWorkspaceExplorer';

import { useUserInterfaceCodingWorkspaceSelector } from './store/hooks';

type Props = Readonly<{
  openFile: (filePath: string, fromFilePath?: string) => void;
}>;

export default function UserInterfaceCodingWorkspaceExplorer({
  openFile,
}: Props) {
  const intl = useIntl();
  const activeFile = useUserInterfaceCodingWorkspaceSelector(
    (state) => state.sandpack.current.activeFile,
  );
  const files = useUserInterfaceCodingWorkspaceSelector(
    (state) => state.sandpack.current.files,
  );

  return (
    <div className="flex w-full p-2 dark:bg-[#1B1C22]">
      <CodingWorkspaceExplorer
        activeFile={activeFile}
        bottomAddOn={
          <Alert bodySize="body3" variant="warning">
            {intl.formatMessage({
              defaultMessage:
                "For now, files cannot be created or renamed. It's acceptable to write multiple components within a single file during interviews.",
              description:
                'File creation or removal warning message for coding workspace',
              id: 'fxQRHJ',
            })}
          </Alert>
        }
        files={files}
        onOpenFile={openFile}
      />
    </div>
  );
}
