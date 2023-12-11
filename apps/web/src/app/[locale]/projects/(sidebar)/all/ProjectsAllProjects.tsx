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
        app_metadata: {
          provider: 'auth0',
        },
        aud: '',
        created_at: '',
        email: 'example@abc.com',
        id: 'user1',
        user_metadata: {
          avatar_url: 'https://source.unsplash.com/random/48x48',
          full_name: 'John Smith',
        },
      },
      {
        app_metadata: {
          provider: 'auth0',
        },
        aud: '',
        created_at: '',
        email: 'example@abc.com',
        id: 'user2',
        user_metadata: {
          avatar_url: 'https://source.unsplash.com/random/48x48',
          full_name: 'John Smith',
        },
      },
    ],
    description: 'This is a short description for the newsletter section',
    imgSrc: 'https://source.unsplash.com/random/960x360',
    isPremium: true,
    isStarter: true,
    projectHref: '#',
    repCount: 1000,
    skills: [
      {
        difficulty: 'hard',
        key: 'react',
        label: 'React',
      },
      {
        difficulty: 'easy',
        key: 'html',
        label: 'HTML',
      },
      {
        difficulty: 'medium',
        key: 'js',
        label: 'JS',
      },
    ],
    slug: 'newsletter-section',
    status: 'in-progress',
    title: 'Newsletter section',
    trackName: 'Design System Track',
  },
  {
    completedCount: 21,
    completedUsers: [
      {
        app_metadata: {
          provider: 'auth0',
        },
        aud: '',
        created_at: '',
        email: 'example@abc.com',
        id: 'user1',
        user_metadata: {
          avatar_url: 'https://source.unsplash.com/random/48x48',
          full_name: 'John Smith',
        },
      },
      {
        app_metadata: {
          provider: 'auth0',
        },
        aud: '',
        created_at: '',
        email: 'example@abc.com',
        id: 'user2',
        user_metadata: {
          avatar_url: 'https://source.unsplash.com/random/48x48',
          full_name: 'John Smith',
        },
      },
    ],
    description: 'This is a short description for the newsletter section',
    imgSrc: 'https://source.unsplash.com/random/960x360',
    isPremium: false,
    isStarter: true,
    projectHref: '#',
    repCount: 1000,
    skills: [
      {
        difficulty: 'hard',
        key: 'react',
        label: 'React',
      },
      {
        difficulty: 'easy',
        key: 'html',
        label: 'HTML',
      },
      {
        difficulty: 'medium',
        key: 'js',
        label: 'JS',
      },
    ],
    slug: 'contact-section',
    status: 'completed',
    title: 'Newsletter section',
    trackName: 'Design System Track',
  },
  {
    completedCount: 21,
    completedUsers: [
      {
        app_metadata: {
          provider: 'auth0',
        },
        aud: '',
        created_at: '',
        email: 'example@abc.com',
        id: 'user1',
        user_metadata: {
          avatar_url: 'https://source.unsplash.com/random/48x48',
          full_name: 'John Smith',
        },
      },
      {
        app_metadata: {
          provider: 'auth0',
        },
        aud: '',
        created_at: '',
        email: 'example@abc.com',
        id: 'user2',
        user_metadata: {
          avatar_url: 'https://source.unsplash.com/random/48x48',
          full_name: 'John Smith',
        },
      },
    ],
    description: 'This is a short description for the newsletter section',
    imgSrc: 'https://source.unsplash.com/random/960x360',
    isPremium: true,
    isStarter: true,
    projectHref: '#',
    repCount: 1000,
    skills: [
      {
        difficulty: 'hard',
        key: 'react',
        label: 'React',
      },
      {
        difficulty: 'easy',
        key: 'html',
        label: 'HTML',
      },
      {
        difficulty: 'medium',
        key: 'js',
        label: 'JS',
      },
    ],
    slug: 'pricing-section',
    status: 'not-started',
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
                  defaultMessage="Start building any project you can dream of to train your front end/full stack skills or to build a useful toolkit."
                  description="Description of Projects Browse Projects page"
                  id="9oiPRh"
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
