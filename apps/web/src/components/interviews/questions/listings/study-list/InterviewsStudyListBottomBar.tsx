'use client';

import clsx from 'clsx';
import { type ReactNode, Suspense } from 'react';

import QuestionProgressAction from '~/components/interviews/questions/common/QuestionProgressAction';
import QuestionReportIssueButton from '~/components/interviews/questions/common/QuestionReportIssueButton';
import {
  themeBackgroundDarkColor,
  themeBorderColor,
} from '~/components/ui/theme';

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';

import type { QuestionMetadata } from '../../common/QuestionsTypes';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  allowMarkComplete?: boolean;
  metadata: QuestionMetadata;
  paginationEl: ReactNode;
  studyListKey?: string;
}>;

export default function InterviewsStudyListBottomBar({
  allowMarkComplete = true,
  paginationEl,
  metadata,
  studyListKey,
}: Props) {
  const user = useUser();
  const { data: questionProgress, isLoading } = useQueryQuestionProgress(
    metadata,
    studyListKey ?? null,
  );

  return (
    <div
      className={clsx(
        'sticky inset-x-0 bottom-0',
        'flex items-center justify-between gap-2 px-3 py-3',
        ['border-t', themeBorderColor],
        themeBackgroundDarkColor,
      )}>
      <div className="flex shrink-0 justify-center sm:order-2 sm:flex-1">
        <Suspense>{paginationEl}</Suspense>
      </div>
      <div className="hidden sm:flex sm:flex-1">
        <QuestionReportIssueButton
          format={metadata.format}
          title={metadata.title}
        />
      </div>
      <div
        className={clsx(
          'flex justify-end sm:order-3 sm:flex-1',
          'transition-colors',
          isLoading && user != null ? 'opacity-0' : 'opacity-100',
        )}>
        <QuestionReportIssueButton
          className="mr-2 sm:hidden"
          format={metadata.format}
          title={metadata.title}
        />
        {allowMarkComplete && (
          <QuestionProgressAction
            metadata={metadata}
            questionProgress={questionProgress}
            studyListKey={studyListKey}
          />
        )}
      </div>
    </div>
  );
}
