import ProjectsChallengeSubmitSuccessPage from '~/components/projects/submit/ProjectsChallengeSubmitSuccessPage';

import { readProjectsChallengeList } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [{ projects }] = await Promise.all([readProjectsChallengeList(locale)]);

  // TODO(projects): Actual suggested projects for the current project.
  return (
    <ProjectsChallengeSubmitSuccessPage
      suggestedProjects={projects.slice(0, 3)}
    />
  );
}
