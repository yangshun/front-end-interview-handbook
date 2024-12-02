import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import { useIntl } from '~/components/intl';

export function useStartLearningSessionMutation(studyListTitle: string) {
  const trpcUtils = trpc.useUtils();
  const intl = useIntl();
  const { showToast } = useToast();

  return trpc.questionSessions.start.useMutation({
    onSuccess() {
      trpcUtils.questionProgress.invalidate();
      trpcUtils.questionSessions.invalidate();

      showToast({
        title: intl.formatMessage(
          {
            defaultMessage:
              "We've started tracking your progress for {studyListName}",
            description: 'Success message for starting a study plan',
            id: 'mVFZ09',
          },
          {
            studyListName: studyListTitle,
          },
        ),
        variant: 'success',
      });
    },
  });
}
