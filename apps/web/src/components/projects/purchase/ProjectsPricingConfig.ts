import type { ProjectsPricingFrequency, ProjectsPricingPlan } from '../types';

const freePlan: ProjectsPricingPlan = {
  discount: 0,
  features: {
    apps: true,
    breakpoints: true,
    componentTracks: false,
    freeChallenges: true,
    skillRoadmap: false,
    unlocks: false,
  },
  frequency: 'free',
  monthlyPrice: 0,
};
const monthlyPlan: ProjectsPricingPlan = {
  discount: 0,
  features: {
    apps: true,
    breakpoints: true,
    componentTracks: true,
    freeChallenges: true,
    skillRoadmap: true,
    unlocks: 5,
  },
  frequency: 'month',
  monthlyPrice: 15,
};
const annualPlan: ProjectsPricingPlan = {
  discount: 70,
  features: {
    apps: true,
    breakpoints: true,
    componentTracks: true,
    freeChallenges: true,
    skillRoadmap: true,
    unlocks: 80,
  },
  frequency: 'annual',
  monthlyPrice: 9,
};

export const ProjectsPricingConfig: Record<
  ProjectsPricingFrequency,
  ProjectsPricingPlan
> = { annual: annualPlan, free: freePlan, month: monthlyPlan };
