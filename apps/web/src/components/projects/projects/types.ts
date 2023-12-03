import type { ProjectSkill } from '../skills/types';

import type { User } from '@supabase/supabase-js';

export type ProjectsProject = {
  completedCount: number;
  completedUsers: Array<User>;
  description: string;
  imgSrc: string;
  isStarter: boolean;
  projectHref: string;
  repCount: number;
  skills: Array<ProjectSkill>;
  slug: string;
  title: string;
  trackName: string;
};
