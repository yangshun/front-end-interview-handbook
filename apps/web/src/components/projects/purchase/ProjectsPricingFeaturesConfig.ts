import type { ProjectsSubscriptionPlan } from '.prisma/client';

export type ProjectsSubscriptionPlanFeatures = Readonly<{
  apps: boolean;
  breakpoints: boolean;
  componentTracks: boolean;
  credits: number | 'unlimited' | null;
  freeChallenges: boolean;
  skillRoadmap: boolean;
}>;

export type ProjectsSubscriptionPlanFeatureName =
  keyof ProjectsSubscriptionPlanFeatures;

export const freePlanFeatures = {
  apps: true,
  breakpoints: true,
  componentTracks: false,
  credits: null,
  freeChallenges: true,
  skillRoadmap: false,
} as const;
export const monthlyPlanFeatures = {
  apps: true,
  breakpoints: true,
  componentTracks: true,
  credits: 5,
  freeChallenges: true,
  skillRoadmap: true,
} as const;
export const annualPlanFeatures = {
  apps: true,
  breakpoints: true,
  componentTracks: true,
  credits: 'unlimited',
  freeChallenges: true,
  skillRoadmap: true,
} as const;

export const projectsPaidPlanFeatures: Record<
  ProjectsSubscriptionPlan,
  ProjectsSubscriptionPlanFeatures
> = {
  ANNUAL: annualPlanFeatures,
  MONTH: monthlyPlanFeatures,
};
