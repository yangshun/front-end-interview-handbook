import type { ProjectSkillDifficulty } from '../skills/types';

import type { User } from '@supabase/supabase-js';

export type ProjectsProject = {
  completedCount: number;
  completedUsers: Array<User>;
  description: string;
  imgSrc: string;
  isStarter: boolean;
  projectHref: string;
  repCount: number;
  skills: Array<{
    difficulty: ProjectSkillDifficulty;
    key: string;
    label: string;
  }>;
  slug: string;
  title: string;
  trackName: string;
};
