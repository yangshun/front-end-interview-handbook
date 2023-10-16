import clsx from 'clsx';
import {
  RiArrowRightLine,
  RiCheckboxCircleFill,
  RiLockLine,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import EmptyState from '~/components/ui/EmptyState';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasizedHover,
  themeDivideColor,
  themeLineColor,
  themeTextBrandColor,
  themeTextBrandGroupHoverColor,
  themeTextFaintColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';
import { hashQuestion } from '~/db/QuestionsUtils';

import { questionHrefWithList } from '../../common/questionHref';
import type {
  QuestionFramework,
  QuestionMetadata,
} from '../../common/QuestionsTypes';
import { ReadyQuestions } from '../../content/system-design/SystemDesignConfig';
import QuestionDifficultyLabel from '../../metadata/QuestionDifficultyLabel';
import QuestionFrameworks from '../../metadata/QuestionFrameworks';
import QuestionLanguages from '../../metadata/QuestionLanguages';
import QuestionUsersCompletedLabel from '../../metadata/QuestionUsersCompletedLabel';

type Props<Q extends QuestionMetadata> = Readonly<{
  checkIfCompletedQuestion: (question: Q) => boolean;
  checkIfCompletedQuestionBefore?: (question: Q) => boolean;
  framework?: QuestionFramework;
  listKey?: string;
  mode?: 'default' | 'learning-list';
  onMarkAsCompleted?: (question: Q) => void;
  onMarkAsNotCompleted?: (question: Q) => void;
  questionCompletionCount?: QuestionCompletionCount;
  questions: ReadonlyArray<Q>;
  showProgress?: boolean;
}>;

function QuestionNewLabel({
  created,
}: Readonly<{
  created: number;
}>) {
  const currentDate = new Date();
  // One month ago.
  const cutoffDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));

  // Don't show "NEW" label if question was created before cutoff time.
  if (created < cutoffDate.getTime() / 1000) {
    return null;
  }

  return (
    <span
      className="absolute -right-0.5 -top-0.5 h-12 w-12"
      style={{
        clipPath: 'polygon(50% 0, 100% 50%, 100% 100%, 0 100%, 0 0)',
      }}>
      <span className="border-info absolute block h-12 w-12 border-[24px] !border-b-transparent !border-l-transparent" />
      <span className="absolute right-[3px] top-[10px] rotate-45 text-xs font-medium uppercase text-neutral-50 dark:text-black">
        <FormattedMessage
          defaultMessage="New"
          description="Label for new questions ribbon"
          id="3lEE1N"
        />
      </span>
    </span>
  );
}

export default function QuestionsList<Q extends QuestionMetadata>({
  checkIfCompletedQuestion,
  checkIfCompletedQuestionBefore,
  framework,
  listKey,
  questions,
  questionCompletionCount,
  showProgress = true,
  onMarkAsCompleted,
  onMarkAsNotCompleted,
  mode = 'default',
}: Props<Q>) {
  const { userProfile } = useUserProfile();
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
        'isolate rounded-lg',
        ['divide-y', themeDivideColor],
        ['border', themeLineColor],
      )}>
      {questions.map((question, index) => {
        const hasCompletedQuestion = checkIfCompletedQuestion(question);
        const hasCompletedQuestionBefore = checkIfCompletedQuestionBefore
          ? checkIfCompletedQuestionBefore(question)
          : false;
        const progressIndicatorDefaultClass = clsx(
          'inline-flex items-center justify-center',
          'h-8 w-8 rounded-full',
          [themeTextBrandColor, 'font-semibold'],
          'bg-brand-lightest dark:bg-neutral-800',
        );

        return (
          <li
            key={hashQuestion(question.format, question.slug)}
            className={clsx(
              'group relative flex gap-x-4 px-6 py-4',
              'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
              'bg-white dark:bg-neutral-800/40',
              'transition-colors',
              themeBackgroundEmphasizedHover,
              index === 0 && 'rounded-t-lg',
              index === questions.length - 1 && 'rounded-b-lg',
            )}>
            <QuestionNewLabel created={question.created} />
            {showProgress && (
              <div
                className={clsx(
                  'flex items-center justify-center',
                  'z-10', // Needed for the icon to be above the link.
                )}>
                {question.premium && !userProfile?.isPremium ? (
                  <Tooltip
                    alignment="start"
                    label={intl.formatMessage({
                      defaultMessage: 'Premium',
                      description: 'Tooltip for Premium questions label',
                      id: '55uCRp',
                    })}
                    position="above">
                    <span
                      className={clsx(
                        'flex h-8 w-8 items-center justify-center rounded-full',
                        'shiny',
                        'bg-brand-dark dark:bg-brand/20',
                      )}>
                      <RiLockLine
                        aria-hidden={true}
                        className="h-4 w-4 shrink-0 text-white"
                      />
                    </span>
                  </Tooltip>
                ) : hasCompletedQuestion ? (
                  mode === 'default' ? (
                    <Tooltip
                      alignment="start"
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
                          'text-success dark:text-success-light',
                        )}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      alignment="start"
                      label={intl.formatMessage({
                        defaultMessage: 'Mark as not completed',
                        description: 'Tooltip to mark a button as incomplete',
                        id: 'pmgCza',
                      })}
                      position="above">
                      <button
                        aria-label={intl.formatMessage({
                          defaultMessage: 'Mark as not completed',
                          description: 'Tooltip to mark a button as incomplete',
                          id: 'pmgCza',
                        })}
                        type="button"
                        onClick={() => {
                          onMarkAsNotCompleted?.(question);
                        }}>
                        <RiCheckboxCircleFill
                          aria-hidden="true"
                          className={clsx(
                            'h-8 w-8 scale-110',
                            'transition-colors',
                            'text-success hover:text-success-dark',
                            'dark:text-success-light dark:hover:text-success-lighter',
                          )}
                        />
                      </button>
                    </Tooltip>
                  )
                ) : hasCompletedQuestionBefore ? (
                  <Tooltip
                    alignment="start"
                    label={intl.formatMessage({
                      defaultMessage: 'Solved previously, mark as completed',
                      description: 'Label for questions solved in the past',
                      id: 'ghmPBf',
                    })}
                    position="above">
                    <button
                      aria-label={intl.formatMessage({
                        defaultMessage: 'Solved previously, mark as completed',
                        description: 'Label for questions solved in the past',
                        id: 'ghmPBf',
                      })}
                      className={clsx(
                        progressIndicatorDefaultClass,
                        'hover:opacity-60',
                        'border-success border border-dashed',
                      )}
                      type="button"
                      onClick={() => onMarkAsCompleted?.(question)}>
                      {index + 1}
                    </button>
                  </Tooltip>
                ) : (
                  <Tooltip
                    alignment="start"
                    label={intl.formatMessage({
                      defaultMessage: 'Not completed',
                      description: 'Tooltip for questions Not Completed label',
                      id: 'xAtvsP',
                    })}
                    position="above">
                    {mode === 'default' && (
                      <span
                        className={clsx(
                          'flex h-8 w-8 items-center justify-center rounded-full',
                          [
                            'border',
                            'border-neutral-300 dark:border-neutral-700',
                          ],
                          'bg-neutral-100 dark:bg-neutral-900',
                        )}
                      />
                    )}
                    {mode === 'learning-list' && (
                      <span className={progressIndicatorDefaultClass}>
                        {index + 1}
                      </span>
                    )}
                  </Tooltip>
                )}
              </div>
            )}
            <div className="grow">
              <Text
                className="items-center gap-x-2"
                display="flex"
                size="body2"
                weight="medium">
                <Anchor
                  className="focus:outline-none"
                  href={
                    // Redirect to framework-specific page if framework prop is provided.
                    questionHrefWithList(
                      question.frameworks.find(
                        ({ framework: frameworkType }) =>
                          frameworkType === framework,
                      )?.href ?? question.href,
                      listKey,
                    )
                  }
                  variant="unstyled">
                  {/* Extend touch target to entire panel */}
                  <span aria-hidden="true" className="absolute inset-0" />
                  {question.title}
                </Anchor>
                {question.slug === 'counter' && (
                  <Badge
                    label={intl.formatMessage({
                      defaultMessage: 'Warm Up Question',
                      description: 'Label for warm up questions',
                      id: '32cQk/',
                    })}
                    size="sm"
                    variant="warning"
                  />
                )}
                {question.format === 'system-design' &&
                  !ReadyQuestions.includes(question.slug) && (
                    <Badge
                      label={intl.formatMessage({
                        defaultMessage: 'Coming Soon',
                        description: 'Tooltip for Coming Soon questions label',
                        id: 'kEhkCv',
                      })}
                      size="sm"
                      variant="warning"
                    />
                  )}
              </Text>
              {question.excerpt && (
                <Text
                  className="mt-1"
                  color="secondary"
                  display="block"
                  size="body2">
                  {question.excerpt}
                </Text>
              )}
              <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-2">
                <span className="inline-flex">
                  <QuestionDifficultyLabel
                    showIcon={true}
                    value={question.difficulty}
                  />
                </span>
                {question.frameworks.length === 0 ? (
                  <QuestionLanguages languages={question.languages} />
                ) : (
                  <QuestionFrameworks frameworks={question.frameworks} />
                )}
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
                className={clsx(
                  'h-6 w-6 shrink-0',
                  themeTextFaintColor,
                  themeTextBrandGroupHoverColor,
                )}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}