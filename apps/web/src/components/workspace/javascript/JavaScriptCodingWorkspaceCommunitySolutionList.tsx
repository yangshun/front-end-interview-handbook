import { trpc } from '~/hooks/trpc';

import type { InterviewsQuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';

import CodingWorkspaceCommunitySolutionList from '../common/CodingWorkspaceCommunitySolutionList';

type Props = Readonly<{
  metadata: InterviewsQuestionMetadata;
}>;

export default function JavaScriptCodingWorkspaceCommunitySolutionList({
  metadata,
}: Props) {
  const { data: solutions } =
    trpc.questionCommunitySolution.javaScriptGetAll.useQuery({
      slug: metadata.slug,
    });

  return (
    <CodingWorkspaceCommunitySolutionList
      questionType="javascript"
      solutions={solutions}
    />
  );
}
