'use client';

import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';
import Text from '~/components/ui/Text';

import type { OnboardingProfilePage1FormValues } from './ProjectsOnboardingProfilePage1';
import ProjectsOnboardingProfilePage1 from './ProjectsOnboardingProfilePage1';
import type { OnboardingProfilePage2FormValues } from './ProjectsOnboardingProfilePage2';
import ProjectsOnboardingProfilePage2 from './ProjectsOnboardingProfilePage2';

function useTabs() {
  const tabs = [
    { label: 'Step 1', value: 'step-1' },
    { label: 'Step 2', value: 'step-2' },
  ];

  return tabs;
}

export type OnboardingProfileFormValues = OnboardingProfilePage1FormValues &
  OnboardingProfilePage2FormValues;

type Props = Readonly<{
  userName: string;
}>;

export default function ProjectsOnboardingProfilePage({ userName }: Props) {
  const tabs = useTabs();
  const [tab, setTab] = useState<(typeof tabs)[number]['value']>('step-1');
  const intl = useIntl();

  const methods = useForm<OnboardingProfileFormValues>();

  return (
    <FormProvider {...methods}>
      <main>
        <Container
          className="mt-8 flex flex-col items-stretch pb-24"
          variant="2xl">
          <div className="mb-12 flex flex-col items-center gap-4">
            <Heading level="heading5">
              <FormattedMessage
                defaultMessage="Welcome to GreatFrontEnd Projects!"
                description="Title for Projects profile onboarding page"
                id="uGIcYs"
              />
            </Heading>
            <Text className="text-center" color="secondary">
              <FormattedMessage
                defaultMessage="First, set up your public profile to help the community know you better (and assist you better!)"
                description="Subtitle for Projects profile onboarding page"
                id="n2GZsD"
              />
            </Text>
          </div>
          <Section>
            <TabsUnderline
              alignment="stretch"
              label={intl.formatMessage({
                defaultMessage: 'Select step',
                description:
                  'Label for tabs to select step in Projects profile onboarding page',
                id: 'n76no0',
              })}
              tabs={tabs}
              value={tab}
              onSelect={setTab}
            />
            {tab === 'step-1' && (
              <ProjectsOnboardingProfilePage1
                userName={userName}
                onNextClick={() => {
                  setTab('step-2');
                }}
              />
            )}
            {tab === 'step-2' && <ProjectsOnboardingProfilePage2 />}
          </Section>
        </Container>
      </main>
    </FormProvider>
  );
}
