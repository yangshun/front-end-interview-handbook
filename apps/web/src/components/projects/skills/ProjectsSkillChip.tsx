import clsx from 'clsx';
import { startCase } from 'lodash-es';

import Text from '~/components/ui/Text';
import { themeBackgroundChipColor } from '~/components/ui/theme';

import { ProjectsSkillLabel } from './ProjectsSkillListData';

export default function ProjectsSkillChip({ value }: { value: string }) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'py-0.5 px-2 w-fit',
        'rounded',
        themeBackgroundChipColor,
      )}>
      <Text className="whitespace-nowrap" size="body3" weight="medium">
        {ProjectsSkillLabel[value] ?? startCase(value)}
      </Text>
    </div>
  );
}
