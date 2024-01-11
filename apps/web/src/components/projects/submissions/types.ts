import type { ProjectsSkill } from '../skills/types';

export type ProjectsSubmission = Readonly<{
  author?:
    | Readonly<{
        avatarUrl: string | null;
        id: string;
        name: string | null;
        title: string | null;
        username: string;
      }>
    | null
    | undefined;
  comments: number;
  createdAt: Date;
  id: string;
  imgSrc: string;
  likes: number;
  stack: Array<ProjectsSkill>;
  summary: string;
  title: string;
  views: number;
}>;
