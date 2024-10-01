import { RiDeleteBinFill } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import { themeTextSubtleColor } from '~/components/ui/theme';

import ConfirmationDialog from '../../common/ConfirmationDialog';

type Props = Readonly<{
  commentId: string;
  dialogShown: boolean;
  onClick: () => void;
  onDismiss: () => void;
}>;

export default function ProjectsDiscussionsCommentDeleteButton({
  commentId,
  dialogShown,
  onClick,
  onDismiss,
}: Props) {
  const intl = useIntl();
  const trpcUtils = trpc.useUtils();
  const deleteCommentMutation = trpc.projects.comments.delete.useMutation({
    onSuccess: () => {
      trpcUtils.projects.comments.invalidate();
    },
  });

  return (
    <div>
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
            icon={RiDeleteBinFill}
            iconClassName={themeTextSubtleColor}
            label={intl.formatMessage({
              defaultMessage: 'Delete',
              description: 'Delete button label',
              id: 'WodcPq',
            })}
            variant="tertiary"
            onClick={onClick}
          />
        }
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
