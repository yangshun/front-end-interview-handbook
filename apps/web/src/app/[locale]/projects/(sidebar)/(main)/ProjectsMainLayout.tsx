'use client';

import { FormattedMessage } from 'react-intl';

import ProjectsProjectCategoryTabs from '~/components/projects/lists/ProjectsProjectCategoryTabs';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function ProjectsMainLayout({ children }: Props) {
  return (
    <Container className="pt-16 pb-32">
      <div className="flex flex-col gap-8">
        <Heading level="heading5">
          <FormattedMessage
            defaultMessage="Projects"
            description="Title of Projects All Projects page"
            id="jShNbD"
          />
        </Heading>
        <Section>
          <ProjectsProjectCategoryTabs />
          {children}
        </Section>
      </div>
    </Container>
  );
}
