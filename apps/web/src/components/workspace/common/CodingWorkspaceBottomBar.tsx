import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Suspense } from 'react';

import QuestionProgressAction from '~/components/interviews/questions/common/QuestionProgressAction';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionNextQuestions from '~/components/interviews/questions/content/QuestionNextQuestions';
import InterviewsQuestionsListSlideOutButton from '~/components/interviews/questions/listings/slideout/InterviewsQuestionsListSlideOutButton';
import Divider from '~/components/ui/Divider';
import {
  themeBackgroundDarkColor,
  themeBorderColor,
} from '~/components/ui/theme';

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';

import CodingWorkspaceTimer from './CodingWorkspaceTimer';

type Props = Readonly<{
  leftElements?: ReactNode;
  metadata: QuestionMetadata;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  rightPostElements?: ReactNode;
  rightPreElements?: ReactNode;
  showQuestionsListButton?: boolean;
  studyListKey?: string;
}>;

export default function CodingWorkspaceBottomBar({
  leftElements,
  metadata,
  nextQuestions,
  rightPostElements,
  rightPreElements,
  showQuestionsListButton = true,
  studyListKey,
}: Props) {
  const { data: questionProgress } = useQueryQuestionProgress(
    metadata,
    studyListKey ?? null,
  );

  return (
    <div
      className={clsx(
        'sticky bottom-0',
        themeBackgroundDarkColor,
        ['max-lg:border-t', themeBorderColor],
        'lg:relative',
        'flex flex-wrap items-center justify-between gap-2',
        'px-3 py-3',
      )}>
      {leftElements && (
        <div className="flex items-center gap-x-2">{leftElements}</div>
      )}
      {showQuestionsListButton && (
        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2">
          {/* Because useQuestionsListTypeCurrent() uses useSearchParams() */}
          <Suspense>
            <InterviewsQuestionsListSlideOutButton
              metadata={metadata}
              studyListKey={studyListKey}
            />
          </Suspense>
        </div>
      )}
      <div className="flex items-center gap-x-2">
        {rightPreElements}
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
          studyListKey={studyListKey}
        />
        {rightPostElements}
      </div>
    </div>
  );
}
