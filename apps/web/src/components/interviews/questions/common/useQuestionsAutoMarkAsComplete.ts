import useQueryParamAction from '~/hooks/useQueryParamAction';

import { useToast } from '~/components/global/toasts/useToast';
import { useIntl } from '~/components/intl';

import { useMutationQuestionProgressAdd } from '~/db/QuestionsProgressClient';

import type { QuestionMetadata } from './QuestionsTypes';

export const MARK_AS_COMPLETE_ACTION_NAME = 'mark-complete';

/**
 * Mark as complete if there's the specific
 * query param in the URL when the page loads.
 */
export default function useQuestionsAutoMarkAsComplete(
  metadata: QuestionMetadata,
  studyListKey?: string,
) {
  const intl = useIntl();
  const markCompleteMutation = useMutationQuestionProgressAdd();
  const { showToast } = useToast();

  useQueryParamAction(MARK_AS_COMPLETE_ACTION_NAME, () => {
    markCompleteMutation.mutate(
      {
        question: {
          format: metadata.format,
          slug: metadata.slug,
        },
        studyListKey,
      },
      {
        onError: (error) => {
          showToast({
            description: error.message,
            title: intl.formatMessage({
              defaultMessage: 'Failed to mark question as complete',
              description:
                'Error message shown when a question has failed to mark as complete',
              id: 'mFyOK6',
            }),
            variant: 'danger',
          });
        },
        onSuccess: () => {
          showToast({
            title: intl.formatMessage({
              defaultMessage: 'Marked question as complete',
              description:
                'Success message shown when a question was marked as complete',
              id: '3fkhgw',
            }),
            variant: 'success',
          });
        },
      },
    );
  });
}
