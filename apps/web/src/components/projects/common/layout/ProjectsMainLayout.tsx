'use client';

import { FormattedMessage } from '~/components/intl';
import ProjectsMainLayoutTabs from '~/components/projects/common/layout/ProjectsMainLayoutTabs';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function ProjectsMainLayout({ children }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <Heading level="heading5">
        <FormattedMessage
          defaultMessage="Project challenges"
          description="Title of Projects challenges page"
          id="68EuCT"
        />
      </Heading>
      <Section>
        <ProjectsMainLayoutTabs />
        {children}
      </Section>
    </div>
  );
}
