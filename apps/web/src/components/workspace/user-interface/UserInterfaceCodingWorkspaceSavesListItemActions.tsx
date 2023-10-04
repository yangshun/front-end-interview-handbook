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
import Button from '~/components/ui/Button';
import DropdownMenu from '~/components/ui/DropdownMenu';

import type { QuestionUserInterfaceSave } from '@prisma/client';

type Props = Readonly<{
  metadata: QuestionMetadata;
  save: QuestionUserInterfaceSave;
}>;

export default function UserInterfaceCodingWorkspaceSavesListItemActions({
  metadata,
  save,
}: Props) {
  const { showToast } = useToast();

  const userInterfaceSaveDeleteMutation =
    trpc.questionSave.userInterfaceDelete.useMutation();
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className="flex justify-end gap-x-2">
      <Button
        // TODO(submission): add list
        href={`/questions/user-interface/${metadata.slug}/s/${save.id}`}
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
            setIsDeleting(true);
          }}
        />
      </DropdownMenu>
      <ConfirmationDialog
        confirmButtonVariant="danger"
        isConfirming={userInterfaceSaveDeleteMutation.isLoading}
        isShown={isDeleting}
        title={`Delete "${save.name}"`}
        onCancel={() => {
          setIsDeleting(false);
        }}
        onConfirm={() => {
          userInterfaceSaveDeleteMutation.mutate(
            {
              saveId: save.id,
            },
            {
              onSuccess: (data) => {
                setIsDeleting(false);
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
