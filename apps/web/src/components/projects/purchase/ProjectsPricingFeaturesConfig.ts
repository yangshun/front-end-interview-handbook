export type ProjectsSubscriptionPlanFeatures = Readonly<{
  apps: boolean;
  breakpoints: boolean;
  componentTracks: boolean;
  freeChallenges: boolean;
  skillRoadmap: boolean;
  unlocks: number | false;
}>;

export type ProjectsSubscriptionPlanFeatureName =
  keyof ProjectsSubscriptionPlanFeatures;

export const freePlanFeatures: ProjectsSubscriptionPlanFeatures = {
  apps: true,
  breakpoints: true,
  componentTracks: false,
  freeChallenges: true,
  skillRoadmap: false,
  unlocks: false,
};
export const monthlyPlanFeatures: ProjectsSubscriptionPlanFeatures = {
  apps: true,
  breakpoints: true,
  componentTracks: true,
  freeChallenges: true,
  skillRoadmap: true,
  unlocks: 5,
};
export const annualPlanFeatures: ProjectsSubscriptionPlanFeatures = {
  apps: true,
  breakpoints: true,
  componentTracks: true,
  freeChallenges: true,
  skillRoadmap: true,
  unlocks: 80,
};
