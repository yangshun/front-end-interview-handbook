import clsx from 'clsx';

import Text from '~/components/ui/Text';
import { themeBackgroundChipColor } from '~/components/ui/theme';

import ProjectsSkillLabel from './ProjectsSkillLabel';
import type { ProjectsSkillKey } from '../types';

type Props = Readonly<{
  value: ProjectsSkillKey;
}>;

export default function ProjectsSkillChip({ value }: Props) {
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
    </div>
  );
}
