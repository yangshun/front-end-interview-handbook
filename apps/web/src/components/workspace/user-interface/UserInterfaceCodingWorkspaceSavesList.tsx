import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';

import Timestamp from '~/components/common/datetime/Timestamp';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionFrameworkIcon from '~/components/interviews/questions/metadata/QuestionFrameworkIcon';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import EmptyState from '~/components/ui/EmptyState';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBorderEmphasizeColor,
  themeDivideEmphasizeColor,
} from '~/components/ui/theme';

import { staticLowerCase } from '~/utils/typescript/stringTransform';

import { useUserInterfaceCodingWorkspaceSavesContext } from './UserInterfaceCodingWorkspaceSaveContext';
import UserInterfaceCodingWorkspaceSavesListItemActions from './UserInterfaceCodingWorkspaceSavesListItemActions';

type Props = Readonly<{
  metadata: QuestionMetadata;
}>;

export default function UserInterfaceCodingWorkspaceSavesList({
  metadata,
}: Props) {
  const { userProfile } = useUserProfile();

  if (userProfile == null) {
    return (
      <div className="w-full">
        <div className="flex h-full flex-col p-4">
          <div className="flex grow items-center justify-center">
            <EmptyState
              title="You must be signed in to view your saved versions"
              variant="empty"
            />
          </div>
        </div>
      </div>
    );
  }

  return <UserInterfaceCodingWorkspaceSavesListImpl metadata={metadata} />;
}

function UserInterfaceCodingWorkspaceSavesListImpl({ metadata }: Props) {
  const { data: saves } = trpc.questionSave.userInterfaceGetAll.useQuery({
    slug: metadata.slug,
  });

  const { save } = useUserInterfaceCodingWorkspaceSavesContext();

  return (
    <div className="w-full">
      {saves == null || saves?.length === 0 ? (
        <div className="flex h-full flex-col p-4">
          <div className="flex grow items-center justify-center">
            <EmptyState title="No saved versions" variant="empty" />
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div
            className={clsx(
              'flex flex-col rounded-md',
              ['border', themeBorderEmphasizeColor],
              ['divide-y', themeDivideEmphasizeColor],
              'overflow-hidden',
            )}>
            {saves?.map((savedItem) => (
              <div
                key={savedItem.id}
                className={clsx(
                  'relative isolate',
                  'flex items-center gap-x-2',
                  themeBackgroundElementEmphasizedStateColor_Hover,
                  'p-2',
                )}>
                <div className="p-2">
                  <QuestionFrameworkIcon
                    framework={staticLowerCase(savedItem.framework)}
                  />
                </div>
                <div className="grow">
                  <div className="flex items-center gap-x-2 gap-y-1">
                    <Anchor
                      // TODO(workspace): Add study list parameter if exists.
                      href={`/questions/user-interface/${metadata.slug}/v/${savedItem.id}`}
                      variant="unstyled">
                      <Text
                        className="line-clamp-2"
                        size="body2"
                        weight="medium">
                        {savedItem.name}{' '}
                      </Text>
                      <span className="absolute inset-0" />
                    </Anchor>
                    {save?.id === savedItem.id && (
                      <Badge label="Current" size="sm" variant="info" />
                    )}
                  </div>
                  <Text
                    className="whitespace-nowrap"
                    color="secondary"
                    size="body3">
                    <Timestamp date={savedItem.updatedAt} />
                  </Text>
                </div>
                <div className="relative">
                  <UserInterfaceCodingWorkspaceSavesListItemActions
                    saveId={savedItem.id}
                    saveName={savedItem.name}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
