import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import type { ProjectsChallengeHistoricalStatuses } from '~/components/projects/challenges/types';
import { projectsChallengeCountCompletedIncludingHistorical } from '~/components/projects/challenges/utils/ProjectsChallengeUtils';
import type { ProjectsTrackItem } from '~/components/projects/tracks/data/ProjectsTracksData';
import ProjectsTrackAccordionHeader from '~/components/projects/tracks/ProjectsTrackAccordionHeader';
import Anchor from '~/components/ui/Anchor';
import {
  themeBackgroundCardColor,
  themeGlassyBorder,
  themeTextBrandColor_GroupHover,
  themeTextFaintColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  challengeStatuses?: ProjectsChallengeHistoricalStatuses;
  isViewerPremium: boolean;
  track: ProjectsTrackItem;
}>;

export default function ProjectsChallengeSubmissionSuccessTrackCard({
  challengeStatuses,
  isViewerPremium,
  track,
}: Props) {
  const { challenges, info, metadata } = track;

  return (
    <div
      className={clsx(
        'flex items-center justify-between gap-2 p-6',
        'group',
        'rounded-lg',
        themeBackgroundCardColor,
        ['border', themeGlassyBorder],
      )}>
      <ProjectsTrackAccordionHeader
        completedCount={projectsChallengeCountCompletedIncludingHistorical(
          challengeStatuses ?? {},
          challenges,
        )}
        isViewerPremium={isViewerPremium}
        isViewingOwnProfile={true}
        track={track}
      />
      <RiArrowRightLine
        className={clsx(
          'size-6 shrink-0',
          themeTextFaintColor,
          themeTextBrandColor_GroupHover,
        )}
      />
      <Anchor
        aria-label={info.title}
        className="absolute inset-0"
        href={metadata.href}
      />
    </div>
  );
}
