import { trpc } from '~/hooks/trpc';

import QuestionUsersCompletedLabel from './QuestionUsersCompletedLabel';
import type { InterviewsQuestionMetadata } from '../common/QuestionsTypes';

type Props = Readonly<{
  metadata: InterviewsQuestionMetadata;
  showIcon?: boolean;
}>;

export default function QuestionUsersCompletedLabelWithFetching({
  showIcon = false,
  metadata,
}: Props) {
  const { data: count, isLoading } =
    trpc.questionProgress.globalCompleted.useQuery({
      format: metadata.format,
      slug: metadata.slug,
    });

  return (
    <QuestionUsersCompletedLabel
      count={count}
      isLoading={isLoading}
      showIcon={showIcon}
    />
  );
}
