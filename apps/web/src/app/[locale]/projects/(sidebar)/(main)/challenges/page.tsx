import type { Metadata } from 'next';

import ProjectsChallengeListPage from '~/components/projects/challenges/lists/ProjectsChallengeListPage';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import { readProjectsChallengeList } from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

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
        'Start building from our large repository of real-world front end project challenges. Hone core front end skills and build an impressive project portfolio.',
      description: 'Description of Challenges page',
      id: 'YZa0RE',
    }),
    locale,
    pathname: '/projects/challenges',
    title: intl.formatMessage({
      defaultMessage:
        'Challenges | GreatFrontEnd Projects - Real-world project challenges',
      description: 'Title of Challenges page',
      id: 'ueKEhB',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const viewer = await readViewerFromToken();
  const [{ viewerProjectsProfile }, { challenges }] = await Promise.all([
    fetchViewerProjectsProfile(viewer),
    readProjectsChallengeList(locale, viewer?.id),
  ]);

  return (
    <ProjectsChallengeListPage
      challenges={challenges}
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
    />
  );
}
