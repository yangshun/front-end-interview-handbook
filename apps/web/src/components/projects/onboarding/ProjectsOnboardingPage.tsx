'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import useScrollToTop from '~/hooks/useScrollToTop';

import { useToast } from '~/components/global/toasts/useToast';
import { useIntl } from '~/components/intl';
import ProjectsOnboardingMotivationsForm from '~/components/projects/onboarding/ProjectsOnboardingMotivationsForm';

import { useI18nRouter } from '~/next-i18nostic/src';

import ProjectsOnboardingProfileForm from './ProjectsOnboardingProfileForm';

export default function ProjectsOnboardingPage() {
  const intl = useIntl();
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const router = useI18nRouter();
  const [motivations, setMotivations] = useState<ReadonlyArray<string>>([]);
  const [step, setStep] = useState<'motivations' | 'profile'>('motivations');

  useScrollToTop([step]);

  const nextPathname = (() => {
    const next = searchParams?.get('next');

    if (!next || next === '/projects/onboarding') {
      return '/projects/challenges';
    }

    return next;
  })();

  return (
    <main>
      {step === 'motivations' && (
        <ProjectsOnboardingMotivationsForm
          onSubmit={(submittedMotivations) => {
            setMotivations(submittedMotivations);
            setStep('profile');
          }}
        />
      )}
      {step === 'profile' && (
        <ProjectsOnboardingProfileForm
          motivations={motivations.slice()}
          onFinish={() => {
            // TODO(projects): This disappears now because we do a full page redirect.
            // Either fix the cache issue or make it show on the next page.
            showToast({
              description: intl.formatMessage({
                defaultMessage:
                  'You just gained reputation points for creating your profile!',
                description: 'Success message after completing profile form',
                id: '3IElB6',
              }),
              title: intl.formatMessage({
                defaultMessage: 'Welcome!',
                description: 'Welcome message',
                id: 'NtN98C',
              }),
              variant: 'success',
            });

            router.push(nextPathname);
          }}
          onPrev={() => setStep('motivations')}
        />
      )}
    </main>
  );
}
