import clsx from 'clsx';
import { RiArrowRightLine, RiCheckboxCircleFill } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import EmptyState from '~/components/ui/EmptyState';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasizedHover,
  themeDivideColor,
  themeLineColor,
  themeTextFaintColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

import { questionHrefWithList } from '../../common/questionHref';
import QuestionImportanceLabel from '../../common/QuestionImportanceLabel';
import QuestionQuizTopics from '../../common/QuestionQuizTopics';
import type { QuestionQuizMetadata } from '../../common/QuestionsTypes';
import QuestionUsersCompletedLabel from '../../common/QuestionUsersCompletedLabel';

type Props<Q extends QuestionQuizMetadata> = Readonly<{
  checkIfCompletedQuestion: (question: Q) => boolean;
  listKey?: string;
  questionCompletionCount?: QuestionCompletionCount;
  questions: ReadonlyArray<Q>;
  showProgress?: boolean;
}>;

export default function QuestionsQuizList<Q extends QuestionQuizMetadata>({
  checkIfCompletedQuestion,
  listKey,
  questions,
  questionCompletionCount,
  showProgress = true,
}: Props<Q>) {
  const intl = useIntl();

  if (questions.length === 0) {
    return (
      <div className={clsx('border p-10', themeLineColor)}>
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
        'isolate overflow-clip rounded-lg',
        ['divide-y', themeDivideColor],
        ['border', themeLineColor],
      )}
      role="list">
      {questions.map((question, index) => {
        const hasCompletedQuestion = checkIfCompletedQuestion(question);

        return (
          <li
            key={question.slug}
            className={clsx(
              'group relative flex gap-x-4 px-6 py-4',
              'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
              'bg-white dark:bg-neutral-800/40',
              themeBackgroundEmphasizedHover,
              index === 0 && 'rounded-t-lg',
              index === questions.length - 1 && 'rounded-b-lg',
            )}>
            {showProgress && (
              <div className="flex items-center justify-center">
                {hasCompletedQuestion ? (
                  <Tooltip
                    label={intl.formatMessage({
                      defaultMessage: 'Completed',
                      description: 'Tooltip for Completed questions label',
                      id: 'aZqFm4',
                    })}
                    position="above">
                    <RiCheckboxCircleFill
                      aria-hidden="true"
                      className={clsx(
                        'h-8 w-8 scale-110',
                        'text-success',
                        'z-10', // Needed for the icon to be above the link.
                      )}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip
                    label={intl.formatMessage({
                      defaultMessage: 'Not Completed',
                      description: 'Tooltip for questions Not Completed label',
                      id: 'm+nWg0',
                    })}
                    position="above">
                    <span
                      className={clsx(
                        'flex h-8 w-8 items-center justify-center rounded-full',
                        'z-10', // Needed for the icon to be above the link.
                        ['border', themeLineColor],
                        'bg-neutral-100 dark:bg-neutral-900',
                      )}
                    />
                  </Tooltip>
                )}
              </div>
            )}
            <div className="grow">
              <Text display="block" size="body2" weight="medium">
                <Anchor
                  className="block focus:outline-none"
                  href={questionHrefWithList(question.href, listKey)}
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
                  size="body2">
                  {question.subtitle}
                </Text>
              )}
              <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-2">
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
            <div className="flex items-center justify-center">
              <RiArrowRightLine
                aria-hidden="true"
                className={clsx('h-6 w-6 shrink-0', themeTextFaintColor)}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
