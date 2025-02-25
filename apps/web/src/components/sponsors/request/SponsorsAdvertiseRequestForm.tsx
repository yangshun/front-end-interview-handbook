'use client';

import { useEffect, useRef, useState } from 'react';

import StepsTabs from '~/components/common/StepsTabs';

import SponsorsAdvertiseRequestFormAdsSection from './SponsorsAdvertiseRequestFormAdsSection';
import SponsorsAdvertiseRequestFormCompanyDetailsSection from './SponsorsAdvertiseRequestFormCompanyDetailsSection';
import SponsorsAdvertiseRequestFormContactSection from './SponsorsAdvertiseRequestFormContactSection';
import SponsorsAdvertiseRequestFormReviewSection from './SponsorsAdvertiseRequestFormReviewSection';

export default function SponsorsAdvertiseRequestForm() {
  const steps = [
    {
      status: 'not_started',
      subtitle: 'Provide your contact details',
      title: 'Contact details',
      value: 'contact',
    },
    {
      status: 'in_progress',
      subtitle: 'Choose ad formats and upload assets',
      title: 'Ads',
      value: 'ads',
    },
    {
      status: 'completed',
      subtitle: 'Provide company details for invoicing and agreements',
      title: 'Company details',
      value: 'company',
    },
    {
      status: 'not_started',
      subtitle: 'Review the final details and sign the agreement',
      title: 'Review and sign',
      value: 'review',
    },
  ] as const;

  const [step, setStep] = useState<(typeof steps)[number]['value']>('contact');
  const firstMountRef = useRef<boolean>(false);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!firstMountRef.current) {
      firstMountRef.current = true;

      return;
    }

    if (stepsContainerRef.current) {
      window.scrollTo({
        behavior: 'smooth',
        top: stepsContainerRef.current!.offsetTop - 50,
      });
    }
  }, [step]);

  return (
    <div ref={stepsContainerRef} className="flex flex-col gap-16">
      <StepsTabs
        className="z-sticky sticky top-[var(--global-sticky-height)]"
        label="Advertise with us steps"
        tabs={steps}
        value={step}
        onSelect={(newStep) => {
          setStep(newStep);
        }}
      />
      {step === 'contact' && (
        <SponsorsAdvertiseRequestFormContactSection
          onSubmit={() => {
            setStep('ads');
          }}
        />
      )}
      {step === 'ads' && (
        <SponsorsAdvertiseRequestFormAdsSection
          onPrevious={() => {
            setStep('contact');
          }}
          onSubmit={() => {
            setStep('company');
          }}
        />
      )}
      {step === 'company' && (
        <SponsorsAdvertiseRequestFormCompanyDetailsSection
          onPrevious={() => {
            setStep('ads');
          }}
          onSubmit={() => {
            setStep('review');
          }}
        />
      )}
      {step === 'review' && (
        <SponsorsAdvertiseRequestFormReviewSection
          onPrevious={() => {
            setStep('company');
          }}
          onSubmit={() => {
            alert('Submit');
          }}
        />
      )}
    </div>
  );
}
