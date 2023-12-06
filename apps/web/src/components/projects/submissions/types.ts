import type { ProjectsSkill } from '../skills/types';

import type { User } from '@supabase/supabase-js';

export type ProjectsSubmission = {
  author: User;
  commentCount: number;
  description: string;
  imgSrc: string;
  likeCount: number;
  slug: string;
  stack: Array<ProjectsSkill>;
  submissionDate: Date;
  title: string;
  viewCount: number;
};
