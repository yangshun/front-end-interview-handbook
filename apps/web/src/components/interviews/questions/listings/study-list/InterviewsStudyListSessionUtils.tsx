import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import { useIntl } from '~/components/intl';

export function useStartLearningSessionMutation() {
  const trpcUtils = trpc.useUtils();
  const intl = useIntl();
  const { showToast } = useToast();

  return trpc.questionSessions.start.useMutation({
    onSuccess() {
      trpcUtils.questionLists.invalidate();
      showToast({
        title: intl.formatMessage({
          defaultMessage: "We've started tracking your progress",
          description: 'Success message for starting a study plan',
          id: 'HJ+bJn',
        }),
        variant: 'success',
      });
    },
  });
}
