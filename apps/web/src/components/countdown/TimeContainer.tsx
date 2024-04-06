import clsx from 'clsx';

import Text from '~/components/ui/Text';
import { themeGlassyBorder } from '~/components/ui/theme';

export type TimeContainerVariant = 'default' | 'special';

type Props = Readonly<{
  value: string;
  variant?: TimeContainerVariant;
}>;

export default function TimeContainer({ value, variant = 'default' }: Props) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center rounded',
        'size-7 p-1',
        variant === 'special' ? themeGlassyBorder : 'border',
      )}>
      <Text
        color="inherit"
        size="body2"
        suppressHydrationWarning={true}
        weight="medium">
        {value}
      </Text>
    </div>
  );
}
