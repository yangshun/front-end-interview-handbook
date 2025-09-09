import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';

import { countQuestionsTotalDurationMins } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import useQuestionsWithStatus from '~/components/interviews/questions/listings/items/useQuestionsWithStatus';
import QuestionCountLabel from '~/components/interviews/questions/metadata/QuestionCountLabel';
import QuestionTotalTimeLabel from '~/components/interviews/questions/metadata/QuestionTotalTimeLabel';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';

export default function ProfileActivityBookmarkedQuestions() {
  const intl = useIntl();
  const { data: questions, isLoading: isFetchingQuestionProgress } =
    trpc.bookmark.getQuestionsWithMetadata.useQuery();
  const questionsWithCompletionStatus = useQuestionsWithStatus(questions ?? []);
  const { data: totalCompletionCount } =
    trpc.questionProgress.getTotalCompletionCount.useQuery();

  if (isFetchingQuestionProgress) {
    return (
      <div className="py-10">
        <Spinner display="block" />
      </div>
    );
  }

  if (questionsWithCompletionStatus.length === 0) {
    return (
      <div
        className={clsx(
          'flex flex-col items-center justify-center',
          'h-[386px]',
        )}>
        <div className="max-w-[312px]">
          <EmptyState
            subtitle={intl.formatMessage({
              defaultMessage:
                "Bookmark questions you want to revisit later —they'll show up here for quick access.",
              description:
                'Subtitle for empty state when no questions are returned from application of filters on profile activity page',
              id: 'W1dDtP',
            })}
            title={intl.formatMessage({
              defaultMessage: 'No bookmarked questions yet',
              description:
                'Title for empty state when no bookmarked questions are found on profile activity page',
              id: 'fFrtdW',
            })}
            variant="empty"
            verticalPadding={false}
          />
        </div>
        <Button
          className="mt-6"
          href="/questions"
          label={intl.formatMessage({
            defaultMessage: 'Start bookmarking',
            description: 'Label for button to start bookmarking questions',
            id: 'TFp1Sc',
          })}
          size="sm"
          variant="primary"
        />
        <Text className="mt-2 text-[10px]" color="secondary" size="inherit">
          {intl.formatMessage({
            defaultMessage:
              "You'll be taken to the full list of practice questions.",
            description:
              'Subtitle for empty state when no questions are returned from application of filters on profile activity page',
            id: 'v7dZEJ',
          })}
        </Text>
      </div>
    );
  }

  const totalDurationMins = countQuestionsTotalDurationMins(
    questionsWithCompletionStatus,
  );

  const listMetadata = (
    <div className="flex gap-x-4 sm:gap-x-10">
      <QuestionCountLabel
        count={questionsWithCompletionStatus.length}
        showIcon={true}
      />
      {totalDurationMins > 0 && (
        <QuestionTotalTimeLabel mins={totalDurationMins} showIcon={true} />
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-y-4">
      {listMetadata}
      <QuestionsList
        checkIfCompletedQuestion={(question) => question.isCompleted}
        mode="study-list"
        questionCompletionCount={totalCompletionCount}
        questions={questionsWithCompletionStatus}
      />
    </div>
  );
}
