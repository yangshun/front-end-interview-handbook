import type { ProjectSkill } from '../skills/types';

import type { User } from '@supabase/supabase-js';

export type ProjectsSubmission = {
  author: User;
  commentCount: number;
  description: string;
  imgSrc: string;
  likeCount: number;
  slug: string;
  stack: Array<ProjectSkill>;
  submissionDate: Date;
  title: string;
  viewCount: number;
};
