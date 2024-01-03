import type { Profile, ProjectsProfile } from '@prisma/client';

export type ProjectsUserProfile = Profile & {
  projectsProfile: Array<ProjectsProfile>;
};
