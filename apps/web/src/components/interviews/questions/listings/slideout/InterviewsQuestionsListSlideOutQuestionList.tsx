import clsx from 'clsx';

import VignetteOverlay from '~/components/common/VignetteOverlay';
import { questionHrefFrameworkSpecificAndListType } from '~/components/interviews/questions/common/QuestionHrefUtils';
import type {
  InterviewsQuestionItemMinimal,
  QuestionFramework,
  QuestionHash,
  QuestionListTypeData,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { FormattedMessage, useIntl } from '~/components/intl';
import EmptyState from '~/components/ui/EmptyState';
import Text from '~/components/ui/Text';
import { themeDivideColor } from '~/components/ui/theme';

import { hashQuestion } from '~/db/QuestionsUtils';

import InterviewsQuestionsListSlideOutQuestionListItem from './InterviewsQuestionsListSlideOutQuestionListItem';
import InterviewsPurchasePaywall from '../../../purchase/InterviewsPurchasePaywall';

type Props<Q extends InterviewsQuestionItemMinimal> = Readonly<{
  checkIfCompletedQuestion?: (question: Q) => boolean;
  currentQuestionHash?: QuestionHash;
  framework?: QuestionFramework;
  isDifferentListFromInitial: boolean;
  listType: QuestionListTypeData;
  mode: 'embedded' | 'slideout';
  onClickQuestion: React.ComponentProps<
    typeof InterviewsQuestionsListSlideOutQuestionListItem
  >['onClick'];
  questions: ReadonlyArray<Q>;
  showCompanyPaywall?: boolean;
}>;

export default function InterviewsQuestionsListSlideOutQuestionList<
  Q extends InterviewsQuestionItemMinimal,
>({
  checkIfCompletedQuestion,
  isDifferentListFromInitial,
  framework,
  listType,
  mode,
  questions,
  currentQuestionHash,
  onClickQuestion,
  showCompanyPaywall,
}: Props<Q>) {
  const intl = useIntl();

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
    (question) => hashQuestion(question.metadata) === currentQuestionHash,
  );

  return (
    <div className={clsx('size-full relative')}>
      <VignetteOverlay
        className={clsx('min-h-[500px]')}
        overlay={
          <InterviewsPurchasePaywall
            background="vignette"
            premiumFeature="company-tags"
          />
        }
        overlayClass="top-10 lg:top-4"
        showOverlay={showCompanyPaywall}>
        <div
          className={clsx(['divide-y', themeDivideColor])}
          {...(showCompanyPaywall && { inert: '' })}>
          {mode === 'slideout' && (
            <div className={clsx('flex gap-x-4 max-sm:hidden', 'px-6 py-3')}>
              <Text className="grow" color="subtle" size="body3">
                <FormattedMessage
                  defaultMessage="Name"
                  description="Question name"
                  id="aXNdwx"
                />
              </Text>
              <Text className="w-[106px]" color="subtle" size="body3">
                <FormattedMessage
                  defaultMessage="Format"
                  description="Question format"
                  id="yQELr2"
                />
              </Text>
              <Text className="w-[68px]" color="subtle" size="body3">
                <FormattedMessage
                  defaultMessage="Difficulty"
                  description="Question difficulty"
                  id="ULuy8I"
                />
              </Text>
            </div>
          )}
          {questions.map((question, index) => {
            const hasCompletedQuestion = checkIfCompletedQuestion?.(question);
            const { metadata } = question;

            const isActiveQuestion = (() => {
              if (mode === 'slideout' && isDifferentListFromInitial) {
                // If the current question is not in the list or different
                // question list, the first question is going to be the active question
                return isCurrentQuestionInTheList
                  ? hashQuestion(metadata) === currentQuestionHash
                  : index === 0;
              }

              // Non-slideout modes don't have the prompt
              return hashQuestion(metadata) === currentQuestionHash;
            })();

            const href = questionHrefFrameworkSpecificAndListType(
              metadata,
              listType,
              framework,
            );

            return (
              <InterviewsQuestionsListSlideOutQuestionListItem
                key={hashQuestion(metadata)}
                checkIfCompletedQuestion={checkIfCompletedQuestion}
                hasCompletedQuestion={hasCompletedQuestion}
                href={href}
                isActiveQuestion={isActiveQuestion}
                listType={listType}
                mode={mode}
                question={question}
                onClick={onClickQuestion}
              />
            );
          })}
        </div>
      </VignetteOverlay>
    </div>
  );
}
