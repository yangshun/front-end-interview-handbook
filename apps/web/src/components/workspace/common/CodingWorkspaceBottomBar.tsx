import type { ReactNode } from 'react';

import QuestionProgressAction from '~/components/questions/common/QuestionProgressAction';
import QuestionReportIssueButton from '~/components/questions/common/QuestionReportIssueButton';
import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import QuestionNextQuestions from '~/components/questions/content/QuestionNextQuestions';
import Divider from '~/components/ui/Divider';

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';

import CodingWorkspaceQuestionListSlideOutButton from './CodingWorkspaceQuestionListSlideOutButton';

type Props = Readonly<{
  metadata: QuestionMetadata;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  rightElements?: ReactNode;
}>;

export default function CodingWorkspaceBottomBar({
  metadata,
  nextQuestions,
  rightElements,
}: Props) {
  const { data: questionProgress } = useQueryQuestionProgress(metadata);

  return (
    <div className="flex items-center justify-between px-3 py-3">
      <div className="flex items-center gap-x-2">
        <CodingWorkspaceQuestionListSlideOutButton />
        <QuestionReportIssueButton format="javascript" title={metadata.title} />
      </div>
      <div className="flex items-center gap-x-2">
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
