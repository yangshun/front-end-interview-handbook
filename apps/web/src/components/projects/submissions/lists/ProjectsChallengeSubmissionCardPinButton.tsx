import clsx from 'clsx';
import { RiPushpinLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/ToastsProvider';
import { themeTextBrandColor } from '~/components/ui/theme';

export default function ProjectsChallengeSubmissionCardPinButton({
  submissionId,
}: {
  submissionId: string;
}) {
  const { showToast } = useToast();
  const intl = useIntl();
  const unpin = trpc.projects.submissions.unpin.useMutation({
    onSuccess: () => {
      showToast({
        title: intl.formatMessage({
          defaultMessage: 'Submission successfully unpin!',
          description: 'Submission unpin toaster',
          id: '5wzYep',
        }),
        variant: 'success',
      });
    },
  });

  return (
    <button
      disabled={unpin.isLoading}
      type="button"
      onClick={() => unpin.mutate({ submissionId })}>
      <RiPushpinLine
        className={clsx(
          themeTextBrandColor,
          'h-6 w-6 shrink-0 cursor-pointer hover:dark:text-danger hover:text-danger',
        )}
      />
    </button>
  );
}
