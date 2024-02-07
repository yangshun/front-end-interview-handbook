import clsx from 'clsx';
import { RiCheckLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import EmptyState from '~/components/ui/EmptyState';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasized_Hover,
  themeBorderColor,
  themeDivideColor,
} from '~/components/ui/theme';

import { hashQuestion } from '~/db/QuestionsUtils';

import type { QuestionMetadata } from '../../common/QuestionsTypes';
import QuestionDifficultyLabel from '../../metadata/QuestionDifficultyLabel';

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
      <div className={clsx('border p-10', themeBorderColor)}>
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
        'isolate divide-y overflow-hidden rounded-md border sm:grid',
        themeBorderColor,
        themeDivideColor,
      )}>
      {questions.map((question) => {
        const hasCompletedQuestion = checkIfCompletedQuestion?.(question);

        return (
          <li
            key={hashQuestion(question.format, question.slug)}
            className={clsx(
              'focus-within:ring-brand group relative flex gap-x-6 p-3 focus-within:ring-2 focus-within:ring-inset',
              themeBackgroundEmphasized_Hover,
            )}>
            <div className="flex grow items-center justify-between">
              <div className="flex items-center space-x-4">
                {checkIfCompletedQuestion != null && (
                  <span
                    className={clsx(
                      'z-20 flex size-6 items-center justify-center rounded-full border-2',
                      hasCompletedQuestion
                        ? 'border-success bg-success text-white'
                        : themeBorderColor,
                    )}>
                    {hasCompletedQuestion && (
                      <RiCheckLine aria-hidden="true" className="size-4" />
                    )}
                  </span>
                )}
                <Text
                  className="items-center gap-x-2"
                  display="flex"
                  size="body3"
                  weight="medium">
                  <Anchor
                    className="focus:outline-none"
                    href={question.href}
                    variant="unstyled">
                    {/* Extend touch target to entire panel */}
                    <span aria-hidden="true" className="absolute inset-0" />
                    {question.title}
                  </Anchor>
                </Text>
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
