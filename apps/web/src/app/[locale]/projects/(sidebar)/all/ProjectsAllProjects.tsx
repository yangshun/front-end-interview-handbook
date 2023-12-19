'use client';

import { FormattedMessage } from 'react-intl';

import ProjectsProjectCategoryTabs from '~/components/projects/projects/ProjectsProjectCategoryTabs';
import ProjectsProjectGridListWithFilters from '~/components/projects/projects/ProjectsProjectGridListWithFilters';
import type { ProjectsProject } from '~/components/projects/projects/types';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  projects: ReadonlyArray<ProjectsProject>;
}>;

export default function ProjectsAllProjects({ projects }: Props) {
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
          <div className="flex flex-col gap-9">
            <div className="flex flex-col max-w-2xl gap-1">
              <Heading level="heading6">
                <FormattedMessage
                  defaultMessage="Browse all projects"
                  description="Title of Projects Browse Projects page"
                  id="etGGVG"
                />
              </Heading>
              <Section>
                <Text color="secondary" size="body2">
                  <FormattedMessage
                    defaultMessage="Start building any project you can dream of to train your front end / full stack skills or to build a useful toolkit."
                    description="Description of Projects Browse Projects page"
                    id="5/4Bz+"
                  />
                </Text>
              </Section>
            </div>
            <Section>
              <ProjectsProjectGridListWithFilters projects={projects} />
            </Section>
          </div>
        </Section>
      </div>
    </Container>
  );
}
