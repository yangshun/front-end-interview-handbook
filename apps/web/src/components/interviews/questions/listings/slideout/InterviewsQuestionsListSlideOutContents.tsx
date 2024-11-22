import clsx from 'clsx';
import { isEqual } from 'lodash-es';

import VignetteOverlay from '~/components/common/VignetteOverlay';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import InterviewsPremiumBadge from '~/components/interviews/common/InterviewsPremiumBadge';
import type { QuestionListTypeData } from '~/components/interviews/questions/common/questionHref';
import { questionHrefWithListType } from '~/components/interviews/questions/common/questionHref';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsListItemProgressChip from '~/components/interviews/questions/listings/items/QuestionsListItemProgressChip';
import InterviewsQuestionsListSlideOutHovercardContents from '~/components/interviews/questions/listings/slideout/InterviewsQuestionsListSlideOutHovercardContents';
import QuestionDifficultyLabel from '~/components/interviews/questions/metadata/QuestionDifficultyLabel';
import QuestionFormatLabel from '~/components/interviews/questions/metadata/QuestionFormatLabel';
import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import EmptyState from '~/components/ui/EmptyState';
import {
  Hovercard,
  HovercardContent,
  HovercardPortal,
  HovercardTrigger,
} from '~/components/ui/Hovercard/Hovercard';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBackgroundElementEmphasizedStateColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundLayerColor,
  themeBorderColor,
  themeDivideColor,
} from '~/components/ui/theme';

import { hashQuestion } from '~/db/QuestionsUtils';

import QuestionPaywall from '../../common/QuestionPaywall';

type Props<Q extends QuestionMetadata> = Readonly<{
  checkIfCompletedQuestion?: (question: Q) => boolean;
  currentListType?: QuestionListTypeData | null;
  listType?: QuestionListTypeData;
  metadata: QuestionMetadata;
  onClickDifferentStudyListQuestion: (href: string) => void;
  questions: ReadonlyArray<Q>;
  showCompanyPaywall?: boolean;
}>;

export default function InterviewsQuestionsListSlideOutContents<
  Q extends QuestionMetadata,
>({
  checkIfCompletedQuestion,
  listType,
  currentListType,
  questions,
  metadata,
  onClickDifferentStudyListQuestion,
  showCompanyPaywall,
}: Props<Q>) {
  const intl = useIntl();
  const { userProfile } = useUserProfile();

  if (questions.length === 0) {
    return (
      <div className={clsx('p-10')}>
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

  const isCurrentQuestionInTheList = !!questions.find(
    (question) => hashQuestion(question) === hashQuestion(metadata),
  );
  const isDifferentList =
    listType != null && !isEqual(listType, currentListType);

  return (
    <div>
      <table className="relative hidden h-full w-full table-fixed border-collapse md:block">
        <colgroup>
          <col className="w-3/5" />
          <col className="w-[20%]" />
          <col className="w-[20%]" />
        </colgroup>
        <thead
          className={clsx('z-sticky sticky top-0', themeBackgroundLayerColor, [
            'border-b',
            themeBorderColor,
          ])}>
          <tr>
            <th className="py-3 pl-6 pr-1.5 text-left" scope="col">
              <Text color="subtle" size="body3">
                {intl.formatMessage({
                  defaultMessage: 'Name',
                  description: 'Label for name column of questions list table',
                  id: 'sO8Hr+',
                })}
              </Text>
            </th>
            <th className="px-1.5 py-3 text-left" scope="col">
              <Text color="subtle" size="body3">
                {intl.formatMessage({
                  defaultMessage: 'Type',
                  description:
                    'Label for question format column of questions list table',
                  id: '5DwYlA',
                })}
              </Text>
            </th>
            <th className="py-3 pl-1.5 pr-6 text-left" scope="col">
              <Text color="subtle" size="body3">
                {intl.formatMessage({
                  defaultMessage: 'Difficulty',
                  description:
                    'Label for question difficulty column of questions list table',
                  id: 'EjXbPp',
                })}
              </Text>
            </th>
          </tr>
        </thead>
        <VignetteOverlay
          className={clsx(
            'min-h-[600px]',
            'pointer-events-none touch-none select-none',
          )}
          overlay={
            <QuestionPaywall background={false} feature="company-tags" />
          }
          showOverlay={showCompanyPaywall}>
          <tbody
            className={clsx(['divide-y', themeDivideColor])}
            {...(showCompanyPaywall && { inert: '' })}>
            {questions.map((questionMetadata, index) => {
              const hasCompletedQuestion =
                checkIfCompletedQuestion?.(questionMetadata);

              // If the current question is not in the list or different study list, the first question is going to be the active question
              const isActiveQuestion =
                isCurrentQuestionInTheList && !isDifferentList
                  ? hashQuestion(questionMetadata) === hashQuestion(metadata)
                  : index === 0;
              const href = questionHrefWithListType(
                questionMetadata.href,
                currentListType,
              );

              return (
                <Hovercard
                  key={hashQuestion(questionMetadata)}
                  // Add a small close delay so that cursor can enter the card
                  // fast enough before the card disappears.
                  closeDelay={50}
                  openDelay={0}>
                  <HovercardTrigger asChild={true}>
                    {
                      <tr
                        className={clsx(
                          'group relative',
                          'transition-colors',
                          'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
                          themeBackgroundElementEmphasizedStateColor_Hover,
                          isActiveQuestion &&
                            themeBackgroundElementEmphasizedStateColor,
                        )}>
                        <td className="w-full py-4 pl-6 pr-1.5">
                          <div className="flex items-center gap-x-4">
                            {checkIfCompletedQuestion != null && (
                              <QuestionsListItemProgressChip
                                className="z-[1]"
                                hasCompletedQuestion={!!hasCompletedQuestion}
                                hasCompletedQuestionBefore={false}
                                premiumUser={userProfile?.isInterviewsPremium}
                                question={questionMetadata}
                                size="sm"
                              />
                            )}
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                              <Text
                                className="flex items-center gap-x-2"
                                size="body3"
                                weight="medium">
                                <Anchor
                                  className="focus:outline-none"
                                  href={isDifferentList ? '#' : href}
                                  variant="unstyled"
                                  onClick={
                                    isDifferentList
                                      ? () =>
                                          onClickDifferentStudyListQuestion(
                                            href,
                                          )
                                      : undefined
                                  }>
                                  {/* Extend touch target to entire panel */}
                                  <span
                                    aria-hidden="true"
                                    className="absolute inset-0"
                                  />
                                  {questionMetadata.title}
                                </Anchor>
                              </Text>
                              {questionMetadata.access === 'premium' && (
                                <InterviewsPremiumBadge size="xs" />
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-1.5 py-4">
                          <QuestionFormatLabel
                            showIcon={true}
                            value={questionMetadata.format}
                          />
                        </td>
                        <td className="py-4 pl-1.5 pr-6">
                          <QuestionDifficultyLabel
                            showIcon={true}
                            value={questionMetadata.difficulty}
                          />
                        </td>
                      </tr>
                    }
                  </HovercardTrigger>
                  <HovercardPortal>
                    <HovercardContent
                      className={clsx(themeBackgroundColor, [
                        'border',
                        themeBorderColor,
                      ])}
                      side="right"
                      // Remove offset so that cursor can enter the card
                      // fast enough before the card disappears.
                      sideOffset={0}>
                      <InterviewsQuestionsListSlideOutHovercardContents
                        listType={currentListType}
                        question={questionMetadata}
                      />
                    </HovercardContent>
                  </HovercardPortal>
                </Hovercard>
              );
            })}
          </tbody>
        </VignetteOverlay>
      </table>
      <div className="block md:hidden">
        <VignetteOverlay
          className={clsx(
            'min-h-[800px]',
            'pointer-events-none touch-none select-none',
          )}
          overlay={
            <QuestionPaywall background={false} feature="company-tags" />
          }
          showOverlay={showCompanyPaywall}>
          <ul
            className={clsx(['divide-y', themeDivideColor])}
            {...(showCompanyPaywall && { inert: '' })}>
            {questions.map((questionMetadata) => {
              const hasCompletedQuestion =
                checkIfCompletedQuestion?.(questionMetadata);

              const isActiveQuestion =
                hashQuestion(questionMetadata) === hashQuestion(metadata);

              const href = questionHrefWithListType(
                questionMetadata.href,
                currentListType,
              );

              return (
                <li
                  key={hashQuestion(questionMetadata)}
                  className={clsx(
                    'group relative',
                    'px-6 py-4',
                    'transition-colors',
                    'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
                    themeBackgroundElementEmphasizedStateColor_Hover,
                    isActiveQuestion &&
                      themeBackgroundElementEmphasizedStateColor,
                  )}>
                  <div className="flex items-center gap-x-4">
                    {checkIfCompletedQuestion != null && (
                      <QuestionsListItemProgressChip
                        className="z-[1]"
                        hasCompletedQuestion={!!hasCompletedQuestion}
                        hasCompletedQuestionBefore={false}
                        premiumUser={userProfile?.isInterviewsPremium}
                        question={questionMetadata}
                        size="sm"
                      />
                    )}
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                        <Text
                          className="flex items-center gap-x-2"
                          size="body3"
                          weight="medium">
                          <Anchor
                            className="focus:outline-none"
                            href={isDifferentList ? '#' : href}
                            variant="unstyled"
                            onClick={
                              isDifferentList
                                ? () => onClickDifferentStudyListQuestion(href)
                                : undefined
                            }>
                            {/* Extend touch target to entire panel */}
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {questionMetadata.title}
                          </Anchor>
                        </Text>
                        {questionMetadata.access === 'premium' && (
                          <InterviewsPremiumBadge size="xs" />
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                        <QuestionFormatLabel
                          showIcon={true}
                          value={questionMetadata.format}
                        />
                        <QuestionDifficultyLabel
                          showIcon={true}
                          value={questionMetadata.difficulty}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </VignetteOverlay>
      </div>
    </div>
  );
}
