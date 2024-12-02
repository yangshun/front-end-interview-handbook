'use client';

import clsx from 'clsx';
import { type ReactNode, Suspense } from 'react';

import QuestionProgressAction from '~/components/interviews/questions/common/QuestionProgressAction';
import QuestionReportIssueButton from '~/components/interviews/questions/common/QuestionReportIssueButton';
import Container from '~/components/ui/Container';
import {
  themeBackgroundDarkColor,
  themeBorderColor,
} from '~/components/ui/theme';

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';

import type { QuestionQuiz } from '../../common/QuestionsTypes';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  paginationEl: ReactNode;
  question: QuestionQuiz;
  studyListKey?: string;
}>;

export default function InterviewsStudyListBottomNav({
  paginationEl,
  question,
  studyListKey,
}: Props) {
  const user = useUser();
  const { data: questionProgress, isLoading } = useQueryQuestionProgress(
    question.metadata,
    studyListKey ?? null,
  );

  return (
    <div className="sticky inset-x-0 bottom-0">
      <div
        className={clsx(
          'border-t',
          themeBorderColor,
          themeBackgroundDarkColor,
        )}>
        <Container
          className="flex h-12 items-center justify-between gap-2 px-6"
          width="screen-2xl">
          <div className="flex shrink-0 justify-center sm:order-2 sm:flex-1">
            <Suspense>{paginationEl}</Suspense>
          </div>
          <div className="hidden sm:flex sm:flex-1">
            <QuestionReportIssueButton
              format={question.metadata.format}
              title={question.metadata.title}
            />
          </div>
          <div
            className={clsx(
              'flex justify-end sm:order-3 sm:flex-1',
              'transition-colors',
              isLoading && user != null ? 'opacity-0' : 'opacity-100',
            )}>
            <QuestionReportIssueButton
              className="mr-3 sm:hidden"
              format={question.metadata.format}
              title={question.metadata.title}
            />
            <QuestionProgressAction
              metadata={question.metadata}
              questionProgress={questionProgress}
              studyListKey={studyListKey}
            />
          </div>
        </Container>
      </div>
    </div>
  );
}
