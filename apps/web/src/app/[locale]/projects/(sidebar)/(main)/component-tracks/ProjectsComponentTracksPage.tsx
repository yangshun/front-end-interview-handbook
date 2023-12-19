'use client';

import { FormattedMessage } from 'react-intl';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

export default function ProjectsComponentTracksPage() {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col max-w-prose gap-1">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Component tracks"
            description="Title of Projects component tracks page"
            id="fg9e1P"
          />
        </Heading>
        <Section>
          <Text color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="Build entire component libraries or design systems from scratch for your portfolio or as a toolkit for future projects."
              description="Description of Projects component tracks page"
              id="tK6m9g"
            />
          </Text>
        </Section>
      </div>
      <Section>Component tracks</Section>
    </div>
  );
}
