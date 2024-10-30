import clsx from 'clsx';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import InterviewsPremiumBadge from '~/components/interviews/common/InterviewsPremiumBadge';
import { questionHrefWithList } from '~/components/interviews/questions/common/questionHref';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsListItemProgressChip from '~/components/interviews/questions/listings/items/QuestionsListItemProgressChip';
import QuestionDifficultyLabel from '~/components/interviews/questions/metadata/QuestionDifficultyLabel';
import QuestionFormatLabel from '~/components/interviews/questions/metadata/QuestionFormatLabel';
import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import EmptyState from '~/components/ui/EmptyState';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementEmphasizedStateColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundLayerColor,
  themeBorderColor,
  themeDivideColor,
} from '~/components/ui/theme';

import { hashQuestion } from '~/db/QuestionsUtils';

type Props<Q extends QuestionMetadata> = Readonly<{
  checkIfCompletedQuestion?: (question: Q) => boolean;
  listKey?: string;
  metadata: QuestionMetadata;
  questions: ReadonlyArray<Q>;
}>;

export default function InterviewsStudyListQuestions<
  Q extends QuestionMetadata,
>({ checkIfCompletedQuestion, listKey, questions, metadata }: Props<Q>) {
  const intl = useIntl();
  const { userProfile } = useUserProfile();

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
    <div>
      <table className="relative hidden w-full  table-fixed border-collapse md:block">
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
            const isActiveQuestion =
              hashQuestion(question.format, question.slug) ===
              hashQuestion(metadata.format, metadata.slug);

            return (
              <tr
                key={hashQuestion(question.format, question.slug)}
                className={clsx(
                  'group relative rounded-lg',
                  'transition-colors',
                  'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
                  themeBackgroundElementEmphasizedStateColor_Hover,
                  isActiveQuestion &&
                    themeBackgroundElementEmphasizedStateColor,
                )}>
                <td className="py-4 pl-6 pr-1.5">
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
                          href={questionHrefWithList(question.href, listKey)}
                          variant="unstyled">
                          {/* Extend touch target to entire panel */}
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {question.title}
                        </Anchor>
                      </Text>
                      {question.premium && <InterviewsPremiumBadge size="xs" />}
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

          return (
            <li
              key={hashQuestion(question.format, question.slug)}
              className={clsx(
                'group relative rounded-lg',
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
                        href={questionHrefWithList(question.href, listKey)}
                        variant="unstyled">
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
