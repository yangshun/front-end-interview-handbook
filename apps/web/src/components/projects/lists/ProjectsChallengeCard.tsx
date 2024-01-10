import clsx from 'clsx';
import { startCase } from 'lodash-es';
import {
  RiArrowRightLine,
  RiCheckLine,
  RiCircleFill,
  RiFlashlightLine,
  RiLock2Line,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import ProjectsComponentTrackTag from '~/components/projects/stats/ProjectsComponentTrackTag';
import ProjectsReputationCountIncreaseTag from '~/components/projects/stats/ProjectsReputationCountIncreaseTag';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasized,
  themeBorderColor,
  themeCardBackgroundColor,
} from '~/components/ui/theme';

import type { ProjectsChallengeItem } from '../details/types';
import ProjectsSkillRow from '../skills/ProjectsSkillRow';
import ProjectsCompletedUsersTag from '../stats/ProjectsCompletedUsersTag';

type Props = Readonly<{
  project: ProjectsChallengeItem;
}>;

export default function ProjectsChallengeCard({ project }: Props) {
  const intl = useIntl();
  const { completedProfiles, completedCount, metadata, status, track } =
    project;
  const {
    title,
    difficulty,
    description,
    skills,
    imageUrl,
    points,
    href,
    access,
  } = metadata;

  return (
    <div
      className={clsx(
        'flex flex-col overflow-clip rounded-lg',
        ['border', themeBorderColor],
        themeCardBackgroundColor,
      )}>
      <div className="relative">
        <img
          alt={title}
          className="aspect-[16/9] object-cover w-full"
          src={imageUrl}
        />
        {status != null && (
          <div className="absolute start-3 bottom-3">
            {status === 'IN_PROGRESS' && (
              <Badge
                icon={RiCircleFill}
                label={intl.formatMessage({
                  defaultMessage: 'In progress',
                  description: 'Project in progress label',
                  id: 'nsk8M8',
                })}
                size="sm"
                variant="warning"
              />
            )}
            {status === 'COMPLETED' && (
              <Badge
                icon={RiCheckLine}
                label={intl.formatMessage({
                  defaultMessage: 'Completed',
                  description: 'Project completed label',
                  id: 'YY7lXv',
                })}
                size="sm"
                variant="success"
              />
            )}
          </div>
        )}
        <div className="absolute start-2 top-2 flex items-center gap-1">
          <Badge
            icon={RiFlashlightLine}
            label={startCase(difficulty)}
            variant="success"
          />
          {access === 'premium' && (
            <Badge
              icon={RiLock2Line}
              label={intl.formatMessage({
                defaultMessage: 'Premium',
                description: 'Label for premium project tag',
                id: 'szBcoh',
              })}
              variant="special"
            />
          )}
        </div>
      </div>
      <div className="grow flex flex-col gap-4 p-4">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <ProjectsComponentTrackTag track={track} />
          <ProjectsReputationCountIncreaseTag points={points} variant="flat" />
        </div>
        <div className="grow flex flex-col gap-2">
          <Text weight="bold">{title}</Text>
          <Text className="grow" color="subtitle" size="body2">
            {description}
          </Text>
        </div>
        <ProjectsSkillRow
          label={intl.formatMessage({
            defaultMessage: 'Skills:',
            description: 'Label for skills list in Project card',
            id: 'beN1QM',
          })}
          skills={skills}
        />
        <div className="flex items-center gap-4">
          <Button
            href={href}
            icon={RiArrowRightLine}
            label={intl.formatMessage({
              defaultMessage: 'Go to project',
              description: 'Label for "Go to project" button in Project card',
              id: 'r1Pjn6',
            })}
            variant="primary"
          />
          <ProjectsCompletedUsersTag
            count={completedCount}
            profiles={completedProfiles}
          />
        </div>
      </div>
    </div>
  );
}
