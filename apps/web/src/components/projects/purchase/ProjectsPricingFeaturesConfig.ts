import type { ProjectsSubscriptionPlan } from '@prisma/client';

export type ProjectsSubscriptionPlanFeatures = Readonly<{
  apps: boolean;
  breakpoints: boolean;
  componentTracks: boolean;
  credits: number | null;
  freeChallenges: boolean;
  skillRoadmap: boolean;
}>;

export type ProjectsSubscriptionPlanFeatureName =
  keyof ProjectsSubscriptionPlanFeatures;

export const freePlanFeatures: ProjectsSubscriptionPlanFeatures = {
  apps: true,
  breakpoints: true,
  componentTracks: false,
  credits: null,
  freeChallenges: true,
  skillRoadmap: false,
};
export const monthlyPlanFeatures: ProjectsSubscriptionPlanFeatures = {
  apps: true,
  breakpoints: true,
  componentTracks: true,
  credits: 5,
  freeChallenges: true,
  skillRoadmap: true,
};
export const annualPlanFeatures: ProjectsSubscriptionPlanFeatures = {
  apps: true,
  breakpoints: true,
  componentTracks: true,
  credits: 80,
  freeChallenges: true,
  skillRoadmap: true,
};

export const projectsPaidPlanFeatures: Record<
  ProjectsSubscriptionPlan,
  ProjectsSubscriptionPlanFeatures
> = {
  ANNUAL: annualPlanFeatures,
  MONTH: monthlyPlanFeatures,
};
