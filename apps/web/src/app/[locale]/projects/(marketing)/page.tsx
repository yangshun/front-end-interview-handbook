import type { Metadata } from 'next/types';

import {
  readProjectsChallengeList,
  readProjectsTrackList,
} from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import ProjectsMarketingHomePage from './ProjectsMarketingHomePage';

export const dynamic = 'force-static';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    pathname: '/projects',
    title: intl.formatMessage({
      defaultMessage: 'GreatFrontEnd Projects',
      description: 'Title of Projects All Projects page',
      id: 'uBaCgb',
    }),
  });
}

type Props = Readonly<{
  params: Readonly<{ locale: string }>;
}>;

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [{ challenges }, { tracks }] = await Promise.all([
    readProjectsChallengeList(locale),
    readProjectsTrackList(locale),
  ]);
  // TODO(projects): Actual featured projects.
  const featuredChallenges = challenges.slice(0, 10);

  return (
    <ProjectsMarketingHomePage
      featuredChallenges={featuredChallenges}
      projectTracks={tracks}
    />
  );
}
