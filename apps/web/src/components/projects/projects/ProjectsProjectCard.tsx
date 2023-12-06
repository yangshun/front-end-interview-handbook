import clsx from 'clsx';
import {
  RiArrowRightLine,
  RiCheckboxMultipleLine,
  RiFireLine,
  RiFlashlightLine,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasized,
  themeLineColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import type { ProjectsProject } from './types';
import ProjectsSkillRow from '../skills/ProjectsSkillRow';
import ProjectsCompletedUsersTag from '../stats/ProjectsCompletedUsersTag';

type Props = Readonly<{
  project: ProjectsProject;
}>;

export default function ProjectsProjectCard({
  project: {
    title,
    description,
    skills,
    imgSrc,
    completedUsers,
    completedCount,
    trackName,
    repCount,
    slug,
    isStarter,
  },
}: Props) {
  const intl = useIntl();

  return (
    <div
      className={clsx(
        'flex flex-col overflow-clip rounded-lg border',
        themeLineColor,
        themeBackgroundEmphasized,
      )}>
      <div className="relative">
        <img alt="" className="aspect-[16/9] object-cover" src={imgSrc} />
        {isStarter && (
          <div className="absolute left-2 top-2">
            <Badge icon={RiFlashlightLine} label="Starter" variant="success" />
          </div>
        )}
      </div>
      <div className="mb-2 flex flex-col gap-4 p-4">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <div
            className={clsx(
              'flex items-center gap-1',
              themeTextSecondaryColor,
            )}>
            <RiCheckboxMultipleLine className="h-4 w-4" />
            <Text color="inherit" size="body3">
              {trackName}
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
                defaultMessage="+{repCount} rep"
                description="Label for rep increase indicator in Project card"
                id="YiTnlf"
                values={{
                  repCount,
                }}
              />
            </Text>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Text weight="bold">{title}</Text>
          <Text size="body2">{description}</Text>
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
            href={`/projects/p/${slug}`}
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
