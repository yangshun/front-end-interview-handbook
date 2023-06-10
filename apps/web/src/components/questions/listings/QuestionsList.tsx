import clsx from 'clsx';
import { FormattedMessage, useIntl } from 'react-intl';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import EmptyState from '~/components/ui/EmptyState';
import Text from '~/components/ui/Text';
import Tooltip from '~/components/ui/Tooltip';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';
import { hashQuestion } from '~/db/QuestionsUtils';

import QuestionDifficultyLabel from '../common/QuestionDifficultyLabel';
import QuestionFrameworks from '../common/QuestionFrameworks';
import QuestionLanguages from '../common/QuestionLanguages';
import type {
  QuestionFramework,
  QuestionMetadata,
} from '../common/QuestionsTypes';
import QuestionUsersCompletedLabel from '../common/QuestionUsersCompletedLabel';
import { ReadyQuestions } from '../content/system-design/SystemDesignNavigation';

import {
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import { CheckIcon, LockClosedIcon } from '@heroicons/react/24/solid';

type Props<Q extends QuestionMetadata> = Readonly<{
  checkIfCompletedQuestion: (question: Q) => boolean;
  columns?: 1 | 2;
  framework?: QuestionFramework;
  questionCompletionCount?: QuestionCompletionCount;
  questions: ReadonlyArray<Q>;
  showChevron?: boolean;
  showProgress?: boolean;
  showTimeline?: boolean;
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
      <span className="border-brand-600 absolute block h-12 w-12 border-[24px] !border-l-transparent !border-b-transparent" />
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
  framework,
  checkIfCompletedQuestion,
  columns = 1,
  questions,
  questionCompletionCount,
  showChevron = false,
  showTimeline = false,
  showProgress = true,
}: Props<Q>) {
  const { userProfile } = useUserProfile();
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
        'isolate divide-y divide-neutral-200 border border-neutral-200 bg-neutral-200 sm:grid sm:gap-px sm:divide-y-0',
        columns === 2 && 'sm:grid-cols-2',
      )}>
      {questions.map((question, index) => {
        const userCannotViewQuestion =
          question.premium && !userProfile?.isPremium;
        const hasCompletedQuestion = checkIfCompletedQuestion(question);

        return (
          <li
            key={hashQuestion(question.format, question.slug)}
            className={clsx(
              'focus-within:ring-brand-500 group relative flex gap-x-4 bg-white p-4 focus-within:ring-2 focus-within:ring-inset hover:bg-neutral-50',
            )}>
            <QuestionNewLabel created={question.created} />
            {showProgress && (
              <div className="flex items-center justify-center">
                {showTimeline && index < questions.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-14 left-7 z-10 -ml-px h-full w-0.5 bg-neutral-200"></span>
                )}
                <span
                  className={clsx(
                    'z-20 flex h-6 w-6 items-center justify-center rounded-full border-2',
                    userCannotViewQuestion || !hasCompletedQuestion
                      ? 'border-neutral-200 bg-white'
                      : 'border-success bg-success text-white',
                  )}>
                  {question.premium && !userProfile?.isPremium ? (
                    <Tooltip
                      label={intl.formatMessage({
                        defaultMessage: 'Premium',
                        description: 'Tooltip for Premium questions label',
                        id: '55uCRp',
                      })}
                      position="above">
                      <LockClosedIcon
                        aria-hidden={true}
                        className="h-4 w-4 shrink-0 text-neutral-500"
                      />
                    </Tooltip>
                  ) : hasCompletedQuestion ? (
                    <Tooltip
                      label={intl.formatMessage({
                        defaultMessage: 'Completed',
                        description: 'Tooltip for Completed questions label',
                        id: 'aZqFm4',
                      })}
                      position="above">
                      <CheckIcon aria-hidden="true" className="h-4 w-4" />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      label={intl.formatMessage({
                        defaultMessage: 'Not Completed',
                        description:
                          'Tooltip for questions Not Completed label',
                        id: 'm+nWg0',
                      })}
                      position="above">
                      <EllipsisHorizontalIcon
                        aria-hidden={true}
                        className="h-4 w-4 shrink-0 text-neutral-500"
                      />
                    </Tooltip>
                  )}
                </span>
              </div>
            )}
            <div className="grow">
              <p className="flex items-center space-x-2 text-sm font-medium">
                <Anchor
                  className="focus:outline-none"
                  href={
                    // Redirect to framework-specific page if framework prop is provided.
                    question.frameworks.find(
                      ({ framework: frameworkType }) =>
                        frameworkType === framework,
                    )?.href ?? question.href
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
              </p>
              {question.excerpt && (
                <Text
                  className="mt-1"
                  color="secondary"
                  display="block"
                  variant="body2">
                  {question.excerpt}
                </Text>
              )}
              <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-2">
                <span className="inline-flex min-w-[80px]">
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
            {showChevron && (
              <div className="flex items-center justify-center pr-2">
                <ChevronRightIcon
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
