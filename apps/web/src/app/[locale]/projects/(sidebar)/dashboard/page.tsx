import type { Metadata } from 'next';

import ProjectsProfileProgressSection from '~/components/projects/profile/progress/ProjectsProfileProgressSection';

import { readProjectsTrackList } from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import prisma from '~/server/prisma';
import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

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

export default async function Page({ params }: Props) {
  const { locale } = params;
  const [user, { tracks }] = await Promise.all([
    readUserFromToken(),
    readProjectsTrackList(locale),
  ]);

  const isViewerPremium = await (async () => {
    if (user == null) {
      return false;
    }

    const projectsProfile = await prisma.projectsProfile.findFirst({
      select: {
        premium: true,
      },
      where: {
        userId: user.id,
      },
    });

    return projectsProfile?.premium ?? false;
  })();

  return (
    <ProjectsProfileProgressSection
      isViewerPremium={isViewerPremium}
      projectTracks={tracks}
    />
  );
}
