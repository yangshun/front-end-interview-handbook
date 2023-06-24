import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import QuestionsCodingListWithFilters from '~/components/questions/listings/items/QuestionsCodingListWithFilters';
import QuestionsQuizListWithFilters from '~/components/questions/listings/items/QuestionsQuizListWithFilters';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionsCategorizedProgress } from '~/db/QuestionsUtils';

import QuestionsList from './QuestionsList';
import QuestionsFormatTabs from '../filters/QuestionsFormatsTabs';
import useQuestionsWithListProgressStatus from '../useQuestionsWithListProgressStatus';
import { sortQuestionsMultiple } from '../../common/QuestionsProcessor';
import type {
  QuestionMetadata,
  QuestionQuizMetadata,
  QuestionUserFacingFormat,
} from '../../common/QuestionsTypes';

export default function QuestionsPlansList({
  listKey,
  progress,
  quizQuestions,
  codingQuestions,
  systemDesignQuestions,
}: Readonly<{
  codingQuestions: ReadonlyArray<QuestionMetadata>;
  listKey: string;
  progress: QuestionsCategorizedProgress;
  quizQuestions: ReadonlyArray<QuestionQuizMetadata>;
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
}>) {
  const [selectedQuestionFormat, setSelectedQuestionFormat] =
    useState<QuestionUserFacingFormat>('coding');

  const quizQuestionsWithProgress = useQuestionsWithListProgressStatus(
    listKey,
    quizQuestions,
  );
  const codingQuestionsWithProgress = useQuestionsWithListProgressStatus(
    listKey,
    codingQuestions,
  );

  return (
    <div className="flex flex-col gap-y-6">
      <Heading className="sr-only" level="custom">
        <FormattedMessage
          defaultMessage="All Practice Questions"
          description="Header for all practice questions section in study plans"
          id="zo65Ck"
        />
      </Heading>
      <Section>
        <div className="w-full overflow-x-auto">
          <QuestionsFormatTabs
            progressSummary={{
              coding: {
                completed:
                  progress.javascript.size + progress['user-interface'].size,
                total: codingQuestions.length,
              },
              quiz: {
                completed: progress.quiz.size,
                total: quizQuestions.length,
              },
              'system-design': {
                completed: progress['system-design'].size,
                total: systemDesignQuestions.length,
              },
            }}
            value={selectedQuestionFormat}
            onSelect={(value) => setSelectedQuestionFormat(value)}
          />
        </div>
        {selectedQuestionFormat === 'quiz' && (
          <QuestionsQuizListWithFilters
            listKey={listKey}
            questions={quizQuestionsWithProgress}
          />
        )}
        {selectedQuestionFormat === 'coding' &&
          (() => {
            const sortedQuestions = sortQuestionsMultiple(
              codingQuestionsWithProgress,
              [
                { field: 'difficulty', isAscendingOrder: true },
                { field: 'premium', isAscendingOrder: true },
              ],
            );

            return (
              <QuestionsCodingListWithFilters
                listKey={listKey}
                questions={sortedQuestions}
              />
            );
          })()}
        {selectedQuestionFormat === 'system-design' &&
          (() => {
            const sortedQuestions = sortQuestionsMultiple(
              systemDesignQuestions,
              [{ field: 'ranking', isAscendingOrder: true }],
            );

            return (
              <QuestionsList
                checkIfCompletedQuestion={() => false}
                listKey={listKey}
                questions={sortedQuestions}
              />
            );
          })()}
      </Section>
    </div>
  );
}
