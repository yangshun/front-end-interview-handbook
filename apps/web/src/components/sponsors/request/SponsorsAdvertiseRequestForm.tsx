'use client';

import { useQueryState } from 'nuqs';
import { useEffect, useRef, useState } from 'react';

import { trpc } from '~/hooks/trpc';

import StepsTabs from '~/components/common/StepsTabs';
import { useToast } from '~/components/global/toasts/useToast';
import { useIntl } from '~/components/intl';

import { useI18nRouter } from '~/next-i18nostic/src';

import SponsorsAdvertiseRequestFormAdsSection from './ads/SponsorsAdvertiseRequestFormAdsSection';
import SponsorsAdvertiseRequestFormCompanyDetailsSection from './company/SponsorsAdvertiseRequestFormCompanyDetailsSection';
import SponsorsAdvertiseRequestFormContactSection from './contact/SponsorsAdvertiseRequestFormContactSection';
import SponsorsAdvertiseRequestInquiryForm from './contact/SponsorsAdvertiseRequestInquiryForm';
import SponsorsAdvertiseRequestFormReviewSection from './review/SponsorsAdvertiseRequestFormReviewSection';
import type { AdvertiseRequestFormValues } from './useSponsorsAdvertiseRequestFormData';
import useSponsorsAdvertiseRequestFormData from './useSponsorsAdvertiseRequestFormData';

type Step = 'ads' | 'company' | 'contact' | 'review';

type Props =
  | Readonly<{
      defaultValues: Omit<
        AdvertiseRequestFormValues,
        'removeAssets' | 'sessionId'
      >;
      mode: 'edit';
      requestId: string;
    }>
  | Readonly<{
      defaultValues?: Omit<
        AdvertiseRequestFormValues,
        'removeAssets' | 'sessionId'
      >;
      mode: 'create' | 'readonly';
    }>;

export default function SponsorsAdvertiseRequestForm({
  defaultValues,
  mode = 'create',
  ...props
}: Props) {
  const intl = useIntl();
  const { showToast } = useToast();
  const router = useI18nRouter();

  const isCreateMode = mode === 'create';
  const isReadonly = mode === 'readonly';

  const adRequestMutation = trpc.sponsorships.adRequest.useMutation();
  const removeAdAssetMutation = trpc.sponsorships.removeAdAsset.useMutation();
  const adRequestUpdateMutation =
    trpc.sponsorships.adRequestUpdate.useMutation();
  const [stepsStatus, setStepsStatus] = useState<
    Record<Step, 'completed' | 'in_progress' | 'not_started'>
  >({
    ads: isCreateMode ? 'not_started' : 'completed',
    company: isCreateMode ? 'not_started' : 'completed',
    contact: isCreateMode ? 'not_started' : 'completed',
    review: isCreateMode ? 'not_started' : 'completed',
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

  const [formData, setFormData] = useSponsorsAdvertiseRequestFormData(
    mode,
    defaultValues,
  );
  const [step, setStep] = useQueryState<(typeof steps)[number]['value'] | null>(
    'step',
    {
      defaultValue: isCreateMode ? null : 'contact',
      history: 'push',
      parse: (value) =>
        ['ads', 'company', 'contact', 'review'].includes(value)
          ? (value as Step)
          : 'contact',
    },
  );
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

  async function handleSubmitRequest({
    agreement,
  }: Readonly<{
    agreement: string;
  }>) {
    if (formData.removeAssets.length > 0) {
      removeAdAssetMutation.mutate({ imageUrls: formData.removeAssets });
    }
    if (mode === 'edit' && 'requestId' in props) {
      await adRequestUpdateMutation.mutateAsync(
        {
          ads: formData.ads,
          agreement,
          company: formData.company!,
          emails: formData.emails,
          id: props.requestId!,
        },
        {
          onError: (error) => {
            showToast({
              description: error.message,
              title:
                error.message ||
                intl.formatMessage({
                  defaultMessage: 'Failed to edit request',
                  description: 'Error title for request submission',
                  id: 'PV4vcA',
                }),
              variant: 'danger',
            });
          },
          onSuccess: () => {
            showToast({
              description: intl.formatMessage({
                defaultMessage: 'Your request has been edited successfully',
                description: 'Success message for request submission',
                id: 'ngtxtp',
              }),
              title: intl.formatMessage({
                defaultMessage: 'Request edited',
                description: 'Success title for request submission',
                id: 'wkTX0Z',
              }),
              variant: 'success',
            });
          },
        },
      );
      setStepsStatus((prev) => ({ ...prev, review: 'completed' }));
    } else {
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

            router.push('/advertise-with-us/request/success');
          },
        },
      );
    }
  }

  if (!step && isCreateMode) {
    return (
      <SponsorsAdvertiseRequestInquiryForm
        defaultValues={formData.emails}
        sessionId={formData.sessionId}
        onSubmit={(emails) => {
          setStep('ads');
          setFormData((prev) => ({ ...prev, emails }));
          setStepsStatus((prev) => ({ ...prev, contact: 'completed' }));
        }}
      />
    );
  }

  return (
    <div ref={stepsContainerRef} className="flex flex-col gap-16">
      {formData.emails.length > 0 && (
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
          mode={mode}
          updateStepStatus={(status) =>
            setStepsStatus((prev) => ({ ...prev, contact: status }))
          }
          onSubmit={(emails) => {
            setStep('ads');
            if (isReadonly) {
              return;
            }
            setFormData((prev) => ({ ...prev, emails }));
            setStepsStatus((prev) => ({ ...prev, contact: 'completed' }));
          }}
        />
      )}
      {step === 'ads' && (
        <SponsorsAdvertiseRequestFormAdsSection
          ads={formData.ads}
          mode={mode}
          sessionId={formData.sessionId}
          setRemoveAssets={(value) =>
            setFormData((prev) => ({
              ...prev,
              removeAssets: [...prev.removeAssets, value],
            }))
          }
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
          mode={mode}
          updateStepStatus={(status) =>
            setStepsStatus((prev) => ({ ...prev, company: status }))
          }
          onPrevious={() => setStep('ads')}
          onSubmit={(company) => {
            setStep('review');
            if (isReadonly) {
              return;
            }
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
          isSubmitting={
            adRequestMutation.isLoading || adRequestUpdateMutation.isLoading
          }
          mode={mode}
          updateStepStatus={(status) =>
            setStepsStatus((prev) => ({ ...prev, review: status }))
          }
          onPrevious={() => setStep('company')}
          onSubmit={handleSubmitRequest}
        />
      )}
    </div>
  );
}
