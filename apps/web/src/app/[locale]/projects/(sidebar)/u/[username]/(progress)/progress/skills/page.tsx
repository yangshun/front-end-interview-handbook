import ProjectsProfileProgressSkillsTab from '~/components/projects/profile/progress/ProjectsProfileProgressSkillsTab';
import { projectsSkillsRoadmapSectionData } from '~/components/projects/skills/data/ProjectsSkillReader';

import prisma from '~/server/prisma';
type Props = Readonly<{
  params: Readonly<{ locale: string; username: string }>;
}>;

export default async function Page({ params }: Props) {
  const { username } = params;
  const userProfile = await prisma.profile.findUnique({
    where: {
      username,
    },
  });

  const skillsRoadmap = await projectsSkillsRoadmapSectionData(userProfile?.id);

  return (
    <ProjectsProfileProgressSkillsTab
      canOpenDetails={false}
      skillsRoadmap={skillsRoadmap}
      userProfile={userProfile}
    />
  );
}
