'use client';

import clsx from 'clsx';

import InterviewsMarketingFeatures from '~/components/interviews/marketing/InterviewsMarketingFeatures';
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
    <div className={clsx('flex flex-col gap-y-16 sm:gap-y-20')}>
      <InterviewsPurchaseCancelLogging plansPaymentConfig={plans} />
      <div className="py-12 lg:mx-8 lg:py-24">
        <InterviewsPricingSection
          countryCode={countryCode}
          countryName={countryName}
          plans={plans}
        />
      </div>
      <Section>
        <InterviewsMarketingFeatures />
        <div>
          <InterviewsPricingFAQSection />
          <InterviewsMarketingTestimonialsSection testimonials={testimonials} />
        </div>
      </Section>
    </div>
  );
}
