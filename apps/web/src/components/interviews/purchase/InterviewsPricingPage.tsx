'use client';

import clsx from 'clsx';

import InterviewsMarketingFeaturesSection from '~/components/interviews/marketing/InterviewsMarketingFeaturesSection';
import InterviewsMarketingTestimonialsSection from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonialsSection';
import InterviewsPricingFAQSection from '~/components/interviews/purchase/InterviewsPricingFAQSection';
import type { InterviewsPricingPlanPaymentConfigLocalizedRecord } from '~/components/interviews/purchase/InterviewsPricingPlans';
import InterviewsPricingSection from '~/components/interviews/purchase/InterviewsPricingSection';
import { FormattedMessage } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import { useInterviewsMarketingTestimonials } from '../marketing/testimonials/useInterviewsMarketingTestimonials';
import InterviewsPurchaseCancelLogging from './InterviewsPurchaseCancelLogging';

type Props = Readonly<{
  countryCode: string;
  countryName: string;
  plans: InterviewsPricingPlanPaymentConfigLocalizedRecord;
}>;

export default function InterviewsPricingPage({
  countryCode,
  countryName,
  plans,
}: Props) {
  const testimonials = useInterviewsMarketingTestimonials();

  return (
    <div className={clsx('flex flex-col')}>
      <InterviewsPurchaseCancelLogging plansPaymentConfig={plans} />
      <Heading className="sr-only" level="custom">
        <FormattedMessage
          defaultMessage="Pricing"
          description="Pricing page title"
          id="hoMrsO"
        />
      </Heading>
      <Section>
        <InterviewsPricingSection
          countryCode={countryCode}
          countryName={countryName}
          plans={plans}
        />
        <InterviewsMarketingFeaturesSection />
        <InterviewsPricingFAQSection />
        <InterviewsMarketingTestimonialsSection
          testimonials={testimonials}
          width="marketing"
        />
      </Section>
    </div>
  );
}
