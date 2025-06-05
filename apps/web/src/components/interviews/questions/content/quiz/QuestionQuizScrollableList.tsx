'use client';

import clsx from 'clsx';
import type { InterviewsQuestionQuizScrollableContent } from 'contentlayer/generated';
import { useEffect, useRef, useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';
import type { VListHandle } from 'virtua';
import { WindowVirtualizer } from 'virtua';

import { useEnterViewport } from '~/hooks/useEnterViewport';
import useHashChange from '~/hooks/useHashChange';

import { useAuthActiveEngagementPoints } from '~/components/auth/auth-points';
import type {
  QuestionFramework,
  QuestionLanguage,
  QuestionListTypeData,
  QuestionQuiz,
} from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsQuizContentLayout from '~/components/interviews/questions/content/quiz/QuestionsQuizContentLayout';
import useQuestionCodingSorting from '~/components/interviews/questions/listings/filters/hooks/useQuestionCodingSorting';
import useQuestionUnifiedFilters from '~/components/interviews/questions/listings/filters/hooks/useQuestionUnifiedFilters';
import {
  filterQuestions,
  sortQuestionsMultiple,
} from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import useQuestionsWithCompletionStatus from '~/components/interviews/questions/listings/items/useQuestionsWithCompletionStatus';
import InterviewsStudyListBottomBar from '~/components/interviews/questions/listings/study-list/InterviewsStudyListBottomBar';
import Divider from '~/components/ui/Divider';

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
  const currentHash = useHashChange();
  const virtuaContainerRef = useRef<VListHandle>(null);
  const [isIntroductionSectionInView, setIsIntroductionSectionInView] =
    useState(false);

  const isUserScroll = useRef(false);

  const questionsWithCompletionStatus =
    useQuestionsWithCompletionStatus(questionsList);

  const { filters } = useQuestionUnifiedFilters({
    listType,
  });

  // Sorting.
  const { sortFields } = useQuestionCodingSorting({
    listType,
  });

  // Processing.
  const sortedQuestions = sortQuestionsMultiple(
    questionsWithCompletionStatus,
    sortFields,
  );

  const questions = filterQuestions(
    sortedQuestions,
    filters.map(([_, filterFn]) => filterFn),
  );

  const currentQuestionIndex = questions.findIndex(
    (question) => currentHash?.substring(1) === question.metadata.slug,
  );
  const questionIndex = currentQuestionIndex === -1 ? 0 : currentQuestionIndex;

  useEffect(() => {
    // Don't scroll to current question if hash change is triggered by user scrolling
    if (currentQuestionIndex === -1 || isUserScroll.current) {
      return;
    }

    virtuaContainerRef.current?.scrollToIndex(currentQuestionIndex, {
      offset: -100,
    });
  }, [currentQuestionIndex, currentHash]);

  const currentQuestion = questions[questionIndex];

  const debouncedHashChange = useDebounceCallback((hash) => {
    window.location.hash = `#${hash}`;

    isUserScroll.current = true;
    setTimeout(() => {
      isUserScroll.current = false;
    }, 100);
  }, 250);

  useQuestionsAutoMarkAsComplete(currentQuestion.metadata);
  useAuthActiveEngagementPoints({
    entityId: currentQuestion.metadata.slug,
    entityType: 'quiz',
  });

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
            'py-8 xl:py-12',
            'px-4 sm:px-6 xl:px-0',
            'w-full max-w-[864px]',
          )}>
          <div className="mb-3 hidden justify-end lg:flex">
            <QuestionQuizScrollModeToggle
              isScrollModeValue={true}
              slug={currentQuestion.metadata.slug}
            />
          </div>
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
          <WindowVirtualizer
            ref={virtuaContainerRef}
            ssrCount={questions.length}
            onScroll={() => {}}>
            {questions.map((question, index) => (
              <div key={question.metadata.slug}>
                <QuestionQuizScrollableListItem
                  question={question}
                  onEnterViewport={(isInView) => {
                    if (isIntroductionSectionInView || !isInView) {
                      return;
                    }
                    debouncedHashChange(question.metadata.slug);
                  }}
                />
                {index !== questions.length - 1 && (
                  <Divider className="my-16" />
                )}
              </div>
            ))}
          </WindowVirtualizer>
        </div>
        <InterviewsStudyListBottomBar
          allowMarkComplete={!isIntroductionSectionInView}
          initialListType={listType}
          listIsShownInSidebarOnDesktop={true}
          metadata={currentQuestion.metadata}
          questionTitle={currentQuestion.info.title}
        />
      </div>
    </QuestionsQuizContentLayout>
  );
}
