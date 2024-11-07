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
        'Discover roadmap for upcoming features in Great Frontend Interviews.',
      description: 'Description for interview roadmap page',
      id: 'IYbT+9',
    }),
    locale,
    pathname: '/interviews/roadmap',
    title: intl.formatMessage({
      defaultMessage: 'Roadmap for Front End Interviews',
      description: 'Title of interview roadmap page',
      id: '75OcQW',
    }),
  });
}

function InterviewsRoadmap() {
  return <RoadmapPage />;
}

export default InterviewsRoadmap;
