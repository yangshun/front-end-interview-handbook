import clsx from 'clsx';
import type { ReactNode } from 'react';

import type {
  QuestionFramework,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionsListSlideOutButton from '~/components/interviews/questions/listings/slideout/InterviewsQuestionsListSlideOutButton';
import {
  themeBackgroundDarkColor,
  themeBorderColor,
} from '~/components/ui/theme';

import { hashQuestion } from '~/db/QuestionsUtils';

type Props = Readonly<{
  framework?: QuestionFramework;
  leftElements?: ReactNode;
  metadata: QuestionMetadata;
  rightElements?: ReactNode;
  showQuestionsListButton?: boolean;
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE: string;
  studyListKey?: string;
}>;

export default function CodingWorkspaceBottomBar({
  framework,
  leftElements,
  metadata,
  rightElements,
  showQuestionsListButton = true,
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE,
  studyListKey,
}: Props) {
  return (
    <div
      className={clsx(
        'sticky bottom-0',
        'flex flex-wrap items-center justify-between',
        'h-12',
        'px-3',
        ['max-lg:border-t', themeBorderColor],
        themeBackgroundDarkColor,
      )}>
      <div className={clsx('flex items-center gap-x-1.5 sm:gap-x-2 md:flex-1')}>
        {leftElements}
      </div>
      <div className={clsx('flex flex-1 sm:justify-center', 'h-7')}>
        {showQuestionsListButton && (
          <InterviewsQuestionsListSlideOutButton
            currentQuestionHash={hashQuestion(metadata)}
            framework={framework}
            listIsShownInSidebarOnDesktop={false}
            slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE={
              slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE
            }
            studyListKey={studyListKey}
          />
        )}
      </div>
      <div className="flex items-center justify-end gap-x-1.5 sm:gap-x-2 md:flex-1">
        {rightElements}
      </div>
    </div>
  );
}
