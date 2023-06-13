import clsx from 'clsx';
import { RiArrowRightSLine, RiCheckLine, RiMoreLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import EmptyState from '~/components/ui/EmptyState';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBackgroundEmphasizedHover,
  themeDivideColor,
  themeLineColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

import QuestionImportanceLabel from '../common/QuestionImportanceLabel';
import QuestionQuizTopics from '../common/QuestionQuizTopics';
import type { QuestionQuizMetadata } from '../common/QuestionsTypes';
import QuestionUsersCompletedLabel from '../common/QuestionUsersCompletedLabel';

type Props<Q extends QuestionQuizMetadata> = Readonly<{
  checkIfCompletedQuestion: (question: Q) => boolean;
  questionCompletionCount?: QuestionCompletionCount;
  questions: ReadonlyArray<Q>;
  showChevron?: boolean;
  showProgress?: boolean;
  showTimeline?: boolean;
}>;

export default function QuestionsQuizList<Q extends QuestionQuizMetadata>({
  checkIfCompletedQuestion,
  questions,
  questionCompletionCount,
  showChevron = false,
  showTimeline = false,
  showProgress = true,
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
        'isolate divide-y border',
        themeLineColor,
        themeDivideColor,
      )}
      role="list">
      {questions.map((question, index) => {
        const hasCompletedQuestion = checkIfCompletedQuestion(question);

        return (
          <li
            key={question.slug}
            className={clsx(
              'focus-within:ring-brand group relative flex gap-x-4 px-4 py-4 focus-within:ring-2 focus-within:ring-inset',
              themeBackgroundColor,
              themeBackgroundEmphasizedHover,
            )}>
            {showProgress && (
              <div className="flex items-center justify-center">
                {showTimeline && index < questions.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-12 left-7 z-10 -ml-px h-full w-0.5 bg-neutral-200"></span>
                )}
                <span
                  className={clsx(
                    'z-20 flex h-6 w-6 items-center justify-center rounded-full border-2',
                    hasCompletedQuestion
                      ? 'border-green bg-green text-white'
                      : clsx(themeLineColor, themeBackgroundColor),
                  )}>
                  {hasCompletedQuestion ? (
                    <Tooltip
                      label={intl.formatMessage({
                        defaultMessage: 'Completed',
                        description:
                          'Label for completed status on quiz questions list',
                        id: 'fIu2R9',
                      })}
                      position="above">
                      <RiCheckLine
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0"
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      label={intl.formatMessage({
                        defaultMessage: 'Not Completed',
                        description:
                          'Label for Not completed status on quiz questions list',
                        id: 'bTsT6Y',
                      })}
                      position="above">
                      <RiMoreLine
                        aria-hidden={true}
                        className="h-4 w-4 shrink-0 text-neutral-500"
                      />
                    </Tooltip>
                  )}
                </span>
              </div>
            )}
            <div className="grow">
              <Text display="block" variant="body2" weight="medium">
                <Anchor
                  className="block focus:outline-none"
                  href={question.href}
                  variant="unstyled">
                  {/* Extend touch target to entire panel */}
                  <span aria-hidden="true" className="absolute inset-0" />
                  <span className="line-clamp-2 flex items-center">
                    {question.title}
                  </span>
                </Anchor>
              </Text>
              {question.subtitle && (
                <Text
                  className="mt-1"
                  color="secondary"
                  display="block"
                  variant="body2">
                  {question.subtitle}
                </Text>
              )}
              <div className="mt-2 flex items-center gap-x-8">
                <QuestionImportanceLabel
                  showIcon={true}
                  value={question.importance}
                />
                <QuestionQuizTopics topics={question.topics} />
                {(() => {
                  const count =
                    questionCompletionCount?.[question.format]?.[question.slug];

                  if (count == null) {
                    return null;
                  }

                  return (
                    <QuestionUsersCompletedLabel
                      count={count}
                      isLoading={false}
                      showIcon={true}
                    />
                  );
                })()}
              </div>
            </div>
            {showChevron && (
              <div className="flex items-center justify-center pr-2">
                <RiArrowRightSLine
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-neutral-800 "
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
