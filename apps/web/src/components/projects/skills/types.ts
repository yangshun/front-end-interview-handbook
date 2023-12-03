export type ProjectSkill = {
  difficulty: ProjectSkillDifficulty;
  key: string;
  label: string;
};

export type ProjectSkillGroup = {
  completedProjectCount: number;
  items: Array<ProjectSkillItem>;
  key: string;
  label: string;
  totalProjectCount: number;
  type: 'group';
};

export type ProjectSkillItem = {
  completedProjectCount: number;
  key: string;
  label: string;
  totalProjectCount: number;
  type: 'item';
};

export type ProjectSkillDifficulty = 'easy' | 'hard' | 'medium';

export type ProjectSkillTree = ReadonlyArray<ProjectSkillGroup>;

export type ProjectSkillDetailed = ProjectSkillGroup | ProjectSkillItem;
