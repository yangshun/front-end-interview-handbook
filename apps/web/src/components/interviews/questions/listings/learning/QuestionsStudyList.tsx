import type { ReactNode } from 'react';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsUnifiedListWithFilters from '~/components/interviews/questions/listings/items/QuestionsUnifiedListWithFilters';
import { FormattedMessage, useIntl } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import {
  useMutationQuestionProgressAdd,
  useMutationQuestionProgressDelete,
} from '~/db/QuestionsProgressClient';
import type { QuestionsCategorizedProgress } from '~/db/QuestionsUtils';

import useQuestionsWithCompletionStatus from '../filters/hooks/useQuestionsWithCompletionStatus';

export default function QuestionsStudyList({
  listKey,
  overallProgress,
  questions,
  sideColumnAddOn,
}: Readonly<{
  listKey: string;
  overallProgress: QuestionsCategorizedProgress;
  questions: ReadonlyArray<QuestionMetadata>;
  sideColumnAddOn?: ReactNode;
}>) {
  const trpcUtils = trpc.useUtils();
  const intl = useIntl();
  const { showToast } = useToast();

  const questionsWithProgress = useQuestionsWithCompletionStatus(
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

  const filterNamespace = `study-list:${listKey}`;
  const sortedQuestions = questionsWithProgress;

  return (
    <div className="flex flex-col gap-y-6">
      <Heading className="sr-only" level="custom">
        <FormattedMessage
          defaultMessage="All Practice Questions"
          description="Header for all practice questions section in study plans"
          id="zo65Ck"
        />
      </Heading>
      <Section>
        <QuestionsUnifiedListWithFilters
          checkIfCompletedQuestionBefore={(question) =>
            overallProgress[question.format].has(question.slug)
          }
          defaultSortField="default"
          filterNamespace={filterNamespace}
          listKey={listKey}
          listMode="learning-list"
          questions={sortedQuestions}
          sideColumnAddOn={sideColumnAddOn}
          onMarkAsCompleted={markQuestionAsCompleted}
          onMarkAsNotCompleted={markQuestionAsNotCompleted}
        />
      </Section>
    </div>
  );
}
