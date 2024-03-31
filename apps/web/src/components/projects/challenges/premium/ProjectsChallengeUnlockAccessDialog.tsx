import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import { useToast } from '~/components/global/toasts/useToast';
import Text from '~/components/ui/Text';

import { useI18nRouter } from '~/next-i18nostic/src';

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
  const router = useI18nRouter();
  const { showToast } = useToast();
  const unlockAccessMutation =
    trpc.projects.challenge.accessUnlock.useMutation();

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

        // Re-run server-side premium checks.
        router.refresh();
      }}>
      <FormattedMessage
        defaultMessage="You will have {count, plural, =0 {no premium credits} one {<bold>1</bold> premium credit} other {<bold>#</bold> premium credits}} remaining after unlocking this challenge. Proceed to unlock challenge?"
        description="Confirmation text for unlocking a premium challenge"
        id="CWWOj5"
        values={{
          bold: (chunks) => <Text weight="medium">{chunks}</Text>,
          count: credits - 1,
        }}
      />
    </ConfirmationDialog>
  );
}
