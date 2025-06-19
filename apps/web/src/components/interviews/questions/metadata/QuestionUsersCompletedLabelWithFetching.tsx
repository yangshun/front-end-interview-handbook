import { trpc } from '~/hooks/trpc';

import type { QuestionMetadata } from '../common/QuestionsTypes';
import QuestionUsersCompletedLabel from './QuestionUsersCompletedLabel';

type Props = Readonly<{
  metadata: QuestionMetadata;
  showIcon?: boolean;
}>;

export default function QuestionUsersCompletedLabelWithFetching({
  metadata,
  showIcon = false,
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
