import type { Metadata } from 'next';

import { readProjectsChallengeInfo } from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';

import ProjectsChallengeResourcesGuidesPage from './ProjectsChallengeResourcesGuidesPage';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const [intl, { challengeInfo }] = await Promise.all([
    getIntlServerOnly(locale),
    readProjectsChallengeInfo(slug, locale),
  ]);

  return defaultProjectsMetadata(intl, {
    description: intl.formatMessage(
      {
        defaultMessage:
          'All the resources to help you build a {challengeName}, including how-to-guides, official solutions, references and user discussions',
        description: 'Description of Projects challenge resources page',
        id: 'JrYZqa',
      },
      {
        challengeName: challengeInfo.title,
      },
    ),
    locale,
    pathname: `/projects/challenges/${slug}/resources/guides`,
    title: intl.formatMessage(
      {
        defaultMessage: 'Challenge: {challengeName} | Guides',
        description: 'Title of Projects challenge resources guides age',
        id: 'Yx+36F',
      },
      {
        challengeName: challengeInfo.title,
      },
    ),
  });
}

export default ProjectsChallengeResourcesGuidesPage;
