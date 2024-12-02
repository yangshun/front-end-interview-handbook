'use client';

import clsx from 'clsx';

import InterviewsMarketingFeaturesSection from '~/components/interviews/marketing/InterviewsMarketingFeaturesSection';
import InterviewsMarketingTestimonialsSection from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonialsSection';
import InterviewsPricingFAQSection from '~/components/interviews/purchase/InterviewsPricingFAQSection';
import type { InterviewsPricingPlanPaymentConfigLocalizedRecord } from '~/components/interviews/purchase/InterviewsPricingPlans';
import InterviewsPricingSection from '~/components/interviews/purchase/InterviewsPricingSection';
import Section from '~/components/ui/Heading/HeadingContext';

import InterviewsPurchaseCancelLogging from './InterviewsPurchaseCancelLogging';
import { useInterviewsMarketingTestimonials } from '../marketing/testimonials/useInterviewsMarketingTestimonials';

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
      <InterviewsPricingSection
        countryCode={countryCode}
        countryName={countryName}
        plans={plans}
      />
      <Section>
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
