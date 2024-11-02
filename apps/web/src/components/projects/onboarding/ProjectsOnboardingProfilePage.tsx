'use client';

import { useSearchParams } from 'next/navigation';
import { RiFireFill } from 'react-icons/ri';

import { useToast } from '~/components/global/toasts/useToast';
import { FormattedMessage, useIntl } from '~/components/intl';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import ProjectsOnboardingProfileStep1 from './ProjectsOnboardingProfileStep1';

export default function ProjectsOnboardingProfilePage() {
  const intl = useIntl();
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const nextPathname = (() => {
    const next = searchParams?.get('next');

    if (
      !next ||
      next === '/projects/onboarding' ||
      next === '/projects/onboarding/profile'
    ) {
      return '/projects/challenges';
    }

    return next;
  })();

  return (
    <main>
      <Container
        className="flex flex-col items-stretch gap-12 pb-24 pt-16"
        width="2xl">
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
              const points = 200;

              showToast({
                addOnIcon: RiFireFill,
                addOnLabel: `+${points}`,
                description: intl.formatMessage(
                  {
                    defaultMessage:
                      'You just gained {points} reputation points for completing your profile!',
                    description:
                      'Success message after completing profile form',
                    id: 'zrKftp',
                  },
                  {
                    points,
                  },
                ),
                title: intl.formatMessage({
                  defaultMessage: 'Welcome!',
                  description: 'Welcome message',
                  id: 'NtN98C',
                }),
                variant: 'success',
              });
              // TODO(projects): Use full-page redirect for because there's a cache issue
              // where the projects profile is not updated and the user is being sent through
              // the onboarding flow again.
              window.location.href = nextPathname;
            }}
          />
        </Section>
      </Container>
    </main>
  );
}
