import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProjectsProfileProgressSectionAllChallenges from '~/components/projects/profile/progress/ProjectsProfileProgressSectionAllChallenges';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultProjectsMetadata(intl, {
    locale,
    pathname: '/projects/dashboard/progress/challenges',
    title: intl.formatMessage({
      defaultMessage: 'Challenges | Progress | Dashboard',
      description: 'Title of challenges section on dashboard page',
      id: 'qkSNy+',
    }),
  });
}

export default async function Page() {
  const { viewerId, viewerProjectsProfile } =
    await fetchViewerProjectsProfile();

  if (viewerId == null) {
    return notFound();
  }

  return (
    <ProjectsProfileProgressSectionAllChallenges
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      isViewingOwnProfile={true}
      targetUserId={viewerId}
    />
  );
}
