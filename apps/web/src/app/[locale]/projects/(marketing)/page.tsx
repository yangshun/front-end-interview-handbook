import type { Metadata } from 'next/types';

import { readProjectsChallengeList } from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';

import ProjectsMarketingHomePage from './ProjectsMarketingHomePage';

export const dynamic = 'force-static';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultProjectsMetadata(intl, {
    description: intl.formatMessage({
      defaultMessage:
        'Tackle real-world front end projects designed by ex-FAANG engineers. Elevate your skills, build your portfolio, and connect with an active community.',
      description: 'Description of Projects page',
      id: 'Dt7sc8',
    }),
    locale,
    pathname: '/projects',
    title: intl.formatMessage({
      defaultMessage: 'Build front end real-world projects',
      description: 'Title of Projects page',
      id: 'Gqq8RF',
    }),
  });
}

type Props = Readonly<{
  params: Readonly<{ locale: string }>;
}>;

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [{ challenges }] = await Promise.all([
    readProjectsChallengeList(locale),
  ]);
  // TODO(projects): Actual featured projects.
  const featuredChallenges = challenges.slice(0, 10);

  return <ProjectsMarketingHomePage featuredChallenges={featuredChallenges} />;
}
