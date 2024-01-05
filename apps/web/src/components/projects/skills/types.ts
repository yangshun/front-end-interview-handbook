export type ProjectsSkill = Readonly<{
  difficulty?: ProjectSkillDifficulty;
  key: string;
  label: string;
}>;

export type ProjectSkillGroup = Readonly<{
  completedProjectCount: number;
  items: ReadonlyArray<ProjectSkillItem>;
  key: string;
  label: string;
  totalProjectCount: number;
  type: 'group';
}>;

export type ProjectSkillItem = Readonly<{
  completedProjectCount: number;
  key: string;
  label: string;
  totalProjectCount: number;
  type: 'item';
}>;

export type ProjectSkillDifficulty = 'easy' | 'hard' | 'medium' | 'unknown';

export type ProjectSkillTree = ReadonlyArray<ProjectSkillGroup>;

export type ProjectSkillDetailed = ProjectSkillGroup | ProjectSkillItem;
