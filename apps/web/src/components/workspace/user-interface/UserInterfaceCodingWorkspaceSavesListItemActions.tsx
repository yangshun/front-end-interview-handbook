import { useState } from 'react';
import {
  RiArrowRightUpLine,
  RiDeleteBinLine,
  RiEditLine,
  RiMoreLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import { useToast } from '~/components/global/toasts/ToastsProvider';
import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import DropdownMenu from '~/components/ui/DropdownMenu';
import TextInput from '~/components/ui/TextInput';

import type { QuestionUserInterfaceSave } from '@prisma/client';

type Props = Readonly<{
  metadata: QuestionMetadata;
  save: QuestionUserInterfaceSave;
}>;

export default function UserInterfaceCodingWorkspaceSavesListItemActions({
  metadata,
  save,
}: Props) {
  const intl = useIntl();
  const { showToast } = useToast();

  const userInterfaceSaveDeleteMutation =
    trpc.questionSave.userInterfaceDelete.useMutation();
  const [isDeleting, setIsDeleting] = useState(false);

  const userInterfaceSaveUpdateMutation =
    trpc.questionSave.userInterfaceUpdate.useMutation();
  const [isEditing, setIsEditing] = useState(false);
  // Note that this value will be stale if the name is updated in the background.
  const [newSaveName, setNewSaveName] = useState(save.name);

  function saveEdits() {
    userInterfaceSaveUpdateMutation.mutate(
      {
        name: newSaveName,
        saveId: save.id,
      },
      {
        onSuccess: (data) => {
          setIsEditing(false);
          showToast({
            title: `"${save.name}" renamed to "${data?.name}"`,
            variant: 'info',
          });
        },
      },
    );
  }

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
          onClick={() => {
            setIsEditing(true);
          }}
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
                  title: `Deleted "${data?.name}"`,
                  variant: 'info',
                });
              },
            },
          );
        }}>
        This is an irreversible action. Are you sure?
      </ConfirmationDialog>

      <Dialog
        isShown={isEditing}
        primaryButton={
          <Button
            isDisabled={userInterfaceSaveUpdateMutation.isLoading}
            isLoading={userInterfaceSaveUpdateMutation.isLoading}
            label="OK"
            size="md"
            variant="primary"
            onClick={() => saveEdits()}
          />
        }
        secondaryButton={
          <Button
            isDisabled={userInterfaceSaveUpdateMutation.isLoading}
            label={intl.formatMessage({
              defaultMessage: 'Cancel',
              description: 'Cancel button label',
              id: '0GT0SI',
            })}
            size="md"
            variant="secondary"
            onClick={() => setIsEditing(false)}
          />
        }
        title="Rename"
        onClose={() => setIsEditing(false)}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            saveEdits();
          }}>
          <TextInput
            autoFocus={true}
            isDisabled={userInterfaceSaveUpdateMutation.isLoading}
            isLabelHidden={true}
            label="Name"
            value={newSaveName}
            onChange={setNewSaveName}
          />
        </form>
      </Dialog>
    </div>
  );
}
