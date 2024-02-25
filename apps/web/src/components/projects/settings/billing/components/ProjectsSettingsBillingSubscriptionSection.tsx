'use client';

import { FormattedMessage } from 'react-intl';

import ProjectsPricingTable from '~/components/projects/common/ProjectsPricingTable';
import type { ProjectsPricingPlan } from '~/components/projects/types';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

export default function ProjectsSettingsBillingSubscriptionSection() {
  const monthPlan: ProjectsPricingPlan = {
    discount: 0,
    features: {
      apps: true,
      breakpoints: true,
      componentTracks: false,
      freeChallenges: true,
      skillRoadmap: false,
      unlocks: false,
    },
    frequency: 'month',
    monthlyPrice: 0,
  };
  const quarterPlan: ProjectsPricingPlan = {
    discount: 0,
    features: {
      apps: true,
      breakpoints: true,
      componentTracks: true,
      freeChallenges: true,
      skillRoadmap: true,
      unlocks: 5,
    },
    frequency: 'quarter',
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

  return (
    <Section>
      <div className="flex flex-col gap-6">
        <Heading level="heading5">
          <FormattedMessage
            defaultMessage="Manage your subscription"
            description="Title for manage your subscription section"
            id="PowG3S"
          />
        </Heading>
        <ProjectsPricingTable
          plans={{ annual: annualPlan, month: monthPlan, quarter: quarterPlan }}
        />
      </div>
    </Section>
  );
}
