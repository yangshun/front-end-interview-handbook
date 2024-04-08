import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowLeftLine, RiLock2Line, RiLockUnlockLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';
import { useIsMounted } from 'usehooks-ts';

import ProjectsChallengeDifficultyTag from '~/components/projects/challenges/metadata/ProjectsChallengeDifficultyTag';
import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import ProjectsChallengeTrackTag from '~/components/projects/challenges/metadata/ProjectsChallengeTrackTag';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import ProjectsCompletedUsersTag from '~/components/projects/stats/ProjectsCompletedUsersTag';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import { themeBackgroundColor, themeBorderColor } from '~/components/ui/theme';

import ProjectsChallengeCompletedCountButton from './ProjectsChallengeCompletedCountButton';
import ProjectsChallengeHowItWorksDialog from './ProjectsChallengeHowItWorksDialog';
import ProjectsChallengeSkillsTag from '../metadata/ProjectsChallengeSkillsTag';
import type { ProjectsPremiumAccessControlFields } from '../premium/ProjectsPremiumAccessControl';
import ProjectsChallengeCurrentProjectSessionCard from '../session/ProjectsChallengeCurrentSessionCard';
import { useProjectsChallengeSessionContext } from '../session/ProjectsChallengeSessionContext';
import ProjectsChallengeStepsTabItems from '../steps/ProjectsChallengeStepsTabItems';
import { useProjectDetailsStepsTabs } from '../steps/ProjectsChallengeStepsTabsImpl';
import ProjectsPremiumBadge from '../../purchase/ProjectsPremiumBadge';
import type { ProjectsViewerProjectsProfile } from '../../types';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  isTabsInView: boolean;
  viewerAccess: ProjectsPremiumAccessControlFields;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>;

export default function ProjectsChallengeHeader({
  challenge,
  viewerAccess,
  viewerProjectsProfile,
  isTabsInView,
}: Props) {
  const intl = useIntl();
  const isMounted = useIsMounted();
  const tabs = useProjectDetailsStepsTabs(challenge);
  const { completedCount, completedProfiles, metadata, track } = challenge;
  const { access, description, difficulty, points, skills, title, submitHref } =
    metadata;

  const { session, startProject, isGetLatestSessionFetched } =
    useProjectsChallengeSessionContext();
  const [isHowItWorksDialogShown, setIsHowItWorksDialogShown] = useState(false);
  const hasSession = session != null;
  const showStickyStepsBar = isMounted() ? !isTabsInView : false;

  const startProjectCTA =
    viewerAccess.viewChallenge === 'ACCESSIBLE_TO_EVERYONE' ? (
      <Button
        display="block"
        label={intl.formatMessage({
          defaultMessage: 'Start project',
          description:
            'Label for "Start project" button on Projects project page',
          id: '6/Qdew',
        })}
        size="md"
        variant="primary"
        onClick={startProject}
      />
    ) : viewerAccess.viewChallenge === 'UNLOCKED' ? (
      <Button
        addonPosition="start"
        display="block"
        icon={RiLockUnlockLine}
        label={intl.formatMessage({
          defaultMessage: 'Start project',
          description:
            'Label for "Start project" button on Projects project page',
          id: '6/Qdew',
        })}
        size="md"
        tooltip={intl.formatMessage({
          defaultMessage: 'You have unlocked this project',
          description:
            'Label for "Start project" button on Projects project page',
          id: 'KtacJv',
        })}
        variant="secondary"
        onClick={startProject}
      />
    ) : (
      <Button
        addonPosition="start"
        display="block"
        icon={RiLock2Line}
        isDisabled={true}
        label={intl.formatMessage({
          defaultMessage: 'Start project',
          description:
            'Label for "Start project" button on Projects project page',
          id: '6/Qdew',
        })}
        size="md"
        variant="secondary"
      />
    );

  return (
    <>
      {/* Sticky steps bar */}
      <div
        className={clsx(
          'flex-col gap-4 md:flex-row md:items-center md:gap-6',
          'z-sticky sticky top-[var(--global-sticky-height)]',
          'w-full',
          'py-3',
          ['border-b', themeBorderColor],
          themeBackgroundColor,
          showStickyStepsBar ? 'flex' : 'hidden',
        )}>
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          <div className="flex min-w-fit items-stretch">
            <ProjectsChallengeStepsTabItems
              challenge={challenge}
              className="block w-full"
              label={intl.formatMessage({
                defaultMessage: 'Project steps',
                description: 'Label for Project steps tabs',
                id: 'TJD+8A',
              })}
              tabs={tabs}
            />
          </div>
        </div>
        <div className="flex items-stretch">
          {!isGetLatestSessionFetched ? (
            <Spinner size="sm" />
          ) : hasSession ? (
            <Button
              display="block"
              href={submitHref}
              label={intl.formatMessage({
                defaultMessage: 'Submit project',
                description:
                  'Label for "Submit project" button on Projects project page',
                id: '+SjaQc',
              })}
              size="md"
              variant="primary"
            />
          ) : (
            startProjectCTA
          )}
        </div>
      </div>

      <div>
        <div className="flex justify-between gap-4">
          <Button
            addonPosition="start"
            className="-ms-4 -mt-2"
            href="/projects/challenges"
            icon={RiArrowLeftLine}
            label={intl.formatMessage({
              defaultMessage: 'Back to all challenges',
              description: 'Back button label',
              id: 'l27vTV',
            })}
            variant="tertiary"
          />
          {isGetLatestSessionFetched &&
            (() => {
              if (!hasSession) {
                <Text size="body3">
                  <FormattedMessage
                    defaultMessage="New here? <link>How it works</link>"
                    description="Link to 'How it works' page on Projects project page"
                    id="OYgvni"
                    values={{
                      link: (chunks) => (
                        <Anchor
                          href="#"
                          onClick={() => {
                            setIsHowItWorksDialogShown(true);
                          }}>
                          {chunks}
                        </Anchor>
                      ),
                    }}
                  />
                </Text>;
              }

              return (
                <ProjectsChallengeCompletedCountButton
                  challengeSlug={metadata.slug}
                />
              );
            })()}
        </div>
        <div
          className={clsx(
            'grid grid-cols-1 gap-6',
            hasSession ? 'xl:grid-cols-2' : 'md:grid-cols-2',
            'mt-8 items-start',
          )}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Heading level="heading5">{title}</Heading>
              {access === 'premium' && (
                <ProjectsPremiumBadge
                  unlocked={viewerAccess.viewChallenge === 'UNLOCKED'}
                />
              )}
            </div>
            <Text color="secondary" size="body2">
              {description}
            </Text>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <ProjectsChallengeDifficultyTag
                difficulty={difficulty}
                variant="inline"
              />
              {viewerProjectsProfile?.premium && (
                <ProjectsChallengeTrackTag track={track} />
              )}
              <ProjectsChallengeReputationTag points={points} />
              {skills.length > 0 && (
                <ProjectsChallengeSkillsTag
                  skills={skills}
                  variant="underline"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            {!isGetLatestSessionFetched ? (
              <Spinner size="sm" />
            ) : hasSession ? (
              <ProjectsChallengeCurrentProjectSessionCard
                challenge={challenge}
                session={{
                  ...session,
                  createdAt: new Date(session.createdAt),
                  stoppedAt: session.stoppedAt
                    ? new Date(session.stoppedAt)
                    : null,
                }}
              />
            ) : (
              <div className="flex items-center gap-x-4 gap-y-4 lg:flex-col lg:items-end">
                {startProjectCTA}
                <ProjectsCompletedUsersTag
                  avatarBorderClassName="border-white dark:border-neutral-900"
                  count={completedCount}
                  profiles={completedProfiles}
                />
              </div>
            )}
          </div>
        </div>
        <ProjectsChallengeHowItWorksDialog
          isShown={isHowItWorksDialogShown}
          onClose={() => {
            setIsHowItWorksDialogShown(false);
          }}
        />
      </div>
    </>
  );
}
