import type { Metadata } from 'next';

import ProjectsChallengeSubmissionListMentorPage from '~/components/projects/submissions/lists/ProjectsChallengeSubmissionListMentorPage';
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
        'Find user submissions suggested for your review, based on your completed challenges, skills, and experience.',
      description: 'Description of projects mentor page',
      id: 'V7Ifp8',
    }),
    locale,
    pathname: '/projects/submissions/mentor',
    title: intl.formatMessage({
      defaultMessage: 'User submissions | Mentor others',
      description: 'Page title of projects mentor page',
      id: '7ERPcF',
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
    <ProjectsChallengeSubmissionListMentorPage
      challengeInfoDict={challengeInfoDict}
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      tracks={tracks}
    />
  );
}
