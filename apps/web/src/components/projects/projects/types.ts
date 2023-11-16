export type ProjectsProject = {
  completedCount: number;
  completedUsers: Array<{
    id: string;
    imageSrc: string;
    userName: string;
  }>;
  description: string;
  imgSrc: string;
  isStarter: boolean;
  key: string;
  projectHref: string;
  repCount: number;
  skills: Array<string>;
  title: string;
  trackName: string;
};
