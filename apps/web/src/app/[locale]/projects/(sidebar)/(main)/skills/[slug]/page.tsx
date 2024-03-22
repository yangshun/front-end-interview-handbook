import ProjectsSkillRoadmapDetails from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapDetails';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug } = params;

  return <ProjectsSkillRoadmapDetails slug={slug} />;
}
