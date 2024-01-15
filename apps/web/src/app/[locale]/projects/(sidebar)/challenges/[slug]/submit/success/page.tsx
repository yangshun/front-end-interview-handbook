import ProjectsChallengeSubmissionSuccessPage from '~/components/projects/submissions/ProjectsChallengeSubmissionSuccessPage';

import { readProjectsChallengeList } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [{ challenges }] = await Promise.all([
    readProjectsChallengeList(locale),
  ]);

  // TODO(projects): Actual suggested projects for the current project.
  return (
    <ProjectsChallengeSubmissionSuccessPage
      suggestedChallenges={challenges.slice(0, 3)}
    />
  );
}
