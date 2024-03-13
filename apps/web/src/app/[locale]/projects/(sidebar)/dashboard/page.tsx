import type { Metadata } from 'next';

import ProjectsProfileProgressSection from '~/components/projects/profile/progress/ProjectsProfileProgressSection';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

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
    locale,
    pathname: '/projects/dashboard',
    title: intl.formatMessage({
      defaultMessage: 'Dashboard | Projects',
      description: 'Title of Projects Dashboard page',
      id: 'Eu20+q',
    }),
  });
}

export default async function Page() {
  const { viewerProjectsProfile } = await readViewerProjectsProfile();

  return (
    <ProjectsProfileProgressSection
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
    />
  );
}
