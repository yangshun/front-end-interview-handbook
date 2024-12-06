import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Suspense } from 'react';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionsListSlideOutButton from '~/components/interviews/questions/listings/slideout/InterviewsQuestionsListSlideOutButton';
import {
  themeBackgroundDarkColor,
  themeBorderColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  leftElements?: ReactNode;
  metadata: QuestionMetadata;
  rightElements?: ReactNode;
  showQuestionsListButton?: boolean;
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE: string;
  studyListKey?: string;
}>;

export default function CodingWorkspaceBottomBar({
  leftElements,
  metadata,
  rightElements,
  showQuestionsListButton = true,
  studyListKey,
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE,
}: Props) {
  return (
    <div
      className={clsx(
        'sticky bottom-0',
        'flex flex-wrap items-center justify-between',
        'px-3 py-3',
        ['max-lg:border-t', themeBorderColor],
        themeBackgroundDarkColor,
      )}>
      <div className={clsx('flex items-center gap-x-2 md:flex-1')}>
        {leftElements}
      </div>
      <div className={clsx('flex flex-1 sm:justify-center', 'h-7')}>
        {showQuestionsListButton && (
          <>
            {/* Because useQuestionsListTypeCurrent() uses useSearchParams() */}
            <Suspense>
              <InterviewsQuestionsListSlideOutButton
                metadata={metadata}
                slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE={
                  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE
                }
                studyListKey={studyListKey}
              />
            </Suspense>
          </>
        )}
      </div>
      <div className="flex items-center justify-end gap-x-2 md:flex-1">
        {rightElements}
      </div>
    </div>
  );
}
