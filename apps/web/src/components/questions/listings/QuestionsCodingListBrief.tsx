import clsx from 'clsx';
import { useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import EmptyState from '~/components/ui/EmptyState';

import { hashQuestion } from '~/db/QuestionsUtils';

import QuestionDifficultyLabel from '../common/QuestionDifficultyLabel';
import type { QuestionMetadata } from '../common/QuestionsTypes';

import { CheckIcon } from '@heroicons/react/24/solid';
type Props<Q extends QuestionMetadata> = Readonly<{
  checkIfCompletedQuestion?: (question: Q) => boolean;
  questions: ReadonlyArray<Q>;
}>;

export default function QuestionsCodingListBrief<Q extends QuestionMetadata>({
  checkIfCompletedQuestion,
  questions,
}: Props<Q>) {
  const intl = useIntl();

  if (questions.length === 0) {
    return (
      <div className="border border-neutral-200 p-10">
        <EmptyState
          subtitle={intl.formatMessage({
            defaultMessage: 'Try changing the filters',
            description:
              'Subtitle for empty state when no questions are returned from application of filters on quiz questions list',
            id: 'am2rVD',
          })}
          title={intl.formatMessage({
            defaultMessage: 'No questions',
            description:
              'Title for empty state when application of filters return no results',
            id: 'AmBMf9',
          })}
          variant="empty"
        />
      </div>
    );
  }

  return (
    <ul
      className={clsx(
        'isolate divide-y divide-neutral-200 overflow-hidden border border-neutral-200 bg-neutral-200 sm:grid sm:gap-px sm:divide-y-0',
      )}>
      {questions.map((question) => {
        const hasCompletedQuestion = checkIfCompletedQuestion?.(question);

        return (
          <li
            key={hashQuestion(question.format, question.slug)}
            className={clsx(
              'focus-within:ring-brand-500 group relative flex space-x-6 bg-white p-3 focus-within:ring-2 focus-within:ring-inset hover:bg-neutral-50',
            )}>
            <div className="flex grow items-center justify-between">
              <div className="flex items-center space-x-4">
                {checkIfCompletedQuestion != null && (
                  <span
                    className={clsx(
                      'z-20 flex h-6 w-6 items-center justify-center rounded-full border-2',
                      hasCompletedQuestion
                        ? 'border-success bg-success text-white'
                        : 'border-neutral-200 bg-white',
                    )}>
                    {hasCompletedQuestion && (
                      <CheckIcon aria-hidden="true" className="h-4 w-4" />
                    )}
                  </span>
                )}
                <p className="flex items-center space-x-2 text-xs font-medium">
                  <Anchor
                    className="focus:outline-none"
                    href={question.href}
                    variant="unstyled">
                    {/* Extend touch target to entire panel */}
                    <span aria-hidden="true" className="absolute inset-0" />
                    {question.title}
                  </Anchor>
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <QuestionDifficultyLabel value={question.difficulty} />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
