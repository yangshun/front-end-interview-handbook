import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';

import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import QuestionFrameworkIcon from '~/components/questions/metadata/QuestionFrameworkIcon';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import EmptyState from '~/components/ui/EmptyState';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasizedHover,
  themeDivideColor,
  themeLineColor,
} from '~/components/ui/theme';

import { staticLowerCase } from '~/utils/typescript/stringTransform';

import { useUserInterfaceCodingWorkspaceSavesContext } from './UserInterfaceCodingWorkspaceSaveContext';
import UserInterfaceCodingWorkspaceSavesListItemActions from './UserInterfaceCodingWorkspaceSavesListItemActions';

type Props = Readonly<{
  metadata: QuestionMetadata;
}>;

const dateFormatter = new Intl.DateTimeFormat('en-SG', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export default function UserInterfaceCodingWorkspaceSavesList({
  metadata,
}: Props) {
  const { data: saves } = trpc.questionSave.userInterfaceGetAll.useQuery({
    slug: metadata.slug,
  });

  const { save } = useUserInterfaceCodingWorkspaceSavesContext();

  return (
    <div className="w-full">
      {saves == null || saves?.length === 0 ? (
        <div className="flex h-full flex-col p-4">
          <div className="flex grow items-center justify-center">
            <EmptyState title="No versions" variant="empty" />
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div
            className={clsx(
              'rounded-md',
              ['border', themeLineColor],
              ['divide-y', themeDivideColor],
            )}>
            <table className="w-full">
              <tbody className={clsx(['divide-y', themeDivideColor])}>
                {saves?.map((savedItem) => (
                  <tr
                    key={savedItem.id}
                    className={clsx(
                      'relative',
                      themeBackgroundEmphasizedHover,
                    )}>
                    <td className="w-5 py-2 pl-3">
                      <QuestionFrameworkIcon
                        framework={staticLowerCase(savedItem.framework)}
                      />
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-x-2 gap-y-1">
                        <Anchor
                          // TODO(submission): factor in list parameter
                          href={`/questions/user-interface/${metadata.slug}/s/${savedItem.id}`}
                          variant="unstyled">
                          <Text
                            className="whitespace-nowrap"
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
                        {dateFormatter.format(new Date(savedItem.updatedAt))}
                      </Text>
                    </td>
                    <td className="px-3 py-2">
                      <UserInterfaceCodingWorkspaceSavesListItemActions
                        save={{
                          ...savedItem,
                          createdAt: new Date(savedItem.createdAt),
                          updatedAt: new Date(savedItem.updatedAt),
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
