import { useUser } from '@supabase/auth-helpers-react';
import { useCallback, useEffect, useState } from 'react';

import { trpc } from '~/hooks/trpc';
import useQueryParamAction from '~/hooks/useQueryParamAction';
import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { useToast } from '~/components/global/toasts/useToast';
import type { GuideCardMetadataWithCompletedStatus } from '~/components/guides/types';
import { useIntl } from '~/components/intl';

import {
  useMutationQuestionProgressAdd,
  useMutationQuestionProgressDelete,
} from '~/db/QuestionsProgressClient';
import { hashQuestion } from '~/db/QuestionsUtils';
import { useI18nPathname, useI18nRouter } from '~/next-i18nostic/src';

import type {
  InterviewsQuestionItemMinimal,
  QuestionFormat,
} from '../../common/QuestionsTypes';
import QuestionsUnifiedListWithFilters from './QuestionsUnifiedListWithFilters';
import useQuestionsWithCompletionStatus from './useQuestionsWithCompletionStatus';

type Props = Omit<
  React.ComponentProps<typeof QuestionsUnifiedListWithFilters>,
  'onMarkAsCompleted' | 'onMarkAsNotCompleted' | 'questions'
> &
  Readonly<{
    guideCard?: {
      description: string;
      items: ReadonlyArray<GuideCardMetadataWithCompletedStatus>;
      title: string;
    };
    questions: ReadonlyArray<InterviewsQuestionItemMinimal>;
  }>;

const MARK_QN_COMPLETE_ACTION = 'mark-question-complete';

export default function QuestionsUnifiedListWithFiltersAndProgress({
  listType,
  questions,
  ...props
}: Props) {
  const trpcUtils = trpc.useUtils();
  const intl = useIntl();
  const { showToast } = useToast();
  const user = useUser();
  const router = useI18nRouter();
  const { pathname } = useI18nPathname();
  const { signInUpHref } = useAuthSignInUp();
  const [
    automaticallyMarkCompleteQuestion,
    setAutomaticallyMarkCompleteQuestion,
  ] = useState<{ format: QuestionFormat; slug: string; title: string } | null>(
    null,
  );

  const addQueryParamToPath = useQueryParamAction<'format' | 'slug' | 'title'>(
    MARK_QN_COMPLETE_ACTION,
    (params) => {
      if (params) {
        setAutomaticallyMarkCompleteQuestion({
          ...params,
          format: params.format as QuestionFormat,
        });
      }
    },
    ['format', 'slug', 'title'],
  );

  const studyListKey =
    listType?.type === 'study-list' ? listType.value : undefined;
  const questionsWithCompletionStatus = useQuestionsWithCompletionStatus(
    questions,
    studyListKey,
  );
  const markCompleteMutation = useMutationQuestionProgressAdd();
  const markNotCompleteMutation = useMutationQuestionProgressDelete();

  const markQuestionAsCompleted = useCallback(
    ({
      info: { title },
      metadata: { format, slug },
    }: Readonly<{
      info: { title: string };
      metadata: { format: QuestionFormat; slug: string };
    }>) => {
      if (user == null || markCompleteMutation.isLoading) {
        return;
      }

      markCompleteMutation.mutate(
        {
          question: {
            format,
            slug,
          },
          studyListKey,
        },
        {
          onSuccess: () => {
            trpcUtils.questionProgress.invalidate();
            trpcUtils.questionSessions.invalidate();

            showToast({
              title: intl.formatMessage(
                {
                  defaultMessage: 'Marked "{questionTitle}" as complete',
                  description:
                    'Success message for marking a question as complete',
                  id: 'awMxNG',
                },
                {
                  questionTitle: title,
                },
              ),
              variant: 'success',
            });
          },
        },
      );
    },
    [
      intl,
      studyListKey,
      markCompleteMutation,
      showToast,
      trpcUtils.questionProgress,
      trpcUtils.questionSessions,
      user,
    ],
  );

  useEffect(() => {
    if (user == null) {
      return;
    }

    if (automaticallyMarkCompleteQuestion == null) {
      return;
    }

    markQuestionAsCompleted({
      info: {
        title: automaticallyMarkCompleteQuestion.title,
      },
      metadata: {
        format: automaticallyMarkCompleteQuestion.format,
        slug: automaticallyMarkCompleteQuestion.slug,
      },
    });
    setAutomaticallyMarkCompleteQuestion(null);
  }, [automaticallyMarkCompleteQuestion, markQuestionAsCompleted, user]);

  function markQuestionAsNotCompleted(question: InterviewsQuestionItemMinimal) {
    if (user == null || markNotCompleteMutation.isLoading) {
      return;
    }

    markNotCompleteMutation.mutate(
      {
        qnHashes: [hashQuestion(question.metadata)],
        studyListKey,
      },
      {
        onSuccess: () => {
          trpcUtils.questionProgress.invalidate();
          if (studyListKey) {
            trpcUtils.questionSessions.invalidate();
          }

          showToast({
            title: intl.formatMessage(
              {
                defaultMessage: 'Marked "{questionTitle}" as not completed',
                description:
                  'Success message for marking a question as not completed',
                id: 'Hav9UT',
              },
              {
                questionTitle: question.info.title,
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
      listType={listType}
      questions={questionsWithCompletionStatus}
      onMarkAsCompleted={
        user == null
          ? ({ info, metadata }) => {
              router.push(
                signInUpHref({
                  next: addQueryParamToPath(pathname || '', {
                    format: metadata.format,
                    slug: metadata.slug,
                    title: info.title,
                  }),
                }),
              );
            }
          : markQuestionAsCompleted
      }
      onMarkAsNotCompleted={
        user == null ? undefined : markQuestionAsNotCompleted
      }
      {...props}
    />
  );
}
