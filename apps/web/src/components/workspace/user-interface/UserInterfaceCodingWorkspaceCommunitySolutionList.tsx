import { trpc } from '~/hooks/trpc';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';

import CodingWorkspaceCommunitySolutionList from '../common/CodingWorkspaceCommunitySolutionList';

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
      questionType="ui"
      solutions={solutions}
    />
  );
}
