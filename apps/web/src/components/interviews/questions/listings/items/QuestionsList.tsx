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
import { questionHrefFrameworkSpecificAndListType } from '../../common/QuestionHrefUtils';
import type {
  InterviewsQuestionItemMinimal,
  QuestionFramework,
  QuestionListTypeData,
} from '../../common/QuestionsTypes';
import { InterviewsQuestionsSystemDesignReady } from '../../content/system-design/InterviewsQuestionsSystemDesignConfig';
import QuestionDifficultyLabel from '../../metadata/QuestionDifficultyLabel';
import QuestionFormatLabel from '../../metadata/QuestionFormatLabel';
import QuestionFrameworks from '../../metadata/QuestionFrameworks';
import QuestionImportanceLabel from '../../metadata/QuestionImportanceLabel';
import QuestionLanguages from '../../metadata/QuestionLanguages';
import QuestionNewLabel from '../../metadata/QuestionNewLabel';
import QuestionTopics from '../../metadata/QuestionTopics';
import QuestionUsersCompletedLabel from '../../metadata/QuestionUsersCompletedLabel';
import InterviewsPremiumBadge from '../../../common/InterviewsPremiumBadge';

type Props<Q extends InterviewsQuestionItemMinimal> = Readonly<{
  checkIfCompletedQuestion: (question: Q) => boolean;
  checkIfCompletedQuestionBefore?: (question: Q) => boolean;
  framework?: QuestionFramework;
  listType?: QuestionListTypeData;
  mode?: 'default' | 'study-list';
  onMarkAsCompleted?: (question: Q) => void;
  onMarkAsNotCompleted?: (question: Q) => void;
  primaryLabel?: 'difficulty' | 'importance';
  questionCompletionCount?: QuestionCompletionCount;
  questions: ReadonlyArray<Q>;
  showArrowRight?: boolean;
  showOverlayAtLastItem?: boolean;
  showProgress?: boolean;
}>;

export default function QuestionsList<Q extends InterviewsQuestionItemMinimal>({
  checkIfCompletedQuestion,
  checkIfCompletedQuestionBefore,
  framework,
  primaryLabel = 'difficulty',
  listType,
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
      {questions.map((question, index) => {
        const hasCompletedQuestion = checkIfCompletedQuestion(question);
        const { metadata, info } = question;
        const hasCompletedQuestionBefore = checkIfCompletedQuestionBefore
          ? checkIfCompletedQuestionBefore(question)
          : false;

        const questionHref = questionHrefFrameworkSpecificAndListType(
          metadata,
          listType,
          framework,
        );

        return (
          <li
            key={hashQuestion(metadata)}
            className={clsx(
              'group relative',
              'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
              '[&:has(.progress-chip:focus)]:ring-0', // Hide focus ring on parent if the progress chip is focused
              'transition-colors',
              themeBackgroundCardWhiteOnLightColor,
              themeBackgroundEmphasized_Hover,
              index === 0 && 'rounded-t-lg',
              index === questions.length - 1 && 'rounded-b-lg',
            )}>
            <div className={clsx('flex gap-x-4 px-6 py-5 md:py-4', 'isolate')}>
              <QuestionNewLabel created={metadata.created} />
              {showProgress && (
                <QuestionsListItemProgressChip
                  className="z-[1]" // Needed for the icon to be above the link.
                  hasCompletedQuestion={hasCompletedQuestion}
                  hasCompletedQuestionBefore={hasCompletedQuestionBefore}
                  index={mode === 'study-list' ? index : undefined}
                  premiumUser={userProfile?.isInterviewsPremium}
                  question={question}
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
                    href={questionHref}
                    variant="unstyled">
                    {/* Extend touch target to entire panel */}
                    <span aria-hidden="true" className="absolute inset-0" />
                    {info.title}
                  </Anchor>
                  {/* TODO(interviews): remove hardcoding of "counter" and shift it into metadata */}
                  {metadata.slug === 'counter' && (
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
                  {metadata.access === 'premium' && <InterviewsPremiumBadge />}
                  {metadata.format === 'system-design' &&
                    !InterviewsQuestionsSystemDesignReady.includes(
                      metadata.slug,
                    ) && (
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
                {info.excerpt && (
                  <Text className="mt-2 block" color="secondary" size="body2">
                    {info.excerpt}
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
                      value={metadata.format}
                    />
                  </span>
                  <span className="inline-flex">
                    {primaryLabel === 'difficulty' && (
                      <QuestionDifficultyLabel
                        showIcon={true}
                        value={metadata.difficulty}
                      />
                    )}
                    {primaryLabel === 'importance' && (
                      <QuestionImportanceLabel
                        showIcon={true}
                        value={metadata.importance}
                      />
                    )}
                  </span>
                  {(() => {
                    switch (metadata.format) {
                      case 'algo':
                      case 'javascript':
                        return (
                          <QuestionLanguages languages={metadata.languages} />
                        );
                      case 'user-interface':
                        return (
                          <QuestionFrameworks
                            frameworks={metadata.frameworks}
                            listType={listType}
                          />
                        );
                      case 'quiz':
                      case 'system-design':
                        if (metadata.topics.length > 0) {
                          return <QuestionTopics topics={metadata.topics} />;
                        }

                        return null;
                      default:
                        return null;
                    }
                  })()}
                  {(() => {
                    const count =
                      questionCompletionCount?.[metadata.format]?.[
                        metadata.slug
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
