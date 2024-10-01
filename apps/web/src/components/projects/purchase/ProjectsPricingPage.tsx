'use client';

import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import Section from '~/components/ui/Heading/HeadingContext';

import ProjectsPricingFAQSection from './ProjectsPricingFAQSection';
import type { ProjectsPricingPlanPaymentConfigLocalizedRecord } from './ProjectsPricingPlans';
import ProjectsPricingPromotions from './ProjectsPricingPromotions';
import ProjectsPricingSection from './ProjectsPricingSection';

type Props = Readonly<{
  countryCode: string;
  countryName: string;
  plansPaymentConfig: ProjectsPricingPlanPaymentConfigLocalizedRecord;
}>;

export default function ProjectsPricingPage({
  countryCode,
  countryName,
  plansPaymentConfig,
}: Props) {
  return (
    <div
      className={clsx('flex flex-col gap-y-16 sm:gap-y-20', 'pb-12 lg:pt-8')}>
      <ProjectsPricingSection
        countryCode={countryCode}
        countryName={countryName}
        heading={
          <FormattedMessage
            defaultMessage="Choose your pricing plan"
            description="Title of Pricing section"
            id="hqzG5o"
          />
        }
        plansPaymentConfig={plansPaymentConfig}
        title={
          <FormattedMessage
            defaultMessage="Pricing plans"
            description="Section label on Pricing section of Homepage or Pricing page"
            id="ZWMfa0"
          />
        }
        useCurrentPageAsCancelUrl={true}
      />
      <ProjectsPricingPromotions />
      <Section>
        <ProjectsPricingFAQSection />
      </Section>
    </div>
  );
}
