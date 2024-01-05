import clsx from 'clsx';
import { useState } from 'react';
import {
  RiArrowLeftLine,
  RiInformationLine,
  RiLock2Line,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import type { ProjectsProjectItem } from '~/components/projects/details/types';
import ProjectsSkillChip from '~/components/projects/skills/ProjectsSkillChip';
import ProjectsCompletedUsersTag from '~/components/projects/stats/ProjectsCompletedUsersTag';
import ProjectsComponentTrackTag from '~/components/projects/stats/ProjectsComponentTrackTag';
import ProjectsDifficultyTag from '~/components/projects/stats/ProjectsDifficultyTag';
import ProjectsReputationCountIncreaseTag from '~/components/projects/stats/ProjectsReputationCountIncreaseTag';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

import ProjectsProjectCurrentProjectSessionCard from './ProjectsProjectCurrentSessionCard';
import ProjectsProjectHowItWorksDialog from './ProjectsProjectHowItWorksDialog';
import { useProjectsProjectSessionContext } from '../ProjectsProjectSessionContext';

type Props = Readonly<{
  project: ProjectsProjectItem;
}>;

export default function ProjectsProjectHeader({ project }: Props) {
  const intl = useIntl();
  const { completedCount, completedUsers, metadata } = project;
  const { description, difficulty, points, skills, title, track } = metadata;

  const { session, startProject } = useProjectsProjectSessionContext();
  const [isHowItWorksDialogShown, setIsHowItWorksDialogShown] = useState(false);
  const hasSession = session != null;

  return (
    <div
      className={clsx(
        !hasSession && 'flex flex-col gap-y-6 lg:flex-row lg:justify-between',
        hasSession && 'grid grid-cols-2 items-start',
      )}>
      <div className="flex flex-col">
        <Button
          addonPosition="start"
          className="-ms-4 -mt-2 self-start"
          href="/projects/all"
          icon={RiArrowLeftLine}
          label={intl.formatMessage({
            defaultMessage: 'Back to all projects',
            description:
              'Label for "Back to all projects" button on Projects project page',
            id: 'ggSPoc',
          })}
          variant="tertiary"
        />
        <div className="mt-4 flex flex-col gap-4">
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
            <ProjectsDifficultyTag difficulty={difficulty} />
            <ProjectsComponentTrackTag track={track} />
            <ProjectsReputationCountIncreaseTag
              points={points}
              variant="flat"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <ProjectsSkillChip
                  key={skill.key}
                  isEditable={true}
                  skill={skill}
                  // TODO(projects): Replace below with actual subSkills
                  subSkills={[
                    {
                      difficulty: 'easy',
                      key: 'dom-manipulation',
                      label: 'DOM Manipulation',
                    },
                    {
                      difficulty: 'medium',
                      key: 'flex',
                      label: 'Flex',
                    },
                    {
                      difficulty: 'hard',
                      key: 'typescript',
                      label: 'TypeScript',
                    },
                  ]}
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
        </div>
      </div>
      {hasSession ? (
        <ProjectsProjectCurrentProjectSessionCard
          project={project}
          session={{
            ...session,
            createdAt: new Date(session.createdAt),
            stoppedAt: session.stoppedAt ? new Date(session.stoppedAt) : null,
          }}
        />
      ) : (
        <div className="flex flex-shrink-0 flex-col gap-2 lg:items-end lg:gap-6">
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
          </Text>
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
              users={completedUsers}
            />
          </div>
        </div>
      )}
      <ProjectsProjectHowItWorksDialog
        isShown={isHowItWorksDialogShown}
        onClose={() => {
          setIsHowItWorksDialogShown(false);
        }}
      />
    </div>
  );
}
