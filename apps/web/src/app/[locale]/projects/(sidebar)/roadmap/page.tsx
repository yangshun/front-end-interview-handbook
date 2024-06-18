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

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Discover roadmap for upcoming features in Great Frontend Projects.',
      description: 'Description for roadmap page in projects',
      id: 'h37Wmk',
    }),
    locale,
    pathname: '/projects/roadmap',
    title: intl.formatMessage({
      defaultMessage: 'Roadmap for GreatFrontEnd in Projects',
      description: 'Title of interview roadmap page',
      id: 'eC2IBn',
    }),
  });
}

function ProjectsRoadmapPage() {
  return <RoadmapPage />;
}

export default ProjectsRoadmapPage;
