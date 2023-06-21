import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionsCategorizedProgress } from '~/db/QuestionsUtils';

import QuestionsList from './QuestionsList';
import QuestionsQuizList from './QuestionsQuizList';
import QuestionsFormatTabs from '../filters/QuestionsFormatsTabs';
import type { PreparationPlan } from '../../common/PreparationPlanTypes';
import { sortQuestionsMultiple } from '../../common/QuestionsProcessor';
import type {
  QuestionMetadata,
  QuestionQuizMetadata,
  QuestionUserFacingFormat,
} from '../../common/QuestionsTypes';

export default function QuestionsPlansList({
  progress,
  preparationPlan,
  quizQuestions,
  codingQuestions,
  systemDesignQuestions,
}: Readonly<{
  codingQuestions: ReadonlyArray<QuestionMetadata>;
  preparationPlan: PreparationPlan;
  progress: QuestionsCategorizedProgress;
  quizQuestions: ReadonlyArray<QuestionQuizMetadata>;
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
}>) {
  const [selectedQuestionFormat, setSelectedQuestionFormat] =
    useState<QuestionUserFacingFormat>('coding');

  return (
    <div className="space-y-4 pt-6">
      <Heading className="text-lg font-bold tracking-tight" level="custom">
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
                total:
                  preparationPlan.questions.javascript.length +
                  preparationPlan.questions['user-interface'].length,
              },
              quiz: {
                completed: progress.quiz.size,
                total: quizQuestions.length,
              },
              'system-design': {
                completed: progress['system-design'].size,
                total: preparationPlan.questions['system-design'].length,
              },
            }}
            value={selectedQuestionFormat}
            onSelect={(value) => setSelectedQuestionFormat(value)}
          />
        </div>
        {selectedQuestionFormat === 'quiz' && (
          <QuestionsQuizList
            checkIfCompletedQuestion={(question) =>
              progress.quiz.has(question.slug)
            }
            questions={quizQuestions}
          />
        )}
        {selectedQuestionFormat === 'coding' &&
          (() => {
            const sortedQuestions = sortQuestionsMultiple(
              codingQuestions.filter(
                (question) =>
                  preparationPlan.questions.javascript.includes(
                    question.slug,
                  ) ||
                  preparationPlan.questions['user-interface'].includes(
                    question.slug,
                  ),
              ),
              [
                { field: 'difficulty', isAscendingOrder: true },
                { field: 'premium', isAscendingOrder: true },
              ],
            );

            return (
              <QuestionsList
                checkIfCompletedQuestion={(question) =>
                  progress.javascript.has(question.slug) ||
                  progress['user-interface'].has(question.slug)
                }
                questions={sortedQuestions}
              />
            );
          })()}
        {selectedQuestionFormat === 'system-design' &&
          (() => {
            const sortedQuestions = sortQuestionsMultiple(
              systemDesignQuestions.filter((question) =>
                preparationPlan.questions['system-design'].includes(
                  question.slug,
                ),
              ),
              [{ field: 'ranking', isAscendingOrder: true }],
            );

            return (
              <QuestionsList
                checkIfCompletedQuestion={() => false}
                questions={sortedQuestions}
              />
            );
          })()}
      </Section>
    </div>
  );
}
