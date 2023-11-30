'use client';

import { FormattedMessage } from 'react-intl';

import ProjectsProjectCategoryTabs from '~/components/projects/projects/ProjectsProjectCategoryTabs';
import ProjectsProjectGridListWithFilters from '~/components/projects/projects/ProjectsProjectGridListWithFilters';
import type { ProjectsProject } from '~/components/projects/projects/types';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

const projects: Array<ProjectsProject> = [
  {
    completedCount: 21,
    completedUsers: [
      {
        id: 'user1',
        imageSrc: 'https://source.unsplash.com/random/48×48',
        userName: 'Hello',
      },
      {
        id: 'user2',
        imageSrc: 'https://source.unsplash.com/random/48×48',
        userName: 'Hello',
      },
    ],
    description: 'This is a short description for the newsletter section',
    imgSrc: 'https://source.unsplash.com/random/960×360',
    isStarter: true,
    key: 'newsletter-section-1',
    projectHref: '#',
    repCount: 1000,
    skills: ['React', 'HTML', 'JS'],
    title: 'Newsletter section',
    trackName: 'Design System Track',
  },
  {
    completedCount: 21,
    completedUsers: [
      {
        id: 'user1',
        imageSrc: 'https://source.unsplash.com/random/48×48',
        userName: 'Hello',
      },
      {
        id: 'user2',
        imageSrc: 'https://source.unsplash.com/random/48×48',
        userName: 'Hello',
      },
    ],
    description: 'This is a short description for the newsletter section',
    imgSrc: 'https://source.unsplash.com/random/960×360',
    isStarter: true,
    key: 'newsletter-section-2',
    projectHref: '#',
    repCount: 1000,
    skills: ['React', 'HTML', 'JS'],
    title: 'Newsletter section',
    trackName: 'Design System Track',
  },

  {
    completedCount: 21,
    completedUsers: [
      {
        id: 'user1',
        imageSrc: 'https://source.unsplash.com/random/48×48',
        userName: 'Hello',
      },
      {
        id: 'user2',
        imageSrc: 'https://source.unsplash.com/random/48×48',
        userName: 'Hello',
      },
    ],
    description: 'This is a short description for the newsletter section',
    imgSrc: 'https://source.unsplash.com/random/960×360',
    isStarter: true,
    key: 'newsletter-section-3',
    projectHref: '#',
    repCount: 1000,
    skills: ['React', 'HTML', 'JS'],
    title: 'Newsletter section',
    trackName: 'Design System Track',
  },
];

export default function ProjectsAllProjects() {
  return (
    <Container className="pt-8">
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
          <div className="flex flex-col">
            <Heading level="heading6">
              <FormattedMessage
                defaultMessage="Browse all projects"
                description="Title of Projects Browse Projects page"
                id="etGGVG"
              />
            </Heading>
            <Section>
              <Text className="mb-12" color="secondary">
                <FormattedMessage
                  defaultMessage="Start building any project you can dream of - mentored by official how-to guides and production-grade specifications."
                  description="Description of Projects Browse Projects page"
                  id="RvuPjs"
                />
              </Text>
              <ProjectsProjectGridListWithFilters projects={projects} />
            </Section>
          </div>
        </Section>
      </div>
    </Container>
  );
}
