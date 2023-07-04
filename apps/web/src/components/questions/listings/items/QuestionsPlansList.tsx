import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import QuestionsCodingListWithFilters from '~/components/questions/listings/items/QuestionsCodingListWithFilters';
import QuestionsQuizListWithFilters from '~/components/questions/listings/items/QuestionsQuizListWithFilters';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionsCategorizedProgress } from '~/db/QuestionsUtils';

import QuestionsList from './QuestionsList';
import QuestionsFormatTabs from '../filters/QuestionsFormatsTabs';
import useQuestionsWithListProgressStatus from '../filters/hooks/useQuestionsWithListProgressStatus';
import { sortQuestionsMultiple } from '../filters/QuestionsProcessor';
import type {
  QuestionMetadata,
  QuestionQuizMetadata,
  QuestionUserFacingFormat,
} from '../../common/QuestionsTypes';

export default function QuestionsPlansList({
  listKey,
  sessionProgress,
  quizQuestions,
  codingQuestions,
  systemDesignQuestions,
  overallProgress,
}: Readonly<{
  codingQuestions: ReadonlyArray<QuestionMetadata>;
  listKey: string;
  overallProgress: QuestionsCategorizedProgress;
  quizQuestions: ReadonlyArray<QuestionQuizMetadata>;
  sessionProgress: QuestionsCategorizedProgress;
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
  const systemDesignQuestionsWithProgress = useQuestionsWithListProgressStatus(
    listKey,
    systemDesignQuestions,
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
                  sessionProgress.javascript.size +
                  sessionProgress['user-interface'].size,
                total: codingQuestions.length,
              },
              quiz: {
                completed: sessionProgress.quiz.size,
                total: quizQuestions.length,
              },
              'system-design': {
                completed: sessionProgress['system-design'].size,
                total: systemDesignQuestions.length,
              },
            }}
            value={selectedQuestionFormat}
            onSelect={(value) => setSelectedQuestionFormat(value)}
          />
        </div>
        {selectedQuestionFormat === 'quiz' && (
          <QuestionsQuizListWithFilters
            checkIfCompletedQuestionBefore={(question) =>
              overallProgress[question.format].has(question.slug)
            }
            listKey={listKey}
            namespace={`${listKey}-quiz`}
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
                checkIfCompletedQuestionBefore={(question) =>
                  overallProgress[question.format].has(question.slug)
                }
                listKey={listKey}
                namespace={`${listKey}-coding`}
                questions={sortedQuestions}
              />
            );
          })()}
        {selectedQuestionFormat === 'system-design' &&
          (() => {
            const sortedQuestions = sortQuestionsMultiple(
              systemDesignQuestionsWithProgress,
              [{ field: 'ranking', isAscendingOrder: true }],
            );

            return (
              <QuestionsList
                checkIfCompletedQuestion={(question) => question.isCompleted}
                checkIfCompletedQuestionBefore={(question) =>
                  overallProgress[question.format].has(question.slug)
                }
                listKey={listKey}
                questions={sortedQuestions}
              />
            );
          })()}
      </Section>
    </div>
  );
}
