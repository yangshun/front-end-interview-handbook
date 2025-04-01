import { useRef, useState } from 'react';
import { RiDeleteBinLine, RiEditLine, RiMoreLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import { useToast } from '~/components/global/toasts/useToast';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import DropdownMenu from '~/components/ui/DropdownMenu';
import TextInput from '~/components/ui/TextInput';

type Props = Readonly<{
  saveId: string;
  saveName: string;
}>;

export default function UserInterfaceCodingWorkspaceSavesListItemActions({
  saveId,
  saveName,
}: Props) {
  const trpcUtils = trpc.useUtils();
  const intl = useIntl();
  const { showToast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const invalidateUserInterface = () => {
    trpcUtils.questionSave.userInterfaceGet.invalidate();
    trpcUtils.questionSave.userInterfaceGetAll.invalidate();
  };

  const userInterfaceSaveDeleteMutation =
    trpc.questionSave.userInterfaceDelete.useMutation({
      onSuccess: () => {
        invalidateUserInterface();
      },
    });

  const [isDeleting, setIsDeleting] = useState(false);

  const userInterfaceSaveUpdateMutation =
    trpc.questionSave.userInterfaceUpdate.useMutation({
      onSuccess: () => {
        invalidateUserInterface();
      },
    });
  const [isEditing, setIsEditing] = useState(false);
  // Note that this value will be stale if the name is updated in the background.
  const [newSaveName, setNewSaveName] = useState(saveName);

  function saveEdits() {
    userInterfaceSaveUpdateMutation.mutate(
      {
        name: newSaveName,
        saveId,
      },
      {
        onSuccess: (data) => {
          setIsEditing(false);
          showToast({
            title: `Renamed "${saveName}" to "${data?.name}"`,
            variant: 'info',
          });
        },
      },
    );
  }

  return (
    <div className="flex justify-end gap-x-2">
      <DropdownMenu
        align="end"
        icon={RiMoreLine}
        isLabelHidden={true}
        label={intl.formatMessage({
          defaultMessage: 'More actions',
          description: 'Menu for saved code in coding workspace',
          id: 'JtkXij',
        })}
        showChevron={false}
        size="xs"
        variant="tertiary">
        <DropdownMenu.Item
          icon={RiEditLine}
          label={intl.formatMessage({
            defaultMessage: 'Rename',
            description: 'Rename saved code',
            id: 'Jo4hU0',
          })}
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.select();
            }, 17);
          }}
        />
        <DropdownMenu.Item
          color="error"
          icon={RiDeleteBinLine}
          label={intl.formatMessage({
            defaultMessage: 'Delete',
            description: 'Delete saved code',
            id: 'ehiDSr',
          })}
          onClick={() => {
            setIsDeleting(true);
          }}
        />
      </DropdownMenu>
      <ConfirmationDialog
        confirmButtonVariant="danger"
        isDisabled={userInterfaceSaveDeleteMutation.isLoading}
        isLoading={userInterfaceSaveDeleteMutation.isLoading}
        isShown={isDeleting}
        title={intl.formatMessage(
          {
            defaultMessage: 'Delete "{saveName}"',
            description: 'Dialog title for deleting a saved code',
            id: 'J4q56n',
          },
          { saveName },
        )}
        onCancel={() => {
          setIsDeleting(false);
        }}
        onConfirm={() => {
          userInterfaceSaveDeleteMutation.mutate(
            {
              saveId,
            },
            {
              onSuccess: (data) => {
                setIsDeleting(false);
                showToast({
                  title: intl.formatMessage(
                    {
                      defaultMessage: 'Deleted "{saveName}"',
                      description: 'Toast message for deleting a saved code',
                      id: 'cIKXz6',
                    },
                    { saveName: data?.name },
                  ),
                  variant: 'info',
                });
              },
            },
          );
        }}>
        {intl.formatMessage({
          defaultMessage: 'This is an irreversible action. Are you sure?',
          description: 'Dialog content for deleting a saved code',
          id: 'fjMzDi',
        })}
      </ConfirmationDialog>
      <Dialog
        isShown={isEditing}
        primaryButton={
          <Button
            isDisabled={userInterfaceSaveUpdateMutation.isLoading}
            isLoading={userInterfaceSaveUpdateMutation.isLoading}
            label={intl.formatMessage({
              defaultMessage: 'OK',
              description: 'OK button label',
              id: 'sfX/GD',
            })}
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
        title={intl.formatMessage({
          defaultMessage: 'Rename',
          description: 'Dialog title for renaming a saved code',
          id: 'ajZbV3',
        })}
        onClose={() => setIsEditing(false)}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            saveEdits();
          }}>
          <TextInput
            ref={inputRef}
            isDisabled={userInterfaceSaveUpdateMutation.isLoading}
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Name',
              description: 'Name input label for saved code',
              id: '9UIHXW',
            })}
            value={newSaveName}
            onChange={setNewSaveName}
          />
        </form>
      </Dialog>
    </div>
  );
}
