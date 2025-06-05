import clsx from 'clsx';
import { useSelectedLayoutSegment } from 'next/navigation';
import type { ReactNode } from 'react';
import { Suspense, useState } from 'react';

import useHashChange from '~/hooks/useHashChange';

import {
  questionListFilterNamespace,
  QuestionListTypeDefault,
} from '~/components/interviews/questions/common/QuestionHrefUtils';
import type {
  QuestionListTypeData,
  QuestionPracticeFormat,
} from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionsListSlideOutSwitcher from '~/components/interviews/questions/listings/slideout/InterviewsQuestionsListSlideOutSwitcher';
import {
  useQuestionsListDataForType,
  useQuestionsListTypeCurrent,
} from '~/components/interviews/questions/listings/utils/useQuestionsListDataForType';
import type Anchor from '~/components/ui/Anchor';

import { hashQuestion } from '~/db/QuestionsUtils';

import InterviewsQuestionsListSlideOutContents from '../../listings/slideout/InterviewsQuestionsListSlideOutContents';
import type { QuestionListTypeWithLabel } from '../../listings/slideout/InterviewsQuestionsListSlideOutSwitcher';

type QuestionClickEvent = Parameters<
  NonNullable<React.ComponentProps<typeof Anchor>['onClick']>
>[0];

type Props = Readonly<{
  initialListType?: QuestionListTypeData;
  renderQuestionsListTopAddOnItem?: ({
    listType,
    onClick,
    tab,
  }: {
    listType: QuestionListTypeData;
    onClick?: (event: QuestionClickEvent, href: string) => void;
    tab: QuestionPracticeFormat | undefined;
  }) => ReactNode;
}>;

export default function QuestionQuizSidebarQuestionList(props: Props) {
  // Because useQuestionsListTypeCurrent() uses useSearchParams()
  // Because of nuqs
  return (
    <Suspense>
      <QuestionQuizSidebarQuestionListLoader {...props} />
    </Suspense>
  );
}

function QuestionQuizSidebarQuestionListLoader({
  initialListType: initialListTypeParam,
  renderQuestionsListTopAddOnItem,
}: Props) {
  const studyListKey = undefined;
  const framework = undefined;

  const listType =
    useQuestionsListTypeCurrent(studyListKey, framework) ??
    initialListTypeParam ??
    QuestionListTypeDefault;
  const { data, isLoading } = useQuestionsListDataForType(listType);

  const hidden = isLoading || data == null;

  if (hidden) {
    return null;
  }

  const initialListType = { ...data.listType, label: data.title };

  return (
    <QuestionsQuizSidebarQuestionListImpl
      initialListType={initialListType}
      renderQuestionsListTopAddOnItem={renderQuestionsListTopAddOnItem}
    />
  );
}

function QuestionsQuizSidebarQuestionListImpl({
  initialListType,
  renderQuestionsListTopAddOnItem,
}: Readonly<{
  initialListType: QuestionListTypeWithLabel;
  renderQuestionsListTopAddOnItem?: ({
    listType,
    tab,
  }: {
    listType: QuestionListTypeData;
    onClick?: (event: QuestionClickEvent, href: string) => void;
    tab: QuestionPracticeFormat | undefined;
  }) => ReactNode;
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

  function handleOnClickQuestion(event: QuestionClickEvent, href: string) {
    if (hasChangedList) {
      event.preventDefault();
      setShowSwitchQuestionListDialog({
        href,
        show: true,
        type: 'question-click',
      });
    }
  }

  return (
    <div className={clsx('flex flex-col', 'w-full')}>
      <div className={clsx('px-6 py-2')}>
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
          renderQuestionsListTopAddOnItem={({ listType, tab }) =>
            renderQuestionsListTopAddOnItem?.({
              listType,
              onClick: handleOnClickQuestion,
              tab,
            })
          }
          showSwitchQuestionListDialog={showSwitchQuestionListDialog}
          onClickQuestion={handleOnClickQuestion}
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
