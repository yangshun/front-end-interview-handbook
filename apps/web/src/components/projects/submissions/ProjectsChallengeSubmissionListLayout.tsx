'use client';

import { FormattedMessage } from 'react-intl';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import ProjectsChallengeSubmissionListTabs from './ProjectsChallengeSubmissionListTabs';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function ProjectsChallengeSubmissionListLayout({
  children,
}: Props) {
  return (
    <div className="flex flex-col gap-8">
      <Heading level="heading5">
        <FormattedMessage
          defaultMessage="User submissions"
          description="Projects submissions page title"
          id="0rACGl"
        />
      </Heading>
      <Section>
        <ProjectsChallengeSubmissionListTabs />
        {children}
      </Section>
    </div>
  );
}
