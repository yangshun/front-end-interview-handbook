import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';

export function useStartLearningSessionMutation() {
  const trpcUtils = trpc.useUtils();
  const intl = useIntl();
  const { showToast } = useToast();

  return trpc.questionLists.startSession.useMutation({
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
