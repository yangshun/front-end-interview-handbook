import clsx from 'clsx';

import Text from '~/components/ui/Text';
import { themeBackgroundChipColor } from '~/components/ui/theme';

export default function ProjectsSkillChip({ value }: { value: string }) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'py-0.5 px-2 w-fit',
        'rounded',
        themeBackgroundChipColor,
      )}>
      <Text className={clsx('whitespace-nowrap')} size="body3" weight="medium">
        {value}
      </Text>
    </div>
  );
}
