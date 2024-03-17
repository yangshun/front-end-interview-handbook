export type ProjectsSkillKey = string;

export type ProjectsSkillRoadmapItem = Readonly<{
  completed: number;
  key: ProjectsSkillKey;
  points: number;
  total: number;
}>;

export type ProjectsSkillRoadmapGroup = Readonly<{
  completed: number;
  description: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  items: ReadonlyArray<ProjectsSkillRoadmapItem>;
  key: ProjectsSkillKey;
  points: number;
  total: number;
}>;

export type ProjectsSkillRoadmapLevel = Readonly<{
  items: ReadonlyArray<ProjectsSkillRoadmapGroup>;
  title: string;
}>;

export type ProjectsSkillRoadmap = ReadonlyArray<ProjectsSkillRoadmapLevel>;
