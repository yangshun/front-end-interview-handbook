import type { Metadata } from 'next';

import { readProjectsChallengeInfo } from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';

import ProjectsChallengeResourcesSolutionsPage from './ProjectsChallengeResourceSolutionsPage';

type Props = Readonly<{
  params: Readonly<{ framework: string; locale: string; slug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { framework, locale, slug } = params;
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
    pathname: `/projects/challenges/${slug}/resources/solutions/${framework}`,
    title: intl.formatMessage(
      {
        defaultMessage: 'Challenge: {challengeName} | Official solutions',
        description: 'Title of Projects challenge resources solutions page',
        id: 'dhbnY3',
      },
      {
        challengeName: challengeInfo.title,
      },
    ),
  });
}

export default ProjectsChallengeResourcesSolutionsPage;
