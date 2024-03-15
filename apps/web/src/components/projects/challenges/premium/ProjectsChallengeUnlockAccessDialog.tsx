import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import { useToast } from '~/components/global/toasts/useToast';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  credits: number;
  isShown: boolean;
  onClose: () => void;
  slug: string;
}>;

export default function ProjectsChallengeUnlockAccessDialog({
  credits,
  isShown,
  slug,
  onClose,
}: Props) {
  const intl = useIntl();
  const { showToast } = useToast();
  const unlockAccessMutation =
    trpc.projects.challenges.unlockAccess.useMutation();

  return (
    <ConfirmationDialog
      isConfirming={unlockAccessMutation.isLoading}
      isShown={isShown}
      title={intl.formatMessage({
        defaultMessage: 'Unlock premium challenge',
        description: 'Label to unlock a premium project',
        id: 'cdmGUV',
      })}
      onCancel={() => {
        onClose();
      }}
      onConfirm={async () => {
        await unlockAccessMutation.mutateAsync({
          slug,
        });
        onClose();
        showToast({
          title: intl.formatMessage({
            defaultMessage: 'Challenge unlocked successfully',
            description: 'Label to unlock a premium project',
            id: 'SG08/K',
          }),
          variant: 'success',
        });
        // Do a hard refresh to show updated state as most of
        // the content originates from the server and does isn't
        // present on the client.
        window.location.reload();
      }}>
      <FormattedMessage
        defaultMessage="You will have <bold>{count}</bold> credit(s) remaining after unlocking this challenge, proceed to unlock challenge?"
        description="Confirmation text for unlocking a premium challenge"
        id="Rv4HTW"
        values={{
          bold: (chunks) => <Text weight="medium">{chunks}</Text>,
          count: credits - 1,
        }}
      />
    </ConfirmationDialog>
  );
}
