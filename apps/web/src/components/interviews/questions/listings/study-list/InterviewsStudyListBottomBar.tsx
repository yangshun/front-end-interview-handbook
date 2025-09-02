'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Suspense } from 'react';

import QuestionProgressAction from '~/components/interviews/questions/common/QuestionProgressAction';
import QuestionReportIssueButton from '~/components/interviews/questions/common/QuestionReportIssueButton';
import type { QuestionListTypeData } from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionsListSlideOutButton from '~/components/interviews/questions/listings/slideout/InterviewsQuestionsListSlideOutButton';
import Text from '~/components/ui/Text';
import { themeBackgroundColor, themeBorderColor } from '~/components/ui/theme';

import { hashQuestion } from '~/db/QuestionsUtils';

type Props = Readonly<{
  allowMarkComplete?: boolean;
  initialListType?: QuestionListTypeData;
  leftAddOnItem?: ReactNode;
  listIsShownInSidebarOnDesktop: boolean;
  metadata: React.ComponentProps<typeof QuestionProgressAction>['metadata'];
  questionTitle?: string;
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE?: string | null;
  studyListKey?: string;
}>;

export default function InterviewsStudyListBottomBar({
  allowMarkComplete = true,
  initialListType,
  leftAddOnItem,
  listIsShownInSidebarOnDesktop,
  metadata,
  questionTitle,
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE = 'qns_slideout',
  studyListKey,
}: Props) {
  return (
    <div
      className={clsx(
        'sticky inset-x-0 bottom-0',
        'px-6 py-2.5',
        ['border-t', themeBorderColor],
        themeBackgroundColor,
      )}>
      {questionTitle && (
        <Text className="block pb-2.5 lg:hidden" size="body3">
          {questionTitle}
        </Text>
      )}
      <div className={clsx('flex items-center justify-between gap-2')}>
        <div className="flex shrink-0 justify-center sm:order-2 sm:flex-1">
          <Suspense>
            <InterviewsQuestionsListSlideOutButton
              currentQuestionHash={hashQuestion(metadata)}
              initialListType={initialListType}
              listIsShownInSidebarOnDesktop={listIsShownInSidebarOnDesktop}
              slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE={
                slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE
              }
              studyListKey={studyListKey}
            />
          </Suspense>
        </div>
        <div className="hidden gap-2 sm:flex sm:flex-1">
          <QuestionReportIssueButton
            entity="question"
            format={metadata.format}
            slug={metadata.slug}
          />
          {leftAddOnItem}
        </div>
        <div className={clsx('flex justify-end gap-3 sm:order-3 sm:flex-1')}>
          <div className="flex gap-3 sm:hidden">
            <QuestionReportIssueButton
              entity="question"
              format={metadata.format}
              slug={metadata.slug}
            />
            {leftAddOnItem}
          </div>
          {allowMarkComplete && (
            <QuestionProgressAction
              metadata={metadata}
              studyListKey={studyListKey}
            />
          )}
        </div>
      </div>
    </div>
  );
}
