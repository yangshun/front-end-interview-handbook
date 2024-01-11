import ProjectsChallengeResourcesPage from '~/components/projects/challenges/resources/ProjectsChallengeResourcesPage';

import {
  readProjectsChallengeItem,
  readProjectsChallengeResourceGuideList,
} from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug, locale } = params;

  const [{ challenge }, { resourceProjectsChallengeGuides }] =
    await Promise.all([
      readProjectsChallengeItem(slug, locale),
      readProjectsChallengeResourceGuideList(locale),
    ]);

  return (
    <ProjectsChallengeResourcesPage
      challenge={challenge}
      projectGuides={resourceProjectsChallengeGuides}
    />
  );
}
