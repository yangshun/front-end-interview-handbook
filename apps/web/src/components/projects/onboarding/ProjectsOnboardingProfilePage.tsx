'use client';

import { useSearchParams } from 'next/navigation';
import { FormattedMessage } from 'react-intl';

import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import { useI18nRouter } from '~/next-i18nostic/src';

import ProjectsOnboardingProfileStep1 from './ProjectsOnboardingProfileStep1';

export default function ProjectsOnboardingProfilePage() {
  const router = useI18nRouter();
  const searchParams = useSearchParams();
  const nextPathname = searchParams?.get('next') || '/projects/challenges';

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
          <ProjectsOnboardingProfileStep1
            onFinish={() => {
              router.push(nextPathname);
            }}
          />
        </Section>
      </Container>
    </main>
  );
}
