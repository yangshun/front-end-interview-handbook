import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import type { GuideCardMetadataWithCompletedStatus } from '~/components/guides/types';
import { useIntl } from '~/components/intl';

import {
  useMutationQuestionProgressAdd,
  useMutationQuestionProgressDelete,
} from '~/db/QuestionsProgressClient';

import QuestionsUnifiedListWithFilters from './QuestionsUnifiedListWithFilters';
import useQuestionsWithCompletionStatus from '../filters/hooks/useQuestionsWithCompletionStatus';
import type { QuestionMetadata } from '../../common/QuestionsTypes';

type Props = Omit<
  React.ComponentProps<typeof QuestionsUnifiedListWithFilters>,
  'onMarkAsCompleted' | 'onMarkAsNotCompleted' | 'questions'
> &
  Readonly<{
    guides?: {
      description: string;
      items: ReadonlyArray<GuideCardMetadataWithCompletedStatus>;
      title: string;
    };
    questions: ReadonlyArray<QuestionMetadata>;
  }>;

export default function QuestionsUnifiedListWithFiltersAndProgress({
  questions,
  listKey,
  ...props
}: Props) {
  const trpcUtils = trpc.useUtils();
  const intl = useIntl();
  const { showToast } = useToast();

  const questionsWithCompletionStatus = useQuestionsWithCompletionStatus(
    questions,
    listKey,
  );
  const markCompleteMutation = useMutationQuestionProgressAdd();
  const markNotCompleteMutation = useMutationQuestionProgressDelete();

  function markQuestionAsCompleted(question: QuestionMetadata) {
    if (markCompleteMutation.isLoading) {
      return;
    }

    markCompleteMutation.mutate(
      {
        format: question.format,
        listKey,
        slug: question.slug,
      },
      {
        onSuccess: () => {
          trpcUtils.questionLists.invalidate();
          showToast({
            title: intl.formatMessage(
              {
                defaultMessage: 'Marked "{questionTitle}" as complete',
                description:
                  'Success message for marking a question as complete',
                id: 'awMxNG',
              },
              {
                questionTitle: question.title,
              },
            ),
            variant: 'success',
          });
        },
      },
    );
  }

  function markQuestionAsNotCompleted(question: QuestionMetadata) {
    if (markNotCompleteMutation.isLoading) {
      return;
    }

    markNotCompleteMutation.mutate(
      {
        format: question.format,
        listKey,
        slug: question.slug,
      },
      {
        onSuccess: () => {
          trpcUtils.questionLists.invalidate();
          showToast({
            title: intl.formatMessage(
              {
                defaultMessage: 'Marked "{questionTitle}" as not completed',
                description:
                  'Success message for marking a question as not completed',
                id: 'Hav9UT',
              },
              {
                questionTitle: question.title,
              },
            ),
            variant: 'info',
          });
        },
      },
    );
  }

  return (
    <QuestionsUnifiedListWithFilters
      listKey={listKey}
      questions={questionsWithCompletionStatus}
      onMarkAsCompleted={markQuestionAsCompleted}
      onMarkAsNotCompleted={markQuestionAsNotCompleted}
      {...props}
    />
  );
}
