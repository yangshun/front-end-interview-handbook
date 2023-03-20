import type { Metadata } from 'next/types';

import defaultMetadata from '~/seo/defaultMetadata';

import PrepareBehavioralPage from './PrepareBehavioralPage';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    description:
      'Efficiently prepare for behavioral interviews for front end / web developers / software engineers, with guides about evaluation criteria at big tech, preparation strategies, and common behavioral interview questions.',
    pathname: '/prepare/behavioral',
    title: 'Prepare for Front End Behavioral Interviews',
  });
}

export default function Page() {
  return <PrepareBehavioralPage />;
}
