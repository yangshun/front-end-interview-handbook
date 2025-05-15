import type { Metadata } from 'next/types';

import ProjectsChallengeDeploymentCompletionPage from '~/components/projects/challenges/completion/ProjectsChallengeDeploymentCompletionPage';
import ProjectsPremiumAccessControl from '~/components/projects/challenges/premium/ProjectsPremiumAccessControl';
import fetchViewerProjectsChallengeAccess from '~/components/projects/utils/fetchViewerProjectsChallengeAccess';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

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
          'Everything you need to host and deploy your solution for {challengeName} upon project completion',
        description: 'Description of Projects challenge completion page',
        id: 'XliVbn',
      },
      {
        challengeName: challengeInfo.title,
      },
    ),
    locale,
    pathname: `/projects/challenges/${slug}/completion`,
    title: intl.formatMessage(
      {
        defaultMessage: 'Challenge: {challengeName} | Completion steps',
        description: 'Title of Projects challenge completion page',
        id: 'a0Osa7',
      },
      {
        challengeName: challengeInfo.title,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { locale, slug } = params;
  const [{ viewerProjectsProfile }, viewerUnlockedAccess, { challenge }] =
    await Promise.all([
      fetchViewerProjectsProfile(),
      fetchViewerProjectsChallengeAccess(slug),
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
