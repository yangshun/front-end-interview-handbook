import clsx from 'clsx';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import InterviewsPremiumBadge from '~/components/interviews/common/InterviewsPremiumBadge';
import { questionHrefWithList } from '~/components/interviews/questions/common/questionHref';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsListItemProgressChip from '~/components/interviews/questions/listings/items/QuestionsListItemProgressChip';
import InterviewsStudyListQuestionHovercardContents from '~/components/interviews/questions/listings/learning/InterviewsStudyListQuestionHovercardContents';
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

type Props<Q extends QuestionMetadata> = Readonly<{
  checkIfCompletedQuestion?: (question: Q) => boolean;
  currentListKey?: string;
  listKey?: string;
  metadata: QuestionMetadata;
  onClickDifferentStudyListQuestion: (href: string) => void;
  questions: ReadonlyArray<Q>;
}>;

export default function InterviewsStudyListQuestions<
  Q extends QuestionMetadata,
>({
  checkIfCompletedQuestion,
  listKey,
  currentListKey,
  questions,
  metadata,
  onClickDifferentStudyListQuestion,
}: Props<Q>) {
  const intl = useIntl();
  const { userProfile } = useUserProfile();

  if (questions.length === 0) {
    return (
      <div className={clsx('p-10')}>
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

  const isCurrentQuestionInTheList = !!questions.find(
    (question) =>
      hashQuestion(question.format, question.slug) ===
      hashQuestion(metadata.format, metadata.slug),
  );
  const isDifferentStudyList = listKey && listKey !== currentListKey;

  return (
    <div>
      <table className="relative hidden w-full table-fixed border-collapse md:block">
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
        <tbody className={clsx(['divide-y', themeDivideColor])}>
          {questions.map((question, index) => {
            const hasCompletedQuestion = checkIfCompletedQuestion?.(question);

            // If the current question is not in the list or different study list, the first question is going to be the active question
            const isActiveQuestion =
              isCurrentQuestionInTheList && !isDifferentStudyList
                ? hashQuestion(question.format, question.slug) ===
                  hashQuestion(metadata.format, metadata.slug)
                : index === 0;
            const href = questionHrefWithList(question.href, currentListKey);

            return (
              <Hovercard
                key={hashQuestion(question.format, question.slug)}
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
                              index={index}
                              premiumUser={userProfile?.isInterviewsPremium}
                              question={question}
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
                                href={isDifferentStudyList ? '#' : href}
                                variant="unstyled"
                                onClick={
                                  isDifferentStudyList
                                    ? () =>
                                        onClickDifferentStudyListQuestion(href)
                                    : undefined
                                }>
                                {/* Extend touch target to entire panel */}
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0"
                                />
                                {question.title}
                              </Anchor>
                            </Text>
                            {question.premium && (
                              <InterviewsPremiumBadge size="xs" />
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-1.5 py-4">
                        <QuestionFormatLabel
                          showIcon={true}
                          value={question.format}
                        />
                      </td>
                      <td className="py-4 pl-1.5 pr-6">
                        <QuestionDifficultyLabel
                          showIcon={true}
                          value={question.difficulty}
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
                    <InterviewsStudyListQuestionHovercardContents
                      listKey={listKey}
                      question={question}
                    />
                  </HovercardContent>
                </HovercardPortal>
              </Hovercard>
            );
          })}
        </tbody>
      </table>
      <ul className={clsx('block md:hidden', ['divide-y', themeDivideColor])}>
        {questions.map((question, index) => {
          const hasCompletedQuestion = checkIfCompletedQuestion?.(question);

          const isActiveQuestion =
            hashQuestion(question.format, question.slug) ===
            hashQuestion(metadata.format, metadata.slug);

          const href = questionHrefWithList(question.href, currentListKey);

          return (
            <li
              key={hashQuestion(question.format, question.slug)}
              className={clsx(
                'group relative',
                'px-6 py-4',
                'transition-colors',
                'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
                themeBackgroundElementEmphasizedStateColor_Hover,
                isActiveQuestion && themeBackgroundElementEmphasizedStateColor,
              )}>
              <div className="flex items-center gap-x-4">
                {checkIfCompletedQuestion != null && (
                  <QuestionsListItemProgressChip
                    className="z-[1]"
                    hasCompletedQuestion={!!hasCompletedQuestion}
                    hasCompletedQuestionBefore={false}
                    index={index}
                    premiumUser={userProfile?.isInterviewsPremium}
                    question={question}
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
                        href={isDifferentStudyList ? '#' : href}
                        variant="unstyled"
                        onClick={
                          isDifferentStudyList
                            ? () => onClickDifferentStudyListQuestion(href)
                            : undefined
                        }>
                        {/* Extend touch target to entire panel */}
                        <span aria-hidden="true" className="absolute inset-0" />
                        {question.title}
                      </Anchor>
                    </Text>
                    {question.premium && <InterviewsPremiumBadge size="xs" />}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    <QuestionFormatLabel
                      showIcon={true}
                      value={question.format}
                    />
                    <QuestionDifficultyLabel
                      showIcon={true}
                      value={question.difficulty}
                    />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
