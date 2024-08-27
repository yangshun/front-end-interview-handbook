import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import EmptyState from '~/components/ui/EmptyState';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBackgroundEmphasized_Hover,
  themeBorderColor,
  themeDivideColor,
  themeTextBrandColor_GroupHover,
  themeTextFaintColor,
  themeTextInvertColor,
} from '~/components/ui/theme';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';
import { hashQuestion } from '~/db/QuestionsUtils';

import QuestionsListItemProgressChip from './QuestionsListItemProgressChip';
import { questionHrefWithList } from '../../common/questionHref';
import type {
  QuestionFramework,
  QuestionMetadata,
} from '../../common/QuestionsTypes';
import { ReadyQuestions } from '../../content/system-design/SystemDesignConfig';
import QuestionDifficultyLabel from '../../metadata/QuestionDifficultyLabel';
import QuestionFrameworks from '../../metadata/QuestionFrameworks';
import QuestionImportanceLabel from '../../metadata/QuestionImportanceLabel';
import QuestionLanguages from '../../metadata/QuestionLanguages';
import QuestionPremiumLabel from '../../metadata/QuestionPremiumLabel';
import QuestionTopics from '../../metadata/QuestionTopics';
import QuestionUsersCompletedLabel from '../../metadata/QuestionUsersCompletedLabel';

type Props<Q extends QuestionMetadata> = Readonly<{
  checkIfCompletedQuestion: (question: Q) => boolean;
  checkIfCompletedQuestionBefore?: (question: Q) => boolean;
  framework?: QuestionFramework;
  listKey?: string;
  mode?: 'default' | 'learning-list';
  onMarkAsCompleted?: (question: Q) => void;
  onMarkAsNotCompleted?: (question: Q) => void;
  primaryLabel?: 'difficulty' | 'importance';
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
      className="size-12 absolute -right-0.5 -top-0.5 overflow-hidden"
      style={{
        clipPath: 'polygon(50% 0, 100% 50%, 100% 100%, 0 100%, 0 0)',
      }}>
      <span
        className={clsx('absolute block', [
          'border-info',
          'border-[9999px] !border-b-transparent !border-l-transparent',
        ])}
      />
      <span
        className={clsx(
          'absolute right-[3px] top-[10px] rotate-45',
          'text-xs font-medium uppercase',
          themeTextInvertColor,
        )}>
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
  primaryLabel = 'difficulty',
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
        'isolate rounded-lg',
        ['divide-y', themeDivideColor],
        ['border', themeBorderColor],
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
              'isolate',
              'group relative flex gap-x-4 px-6 py-4',
              'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
              'transition-colors',
              themeBackgroundCardWhiteOnLightColor,
              themeBackgroundEmphasized_Hover,
              index === 0 && 'rounded-t-lg',
              index === questions.length - 1 && 'rounded-b-lg',
            )}>
            <QuestionNewLabel created={question.created} />
            {showProgress && (
              <QuestionsListItemProgressChip
                className="z-[1]" // Needed for the icon to be above the link.
                hasCompletedQuestion={hasCompletedQuestion}
                hasCompletedQuestionBefore={hasCompletedQuestionBefore}
                index={index}
                mode={mode}
                premiumUser={userProfile?.isInterviewsPremium}
                question={question}
                onMarkAsCompleted={onMarkAsCompleted}
                onMarkAsNotCompleted={onMarkAsNotCompleted}
              />
            )}
            <div className="grow">
              <Text
                className="flex items-center gap-x-2"
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
                {/* TODO: remove hardcoding of "counter" and shift it into metadata */}
                {question.slug === 'counter' && (
                  <Badge
                    label={intl.formatMessage({
                      defaultMessage: 'Warm up question',
                      description: 'Label for warm up questions',
                      id: '/mJXTQ',
                    })}
                    size="sm"
                    variant="warning"
                  />
                )}
                {question.premium && <QuestionPremiumLabel />}
                {question.format === 'system-design' &&
                  !ReadyQuestions.includes(question.slug) && (
                    <Badge
                      label={intl.formatMessage({
                        defaultMessage: 'Coming soon',
                        description: 'Tooltip for Coming Soon questions label',
                        id: '8JoIUN',
                      })}
                      size="sm"
                      variant="warning"
                    />
                  )}
              </Text>
              {question.excerpt && (
                <Text className="mt-1 block" color="secondary" size="body2">
                  {question.excerpt}
                </Text>
              )}
              <div
                className={clsx(
                  'mt-2 flex flex-wrap items-center gap-x-8 gap-y-2',
                  'relative z-10',
                )}>
                <span className="inline-flex">
                  {primaryLabel === 'difficulty' && (
                    <QuestionDifficultyLabel
                      showIcon={true}
                      value={question.difficulty}
                    />
                  )}
                  {primaryLabel === 'importance' && (
                    <QuestionImportanceLabel
                      showIcon={true}
                      value={question.importance}
                    />
                  )}
                </span>
                {question.topics.length > 0 ? (
                  <QuestionTopics topics={question.topics} />
                ) : question.frameworks.length > 0 ? (
                  <QuestionFrameworks frameworks={question.frameworks} />
                ) : (
                  <QuestionLanguages languages={question.languages} />
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
                  'size-6 shrink-0',
                  themeTextFaintColor,
                  themeTextBrandColor_GroupHover,
                )}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
