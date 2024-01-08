import type { ProjectsSkill } from '../skills/types';

import type { Profile } from '@prisma/client';

// TODO(projects): Use Prisma schema.
export type ProjectsSubmission = Readonly<{
  author: Profile;
  briefDescription?: string;
  briefUrl?: string;
  commentCount: number;
  description: string;
  imgSrc: string;
  likeCount: number;
  slug: string;
  stack: Array<ProjectsSkill>;
  submissionDate: Date;
  title: string;
  viewCount: number;
}>;
