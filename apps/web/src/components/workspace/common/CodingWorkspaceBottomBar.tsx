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
  studyListKey?: string;
}>;

export default function CodingWorkspaceBottomBar({
  leftElements,
  metadata,
  rightElements,
  showQuestionsListButton = true,
  studyListKey,
}: Props) {
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
      <div className="flex items-center gap-x-2 md:flex-1">{leftElements}</div>
      <div className={clsx('flex flex-1 sm:justify-center', 'h-7')}>
        {showQuestionsListButton && (
          <>
            {/* Because useQuestionsListTypeCurrent() uses useSearchParams() */}
            <Suspense>
              <InterviewsQuestionsListSlideOutButton
                metadata={metadata}
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
