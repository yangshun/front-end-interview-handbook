import type { Metadata } from 'next';
import React from 'react';

import RoadmapPage from '~/components/roadmap/RoadmapPage';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);
  const title = intl.formatMessage({
    defaultMessage:
      'Roadmap - Upcoming features and updates on GreatFrontEnd Projects',
    description: 'Title of interview roadmap page',
    id: 'HCADe/',
  });

  return defaultMetadata({
    absoluteTitle: title,
    description: intl.formatMessage({
      defaultMessage:
        'Explore upcoming challenges, features, tools and updates we are designing to help you improve your front end skills and build your portfolio.',
      description: 'Description for roadmap page in projects',
      id: 'c8+MMk',
    }),
    locale,
    pathname: '/projects/roadmap',
    socialTitle: intl.formatMessage({
      defaultMessage: 'Roadmap | GreatFrontEnd Projects',
      description: 'Social title of interview roadmap page',
      id: 'y/r8Q+',
    }),
    title,
  });
}

function ProjectsRoadmapPage() {
  return <RoadmapPage />;
}

export default ProjectsRoadmapPage;
