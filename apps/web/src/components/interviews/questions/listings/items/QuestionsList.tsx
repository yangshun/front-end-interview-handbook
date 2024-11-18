import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import { useIntl } from '~/components/intl';
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
import QuestionFormatLabel from '../../metadata/QuestionFormatLabel';
import QuestionFrameworks from '../../metadata/QuestionFrameworks';
import QuestionImportanceLabel from '../../metadata/QuestionImportanceLabel';
import QuestionLanguages from '../../metadata/QuestionLanguages';
import QuestionNewLabel from '../../metadata/QuestionNewLabel';
import QuestionTopics from '../../metadata/QuestionTopics';
import QuestionUsersCompletedLabel from '../../metadata/QuestionUsersCompletedLabel';
import InterviewsPremiumBadge from '../../../common/InterviewsPremiumBadge';

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
  showArrowRight?: boolean;
  showOverlayAtLastItem?: boolean;
  showProgress?: boolean;
}>;

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
  showOverlayAtLastItem,
  showArrowRight = true,
  mode = 'default',
}: Props<Q>) {
  const { userProfile } = useUserProfile();
  const intl = useIntl();

  if (questions.length === 0) {
    return (
      <div className={clsx('border p-10', themeBorderColor)}>
        <EmptyState
          subtitle={intl.formatMessage({
            defaultMessage: 'Try changing your search terms or filters',
            description:
              'Subtitle for empty state when no questions are returned from application of filters on quiz questions list',
            id: '62sNHV',
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
      {questions.map((questionMetadata, index) => {
        const hasCompletedQuestion = checkIfCompletedQuestion(questionMetadata);
        const hasCompletedQuestionBefore = checkIfCompletedQuestionBefore
          ? checkIfCompletedQuestionBefore(questionMetadata)
          : false;

        // Redirect to framework-specific page if framework prop is provided.
        const redirectHref = questionHrefWithList(
          questionMetadata.frameworks.find(
            ({ framework: frameworkType }) => frameworkType === framework,
          )?.href ?? questionMetadata.href,
          listKey,
        );

        return (
          <li
            key={hashQuestion(questionMetadata)}
            className={clsx(
              'group relative',
              'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
              'transition-colors',
              themeBackgroundCardWhiteOnLightColor,
              themeBackgroundEmphasized_Hover,
              index === 0 && 'rounded-t-lg',
              index === questions.length - 1 && 'rounded-b-lg',
            )}>
            <div className={clsx('flex gap-x-4 px-6 py-5 md:py-4', 'isolate')}>
              <QuestionNewLabel created={questionMetadata.created} />
              {showProgress && (
                <QuestionsListItemProgressChip
                  className="z-[1]" // Needed for the icon to be above the link.
                  hasCompletedQuestion={hasCompletedQuestion}
                  hasCompletedQuestionBefore={hasCompletedQuestionBefore}
                  index={mode === 'learning-list' ? index : undefined}
                  premiumUser={userProfile?.isInterviewsPremium}
                  question={questionMetadata}
                  onMarkAsCompleted={onMarkAsCompleted}
                  onMarkAsNotCompleted={onMarkAsNotCompleted}
                />
              )}
              <div className="grow">
                <Text
                  className="inline-flex flex-wrap items-center gap-x-2 gap-y-3"
                  size="body2"
                  weight="bold">
                  <Anchor
                    className="focus:outline-none"
                    href={redirectHref}
                    variant="unstyled">
                    {/* Extend touch target to entire panel */}
                    <span aria-hidden="true" className="absolute inset-0" />
                    {questionMetadata.title}
                  </Anchor>
                  {/* TODO(interviews): remove hardcoding of "counter" and shift it into metadata */}
                  {questionMetadata.slug === 'counter' && (
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
                  {questionMetadata.access === 'premium' && (
                    <InterviewsPremiumBadge />
                  )}
                  {questionMetadata.format === 'system-design' &&
                    !ReadyQuestions.includes(questionMetadata.slug) && (
                      <Badge
                        label={intl.formatMessage({
                          defaultMessage: 'Coming soon',
                          description:
                            'Tooltip for Coming Soon questions label',
                          id: '8JoIUN',
                        })}
                        size="sm"
                        variant="warning"
                      />
                    )}
                </Text>
                {questionMetadata.excerpt && (
                  <Text className="mt-2 block" color="secondary" size="body2">
                    {questionMetadata.excerpt}
                  </Text>
                )}
                <div
                  className={clsx(
                    'mt-4 flex flex-wrap items-center gap-x-8 gap-y-3.5',
                    'relative z-10',
                  )}>
                  <span className="inline-flex">
                    <QuestionFormatLabel
                      showIcon={true}
                      value={questionMetadata.format}
                    />
                  </span>
                  <span className="inline-flex">
                    {primaryLabel === 'difficulty' && (
                      <QuestionDifficultyLabel
                        showIcon={true}
                        value={questionMetadata.difficulty}
                      />
                    )}
                    {primaryLabel === 'importance' && (
                      <QuestionImportanceLabel
                        showIcon={true}
                        value={questionMetadata.importance}
                      />
                    )}
                  </span>
                  {(() => {
                    switch (questionMetadata.format) {
                      case 'algo':
                      case 'javascript':
                        return (
                          <QuestionLanguages
                            languages={questionMetadata.languages}
                          />
                        );
                      case 'user-interface':
                        return (
                          <QuestionFrameworks
                            frameworks={questionMetadata.frameworks}
                          />
                        );
                      case 'quiz':
                      case 'system-design':
                        if (questionMetadata.topics.length > 0) {
                          return (
                            <QuestionTopics topics={questionMetadata.topics} />
                          );
                        }

                        return null;
                      default:
                        return null;
                    }
                  })()}
                  {(() => {
                    const count =
                      questionCompletionCount?.[questionMetadata.format]?.[
                        questionMetadata.slug
                      ];

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
              {showArrowRight && (
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
              )}
            </div>
            {index === questions.length - 1 && showOverlayAtLastItem && (
              <div
                className={clsx(
                  'size-full absolute inset-0',
                  'rounded-[inherit]',
                  'bg-gradient-to-b from-transparent to-white backdrop-blur-[4px] dark:to-neutral-900',
                )}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
