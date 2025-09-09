import { trpc } from '~/hooks/trpc';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import CodingWorkspaceCommunitySolutionList from '~/components/workspace/common/solution/CodingWorkspaceCommunitySolutionList';

type Props = Readonly<{
  metadata: QuestionMetadata;
}>;

export default function UserInterfaceCodingWorkspaceCommunitySolutionList({
  metadata,
}: Props) {
  const { data: solutions } =
    trpc.questionCommunitySolution.userInterfaceGetAll.useQuery({
      slug: metadata.slug,
    });

  return (
    <CodingWorkspaceCommunitySolutionList
      openCommunitySolution={() => {}}
      questionType="ui"
      solutions={solutions}
    />
  );
}
