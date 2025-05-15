import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useIsMounted } from 'usehooks-ts';

import { FormattedMessage, useIntl } from '~/components/intl';
import ProjectsChallengeDifficultyTag from '~/components/projects/challenges/metadata/ProjectsChallengeDifficultyTag';
import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import ProjectsChallengeTrackTag from '~/components/projects/challenges/metadata/ProjectsChallengeTrackTag';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import { themeBackgroundColor, themeBorderColor } from '~/components/ui/theme';

import ProjectsStartButton from '../../common/ProjectsStartButton';
import ProjectsPremiumBadge from '../../purchase/ProjectsPremiumBadge';
import type { ProjectsViewerProjectsProfile } from '../../types';
import ProjectsChallengeSubmitButton from '../completion/ProjectsChallengeSubmitButton';
import ProjectsChallengeSkillsTag from '../metadata/ProjectsChallengeSkillsTag';
import type { ProjectsPremiumAccessControlFields } from '../premium/ProjectsPremiumAccessControl';
import ProjectsChallengeAddSkillFromSkillPlanDialog from '../session/ProjectsChallengeAddSkillFromSkillPlanDialog';
import ProjectsChallengeCurrentProjectSessionCard from '../session/ProjectsChallengeCurrentSessionCard';
import { useProjectsChallengeSessionContext } from '../session/ProjectsChallengeSessionContext';
import ProjectsChallengeStepsTabItems from '../steps/ProjectsChallengeStepsTabItems';
import { useProjectDetailsStepsTabs } from '../steps/ProjectsChallengeStepsTabsImpl';
import ProjectsChallengeCompletedCountButton from './ProjectsChallengeCompletedCountButton';
import ProjectsChallengeHowItWorksDialog from './ProjectsChallengeHowItWorksDialog';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  isTabsInView: boolean;
  viewerAccess: ProjectsPremiumAccessControlFields;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>;

function ProjectsChallengeHeaderImpl({
  challenge,
  isTabsInView,
  viewerAccess,
  viewerProjectsProfile,
}: Props) {
  const intl = useIntl();
  const isMounted = useIsMounted();
  const tabs = useProjectDetailsStepsTabs(challenge);
  const { info, metadata, track } = challenge;
  const { access, difficulty, points, skills, submitHref } = metadata;
  const { description, title } = info;

  const { isGetLatestSessionFetched, session } =
    useProjectsChallengeSessionContext();
  const [isHowItWorksDialogShown, setIsHowItWorksDialogShown] = useState(false);
  const [
    isAddSkillFromSkillPlanDialogShown,
    setIsAddSkillFromSkillPlanDialogShown,
  ] = useState(false);
  const [
    hasShownAddSkillFromSkillPlanDialogShown,
    setHasShownAddSkillFromSkillPlanDialogShown,
  ] = useState(false);

  const hasSession = session != null;
  const showStickyStepsBar = isMounted() ? !isTabsInView : false;

  const searchParams = useSearchParams();

  const skillRoadmapPlanSkill = searchParams?.get('skill_plan');

  useEffect(() => {
    if (
      !hasSession ||
      skillRoadmapPlanSkill == null ||
      session.roadmapSkills.includes(skillRoadmapPlanSkill) ||
      hasShownAddSkillFromSkillPlanDialogShown
    ) {
      return;
    }

    setIsAddSkillFromSkillPlanDialogShown(true);
  }, [
    hasSession,
    hasShownAddSkillFromSkillPlanDialogShown,
    session,
    skillRoadmapPlanSkill,
  ]);

  const startButton = (
    <ProjectsStartButton
      slug={challenge.metadata.slug}
      viewerContentAccess={viewerAccess.viewChallenge}
      viewerProjectsProfile={viewerProjectsProfile}
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
          'pb-3 pt-4',
          ['border-b', themeBorderColor],
          themeBackgroundColor,
          showStickyStepsBar ? 'flex' : 'hidden',
        )}>
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          <div className="flex min-w-fit items-stretch">
            <ProjectsChallengeStepsTabItems
              challenge={challenge}
              className="block w-full"
              compact={true}
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
            <ProjectsChallengeSubmitButton
              display="block"
              size="md"
              submitHref={submitHref}
            />
          ) : (
            startButton
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
          <div className="flex flex-col items-start gap-4 md:items-end">
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
              <div className="flex items-center gap-4 lg:flex-col lg:items-end">
                {startButton}
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
        <ProjectsChallengeAddSkillFromSkillPlanDialog
          isShown={isAddSkillFromSkillPlanDialogShown}
          session={session!}
          skillToAdd={skillRoadmapPlanSkill!}
          onClose={() => {
            setHasShownAddSkillFromSkillPlanDialogShown(true);
            setIsAddSkillFromSkillPlanDialogShown(false);
          }}
        />
      </div>
    </>
  );
}

// UseSearchParams should be within a suspense boundary according to
// https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
export default function ProjectsChallengeHeader(props: Props) {
  return (
    <Suspense>
      <ProjectsChallengeHeaderImpl {...props} />
    </Suspense>
  );
}
