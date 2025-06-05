'use client';

import clsx from 'clsx';
import { Suspense } from 'react';

import QuestionProgressAction from '~/components/interviews/questions/common/QuestionProgressAction';
import QuestionReportIssueButton from '~/components/interviews/questions/common/QuestionReportIssueButton';
import InterviewsQuestionsListSlideOutButton from '~/components/interviews/questions/listings/slideout/InterviewsQuestionsListSlideOutButton';
import Text from '~/components/ui/Text';
import {
  themeBackgroundDarkColor,
  themeBorderColor,
} from '~/components/ui/theme';

import { hashQuestion } from '~/db/QuestionsUtils';

import type { QuestionListTypeData } from '../../common/QuestionsTypes';

type Props = Readonly<{
  allowMarkComplete?: boolean;
  initialListType?: QuestionListTypeData;
  listIsShownInSidebarOnDesktop: boolean;
  metadata: React.ComponentProps<typeof QuestionProgressAction>['metadata'];
  questionTitle?: string;
  studyListKey?: string;
}>;

export default function InterviewsStudyListBottomBar({
  allowMarkComplete = true,
  initialListType,
  listIsShownInSidebarOnDesktop,
  metadata,
  questionTitle,
  studyListKey,
}: Props) {
  return (
    <div
      className={clsx(
        'sticky inset-x-0 bottom-0',
        'space-y-2.5 px-3 py-2.5',
        ['border-t', themeBorderColor],
        themeBackgroundDarkColor,
      )}>
      {questionTitle && (
        <Text className="block lg:hidden" size="body3">
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
              slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE="qns_slideout"
              studyListKey={studyListKey}
            />
          </Suspense>
        </div>
        <div className="hidden sm:flex sm:flex-1">
          <QuestionReportIssueButton
            entity="question"
            format={metadata.format}
            slug={metadata.slug}
          />
        </div>
        <div className={clsx('flex justify-end sm:order-3 sm:flex-1')}>
          <QuestionReportIssueButton
            className="mr-2 sm:hidden"
            entity="question"
            format={metadata.format}
            slug={metadata.slug}
          />
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
