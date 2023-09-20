import type { ReactNode } from 'react';

import QuestionProgressAction from '~/components/questions/common/QuestionProgressAction';
import QuestionReportIssueButton from '~/components/questions/common/QuestionReportIssueButton';
import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import QuestionNextQuestions from '~/components/questions/content/QuestionNextQuestions';
import Divider from '~/components/ui/Divider';

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';

import CodingWorkspaceQuestionListSlideOutButton from './CodingWorkspaceQuestionListSlideOutButton';
import CodingWorkspaceTimer from './CodingWorkspaceTimer';

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
    <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-3">
      <div className="flex items-center gap-x-2">
        <CodingWorkspaceQuestionListSlideOutButton />
        <QuestionReportIssueButton format="javascript" title={metadata.title} />
        {leftElements}
      </div>
      <div className="flex items-center gap-x-2">
        <div className="hidden md:inline">
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
