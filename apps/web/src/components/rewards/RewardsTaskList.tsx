'use client';

import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeDivideColor } from '~/components/ui/theme';

import GitHubFollowTask from './tasks/GitHubFollowTask';
import GitHubStarTask from './tasks/GitHubStarTask';
import LinkedInFollowTask from './tasks/LinkedInFollowTask';

type Props = Readonly<{
  hasEntered: boolean;
}>;

export default function RewardsTaskList({ hasEntered }: Props) {
  // TODO: get tasks completed (pending DB setup) and redirect to completed page
  return (
    <Container
      className="max-lg:theme-bg-radial-glow relative isolate flex flex-col gap-y-4 py-6 lg:py-8"
      variant="2xl">
      <Text color="secondary" display="block" size="body2">
        <FormattedMessage
          defaultMessage="Here are the tasks for this campaign:"
          description="Description for campaign tasks"
          id="oiMKy3"
        />
      </Text>
      <Section>
        <div className="gap-y-6">
          <dl className={clsx(['divide-y', themeDivideColor])}>
            <GitHubStarTask hasEntered={hasEntered} />
            <GitHubFollowTask hasEntered={hasEntered} />
            <LinkedInFollowTask hasEntered={hasEntered} />
          </dl>
        </div>
      </Section>
    </Container>
  );
}
