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

type Props = Readonly<{
  listKey?: string;
  paginationEl: ReactNode;
  question: QuestionQuiz;
}>;

export default function QuestionsStudyListBottomNav({
  paginationEl,
  question,
  listKey,
}: Props) {
  const { data: questionProgress, isSuccess } = useQueryQuestionProgress(
    question.metadata,
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
          className="flex h-12 items-center justify-between gap-2"
          variant="screen-2xl">
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
              isSuccess ? 'opacity-100' : 'opacity-0',
            )}>
            <QuestionReportIssueButton
              className="mr-3 xl:hidden"
              format="quiz"
              title={question.metadata.title}
            />
            <QuestionProgressAction
              listKey={listKey}
              metadata={question.metadata}
              questionProgress={questionProgress}
            />
          </div>
        </Container>
      </div>
    </div>
  );
}
