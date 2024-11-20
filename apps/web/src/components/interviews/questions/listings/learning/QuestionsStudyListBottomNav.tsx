'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';

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

export default function QuestionsStudyListBottomNav({
  paginationEl,
  question,
  studyListKey,
}: Props) {
  const user = useUser();
  const { data: questionProgress, isLoading } = useQueryQuestionProgress(
    question.metadata,
    studyListKey,
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
          <div className="flex shrink-0 justify-center xl:order-2 xl:flex-1">
            {paginationEl}
          </div>
          <div className="justify-center max-xl:hidden xl:flex-1">
            <QuestionReportIssueButton
              format="quiz"
              title={question.metadata.title}
            />
          </div>
          <div
            className={clsx(
              'flex justify-end xl:order-3 xl:flex-1',
              'transition-colors',
              isLoading && user != null ? 'opacity-0' : 'opacity-100',
            )}>
            <QuestionReportIssueButton
              className="mr-3 xl:hidden"
              format="quiz"
              title={question.metadata.title}
            />
            <QuestionProgressAction
              studyListKey={studyListKey}
              metadata={question.metadata}
              questionProgress={questionProgress}
            />
          </div>
        </Container>
      </div>
    </div>
  );
}
