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

export default function QuestionQuizBottomNav({
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
          className="flex h-12 items-center justify-between"
          variant="screen-2xl">
          <QuestionReportIssueButton
            format="quiz"
            title={question.metadata.title}
          />
          <div
            className={clsx(
              'transition-colors xl:order-2',
              isSuccess ? 'opacity-100' : 'opacity-0',
            )}>
            <QuestionProgressAction
              listKey={listKey}
              metadata={question.metadata}
              questionProgress={questionProgress}
            />
          </div>
          {paginationEl}
        </Container>
      </div>
    </div>
  );
}
