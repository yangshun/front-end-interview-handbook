import type { ProjectsSkill } from '../skills/types';

import type { User } from '@supabase/supabase-js';

export type ProjectProjectStatus = 'completed' | 'in-progress' | 'not-started';

export type ProjectsProjectMetadata = {
  completedCount: number;
  completedUsers: Array<User>;
  description: string;
  href: string;
  imgSrc: string;
  isPremium: boolean;
  isStarter: boolean;
  points: number;
  skills: Array<ProjectsSkill>;
  slug: string;
  status: ProjectProjectStatus;
  submitHref: string;
  title: string;
  trackName: string;
};
