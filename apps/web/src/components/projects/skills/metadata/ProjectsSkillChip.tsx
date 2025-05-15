import clsx from 'clsx';

import { useIntl } from '~/components/intl';
import Text from '~/components/ui/Text';

import { projectsSkillLabel } from '../data/ProjectsSkillListData';
import type { ProjectsSkillKey } from '../types';
import ProjectsSkillChipDeleteButton from './ProjectsSkillChipDeleteButton';

type Props =
  | Readonly<{
      onDelete: (deletedSkills: ReadonlyArray<ProjectsSkillKey>) => void;
      readonly: false;
      value: ProjectsSkillKey;
    }>
  | Readonly<{
      readonly: true;
      value: ProjectsSkillKey;
    }>;

export default function ProjectsSkillChip({ value, ...props }: Props) {
  const intl = useIntl();
  const skillName = value;

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'w-fit gap-1 px-2 py-0.5',
        'rounded',
        'bg-neutral-200 dark:bg-neutral-700',
      )}>
      <Text className="whitespace-nowrap" size="body3" weight="medium">
        {projectsSkillLabel(value)}
      </Text>
      {!props.readonly && (
        <ProjectsSkillChipDeleteButton
          label={intl.formatMessage(
            {
              defaultMessage: 'Delete {skill}',
              description: 'Delete a tracked skill',
              id: 'y7pPpV',
            },
            {
              skill: skillName,
            },
          )}
          onClick={() => {
            props.onDelete([value]);
          }}
        />
      )}
    </div>
  );
}
