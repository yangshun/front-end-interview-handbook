import type { Metadata } from 'next/types';

import defaultMetadata from '~/seo/defaultMetadata';

import PrepareSystemDesignPage from './PrepareSystemDesignPage';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    description: `Top front end interview system design questions to practice, with detailed solutions and explanations by ex-interviewers at FAANG.`,
    pathname: '/prepare/system-design',
    title:
      'Practice Front End System Design Interview Questions with Solutions',
  });
}

export default function Page() {
  return <PrepareSystemDesignPage />;
}
