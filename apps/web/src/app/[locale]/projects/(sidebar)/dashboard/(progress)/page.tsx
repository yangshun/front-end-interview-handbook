import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProjectsProfileProgressSection from '~/components/projects/profile/progress/ProjectsProfileProgressSection';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Track your personal milestones, view achievement stats, and see all your project and community activities in one place.',
      description: 'Description of Projects Dashboard page',
      id: 'tEZPfW',
    }),
    locale,
    pathname: '/projects/dashboard',
    title: intl.formatMessage({
      defaultMessage:
        'Dashboard | GreatFrontEnd Projects - Real-world project challenges',
      description: 'Title of Projects Dashboard page',
      id: 'NjU3F1',
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
    <ProjectsProfileProgressSection
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      isViewingOwnProfile={true}
      targetUserId={viewerId}
    />
  );
}
