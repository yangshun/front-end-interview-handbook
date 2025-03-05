'use client';

import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { trpc } from '~/hooks/trpc';
import { useGreatStorageLocal } from '~/hooks/useGreatStorageLocal';

import StepsTabs from '~/components/common/StepsTabs';
import { useToast } from '~/components/global/toasts/useToast';
import { useIntl } from '~/components/intl';

import { useI18nRouter } from '~/next-i18nostic/src';

import SponsorsAdvertiseRequestFormAdsSection from './SponsorsAdvertiseRequestFormAdsSection';
import SponsorsAdvertiseRequestFormCompanyDetailsSection from './SponsorsAdvertiseRequestFormCompanyDetailsSection';
import SponsorsAdvertiseRequestFormContactSection from './SponsorsAdvertiseRequestFormContactSection';
import SponsorsAdvertiseRequestFormReviewSection from './SponsorsAdvertiseRequestFormReviewSection';
import type { SponsorsAdFormatFormItem, SponsorsCompanyDetails } from './types';

type AdvertiseRequestFormValues = Readonly<{
  ads: Array<SponsorsAdFormatFormItem>;
  company: SponsorsCompanyDetails | null;
  emails: Array<string>;
  sessionId: string;
}>;

type Step = 'ads' | 'company' | 'contact' | 'review';

export default function SponsorsAdvertiseRequestForm() {
  const intl = useIntl();
  const { showToast } = useToast();
  const router = useI18nRouter();

  const adRequestMutation = trpc.sponsorships.adRequest.useMutation();
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
      subtitle: intl.formatMessage({
        defaultMessage: 'Provide your contact details',
        description: 'Subtitle for contact details',
        id: 'gz4/q4',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Contact details',
        description: 'Title for contact details',
        id: 'a8I10Q',
      }),
      value: 'contact',
    },
    {
      status: stepsStatus.ads,
      subtitle: intl.formatMessage({
        defaultMessage: 'Choose ad formats and upload assets',
        description: 'Subtitle for ads',
        id: 'S57dW3',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Ads',
        description: 'Label for ads',
        id: 'aQYg46',
      }),
      value: 'ads',
    },
    {
      status: stepsStatus.company,
      subtitle: intl.formatMessage({
        defaultMessage: 'Provide company details for invoicing and agreements',
        description: 'Subtitle for company details',
        id: 'g2WgPq',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Company details',
        description: 'Company details section heading',
        id: 'g6ZUKV',
      }),
      value: 'company',
    },
    {
      status: stepsStatus.review,
      subtitle: intl.formatMessage({
        defaultMessage: 'Review the final details and sign the agreement',
        description: 'Subtitle for Review and sign',
        id: 'lGVunh',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Review and sign',
        description: 'Review and sign',
        id: 'D9lA4s',
      }),
      value: 'review',
    },
  ] as const;

  const [formData, setFormData, removeFormData] =
    useGreatStorageLocal<AdvertiseRequestFormValues>(
      'sponsorships:advertise-request',
      () => ({
        ads: [],
        company: null,
        emails: [],
        sessionId: uuidv4(),
      }),
      { ttl: 7 * 24 * 60 * 60 },
    );
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

  async function handleCreateRequest({
    agreement,
  }: Readonly<{
    agreement: string;
  }>) {
    await adRequestMutation.mutateAsync(
      {
        ads: formData.ads,
        agreement,
        company: formData.company!,
        emails: formData.emails,
      },
      {
        onError: (error) => {
          showToast({
            description: error.message,
            title:
              error.message ||
              intl.formatMessage({
                defaultMessage: 'Failed to submit request',
                description: 'Error title for request submission',
                id: 'KJX/Um',
              }),
            variant: 'danger',
          });
        },
        onSuccess: () => {
          showToast({
            description: intl.formatMessage({
              defaultMessage: 'Your request has been submitted successfully',
              description: 'Success message for request submission',
              id: 'RyuIJe',
            }),
            title: intl.formatMessage({
              defaultMessage: 'Request submitted',
              description: 'Success title for request submission',
              id: 'auTrf6',
            }),
            variant: 'success',
          });

          removeFormData();
          router.push('/advertise-with-us/request/success');
        },
      },
    );
  }

  return (
    <div ref={stepsContainerRef} className="flex flex-col gap-16">
      {steps[0].status === 'completed' && (
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
      )}
      {step === 'contact' && (
        <SponsorsAdvertiseRequestFormContactSection
          defaultValues={formData.emails}
          sessionId={formData.sessionId}
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
          sessionId={formData.sessionId}
          updateAds={(ads) => setFormData((prev) => ({ ...prev, ads }))}
          updateStepStatus={(status) =>
            setStepsStatus((prev) => ({ ...prev, ads: status }))
          }
          onPrevious={() => setStep('contact')}
          onSubmit={() => {
            setStep('company');
            setStepsStatus((prev) => ({ ...prev, ads: 'completed' }));
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
          data={{
            ads: formData.ads,
            company: formData.company!,
            emails: formData.emails,
          }}
          isSubmitting={adRequestMutation.isLoading}
          updateStepStatus={(status) =>
            setStepsStatus((prev) => ({ ...prev, review: status }))
          }
          onPrevious={() => setStep('company')}
          onSubmit={handleCreateRequest}
        />
      )}
    </div>
  );
}
