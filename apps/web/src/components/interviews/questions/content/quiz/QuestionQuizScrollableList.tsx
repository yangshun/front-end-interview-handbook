'use client';

import clsx from 'clsx';
import type { InterviewsQuestionQuizScrollableContent } from 'contentlayer/generated';
import { useEffect, useRef, useState } from 'react';
import type { VListHandle } from 'virtua';
import { WindowVirtualizer } from 'virtua';

import { useEnterViewport } from '~/hooks/useEnterViewport';
import useHashChange from '~/hooks/useHashChange';

import type {
  QuestionFramework,
  QuestionLanguage,
  QuestionListTypeData,
  QuestionQuiz,
} from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsQuizContentLayout from '~/components/interviews/questions/content/quiz/QuestionsQuizContentLayout';
import useQuestionCodingSorting from '~/components/interviews/questions/listings/filters/hooks/useQuestionCodingSorting';
import { sortQuestionsMultiple } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import useQuestionsWithCompletionStatus from '~/components/interviews/questions/listings/items/useQuestionsWithCompletionStatus';
import InterviewsStudyListBottomBar from '~/components/interviews/questions/listings/study-list/InterviewsStudyListBottomBar';
import Divider from '~/components/ui/Divider';
import Section from '~/components/ui/Heading/HeadingContext';

import useQuestionsAutoMarkAsComplete from '../../common/useQuestionsAutoMarkAsComplete';
import QuestionQuizItem from './QuestionQuizItem';
import QuestionQuizPageHeader from './QuestionQuizPageHeader';
import QuestionQuizScrollableListIntroduction from './QuestionQuizScrollableListIntroduction';
import QuestionQuizScrollModeToggle from './QuestionQuizScrollModeToggle';

type Props = Readonly<{
  description: string;
  languageOrFramework: Extract<QuestionFramework, 'react'> | QuestionLanguage;
  listType: QuestionListTypeData;
  longDescription: InterviewsQuestionQuizScrollableContent;
  questionsList: ReadonlyArray<QuestionQuiz>;
  title: string;
}>;

function QuestionQuizScrollableListItem({
  onEnterViewport,
  question,
}: {
  onEnterViewport: (isInView: boolean) => void;
  question: QuestionQuiz;
}) {
  const ref = useEnterViewport((isInView) => {
    onEnterViewport(isInView);
  });

  return <QuestionQuizItem ref={ref} question={question} scrollMode={true} />;
}

export default function QuestionQuizScrollableList({
  description,
  languageOrFramework,
  listType,
  longDescription,
  questionsList,
  title,
}: Props) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentHash = useHashChange();
  const virtuaContainerRef = useRef<VListHandle>(null);
  const [isIntroductionSectionInView, setIsIntroductionSectionInView] =
    useState(false);

  const isUserScroll = useRef(false);

  const questionsWithCompletionStatus = useQuestionsWithCompletionStatus(
    questionsList.map((item) => item.metadata),
  );

  // Sorting.
  const { sortFields } = useQuestionCodingSorting({
    listType,
  });

  // Processing.
  const questions = sortQuestionsMultiple(
    questionsWithCompletionStatus,
    sortFields,
  );

  const currentQuestionIndex = questions.findIndex(
    (question) => currentHash?.substring(1) === question.slug,
  );
  const questionIndex = currentQuestionIndex === -1 ? 0 : currentQuestionIndex;

  useEffect(() => {
    // Don't scroll to current question if hash change is triggered by user scrolling
    if (currentQuestionIndex === -1 || isUserScroll.current) {
      return;
    }

    virtuaContainerRef.current?.scrollToIndex(currentQuestionIndex, {
      offset: -120,
    });
  }, [currentQuestionIndex, currentHash]);

  const currentQuestion = questions[questionIndex];
  const questionsMap = questionsList.reduce(
    (acc, item) => {
      acc[item.metadata.slug] = item;

      return acc;
    },
    {} as Record<string, QuestionQuiz>,
  );

  // TODO: Later update with useDebounceCallback from 'useHooks-ts' when we upgrade the library
  const debouncedHashChange = (hash: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      history.replaceState(null, '', `#${hash}`);

      // Dispatch hashChange event manually to trigger any listeners because replaceState
      // does not trigger it.
      window.dispatchEvent(new Event('hashchange'));

      isUserScroll.current = true;
      setTimeout(() => {
        isUserScroll.current = false;
      }, 100);
    }, 250);
  };

  useEffect(() => {
    // Disable scroll restoration to prevent conflicts with our scrollToIndex
    window.history.scrollRestoration = 'manual';

    return () => {
      // Restore original scroll restoration setting
      window.history.scrollRestoration = 'auto';
    };
  }, []);

  useQuestionsAutoMarkAsComplete(currentQuestion);

  return (
    <QuestionsQuizContentLayout
      initialListType={listType}
      renderQuestionsListTopAddOnItem={({
        listType: questionListType,
        onClick,
        tab,
      }) => {
        if (tab !== 'quiz') {
          return null;
        }

        return (
          <QuestionQuizScrollableListIntroduction
            isActive={isIntroductionSectionInView}
            listType={questionListType}
            onClick={onClick}
          />
        );
      }}>
      <div
        className={clsx(
          'flex flex-col',
          'min-h-[calc(100vh_-_var(--global-sticky-height))]',
        )}>
        <div
          className={clsx(
            'mx-auto w-full',
            'h-full grow overflow-y-hidden',
            'py-8 lg:py-12',
            'px-4 sm:px-6 lg:px-12 min-[1101px]:px-0',
            'w-full min-[1101px]:max-w-[756px] xl:max-w-[864px]',
          )}>
          <QuestionQuizPageHeader
            description={description}
            languageOrFramework={languageOrFramework}
            longDescription={longDescription}
            questionCount={questions.length}
            title={title}
            onEnterViewport={(isInView) => {
              setIsIntroductionSectionInView(isInView);
              if (!isInView) {
                return;
              }
              debouncedHashChange('introduction');
            }}
          />
          <Divider className="my-12" />
          <Section>
            <WindowVirtualizer
              ref={virtuaContainerRef}
              ssrCount={Math.min(questions.length, 40)}
              onScroll={() => {}}>
              {questions.map((question, index) => (
                <div key={question.slug}>
                  <QuestionQuizScrollableListItem
                    question={questionsMap[question.slug]}
                    onEnterViewport={(isInView) => {
                      if (isIntroductionSectionInView || !isInView) {
                        return;
                      }
                      debouncedHashChange(question.slug);
                    }}
                  />
                  {index !== questions.length - 1 && (
                    <Divider className="my-12" />
                  )}
                </div>
              ))}
            </WindowVirtualizer>
          </Section>
        </div>
        <InterviewsStudyListBottomBar
          allowMarkComplete={!isIntroductionSectionInView}
          initialListType={listType}
          leftAddOnItem={
            <QuestionQuizScrollModeToggle
              isScrollModeValue={true}
              slug={currentQuestion.slug}
            />
          }
          listIsShownInSidebarOnDesktop={true}
          metadata={currentQuestion}
          questionTitle={currentQuestion.title}
          slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE={null}
        />
      </div>
    </QuestionsQuizContentLayout>
  );
}
