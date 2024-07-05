import clsx from 'clsx';
import { useState } from 'react';
import { RiBrush2Line } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import { themeBorderElementColor } from '~/components/ui/theme';

import ProjectsChallengeSubmissionSuccessProgressHeader from './ProjectsChallengeSubmissionSuccessProgressHeader';
import ProjectChallengeSubmissionTrackDialog from './ProjectsChallengeSubmissionSuccessTrackDialog';
import ProjectsChallengeSubmissionSuccessTrackList from './ProjectsChallengeSubmissionSuccessTrackList';
import type { ProjectsChallengeHistoricalStatuses } from '../../challenges/types';
import { projectsChallengeCountCompletedIncludingHistorical } from '../../challenges/utils/ProjectsChallengeUtils';
import type { ProjectsTrackItem } from '../../tracks/data/ProjectsTracksData';
import ProjectsTrackChallengesList from '../../tracks/ProjectsTrackChallengesList';

type Props = Readonly<{
  challengeHistoricalStatuses: ProjectsChallengeHistoricalStatuses;
  currentTrack: ProjectsTrackItem | null;
  isViewerPremium: boolean;
  projectTracks: ReadonlyArray<ProjectsTrackItem>;
}>;

const MAX_ITEMS_TO_SHOW = 2;

function getIncompleteTracks(
  projectTracks: ReadonlyArray<ProjectsTrackItem>,
  trackSlug: string,
  challengeHistoricalStatuses: ProjectsChallengeHistoricalStatuses,
): ReadonlyArray<ProjectsTrackItem> {
  return projectTracks.filter((track) => {
    const { metadata, challenges } = track;
    const completedChallengesCount =
      projectsChallengeCountCompletedIncludingHistorical(
        challengeHistoricalStatuses ?? {},
        challenges,
      );

    // Filter out current track
    if (metadata.slug === trackSlug) {
      return false;
    }

    return completedChallengesCount !== challenges.length;
  });
}

export default function ProjectsChallengeSubmissionSuccessTrackProgress({
  currentTrack,
  challengeHistoricalStatuses,
  projectTracks,
  isViewerPremium,
}: Props) {
  const intl = useIntl();
  const [showTrackDialog, setShowTrackDialog] = useState(false);

  if (!currentTrack) {
    return null;
  }

  const completedChallengesCount =
    projectsChallengeCountCompletedIncludingHistorical(
      challengeHistoricalStatuses ?? {},
      currentTrack.challenges,
    );
  const { info, challenges } = currentTrack;

  const notStartedChallenges = challenges.filter(
    (challenge) => challenge.status == null,
  );
  const hasMoreThanShownChallenges =
    notStartedChallenges.length > MAX_ITEMS_TO_SHOW;
  const isCurrentTrackCompleted =
    completedChallengesCount === challenges.length;

  const incompleteTracks = getIncompleteTracks(
    projectTracks,
    currentTrack.metadata.slug,
    challengeHistoricalStatuses,
  );
  const countToCheck = isCurrentTrackCompleted
    ? incompleteTracks.length
    : notStartedChallenges.length;

  return (
    <>
      <ProjectsChallengeSubmissionSuccessProgressHeader
        completedCount={completedChallengesCount}
        icon={RiBrush2Line}
        iconWrapperClassName="bg-gradient-to-b from-[#6366F1] to-[#10B981]"
        title={intl.formatMessage(
          {
            defaultMessage: '{title} Track progress',
            description:
              'Label for track progress on project submission success page',
            id: 'IGK0c9',
          },
          {
            title: info.title,
          },
        )}
        totalCount={currentTrack.challenges.length}
      />
      <div className="flex flex-col gap-6">
        {(() => {
          if (countToCheck === 0) {
            return null;
          }

          return (
            <>
              <div className="flex items-center justify-between">
                <Text color="secondary" size="body2">
                  {isCurrentTrackCompleted ? (
                    <FormattedMessage
                      defaultMessage="Try another track"
                      description="Label for next track on project submission success page"
                      id="8FAzVY"
                    />
                  ) : (
                    <FormattedMessage
                      defaultMessage="Next challenge:"
                      description="Label for next challenges on project submission success page"
                      id="BAIz4v"
                    />
                  )}
                </Text>

                <Button
                  className="!text-brand -me-3"
                  label={intl.formatMessage({
                    defaultMessage: 'See all',
                    description:
                      'Label for See all button on project submission success page',
                    id: 'RZedau',
                  })}
                  variant="tertiary"
                  onClick={() => setShowTrackDialog(true)}
                />
              </div>
              {isCurrentTrackCompleted ? (
                <ProjectsChallengeSubmissionSuccessTrackList
                  challengeStatuses={challengeHistoricalStatuses}
                  isViewerPremium={isViewerPremium}
                  tracks={incompleteTracks}
                />
              ) : (
                <div
                  className={clsx(
                    'relative',
                    hasMoreThanShownChallenges && 'mb-16',
                  )}>
                  <ProjectsTrackChallengesList
                    challenges={notStartedChallenges.slice(
                      0,
                      MAX_ITEMS_TO_SHOW,
                    )}
                    showEndProgressLine={hasMoreThanShownChallenges}
                    userProfile={null}
                    view="submission"
                  />
                  {hasMoreThanShownChallenges && (
                    <>
                      <div
                        className={clsx(
                          'absolute -bottom-8',
                          'ml-[11px]',
                          'h-10 w-9 border-b border-l border-dashed',
                          themeBorderElementColor,
                        )}
                      />
                      <div
                        className={clsx('absolute -bottom-12', 'ml-12 mt-4')}>
                        <Button
                          label={intl.formatMessage(
                            {
                              defaultMessage: '{count} more',
                              description: 'Label for more challenges count',
                              id: 'VWlSLh',
                            },
                            {
                              count:
                                notStartedChallenges.length - MAX_ITEMS_TO_SHOW,
                            },
                          )}
                          variant="secondary"
                          onClick={() => setShowTrackDialog(true)}
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
            </>
          );
        })()}
      </div>

      <ProjectChallengeSubmissionTrackDialog
        challengeStatuses={challengeHistoricalStatuses}
        completedChallengesCount={completedChallengesCount}
        isShown={showTrackDialog}
        isViewerPremium={isViewerPremium}
        track={currentTrack}
        tracks={projectTracks}
        onClose={() => setShowTrackDialog(false)}
      />
    </>
  );
}
