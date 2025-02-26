'use client';

import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import StepsTabs from '~/components/common/StepsTabs';

import { useSponsorsAdvertiseRequestContactSchema } from './schema/SponsorsAdvertiseRequestContactSchema';
import SponsorsAdvertiseRequestFormAdsSection from './SponsorsAdvertiseRequestFormAdsSection';
import SponsorsAdvertiseRequestFormCompanyDetailsSection from './SponsorsAdvertiseRequestFormCompanyDetailsSection';
import SponsorsAdvertiseRequestFormContactSection from './SponsorsAdvertiseRequestFormContactSection';
import SponsorsAdvertiseRequestFormReviewSection from './SponsorsAdvertiseRequestFormReviewSection';

import { zodResolver } from '@hookform/resolvers/zod';

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
  const stepsContainerRef = useRef<HTMLFormElement>(null);

  const contactDetailsSchema = useSponsorsAdvertiseRequestContactSchema();

  const fullSchema = contactDetailsSchema.merge(
    z.object({
      name: z.string().optional(),
    }),
  );

  const finalSchema = step === 'contact' ? contactDetailsSchema : fullSchema;
  const methods = useForm<z.infer<typeof finalSchema>>({
    defaultValues: {
      emails: [{ value: '' }, { value: '' }],
    },
    mode: 'onTouched',
    resolver: zodResolver(finalSchema),
  });

  const { trigger, handleSubmit } = methods;

  const nextStep = async (value: (typeof steps)[number]['value']) => {
    const isValid = await trigger();

    if (isValid) {
      setStep(value);
    }
  };

  const prevStep = (value: (typeof steps)[number]['value']) => setStep(value);

  const onSubmit = (data: z.infer<typeof fullSchema>) => {
    alert('Form submitted successfully!');
  };

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
    <FormProvider {...methods}>
      <form
        ref={stepsContainerRef}
        className="flex flex-col gap-16"
        onSubmit={handleSubmit(onSubmit)}>
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
            onSubmit={() => nextStep('ads')}
          />
        )}
        {step === 'ads' && (
          <SponsorsAdvertiseRequestFormAdsSection
            onPrevious={() => prevStep('contact')}
            onSubmit={() => nextStep('company')}
          />
        )}
        {step === 'company' && (
          <SponsorsAdvertiseRequestFormCompanyDetailsSection
            onPrevious={() => prevStep('ads')}
            onSubmit={() => nextStep('review')}
          />
        )}
        {step === 'review' && (
          <SponsorsAdvertiseRequestFormReviewSection
            onPrevious={() => nextStep('company')}
          />
        )}
      </form>
    </FormProvider>
  );
}
