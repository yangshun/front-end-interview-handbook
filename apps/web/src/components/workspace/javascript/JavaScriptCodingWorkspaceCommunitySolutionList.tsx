import { trpc } from '~/hooks/trpc';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';

import CodingWorkspaceCommunitySolutionList from '../common/CodingWorkspaceCommunitySolutionList';

type Props = Readonly<{
  metadata: QuestionMetadata;
  openCommunitySolution: (solutionId: string) => void;
}>;

export default function JavaScriptCodingWorkspaceCommunitySolutionList({
  metadata,
  openCommunitySolution,
}: Props) {
  const { data: solutions } =
    trpc.questionCommunitySolution.javaScriptGetAll.useQuery({
      slug: metadata.slug,
    });

  return (
    <CodingWorkspaceCommunitySolutionList
      openCommunitySolution={openCommunitySolution}
      questionType="javascript"
      solutions={solutions}
    />
  );
}
