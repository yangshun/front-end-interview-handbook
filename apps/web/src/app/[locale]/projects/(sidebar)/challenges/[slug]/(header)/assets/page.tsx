import type { Metadata } from 'next/types';

import ProjectsChallengeAssetsPage from '~/components/projects/challenges/assets/ProjectsChallengeAssetsPage';
import ProjectsPremiumAccessControl from '~/components/projects/challenges/premium/ProjectsPremiumAccessControl';
import fetchViewerProjectsChallengeAccess from '~/components/projects/utils/fetchViewerProjectsChallengeAccess';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import {
  readProjectsChallengeAPIWriteup,
  readProjectsChallengeAppendix,
  readProjectsChallengeInfo,
  readProjectsChallengeItem,
  readProjectsChallengeStyleGuide,
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
          'All the assets you need to build a {challengeName}, including design assets, technical specs, starter code, and more',
        description: 'Description of Projects challenge assets page',
        id: '7SbsXo',
      },
      {
        challengeName: challengeInfo.title,
      },
    ),
    locale,
    pathname: `/projects/challenges/${slug}/assets`,
    title: intl.formatMessage(
      {
        defaultMessage: 'Challenge: {challengeName} | Assets',
        description: 'Title of Projects challenge assets page',
        id: '2+sEvv',
      },
      {
        challengeName: challengeInfo.title,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { locale, slug } = params;
  const [
    { viewerProjectsProfile },
    viewerUnlockedAccess,
    { challenge },
    { styleGuide },
    { apiWriteup },
    { appendix },
  ] = await Promise.all([
    fetchViewerProjectsProfile(),
    fetchViewerProjectsChallengeAccess(slug),
    readProjectsChallengeItem(slug, locale),
    readProjectsChallengeStyleGuide(slug, locale),
    readProjectsChallengeAPIWriteup(slug, locale),
    readProjectsChallengeAppendix(slug, locale),
  ]);

  const viewerAccess = ProjectsPremiumAccessControl(
    challenge.metadata.access,
    viewerProjectsProfile,
    viewerUnlockedAccess,
  );

  return (
    <ProjectsChallengeAssetsPage
      apiWriteup={apiWriteup ?? undefined}
      appendix={appendix ?? undefined}
      challenge={challenge}
      styleGuide={styleGuide ?? undefined}
      viewerAccess={viewerAccess}
      viewerProjectsProfile={viewerProjectsProfile}
    />
  );
}
