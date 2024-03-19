import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';
import { themeBorderElementColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import ProjectsSkillChip from './ProjectsSkillChip';
import { projectsSkillLabel } from '../data/ProjectsSkillListData';

type Props = Readonly<{
  limit?: number;
  skills: ReadonlyArray<string>;
}>;

export default function ProjectsSkillList({ limit = Infinity, skills }: Props) {
  if (skills.length === 0) {
    return null;
  }

  const listedSkills = skills.slice(0, limit);
  const remainingSkills = skills.slice(limit);
  const remainingCount = remainingSkills.length;

  return (
    <ul className="flex flex-wrap items-center gap-2">
      {listedSkills.map((skill) => (
        <li key={skill}>
          <ProjectsSkillChip readonly={true} value={skill} />
        </li>
      ))}
      {remainingCount > 0 && (
        <li
          className={clsx(
            'flex h-5 items-center justify-center rounded border px-2 text-xs',
            themeBorderElementColor,
          )}>
          <Tooltip
            label={remainingSkills
              .map((skill) => projectsSkillLabel(skill))
              .join(', ')}>
            <Text color="secondary" size="body3" weight="medium">
              <FormattedMessage
                defaultMessage="+{count} more"
                description="Label for number of additional skills"
                id="sPnbze"
                values={{ count: remainingCount }}
              />
            </Text>
          </Tooltip>
        </li>
      )}
    </ul>
  );
}
