export type ProjectsSkillKey = string;

export type ProjectsSkillRoadmapGroupConfig = Readonly<{
  description: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  items: ReadonlyArray<ProjectsSkillKey>;
  key: ProjectsSkillKey;
  tagClassname: string;
}>;

export type ProjectsSkillRoadmapDifficultyConfig = Readonly<{
  items: ReadonlyArray<ProjectsSkillRoadmapGroupConfig>;
  title: string;
}>;

export type ProjectsSkillRoadmapConfig =
  ReadonlyArray<ProjectsSkillRoadmapDifficultyConfig>;
