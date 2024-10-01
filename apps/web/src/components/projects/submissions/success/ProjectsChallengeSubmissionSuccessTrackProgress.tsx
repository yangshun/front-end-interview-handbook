import clsx from 'clsx';
import { useState } from 'react';

import { FormattedMessage, useIntl } from '~/components/intl';
import type {
  ProjectsChallengeHistoricalStatuses,
  ProjectsTrackType,
} from '~/components/projects/challenges/types';
import { projectsChallengeCountCompletedIncludingHistorical } from '~/components/projects/challenges/utils/ProjectsChallengeUtils';
import {
  getProjectsTrackTheme,
  type ProjectsTrackItem,
} from '~/components/projects/tracks/data/ProjectsTracksData';
import ProjectsTrackChallengesList from '~/components/projects/tracks/ProjectsTrackChallengesList';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import { themeBorderElementColor } from '~/components/ui/theme';

import ProjectsChallengeSubmissionSuccessProgressHeader from './ProjectsChallengeSubmissionSuccessProgressHeader';
import ProjectChallengeSubmissionTrackDialog from './ProjectsChallengeSubmissionSuccessTrackDialog';
import ProjectsChallengeSubmissionSuccessTrackList from './ProjectsChallengeSubmissionSuccessTrackList';

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

  const theme = getProjectsTrackTheme(
    currentTrack.metadata.slug as ProjectsTrackType,
  );

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
    <div className="grid gap-x-12 gap-y-8 xl:grid-cols-2">
      <ProjectsChallengeSubmissionSuccessProgressHeader
        completedCount={completedChallengesCount}
        entity="track"
        icon={theme.icon}
        iconWrapperClassName={theme.gradient.className}
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

                {isCurrentTrackCompleted ? (
                  <Button
                    className="!text-brand -me-3"
                    href="/projects/tracks"
                    label={intl.formatMessage({
                      defaultMessage: 'See all',
                      description:
                        'Label for See all button on project submission success page',
                      id: 'RZedau',
                    })}
                    variant="tertiary"
                  />
                ) : (
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
                )}
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
                          className="pointer-events-none"
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
        completedChallengesCount={completedChallengesCount}
        isShown={showTrackDialog}
        track={currentTrack}
        onClose={() => setShowTrackDialog(false)}
      />
    </div>
  );
}
