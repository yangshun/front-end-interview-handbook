import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProjectsProfileCommunitySection from '~/components/projects/profile/community/ProjectsProfileCommunitySection';

import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

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
    pathname: '/projects/dashboard/community',
    title: intl.formatMessage({
      defaultMessage: 'Community | Dashboard',
      description: 'Title of community section on dashboard page',
      id: 'IuGYUN',
    }),
  });
}

export default async function Page() {
  const viewer = await readViewerFromToken();

  if (viewer == null) {
    return notFound();
  }

  return (
    <ProjectsProfileCommunitySection
      isViewingOwnProfile={true}
      targetUserId={viewer.id}
    />
  );
}
