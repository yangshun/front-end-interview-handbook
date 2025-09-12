import { RiDeleteBinLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import { themeTextSecondaryColor } from '~/components/ui/theme';

import type { CodingWorkspaceDiscussionsCommentItem } from './types';

type Props = Readonly<{
  comment: CodingWorkspaceDiscussionsCommentItem;
  dialogShown: boolean;
  onClick: () => void;
  onDismiss: () => void;
}>;

export default function CodingWorkspaceDiscussionsCommentDeleteButton({
  comment,
  dialogShown,
  onClick,
  onDismiss,
}: Props) {
  const intl = useIntl();
  const trpcUtils = trpc.useUtils();
  const deleteCommentMutation = trpc.questionComments.delete.useMutation({
    onSuccess: () => {
      trpcUtils.questionComments.list.invalidate({
        domain: comment.domain,
        entityId: comment.entityId,
      });
    },
  });

  return (
    <ConfirmationDialog
      confirmButtonLabel={intl.formatMessage({
        defaultMessage: 'Delete',
        description: 'Delete button label',
        id: 'WodcPq',
      })}
      confirmButtonVariant="danger"
      isDisabled={deleteCommentMutation.isLoading}
      isLoading={deleteCommentMutation.isLoading}
      isShown={dialogShown}
      title={intl.formatMessage({
        defaultMessage: 'Delete comment?',
        description: 'Delete comment confirmation dialog title',
        id: 'hm0ODb',
      })}
      trigger={
        <Button
          addonPosition="start"
          className={themeTextSecondaryColor}
          icon={RiDeleteBinLine}
          label={intl.formatMessage({
            defaultMessage: 'Delete',
            description: 'Delete button label',
            id: 'WodcPq',
          })}
          size="xs"
          variant="tertiary"
          onClick={onClick}
        />
      }
      onCancel={onDismiss}
      onConfirm={() => {
        deleteCommentMutation.mutate(
          {
            commentId: comment.id,
          },
          {
            onSuccess: () => {
              onDismiss();
            },
          },
        );
      }}>
      <FormattedMessage
        defaultMessage="Are you sure want to delete your comment? There is no undo for this action."
        description="Confirmation text for deleting a comment"
        id="GkLfUb"
      />
    </ConfirmationDialog>
  );
}
