'use client';

import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { useDebounceCallback } from 'usehooks-ts';
import type { VListHandle } from 'virtua';
import { WindowVirtualizer } from 'virtua';

import { useEnterViewport } from '~/hooks/useEnterViewport';
import useHashChange from '~/hooks/useHashChange';

import type {
  QuestionListTypeData,
  QuestionQuiz,
} from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionCodingSorting from '~/components/interviews/questions/listings/filters/hooks/useQuestionCodingSorting';
import useQuestionUnifiedFilters from '~/components/interviews/questions/listings/filters/hooks/useQuestionUnifiedFilters';
import {
  filterQuestions,
  sortQuestionsMultiple,
} from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import useQuestionsWithCompletionStatus from '~/components/interviews/questions/listings/items/useQuestionsWithCompletionStatus';
import InterviewsStudyListBottomBar from '~/components/interviews/questions/listings/study-list/InterviewsStudyListBottomBar';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';

import QuestionQuizItem from './QuestionQuizItem';

type Props = Readonly<{
  listType: QuestionListTypeData;
  questionsList: ReadonlyArray<QuestionQuiz>;
}>;

function QuestionQuizScrollableListItem({
  onEnterViewport,
  question,
}: {
  onEnterViewport: () => void;
  question: QuestionQuiz;
}) {
  const ref = useEnterViewport(() => {
    onEnterViewport();
  });

  return <QuestionQuizItem ref={ref} question={question} />;
}

export default function QuestionQuizScrollableList({
  listType,
  questionsList,
}: Props) {
  const currentHash = useHashChange();
  const virtuaContainerRef = useRef<VListHandle>(null);

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

  return (
    <div
      className={clsx(
        'flex flex-col',
        'min-h-[calc(100vh_-_var(--global-sticky-height))]',
      )}>
      <Container
        className={clsx(
          'h-full grow overflow-y-hidden',
          'py-6 lg:py-8 xl:py-12',
        )}
        width="4xl">
        <WindowVirtualizer
          ref={virtuaContainerRef}
          ssrCount={questions.length}
          onScroll={() => {}}>
          {questions.map((question, index) => (
            <div key={question.metadata.slug}>
              <QuestionQuizScrollableListItem
                question={question}
                onEnterViewport={() => {
                  debouncedHashChange(question.metadata.slug);
                }}
              />
              {index !== questions.length - 1 && <Divider className="my-16" />}
            </div>
          ))}
        </WindowVirtualizer>
      </Container>
      <InterviewsStudyListBottomBar
        listIsShownInSidebarOnDesktop={true}
        metadata={currentQuestion.metadata}
      />
    </div>
  );
}
