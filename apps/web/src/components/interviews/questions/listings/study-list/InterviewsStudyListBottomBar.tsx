'use client';

import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import { ReactNode, Suspense } from 'react';

import QuestionBookmarkAction from '~/components/interviews/questions/common/QuestionBookmarkAction';
import QuestionProgressAction from '~/components/interviews/questions/common/QuestionProgressAction';
import QuestionReportIssueButton from '~/components/interviews/questions/common/QuestionReportIssueButton';
import InterviewsQuestionsListSlideOutButton from '~/components/interviews/questions/listings/slideout/InterviewsQuestionsListSlideOutButton';
import {
  themeBackgroundDarkColor,
  themeBorderColor,
} from '~/components/ui/theme';

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';
import { hashQuestion } from '~/db/QuestionsUtils';
import type { QuestionListTypeData } from '~/components/interviews/questions/common/QuestionsTypes';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  allowBookmark?: boolean;
  questionTitle?: string;
  initialListType?: QuestionListTypeData;
  allowMarkComplete?: boolean;
  listIsShownInSidebarOnDesktop: boolean;
  metadata: React.ComponentProps<typeof QuestionProgressAction>['metadata'];
  studyListKey?: string;
  leftAddOnItem?: ReactNode;
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE?: string | null;
}>;

export default function InterviewsStudyListBottomBar({
  allowBookmark = true,
  allowMarkComplete = true,
  listIsShownInSidebarOnDesktop,
  metadata,
  studyListKey,
  leftAddOnItem,
  initialListType,
  questionTitle,
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE = 'qns_slideout',
}: Props) {
  const user = useUser();
  const { isLoading } = useQueryQuestionProgress(
    metadata,
    studyListKey ?? null,
  );

  return (
    <div
      className={clsx(
        'sticky inset-x-0 bottom-0',
        'px-3 py-3',
        ['border-t', themeBorderColor],
        themeBackgroundDarkColor,
      )}>
      {questionTitle && (
        <Text className="block pb-2.5 lg:hidden" size="body3">
          {questionTitle}
        </Text>
      )}
      <div className="flex items-center justify-between gap-2">
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
        <div
          className={clsx(
            'flex justify-end sm:order-3 sm:flex-1',
            'transition-colors',
            isLoading && user != null ? 'opacity-0' : 'opacity-100',
          )}>
          <div className="flex gap-3 sm:hidden">
            <QuestionReportIssueButton
              entity="question"
              format={metadata.format}
              slug={metadata.slug}
            />
            {leftAddOnItem}
          </div>
          {allowBookmark && <QuestionBookmarkAction metadata={metadata} />}
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
