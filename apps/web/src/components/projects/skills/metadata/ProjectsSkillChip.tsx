import clsx from 'clsx';
import { useIntl } from 'react-intl';

import Text from '~/components/ui/Text';
import { themeBackgroundChipColor } from '~/components/ui/theme';

import ProjectsSkillChipDeleteButton from './ProjectsSkillChipDeleteButton';
import ProjectsSkillLabel from './ProjectsSkillLabel';
import type { ProjectsSkillKey } from '../types';

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
        'py-0.5 px-2 w-fit',
        'rounded',
        themeBackgroundChipColor,
      )}>
      <Text className="whitespace-nowrap" size="body3" weight="medium">
        <ProjectsSkillLabel value={value} />
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
