'use client';

import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';
import Text from '~/components/ui/Text';

import ProjectsOnboardingProfileStep1 from './ProjectsOnboardingProfileStep1';
import ProjectsOnboardingProfileStep2 from './ProjectsOnboardingProfileStep2';

function useTabs() {
  const intl = useIntl();

  const tabs = [
    {
      label: intl.formatMessage({
        defaultMessage: 'Step 1',
        description: 'Step 1 of onboarding process',
        id: 'oF/Vtk',
      }),
      value: 'step-1',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Step 2 (optional)',
        description: 'Step 2 of onboarding process',
        id: 'X154OD',
      }),
      value: 'step-2',
    },
  ];

  return tabs;
}

export default function ProjectsOnboardingProfilePage() {
  const tabs = useTabs();
  const [tab, setTab] = useState<(typeof tabs)[number]['value']>('step-1');
  const intl = useIntl();

  return (
    <main>
      <Container
        className="flex flex-col items-stretch gap-12 pb-24 pt-16"
        variant="2xl">
        <div className="flex flex-col items-center gap-4">
          <Heading level="heading5">
            <FormattedMessage
              defaultMessage="Welcome to GreatFrontEnd Projects!"
              description="Title for Projects profile onboarding page"
              id="uGIcYs"
            />
          </Heading>
          <Text className="text-center" color="secondary" size="body1">
            <FormattedMessage
              defaultMessage="First, set up your public profile to help the community know you better (and assist you better!)"
              description="Subtitle for Projects profile onboarding page"
              id="n2GZsD"
            />
          </Text>
        </div>
        <Section>
          <div className="flex flex-col gap-8">
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
              <ProjectsOnboardingProfileStep1
                onFinish={() => {
                  setTab('step-2');
                }}
              />
            )}
            {tab === 'step-2' && <ProjectsOnboardingProfileStep2 />}
          </div>
        </Section>
      </Container>
    </main>
  );
}
