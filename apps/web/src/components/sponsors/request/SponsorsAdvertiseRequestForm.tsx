'use client';

import { useEffect, useRef, useState } from 'react';

import StepsTabs from '~/components/common/StepsTabs';
import { useIntl } from '~/components/intl';

import SponsorsAdvertiseRequestFormAdsSection from './SponsorsAdvertiseRequestFormAdsSection';
import SponsorsAdvertiseRequestFormCompanyDetailsSection from './SponsorsAdvertiseRequestFormCompanyDetailsSection';
import SponsorsAdvertiseRequestFormContactSection from './SponsorsAdvertiseRequestFormContactSection';
import SponsorsAdvertiseRequestFormReviewSection from './SponsorsAdvertiseRequestFormReviewSection';
import type { SponsorsAdFormatFormItem, SponsorsCompanyDetails } from './types';

type AdvertiseRequestFormValues = Readonly<{
  ads: Array<SponsorsAdFormatFormItem>;
  company: SponsorsCompanyDetails | null;
  emails: Array<string>;
}>;

type Props = Readonly<{
  sessionId: string;
}>;

type Step = 'ads' | 'company' | 'contact' | 'review';

export default function SponsorsAdvertiseRequestForm({ sessionId }: Props) {
  const intl = useIntl();
  const [stepsStatus, setStepsStatus] = useState<
    Record<Step, 'completed' | 'in_progress' | 'not_started'>
  >({
    ads: 'not_started',
    company: 'not_started',
    contact: 'not_started',
    review: 'not_started',
  });

  const steps = [
    {
      status: stepsStatus.contact,
      subtitle: 'Provide your contact details',
      title: 'Contact details',
      value: 'contact',
    },
    {
      status: stepsStatus.ads,
      subtitle: 'Choose ad formats and upload assets',
      title: 'Ads',
      value: 'ads',
    },
    {
      status: stepsStatus.company,
      subtitle: 'Provide company details for invoicing and agreements',
      title: 'Company details',
      value: 'company',
    },
    {
      status: stepsStatus.review,
      subtitle: 'Review the final details and sign the agreement',
      title: 'Review and sign',
      value: 'review',
    },
  ] as const;

  const [formData, setFormData] = useState<AdvertiseRequestFormValues>({
    ads: [],
    company: null,
    emails: [],
  });
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
        label={intl.formatMessage({
          defaultMessage: 'Advertise with us steps',
          description: 'Label for advertise request steps',
          id: 'ZO6Axb',
        })}
        tabs={steps}
        value={step}
        onSelect={(newStep) => {
          // If the current step status is in progress, prevent step navigation
          if (stepsStatus[step] === 'in_progress') {
            return;
          }
          if (newStep === 'ads' && stepsStatus.contact !== 'completed') {
            return;
          }
          if (newStep === 'company' && stepsStatus.ads !== 'completed') {
            return;
          }
          if (newStep === 'review' && stepsStatus.company !== 'completed') {
            return;
          }
          setStep(newStep);
        }}
      />
      {step === 'contact' && (
        <SponsorsAdvertiseRequestFormContactSection
          defaultValues={formData.emails}
          updateStepStatus={(status) =>
            setStepsStatus((prev) => ({ ...prev, contact: status }))
          }
          onSubmit={(emails) => {
            setStep('ads');
            setFormData((prev) => ({ ...prev, emails }));
            setStepsStatus((prev) => ({ ...prev, contact: 'completed' }));
          }}
        />
      )}
      {step === 'ads' && (
        <SponsorsAdvertiseRequestFormAdsSection
          ads={formData.ads}
          sessionId={sessionId}
          updateAds={(ads) => setFormData((prev) => ({ ...prev, ads }))}
          updateStepStatus={(status) =>
            setStepsStatus((prev) => ({ ...prev, ads: status }))
          }
          onPrevious={() => setStep('contact')}
          onSubmit={() => {
            setStep('company');
          }}
        />
      )}
      {step === 'company' && (
        <SponsorsAdvertiseRequestFormCompanyDetailsSection
          defaultValues={formData.company}
          updateStepStatus={(status) =>
            setStepsStatus((prev) => ({ ...prev, company: status }))
          }
          onPrevious={() => setStep('ads')}
          onSubmit={(company) => {
            setStep('review');
            setFormData((prev) => ({ ...prev, company }));
            setStepsStatus((prev) => ({ ...prev, company: 'completed' }));
          }}
        />
      )}
      {step === 'review' && (
        <SponsorsAdvertiseRequestFormReviewSection
          updateStepStatus={(status) =>
            setStepsStatus((prev) => ({ ...prev, review: status }))
          }
          onPrevious={() => setStep('company')}
        />
      )}
    </div>
  );
}
