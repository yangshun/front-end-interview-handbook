import clsx from 'clsx';
import { startCase } from 'lodash-es';
import {
  RiArrowRightLine,
  RiCheckboxMultipleLine,
  RiFireLine,
  RiFlashlightLine,
  RiLock2Line,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasized,
  themeBorderColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import type { ProjectsProjectItem } from '../details/types';
import ProjectsSkillRow from '../skills/ProjectsSkillRow';
import ProjectsCompletedUsersTag from '../stats/ProjectsCompletedUsersTag';

type Props = Readonly<{
  project: ProjectsProjectItem;
}>;

export default function ProjectsProjectCard({ project }: Props) {
  const intl = useIntl();
  const { completedUsers, completedCount, metadata, status } = project;
  const {
    title,
    difficulty,
    description,
    skills,
    imageUrl,
    track,
    points,
    href,
    access,
  } = metadata;

  return (
    <div
      className={clsx(
        'flex flex-col overflow-clip rounded-lg border',
        themeBorderColor,
        themeBackgroundEmphasized,
      )}>
      <div className="relative">
        <img
          alt={title}
          className="aspect-[16/9] object-cover w-full"
          src={imageUrl}
        />
        {status === 'in-progress' && (
          <div className="absolute start-2 bottom-2 rounded px-2 bg-warning-light text-warning-darkest">
            <Text color="inherit" size="body2" weight="bold">
              <FormattedMessage
                defaultMessage="Project in progress"
                description="Label for in progress project tag"
                id="6aKLc3"
              />
            </Text>
          </div>
        )}
        {status === 'completed' && (
          <div className="absolute start-2 bottom-2 rounded px-2 bg-success-light text-success-darkest">
            <Text color="inherit" size="body2" weight="bold">
              <FormattedMessage
                defaultMessage="Project completed"
                description="Label for completed project tag"
                id="YwXYNT"
              />
            </Text>
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
          <div
            className={clsx(
              'flex items-center gap-1',
              themeTextSecondaryColor,
            )}>
            <RiCheckboxMultipleLine className="h-4 w-4" />
            <Text color="inherit" size="body3">
              {track}
            </Text>
          </div>
          <div
            className={clsx(
              'flex items-center gap-1',
              themeTextSecondaryColor,
            )}>
            <RiFireLine className="h-4 w-4" />
            <Text color="inherit" size="body3">
              <FormattedMessage
                defaultMessage="+{points} rep"
                description="Label for rep increase indicator in Project card"
                id="VXAI4w"
                values={{
                  points,
                }}
              />
            </Text>
          </div>
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
            users={completedUsers}
          />
        </div>
      </div>
    </div>
  );
}
