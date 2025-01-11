'use client';

import clsx from 'clsx';
import { isEqual } from 'lodash-es';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { useState } from 'react';

import useScrollToTop from '~/hooks/useScrollToTop';

import SidebarCollapser from '~/components/global/sidebar/SidebarCollapser';
import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import { questionListFilterNamespace } from '~/components/interviews/questions/common/QuestionHrefUtils';
import InterviewsQuestionsListSlideOutSwitcher from '~/components/interviews/questions/listings/slideout/InterviewsQuestionsListSlideOutSwitcher';
import Section from '~/components/ui/Heading/HeadingContext';
import { themeBorderColor } from '~/components/ui/theme';

import { hashQuestion } from '~/db/QuestionsUtils';

import InterviewsQuestionsListSlideOutContents from '../../listings/slideout/InterviewsQuestionsListSlideOutContents';
import type { QuestionListTypeWithLabel } from '../../listings/slideout/InterviewsQuestionsListSlideOutSwitcher';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function QuestionsQuizContentLayout({ children }: Props) {
  const { showSidebar } = useUserPreferences();
  const pathname = usePathname();

  useScrollToTop([pathname]);

  const segment = useSelectedLayoutSegment();

  const initialListType = {
    label: 'Quiz',
    type: 'format',
    value: 'quiz',
  } as const;

  const [currentListType, setCurrentListType] =
    useState<QuestionListTypeWithLabel>(initialListType);
  const filterNamespace = questionListFilterNamespace(currentListType);
  const [showSwitchQuestionListDialog, setShowSwitchQuestionListDialog] =
    useState<
      React.ComponentProps<
        typeof InterviewsQuestionsListSlideOutContents
      >['showSwitchQuestionListDialog']
    >({
      href: null,
      show: false,
      type: 'switch',
    });

  function onCloseSwitchQuestionListDialog() {
    setShowSwitchQuestionListDialog((prev) => ({
      ...prev,
      href: null,
      show: false,
    }));
  }

  const questionSlug = segment;

  const currentQuestionHash = questionSlug
    ? hashQuestion({
        format: 'quiz',
        slug: questionSlug,
      })
    : undefined;

  return (
    <div className="flex w-full">
      <div
        className={clsx(
          'flex',
          'sticky top-[var(--global-sticky-height)] h-[calc(100vh_-_var(--global-sticky-height))]',
        )}>
        {showSidebar && (
          <Section>
            <div
              className={clsx('flex-col', 'hidden w-[420px] lg:flex', [
                'border-r',
                themeBorderColor,
              ])}>
              <div
                className={clsx('px-6 py-2', ['border-b', themeBorderColor])}>
                <InterviewsQuestionsListSlideOutSwitcher
                  listType={currentListType}
                  onChangeListType={setCurrentListType}
                />
              </div>
              <div className="h-0 grow">
                <InterviewsQuestionsListSlideOutContents
                  key={filterNamespace}
                  currentQuestionHash={currentQuestionHash}
                  filterNamespace={filterNamespace}
                  isDifferentListFromInitial={
                    !isEqual(initialListType, currentListType)
                  }
                  listType={currentListType}
                  mode="compact"
                  showSwitchQuestionListDialog={showSwitchQuestionListDialog}
                  onClickDifferentStudyListQuestion={(href: string) =>
                    setShowSwitchQuestionListDialog({
                      href,
                      show: true,
                      type: 'question-click',
                    })
                  }
                  onCloseSwitchQuestionListDialog={
                    onCloseSwitchQuestionListDialog
                  }
                />
              </div>
            </div>
          </Section>
        )}
        <SidebarCollapser />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
