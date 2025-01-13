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
        'Explore upcoming content pieces, features, tools and updates we are designing to enhance your front end interview preparation journey.',
      description: 'Description for interview roadmap page',
      id: '1k8zUZ',
    }),
    locale,
    ogImageTitle: intl.formatMessage({
      defaultMessage: 'Roadmap - Upcoming features and updates on Interviews',
      description: 'OG title of Roadmap page',
      id: 'hjBNcc',
    }),
    pathname: '/interviews/roadmap',
    socialTitle: intl.formatMessage({
      defaultMessage: 'Roadmap | GreatFrontEnd Interviews',
      description: 'Title of interview roadmap page',
      id: 'cw35KA',
    }),
    title: intl.formatMessage({
      defaultMessage:
        'Roadmap - Upcoming features and updates on GreatFrontEnd Interviews',
      description: 'Title of interview roadmap page',
      id: 'yyYVov',
    }),
  });
}

function InterviewsRoadmap() {
  return <RoadmapPage />;
}

export default InterviewsRoadmap;
