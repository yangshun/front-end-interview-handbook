import type { ProjectsSkillGroupType } from './data/ProjectsSkillIcons';

export type ProjectsSkillKey = string;

// Core config.
export type ProjectsSkillRoadmapParentConfig = Readonly<{
  description: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  items: ReadonlyArray<ProjectsSkillKey>;
  key: ProjectsSkillGroupType;
  tagClassname: string;
}>;

export type ProjectsSkillRoadmapDifficultyConfig = Readonly<{
  items: ReadonlyArray<ProjectsSkillRoadmapParentConfig>;
  title: string;
}>;

export type ProjectsSkillRoadmapConfig =
  ReadonlyArray<ProjectsSkillRoadmapDifficultyConfig>;

// Skills roadmap page/section.
export type ProjectsSkillSummaryItem = Readonly<{
  completedChallenges: number;
  inProgressChallenges: number;
  key: ProjectsSkillKey;
  points: number;
  totalChallenges: number;
}>;

export type ProjectsSkillRoadmapSectionParent = Readonly<{
  completedChallenges: number;
  description: string;
  items: ReadonlyArray<ProjectsSkillSummaryItem>;
  key: ProjectsSkillGroupType;
  points: number;
  premium: boolean;
  tagClassname: string;
  totalChallenges: number;
}>;

export type ProjectsSkillRoadmapSectionDifficulty = Readonly<{
  items: ReadonlyArray<ProjectsSkillRoadmapSectionParent>;
  title: string;
}>;

export type ProjectsSkillRoadmapSectionData =
  ReadonlyArray<ProjectsSkillRoadmapSectionDifficulty>;
