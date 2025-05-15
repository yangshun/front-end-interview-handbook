import type { Metadata } from 'next';

import ProjectsChallengeReferenceSubmissions from '~/components/projects/challenges/resources/ProjectsChallengeReferenceSubmissions';

import {
  readProjectsChallengeInfo,
  readProjectsChallengeItem,
} from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';

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
    pathname: `/projects/challenges/${slug}/resources/submissions`,
    title: intl.formatMessage(
      {
        defaultMessage: 'Challenge: {challengeName} | Reference submissions',
        description: 'Title of Projects challenge resources submissions page',
        id: '4elzbc',
      },
      {
        challengeName: challengeInfo.title,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { locale, slug } = params;

  const { challenge } = await readProjectsChallengeItem(slug, locale);

  return <ProjectsChallengeReferenceSubmissions challenge={challenge} />;
}
