import { trpc } from '~/hooks/trpc';

import type { QuestionMetadata } from './QuestionsTypes';
import QuestionUsersCompletedLabel from './QuestionUsersCompletedLabel';

type Props = Readonly<{
  metadata: QuestionMetadata;
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
