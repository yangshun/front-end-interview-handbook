export type ProjectsSkillKey = string;

export type ProjectsSkillGroup = Readonly<{
  completedProjectCount: number;
  items: ReadonlyArray<ProjectsSkillItem>;
  key: string;
  label: string;
  totalProjectCount: number;
}>;

export type ProjectsSkillItem = Readonly<{
  completedProjectCount: number;
  key: string;
  label: string;
  totalProjectCount: number;
}>;

export type ProjectsSkillRoadmap = ReadonlyArray<ProjectsSkillGroup>;
