'use client';

import clsx from 'clsx';
import type { ComponentProps } from 'react';

import { trpc } from '~/hooks/trpc';

import { useIntl } from '~/components/intl';
import ScrollArea from '~/components/ui/ScrollArea';
import Spinner from '~/components/ui/Spinner';
import { themeBackgroundCardWhiteOnLightColor } from '~/components/ui/theme';
import UserInterfaceCodingWorkspaceSaveMetadata from '~/components/workspace/user-interface/save-code/UserInterfaceCodingWorkspaceSaveMetadata';
import UserInterfaceCodingWorkspaceSavesListItemActions from '~/components/workspace/user-interface/save-code/UserInterfaceCodingWorkspaceSavesListItemActions';
import UserInterfaceCodingWorkspaceSolutionFilesPreview from '~/components/workspace/user-interface/solution/UserInterfaceCodingWorkspaceSolutionFilesPreview';
import { useUserInterfaceCodingWorkspaceSelector } from '~/components/workspace/user-interface/store/hooks';

type Props = Readonly<{
  onOpenSolutionInWorkspace: ComponentProps<
    typeof UserInterfaceCodingWorkspaceSolutionFilesPreview
  >['onOpenSolutionInWorkspace'];
  saveId: string;
}>;

export default function UserInterfaceCodingWorkspaceSaveCodeTab({
  onOpenSolutionInWorkspace,
  saveId,
}: Props) {
  const intl = useIntl();
  const { data: save, isLoading } = trpc.questionSave.userInterfaceGet.useQuery(
    {
      saveId,
    },
  );
  const currentOpenedSolution = useUserInterfaceCodingWorkspaceSelector(
    (state) => state.solution.currentOpenedSolution,
  );

  return (
    <div className="w-full">
      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <Spinner
            label={intl.formatMessage({
              defaultMessage: 'Loading saved code',
              description: 'Coding workspace saved code loading',
              id: 'vmDW39',
            })}
            size="md"
          />
        </div>
      )}
      {save && (
        <ScrollArea viewportClass="[&>div]:!block">
          <div
            className={clsx(
              'flex items-center gap-4',
              'px-4 py-3',
              themeBackgroundCardWhiteOnLightColor,
            )}>
            <UserInterfaceCodingWorkspaceSaveMetadata
              createdAt={save.updatedAt}
              framework={save.framework}
              isActive={currentOpenedSolution?.attemptId === save.id}
              name={save.name}
            />
            <UserInterfaceCodingWorkspaceSavesListItemActions
              saveId={save.id}
              saveName={save.name}
            />
          </div>
          <div className="flex flex-col gap-y-6 px-4 py-1.5">
            <UserInterfaceCodingWorkspaceSolutionFilesPreview
              files={JSON.parse(save.files)}
              openInWorkspaceMetadata={{
                id: save.id,
                name: save.name,
              }}
              showOpenInWorkspace={true}
              type="attempt"
              onOpenSolutionInWorkspace={onOpenSolutionInWorkspace}
            />
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
