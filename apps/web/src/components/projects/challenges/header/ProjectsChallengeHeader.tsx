import clsx from 'clsx';
import { useState } from 'react';
import {
  RiArrowLeftLine,
  RiInformationLine,
  RiLock2Line,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import ProjectsChallengeDifficultyTag from '~/components/projects/challenges/metadata/ProjectsChallengeDifficultyTag';
import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import ProjectsChallengeTrackTag from '~/components/projects/challenges/metadata/ProjectsChallengeTrackTag';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import ProjectsSkillRoadmapChips from '~/components/projects/skills/ProjectsSkillRoadmapChips';
import ProjectsCompletedUsersTag from '~/components/projects/stats/ProjectsCompletedUsersTag';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

import ProjectsChallengeCompletedCountButton from './ProjectsChallengeCompletedCountButton';
import ProjectsChallengeCurrentProjectSessionCard from './ProjectsChallengeCurrentSessionCard';
import ProjectsChallengeHowItWorksDialog from './ProjectsChallengeHowItWorksDialog';
import { useProjectsChallengeSessionContext } from '../ProjectsChallengeSessionContext';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
}>;

export default function ProjectsChallengeHeader({ challenge }: Props) {
  const intl = useIntl();
  const { completedCount, completedProfiles, metadata, track } = challenge;
  const { description, difficulty, points, skills, title } = metadata;

  const { session, startProject, isGetLatestSessionFetched } =
    useProjectsChallengeSessionContext();
  const [isHowItWorksDialogShown, setIsHowItWorksDialogShown] = useState(false);
  const hasSession = session != null;

  return (
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
          hasSession
            ? 'grid md:grid-cols-2 items-start grid-cols-1'
            : 'flex flex-col lg:flex-row lg:justify-between',
          'gap-6 mt-8',
        )}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Heading level="heading5">{title}</Heading>
            <Badge
              icon={RiLock2Line}
              label={intl.formatMessage({
                defaultMessage: 'Premium',
                description: 'Premium content',
                id: 'gIeLON',
              })}
              size="sm"
              variant="special"
            />
          </div>
          <Text color="secondary" size="body2">
            {description}
          </Text>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <ProjectsChallengeDifficultyTag difficulty={difficulty} />
            <ProjectsChallengeTrackTag track={track} />
            <ProjectsChallengeReputationTag points={points} variant="flat" />
          </div>
          {isGetLatestSessionFetched && !hasSession && (
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <ProjectsSkillRoadmapChips
                    key={skill}
                    isEditable={true}
                    skill={skill}
                    // TODO(projects|skills): Replace below with actual subSkills
                    subSkills={['html', 'css', 'js']}
                  />
                ))}
              </div>
              <div
                className={clsx(
                  'mt-2 flex items-center gap-1',
                  themeTextSubtleColor,
                )}>
                <RiInformationLine className="h-4 w-4" />
                <Text color="inherit" size="body3">
                  <FormattedMessage
                    defaultMessage="You can add more skills e.g. UI frameworks used after starting the project"
                    description="Additional information for skills section on Projects project page"
                    id="j63zLB"
                  />
                </Text>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 items-end">
          {!isGetLatestSessionFetched ? null : hasSession ? (
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
              <Button
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
              <ProjectsCompletedUsersTag
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
  );
}
