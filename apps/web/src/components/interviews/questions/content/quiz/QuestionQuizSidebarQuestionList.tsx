import clsx from 'clsx';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Suspense, useState } from 'react';

import useHashChange from '~/hooks/useHashChange';

import { questionListFilterNamespace } from '~/components/interviews/questions/common/QuestionHrefUtils';
import InterviewsQuestionsListSlideOutSwitcher from '~/components/interviews/questions/listings/slideout/InterviewsQuestionsListSlideOutSwitcher';
import {
  useQuestionsListDataForType,
  useQuestionsListTypeCurrent,
} from '~/components/interviews/questions/listings/utils/useQuestionsListDataForType';
import { themeBorderColor } from '~/components/ui/theme';

import { hashQuestion } from '~/db/QuestionsUtils';

import InterviewsQuestionsListSlideOutContents from '../../listings/slideout/InterviewsQuestionsListSlideOutContents';
import type { QuestionListTypeWithLabel } from '../../listings/slideout/InterviewsQuestionsListSlideOutSwitcher';

export default function QuestionQuizSidebarQuestionList() {
  // Because useQuestionsListTypeCurrent() uses useSearchParams()
  // Because of nuqs
  return (
    <Suspense>
      <QuestionQuizSidebarQuestionListLoader />
    </Suspense>
  );
}

function QuestionQuizSidebarQuestionListLoader() {
  const studyListKey = undefined;
  const framework = undefined;

  const listType = useQuestionsListTypeCurrent(studyListKey, framework);
  const { isLoading, data } = useQuestionsListDataForType(listType);

  const hidden = isLoading || data == null;

  if (hidden) {
    return null;
  }

  const initialListType = { ...data.listType, label: data.title };

  return (
    <QuestionsQuizSidebarQuestionListImpl initialListType={initialListType} />
  );
}

function QuestionsQuizSidebarQuestionListImpl({
  initialListType,
}: Readonly<{
  initialListType: QuestionListTypeWithLabel;
}>) {
  const segment = useSelectedLayoutSegment();
  const hash = useHashChange();

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

  const questionSlug = (hash || segment || '').replace(/#/g, '');

  const currentQuestionHash = questionSlug
    ? hashQuestion({
        format: 'quiz',
        slug: questionSlug,
      })
    : undefined;

  const hasChangedList =
    initialListType.type !== currentListType.type ||
    initialListType.value !== currentListType.value;

  return (
    <div className={clsx('flex flex-col gap-4', 'w-full')}>
      <div className={clsx('px-6 py-2', ['border-b', themeBorderColor])}>
        <InterviewsQuestionsListSlideOutSwitcher
          listType={currentListType}
          onChangeListType={setCurrentListType}
        />
      </div>
      <div className="h-0 grow">
        <InterviewsQuestionsListSlideOutContents
          key={filterNamespace}
          currentQuestionHash={currentQuestionHash}
          isDifferentListFromInitial={hasChangedList}
          listType={currentListType}
          mode="embedded"
          showSwitchQuestionListDialog={showSwitchQuestionListDialog}
          onClickQuestion={(event, href: string) => {
            if (hasChangedList) {
              event.preventDefault();
              setShowSwitchQuestionListDialog({
                href,
                show: true,
                type: 'question-click',
              });
            }
          }}
          onCloseSwitchQuestionListDialog={onCloseSwitchQuestionListDialog}
          onListTabChange={(newTab) =>
            setCurrentListType({
              ...currentListType,
              tab: newTab,
            })
          }
        />
      </div>
    </div>
  );
}
