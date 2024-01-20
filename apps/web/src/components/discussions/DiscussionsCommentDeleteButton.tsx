import { RiDeleteBinLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Button from '~/components/ui/Button';

import ConfirmationDialog from '../common/ConfirmationDialog';

type Props = Readonly<{
  commentId: string;
  dialogShown: boolean;
  onClick: () => void;
  onDismiss: () => void;
}>;

export default function DiscussionsCommentDeleteButton({
  commentId,
  dialogShown,
  onClick,
  onDismiss,
}: Props) {
  const intl = useIntl();
  const deleteCommentMutation = trpc.comments.delete.useMutation();

  return (
    <div>
      <Button
        addonPosition="start"
        icon={RiDeleteBinLine}
        label={intl.formatMessage({
          defaultMessage: 'Delete',
          description: 'Delete button label',
          id: 'WodcPq',
        })}
        variant="tertiary"
        onClick={onClick}
      />
      <ConfirmationDialog
        confirmButtonLabel={intl.formatMessage({
          defaultMessage: 'Delete',
          description: 'Delete button label',
          id: 'WodcPq',
        })}
        confirmButtonVariant="danger"
        isConfirming={deleteCommentMutation.isLoading}
        isShown={dialogShown}
        title={intl.formatMessage({
          defaultMessage: 'Delete comment?',
          description: 'Delete comment confirmation dialog title',
          id: 'hm0ODb',
        })}
        onCancel={onDismiss}
        onConfirm={() => {
          deleteCommentMutation.mutate(
            {
              commentId,
            },
            {
              onSuccess: () => {
                onDismiss();
              },
            },
          );
        }}>
        <FormattedMessage
          defaultMessage="Are you sure you want to delete this comment?"
          description="Confirmation text for deleting a comment"
          id="XjwGKd"
        />
      </ConfirmationDialog>
    </div>
  );
}
