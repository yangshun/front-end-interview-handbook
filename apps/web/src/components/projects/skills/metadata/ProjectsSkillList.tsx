import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';
import { themeBorderElementColor } from '~/components/ui/theme';

import ProjectsSkillChip from './ProjectsSkillChip';

type Props = Readonly<{
  className?: string;
  isLabelHidden?: boolean;
  label: string;
  limit?: number;
  skills: ReadonlyArray<string>;
}>;

export default function ProjectsSkillList({
  className,
  isLabelHidden,
  label,
  limit = Infinity,
  skills,
}: Props) {
  if (skills.length === 0) {
    return null;
  }

  const firstThreeSkills = skills.slice(0, limit);
  const remainingCount = skills.length - firstThreeSkills.length;

  return (
    <div
      aria-label={isLabelHidden ? label : undefined}
      className={clsx('flex items-center gap-2', className)}>
      {!isLabelHidden && (
        <Text color="secondary" size="body2">
          {label}
        </Text>
      )}
      <ul className="flex items-center gap-2">
        {firstThreeSkills.map((skill) => (
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
            <Text color="secondary" size="body3" weight="medium">
              <FormattedMessage
                defaultMessage="+{count} more"
                description="Label for number of additional skills"
                id="sPnbze"
                values={{ count: remainingCount }}
              />
            </Text>
          </li>
        )}
      </ul>
    </div>
  );
}
