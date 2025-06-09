'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import useScrollToTop from '~/hooks/useScrollToTop';

import QuestionsQuizSidebarCollapser from '~/components/interviews/questions/content/quiz/QuestionsQuizSidebarCollapser';
import Section from '~/components/ui/Heading/HeadingContext';
import { themeBorderColor } from '~/components/ui/theme';

import type { QuestionListTypeData } from '../../common/QuestionsTypes';
import QuestionsQuizSidebarQuestionList from './QuestionQuizSidebarQuestionList';
import useQuestionsQuizSidebarExpanded from './useQuestionsQuizSidebarExpanded';

type Props = Readonly<{
  children: React.ReactNode;
  initialListType?: QuestionListTypeData;
  renderQuestionsListTopAddOnItem?: React.ComponentProps<
    typeof QuestionsQuizSidebarQuestionList
  >['renderQuestionsListTopAddOnItem'];
}>;

export default function QuestionsQuizContentLayout({
  children,
  initialListType,
  renderQuestionsListTopAddOnItem,
}: Props) {
  const [questionsQuizSidebarExpanded] = useQuestionsQuizSidebarExpanded();
  const pathname = usePathname();

  useScrollToTop([pathname]);

  return (
    <div className="flex w-full">
      <div
        className={clsx(
          'flex',
          'sticky top-[var(--global-sticky-height)] h-[calc(100vh_-_var(--global-sticky-height))]',
        )}>
        {questionsQuizSidebarExpanded && (
          <Section>
            <div
              className={clsx('hidden w-[300px] lg:flex xl:w-80', [
                'border-r',
                themeBorderColor,
              ])}>
              <QuestionsQuizSidebarQuestionList
                initialListType={initialListType}
                renderQuestionsListTopAddOnItem={
                  renderQuestionsListTopAddOnItem
                }
              />
            </div>
          </Section>
        )}
        <QuestionsQuizSidebarCollapser />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
