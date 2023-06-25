import clsx from 'clsx';
import {
  RiArrowRightLine,
  RiCheckboxCircleFill,
  RiCheckboxCircleLine,
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
  themeTextBrandGroupHoverColor,
  themeTextFaintColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';
import { hashQuestion } from '~/db/QuestionsUtils';

import QuestionDifficultyLabel from '../../common/QuestionDifficultyLabel';
import QuestionFrameworks from '../../common/QuestionFrameworks';
import { questionHrefWithList } from '../../common/questionHref';
import QuestionLanguages from '../../common/QuestionLanguages';
import type {
  QuestionFramework,
  QuestionMetadata,
} from '../../common/QuestionsTypes';
import QuestionUsersCompletedLabel from '../../common/QuestionUsersCompletedLabel';
import { ReadyQuestions } from '../../content/system-design/SystemDesignConfig';

type Props<Q extends QuestionMetadata> = Readonly<{
  checkIfCompletedQuestion: (question: Q) => boolean;
  checkIfCompletedQuestionBefore?: (question: Q) => boolean;
  framework?: QuestionFramework;
  listKey?: string;
  questionCompletionCount?: QuestionCompletionCount;
  questions: ReadonlyArray<Q>;
  showProgress?: boolean;
}>;

function QuestionTag({
  question,
}: Readonly<{
  question: QuestionMetadata;
}>) {
  const intl = useIntl();

  // TODO: Ugly hack to render special tags for certain questions.
  if (question.slug === 'counter') {
    return (
      <Badge
        label={intl.formatMessage({
          defaultMessage: 'Warm Up Question',
          description: 'Label for warm up questions',
          id: '32cQk/',
        })}
        size="sm"
        variant="warning"
      />
    );
  }

  if (question.premium) {
    return (
      <Badge
        label={intl.formatMessage({
          defaultMessage: 'Premium',
          description: 'Label for premium questions',
          id: 'YB06jW',
        })}
        size="sm"
        variant="primary"
      />
    );
  }

  return (
    <Badge
      label={intl.formatMessage({
        defaultMessage: 'Free',
        description: 'Label for free questions',
        id: 'Tc2C+b',
      })}
      size="sm"
      variant="success"
    />
  );
}

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
    <span className="absolute right-0 top-0 h-12 w-12">
      <span className="border-brand-dark absolute block h-12 w-12 border-[24px] !border-l-transparent !border-b-transparent" />
      <span className="text-2xs absolute right-1 top-2 rotate-45 font-medium uppercase text-white">
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
        'isolate overflow-clip rounded-lg',
        ['divide-y', themeDivideColor],
        ['border', themeLineColor],
      )}>
      {questions.map((question, index) => {
        const hasCompletedQuestion = checkIfCompletedQuestion(question);
        const hasCompletedQuestionBefore = checkIfCompletedQuestionBefore
          ? checkIfCompletedQuestionBefore(question)
          : false;

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
                    label={intl.formatMessage({
                      defaultMessage: 'Premium',
                      description: 'Tooltip for Premium questions label',
                      id: '55uCRp',
                    })}
                    position="above">
                    <span
                      className={clsx(
                        'flex h-8 w-8 items-center justify-center rounded-full border',
                        themeLineColor,
                        'bg-neutral-100 dark:bg-neutral-900',
                      )}>
                      <RiLockLine
                        aria-hidden={true}
                        className="h-4 w-4 shrink-0 text-neutral-500"
                      />
                    </span>
                  </Tooltip>
                ) : hasCompletedQuestion ? (
                  <Tooltip
                    label={intl.formatMessage({
                      defaultMessage: 'Completed',
                      description: 'Tooltip for Completed questions label',
                      id: 'aZqFm4',
                    })}
                    position="above">
                    <RiCheckboxCircleFill
                      aria-hidden="true"
                      className={clsx('h-8 w-8 scale-110', 'text-success')}
                    />
                  </Tooltip>
                ) : hasCompletedQuestionBefore ? (
                  <Tooltip
                    label={intl.formatMessage({
                      defaultMessage: 'Past solved',
                      description: 'Label for questions solved in the past',
                      id: 'txBBg4',
                    })}
                    position="above">
                    <RiCheckboxCircleLine
                      aria-hidden="true"
                      className={clsx('h-8 w-8 scale-110', 'text-neutral-500')}
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
                        ['border', themeLineColor],
                        'bg-neutral-100 dark:bg-neutral-900',
                      )}
                    />
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
                {!userProfile?.isPremium && <QuestionTag question={question} />}
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
