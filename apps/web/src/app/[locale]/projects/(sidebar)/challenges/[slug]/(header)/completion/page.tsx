import type { Metadata } from 'next/types';

import ProjectsChallengeDeploymentCompletionPage from '~/components/projects/challenges/completion/ProjectsChallengeDeploymentCompletionPage';
import ProjectsPremiumAccessControl from '~/components/projects/challenges/premium/ProjectsPremiumAccessControl';
import readViewerProjectsChallengeAccess from '~/components/projects/utils/readViewerProjectsChallengeAccess';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import {
  readProjectsChallengeItem,
  readProjectsChallengeMetadata,
} from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const { challengeMetadata } = await readProjectsChallengeMetadata(
    slug,
    locale,
  );

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Everything you need to host and deploy your solution for {challenge} upon project completion',
        description: 'Description of Projects challenge completion page',
        id: 'InPbXe',
      },
      {
        challenge: challengeMetadata.title,
      },
    ),
    locale,
    pathname: `/projects/challenges/${slug}/completion`,
    title: intl.formatMessage(
      {
        defaultMessage:
          'Challenge: {challenge} | Completion steps | GreatFrontEnd Projects - Real-world project challenges',
        description: 'Title of Projects challenge completion page',
        id: '0jt5LP',
      },
      {
        challenge: challengeMetadata.title,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { slug, locale } = params;
  const [{ viewerProjectsProfile }, viewerUnlockedAccess, { challenge }] =
    await Promise.all([
      readViewerProjectsProfile(),
      readViewerProjectsChallengeAccess(slug),
      readProjectsChallengeItem(slug, locale),
    ]);

  const viewerAccess = ProjectsPremiumAccessControl(
    challenge.metadata.access,
    viewerProjectsProfile,
    viewerUnlockedAccess,
  );

  return (
    <ProjectsChallengeDeploymentCompletionPage
      challenge={challenge}
      viewerAccess={viewerAccess}
      viewerProjectsProfile={viewerProjectsProfile}
    />
  );
}
