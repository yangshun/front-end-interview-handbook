import ProjectsProgressAndContributionsSection from '~/components/projects/common/ProjectsProgressAndContributionsSection';

import { readProjectsTrackList } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string }>;
}>;

export default async function Page({ params }: Props) {
  const { locale } = params;
  const { tracks } = await readProjectsTrackList(locale);

  return (
    <ProjectsProgressAndContributionsSection
      currentTab="contributions"
      projectTracks={tracks}
    />
  );
}
