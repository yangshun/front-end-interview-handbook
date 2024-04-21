import type { Metadata } from 'next';

import ProjectsChallengeSubmissionListAllPage from '~/components/projects/submissions/lists/ProjectsChallengeSubmissionListAllPage';
import { readProjectsTrackList } from '~/components/projects/tracks/data/ProjectsTrackReader';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import { readProjectsChallengeInfoDict } from '~/db/projects/ProjectsReader';
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
    description: intl.formatMessage({
      defaultMessage:
        'Browse project solutions from our community. Interact with each unique submission, share your expertise, and evolve alongside our collaborative community.',
      description: 'Description of Projects submissions page',
      id: 'WFsVuQ',
    }),
    locale,
    pathname: '/projects/submissions',
    title: intl.formatMessage({
      defaultMessage: 'User submissions',
      description: 'Title of Projects submissions page',
      id: 'Qaxh+6',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const [{ viewerProjectsProfile }, { tracks }] = await Promise.all([
    fetchViewerProjectsProfile(),
    readProjectsTrackList(locale),
  ]);
  const { challengeInfoDict } = readProjectsChallengeInfoDict(locale);

  return (
    <ProjectsChallengeSubmissionListAllPage
      challengeInfoDict={challengeInfoDict}
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      tracks={tracks}
    />
  );
}
