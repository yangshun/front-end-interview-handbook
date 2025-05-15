import type { Metadata } from 'next';

import ProjectsChallengeDiscussionsSection from '~/components/projects/challenges/discussions/ProjectsChallengeDiscussionsSection';

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
    pathname: `/projects/challenges/${slug}/resources/discussions`,
    title: intl.formatMessage(
      {
        defaultMessage: 'Challenge: {challengeName} | Discussions',
        description: 'Title of Projects challenge resources discussions page',
        id: 'c2emAw',
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

  return <ProjectsChallengeDiscussionsSection challenge={challenge} />;
}
