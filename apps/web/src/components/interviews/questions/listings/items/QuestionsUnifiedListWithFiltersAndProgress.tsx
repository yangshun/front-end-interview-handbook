import { usePathname, useRouter } from 'next/navigation';
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

import QuestionsUnifiedListWithFilters from './QuestionsUnifiedListWithFilters';
import useQuestionsWithCompletionStatus from '../filters/hooks/useQuestionsWithCompletionStatus';
import type { QuestionMetadata } from '../../common/QuestionsTypes';

import { useUser } from '@supabase/auth-helpers-react';

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

const MARK_QN_COMPLETE_ACTION = 'mark-question-complete';

export default function QuestionsUnifiedListWithFiltersAndProgress({
  questions,
  list,
  ...props
}: Props) {
  const trpcUtils = trpc.useUtils();
  const intl = useIntl();
  const { showToast } = useToast();
  const user = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const { signInUpHref } = useAuthSignInUp();
  const [
    automaticallyMarkCompleteQuestion,
    setAutomaticallyMarkCompleteQuestion,
  ] = useState<{ format: string; slug: string; title: string } | null>(null);

  const addQueryParamToPath = useQueryParamAction<'format' | 'slug' | 'title'>(
    MARK_QN_COMPLETE_ACTION,
    (params) => {
      if (params) {
        setAutomaticallyMarkCompleteQuestion(params);
      }
    },
    ['format', 'slug', 'title'],
  );

  const studyListKey = list?.type === 'study-list' ? list.value : undefined;
  const questionsWithCompletionStatus = useQuestionsWithCompletionStatus(
    questions,
    studyListKey,
  );
  const markCompleteMutation = useMutationQuestionProgressAdd();
  const markNotCompleteMutation = useMutationQuestionProgressDelete();

  const markQuestionAsCompleted = useCallback(
    ({
      slug,
      title,
      format,
    }: Readonly<{ format: string; slug: string; title: string }>) => {
      if (user == null || markCompleteMutation.isLoading) {
        return;
      }

      markCompleteMutation.mutate(
        {
          format,
          slug,
          studyListKey,
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
      trpcUtils.questionLists,
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

    markQuestionAsCompleted(automaticallyMarkCompleteQuestion);
    setAutomaticallyMarkCompleteQuestion(null);
  }, [automaticallyMarkCompleteQuestion, markQuestionAsCompleted, user]);

  function markQuestionAsNotCompleted(question: QuestionMetadata) {
    if (user == null || markNotCompleteMutation.isLoading) {
      return;
    }

    markNotCompleteMutation.mutate(
      {
        format: question.format,
        slug: question.slug,
        studyListKey,
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
      list={list}
      questions={questionsWithCompletionStatus}
      onMarkAsCompleted={
        user == null
          ? (questionMetadata) => {
              router.push(
                signInUpHref({
                  next: addQueryParamToPath(pathname || '', {
                    format: questionMetadata.format,
                    slug: questionMetadata.slug,
                    title: questionMetadata.title,
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
