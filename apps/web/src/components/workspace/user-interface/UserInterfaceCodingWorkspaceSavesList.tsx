import clsx from 'clsx';
import { useState } from 'react';
import {
  RiArrowRightUpLine,
  RiDeleteBinLine,
  RiEditLine,
  RiMoreLine,
} from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import { useToast } from '~/components/global/toasts/ToastsProvider';
import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import QuestionFrameworkIcon from '~/components/questions/metadata/QuestionFrameworkIcon';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import DropdownMenu from '~/components/ui/DropdownMenu';
import EmptyState from '~/components/ui/EmptyState';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasizedHover,
  themeDivideColor,
  themeLineColor,
} from '~/components/ui/theme';

import { staticLowerCase } from '~/utils/typescript/stringTransform';

import { useUserInterfaceCodingWorkspaceSavesContext } from './UserInterfaceCodingWorkspaceSaveContext';

type Props = Readonly<{
  metadata: QuestionMetadata;
}>;

const dateFormatter = new Intl.DateTimeFormat('en-SG', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export default function UserInterfaceCodingWorkspaceSubmissionList({
  metadata,
}: Props) {
  const { data: saves } = trpc.questionSave.userInterfaceGetAll.useQuery({
    slug: metadata.slug,
  });
  const { showToast } = useToast();

  const userInterfaceSaveDeleteMutation =
    trpc.questionSave.userInterfaceDelete.useMutation();

  const { save } = useUserInterfaceCodingWorkspaceSavesContext();
  const [saveDeletionData, setSaveDeletionData] = useState<{
    id: string;
    name: string;
  } | null>(null);

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
              'overflow-auto',
              'rounded-md',
              ['border', themeLineColor],
              ['divide-y', themeDivideColor],
            )}>
            <table className="w-full">
              <tbody className={clsx(['divide-y', themeDivideColor])}>
                {saves?.map(({ id, updatedAt, framework, name }) => (
                  <tr key={id} className={clsx(themeBackgroundEmphasizedHover)}>
                    <td className="w-5 py-2 pl-3">
                      <QuestionFrameworkIcon
                        framework={staticLowerCase(framework)}
                      />
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-x-2 gap-y-1">
                        <Text
                          className="whitespace-nowrap"
                          size="body2"
                          weight="medium">
                          {name}
                        </Text>
                        {save?.id === id && (
                          <Badge label="Current" size="sm" variant="info" />
                        )}
                      </div>
                      <Text
                        className="whitespace-nowrap"
                        color="secondary"
                        size="body3">
                        {dateFormatter.format(new Date(updatedAt))}
                      </Text>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex justify-end gap-x-2">
                        <Button
                          href={`/questions/user-interface/${metadata.slug}/s/${id}`}
                          icon={RiArrowRightUpLine}
                          isLabelHidden={true}
                          label="View"
                          size="xs"
                          variant="secondary"
                        />
                        <DropdownMenu
                          align="end"
                          icon={RiMoreLine}
                          isLabelHidden={true}
                          label="More actions"
                          showChevron={false}
                          size="xs"
                          variant="flat">
                          <DropdownMenu.Item
                            icon={RiEditLine}
                            label="Rename"
                            onClick={() => {}}
                          />
                          <DropdownMenu.Item
                            color="error"
                            icon={RiDeleteBinLine}
                            label="Delete"
                            onClick={() => {
                              setSaveDeletionData({
                                id,
                                name,
                              });
                            }}
                          />
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <ConfirmationDialog
        confirmButtonVariant="danger"
        isConfirming={userInterfaceSaveDeleteMutation.isLoading}
        isShown={saveDeletionData != null}
        title={`Delete "${saveDeletionData?.name}"`}
        onCancel={() => {
          setSaveDeletionData(null);
        }}
        onConfirm={() => {
          if (saveDeletionData == null) {
            return;
          }

          userInterfaceSaveDeleteMutation.mutate(
            {
              saveId: saveDeletionData.id,
            },
            {
              onSuccess: (data) => {
                setSaveDeletionData(null);
                showToast({
                  title: `Successfully deleted "${data?.name}"`,
                  variant: 'info',
                });
              },
            },
          );
        }}>
        This is an irreversible action. Are you sure?
      </ConfirmationDialog>
    </div>
  );
}
