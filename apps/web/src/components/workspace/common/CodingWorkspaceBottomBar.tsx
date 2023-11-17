import type { ReactNode } from 'react';

import QuestionProgressAction from '~/components/interviews/questions/common/QuestionProgressAction';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionNextQuestions from '~/components/interviews/questions/content/QuestionNextQuestions';
import Divider from '~/components/ui/Divider';

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';

import CodingWorkspaceTimer from './CodingWorkspaceTimer';
import CodingWorkspaceQuestionListSlideOutButton from './questions/CodingWorkspaceQuestionListSlideOutButton';

type Props = Readonly<{
  leftElements?: ReactNode;
  metadata: QuestionMetadata;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  rightElements?: ReactNode;
}>;

export default function CodingWorkspaceBottomBar({
  leftElements,
  metadata,
  nextQuestions,
  rightElements,
}: Props) {
  const { data: questionProgress } = useQueryQuestionProgress(metadata);

  return (
    <div className="relative flex flex-wrap items-center justify-between gap-2 px-3 py-3">
      {leftElements && (
        <div className="flex items-center gap-x-2">{leftElements}</div>
      )}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2">
        <CodingWorkspaceQuestionListSlideOutButton metadata={metadata} />
      </div>
      <div className="flex items-center gap-x-2">
        <div className="hidden lg:inline">
          <CodingWorkspaceTimer />
        </div>
        <QuestionProgressAction
          metadata={metadata}
          questionProgress={questionProgress}
          signInModalContents={
            nextQuestions.length > 0 && (
              <div className="mt-4 space-y-4">
                <Divider />
                <QuestionNextQuestions questions={nextQuestions} />
              </div>
            )
          }
        />
        {rightElements}
      </div>
    </div>
  );
}
